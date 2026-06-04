'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/networkmonitoring/styles.module.css';
import { useNetworkMonitoring } from '@/hooks/network-monitoring';

export const NetworkMonitoringHeader = () => {
  const {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    setShowFilterSidebar,
  } = useNetworkMonitoring();

  return (
    <div className={sharedStyles.header}>
      <div className={sharedStyles.headerLeft}>
        <div className={sharedStyles.headerIcon}>
          <Icon icon="mdi:monitor-dashboard" width={24} height={24} />
        </div>
        <h1 className={sharedStyles.headerTitle}>Network Monitoring</h1>
      </div>

      <div className={sharedStyles.headerRight}>
        <Input
          type="text"
          placeholder="Search devices..."
          className={sharedStyles.headerSearchInput}
          containerClassName={sharedStyles.headerSearch}
          icon={<Icon icon="mdi:magnify" width={18} />}
          defaultValue={searchQuery}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearchQuery(e.target.value);
            }
          }}
        />

        <div className={sharedStyles.viewToggle}>
          <Button
            type="button"
            variant="ghost"
            className={clsx(
              sharedStyles.viewToggleBtn,
              viewMode === 'details' && sharedStyles.viewToggleBtnActive
            )}
            onClick={() => setViewMode('details')}
          >
            <Icon icon="mdi:format-list-bulleted" width={16} height={16} />
            Details
          </Button>
          <Button
            type="button"
            variant="ghost"
            className={clsx(
              sharedStyles.viewToggleBtn,
              viewMode === 'dashboard' && sharedStyles.viewToggleBtnActive
            )}
            onClick={() => setViewMode('dashboard')}
          >
            <Icon icon="mdi:view-dashboard" width={16} height={16} />
            Dashboard
          </Button>
        </div>

        <div className={sharedStyles.headerActions}>
          <Button
            type="button"
            variant="ghost"
            className={sharedStyles.actionBtn}
            onClick={() => setShowFilterSidebar(true)}
            title="Filters"
          >
            <Icon icon="mdi:filter-variant" width={20} height={20} />
          </Button>
          <Button type="button" variant="ghost" className={sharedStyles.actionBtn} title="Refresh">
            <Icon icon="mdi:refresh" width={20} height={20} />
          </Button>
          <Button type="button" variant="ghost" className={sharedStyles.actionBtn} title="Export">
            <Icon icon="mdi:download" width={20} height={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};
