'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/flow/shared/styles.module.css';
import { useFlow } from '@/hooks/flow';
import { FLOW_SIDEBAR_ITEMS } from '@/utils/constants/flow';

export const FlowSidebar = () => {
  const { activeView, setActiveView, isSidebarOpen, setIsSidebarOpen } = useFlow();

  return (
    <div className={clsx(sharedStyles.leftSidebar, !isSidebarOpen && sharedStyles.sidebarCollapsed)}>
      <div className={sharedStyles.sidebarHeader}>
        <span className={clsx(sharedStyles.sidebarTitle, !isSidebarOpen && sharedStyles.hidden)}>
          Categories
        </span>
        <Button
          type="button"
          variant="ghost"
          className={sharedStyles.collapseBtn}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title={isSidebarOpen ? 'Collapse' : 'Expand'}
          aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <Icon icon={isSidebarOpen ? 'mdi:menu-open' : 'mdi:menu'} width={22} />
        </Button>
      </div>

      <div className={sharedStyles.sidebarNav}>
        <div className={sharedStyles.treeRoot}>
          <Icon icon="mdi:swap-horizontal-bold" width={18} className={sharedStyles.rootIcon} />
          <span className={sharedStyles.rootLabel}>Flow Analysis</span>
        </div>

        <div className={sharedStyles.treeChildren}>
          {FLOW_SIDEBAR_ITEMS.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              className={clsx(sharedStyles.navItem, activeView === item.id && sharedStyles.navItemActive)}
              onClick={() => setActiveView(item.id)}
              onKeyDown={(e) => e.key === 'Enter' && setActiveView(item.id)}
              title={!isSidebarOpen ? item.label : ''}
            >
              <div className={sharedStyles.treeBranch} />
              <div className={sharedStyles.itemIconWrapper}>
                <Icon icon={item.icon} width={18} height={18} />
              </div>
              <span className={sharedStyles.navText}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
