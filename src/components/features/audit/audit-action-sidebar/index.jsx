'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

import { toast } from 'sonner';
import { useAudit } from '@/hooks/audit';

export const AuditActionSidebar = ({ isOpen, onClose, activeTab = 'details', auditData = [] }) => {
  const { selectedEvent } = useAudit();
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [exportFormat, setExportFormat] = useState('csv');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState('30s');

  useEffect(() => {
    if (isOpen) {
      setCurrentTab(activeTab);
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!auditData || auditData.length === 0) {
      toast.error('No data available to copy');
      return;
    }
    navigator.clipboard.writeText(JSON.stringify(auditData, null, 2));
    toast.success('Audit logs copied to clipboard!');
  };

  const handleExport = () => {
    if (!auditData || auditData.length === 0) {
      toast.error('No data available to export');
      return;
    }

    try {
      let content = '';
      let mimeType = '';
      let fileExtension = '';

      if (exportFormat === 'json') {
        content = JSON.stringify(auditData, null, 2);
        mimeType = 'application/json';
        fileExtension = 'json';
      } else if (exportFormat === 'csv') {
        const headers = ['Timestamp', 'Module', 'Operation', 'User', 'Remote IP', 'Message'];
        const rows = auditData.map(item => [
          item.timestamp,
          item.module,
          item.operationType || item.action,
          item.user,
          item.remoteIp || item.ip,
          item.message
        ].map(val => `"${String(val || '').replace(/"/g, '""')}"`).join(','));

        content = [headers.join(','), ...rows].join('\n');
        mimeType = 'text/csv';
        fileExtension = 'csv';
      } else if (exportFormat === 'pdf') {
        // Fallback for PDF without a library: we generate an HTML table and trigger print
        const printWindow = window.open('', '_blank');
        const rowsHtml = auditData.map(item => `
          <tr>
            <td>${item.timestamp}</td>
            <td>${item.module}</td>
            <td>${item.operationType || item.action}</td>
            <td>${item.user}</td>
            <td>${item.remoteIp || item.ip}</td>
          </tr>
        `).join('');
        printWindow.document.write(`
          <html>
            <head>
              <title>Audit Logs Export</title>
              <style>
                table { width: 100%; border-collapse: collapse; font-family: var(--font-manrope), var(--font-geist-sans), sans-serif; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
              </style>
            </head>
            <body>
              <h2>Audit Logs Report</h2>
              <table>
                <thead>
                  <tr><th>Timestamp</th><th>Module</th><th>Operation</th><th>User</th><th>IP Address</th></tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
              </table>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
        toast.success('Print dialog opened for PDF export');
        return;
      }

      // Download file for CSV and JSON
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `audit-logs-export.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Successfully exported audit logs as ${exportFormat.toUpperCase()}`);
    } catch (err) {
      console.error('Export error', err);
      toast.error('Failed to export audit logs');
    }
  };

  return (
    <div className={styles.sidebarOverlay} onClick={onClose} role="presentation">
      <div
        className={styles.sidebar}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Audit actions"
      >
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Icon icon="mdi:cog" width={24} height={24} className={styles.headerIcon} />
            <h2>Audit Actions</h2>
          </div>
          <Button variant="ghost" size="icon" className={styles.closeBtn} onClick={onClose}>
            <Icon icon="mdi:close" width={24} height={24} />
          </Button>
        </div>

        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${currentTab === 'details' ? styles.tabActive : ''}`}
            onClick={() => setCurrentTab('details')}
          >
            Details
          </button>
          <button
            type="button"
            className={`${styles.tab} ${currentTab === 'export' ? styles.tabActive : ''}`}
            onClick={() => setCurrentTab('export')}
          >
            Export
          </button>
          <button
            type="button"
            className={`${styles.tab} ${currentTab === 'settings' ? styles.tabActive : ''}`}
            onClick={() => setCurrentTab('settings')}
          >
            Settings
          </button>
        </div>

        <div className={styles.content}>
          {currentTab === 'details' && (
            <div className={styles.section}>
              <h3>Audit Details</h3>
              {!selectedEvent ? (
                <>
                  <p className={styles.description}>
                    Select an audit log from the table to view detailed information here.
                  </p>
                  <div className={styles.emptyState}>
                    <Icon icon="mdi:file-document-outline" width={48} height={48} />
                    <span>No audit log selected</span>
                  </div>
                </>
              ) : (
                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>TIMESTAMP</span>
                    <span className={styles.detailValue}>{selectedEvent.timestamp}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>MODULE</span>
                    <span className={styles.detailValue}>{selectedEvent.module}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>OPERATION</span>
                    <span className={styles.detailValue}>{selectedEvent.operationType}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>USER</span>
                    <span className={styles.detailValue}>{selectedEvent.user}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>REMOTE IP</span>
                    <span className={styles.detailValue}>{selectedEvent.remoteIp}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>STATUS</span>
                    <span className={styles.detailValue}>{selectedEvent.status}</span>
                  </div>
                  <div className={styles.detailItemFull}>
                    <span className={styles.detailLabel}>MESSAGE</span>
                    <span className={styles.detailValueBox}>{selectedEvent.message}</span>
                  </div>
                  {selectedEvent.details && Object.keys(selectedEvent.details).length > 0 && (
                    <div className={styles.detailItemFull}>
                      <span className={styles.detailLabel}>ADDITIONAL DATA</span>
                      <pre className={styles.codeBox}>
                        {JSON.stringify(selectedEvent.details, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {currentTab === 'export' && (
            <div className={styles.section}>
              <h3>Export Report</h3>
              <div className={styles.formGroup}>
                <label>Format</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="format"
                      checked={exportFormat === 'csv'}
                      onChange={() => setExportFormat('csv')}
                    />
                    CSV
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="format"
                      checked={exportFormat === 'pdf'}
                      onChange={() => setExportFormat('pdf')}
                    />
                    PDF
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="format"
                      checked={exportFormat === 'json'}
                      onChange={() => setExportFormat('json')}
                    />
                    JSON
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Data Range</label>
                <div className={styles.infoBox}>Current View (Today)</div>
              </div>

              <Button className={styles.primaryBtn} onClick={handleExport}>
                <Icon icon="mdi:download" width={18} height={18} />
                Download Report
              </Button>

              <div className={styles.divider} />

              <h3>Clipboard</h3>
              <Button variant="secondary" className={styles.secondaryBtn} onClick={handleCopy}>
                <Icon icon="mdi:content-copy" width={18} height={18} />
                Copy All to Clipboard
              </Button>
            </div>
          )}

          {currentTab === 'settings' && (
            <div className={styles.section}>
              <h3>Data Refresh</h3>
              <div className={styles.formGroup}>
                <Checkbox
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  label="Enable Auto-refresh"
                />
              </div>

              {autoRefresh && (
                <div className={styles.formGroup}>
                  <label>Refresh Interval</label>
                  <SelectComponent
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(e.target.value)}
                    options={[
                      { value: '10s', label: '10 seconds' },
                      { value: '30s', label: '30 seconds' },
                      { value: '1m', label: '1 minute' },
                      { value: '5m', label: '5 minutes' },
                    ]}
                  />
                </div>
              )}

              <Button
                variant="secondary"
                className={styles.secondaryBtn}
                onClick={() => toast.success('Data refresh initiated...')}
              >
                <Icon icon="mdi:refresh" width={18} height={18} />
                Refresh Now
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
