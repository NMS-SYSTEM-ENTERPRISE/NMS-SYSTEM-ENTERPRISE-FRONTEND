"use client";
import styles from '../../shared-settings-styles.module.css';

const FlowFilterSettings = () => {
  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <div>
              <h2 className={styles.pageTitle}>Flow Filter Settings</h2>
              <p className={styles.pageDescription}>
                Configure filters for flow data analysis.
              </p>
            </div>
          </div>
          
          <div className={styles.settingsSection}>
            <div className={styles.emptyState}>
              <p>Flow Filter settings are currently under development.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlowFilterSettings;
