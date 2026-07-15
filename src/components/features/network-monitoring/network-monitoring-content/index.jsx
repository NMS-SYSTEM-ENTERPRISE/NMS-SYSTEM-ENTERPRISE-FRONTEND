'use client';
import clsx from 'clsx';

import CategoryFilterSidebar from '@/components/features/networkmonitoring/CategoryFilterSidebar';
import DashboardView from '@/components/features/networkmonitoring/DashboardView';
import { DetailsView } from '@/components/features/networkmonitoring/DetailsView';
import LeftSidebar from '@/components/features/networkmonitoring/LeftSidebar';
import { NetworkMonitoringHeader } from '@/components/features/network-monitoring/network-monitoring-header';
import sharedStyles from '@/components/features/networkmonitoring/styles.module.css';
import { useNetworkMonitoring } from '@/hooks/network-monitoring';
import { NetworkMonitoringSkeleton } from '@/components/ui/skeleton-loaders/network-monitoring-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';

export const NetworkMonitoringContent = () => {
  const {
    activeCategory,
    setActiveCategory,
    activeGroup,
    setActiveGroup,
    availableGroups,
    viewMode,
    isCollapsed,
    setIsCollapsed,
    showFilterSidebar,
    currentConfig,
    filteredData,
    isLoading,
    dashboardData,
    getProgressBarColor,
    filters,
    setFilters,
    metadata,
    handleCloseFilterSidebar,
    groupCounts,
    searchQuery,
  } = useNetworkMonitoring();

  const hasData = filteredData && filteredData.length > 0;

  // Only show the massive "No Telemetry Data Found" if they haven't applied any filters
  const hasActiveFilters = Object.keys(filters || {}).length > 0 || !!activeGroup || !!searchQuery;

  return (
    <div className={sharedStyles.networkMonitoring}>
      <LeftSidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeGroup={activeGroup}
        setActiveGroup={setActiveGroup}
        availableGroups={availableGroups}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        showFilterSidebar={showFilterSidebar}
        filteredData={filteredData}
        setFilters={setFilters}
        groupCounts={groupCounts}
      />

      <div className={sharedStyles.mainContentWrapper}>
        <NetworkMonitoringHeader />

        <div className={clsx(sharedStyles.contentArea, viewMode === 'details' && sharedStyles.contentAreaNoPadding)}>
          {isLoading ? (
            <NetworkMonitoringSkeleton />
          ) : !hasData && !hasActiveFilters ? (
            <NoDataFound
              title="No Telemetry Data Found"
              description={`There is currently no active telemetry or device data available for the '${activeCategory}' category.`}
              icon="lucide:activity"
            />
          ) : viewMode === 'details' ? (
            <DetailsView
              category={activeCategory}
              config={currentConfig}
              data={filteredData}
              getProgressBarColor={getProgressBarColor}
              metadata={metadata}
              filters={filters}
              setFilters={setFilters}
            />
          ) : (
            <DashboardView
              category={activeCategory}
              config={currentConfig}
              data={filteredData}
              dashboardData={dashboardData}
            />
          )}
        </div>
      </div>

      <CategoryFilterSidebar
        isOpen={showFilterSidebar}
        onClose={handleCloseFilterSidebar}
        category={activeCategory}
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  );
};
