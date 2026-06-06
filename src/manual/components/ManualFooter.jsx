'use client';

import { Icon } from '@iconify/react';
import styles from '../styles/ManualFooter.module.css';

export const ManualFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerLeft}>
          <div className={styles.footerLogo}>
            <Icon
              icon="mdi:shield-network-outline"
              width={20}
              className={styles.footerIcon}
            />
            <span>SNR-Edatas AIOps</span>
          </div>
          <p className={styles.footerDesc}>
            Enterprise Network Management & AIOps Platform
          </p>
        </div>

        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>
            Dashboard
          </a>
          <a href="#" className={styles.footerLink}>
            Documentation
          </a>
          <a href="mailto:support@snr-edatas.com" className={styles.footerLink}>
            Support
          </a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>© 2025 SNR-Edatas. All rights reserved.</span>
        <div className={styles.footerBottomLinks}>
          <a href="#" className={styles.footerBottomLink}>
            Privacy
          </a>
          <a href="#" className={styles.footerBottomLink}>
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};
