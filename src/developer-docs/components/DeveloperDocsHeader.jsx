'use client';

import { snrLogo } from '@/resources/images/logo';
import {
  ArrowLeft,
  BookOpen,
  Code2,
  HelpCircle,
  LayoutDashboard,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { DeveloperDocsContext } from '../contexts/DeveloperDocsContext';
import styles from '../styles/DeveloperDocsHeader.module.css';

export default function DeveloperDocsHeader() {
  const { searchQuery, setSearchQuery } = useContext(DeveloperDocsContext);
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
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
            <span className={styles.brandTitle}>Developer Documentation</span>
            <span className={styles.brandSubtitle}>
              Technical documentation for NMS
            </span>
          </div>
        </div>

        <nav className={styles.headerNav}>
          <a href="#overview" className={styles.navLink}>
            <BookOpen size={14} />
            Overview
          </a>
          <a href="#architecture" className={styles.navLink}>
            <LayoutDashboard size={14} />
            Architecture
          </a>
          <a href="#code" className={styles.navLink}>
            <Code2 size={14} />
            API Guide
          </a>
        </nav>

        <div className={styles.headerActions}>
          <div className={styles.versionBadge}>
            <HelpCircle width={13} />
            v1.0 Enterprise
          </div>
          <Link href="/" className={styles.backBtn}>
            <ArrowLeft width={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}
