'use client';

import { SettingRow } from '@/components/features/settings/user/password-settings/SettingRow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TimelineModal } from '@/components/ui/timeline-modal';
import { ToggleSwitch } from '@/components/ui/toggle-switch';
import { usePasswordSettingsScreen } from '@/hooks/settings/user/password-settings/usePasswordSettingsScreen';
import {
  PASSWORD_TIMELINE_STEPS,
  PASSWORD_TOGGLE_ROWS,
} from '@/utils/constants/settings/users/password-settings';
import { Icon } from '@iconify/react';
import sharedStyles from '@/screens/settings/shared-settings-styles.module.css';
import styles from './styles.module.css';

export const PasswordSettingsContent = () => {
  const { settings, showTimeline, setShowTimeline, toggle, update, handleSave, handleReset } =
    usePasswordSettingsScreen();

  return (
    <div className={sharedStyles.mainContent}>
      <div className={`${sharedStyles.contentArea} ${sharedStyles.formPageContent}`}>
        <div className={sharedStyles.contentHeader}>
          <div>
            <h2 className={sharedStyles.pageTitle}>Password Settings</h2>
            <p className={sharedStyles.pageDescription}>
              Set up a robust password policy for user access. For more information:{' '}
              <a
                href="#"
                className={sharedStyles.linkBlue}
                onClick={(e) => {
                  e.preventDefault();
                  setShowTimeline(true);
                }}
              >
                Password Settings <Icon icon="mdi:open-in-new" width={14} height={14} />
              </a>
            </p>
          </div>
        </div>

        <div className={sharedStyles.settingsFormPanel}>
          <div className={sharedStyles.settingsSection}>
            <SettingRow label="Password Expiry">
              <ToggleSwitch
                checked={settings.expiry}
                onChange={() => toggle('expiry')}
                showInlineLabel
              />
              {settings.expiry && (
                <div className={styles.expiryRow}>
                  <Input
                    type="number"
                    className={sharedStyles.formNumberInput}
                    value={settings.expiryDays}
                    min={1}
                    onChange={(e) =>
                      update('expiryDays', parseInt(e.target.value, 10) || 0)
                    }
                  />
                  <span className={sharedStyles.fieldSuffix}>Days</span>
                </div>
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
              <Input
                type="number"
                className={sharedStyles.formNumberInput}
                value={settings.length}
                min={1}
                onChange={(e) => update('length', parseInt(e.target.value, 10) || 0)}
              />
            </SettingRow>
          </div>
        </div>

        <div className={sharedStyles.actionButtons}>
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
