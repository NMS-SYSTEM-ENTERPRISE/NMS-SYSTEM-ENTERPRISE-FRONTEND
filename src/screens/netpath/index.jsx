'use client';
import NetPathDetail from '@/components/features/netpath/netpath-detail';
import { Button } from '@/components/ui/button';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { Input } from '@/components/ui/input';
import { NetPathProvider } from '@/contexts/netpath';
import { useNetPath } from '@/hooks/netpath';
import { FILTER_SIDEBAR_CONFIG } from '@/utils/dummy-data/netpath';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

const NetPathContent = () => {
  const {
    activePathId,
    setActivePathId,
    searchQuery,
    setSearchQuery,
    showFilterSidebar,
    setShowFilterSidebar,
    isSidebarOpen,
    setIsSidebarOpen,
    filters,
    setFilters,
    filteredPaths,
  } = useNetPath();
  const router = useRouter();

  const getInitials = (name) => {
    return name.substring(0, 2).toUpperCase();
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: '',
      source: '',
      destination: '',
      portMin: '',
      portMax: '',
    });
  };

  return (
    <div className={styles.netPathPage}>
      {/* Left Sidebar - Path List */}
      <div
        className={`${styles.leftSidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}
      >
        <div className={styles.sidebarHeader}>
          <span
            className={`${styles.sidebarTitle} ${!isSidebarOpen ? styles.hidden : ''}`}
          >
            CATEGORIES
          </span>
          <Button
            variant="ghost"
            className={styles.collapseBtn}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? 'Collapse' : 'Expand'}
          >
            <Icon
              icon={isSidebarOpen ? 'mdi:chevron-left' : 'mdi:chevron-right'}
              width={20}
            />
          </Button>
        </div>

        <div className={styles.sidebarNav}>
          {/* Search */}
          {isSidebarOpen && (
            <div className={styles.sidebarSearch}>
              <Input
                type="text"
                placeholder="Search paths..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Icon icon="mdi:magnify" />}
              />
            </div>
          )}

          {/* Path List with Tree Structure - Matching APM */}
          <div className={styles.treeChildren}>
            {filteredPaths.map((path) => (
              <div
                key={path.id}
                className={`${styles.navItem} ${
                  activePathId === path.id ? styles.navItemActive : ''
                }`}
                onClick={() => setActivePathId(path.id)}
                title={!isSidebarOpen ? path.name : ''}
              >
                {/* Tree Branch */}
                <div className={styles.treeBranch} />

                {/* Icon with status or Avatar */}
                <div className={styles.itemIconWrapper}>
                  {isSidebarOpen ? (
                    <div 
                      className={`${styles.statusDot} ${styles[`status_${path.status}`]}`} 
                    />
                  ) : (
                    <div 
                      className={`${styles.avatarText} ${styles[`avatar_${path.status}`]}`}
                    >
                      {getInitials(path.name)}
                    </div>
                  )}
                </div>

                {/* Path details */}
                <div className={styles.navContent}>
                  <span className={styles.navText}>{path.name}</span>
                  {isSidebarOpen && (
                    <span className={styles.navSubtext}>
                      {path.destination}:{path.port}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className={styles.mainContentWrapper}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>{/* Header left */}</div>
          <div className={styles.headerRight}>
            <div className={styles.headerActions}>
              <Button
                variant="ghost"
                className={styles.actionBtn}
                onClick={() => setShowFilterSidebar(true)}
                title="Filters"
              >
                <Icon icon="mdi:filter-variant" width={20} height={20} />
              </Button>
            </div>
          </div>
        </div>
        {/* Content Area */}
        <div className={styles.contentArea}>
          {activePathId ? (
            <NetPathDetail pathId={activePathId} />
          ) : (
            <div className={styles.emptyState}>
              <h2>Select a Path</h2>
              <p>Choose a network path from the sidebar to view details.</p>
            </div>
          )}
        </div>
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={showFilterSidebar}
        onClose={() => setShowFilterSidebar(false)}
        title="NetPath Filters"
        filters={FILTER_SIDEBAR_CONFIG}
        filterValues={filters}
        onFilterChange={(key, value) => {
          setFilters((prev) => ({ ...prev, [key]: value }));
        }}
        onApply={(appliedFilters) => {
          // Apply filters logic here
        }}
        onReset={handleResetFilters}
      />
    </div>
  );
};

export default function NetPath() {
  return (
    <NetPathProvider>
      <NetPathContent />
    </NetPathProvider>
  );
}
