"use client";
import TrapDashboard from '@/components/features/trap-explorer/TrapDashboard';
import TrapList from '@/components/features/trap-explorer/TrapList';
import { LiveTrapViewer } from '@/components/features/trap-explorer/live-trap-viewer';
import { TrapActionSidebar } from '@/components/features/trap-explorer/trap-action-sidebar';
import TrapHistorySidebar from '@/components/features/trap-explorer/trap-history-sidebar';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

const CATEGORIES = [
  { id: 'all', label: 'All Traps', icon: 'mdi:view-list', color: '#06b6d4' },
  { id: 'critical', label: 'Critical', icon: 'mdi:alert-circle', color: '#ef4444' },
  { id: 'major', label: 'Major', icon: 'mdi:alert', color: '#f97316' },
  { id: 'minor', label: 'Minor', icon: 'mdi:alert-outline', color: '#eab308' },
  { id: 'warning', label: 'Warning', icon: 'mdi:alert-octagon', color: '#3b82f6' },
  { id: 'info', label: 'Informational', icon: 'mdi:information', color: '#10b981' },
];

const TrapExplorer = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'dashboard'
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [showLiveViewer, setShowLiveViewer] = useState(false);
  const [filters, setFilters] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTrapForHistory, setSelectedTrapForHistory] = useState(null);

  return (
    <div className={styles.trapExplorer}>
      {/* Left Sidebar - Categories */}
      <div className={`${styles.leftSidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}>
        <div className={styles.sidebarHeader}>
          <span className={`${styles.sidebarTitle} ${!isSidebarOpen ? styles.hidden : ''}`}>
             Trap Categories
          </span>
          <button 
            className={styles.collapseBtn}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Icon icon={isSidebarOpen ? "mdi:menu-open" : "mdi:menu"} width={20} />
          </button>
        </div>
        
        <nav className={styles.sidebarNav}>
          <div className={styles.treeRoot}>
            <Icon icon="mdi:bell-ring" className={styles.rootIcon} />
            <span className={styles.rootLabel}>Trap Management</span>
          </div>

          <div className={styles.treeChildren}>
            {CATEGORIES.map((category) => (
              <div
                key={category.id}
                className={`${styles.categoryItem} ${
                  activeCategory === category.id ? styles.categoryItemActive : ''
                }`}
                onClick={() => setActiveCategory(category.id)}
                title={!isSidebarOpen ? category.label : ''}
              >
                <div className={styles.treeBranch} />
                <div className={styles.itemIconWrapper}>
                  <Icon
                    icon={category.icon}
                    width={18}
                    style={{ 
                      color: activeCategory === category.id ? 'inherit' : category.color 
                    }}
                  />
                </div>
                <span className={styles.navText}>{category.label}</span>
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content Wrapper */}
      <div className={styles.mainContentWrapper}>
        {/* Integrated Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <Icon icon="mdi:bell-ring" width={24} height={24} />
            </div>
            <h1 className={styles.headerTitle}>Trap Explorer</h1>
          </div>

          <div className={styles.headerRight}>
            {/* Search */}
            <div className={styles.headerSearch}>
              <Icon icon="mdi:magnify" className={styles.headerSearchIcon} width={18} height={18} />
              <input
                type="text"
                placeholder="Search traps..."
                className={styles.headerSearchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* View Mode Toggle */}
            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewToggleBtn} ${
                  viewMode === 'list' ? styles.viewToggleBtnActive : ''
                }`}
                onClick={() => setViewMode('list')}
              >
                <Icon icon="mdi:format-list-bulleted" width={16} height={16} />
                List
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
                onClick={() => setShowLiveViewer(true)}
                title="Live Viewer"
              >
                <Icon icon="mdi:pulse" width={20} height={20} />
              </button>
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
          {viewMode === 'list' ? (
            <TrapList 
              searchQuery={searchQuery} 
              category={activeCategory} 
              onViewHistory={(trap) => setSelectedTrapForHistory(trap)}
            />
          ) : (
            <TrapDashboard />
          )}
        </div>
      </div>

      {/* Trap Action Sidebar (Filters) */}
      <TrapActionSidebar
        isOpen={showFilterSidebar}
        onClose={() => setShowFilterSidebar(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFilterChange={(key, value) => {
          setFilters((prev) => ({ ...prev, [key]: value }));
        }}
        onApply={(appliedFilters) => console.log(appliedFilters)}
        onReset={() => setFilters({})}
      />

      {/* Trap History Sidebar */}
      <TrapHistorySidebar
        isOpen={!!selectedTrapForHistory}
        onClose={() => setSelectedTrapForHistory(null)}
        trap={selectedTrapForHistory}
      />

      {/* Live Trap Viewer Modal */}
      <LiveTrapViewer
        isOpen={showLiveViewer}
        onClose={() => setShowLiveViewer(false)}
      />
    </div>
  );
};

export default TrapExplorer;
