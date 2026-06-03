'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import sharedStyles from '@/components/features/log-management/shared/styles.module.css';
import { useLogManagement } from '@/hooks/log-management';
import { LOG_NAV_ICON_CLASS } from '@/utils/constants/log-management';

export const LogManagementSidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen, activeView, setActiveView, filteredEvents } = useLogManagement();

  const totalEvents = filteredEvents?.length || 0;
  const sysEvents = filteredEvents?.filter(e => e.category === 'System').length || 0;
  const netEvents = filteredEvents?.filter(e => e.category === 'Network Device').length || 0;

  const dynamicGroups = [
    {
      id: 'all',
      name: 'All Logs',
      icon: 'mdi:database-search',
      colorToken: 'cyan',
      count: totalEvents,
    },
    {
      id: 'system',
      name: 'System Logs',
      icon: 'mdi:server',
      colorToken: 'violet',
      count: sysEvents,
    },
    {
      id: 'network',
      name: 'Network Logs',
      icon: 'mdi:router-network',
      colorToken: 'green',
      count: netEvents,
    }
  ];

  return (
    <aside
      className={`${sharedStyles.leftSidebar} ${!isSidebarOpen ? sharedStyles.sidebarCollapsed : ''}`}
    >
      <div className={sharedStyles.sidebarHeader}>
        <span
          className={`${sharedStyles.sidebarTitle} ${!isSidebarOpen ? sharedStyles.hidden : ''}`}
        >
          Log Sources
        </span>
        <Button
          variant="ghost"
          size="icon"
          className={sharedStyles.collapseBtn}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Icon icon={isSidebarOpen ? 'mdi:menu-open' : 'mdi:menu'} width={20} />
        </Button>
      </div>

      <nav className={sharedStyles.sidebarNav}>
        <div className={sharedStyles.treeRoot}>
          <Icon icon="mdi:database" className={sharedStyles.rootIcon} width={18} />
          {isSidebarOpen && <span className={sharedStyles.rootLabel}>Inventory</span>}
        </div>

        <div className={sharedStyles.treeChildren}>
          {dynamicGroups.map((group) => {
            const isActive = activeView === group.id;
            return (
              <div key={group.id} className={sharedStyles.groupItemWrap}>
                <button
                  type="button"
                  className={clsx(
                    sharedStyles.navItem,
                    sharedStyles.navItemBtn,
                    isActive && sharedStyles.navItemActive
                  )}
                  onClick={() => setActiveView(group.id)}
                  title={!isSidebarOpen ? group.name : ''}
                >
                  <div className={sharedStyles.treeBranch} />
                  <div
                    className={clsx(
                      sharedStyles.itemIconWrapper,
                      !isActive && sharedStyles[LOG_NAV_ICON_CLASS[group.colorToken]]
                    )}
                  >
                    <Icon icon={group.icon} width={18} />
                  </div>
                  <span className={sharedStyles.navText}>{group.name}</span>
                  {isSidebarOpen && (
                    <span className={sharedStyles.navCount}>{group.count}</span>
                  )}
                </button>

                {isSidebarOpen && group.children && (
                  <div className={sharedStyles.nestedChildren}>
                    {group.children.map((child) => (
                      <button
                        key={child.id}
                        type="button"
                        className={clsx(sharedStyles.nestedItem, sharedStyles.nestedItemBtn)}
                        onClick={() => setActiveView(child.id)}
                      >
                        <div className={sharedStyles.treeBranch} />
                        <span className={sharedStyles.nestedText}>{child.name}</span>
                        <span className={sharedStyles.nestedCount}>{child.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};
