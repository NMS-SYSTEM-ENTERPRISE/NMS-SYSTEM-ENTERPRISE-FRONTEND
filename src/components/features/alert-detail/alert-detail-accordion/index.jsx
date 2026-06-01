'use client';

import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/alert-detail/shared/styles.module.css';

export const AlertDetailAccordion = ({ title, icon, badge, isOpen, onToggle, children }) => (
  <div className={sharedStyles.accordionSection} data-open={isOpen}>
    <button type="button" className={sharedStyles.accordionHeader} onClick={onToggle}>
      <div className={sharedStyles.headerLabel}>
        <div className={sharedStyles.sectionIcon}>
          <Icon icon={icon} width={18} />
        </div>
        <span className={sharedStyles.sectionTitle}>{title}</span>
        {badge && <span className={sharedStyles.sectionBadge}>{badge}</span>}
      </div>
      <Icon icon="mdi:chevron-down" className={sharedStyles.chevron} width={20} />
    </button>
    {isOpen && <div className={sharedStyles.accordionContent}>{children}</div>}
  </div>
);
