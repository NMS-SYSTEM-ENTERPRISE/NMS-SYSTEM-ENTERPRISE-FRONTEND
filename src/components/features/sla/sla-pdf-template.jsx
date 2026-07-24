import React from 'react';
import { format } from 'date-fns';
import snrLogo from '@/assets/images/snr-logo-xl.svg';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatHeader = (key) =>
  key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());

const getValueColor = (value) => {
  if (value === null || value === undefined || value === '') return '#475569';
  const str = String(value);
  const pct = parseFloat(str.replace('%', ''));
  if (!str.includes('%') || isNaN(pct)) return '#0f172a';
  if (pct >= 99) return '#16a34a';
  if (pct >= 95) return '#ea580c';
  return '#dc2626';
};

const computeSummary = (data) => {
  if (!data.length || !('sla_percentage' in data[0])) return null;
  let healthy = 0, atRisk = 0, breached = 0;
  data.forEach((row) => {
    const val = parseFloat(String(row.sla_percentage).replace('%', ''));
    if (!isNaN(val)) {
      if (val >= 99) healthy++;
      else if (val >= 95) atRisk++;
      else breached++;
    } else breached++;
  });
  return { total: data.length, healthy, atRisk, breached };
};

// ─── Page-level sizing constants (A4 Landscape @ 96 DPI = 1122 × 794px) ─────
const PAGE_W = 1122;
const PAGE_H = 794;
const PAD = 36;          // horizontal & vertical padding

// Approximate pixel heights of layout regions
const HDR_H = 78;         // letterhead height
const HDR_MB = 16;         // margin after header
const SUM_H = 90;         // summary card row
const SUM_MB = 18;         // margin after summary
const TBL_HDR = 36;         // table <thead> row height
const ROW_H = 32;         // each data <tr> height
const FOOTER_H = 32;         // bottom footer strip
const FTR_MT = 12;         // margin before footer

const CONTENT_H = PAGE_H - PAD * 2 - FOOTER_H - FTR_MT;

// How many rows fit on page 1 (with summary) vs subsequent pages
const ROWS_P1 = Math.floor(
  (CONTENT_H - HDR_H - HDR_MB - SUM_H - SUM_MB - TBL_HDR) / ROW_H
);
const ROWS_PN = Math.floor(
  (CONTENT_H - HDR_H - HDR_MB - TBL_HDR) / ROW_H
);

// ─── Sub-components ───────────────────────────────────────────────────────────

const PageHeader = ({ exportDate }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '14px',
    borderBottom: '2px solid #e2e8f0',
    marginBottom: `${HDR_MB}px`,
    height: `${HDR_H}px`,
    boxSizing: 'border-box',
  }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={snrLogo.src || snrLogo} alt="SNR Logo" style={{ height: '40px', objectFit: 'contain' }} />
    <div style={{ textAlign: 'right' }}>
      <p style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 3px 0', color: '#0f172a', letterSpacing: '-0.2px' }}>
        SLA Compliance Report
      </p>
      <p style={{ fontSize: '11px', color: '#64748b', margin: 0, fontWeight: 500 }}>
        Generated: {exportDate}
      </p>
    </div>
  </div>
);

const SummaryBar = ({ summary }) => {
  if (!summary) return null;
  const items = [
    { label: 'Total Evaluated', value: summary.total, color: '#0f172a' },
    { label: 'Healthy (≥ 99%)', value: summary.healthy, color: '#16a34a' },
    { label: 'At Risk (95–99%)', value: summary.atRisk, color: '#ea580c' },
    { label: 'Breached (< 95%)', value: summary.breached, color: '#dc2626' },
  ];
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: `${SUM_MB}px`, height: `${SUM_H}px`, boxSizing: 'border-box' }}>
      {items.map(({ label, value, color }) => (
        <div key={label} style={{
          flex: 1,
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderLeft: `4px solid ${color}`,
          borderRadius: '7px',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <p style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', margin: '0 0 5px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
          <p style={{ fontSize: '20px', fontWeight: 800, color, margin: 0, lineHeight: 1 }}>{value}</p>
        </div>
      ))}
    </div>
  );
};

const DataTable = ({ keys, rows, colWidth }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px', tableLayout: 'fixed' }}>
    <thead>
      <tr style={{ backgroundColor: '#f1f5f9', height: `${TBL_HDR}px` }}>
        {keys.map((key) => (
          <th key={key} style={{
            width: `${colWidth}px`,
            padding: '0 10px',
            textAlign: 'left',
            fontWeight: 800,
            color: '#334155',
            fontSize: '10.5px',
            textTransform: 'uppercase',
            letterSpacing: '0.4px',
            borderBottom: '2px solid #cbd5e1',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {formatHeader(key)}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr key={i} style={{
          backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          height: `${ROW_H}px`,
        }}>
          {keys.map((key) => {
            const rawVal = row[key];
            const display = rawVal === null || rawVal === undefined || rawVal === '' ? 'N/A' : String(rawVal);
            const isHighlight = key === 'hostname' || key === 'device_id';
            return (
              <td key={key} style={{
                padding: '0 10px',
                color: getValueColor(rawVal),
                fontWeight: isHighlight ? 700 : 500,
                fontSize: '11.5px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: `${colWidth}px`,
              }} title={display}>
                {display}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

const PageFooter = ({ pageNum, totalPages }) => (
  <div style={{
    marginTop: `${FTR_MT}px`,
    height: `${FOOTER_H}px`,
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
  }}>
    <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>
      SNR Edatas Private Limited — NetMonitor Enterprise
    </p>
    <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, fontWeight: 600 }}>
      Page {pageNum} of {totalPages}
    </p>
  </div>
);

// ─── Main Export Component ────────────────────────────────────────────────────

export const SlaPdfTemplate = ({ slaData = [], pageRefs }) => {
  if (!slaData || slaData.length === 0) return null;

  const exportDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  const keys = Object.keys(slaData[0]);
  const summary = computeSummary(slaData);
  const colWidth = Math.floor((PAGE_W - PAD * 2) / keys.length);

  // Split rows into pages — no row ever crosses a page boundary
  const pages = [];
  let remaining = [...slaData];

  const firstChunk = remaining.splice(0, Math.max(1, ROWS_P1));
  pages.push({ rows: firstChunk, showSummary: true });

  while (remaining.length > 0) {
    const chunk = remaining.splice(0, Math.max(1, ROWS_PN));
    pages.push({ rows: chunk, showSummary: false });
  }

  const totalPages = pages.length;

  return (
    <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', zIndex: -1 }}>
      {pages.map((page, pageIndex) => (
        <div
          key={pageIndex}
          ref={(el) => { if (pageRefs) pageRefs.current[pageIndex] = el; }}
          style={{
            width: `${PAGE_W}px`,
            height: `${PAGE_H}px`,
            backgroundColor: '#ffffff',
            padding: `${PAD}px`,
            fontFamily: 'var(--font-manrope), Manrope, sans-serif',
            color: '#0f172a',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',        // ← guarantees nothing bleeds out
            marginBottom: '20px',          // visual gap between pages in DOM
          }}
        >
          <PageHeader exportDate={exportDate} />
          {page.showSummary && <SummaryBar summary={summary} />}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <DataTable keys={keys} rows={page.rows} colWidth={colWidth} />
          </div>
          <PageFooter pageNum={pageIndex + 1} totalPages={totalPages} />
        </div>
      ))}
    </div>
  );
};
