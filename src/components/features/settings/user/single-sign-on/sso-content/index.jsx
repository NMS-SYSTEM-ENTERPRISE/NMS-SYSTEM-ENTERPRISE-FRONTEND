'use client';

import { SettingsStatusMessage } from '@/components/features/settings/shared/settings-status-message';
import { SsoForm } from '@/components/features/settings/user/single-sign-on/sso-form';
import { TimelineModal } from '@/components/ui/timeline-modal';
import { useSsoScreen } from '@/hooks/settings/user/single-sign-on/useSsoScreen';
import { SSO_TIMELINE_STEPS } from '@/utils/constants/settings/users/single-sign-on';
import { Icon } from '@iconify/react';
import sharedStyles from '@/screens/settings/shared-settings-styles.module.css';

export const SsoContent = () => {
  const { config, setConfig, isLoading, showTimeline, setShowTimeline, handleSave, handleReset } =
    useSsoScreen();

  return (
    <div className={sharedStyles.mainContent}>
      <div className={`${sharedStyles.contentArea} ${sharedStyles.formPageContent}`}>
        <div className={sharedStyles.contentHeader}>
          <div>
            <h2 className={sharedStyles.pageTitle}>Single Sign-On</h2>
            <p className={sharedStyles.pageDescription}>
              Single Sign-On is an authentication process that allows a user to access multiple
              applications with one set of login credentials. For more information:{' '}
              <a
                href="#"
                className={sharedStyles.linkBlue}
                onClick={(e) => {
                  e.preventDefault();
                  setShowTimeline(true);
                }}
              >
                Single Sign-On <Icon icon="mdi:open-in-new" width={14} height={14} />
              </a>
            </p>
          </div>
        </div>

        {isLoading && !config ? (
          <SettingsStatusMessage>Loading SSO Configuration...</SettingsStatusMessage>
        ) : config ? (
          <SsoForm
            config={config}
            setConfig={setConfig}
            onSave={handleSave}
            onReset={handleReset}
          />
        ) : (
          <SettingsStatusMessage variant="error">
            Failed to load SSO configuration.
          </SettingsStatusMessage>
        )}
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
