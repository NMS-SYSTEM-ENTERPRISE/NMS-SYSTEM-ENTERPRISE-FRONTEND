'use client';

import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { useLogManagement } from '@/hooks/log-management';
import { LOG_FILTER_SIDEBAR_CONFIG } from '@/utils/constants/log-management';

export const LogManagementFilterSidebar = () => {
  const {
    showFilterSidebar,
    setShowFilterSidebar,
    filters,
    handleFilterChange,
    handleResetFilters,
  } = useLogManagement();

  return (
    <FilterSidebar
      isOpen={showFilterSidebar}
      onClose={() => setShowFilterSidebar(false)}
      title="Log Search Filters"
      filters={LOG_FILTER_SIDEBAR_CONFIG}
      filterValues={filters}
      onFilterChange={handleFilterChange}
      onApply={() => setShowFilterSidebar(false)}
      onReset={handleResetFilters}
    />
  );
};
