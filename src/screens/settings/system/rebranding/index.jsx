'use client';
import styles from '../../shared-settings-styles.module.css';
const Rebranding = () => {
  return (
    <div className={styles.mainContent}>
      <div className={styles.contentArea}>
        <div className={styles.contentHeader}>
          <div>
            <h2 className={styles.pageTitle}>Logo</h2>
            <p className={styles.pageDescription}>
              Supported File Formats are svg, png, jpg (Recommended Size:
              150x50)
            </p>
          </div>
        </div>
        <div
          className={styles.settingsSection}
          style={{
            padding: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--margin-xl)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <img
              src="/assets/logo.png"
              alt="Logo"
              style={{ maxHeight: '50px', opacity: 0.8 }}
            />
            <span
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#5c7cfa',
                marginLeft: '10px',
              }}
            >
              snr-edatas
            </span>
          </div>
          <button className={styles.btnPrimary}>Browse Logo</button>
        </div>
        <div className={styles.contentHeader}>
          <div>
            <h2 className={styles.pageTitle}>Logo (Dark Theme)</h2>
            <p className={styles.pageDescription}>
              Supported File Formats are svg, png, jpg (Recommended Size:
              150x50)
            </p>
          </div>
        </div>
        <div
          className={styles.settingsSection}
          style={{
            padding: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#1a1a1a',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <span
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#fff',
                marginRight: '5px',
              }}
            >
              SNR
            </span>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#5c7cfa',
              }}
            >
              EDATAS
            </span>
          </div>
          <button className={styles.btnPrimary}>Browse Logo</button>
        </div>
      </div>
    </div>
  );
};
export default Rebranding;
