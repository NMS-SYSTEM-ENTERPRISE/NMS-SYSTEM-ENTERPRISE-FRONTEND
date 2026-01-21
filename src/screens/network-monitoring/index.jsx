"use client";
import CategoryFilterSidebar from '@/components/features/networkmonitoring/CategoryFilterSidebar';
import { CATEGORY_CONFIGS } from '@/components/features/networkmonitoring/constants';
import DashboardView from '@/components/features/networkmonitoring/DashboardView';
import { DetailsView } from '@/components/features/networkmonitoring/DetailsView';
import styles from '@/components/features/networkmonitoring/styles.module.css';
import { generateMockData, getProgressBarColor } from '@/components/features/networkmonitoring/utils';
import { Icon } from '@iconify/react';
import { useState } from 'react';

const NetworkMonitoring = () => {
  const [activeCategory, setActiveCategory] = useState('Server & Apps');
  const [viewMode, setViewMode] = useState('details'); // 'details' or 'dashboard'
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [filters, setFilters] = useState({});

  const categories = Object.keys(CATEGORY_CONFIGS);
  const currentConfig = CATEGORY_CONFIGS[activeCategory];
  const mockData = generateMockData(activeCategory);

  const filteredData = mockData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.networkMonitoring}>
      {/* Left Sidebar - Categories */}
      <div className={`${styles.leftSidebar} ${showFilterSidebar ? styles.collapsed : ''} ${isCollapsed ? styles.collapsed : ''}`}>
        <div className={styles.sidebarHeader}>
          {!isCollapsed && <span className={styles.sidebarTitle}>Categories</span>}
          <button 
            className={styles.collapseBtn} 
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <Icon icon={isCollapsed ? "mdi:chevron-double-right" : "mdi:chevron-double-left"} width={20} height={20} />
          </button>
        </div>
        
        <div className={styles.categoryList}>
          {/* Tree Vertical Line */}
          {/* Tree Vertical Line Removed - Handled per item for balance */}
          
          {categories.map((category) => (
            <div
              key={category}
              className={`${styles.categoryItem} ${
                activeCategory === category ? styles.categoryItemActive : ''
              }`}
              onClick={() => setActiveCategory(category)}
              title={isCollapsed ? category : ''}
            >
              {/* Tree Horizontal Branch */}
              <div className={styles.treeBranch} />
              
              <div className={styles.itemContent}>
                <Icon
                  icon={CATEGORY_CONFIGS[category].icon}
                  width={20}
                  height={20}
                  className={styles.categoryIcon}
                  style={{ 
                    color: activeCategory === category ? 'inherit' : CATEGORY_CONFIGS[category].color 
                  }}
                />
                {!isCollapsed && <span className={styles.categoryText}>{category}</span>}
              </div>
              
               {/* Active Indicator Dot (Right side) */}
               {activeCategory === category && !isCollapsed && (
                  <div className={styles.activeDot} />
               )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className={styles.mainContentWrapper}>
        {/* Integrated Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <Icon icon="mdi:monitor-dashboard" width={24} height={24} />
            </div>
            <h1 className={styles.headerTitle}>Network Monitoring</h1>
          </div>

          <div className={styles.headerRight}>
            {/* Search */}
            <div className={styles.headerSearch}>
              <Icon icon="mdi:magnify" className={styles.headerSearchIcon} width={18} height={18} />
              <input
                type="text"
                placeholder="Search devices..."
                className={styles.headerSearchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* View Mode Toggle */}
            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewToggleBtn} ${
                  viewMode === 'details' ? styles.viewToggleBtnActive : ''
                }`}
                onClick={() => setViewMode('details')}
              >
                <Icon icon="mdi:format-list-bulleted" width={16} height={16} />
                Details
              </button>
              <button
                className={`${styles.viewToggleBtn} ${
                  viewMode === 'dashboard' ? styles.viewToggleBtnActive : ''
                }`}
                onClick={() => setViewMode('dashboard')}
              >
                <Icon icon="mdi:view-dashboard" width={16} height={16} />
                Dashboard
              </button>
            </div>

            {/* Actions */}
            <div className={styles.headerActions}>
              <button
                className={styles.actionBtn}
                onClick={() => setShowFilterSidebar(true)}
                title="Filters"
              >
                <Icon icon="mdi:filter-variant" width={20} height={20} />
              </button>
              <button className={styles.actionBtn} title="Refresh">
                <Icon icon="mdi:refresh" width={20} height={20} />
              </button>
              <button className={styles.actionBtn} title="Export">
                <Icon icon="mdi:download" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className={styles.contentArea}>
          {viewMode === 'details' ? (
            <DetailsView
              category={activeCategory}
              config={currentConfig}
              data={filteredData}
              getProgressBarColor={getProgressBarColor}
            />
          ) : (
            <DashboardView
              category={activeCategory}
              config={currentConfig}
              data={filteredData}
            />
          )}
        </div>
      </div>

      {/* Filter Sidebar */}
      <CategoryFilterSidebar
        isOpen={showFilterSidebar}
        onClose={() => setShowFilterSidebar(false)}
        category={activeCategory}
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  );
};

export default NetworkMonitoring;
