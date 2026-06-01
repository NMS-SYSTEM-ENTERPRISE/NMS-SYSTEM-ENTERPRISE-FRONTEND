'use client';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import styles from './styles.module.css';

export const TrapDashboardAccordion = ({
  title,
  icon,
  badge,
  isOpen,
  onToggle,
  children,
}) => (
  <div className={styles.accordion}>
    <button type="button" className={styles.accordionHeader} onClick={onToggle}>
      <div className={styles.headerLeft}>
        <div className={styles.iconWrapper}>
          <Icon icon={icon} width={20} />
        </div>
        <span className={styles.headerTitle}>
          {title} {badge && <span className={styles.badge}>{badge}</span>}
        </span>
      </div>
      <Icon
        icon="mdi:chevron-down"
        className={clsx(styles.chevron, isOpen && styles.chevronOpen)}
      />
    </button>
    {isOpen && <div className={styles.accordionContent}>{children}</div>}
  </div>
);
