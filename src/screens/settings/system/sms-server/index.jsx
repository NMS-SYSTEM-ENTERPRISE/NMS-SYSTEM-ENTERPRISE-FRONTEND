"use client";
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const SMSServerSettings = () => {
  const [settings, setSettings] = useState({
    smsGatewayUrl:
      'http://10.20.40.146:5000/send_sms?recipient=$$number$$&message=$$m',
    useProxyServer: false,
  });
  return (
    
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <h2 className={styles.pageTitle}>SMS Server Settings</h2>
          <p className={styles.pageDescription}>
            Simplify SMS notification in snr-edatas AIOps by configuring SMS
            Gateway URLs. For more information:{' '}
            <a href="#" className={styles.link}>
              SMS Server Settings
              <Icon icon="mdi:open-in-new" width={16} height={16} />
            </a>
          </p>
          <div className={styles.settingsSection}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                SMS Gateway URL{' '}
                <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <input
                type="text"
                className={styles.formInput}
                value={settings.smsGatewayUrl}
                onChange={(e) =>
                  setSettings({ ...settings, smsGatewayUrl: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Use Proxy Server{' '}
                <Icon icon="mdi:information-outline" width={14} height={14} />
              </label>
              <button
                className={`${styles.toggleBtn} ${
                  settings.useProxyServer ? styles.toggleBtnOn : ''
                }`}
                onClick={() =>
                  setSettings({
                    ...settings,
                    useProxyServer: !settings.useProxyServer,
                  })
                }
              >
                <span className={styles.toggleSlider}></span>
                <span className={styles.toggleLabel}>
                  {settings.useProxyServer ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.btnSecondary}>Reset</button>
            <button className={styles.btnSecondary}>
              <Icon icon="mdi:test-tube" width={18} height={18} />
              Test
            </button>
            <button className={styles.btnPrimary}>
              Save SMS Server Settings
            </button>
          </div>
        </div>
  );
};
export default SMSServerSettings;
