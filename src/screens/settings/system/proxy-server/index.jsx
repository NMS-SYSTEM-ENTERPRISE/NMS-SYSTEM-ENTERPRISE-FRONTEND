"use client";
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const ProxyServerSettings = () => {
  const [settings, setSettings] = useState({
    proxyServerEnable: true,
    proxyServer: '',
    proxyServerPort: '3128',
    timeout: '',
    proxyType: 'HTTP',
    authRequired: false,
  });
  return (
    
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <h2 className={styles.pageTitle}>Proxy Server Settings</h2>
          <p className={styles.pageDescription}>
            Configure Proxy Server Settings in snr-edatas AIOps by providing
            server details and authentication. For more information:{' '}
            <a href="#" className={styles.link}>
              Proxy Server Settings
              <Icon icon="mdi:open-in-new" width={16} height={16} />
            </a>
          </p>
          <div className={styles.settingsSection}>
            <div className={styles.settingRow}>
              <label className={styles.settingLabel}>Proxy Server Enable</label>
              <button
                className={`${styles.toggleBtn} ${
                  settings.proxyServerEnable ? styles.toggleBtnOn : ''
                }`}
                onClick={() =>
                  setSettings({
                    ...settings,
                    proxyServerEnable: !settings.proxyServerEnable,
                  })
                }
              >
                <span className={styles.toggleSlider}></span>
                <span className={styles.toggleLabel}>
                  {settings.proxyServerEnable ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>
            <div className={styles.settingRow}>
              <label className={styles.formLabel}>
                Proxy Server{' '}
                <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <input
                type="text"
                className={styles.formInput}
                value={settings.proxyServer}
                onChange={(e) =>
                  setSettings({ ...settings, proxyServer: e.target.value })
                }
              />
            </div>
            <div className={styles.settingRow}>
              <label className={styles.formLabel}>
                Proxy Server Port{' '}
                <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <input
                type="text"
                className={styles.formInput}
                value={settings.proxyServerPort}
                onChange={(e) =>
                  setSettings({ ...settings, proxyServerPort: e.target.value })
                }
              />
            </div>
            <div className={styles.settingRow}>
              <label className={styles.formLabel}>
                Timeout (sec){' '}
                <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <input
                type="text"
                className={styles.formInput}
                value={settings.timeout}
                onChange={(e) =>
                  setSettings({ ...settings, timeout: e.target.value })
                }
              />
            </div>
            <div className={styles.settingRow}>
              <label className={styles.formLabel}>
                Proxy Type{' '}
                <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <div className={styles.buttonGroup}>
                <button
                  className={`${styles.modeBtn} ${
                    settings.proxyType === 'HTTP' ? styles.modeBtnActive : ''
                  }`}
                  onClick={() =>
                    setSettings({ ...settings, proxyType: 'HTTP' })
                  }
                >
                  HTTP
                </button>
                <button
                  className={`${styles.modeBtn} ${
                    settings.proxyType === 'Socks4' ? styles.modeBtnActive : ''
                  }`}
                  onClick={() =>
                    setSettings({ ...settings, proxyType: 'Socks4' })
                  }
                >
                  Socks4
                </button>
                <button
                  className={`${styles.modeBtn} ${
                    settings.proxyType === 'Socks5' ? styles.modeBtnActive : ''
                  }`}
                  onClick={() =>
                    setSettings({ ...settings, proxyType: 'Socks5' })
                  }
                >
                  Socks5
                </button>
              </div>
            </div>
            <div className={styles.settingRow}>
              <label className={styles.settingLabel}>
                Authentication Requires
              </label>
              <button
                className={`${styles.toggleBtn} ${
                  settings.authRequired ? styles.toggleBtnOn : ''
                }`}
                onClick={() =>
                  setSettings({
                    ...settings,
                    authRequired: !settings.authRequired,
                  })
                }
              >
                <span className={styles.toggleSlider}></span>
                <span className={styles.toggleLabel}>
                  {settings.authRequired ? 'ON' : 'OFF'}
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
              Save Proxy Server Settings
            </button>
          </div>
        </div>
  );
};
export default ProxyServerSettings;
