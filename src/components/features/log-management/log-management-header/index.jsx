'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/log-management/shared/styles.module.css';
import { useLogManagement } from '@/hooks/log-management';
import {
  LOG_SEVERITY_FILTER_OPTIONS,
  LOG_TIME_RANGE_OPTIONS,
} from '@/utils/constants/log-management';

export const LogManagementHeader = () => {
  const { searchQuery, setSearchQuery, filters, setFilters, setShowFilterSidebar } =
    useLogManagement();

  return (
    <header className={sharedStyles.header}>
      <div className={sharedStyles.headerLeft}>
        <div className={sharedStyles.headerIcon}>
          <Icon icon="mdi:file-document-multiple" width={24} height={24} />
        </div>
        <div className={sharedStyles.headerText}>
          <h1 className={sharedStyles.headerTitle}>Log Management</h1>
          <span className={sharedStyles.headerSubtitle}>Real-time system log stream</span>
        </div>
      </div>

      <div className={sharedStyles.headerRight}>
        <div className={sharedStyles.filterGroup}>
          <label className={sharedStyles.filterLabel} htmlFor="log-severity-filter">
            Severity:
          </label>
          <SelectComponent
            id="log-severity-filter"
            className={sharedStyles.select}
            variant="borderless"
            value={filters.severity}
            onChange={(e) => setFilters((prev) => ({ ...prev, severity: e.target.value }))}
            options={LOG_SEVERITY_FILTER_OPTIONS}
            placeholder="All"
          />
        </div>

        <div className={sharedStyles.filterGroup}>
          <label className={sharedStyles.filterLabel} htmlFor="log-time-filter">
            Time:
          </label>
          <SelectComponent
            id="log-time-filter"
            className={sharedStyles.select}
            variant="borderless"
            value={filters.timeRange}
            onChange={(e) => setFilters((prev) => ({ ...prev, timeRange: e.target.value }))}
            options={LOG_TIME_RANGE_OPTIONS}
            placeholder="Range"
          />
        </div>

        <Input
          type="text"
          placeholder="Search stream..."
          containerClassName={sharedStyles.headerSearch}
          className={sharedStyles.headerSearchField}
          icon={<Icon icon="mdi:magnify" width={18} height={18} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className={sharedStyles.headerActions}>
          <Button variant="ghost" size="icon" className={sharedStyles.actionBtn} title="Refresh Stream">
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
          <Button variant="ghost" size="icon" className={sharedStyles.actionBtn} title="Export Logs">
            <Icon icon="mdi:download" width={20} height={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};
