"use client";
import sharedStyles from '../shared-settings-styles.module.css';

const IntegrationSettings = () => {
  return (
    <>
      <div className={sharedStyles.mainContent}>
        <div className={sharedStyles.contentArea}>
          <div className={sharedStyles.contentHeader}>
            <div>
              <h2 className={sharedStyles.pageTitle}>Integration Settings</h2>
              <p className={sharedStyles.pageDescription}>
                Manage third-party integrations and webhooks.
              </p>
            </div>
          </div>
          
          <div className={sharedStyles.settingsSection}>
            <div className={sharedStyles.emptyState}>
              <p>Integration settings are currently under development.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntegrationSettings;
