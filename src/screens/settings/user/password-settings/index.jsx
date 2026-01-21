"use client";
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const PasswordSettings = () => {
  const [settings, setSettings] = useState({
    expiry: true,
    expiryDays: 15,
    uppercase: true,
    lowercase: true,
    number: true,
    specialChar: true,
    length: 8,
  });
  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const handleChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleReset = () => {
    setSettings({
      expiry: true,
      expiryDays: 15,
      uppercase: true,
      lowercase: true,
      number: true,
      specialChar: true,
      length: 8,
    });
  };
  const handleSave = () => {
    console.log('Saving password settings:', settings);
    // Add API call here
  };
  return (
    
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <div>
              <h2 className={styles.pageTitle}>Password Settings</h2>
              <p className={styles.pageDescription}>
                Set up robust password policy for snr-edatas AIOps user access.
                For more information:{' '}
                <a href="#" className={styles.linkBlue}>
                  Password Settings{' '}
                  <Icon icon="mdi:open-in-new" width={14} height={14} />
                </a>
              </p>
            </div>
          </div>
          <div className={styles.settingsSection} style={{ maxWidth: '800px' }}>
            <div className={styles.settingRow}>
              <span className={styles.settingLabel}>Password Expiry</span>
              <div className={styles.settingControl}>
                <button
                  className={`${styles.toggleBtn} ${
                    settings.expiry ? styles.toggleBtnOn : ''
                  }`}
                  onClick={() => handleToggle('expiry')}
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>
                    {settings.expiry ? 'ON' : 'OFF'}
                  </span>
                </button>
                {settings.expiry && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <input
                      type="number"
                      className={styles.formInput}
                      style={{ width: '60px', textAlign: 'center' }}
                      value={settings.expiryDays}
                      onChange={(e) =>
                        handleChange(
                          'expiryDays',
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                    <span
                      className={styles.settingLabel}
                      style={{ fontSize: 'var(--font-sm)' }}
                    >
                      Days
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.settingRow}>
              <span className={styles.settingLabel}>Password Uppercase</span>
              <div className={styles.settingControl}>
                <button
                  className={`${styles.toggleBtn} ${
                    settings.uppercase ? styles.toggleBtnOn : ''
                  }`}
                  onClick={() => handleToggle('uppercase')}
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>
                    {settings.uppercase ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>
            </div>
            <div className={styles.settingRow}>
              <span className={styles.settingLabel}>Password Lowercase</span>
              <div className={styles.settingControl}>
                <button
                  className={`${styles.toggleBtn} ${
                    settings.lowercase ? styles.toggleBtnOn : ''
                  }`}
                  onClick={() => handleToggle('lowercase')}
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>
                    {settings.lowercase ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>
            </div>
            <div className={styles.settingRow}>
              <span className={styles.settingLabel}>Password with Number</span>
              <div className={styles.settingControl}>
                <button
                  className={`${styles.toggleBtn} ${
                    settings.number ? styles.toggleBtnOn : ''
                  }`}
                  onClick={() => handleToggle('number')}
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>
                    {settings.number ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>
            </div>
            <div className={styles.settingRow}>
              <span className={styles.settingLabel}>
                Password with Special Character
              </span>
              <div className={styles.settingControl}>
                <button
                  className={`${styles.toggleBtn} ${
                    settings.specialChar ? styles.toggleBtnOn : ''
                  }`}
                  onClick={() => handleToggle('specialChar')}
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>
                    {settings.specialChar ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>
            </div>
            <div className={styles.settingRow} style={{ borderBottom: 'none' }}>
              <span className={styles.settingLabel}>
                Password Length{' '}
                <span style={{ color: 'var(--color-danger)' }}>*</span>
              </span>
              <div className={styles.settingControl}>
                <input
                  type="number"
                  className={styles.formInput}
                  style={{ width: '100px' }}
                  value={settings.length}
                  onChange={(e) =>
                    handleChange('length', parseInt(e.target.value) || 0)
                  }
                />
              </div>
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.btnSecondary} onClick={handleReset}>
              Reset to default
            </button>
            <button className={styles.btnPrimary} onClick={handleSave}>
              Save Password Settings
            </button>
          </div>
        </div>
      </div>
  );
};
export default PasswordSettings;
