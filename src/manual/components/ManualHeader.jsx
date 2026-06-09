'use client';

import { snrLogo } from '@/resources/images/logo';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/ManualHeader.module.css';
import { exportManualToPdf } from '../utils/export-manual-pdf';

export const ManualHeader = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    if (isExporting) return;

    setIsExporting(true);
    try {
      await exportManualToPdf();
    } catch (error) {
      console.error('Manual PDF export failed:', error);
      window.alert('Unable to export the user manual. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* Left: Logo + Brand */}
        <div className={styles.brandSection}>
          <div className={styles.logoWrapper}>
            <Image
              src={snrLogo}
              alt="SNR Edatas"
              width={140}
              height={46}
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className={styles.brandDivider} />
          <div className={styles.brandLabel}>
            <span className={styles.brandTitle}>User Manual</span>
            <span className={styles.brandSubtitle}>
              NetMonitor Enterprise AIOps Platform
            </span>
          </div>
        </div>

        {/* Center: Nav Links */}
        <nav className={styles.headerNav}>
          <a href="#overview" className={styles.navLink}>
            <Icon icon="mdi:home-outline" width={16} />
            Overview
          </a>
          <a href="#features" className={styles.navLink}>
            <Icon icon="mdi:view-grid-outline" width={16} />
            Features
          </a>
          <a href="#getting-started" className={styles.navLink}>
            <Icon icon="mdi:rocket-launch-outline" width={16} />
            Quick Start
          </a>
        </nav>

        {/* Right: Back to Login */}
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.downloadBtn}
            onClick={handleDownload}
            disabled={isExporting}
            title="Download complete user manual (PDF)"
            aria-label="Download complete user manual as PDF"
          >
            <Icon
              icon={isExporting ? 'mdi:loading' : 'mdi:download-outline'}
              width={16}
              className={isExporting ? styles.downloadSpinner : undefined}
            />
            {isExporting ? 'Exporting...' : 'Download'}
          </button>
          <div className={styles.versionBadge}>
            <Icon icon="mdi:tag-outline" width={13} />
            v1.0 Enterprise
          </div>
          <Link href="/" className={styles.backBtn}>
            <Icon icon="mdi:arrow-left" width={16} />
          </Link>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className={styles.headerLine} />
    </header>
  );
};
