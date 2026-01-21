"use client";
import styles from '../../shared-settings-styles.module.css';

const FlowCollectorSettings = () => {
  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <div>
              <h2 className={styles.pageTitle}>Flow Collector Settings</h2>
              <p className={styles.pageDescription}>
                Manage flow collectors and their configurations.
              </p>
            </div>
          </div>
          
          <div className={styles.settingsSection}>
            <div className={styles.emptyState}>
              <p>Flow Collector settings are currently under development.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlowCollectorSettings;
