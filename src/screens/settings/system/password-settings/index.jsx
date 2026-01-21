"use client";
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const PasswordSettings = () => {
  const [settings, setSettings] = useState({
    passwordExpiry: true,
    expiryDays: 15,
    passwordUppercase: true,
    passwordLowercase: true,
    passwordNumber: true,
    passwordSpecialChar: true,
    passwordLength: 8,
  });
  return (
    
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <h2 className={styles.pageTitle}>Password Settings</h2>
          <p className={styles.pageDescription}>
            Set up robust password policy for snr-edatas AIOps user access. For
            more information:{' '}
            <a href="#" className={styles.link}>
              Password Settings
              <Icon icon="mdi:open-in-new" width={16} height={16} />
            </a>
          </p>
          <div className={styles.settingsSection}>
            <div className={styles.settingRow}>
              <label className={styles.settingLabel}>Password Expiry</label>
              <div className={styles.settingControl}>
                <button
                  className={`${styles.toggleBtn} ${
                    settings.passwordExpiry ? styles.toggleBtnOn : ''
                  }`}
                  onClick={() =>
                    setSettings({
                      ...settings,
                      passwordExpiry: !settings.passwordExpiry,
                    })
                  }
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>
                    {settings.passwordExpiry ? 'ON' : 'OFF'}
                  </span>
                </button>
                <div
                  style={{
                    display: 'flex',
                    gap: 'var(--gap-sm)',
                    alignItems: 'center',
                  }}
                >
                  <input
                    type="number"
                    className={styles.formInput}
                    value={settings.expiryDays}
                    onChange={(e) =>
                      setSettings({ ...settings, expiryDays: e.target.value })
                    }
                    style={{ width: '100px' }}
                  />
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    Days
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.settingRow}>
              <label className={styles.settingLabel}>Password Uppercase</label>
              <button
                className={`${styles.toggleBtn} ${
                  settings.passwordUppercase ? styles.toggleBtnOn : ''
                }`}
                onClick={() =>
                  setSettings({
                    ...settings,
                    passwordUppercase: !settings.passwordUppercase,
                  })
                }
              >
                <span className={styles.toggleSlider}></span>
                <span className={styles.toggleLabel}>
                  {settings.passwordUppercase ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>
            <div className={styles.settingRow}>
              <label className={styles.settingLabel}>Password Lowercase</label>
              <button
                className={`${styles.toggleBtn} ${
                  settings.passwordLowercase ? styles.toggleBtnOn : ''
                }`}
                onClick={() =>
                  setSettings({
                    ...settings,
                    passwordLowercase: !settings.passwordLowercase,
                  })
                }
              >
                <span className={styles.toggleSlider}></span>
                <span className={styles.toggleLabel}>
                  {settings.passwordLowercase ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>
            <div className={styles.settingRow}>
              <label className={styles.settingLabel}>
                Password with Number
              </label>
              <button
                className={`${styles.toggleBtn} ${
                  settings.passwordNumber ? styles.toggleBtnOn : ''
                }`}
                onClick={() =>
                  setSettings({
                    ...settings,
                    passwordNumber: !settings.passwordNumber,
                  })
                }
              >
                <span className={styles.toggleSlider}></span>
                <span className={styles.toggleLabel}>
                  {settings.passwordNumber ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>
            <div className={styles.settingRow}>
              <label className={styles.settingLabel}>
                Password with Special Character
              </label>
              <button
                className={`${styles.toggleBtn} ${
                  settings.passwordSpecialChar ? styles.toggleBtnOn : ''
                }`}
                onClick={() =>
                  setSettings({
                    ...settings,
                    passwordSpecialChar: !settings.passwordSpecialChar,
                  })
                }
              >
                <span className={styles.toggleSlider}></span>
                <span className={styles.toggleLabel}>
                  {settings.passwordSpecialChar ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>
            <div className={styles.settingRow}>
              <label className={styles.settingLabel}>
                Password Length
                <span
                  style={{ color: 'var(--color-danger)', marginLeft: '4px' }}
                >
                  *
                </span>
              </label>
              <input
                type="number"
                className={styles.formInput}
                value={settings.passwordLength}
                onChange={(e) =>
                  setSettings({ ...settings, passwordLength: e.target.value })
                }
                style={{ width: '100px' }}
              />
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.btnSecondary}>Reset to default</button>
            <button className={styles.btnPrimary}>
              Save Password Settings
            </button>
          </div>
        </div>
  );
};
export default PasswordSettings;
