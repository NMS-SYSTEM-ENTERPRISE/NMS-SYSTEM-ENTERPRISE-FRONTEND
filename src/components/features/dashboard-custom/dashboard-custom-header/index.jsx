'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import sharedStyles from '@/components/features/dashboard-custom/shared/styles.module.css';
import { useDashboardCustom } from '@/hooks/dashboard-custom';

const HEADER_ACTIONS = [
  { id: 'calendar', icon: 'mdi:calendar', label: 'Date range' },
  { id: 'edit', icon: 'mdi:pencil', label: 'Edit dashboard' },
  { id: 'share', icon: 'mdi:share-variant', label: 'Share dashboard' },
  { id: 'more', icon: 'mdi:dots-vertical', label: 'More actions' },
];

export const DashboardCustomHeader = () => {
  const router = useRouter();
  const { activeHeaderAction, setActiveHeaderAction } = useDashboardCustom();

  return (
    <header className={sharedStyles.header}>
      <div className={sharedStyles.headerLeft}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={sharedStyles.backBtn}
          onClick={() => router.push('/dashboard')}
          title="Back to Dashboard"
          aria-label="Back to Dashboard"
        >
          <Icon icon="mdi:arrow-left" width={18} />
        </Button>
        <div className={sharedStyles.breadcrumb}>
          <Icon icon="mdi:view-dashboard-edit" width={16} className={sharedStyles.breadcrumbIcon} />
          <span className={sharedStyles.breadcrumbSeparator}>/</span>
          <span className={sharedStyles.breadcrumbText}>Custom Dashboard Builder</span>
        </div>
      </div>

      <div className={sharedStyles.headerRight}>
        <div className={sharedStyles.timeRange}>
          <span className={sharedStyles.todayBadge}>today</span>
          <span>Today</span>
        </div>
        {HEADER_ACTIONS.map((action) => (
          <Button
            key={action.id}
            type="button"
            variant="ghost"
            size="md"
            className={clsx(
              sharedStyles.iconBtn,
              action.id !== 'calendar' && activeHeaderAction === action.id && sharedStyles.iconBtnActive
            )}
            onClick={() => action.id !== 'calendar' && setActiveHeaderAction(action.id)}
            aria-label={action.label}
          >
            <Icon icon={action.icon} width={20} />
          </Button>
        ))}
      </div>
    </header>
  );
};
