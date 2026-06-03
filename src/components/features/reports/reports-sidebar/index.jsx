'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/reports/shared/styles.module.css';
import { useReports } from '@/hooks/reports';
import { REPORT_TABS } from '@/utils/constants/reports';

export const ReportsSidebar = () => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    categories = [],
  } = useReports();

  return (
    <aside
      className={`${sharedStyles.sidebar} ${!isSidebarOpen ? sharedStyles.sidebarCollapsed : ''}`}
    >
      <div className={sharedStyles.sidebarHeader}>
        <span
          className={`${sharedStyles.sidebarTitle} ${!isSidebarOpen ? sharedStyles.hidden : ''}`}
        >
          CATEGORIES
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

      <div className={sharedStyles.tabs}>
        {REPORT_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`${sharedStyles.tab} ${activeTab === tab ? sharedStyles.tabActive : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <nav className={sharedStyles.categoryNav}>
        <div className={sharedStyles.treeRoot}>
          <Icon icon="mdi:chart-bar" className={sharedStyles.rootIcon} width={18} />
          <span className={sharedStyles.rootLabel}>Report Types</span>
        </div>

        <div className={sharedStyles.treeChildren}>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`${sharedStyles.categoryItem} ${
                selectedCategory === category.id ? sharedStyles.categoryItemActive : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
              title={!isSidebarOpen ? category.label : ''}
            >
              <div className={sharedStyles.treeBranch} />
              <div className={sharedStyles.itemIconWrapper}>
                <Icon icon={category.icon} width={18} />
              </div>
              <span className={sharedStyles.navText}>{category.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
};
