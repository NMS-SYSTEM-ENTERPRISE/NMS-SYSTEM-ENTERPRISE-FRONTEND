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
import { toast } from 'sonner';

export const LogManagementHeader = () => {
  const { searchQuery, setSearchQuery, filters, setFilters, setShowFilterSidebar, loadSyslogs, filteredEvents } =
    useLogManagement();

  const handleExport = () => {
    if (!filteredEvents || filteredEvents.length === 0) {
      toast.error('No logs available to export.');
      return;
    }
    const headers = ['Timestamp', 'Category', 'Severity', 'Source', 'Message'];
    const rows = filteredEvents.map(e => [
      e.timestamp, e.category, e.severity, e.source, `"${(e.message || '').replace(/"/g, '""')}"`
    ].join(','));
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'syslogs-export.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <header className={sharedStyles.header} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <div className={sharedStyles.headerLeft} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className={sharedStyles.headerIcon}>
            <Icon icon="mdi:file-document-multiple" width={24} height={24} />
          </div>
          <div className={sharedStyles.headerText}>
            <h1 className={sharedStyles.headerTitle} style={{ margin: 0, fontSize: '1.1rem' }}>Log Management</h1>
            <span className={sharedStyles.headerSubtitle} style={{ opacity: 0.7, fontSize: '0.75rem', textTransform: 'uppercase' }}>Real-time system log stream</span>
          </div>
        </div>

        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-border)', opacity: 0.5, margin: '0 0.5rem' }} />

        <div className={sharedStyles.headerActions} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Button variant="ghost" size="icon" className={sharedStyles.actionBtn} title="Refresh Stream" onClick={loadSyslogs}>
            <Icon icon="mdi:refresh" width={18} height={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={sharedStyles.actionBtn}
            title="Advanced Filters"
            onClick={() => setShowFilterSidebar(true)}
          >
            <Icon icon="mdi:filter-variant" width={18} height={18} />
          </Button>
          <Button variant="ghost" size="icon" className={sharedStyles.actionBtn} title="Export Logs" onClick={handleExport}>
            <Icon icon="mdi:download" width={18} height={18} />
          </Button>
        </div>

        <div className={sharedStyles.filterGroup} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' }}>
          <label className={sharedStyles.filterLabel} htmlFor="log-severity-filter" style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.7 }}>
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

        <div className={sharedStyles.filterGroup} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label className={sharedStyles.filterLabel} htmlFor="log-time-filter" style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.7 }}>
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
      </div>

      <div className={sharedStyles.headerRight} style={{ flex: 1, maxWidth: '400px', display: 'flex', justifyContent: 'flex-end' }}>
        <Input
          type="text"
          placeholder="Search stream..."
          containerClassName={sharedStyles.headerSearch}
          className={sharedStyles.headerSearchField}
          icon={<Icon icon="mdi:magnify" width={18} height={18} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>
    </header>
  );
};
