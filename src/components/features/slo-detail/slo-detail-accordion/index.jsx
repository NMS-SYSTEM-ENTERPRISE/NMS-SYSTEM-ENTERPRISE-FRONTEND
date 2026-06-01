'use client';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import styles from './styles.module.css';

export const SloDetailAccordion = ({
  title,
  icon,
  isOpen,
  onToggle,
  children,
  badge,
  badgeClassName,
}) => (
  <div className={styles.accordionItem} data-open={isOpen}>
    <button type="button" className={styles.accordionHeader} onClick={onToggle}>
      <div className={styles.headerLeft}>
        <div className={styles.iconWrapper}>
          <Icon icon={icon} width={20} />
        </div>
        <span className={styles.headerTitle}>{title}</span>
      </div>
      <div className={styles.headerRight}>
        {badge && (
          <span className={clsx(styles.statBadge, badgeClassName)}>{badge}</span>
        )}
        <Icon icon="ph:caret-down-bold" className={styles.chevron} width={16} />
      </div>
    </button>
    {isOpen && <div className={styles.accordionContent}>{children}</div>}
  </div>
);
