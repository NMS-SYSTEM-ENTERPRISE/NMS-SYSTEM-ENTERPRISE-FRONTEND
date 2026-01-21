"use client";
import { useState } from 'react';
import styles from '../shared-settings-styles.module.css';

const LogSettings = () => {
  const [settings, setSettings] = useState({
    enableLogCollection: true,
    logRetentionDays: '90',
    maxLogSize: '100',
    compressionEnabled: true,
    indexingEnabled: true,
    parseRawLogs: true,
    alertOnErrors: true,
    alertThreshold: '100',
    batchSize: '1000',
    flushInterval: '5',
  });

  const handleSave = () => {
    console.log('Save log settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          <h2 className={styles.pageTitle}>Log Settings</h2>
          <p className={styles.pageDescription}>
            Configure log collection, storage, and processing settings
          </p>

          {/* Collection Settings */}
          <div className={styles.settingsSection}>
            <h3 style={{color: 'var(--color-chart-cyan)', fontSize: 'var(--font-md)', marginBottom: 'var(--margin-md)'}}>
              Log Collection Settings
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Enable Log Collection</label>
                <button
                  className={`${styles.toggleBtn} ${settings.enableLogCollection ? styles.toggleBtnOn : ''}`}
                  onClick={() => setSettings({...settings, enableLogCollection: !settings.enableLogCollection})}
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>{settings.enableLogCollection ? 'ON' : 'OFF'}</span>
                </button>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Batch Size (logs)</label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={settings.batchSize}
                  onChange={(e) => setSettings({...settings, batchSize: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Flush Interval (seconds)</label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={settings.flushInterval}
                  onChange={(e) => setSettings({...settings, flushInterval: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Storage Settings */}
          <div className={styles.settingsSection}>
            <h3 style={{color: 'var(--color-chart-cyan)', fontSize: 'var(--font-md)', marginBottom: 'var(--margin-md)'}}>
              Storage Settings
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Log Retention (days)</label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={settings.logRetentionDays}
                  onChange={(e) => setSettings({...settings, logRetentionDays: e.target.value})}
                />
                <small style={{color: 'var(--color-text-muted)', fontSize: 'var(--font-xs)'}}>
                  Logs older than this will be automatically deleted
                </small>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Max Log Size (MB)</label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={settings.maxLogSize}
                  onChange={(e) => setSettings({...settings, maxLogSize: e.target.value})}
                />
                <small style={{color: 'var(--color-text-muted)', fontSize: 'var(--font-xs)'}}>
                  Maximum size per log file before rotation
                </small>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Enable Compression</label>
                <button
                  className={`${styles.toggleBtn} ${settings.compressionEnabled ? styles.toggleBtnOn : ''}`}
                  onClick={() => setSettings({...settings, compressionEnabled: !settings.compressionEnabled})}
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>{settings.compressionEnabled ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Processing Settings */}
          <div className={styles.settingsSection}>
            <h3 style={{color: 'var(--color-chart-cyan)', fontSize: 'var(--font-md)', marginBottom: 'var(--margin-md)'}}>
              Processing Settings
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Enable Indexing</label>
                <button
                  className={`${styles.toggleBtn} ${settings.indexingEnabled ? styles.toggleBtnOn : ''}`}
                  onClick={() => setSettings({...settings, indexingEnabled: !settings.indexingEnabled})}
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>{settings.indexingEnabled ? 'ON' : 'OFF'}</span>
                </button>
                <small style={{color: 'var(--color-text-muted)', fontSize: 'var(--font-xs)'}}>
                  Index logs for faster search
                </small>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Parse Raw Logs</label>
                <button
                  className={`${styles.toggleBtn} ${settings.parseRawLogs ? styles.toggleBtnOn : ''}`}
                  onClick={() => setSettings({...settings, parseRawLogs: !settings.parseRawLogs})}
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>{settings.parseRawLogs ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Alert Settings */}
          <div className={styles.settingsSection}>
            <h3 style={{color: 'var(--color-chart-cyan)', fontSize: 'var(--font-md)', marginBottom: 'var(--margin-md)'}}>
              Alert Settings
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Alert on Errors</label>
                <button
                  className={`${styles.toggleBtn} ${settings.alertOnErrors ? styles.toggleBtnOn : ''}`}
                  onClick={() => setSettings({...settings, alertOnErrors: !settings.alertOnErrors})}
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>{settings.alertOnErrors ? 'ON' : 'OFF'}</span>
                </button>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Alert Threshold (errors/min)</label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={settings.alertThreshold}
                  onChange={(e) => setSettings({...settings, alertThreshold: e.target.value})}
                  disabled={!settings.alertOnErrors}
                />
              </div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button className={styles.btnSecondary} onClick={() => alert('Resetting to default...')}>Reset to Default</button>
            <button className={styles.btnPrimary} onClick={handleSave}>Save Settings</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogSettings;
