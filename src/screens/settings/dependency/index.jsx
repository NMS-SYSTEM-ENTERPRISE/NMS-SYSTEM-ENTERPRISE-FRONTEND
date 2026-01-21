"use client";
import sharedStyles from '../shared-settings-styles.module.css';

const DependencyMapperSettings = () => {
  return (
    <>
      <div className={sharedStyles.mainContent}>
        <div className={sharedStyles.contentArea}>
          <div className={sharedStyles.contentHeader}>
            <div>
              <h2 className={sharedStyles.pageTitle}>Dependency Mapper Settings</h2>
              <p className={sharedStyles.pageDescription}>
                Configure dependency mapping and visualization settings.
              </p>
            </div>
          </div>
          
          <div className={sharedStyles.settingsSection}>
            <div className={sharedStyles.emptyState}>
              <p>Dependency Mapper settings are currently under development.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DependencyMapperSettings;
