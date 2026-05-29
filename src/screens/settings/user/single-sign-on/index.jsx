'use client';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useSso } from '@/hooks/settings/user/single-sign-on/useSso';
import styles from '../../shared-settings-styles.module.css';
import localStyles from '@/components/features/settings/user/single-sign-on/styles.module.css';
import classNames from 'classnames';

import {
  IDENTITY_PROVIDER_OPTIONS,
  NAME_ID_FORMAT_OPTIONS,
  DEFAULT_SSO_SETTINGS as DEFAULT_SETTINGS,
} from '@/utils/constants/settings/users';
import { ReadOnlyField } from '@/components/features/settings/user/single-sign-on/ReadOnlyField';
import { SectionTitle } from '@/components/features/settings/user/single-sign-on/SectionTitle';

// ─── Main Screen ──────────────────────────────────────────────

const SingleSignOn = () => {
  const { getSsoConfig, updateSsoConfig, resetSsoConfig } = useSso();
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const fetchConfig = async () => {
    const data = await getSsoConfig();
    if (data) {
      setSettings({
        serviceProviderEntityId: data.sp_entity_id || '',
        redirectURL: data.sp_acs_url || '',
        serviceProviderLoginURL: data.sp_login_url || '',
        serviceProviderLogoutURL: data.sp_logout_url || '',
        identityProvider: data.idp_type || 'OneLogin',
        identityProviderEntityId: data.idp_entity_id || '',
        identityProviderLoginURL: data.idp_login_url || '',
        identityProviderLogoutURL: data.idp_logout_url || '',
        nameIdFormat: data.nameid_format || 'Unspecified',
        x509_certificate: data.x509_certificate || '',
        idp_fingerprint: data.idp_fingerprint || '',
        is_active: data.is_active || false,
      });
    }
  };

  useEffect(() => {
    fetchConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    const payload = {
      sp_entity_id: settings.serviceProviderEntityId,
      sp_acs_url: settings.redirectURL,
      sp_login_url: settings.serviceProviderLoginURL,
      sp_logout_url: settings.serviceProviderLogoutURL,
      idp_type: settings.identityProvider,
      idp_name: settings.identityProvider,
      idp_entity_id: settings.identityProviderEntityId,
      idp_login_url: settings.identityProviderLoginURL,
      idp_logout_url: settings.identityProviderLogoutURL,
      nameid_format: settings.nameIdFormat,
      x509_certificate: settings.x509_certificate,
      idp_fingerprint: settings.idp_fingerprint,
      is_active: settings.is_active,
    };
    await updateSsoConfig(payload);
  };

  const handleReset = async () => {
    const data = await resetSsoConfig();
    if (data) {
      setSettings({
        serviceProviderEntityId: data.sp_entity_id || '',
        redirectURL: data.sp_acs_url || '',
        serviceProviderLoginURL: data.sp_login_url || '',
        serviceProviderLogoutURL: data.sp_logout_url || '',
        identityProvider: data.idp_type || 'OneLogin',
        identityProviderEntityId: data.idp_entity_id || '',
        identityProviderLoginURL: data.idp_login_url || '',
        identityProviderLogoutURL: data.idp_logout_url || '',
        nameIdFormat: data.nameid_format || 'Unspecified',
        x509_certificate: data.x509_certificate || '',
        idp_fingerprint: data.idp_fingerprint || '',
        is_active: data.is_active || false,
      });
    }
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.contentArea}>

        {/* Page header */}
        <div className={styles.contentHeader}>
          <div>
            <h2 className={styles.pageTitle}>Single Sign-On</h2>
            <p className={styles.pageDescription}>
              Single Sign-On is an authentication process that allows a user to access multiple
              applications with one set of login credentials. For more information:{' '}
              <a href="#" className={styles.linkBlue}>
                Single Sign-On <Icon icon="mdi:open-in-new" width={14} />
              </a>
            </p>
          </div>
        </div>

        {/* ── Service Provider Details ── */}
        <div className={styles.settingsSection}>
          <SectionTitle>Service Provider Details</SectionTitle>
          <div className={styles.formGrid}>
            <ReadOnlyField label="Service Provider Entity ID" value={settings.serviceProviderEntityId} />
            <ReadOnlyField label="Redirect URL"               value={settings.redirectURL} />
            <ReadOnlyField label="Service Provider Login URL" value={settings.serviceProviderLoginURL} />
            <ReadOnlyField label="Service Provider Logout URL" value={settings.serviceProviderLogoutURL} />
          </div>
        </div>

        {/* ── Identity Provider Details ── */}
        <div className={styles.settingsSection}>
          <SectionTitle>Identity Provider Details</SectionTitle>
          <div className={styles.formGrid}>

            <FormField label="Identity Provider" required>
              <SelectComponent
                className={styles.formSelect}
                value={settings.identityProvider}
                onChange={(e) => update('identityProvider', e.target.value)}
                options={IDENTITY_PROVIDER_OPTIONS}
                placeholder="Select"
              />
            </FormField>

            <FormField label="Identity Provider Configuration">
              <div className={localStyles.buttonGroup}>
                <Button variant="secondary">Upload Metadata File</Button>
                <Button variant="cyan">Configure Manually</Button>
              </div>
            </FormField>

            <FormField label="Identity Provider Entity ID" required>
              <Input
                type="text"
                value={settings.identityProviderEntityId}
                onChange={(e) => update('identityProviderEntityId', e.target.value)}
              />
            </FormField>

            <FormField label="Identity Provider Login URL" required>
              <Input
                type="text"
                value={settings.identityProviderLoginURL}
                onChange={(e) => update('identityProviderLoginURL', e.target.value)}
              />
            </FormField>

            <FormField label="Identity Provider Logout URL" required>
              <Input
                type="text"
                value={settings.identityProviderLogoutURL}
                onChange={(e) => update('identityProviderLogoutURL', e.target.value)}
              />
            </FormField>

            <FormField label="NameID Format" required>
              <SelectComponent
                className={styles.formSelect}
                value={settings.nameIdFormat}
                onChange={(e) => update('nameIdFormat', e.target.value)}
                options={NAME_ID_FORMAT_OPTIONS}
                placeholder="Select"
              />
            </FormField>

            <FormField label="Identity Provider X.509 Certificate">
              <div className={localStyles.buttonGroup}>
                <Button variant="cyan">Configure Manually</Button>
                <Button variant="secondary">Upload Certificate</Button>
              </div>
            </FormField>

            <FormField label={
              <span className={localStyles.iconLabel}>
                Identity Provider Fingerprint
                <Icon icon="mdi:information-outline" width={16} className={localStyles.infoIcon} />
              </span>
            }>
              {/* Fingerprint display placeholder */}
            </FormField>
          </div>

          {settings.x509_certificate && (
            <div className={localStyles.certificateBox}>
              <p className={classNames(styles.helpText, localStyles.certText)}>
                -----BEGIN CERTIFICATE-----
              </p>
              <p className={classNames(styles.helpText, localStyles.certTextBreak)}>
                {settings.x509_certificate}
              </p>
              <p className={classNames(styles.helpText, localStyles.certText)}>
                -----END CERTIFICATE-----
              </p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className={styles.actionButtons}>
          <Button variant="secondary" onClick={handleReset}>Reset</Button>
          <Button variant="cyan" onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default SingleSignOn;
