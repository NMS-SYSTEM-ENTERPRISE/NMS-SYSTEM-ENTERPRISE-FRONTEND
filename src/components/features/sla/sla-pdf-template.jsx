import React from 'react';
import { format } from 'date-fns';
import snrLogo from '@/assets/images/snr-logo-xl.svg';

export const SlaPdfTemplate = ({ slaData = [], templateRef }) => {
  const exportDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

  const totalDevices = slaData.length;
  let healthy = 0;
  let atRisk = 0;
  let breached = 0;

  slaData.forEach(sla => {
    const val = parseFloat(String(sla.sla_percentage).replace('%', ''));
    if (!isNaN(val)) {
      if (val >= 99) healthy++;
      else if (val >= 95) atRisk++;
      else breached++;
    } else {
      breached++;
    }
  });

  const getStatusColor = (valStr) => {
    const val = parseFloat(String(valStr).replace('%', ''));
    if (isNaN(val)) return '#94a3b8'; // slate-400
    if (val >= 99) return '#16a34a'; // green-600
    if (val >= 95) return '#ea580c'; // orange-600
    return '#dc2626'; // red-600
  };

  const getSlaLabel = (valStr) => {
    const val = parseFloat(String(valStr).replace('%', ''));
    if (isNaN(val)) return 'UNKNOWN';
    if (val >= 99) return 'OK';
    if (val >= 95) return 'WARNING';
    return 'BREACHED';
  };

  return (
    <div
      style={{ position: 'absolute', top: '-9999px', left: '-9999px', zIndex: -1 }}
    >
      <div
        ref={templateRef}
        style={{
          width: '1122px', // A4 Landscape width at 96 DPI (11.69 * 96)
          minHeight: '794px',
          backgroundColor: '#ffffff',
          padding: '40px',
          fontFamily: 'var(--font-manrope), sans-serif',
          color: '#0f172a', // slate-900
          position: 'relative'
        }}
      >
        {/* Content Layer */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '20px', marginBottom: '20px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={snrLogo.src || snrLogo} alt="SNR Logo" style={{ height: '45px', objectFit: 'contain' }} />
            <div style={{ textAlign: 'right' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0', color: '#0f172a' }}>SLA Compliance Report</h1>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Generated: {exportDate}</p>
            </div>
          </div>

          {/* Executive Summary */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b', margin: '0 0 16px 0' }}>Executive Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', margin: '0 0 4px 0' }}>Total Evaluated</p>
                <p style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>{totalDevices}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', margin: '0 0 4px 0' }}>Healthy Devices</p>
                <p style={{ fontSize: '18px', fontWeight: 800, color: '#16a34a', margin: 0 }}>{healthy}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', margin: '0 0 4px 0' }}>At Risk Devices</p>
                <p style={{ fontSize: '18px', fontWeight: 800, color: '#ea580c', margin: 0 }}>{atRisk}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', margin: '0 0 4px 0' }}>Breached Devices</p>
                <p style={{ fontSize: '18px', fontWeight: 800, color: '#dc2626', margin: 0 }}>{breached}</p>
              </div>
            </div>
          </div>

          {/* Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 800, color: '#334155' }}>Device</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 800, color: '#334155' }}>IP Address</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 800, color: '#334155' }}>Group / Type</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: 800, color: '#334155' }}>Availability</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: 800, color: '#334155' }}>Performance</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: 800, color: '#334155' }}>SLA Status</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: 800, color: '#334155' }}>Open Tickets</th>
              </tr>
            </thead>
            <tbody>
              {slaData.map((sla, index) => {
                const hasTickets = parseInt(sla.open_tickets, 10) > 0;
                return (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'transparent' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#0f172a' }}>{sla.hostname || sla.ip_address || 'Unknown'}</td>
                    <td style={{ padding: '12px', color: '#475569', fontWeight: 500 }}>{sla.ip_address || 'N/A'}</td>
                    <td style={{ padding: '12px', color: '#475569', fontWeight: 500 }}>{sla.group || 'Unknown'} / {sla.device_type || 'Unknown'}</td>
                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 800, color: getStatusColor(sla.availability_achieved) }}>{sla.availability_achieved || 'N/A'}</td>
                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 800, color: getStatusColor(sla.performance_achieved) }}>{sla.performance_achieved || 'N/A'}</td>
                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 800, color: getStatusColor(sla.sla_percentage) }}>
                      {sla.sla_percentage || 'N/A'} [{getSlaLabel(sla.sla_percentage)}]
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 800, color: hasTickets ? '#ea580c' : '#16a34a' }}>
                      {sla.open_tickets || '0'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Footer */}
          <div style={{ marginTop: '40px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', textAlign: 'center', fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>
            SNR Edatas Private Limited - NetMonitor Enterprise
          </div>
        </div>
      </div>
    </div>
  );
};
