'use client';

import sharedStyles from '@/components/features/audit/shared/styles.module.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import { useAudit } from '@/hooks/audit';
import {
  AUDIT_MODULE_FILTER_OPTIONS,
  AUDIT_STATUS_FILTER_OPTIONS,
} from '@/utils/constants/audit';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

export const AuditHeader = () => {
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    setShowFilterSidebar,
    fetchAuditLogs,
    loading,
    activeView,
    setActiveView,
    handleOpenActionSidebar,
  } = useAudit();

  const hasFilters =
    searchQuery.trim() !== '' ||
    filters.module !== '' ||
    filters.operationType !== 'All' ||
    filters.user !== '' ||
    filters.remoteIp !== '' ||
    filters.status !== 'All';

  return (
    <header className={sharedStyles.header}>
      <div className={sharedStyles.headerLeft}>
        <div className={sharedStyles.headerIcon}>
          <Icon icon="mdi:file-document" width={24} height={24} />
        </div>
        <div className={sharedStyles.headerText}>
          <h1 className={sharedStyles.headerTitle}>Audit Logs</h1>
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

        <div className={sharedStyles.viewToggleGroup}>
          <button
            className={clsx(
              sharedStyles.viewToggleBtn,
              activeView === 'overview' && sharedStyles.viewToggleBtnActive
            )}
            onClick={() => setActiveView('overview')}
            title="Dashboard View"
          >
            <Icon icon="mdi:view-dashboard-outline" width={18} height={18} />
          </button>
          <button
            className={clsx(
              sharedStyles.viewToggleBtn,
              activeView === 'events' && sharedStyles.viewToggleBtnActive
            )}
            onClick={() => setActiveView('events')}
            title="List View"
          >
            <Icon icon="mdi:format-list-bulleted" width={18} height={18} />
          </button>
        </div>

        <div className={sharedStyles.headerDivider} />

        <div className={sharedStyles.headerActions}>
          <Button
            variant="ghost"
            size="icon"
            className={sharedStyles.actionBtn}
            title="Refresh"
            onClick={fetchAuditLogs}
            disabled={loading}
          >
            <Icon
              icon="mdi:refresh"
              width={20}
              height={20}
              className={loading ? sharedStyles.spin : ''}
            />
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
          {hasFilters && (
            <Button
              variant="ghost"
              size="icon"
              className={sharedStyles.actionBtn}
              title="Export"
              onClick={() => handleOpenActionSidebar('export')}
            >
              <Icon icon="mdi:download" width={20} height={20} />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
