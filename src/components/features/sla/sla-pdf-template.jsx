import React from 'react';
import { format } from 'date-fns';
import snrLogo from '@/assets/images/snr-logo-xl.svg';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatHeader = (key) =>
  key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());

// Smart column weight based on key name patterns (fully dynamic)
const getColWeight = (key) => {
  const k = key.toLowerCase();
  if (k === 'device_id' || k === 'id') return 0.55;
  if (k.includes('ip') || k.includes('address')) return 1.0;
  if (k.includes('hostname') || k.includes('name')) return 1.6;
  if (k.includes('group') || k.includes('type') || k.includes('subgroup')) return 1.1;
  if (k.includes('percentage') || k.includes('sla')) return 0.8;
  if (k.includes('time') || k.includes('duration')) return 0.85;
  if (k.includes('ticket') || k.includes('open') || k.includes('total')) return 0.7;
  if (k.includes('status')) return 0.75;
  return 1.0;
};

const getValueColor = (key, value) => {
  if (value === null || value === undefined || value === '') return '#64748b';
  const str = String(value);
  const k = key.toLowerCase();

  // Percentage-based coloring
  if (str.includes('%')) {
    const pct = parseFloat(str.replace('%', ''));
    if (!isNaN(pct)) {
      if (pct >= 99) return '#16a34a';
      if (pct >= 95) return '#ea580c';
      return '#dc2626';
    }
  }

  // Status keyword coloring
  if (k.includes('status') || str.toUpperCase() === str) {
    const up = str.toUpperCase();
    if (up.includes('OK') || up.includes('HEALTHY') || up.includes('UP')) return '#16a34a';
    if (up.includes('WARN') || up.includes('RISK') || up.includes('DEGRADED')) return '#ea580c';
    if (up.includes('BREACH') || up.includes('DOWN') || up.includes('FAIL')) return '#dc2626';
  }

  return '#0f172a';
};

const isBoldKey = (key) => {
  const k = key.toLowerCase();
  return k.includes('hostname') || k.includes('name') || k === 'ip_address';
};

// ─── Page layout constants (A4 Landscape @ 96 DPI = 1122 × 794 px) ───────────
const PAGE_W = 1122;
const PAGE_H = 794;
const PAD = 28;

const HDR_H = 48;
const HDR_MB = 8;
const TBL_HDR = 26;
const ROW_H = 22;
const FOOTER_H = 22;
const FTR_MT = 8;

const CONTENT_H = PAGE_H - PAD * 2 - FOOTER_H - FTR_MT;
const ROWS_PER_PAGE = Math.floor((CONTENT_H - HDR_H - HDR_MB - TBL_HDR) / ROW_H);
const TOTAL_W = PAGE_W - PAD * 2;

// ─── Sub-components ───────────────────────────────────────────────────────────

const PageHeader = ({ exportDate, evaluationWindow, totalTime }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '8px',
    borderBottom: '1.5px solid #e2e8f0',
    marginBottom: `${HDR_MB}px`,
    height: `${HDR_H}px`,
    boxSizing: 'border-box',
    flexShrink: 0,
  }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={snrLogo.src || snrLogo} alt="SNR Logo" style={{ height: '30px', objectFit: 'contain' }} />
    <div style={{ textAlign: 'right' }}>
      <p style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 2px 0', color: '#0f172a', letterSpacing: '-0.2px' }}>
        SLA Compliance Report
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginTop: '2px' }}>
        {evaluationWindow && (
          <p style={{ fontSize: '8.5px', color: '#475569', margin: 0, fontWeight: 600 }}>
            📅 {evaluationWindow}
          </p>
        )}
        {evaluationWindow && totalTime && (
          <span style={{ fontSize: '8px', color: '#cbd5e1' }}>|</span>
        )}
        {totalTime && (
          <p style={{ fontSize: '8.5px', color: '#475569', margin: 0, fontWeight: 600 }}>
            ⏱ {totalTime}
          </p>
        )}
        <p style={{ fontSize: '8px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>
          Generated: {exportDate}
        </p>
      </div>
    </div>
  </div>
);

// ── Data table — every key = its own column ───────────────────────────────────
const DataTable = ({ keys, colWidths, rows }) => (
  <table style={{
    width: '100%',
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
    fontSize: '9px',
  }}>
    <thead>
      <tr style={{ backgroundColor: '#f1f5f9', height: `${TBL_HDR}px` }}>
        {keys.map((key) => (
          <th
            key={key}
            style={{
              width: `${colWidths[key]}px`,
              padding: '0 6px',
              textAlign: 'left',
              fontWeight: 800,
              color: '#334155',
              fontSize: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.35px',
              borderBottom: '1.5px solid #cbd5e1',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            title={formatHeader(key)}
          >
            {formatHeader(key)}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr
          key={i}
          style={{
            backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8fafc',
            borderBottom: '1px solid #f1f5f9',
            height: `${ROW_H}px`,
          }}
        >
          {keys.map((key) => {
            const rawVal = row[key];
            const display =
              rawVal === null || rawVal === undefined || rawVal === ''
                ? 'N/A'
                : String(rawVal);
            return (
              <td
                key={key}
                style={{
                  padding: '0 6px',
                  color: getValueColor(key, rawVal),
                  fontWeight: isBoldKey(key) ? 700 : 500,
                  fontSize: '9px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: `${colWidths[key]}px`,
                  verticalAlign: 'middle',
                }}
                title={display}
              >
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
    <p style={{ fontSize: '8px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>
      SNR Edatas Private Limited — NetMonitor Enterprise
    </p>
    <p style={{ fontSize: '8px', color: '#94a3b8', margin: 0, fontWeight: 700 }}>
      Page {pageNum} / {totalPages}
    </p>
  </div>
);

// ─── Main Export Component ────────────────────────────────────────────────────

export const SlaPdfTemplate = ({ slaData = [], pageRefs, evaluationWindow = '', totalTime = '' }) => {
  if (!slaData || slaData.length === 0) return null;

  const exportDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

  // All keys from the API — every key = its own column, nothing absorbed/hidden
  const keys = Object.keys(slaData[0]);

  // Proportional column widths derived from key name patterns
  const totalWeight = keys.reduce((sum, k) => sum + getColWeight(k), 0);
  const colWidths = Object.fromEntries(
    keys.map((k) => [k, Math.floor((getColWeight(k) / totalWeight) * TOTAL_W)])
  );

  // Pre-chunk rows — no row ever crosses a page boundary
  const pages = [];
  const remaining = [...slaData];
  while (remaining.length > 0) {
    pages.push(remaining.splice(0, Math.max(1, ROWS_PER_PAGE)));
  }
  const totalPages = pages.length;

  return (
    <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', zIndex: -1 }}>
      {pages.map((rows, pageIndex) => (
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
            overflow: 'hidden',
            marginBottom: '16px',
          }}
        >
          <PageHeader exportDate={exportDate} evaluationWindow={evaluationWindow} totalTime={totalTime} />
          <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
            <DataTable keys={keys} colWidths={colWidths} rows={rows} />
          </div>
          <PageFooter pageNum={pageIndex + 1} totalPages={totalPages} />
        </div>
      ))}
    </div>
  );
};
