'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/alerts/shared/styles.module.css';
import { useAlerts } from '@/hooks/alerts';
import { ALERT_CATEGORIES } from '@/utils/constants/alerts';

export const AlertsSidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen, activeTab, setActiveTab } = useAlerts();

  return (
    <aside
      className={`${sharedStyles.leftSidebar} ${!isSidebarOpen ? sharedStyles.sidebarCollapsed : ''}`}
    >
      <div className={sharedStyles.sidebarHeader}>
        <span className={`${sharedStyles.sidebarTitle} ${!isSidebarOpen ? sharedStyles.hidden : ''}`}>
          Alert Types
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
          <Icon icon="mdi:bell-alert" className={sharedStyles.rootIcon} width={18} />
          <span className={sharedStyles.rootLabel}>Management</span>
        </div>

        <div className={sharedStyles.treeChildren}>
          {ALERT_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className={`${sharedStyles.categoryItem} ${activeTab === cat.id ? sharedStyles.categoryItemActive : ''}`}
              onClick={() => setActiveTab(cat.id)}
              title={!isSidebarOpen ? cat.name : ''}
            >
              <div className={sharedStyles.treeBranch} />
              <div className={sharedStyles.itemIconWrapper}>
                <Icon icon={cat.icon} width={18} />
              </div>
              <span className={sharedStyles.navText}>{cat.name}</span>
              {cat.beta && isSidebarOpen && (
                <span className={sharedStyles.betaBadge}>BETA</span>
              )}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
};
