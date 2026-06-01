'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export const AuditActionSidebar = ({ isOpen, onClose, activeTab = 'details', auditData = [] }) => {
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
    navigator.clipboard.writeText(JSON.stringify(auditData, null, 2));
    alert('Audit logs copied to clipboard!');
  };

  const handleExport = () => {
    alert(`Exporting audit logs as ${exportFormat.toUpperCase()}...`);
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
              <p className={styles.description}>
                Select an audit log from the table to view detailed information here.
              </p>
              <div className={styles.emptyState}>
                <Icon icon="mdi:file-document-outline" width={48} height={48} />
                <span>No audit log selected</span>
              </div>
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
                onClick={() => alert('Refreshing data...')}
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
