'use client';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
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
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const update = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave  = () => console.log('Save SSO settings:', settings);
  const handleReset = () => setSettings(DEFAULT_SETTINGS);

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

          {/* Certificate display block */}
          <div className={localStyles.certificateBox}>
            <p className={classNames(styles.helpText, localStyles.certText)}>
              -----BEGIN CERTIFICATE-----
            </p>
            <p className={classNames(styles.helpText, localStyles.certTextBreak)}>
              MIIDzRCCAksGAwIBAgIJAK5gJAvwR+6hIrY20/2xOvlJGhTG9ndaW4g...
            </p>
            <p className={styles.helpText}>
              {settings.identityProviderEntityId.split('/').pop()}
            </p>
          </div>
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
