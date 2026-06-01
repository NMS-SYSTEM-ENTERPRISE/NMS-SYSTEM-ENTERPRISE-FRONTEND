'use client';

import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { useReports } from '@/hooks/reports';
import { REPORT_FILTER_SIDEBAR_CONFIG } from '@/utils/constants/reports';

export const ReportsFilterSidebar = () => {
  const {
    showFilterSidebar,
    setShowFilterSidebar,
    filters,
    handleFilterChange,
    handleApplyFilters,
    handleResetFilters,
  } = useReports();

  return (
    <FilterSidebar
      isOpen={showFilterSidebar}
      onClose={() => setShowFilterSidebar(false)}
      title="Report Filters"
      filters={REPORT_FILTER_SIDEBAR_CONFIG}
      filterValues={filters}
      onFilterChange={handleFilterChange}
      onApply={handleApplyFilters}
      onReset={handleResetFilters}
    />
  );
};
