"use client";
import { SelectComponent } from '@/components/ui/select';
import { useState } from 'react';
import styles from '../shared-settings-styles.module.css';

const FlowSettings = () => {
  const [settings, setSettings] = useState({
    enableFlowCollection: true,
    flowRetentionDays: '30',
    samplingRate: '1:1000',
    aggregationInterval: '5',
    maxFlowsPerSecond: '10000',
    enableNetflow: true,
    enableSflow: true,
    enableIPFIX: true,
    enableJflow: false,
    netflowPort: '2055',
    sflowPort: '6343',
    ipfixPort: '4739',
    topTalkersCount: '100',
    alertOnSpike: true,
    spikeThreshold: '200',
  });

  const handleSave = () => {
    console.log('Save flow settings:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          <h2 className={styles.pageTitle}>Flow Settings</h2>
          <p className={styles.pageDescription}>
            Configure NetFlow, sFlow, IPFIX, and other flow data collection settings
          </p>

          {/* Collection Settings */}
          <div className={styles.settingsSection}>
            <h3 style={{color: 'var(--color-chart-cyan)', fontSize: 'var(--font-md)', marginBottom: 'var(--margin-md)'}}>
              Flow Collection Settings
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Enable Flow Collection</label>
                <button
                  className={`${styles.toggleBtn} ${settings.enableFlowCollection ? styles.toggleBtnOn : ''}`}
                  onClick={() => setSettings({...settings, enableFlowCollection: !settings.enableFlowCollection})}
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>{settings.enableFlowCollection ? 'ON' : 'OFF'}</span>
                </button>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Sampling Rate</label>
                <SelectComponent
                  className={styles.formSelect}
                  value={settings.samplingRate}
                  onChange={(e) => setSettings({...settings, samplingRate: e.target.value})}
                  options={[
                    { value: '1:100', label: '1:100' },
                    { value: '1:1000', label: '1:1000' },
                    { value: '1:10000', label: '1:10000' },
                  ]}
                  placeholder="Select"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Aggregation Interval (minutes)</label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={settings.aggregationInterval}
                  onChange={(e) => setSettings({...settings, aggregationInterval: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Max Flows Per Second</label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={settings.maxFlowsPerSecond}
                  onChange={(e) => setSettings({...settings, maxFlowsPerSecond: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Protocol Settings */}
          <div className={styles.settingsSection}>
            <h3 style={{color: 'var(--color-chart-cyan)', fontSize: 'var(--font-md)', marginBottom: 'var(--margin-md)'}}>
              Flow Protocols
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Enable NetFlow</label>
                <button
                  className={`${styles.toggleBtn} ${settings.enableNetflow ? styles.toggleBtnOn : ''}`}
                  onClick={() => setSettings({...settings, enableNetflow: !settings.enableNetflow})}
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>{settings.enableNetflow ? 'ON' : 'OFF'}</span>
                </button>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>NetFlow Port</label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={settings.netflowPort}
                  onChange={(e) => setSettings({...settings, netflowPort: e.target.value})}
                  disabled={!settings.enableNetflow}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Enable sFlow</label>
                <button
                  className={`${styles.toggleBtn} ${settings.enableSflow ? styles.toggleBtnOn : ''}`}
                  onClick={() => setSettings({...settings, enableSflow: !settings.enableSflow})}
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>{settings.enableSflow ? 'ON' : 'OFF'}</span>
                </button>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>sFlow Port</label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={settings.sflowPort}
                  onChange={(e) => setSettings({...settings, sflowPort: e.target.value})}
                  disabled={!settings.enableSflow}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Enable IPFIX</label>
                <button
                  className={`${styles.toggleBtn} ${settings.enableIPFIX ? styles.toggleBtnOn : ''}`}
                  onClick={() => setSettings({...settings, enableIPFIX: !settings.enableIPFIX})}
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>{settings.enableIPFIX ? 'ON' : 'OFF'}</span>
                </button>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>IPFIX Port</label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={settings.ipfixPort}
                  onChange={(e) => setSettings({...settings, ipfixPort: e.target.value})}
                  disabled={!settings.enableIPFIX}
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

export default FlowSettings;
