'use client';
import { Button } from '@/components/ui/button';
import { ToggleSwitch } from '@/components/ui/toggle-switch';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import styles from '../../shared-settings-styles.module.css';
import { usePasswordPolicy } from '@/hooks/settings/user/password-settings/usePasswordPolicy';
import { SettingRow } from '@/components/features/settings/user/password-settings/SettingRow';
import {
  PASSWORD_TOGGLE_ROWS,
  DEFAULT_PASSWORD_SETTINGS as DEFAULT_SETTINGS,
  PASSWORD_TIMELINE_STEPS,
} from '@/utils/constants/settings/users';
import { TimelineModal } from '@/components/ui/timeline-modal';

const PasswordSettings = () => {
  const { getPasswordPolicy, updatePasswordPolicy, resetPasswordPolicy } = usePasswordPolicy();

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [showTimeline, setShowTimeline] = useState(false);

  const fetchPolicy = async () => {
    const data = await getPasswordPolicy();
    if (data) {
      setSettings({
        expiry: data.password_expiry ?? false,
        expiryDays: data.expiry_days ?? 90,
        uppercase: data.require_uppercase ?? true,
        lowercase: data.require_lowercase ?? true,
        numbers: data.require_numbers ?? true,
        specialChars: data.require_special_chars ?? true,
        length: data.min_length ?? 8,
      });
    }
  };

  useEffect(() => {
    fetchPolicy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (key) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const update = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    const payload = {
      password_expiry: settings.expiry,
      expiry_days: settings.expiryDays,
      require_uppercase: settings.uppercase,
      require_lowercase: settings.lowercase,
      require_numbers: settings.numbers,
      require_special_chars: settings.specialChars,
      min_length: settings.length,
    };
    await updatePasswordPolicy(payload);
  };

  const handleReset = async () => {
    const data = await resetPasswordPolicy();
    if (data) {
      setSettings({
        expiry: data.password_expiry ?? false,
        expiryDays: data.expiry_days ?? 90,
        uppercase: data.require_uppercase ?? true,
        lowercase: data.require_lowercase ?? true,
        numbers: data.require_numbers ?? true,
        specialChars: data.require_special_chars ?? true,
        length: data.min_length ?? 8,
      });
    }
  };

  return (
    <div className={styles.mainContent}>
      <div className={`${styles.contentArea} ${styles.formPageContent}`}>
        <div className={styles.contentHeader}>
          <div>
            <h2 className={styles.pageTitle}>Password Settings</h2>
            <p className={styles.pageDescription}>
              Set up a robust password policy for user access. For more information:{' '}
              <a
                href="#"
                className={styles.linkBlue}
                onClick={(e) => {
                  e.preventDefault();
                  setShowTimeline(true);
                }}
              >
                Password Settings{' '}
                <Icon icon="mdi:open-in-new" width={14} height={14} />
              </a>
            </p>
          </div>
        </div>

        <div className={styles.settingsFormPanel}>
          <div className={styles.settingsSection}>
            <SettingRow label="Password Expiry">
              <ToggleSwitch
                checked={settings.expiry}
                onChange={() => toggle('expiry')}
                showInlineLabel
              />
              {settings.expiry && (
                <>
                  <input
                    type="number"
                    className={styles.formNumberInput}
                    value={settings.expiryDays}
                    min={1}
                    onChange={(e) => update('expiryDays', parseInt(e.target.value, 10) || 0)}
                  />
                  <span className={styles.fieldSuffix}>Days</span>
                </>
              )}
            </SettingRow>

            {PASSWORD_TOGGLE_ROWS.map(({ key, label }) => (
              <SettingRow key={key} label={label}>
                <ToggleSwitch
                  checked={settings[key]}
                  onChange={() => toggle(key)}
                  showInlineLabel
                />
              </SettingRow>
            ))}

            <SettingRow label="Password Length" required noBorder>
              <input
                type="number"
                className={styles.formNumberInput}
                value={settings.length}
                min={1}
                onChange={(e) => update('length', parseInt(e.target.value, 10) || 0)}
              />
            </SettingRow>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <Button variant="secondary" onClick={handleReset}>
            Reset to default
          </Button>
          <Button variant="cyan" onClick={handleSave}>
            Save Password Settings
          </Button>
        </div>
      </div>

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
