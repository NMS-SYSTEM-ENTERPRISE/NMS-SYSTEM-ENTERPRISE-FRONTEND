"use client";
import { SelectComponent } from '@/components/ui/select';
import { TimelineModal } from '@/components/ui/timeline-modal';
import { SSO_TIMELINE_STEPS } from '@/utils/constants/settings/users/single-sign-on';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { useToast } from '@/hooks/useToast';
import styles from '../../shared-settings-styles.module.css';

const CopyableField = ({ label, value, readOnly = true, onChange, onCopySuccess }) => {
  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const ok = await copyToClipboard(value);
    if (ok) {
      onCopySuccess?.(`${label} copied to clipboard`);
    }
  };

  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel}>{label}</label>
      <div className={styles.formInputWrap}>
        <input
          type="text"
          className={styles.formInput}
          value={value}
          readOnly={readOnly}
          onChange={onChange}
        />
        <button
          type="button"
          className={styles.formCopyBtn}
          title="Copy to clipboard"
          onClick={handleCopy}
        >
          <Icon icon="mdi:content-copy" width={18} height={18} />
        </button>
      </div>
    </div>
  );
};

const SingleSignOn = () => {
  const { showSuccess } = useToast();
  const [showTimeline, setShowTimeline] = useState(false);
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
      <div className={`${styles.contentArea} ${styles.formPageContent}`}>
        <div className={styles.contentHeader}>
          <div>
            <h2 className={styles.pageTitle}>Single Sign-On</h2>
            <p className={styles.pageDescription}>
              Single Sign-On is an authentication process that allows a user
              to access multiple applications with one set of login credentials.
              For more information:{' '}
              <a
                href="#"
                className={styles.linkBlue}
                onClick={(e) => {
                  e.preventDefault();
                  setShowTimeline(true);
                }}
              >
                Single Sign-On{' '}
                <Icon icon="mdi:open-in-new" width={14} height={14} />
              </a>
            </p>
          </div>
        </div>

        <div className={styles.settingsFormPanel}>
          <div className={styles.settingsSection}>
            <h3 className={styles.sectionTitle}>Service Provider Details</h3>
            <div className={styles.formGrid}>
              <CopyableField
                label="Service Provider Entity ID"
                value={settings.serviceProviderEntityId}
                onCopySuccess={showSuccess}
              />
              <CopyableField
                label="Redirect URL"
                value={settings.redirectURL}
                onCopySuccess={showSuccess}
              />
              <CopyableField
                label="Service Provider Login URL"
                value={settings.serviceProviderLoginURL}
                onCopySuccess={showSuccess}
              />
              <CopyableField
                label="Service Provider Logout URL"
                value={settings.serviceProviderLogoutURL}
                onCopySuccess={showSuccess}
              />
            </div>
          </div>

          <div className={styles.settingsSection}>
            <h3 className={styles.sectionTitle}>Identity Provider Details</h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Identity Provider <span className={styles.requiredMark}>*</span>
                </label>
                <SelectComponent
                  className={styles.formSelect}
                  value={settings.identityProvider}
                  onChange={(e) =>
                    setSettings({ ...settings, identityProvider: e.target.value })
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
                <label className={styles.formLabel}>Identity Provider Configuration</label>
                <div className={styles.buttonGroup}>
                  <button type="button" className={styles.btnSecondary}>
                    Upload Metadata File
                  </button>
                  <button type="button" className={styles.btnPrimary}>
                    Configure Manually
                  </button>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Identity Provider Entity ID{' '}
                  <span className={styles.requiredMark}>*</span>
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
                  <span className={styles.requiredMark}>*</span>
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
                  <span className={styles.requiredMark}>*</span>
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
                  NameID Format <span className={styles.requiredMark}>*</span>
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
                <div className={styles.buttonGroup}>
                  <button type="button" className={styles.btnPrimary}>
                    Configure Manually
                  </button>
                  <button type="button" className={styles.btnSecondary}>
                    Upload Certificate
                  </button>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Identity Provider Fingerprint{' '}
                  <Icon
                    icon="mdi:information-outline"
                    width={16}
                    height={16}
                    style={{ color: 'var(--color-chart-cyan)', verticalAlign: 'middle' }}
                  />
                </label>
              </div>
            </div>

            <div className={styles.certificateBlock}>
              <p>-----BEGIN CERTIFICATE-----</p>
              <p className={styles.certificateBody}>
                MIIDzRCCAksGAwIBAgIJAK5gJAvwR+6hIrY20/2xOvlJGhTG9ndaW4g...
              </p>
              <p>{settings.identityProviderEntityId.split('/').pop()}</p>
            </div>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button type="button" className={styles.btnSecondary}>
            Reset
          </button>
          <button type="button" className={styles.btnPrimary}>
            Save
          </button>
        </div>
      </div>

      <TimelineModal
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        title="Single Sign-On Setup"
        steps={SSO_TIMELINE_STEPS}
      />
    </div>
  );
};

export default SingleSignOn;
