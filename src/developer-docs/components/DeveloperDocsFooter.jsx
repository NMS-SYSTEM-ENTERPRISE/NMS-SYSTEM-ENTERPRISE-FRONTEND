'use client';

import styles from '../styles/DeveloperDocsFooter.module.css';
import { Icon } from '@iconify/react';

export default function DeveloperDocsFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Left: Info */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerTitle}>About This Documentation</h4>
          <p className={styles.footerText}>
            Comprehensive technical documentation for the NMS Enterprise system, covering backend services,
            frontend implementation, and infrastructure architecture.
          </p>
        </div>

        {/* Center: Quick Links */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerTitle}>Quick Links</h4>
          <ul className={styles.footerLinks}>
            <li>
              <a href="#" className={styles.footerLink}>
                Backend Architecture
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLink}>
                Frontend Components
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLink}>
                Infrastructure
              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLink}>
                API Reference
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Support */}
        <div className={styles.footerSection}>
          <h4 className={styles.footerTitle}>Need Help?</h4>
          <p className={styles.footerText}>
            Refer to the Manual section for user guides and setup instructions.
          </p>
          <a href="/manual" className={styles.footerButton}>
            <Icon icon="lucide:book" width={16} />
            View Manual
          </a>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className={styles.footerBottom}>
        <p className={styles.copyright}>
          © {currentYear} NMS Enterprise. Documentation is continuously updated.
        </p>
        <div className={styles.footerMeta}>
          <span>Last Updated: {new Date().toLocaleDateString()}</span>
          <span>•</span>
          <span>Version 1.0</span>
        </div>
      </div>
    </footer>
  );
}
