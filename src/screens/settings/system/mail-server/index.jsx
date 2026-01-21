"use client";
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const MailServerSettings = () => {
  const [settings, setSettings] = useState({
    smtpServer: 'smtp.gmail.com',
    useProxyServer: false,
    securityType: 'TLS',
    smtpServerPort: '587',
    authenticationType: 'Basic',
    fromEmail: 'pmg.aiops@gmail.com',
    authRequired: true,
    username: 'pmg.aiops@gmail.com',
    password: '',
  });
  return (
    
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <h2 className={styles.pageTitle}>Mail Server Settings</h2>
          <p className={styles.pageDescription}>
            Configure mail servers for seamless email notifications from
            snr-edatas AIOps. For more information:{' '}
            <a href="#" className={styles.link}>
              Mail Server Settings
              <Icon icon="mdi:open-in-new" width={16} height={16} />
            </a>
          </p>
          <div className={styles.settingsSection}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  SMTP Server{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={settings.smtpServer}
                  onChange={(e) =>
                    setSettings({ ...settings, smtpServer: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Use Proxy Server</label>
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
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Security Type{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <div className={styles.buttonGroup}>
                  <button
                    className={`${styles.modeBtn} ${
                      settings.securityType === 'None'
                        ? styles.modeBtnActive
                        : ''
                    }`}
                    onClick={() =>
                      setSettings({ ...settings, securityType: 'None' })
                    }
                  >
                    None
                  </button>
                  <button
                    className={`${styles.modeBtn} ${
                      settings.securityType === 'SSL'
                        ? styles.modeBtnActive
                        : ''
                    }`}
                    onClick={() =>
                      setSettings({ ...settings, securityType: 'SSL' })
                    }
                  >
                    SSL
                  </button>
                  <button
                    className={`${styles.modeBtn} ${
                      settings.securityType === 'TLS'
                        ? styles.modeBtnActive
                        : ''
                    }`}
                    onClick={() =>
                      setSettings({ ...settings, securityType: 'TLS' })
                    }
                  >
                    TLS
                  </button>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  SMTP Server Port{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={settings.smtpServerPort}
                  onChange={(e) =>
                    setSettings({ ...settings, smtpServerPort: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Authentication Type{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <div className={styles.buttonGroup}>
                  <button
                    className={`${styles.modeBtn} ${
                      settings.authenticationType === 'Basic'
                        ? styles.modeBtnActive
                        : ''
                    }`}
                    onClick={() =>
                      setSettings({ ...settings, authenticationType: 'Basic' })
                    }
                  >
                    Basic
                  </button>
                  <button
                    className={`${styles.modeBtn} ${
                      settings.authenticationType === 'OAuth2.0'
                        ? styles.modeBtnActive
                        : ''
                    }`}
                    onClick={() =>
                      setSettings({
                        ...settings,
                        authenticationType: 'OAuth2.0',
                      })
                    }
                  >
                    OAuth2.0
                  </button>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  From Email{' '}
                  <Icon icon="mdi:information-outline" width={14} height={14} />
                </label>
                <input
                  type="email"
                  className={styles.formInput}
                  value={settings.fromEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, fromEmail: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Authentication Requires{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
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
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  User Name{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={settings.username}
                  onChange={(e) =>
                    setSettings({ ...settings, username: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Password{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    className={styles.formInput}
                    value={settings.password}
                    onChange={(e) =>
                      setSettings({ ...settings, password: e.target.value })
                    }
                  />
                  <button
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-text-secondary)',
                      cursor: 'pointer',
                    }}
                  >
                    <Icon icon="mdi:reload" width={18} height={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.btnSecondary}>Reset</button>
            <button className={styles.btnSecondary}>
              <Icon icon="mdi:email-check" width={18} height={18} />
              Test
            </button>
            <button className={styles.btnPrimary}>
              Save Mail Server Settings
            </button>
          </div>
        </div>
  );
};
export default MailServerSettings;
