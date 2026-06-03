'use client';
import NetPathDetail from '@/components/features/netpath/netpath-detail';
import { Button } from '@/components/ui/button';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { Input } from '@/components/ui/input';
import { useNetPath } from '@/hooks/netpath';
import { getPathInitials, FILTER_SIDEBAR_CONFIG } from '@/utils/constants/netpath/helpers';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import sharedStyles from '@/components/features/netpath/shared/styles.module.css';
import { NetPathSidebarSkeleton } from '@/components/ui/skeleton-loaders/netpath-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';

export const NetPathContent = () => {
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
    isLoading,
  } = useNetPath();

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
    <div className={sharedStyles.netPathPage}>
      {/* Left Sidebar - Path List */}
      <div
        className={`${sharedStyles.leftSidebar} ${!isSidebarOpen ? sharedStyles.sidebarCollapsed : ''}`}
      >
        <div className={sharedStyles.sidebarHeader}>
          <span
            className={`${sharedStyles.sidebarTitle} ${!isSidebarOpen ? sharedStyles.hidden : ''}`}
          >
            CATEGORIES
          </span>
          <Button
            variant="ghost"
            className={sharedStyles.collapseBtn}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? 'Collapse' : 'Expand'}
          >
            <Icon
              icon={isSidebarOpen ? 'mdi:chevron-left' : 'mdi:chevron-right'}
              width={20}
            />
          </Button>
        </div>

        <div className={sharedStyles.sidebarNav}>
          {/* Search */}
          {isSidebarOpen && (
            <div className={sharedStyles.sidebarSearch}>
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
          <div className={sharedStyles.treeChildren}>
            {isLoading ? (
              <NetPathSidebarSkeleton />
            ) : filteredPaths.length === 0 ? (
              <div style={{ padding: '32px 16px' }}>
                 <NoDataFound 
                    title="No Paths Found" 
                    description="Adjust your search or filters to see paths." 
                    icon="mdi:magnify-close"
                 />
              </div>
            ) : (
              filteredPaths.map((path) => (
                <div
                  key={path.id}
                  className={`${sharedStyles.navItem} ${
                    activePathId === path.id ? sharedStyles.navItemActive : ''
                  }`}
                  onClick={() => setActivePathId(path.id)}
                  title={!isSidebarOpen ? path.name : ''}
                >
                  {/* Tree Branch */}
                  <div className={sharedStyles.treeBranch} />

                  {/* Icon with status or Avatar */}
                  <div className={sharedStyles.itemIconWrapper}>
                    {isSidebarOpen ? (
                      <div 
                        className={`${sharedStyles.statusDot} ${sharedStyles[`status_${path.status}`]}`} 
                      />
                    ) : (
                      <div 
                        className={`${sharedStyles.avatarText} ${sharedStyles[`avatar_${path.status}`]}`}
                      >
                        {getPathInitials(path.name)}
                      </div>
                    )}
                  </div>

                  {/* Path details */}
                  <div className={sharedStyles.navContent}>
                    <span className={sharedStyles.navText}>{path.name}</span>
                    {isSidebarOpen && (
                      <span className={sharedStyles.navSubtext}>
                        {path.destination}:{path.port}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className={sharedStyles.mainContentWrapper}>
        <div className={sharedStyles.header}>
          <div className={sharedStyles.headerLeft}>{/* Header left */}</div>
          <div className={sharedStyles.headerRight}>
            <div className={sharedStyles.headerActions}>
              <Button
                variant="ghost"
                className={sharedStyles.actionBtn}
                onClick={() => setShowFilterSidebar(true)}
                title="Filters"
              >
                <Icon icon="mdi:filter-variant" width={20} height={20} />
              </Button>
            </div>
          </div>
        </div>
        {/* Content Area */}
        <div className={sharedStyles.contentArea}>
          {activePathId ? (
            <NetPathDetail pathId={activePathId} />
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <NoDataFound 
                 title="Select a Network Path" 
                 description="Choose a network path from the sidebar to view hop-by-hop details and latency." 
                 icon="mdi:transit-connection-variant"
              />
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

