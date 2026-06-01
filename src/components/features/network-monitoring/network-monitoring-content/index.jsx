'use client';

import CategoryFilterSidebar from '@/components/features/networkmonitoring/CategoryFilterSidebar';
import DashboardView from '@/components/features/networkmonitoring/DashboardView';
import { DetailsView } from '@/components/features/networkmonitoring/DetailsView';
import LeftSidebar from '@/components/features/networkmonitoring/LeftSidebar';
import { NetworkMonitoringHeader } from '@/components/features/network-monitoring/network-monitoring-header';
import sharedStyles from '@/components/features/networkmonitoring/styles.module.css';
import { useNetworkMonitoring } from '@/hooks/network-monitoring';

export const NetworkMonitoringContent = () => {
  const {
    activeCategory,
    setActiveCategory,
    viewMode,
    isCollapsed,
    setIsCollapsed,
    showFilterSidebar,
    currentConfig,
    filteredData,
    getProgressBarColor,
    filters,
    setFilters,
    handleCloseFilterSidebar,
  } = useNetworkMonitoring();

  return (
    <div className={sharedStyles.networkMonitoring}>
      <LeftSidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        showFilterSidebar={showFilterSidebar}
      />

      <div className={sharedStyles.mainContentWrapper}>
        <NetworkMonitoringHeader />

        <div className={sharedStyles.contentArea}>
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
