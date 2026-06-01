'use client';

import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { useAudit } from '@/hooks/audit';
import { AUDIT_FILTER_SIDEBAR_CONFIG } from '@/utils/constants/audit';

export const AuditFilterSidebar = () => {
  const {
    showFilterSidebar,
    setShowFilterSidebar,
    filters,
    handleFilterChange,
    handleApplyFilters,
    handleResetFilters,
  } = useAudit();

  return (
    <FilterSidebar
      isOpen={showFilterSidebar}
      onClose={() => setShowFilterSidebar(false)}
      title="Audit Filters"
      filters={AUDIT_FILTER_SIDEBAR_CONFIG}
      filterValues={filters}
      onFilterChange={handleFilterChange}
      onApply={handleApplyFilters}
      onReset={handleResetFilters}
    />
  );
};
