'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleSwitch } from '@/components/ui/toggle-switch';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
import localStyles from '@/components/features/settings/user/password-settings/styles.module.css';
import classNames from 'classnames';
import { SettingRow } from '@/components/features/settings/user/password-settings/SettingRow';
import {
  PASSWORD_TOGGLE_ROWS,
  DEFAULT_PASSWORD_SETTINGS as DEFAULT_SETTINGS,
  PASSWORD_TIMELINE_STEPS,
} from '@/utils/constants/settings/users';
import { TimelineModal } from '@/components/ui/timeline-modal';

// ─── Main Screen ──────────────────────────────────────────────

const PasswordSettings = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [showTimeline, setShowTimeline] = useState(false);

  const toggle = (key) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const update = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave  = () => console.log('Saving password settings:', settings);
  const handleReset = () => setSettings(DEFAULT_SETTINGS);

  return (
    <div className={styles.mainContent}>
      <div className={styles.contentArea}>

        {/* Page header */}
        <div className={styles.contentHeader}>
          <div>
            <h2 className={styles.pageTitle}>Password Settings</h2>
            <p className={styles.pageDescription}>
              Set up robust password policy for snr-edatas AIOps user access. For more information:{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setShowTimeline(true); }} className={styles.linkBlue}>
                Password Settings <Icon icon="mdi:open-in-new" width={14} height={14} />
              </a>
            </p>
          </div>
        </div>

        {/* Settings card */}
        <div className={styles.settingsSection}>
          {/* Password Expiry */}
          <SettingRow label="Password Expiry">
            <ToggleSwitch
              checked={settings.expiry}
              onChange={() => toggle('expiry')}
              showInlineLabel
            />
            {settings.expiry && (
              <>
                <Input
                  type="number"
                  value={settings.expiryDays}
                  onChange={(e) => update('expiryDays', parseInt(e.target.value) || 0)}
                  containerClassName={localStyles.expiryInput}
                  className={localStyles.centerInput}
                />
                <span className={classNames(styles.settingLabel, localStyles.smallLabel)}>
                  Days
                </span>
              </>
            )}
          </SettingRow>

          {/* Boolean toggles */}
          {PASSWORD_TOGGLE_ROWS.map(({ key, label }) => (
            <SettingRow key={key} label={label}>
              <ToggleSwitch
                checked={settings[key]}
                onChange={() => toggle(key)}
                showInlineLabel
              />
            </SettingRow>
          ))}

          {/* Password Length */}
          <SettingRow label="Password Length" required noBorder>
            <Input
              type="number"
              value={settings.length}
              onChange={(e) => update('length', parseInt(e.target.value) || 0)}
              containerClassName={localStyles.lengthInput}
              className={localStyles.centerInput}
            />
          </SettingRow>
        </div>

        {/* Action buttons */}
        <div className={styles.actionButtons}>
          <Button variant="secondary" onClick={handleReset}>
            Reset to default
          </Button>
          <Button variant="cyan" onClick={handleSave}>
            Save Password Settings
          </Button>
        </div>
      </div>

      {/* Configuration Process Timeline Modal */}
      <TimelineModal
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        title="Password Policy Setup"
        steps={PASSWORD_TIMELINE_STEPS}
      />
    </div>
  );
};

export default PasswordSettings;
