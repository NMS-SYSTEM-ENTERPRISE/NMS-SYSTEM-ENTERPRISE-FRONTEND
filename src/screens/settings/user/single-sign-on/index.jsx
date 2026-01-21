"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const SingleSignOn = () => {
  const [settings, setSettings] = useState({
    serviceProviderEntityId: 'snr-edatas-AIOps',
    redirectURL: 'https://172.16.14.71/api/v1/sso/callback',
    serviceProviderLoginURL: 'https://172.16.14.71/api/v1/sso',
    serviceProviderLogoutURL: 'https://172.16.14.71/api/v1/sso/logout',
    identityProvider: 'OneLogin',
    identityProviderEntityId:
      'https://app.onelogin.com/saml/metadata/444d8ba1-4ebe-4752-8ecd-90b9864b18c6',
    identityProviderLoginURL:
      'https://rahit-test-dev.onelogin.com/trust/saml2/http-post/sso/8743535',
    identityProviderLogoutURL:
      'https://rahit-test-dev.onelogin.com/trust/saml2/http-redirect/slo/3643535',
    nameIdFormat: 'Unspecified',
  });
  return (
    
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <div>
              <h2 className={styles.pageTitle}>Single Sign-On</h2>
              <p className={styles.pageDescription}>
                Single Sign-On is an authentication process that allows a user
                to access multiple applications with one of login credentials.
                For more information:{' '}
                <a href="#" className={styles.linkBlue}>
                  Single Sign-On{' '}
                  <Icon icon="mdi:open-in-new" width={14} height={14} />
                </a>
              </p>
            </div>
          </div>
          <div className={styles.settingsSection}>
            <h3
              style={{
                color: 'var(--color-chart-cyan)',
                fontSize: 'var(--font-md)',
                marginBottom: 'var(--margin-md)',
              }}
            >
              Service Provider Details
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Service Provider Entity ID
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={settings.serviceProviderEntityId}
                    readOnly
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
                    <Icon icon="mdi:content-copy" width={18} height={18} />
                  </button>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Redirect URL</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={settings.redirectURL}
                    readOnly
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
                    <Icon icon="mdi:content-copy" width={18} height={18} />
                  </button>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Service Provider Login URL
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={settings.serviceProviderLoginURL}
                    readOnly
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
                    <Icon icon="mdi:content-copy" width={18} height={18} />
                  </button>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Service Provider Logout URL
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={settings.serviceProviderLogoutURL}
                    readOnly
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
                    <Icon icon="mdi:content-copy" width={18} height={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.settingsSection}>
            <h3
              style={{
                color: 'var(--color-chart-cyan)',
                fontSize: 'var(--font-md)',
                marginBottom: 'var(--margin-md)',
              }}
            >
              Identity Provider Details
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Identity Provider{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <SelectComponent
                  className={styles.formSelect}
                  value={settings.identityProvider}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      identityProvider: e.target.value,
                    })
                  }
                  options={[
                    { value: 'OneLogin', label: 'OneLogin' },
                    { value: 'Okta', label: 'Okta' },
                    { value: 'Azure AD', label: 'Azure AD' },
                  ]}
                  placeholder="Select"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Identity Provider Configuration
                </label>
                <div style={{ display: 'flex', gap: 'var(--gap-sm)' }}>
                  <button className={styles.btnSecondary}>
                    Upload Metadata File
                  </button>
                  <button className={styles.btnPrimary}>
                    Configure Manually
                  </button>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Identity Provider Entity ID{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={settings.identityProviderEntityId}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      identityProviderEntityId: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Identity Provider Login URL{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={settings.identityProviderLoginURL}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      identityProviderLoginURL: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Identity Provider Logout URL{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={settings.identityProviderLogoutURL}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      identityProviderLogoutURL: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  NameID Format{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <SelectComponent
                  className={styles.formSelect}
                  value={settings.nameIdFormat}
                  onChange={(e) =>
                    setSettings({ ...settings, nameIdFormat: e.target.value })
                  }
                  options={[
                    { value: 'Unspecified', label: 'Unspecified' },
                    { value: 'Email', label: 'Email' },
                    { value: 'Persistent', label: 'Persistent' },
                  ]}
                  placeholder="Select"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Identity Provider X.509 Certificate
                </label>
                <div style={{ display: 'flex', gap: 'var(--gap-sm)' }}>
                  <button className={styles.btnPrimary}>
                    Configure Manually
                  </button>
                  <button className={styles.btnSecondary}>
                    Upload Certificate
                  </button>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Identity Provider Fingerprint{' '}
                  <span
                    style={{
                      color: 'var(--color-chart-cyan)',
                      cursor: 'pointer',
                    }}
                  >
                    <Icon
                      icon="mdi:information-outline"
                      width={16}
                      height={16}
                    />
                  </span>
                </label>
                {/* Fingerprint input/display could go here if needed, image shows info icon */}
              </div>
            </div>
            <div
              style={{
                padding: 'var(--padding-md)',
                backgroundColor: 'var(--color-bg-tertiary)',
                borderRadius: 'var(--radius-sm)',
                marginTop: 'var(--margin-md)',
              }}
            >
              <p
                style={{
                  margin: '0 0 8px 0',
                  fontSize: 'var(--font-xs)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                -----BEGIN CERTIFICATE-----
              </p>
              <p
                style={{
                  margin: '0 0 8px 0',
                  fontSize: 'var(--font-xs)',
                  color: 'var(--color-text-secondary)',
                  wordBreak: 'break-all',
                }}
              >
                MIIDzRCCAksGAwIBAgIJAK5gJAvwR+6hIrY20/2xOvlJGhTG9ndaW4g...
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 'var(--font-xs)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {settings.identityProviderEntityId.split('/').pop()}
              </p>
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.btnSecondary}>Reset</button>
            <button className={styles.btnPrimary}>Save</button>
          </div>
        </div>
      </div>
  );
};
export default SingleSignOn;
