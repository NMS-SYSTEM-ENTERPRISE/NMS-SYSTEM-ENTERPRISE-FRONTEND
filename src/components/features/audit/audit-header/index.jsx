'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/audit/shared/styles.module.css';
import { useAudit } from '@/hooks/audit';
import {
  AUDIT_MODULE_FILTER_OPTIONS,
  AUDIT_STATUS_FILTER_OPTIONS,
} from '@/utils/constants/audit';

export const AuditHeader = () => {
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    setShowFilterSidebar,
    handleOpenActionSidebar,
  } = useAudit();

  return (
    <header className={sharedStyles.header}>
      <div className={sharedStyles.headerLeft}>
        <div className={sharedStyles.headerIcon}>
          <Icon icon="mdi:file-document" width={24} height={24} />
        </div>
        <div className={sharedStyles.headerText}>
          <h1 className={sharedStyles.headerTitle}>Audit Logs</h1>
          <span className={sharedStyles.headerSubtitle}>System Activity Monitor</span>
        </div>
      </div>

      <div className={sharedStyles.headerRight}>
        <div className={sharedStyles.filterGroup}>
          <label className={sharedStyles.filterLabel} htmlFor="audit-module-filter">
            Module:
          </label>
          <SelectComponent
            id="audit-module-filter"
            className={sharedStyles.select}
            variant="borderless"
            value={filters.module}
            onChange={(e) => setFilters((prev) => ({ ...prev, module: e.target.value }))}
            options={AUDIT_MODULE_FILTER_OPTIONS}
            placeholder="All"
          />
        </div>

        <div className={sharedStyles.filterGroup}>
          <label className={sharedStyles.filterLabel} htmlFor="audit-status-filter">
            Status:
          </label>
          <SelectComponent
            id="audit-status-filter"
            className={sharedStyles.select}
            variant="borderless"
            value={filters.status}
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
            options={AUDIT_STATUS_FILTER_OPTIONS}
            placeholder="Status"
          />
        </div>

        <Input
          type="text"
          placeholder="Search logs..."
          containerClassName={sharedStyles.headerSearch}
          className={sharedStyles.headerSearchField}
          icon={<Icon icon="mdi:magnify" width={18} height={18} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className={sharedStyles.headerActions}>
          <Button variant="ghost" size="icon" className={sharedStyles.actionBtn} title="Refresh">
            <Icon icon="mdi:refresh" width={20} height={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={sharedStyles.actionBtn}
            title="Advanced Filters"
            onClick={() => setShowFilterSidebar(true)}
          >
            <Icon icon="mdi:filter-variant" width={20} height={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={sharedStyles.actionBtn}
            title="Export"
            onClick={() => handleOpenActionSidebar('export')}
          >
            <Icon icon="mdi:download" width={20} height={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};
