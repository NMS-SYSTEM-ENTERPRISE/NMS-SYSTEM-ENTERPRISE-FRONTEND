'use client';

import sharedStyles from '@/components/features/audit/shared/styles.module.css';
import { Button } from '@/components/ui/button';
import { useAudit } from '@/hooks/audit';
import {
  AUDIT_NAV_ICON_CLASS,
  AUDIT_SIDEBAR_ITEMS,
} from '@/utils/constants/audit';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

export const AuditSidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen, activeView, setActiveView } =
    useAudit();

  return (
    <aside
      className={`${sharedStyles.leftSidebar} ${!isSidebarOpen ? sharedStyles.sidebarCollapsed : ''}`}
    >
      <div className={sharedStyles.sidebarHeader}>
        <span
          className={`${sharedStyles.sidebarTitle} ${!isSidebarOpen ? sharedStyles.hidden : ''}`}
        >
          Audit Logs
        </span>
        <Button
          variant="ghost"
          size="icon"
          className={sharedStyles.collapseBtn}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Icon
            icon={isSidebarOpen ? 'mdi:menu-open' : 'mdi:menu'}
            width={20}
          />
        </Button>
      </div>

      <nav className={sharedStyles.sidebarNav}>
        <div className={sharedStyles.treeRoot}>
          <Icon
            icon="mdi:security"
            className={sharedStyles.rootIcon}
            width={18}
          />
          <span className={sharedStyles.rootLabel}>Audit Management</span>
        </div>

        <div className={sharedStyles.treeChildren}>
          {AUDIT_SIDEBAR_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={clsx(
                  sharedStyles.navItem,
                  sharedStyles.navItemBtn,
                  isActive && sharedStyles.navItemActive
                )}
                onClick={() => setActiveView(item.id)}
                title={!isSidebarOpen ? item.label : ''}
              >
                <div className={sharedStyles.treeBranch} />
                <div
                  className={clsx(
                    sharedStyles.itemIconWrapper,
                    !isActive &&
                      sharedStyles[AUDIT_NAV_ICON_CLASS[item.colorToken]]
                  )}
                >
                  <Icon icon={item.icon} width={18} />
                </div>
                <span className={sharedStyles.navText}>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};
