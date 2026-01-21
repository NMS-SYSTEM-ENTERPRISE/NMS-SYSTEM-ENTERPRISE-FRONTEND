"use client";
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const DataRetention = () => {
  const [settings, setSettings] = useState({
    metricRawDays: 30,
    metricAggregatedDays: 180,
    logRawDays: 7,
    logAggregatedDays: 180,
    flowRawDays: 2,
    flowAggregatedDays: 180,
    trapRawDays: 30,
    trapAggregatedDays: 180,
    notificationDays: 7,
    auditDays: 30,
    alertDays: 90,
    ncmDays: 15,
    netrouteDays: 7,
  });
  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };
  return (
    <>
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <h2 className={styles.pageTitle}>Data Retention</h2>
          <p className={styles.pageDescription}>
            Automate the cleanup of outdated data while retaining the data that matters. For more information:{' '}
            <a href="#" className={styles.link}>
              Data Retention
              <Icon icon="mdi:open-in-new" width={16} height={16} />
            </a>
          </p>
          <div className={styles.settingsSection}>
            <h3 style={{color: 'var(--color-chart-cyan)', fontSize: 'var(--font-md)', marginBottom: 'var(--margin-md)'}}>
              Metric Data Retention
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Metric raw data will be retained for last</label>
                <div style={{display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center'}}>
                  <input
                    type="number"
                    className={styles.formInput}
                    value={settings.metricRawDays}
                    onChange={(e) => handleChange('metricRawDays', e.target.value)}
                    style={{width: '120px'}}
                  />
                  <span style={{color: 'var(--color-text-secondary)'}}>Days</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Metric aggregated data will be retained for last</label>
                <div style={{display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center'}}>
                  <input
                    type="number"
                    className={styles.formInput}
                    value={settings.metricAggregatedDays}
                    onChange={(e) => handleChange('metricAggregatedDays', e.target.value)}
                    style={{width: '120px'}}
                  />
                  <span style={{color: 'var(--color-text-secondary)'}}>Days</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.settingsSection}>
            <h3 style={{color: 'var(--color-chart-cyan)', fontSize: 'var(--font-md)', marginBottom: 'var(--margin-md)'}}>
              Log Data Retention
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Log raw data will be retained for last</label>
                <div style={{display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center'}}>
                  <input
                    type="number"
                    className={styles.formInput}
                    value={settings.logRawDays}
                    onChange={(e) => handleChange('logRawDays', e.target.value)}
                    style={{width: '120px'}}
                  />
                  <span style={{color: 'var(--color-text-secondary)'}}>Days</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Log aggregated data will be retained for last</label>
                <div style={{display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center'}}>
                  <input
                    type="number"
                    className={styles.formInput}
                    value={settings.logAggregatedDays}
                    onChange={(e) => handleChange('logAggregatedDays', e.target.value)}
                    style={{width: '120px'}}
                  />
                  <span style={{color: 'var(--color-text-secondary)'}}>Days</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.settingsSection}>
            <h3 style={{color: 'var(--color-chart-cyan)', fontSize: 'var(--font-md)', marginBottom: 'var(--margin-md)'}}>
              Flow Data Retention
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Flow raw data will be retained for last</label>
                <div style={{display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center'}}>
                  <input
                    type="number"
                    className={styles.formInput}
                    value={settings.flowRawDays}
                    onChange={(e) => handleChange('flowRawDays', e.target.value)}
                    style={{width: '120px'}}
                  />
                  <span style={{color: 'var(--color-text-secondary)'}}>Days</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Flow aggregated data will be retained for last</label>
                <div style={{display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center'}}>
                  <input
                    type="number"
                    className={styles.formInput}
                    value={settings.flowAggregatedDays}
                    onChange={(e) => handleChange('flowAggregatedDays', e.target.value)}
                    style={{width: '120px'}}
                  />
                  <span style={{color: 'var(--color-text-secondary)'}}>Days</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.settingsSection}>
            <h3 style={{color: 'var(--color-chart-cyan)', fontSize: 'var(--font-md)', marginBottom: 'var(--margin-md)'}}>
              Trap Data Retention
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Trap raw data will be retained for last</label>
                <div style={{display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center'}}>
                  <input
                    type="number"
                    className={styles.formInput}
                    value={settings.trapRawDays}
                    onChange={(e) => handleChange('trapRawDays', e.target.value)}
                    style={{width: '120px'}}
                  />
                  <span style={{color: 'var(--color-text-secondary)'}}>Days</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Trap aggregated data will be retained for last</label>
                <div style={{display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center'}}>
                  <input
                    type="number"
                    className={styles.formInput}
                    value={settings.trapAggregatedDays}
                    onChange={(e) => handleChange('trapAggregatedDays', e.target.value)}
                    style={{width: '120px'}}
                  />
                  <span style={{color: 'var(--color-text-secondary)'}}>Days</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.settingsSection}>
            <h3 style={{color: 'var(--color-chart-cyan)', fontSize: 'var(--font-md)', marginBottom: 'var(--margin-md)'}}>
              System Event Data Retention
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Notification data will be retained for last</label>
                <div style={{display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center'}}>
                  <input
                    type="number"
                    className={styles.formInput}
                    value={settings.notificationDays}
                    onChange={(e) => handleChange('notificationDays', e.target.value)}
                    style={{width: '120px'}}
                  />
                  <span style={{color: 'var(--color-text-secondary)'}}>Days</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Audit data will be retained for last</label>
                <div style={{display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center'}}>
                  <input
                    type="number"
                    className={styles.formInput}
                    value={settings.auditDays}
                    onChange={(e) => handleChange('auditDays', e.target.value)}
                    style={{width: '120px'}}
                  />
                  <span style={{color: 'var(--color-text-secondary)'}}>Days</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.settingsSection}>
            <h3 style={{color: 'var(--color-chart-cyan)', fontSize: 'var(--font-md)', marginBottom: 'var(--margin-md)'}}>
              Alert Data Retention
            </h3>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Alert Policy data will be retained for last</label>
              <div style={{display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center'}}>
                <input
                  type="number"
                  className={styles.formInput}
                  value={settings.alertDays}
                  onChange={(e) => handleChange('alertDays', e.target.value)}
                  style={{width: '120px'}}
                />
                <span style={{color: 'var(--color-text-secondary)'}}>Days</span>
              </div>
            </div>
          </div>
          <div className={styles.settingsSection}>
            <h3 style={{color: 'var(--color-chart-cyan)', fontSize: 'var(--font-md)', marginBottom: 'var(--margin-md)'}}>
              NCM Data Retention
            </h3>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>NCM data will be retained for last</label>
              <div style={{display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center'}}>
                <input
                  type="number"
                  className={styles.formInput}
                  value={settings.ncmDays}
                  onChange={(e) => handleChange('ncmDays', e.target.value)}
                  style={{width: '120px'}}
                />
                <span style={{color: 'var(--color-text-secondary)'}}>version(s)</span>
              </div>
            </div>
          </div>
          <div className={styles.settingsSection}>
            <h3 style={{color: 'var(--color-chart-cyan)', fontSize: 'var(--font-md)', marginBottom: 'var(--margin-md)'}}>
              NetRoute Data Retention
            </h3>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>NetRoute data will be retained for last</label>
              <div style={{display: 'flex', gap: 'var(--gap-sm)', alignItems: 'center'}}>
                <input
                  type="number"
                  className={styles.formInput}
                  value={settings.netrouteDays}
                  onChange={(e) => handleChange('netrouteDays', e.target.value)}
                  style={{width: '120px'}}
                />
                <span style={{color: 'var(--color-text-secondary)'}}>Days</span>
              </div>
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.btnSecondary}>Reset</button>
            <button className={styles.btnPrimary}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default DataRetention;
