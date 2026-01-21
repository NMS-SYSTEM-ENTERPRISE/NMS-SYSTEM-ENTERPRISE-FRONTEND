"use client";
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const TwoFactorAuth = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [authMode, setAuthMode] = useState('Authenticator App');
  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          <p className={styles.pageDescription}>
            Two-Factor (2FA) Authentication strengthens your account by providing an extra layer protection and facilitates prevention of any unauthorized access. For more information:{' '}
            <a href="#" className={styles.link}>
              Two Factor Authentication
              <Icon icon="mdi:open-in-new" width={16} height={16} />
            </a>
          </p>
          <div className={styles.settingsSection}>
            <div className={styles.settingRow}>
              <label className={styles.settingLabel}>Two Factor Authentication</label>
              <div className={styles.settingControl}>
                <button
                  className={`${styles.toggleBtn} ${is2FAEnabled ? styles.toggleBtnOn : ''}`}
                  onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                >
                  <span className={styles.toggleLabel}>{is2FAEnabled ? 'ON' : 'OFF'}</span>
                  <span className={`${styles.toggleSlider} ${is2FAEnabled ? styles.toggleSliderOn : ''}`}></span>
                </button>
              </div>
            </div>
            <div className={styles.settingRow}>
              <label className={styles.settingLabel}>Mode of Authentication</label>
              <div className={styles.settingControl}>
                <div className={styles.buttonGroup}>
                  <button
                    className={`${styles.modeBtn} ${authMode === 'Authenticator App' ? styles.modeBtnActive : ''}`}
                    onClick={() => setAuthMode('Authenticator App')}
                  >
                    Authenticator App
                  </button>
                  <button
                    className={`${styles.modeBtn} ${authMode === 'Email' ? styles.modeBtnActive : ''}`}
                    onClick={() => setAuthMode('Email')}
                  >
                    Email
                  </button>
                </div>
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
export default TwoFactorAuth;
