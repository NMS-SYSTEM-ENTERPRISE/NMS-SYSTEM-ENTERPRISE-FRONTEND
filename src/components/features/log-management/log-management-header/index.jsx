'use client';

import sharedStyles from '@/components/features/log-management/shared/styles.module.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLogManagement } from '@/hooks/log-management';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

export const LogManagementHeader = () => {
  const {
    layoutView,
    setLayoutView,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    setShowFilterSidebar,
    loadSyslogs,
    filteredEvents,
  } = useLogManagement();

  const handleExport = () => {
    if (!filteredEvents || filteredEvents.length === 0) {
      toast.error('No logs available to export.');
      return;
    }
    const headers = ['Timestamp', 'Category', 'Severity', 'Source', 'Message'];
    const rows = filteredEvents.map((e) =>
      [
        e.timestamp,
        e.category,
        e.severity,
        e.source,
        `"${(e.message || '').replace(/"/g, '""')}"`,
      ].join(',')
    );
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
    <header className={sharedStyles.header}>
      <div className={sharedStyles.headerLeft}>
        <div className={sharedStyles.headerIcon}>
          <Icon icon="mdi:file-document-multiple" width={24} height={24} />
        </div>
        <div className={sharedStyles.headerText}>
          <h1 className={sharedStyles.headerTitle}>Log Management</h1>
        </div>
      </div>

      <div className={sharedStyles.headerRight}>
        <Input
          type="text"
          placeholder="Search logs..."
          containerClassName={sharedStyles.headerSearch}
          className={sharedStyles.headerSearchField}
          icon={<Icon icon="mdi:magnify" width={18} height={18} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            background: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '2px',
            borderRadius: '8px',
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            style={{
              width: '28px',
              height: '28px',
              backgroundColor:
                layoutView === 'dashboard'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'transparent',
              color:
                layoutView === 'dashboard'
                  ? 'var(--text-primary)'
                  : 'var(--text-muted)',
              borderRadius: '6px',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
            }}
            onClick={() => setLayoutView('dashboard')}
            title="Dashboard"
          >
            <Icon icon="lucide:layout-grid" width={16} height={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            style={{
              width: '28px',
              height: '28px',
              backgroundColor:
                layoutView === 'list'
                  ? 'rgba(255, 255, 255, 0.08)'
                  : 'transparent',
              color:
                layoutView === 'list'
                  ? 'var(--text-primary)'
                  : 'var(--text-muted)',
              borderRadius: '6px',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
            }}
            onClick={() => setLayoutView('list')}
            title="List"
          >
            <Icon icon="lucide:list" width={16} height={16} />
          </Button>
        </div>

        <div className={sharedStyles.headerDivider} />

        <div className={sharedStyles.headerActions}>
          <Button
            variant="ghost"
            size="icon"
            className={sharedStyles.actionBtn}
            title="Refresh Stream"
            onClick={loadSyslogs}
          >
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
          <Button
            variant="ghost"
            size="icon"
            className={sharedStyles.actionBtn}
            title="Export Logs"
            onClick={handleExport}
          >
            <Icon icon="mdi:download" width={18} height={18} />
          </Button>
        </div>
      </div>
    </header>
  );
};
