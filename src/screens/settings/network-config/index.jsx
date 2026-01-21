"use client";
import { useState } from 'react';
import sharedStyles from '../shared-settings-styles.module.css';

const NetworkConfigSettings = () => {
  const [activeTab, setActiveTab] = useState('tftp');

  return (
    <>
      <div className={sharedStyles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        <div className={sharedStyles.contentArea}>
          <div className={sharedStyles.contentHeader}>
            <div>
              <h2 className={sharedStyles.pageTitle}>Network Config Settings</h2>
              <p className={sharedStyles.pageDescription}>
                Configure network configuration management settings including TFTP, SCP, and backup policies.
              </p>
            </div>
          </div>

          <div className={sharedStyles.settingsSection}>
            <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid var(--color-border)', marginBottom: '20px' }}>
              <button 
                onClick={() => setActiveTab('tftp')}
                style={{ 
                  padding: '10px 20px', 
                  backgroundColor: 'transparent', 
                  border: 'none', 
                  borderBottom: activeTab === 'tftp' ? '2px solid var(--color-chart-cyan)' : 'none',
                  color: activeTab === 'tftp' ? 'var(--color-chart-cyan)' : 'var(--color-text-secondary)',
                  cursor: 'pointer'
                }}
              >
                TFTP Settings
              </button>
              <button 
                onClick={() => setActiveTab('scp')}
                style={{ 
                  padding: '10px 20px', 
                  backgroundColor: 'transparent', 
                  border: 'none', 
                  borderBottom: activeTab === 'scp' ? '2px solid var(--color-chart-cyan)' : 'none',
                  color: activeTab === 'scp' ? 'var(--color-chart-cyan)' : 'var(--color-text-secondary)',
                  cursor: 'pointer'
                }}
              >
                SCP Settings
              </button>
              <button 
                onClick={() => setActiveTab('backup')}
                style={{ 
                  padding: '10px 20px', 
                  backgroundColor: 'transparent', 
                  border: 'none', 
                  borderBottom: activeTab === 'backup' ? '2px solid var(--color-chart-cyan)' : 'none',
                  color: activeTab === 'backup' ? 'var(--color-chart-cyan)' : 'var(--color-text-secondary)',
                  cursor: 'pointer'
                }}
              >
                Backup Policy
              </button>
            </div>

            {activeTab === 'tftp' && (
              <div className={sharedStyles.formGrid}>
                <div className={sharedStyles.formGroup}>
                  <label className={sharedStyles.formLabel}>TFTP Server IP</label>
                  <input type="text" className={sharedStyles.formInput} placeholder="127.0.0.1" />
                </div>
                <div className={sharedStyles.formGroup}>
                  <label className={sharedStyles.formLabel}>TFTP Port</label>
                  <input type="number" className={sharedStyles.formInput} placeholder="69" />
                </div>
                <div className={sharedStyles.formGroup}>
                  <label className={sharedStyles.formLabel}>Storage Directory</label>
                  <input type="text" className={sharedStyles.formInput} placeholder="/var/lib/tftpboot" />
                </div>
              </div>
            )}

            {activeTab === 'scp' && (
              <div className={sharedStyles.formGrid}>
                <div className={sharedStyles.formGroup}>
                  <label className={sharedStyles.formLabel}>SCP Server IP</label>
                  <input type="text" className={sharedStyles.formInput} placeholder="127.0.0.1" />
                </div>
                <div className={sharedStyles.formGroup}>
                  <label className={sharedStyles.formLabel}>SCP Port</label>
                  <input type="number" className={sharedStyles.formInput} placeholder="22" />
                </div>
                <div className={sharedStyles.formGroup}>
                  <label className={sharedStyles.formLabel}>Username</label>
                  <input type="text" className={sharedStyles.formInput} placeholder="admin" />
                </div>
              </div>
            )}

            {activeTab === 'backup' && (
              <div className={sharedStyles.formGrid}>
                <div className={sharedStyles.formGroup}>
                  <label className={sharedStyles.formLabel}>Backup Interval (Hours)</label>
                  <input type="number" className={sharedStyles.formInput} placeholder="24" />
                </div>
                <div className={sharedStyles.formGroup}>
                  <label className={sharedStyles.formLabel}>Retention Count</label>
                  <input type="number" className={sharedStyles.formInput} placeholder="10" />
                </div>
              </div>
            )}

            <div className={sharedStyles.actionButtons}>
              <button className={sharedStyles.btnSecondary}>Reset to Default</button>
              <button className={sharedStyles.btnPrimary} onClick={() => alert('Settings saved!')}>Save Configuration</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NetworkConfigSettings;
