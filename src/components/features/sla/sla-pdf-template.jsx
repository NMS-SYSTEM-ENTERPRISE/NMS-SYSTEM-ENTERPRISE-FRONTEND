import React from 'react';
import { format } from 'date-fns';
import snrLogo from '@/assets/images/snr-logo-xl.svg';

// Converts snake_case or camelCase keys to Title Case labels
const formatHeader = (key) =>
  key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase());

// Detect if a value looks like a percentage for coloring
const getValueColor = (value) => {
  if (value === null || value === undefined || value === 'N/A' || value === '') return '#475569';
  const str = String(value);
  const pct = parseFloat(str.replace('%', ''));
  if (!str.includes('%') || isNaN(pct)) return '#0f172a';
  if (pct >= 99) return '#16a34a';
  if (pct >= 95) return '#ea580c';
  return '#dc2626';
};

// Compute executive summary metrics from sla_percentage if present
const computeSummary = (data) => {
  const hasSla = data.length > 0 && 'sla_percentage' in data[0];
  if (!hasSla) return null;
  let healthy = 0, atRisk = 0, breached = 0;
  data.forEach((row) => {
    const val = parseFloat(String(row.sla_percentage).replace('%', ''));
    if (!isNaN(val)) {
      if (val >= 99) healthy++;
      else if (val >= 95) atRisk++;
      else breached++;
    } else {
      breached++;
    }
  });
  return { total: data.length, healthy, atRisk, breached };
};

export const SlaPdfTemplate = ({ slaData = [], templateRef }) => {
  const exportDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

  if (!slaData || slaData.length === 0) {
    return <div ref={templateRef} style={{ display: 'none' }} />;
  }

  // Derive all column keys from the first record — fully dynamic
  const keys = Object.keys(slaData[0]);
  const summary = computeSummary(slaData);

  // Distribute column widths based on key count
  const CONTENT_WIDTH = 1042; // 1122px total - 80px padding
  // Give percentage-like columns a fixed narrow width, rest share equally
  const colWidth = Math.floor(CONTENT_WIDTH / keys.length);

  return (
    <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', zIndex: -1 }}>
      <div
        ref={templateRef}
        style={{
          width: '1122px',
          backgroundColor: '#ffffff',
          padding: '40px',
          fontFamily: 'var(--font-manrope), Manrope, sans-serif',
          color: '#0f172a',
          boxSizing: 'border-box'
        }}
      >
        {/* ── HEADER ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '18px',
          borderBottom: '2px solid #e2e8f0',
          marginBottom: '20px'
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={snrLogo.src || snrLogo}
            alt="SNR Logo"
            style={{ height: '42px', objectFit: 'contain' }}
          />
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px 0', color: '#0f172a', letterSpacing: '-0.3px' }}>
              SLA Compliance Report
            </p>
            <p style={{ fontSize: '12px', color: '#64748b', margin: 0, fontWeight: 500 }}>
              Generated: {exportDate}
            </p>
          </div>
        </div>

        {/* ── EXECUTIVE SUMMARY (only if sla_percentage exists) ── */}
        {summary && (
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '22px'
          }}>
            {[
              { label: 'Total Evaluated', value: summary.total, color: '#0f172a' },
              { label: 'Healthy (≥ 99%)',  value: summary.healthy,  color: '#16a34a' },
              { label: 'At Risk (95–99%)', value: summary.atRisk,   color: '#ea580c' },
              { label: 'Breached (< 95%)', value: summary.breached, color: '#dc2626' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{
                flex: 1,
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '14px 18px',
                borderLeft: `4px solid ${color}`
              }}>
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
                <p style={{ fontSize: '22px', fontWeight: 800, color, margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── DATA TABLE — fully dynamic ── */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9' }}>
              {keys.map((key) => (
                <th
                  key={key}
                  style={{
                    width: `${colWidth}px`,
                    padding: '11px 10px',
                    textAlign: 'left',
                    fontWeight: 800,
                    color: '#334155',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.4px',
                    borderBottom: '2px solid #cbd5e1',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {formatHeader(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slaData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{
                  backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f8fafc',
                  borderBottom: '1px solid #e2e8f0'
                }}
              >
                {keys.map((key) => {
                  const rawVal = row[key];
                  const displayVal = rawVal === null || rawVal === undefined || rawVal === ''
                    ? 'N/A'
                    : String(rawVal);
                  const color = getValueColor(rawVal);
                  const isBold = key === 'hostname' || key === 'device_id';
                  return (
                    <td
                      key={key}
                      style={{
                        padding: '10px 10px',
                        color,
                        fontWeight: isBold ? 700 : 500,
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: `${colWidth}px`
                      }}
                      title={displayVal}
                    >
                      {displayVal}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* ── REPORT META (device count) ── */}
        <div style={{
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>
            Showing {slaData.length} device{slaData.length !== 1 ? 's' : ''}
          </p>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, fontWeight: 500 }}>
            SNR Edatas Private Limited — NetMonitor Enterprise
          </p>
        </div>
      </div>
    </div>
  );
};
