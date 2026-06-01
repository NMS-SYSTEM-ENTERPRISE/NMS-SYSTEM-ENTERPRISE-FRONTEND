'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import sharedStyles from '@/components/features/ticketing/shared/styles.module.css';
import { useTicketing } from '@/hooks/ticketing';
import { TICKETING_SIDEBAR_ITEMS } from '@/utils/constants/ticketing';

export const TicketingSidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen, activeCategory, setActiveCategory } = useTicketing();

  return (
    <aside
      className={`${sharedStyles.leftSidebar} ${!isSidebarOpen ? sharedStyles.sidebarCollapsed : ''}`}
    >
      <div className={sharedStyles.sidebarHeader}>
        <span
          className={`${sharedStyles.sidebarTitle} ${!isSidebarOpen ? sharedStyles.hidden : ''}`}
        >
          Ticketing System
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
          <Icon icon="mdi:ticket-confirmation-outline" className={sharedStyles.rootIcon} width={18} />
          <span className={sharedStyles.rootLabel}>Tickets</span>
        </div>

        <div className={sharedStyles.treeChildren}>
          {TICKETING_SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={clsx(
                sharedStyles.navItem,
                sharedStyles.navItemBtn,
                activeCategory === item.id && sharedStyles.navItemActive
              )}
              onClick={() => setActiveCategory(item.id)}
              title={!isSidebarOpen ? item.label : ''}
            >
              <div className={sharedStyles.treeBranch} />
              <div className={sharedStyles.itemIconWrapper}>
                <Icon icon={item.icon} width={18} />
              </div>
              <span className={sharedStyles.navText}>{item.label}</span>
              {item.badgeCount && isSidebarOpen && (
                <span className={sharedStyles.badge}>{item.badgeCount}</span>
              )}
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
};
