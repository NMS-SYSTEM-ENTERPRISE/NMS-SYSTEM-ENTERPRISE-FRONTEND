'use client';

import sharedStyles from '@/components/features/networkmonitoring/styles.module.css';
import { Button } from '@/components/ui/button';
import { useNetworkMonitoring } from '@/hooks/network-monitoring';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const FILTER_LABELS = {
  status: 'Status',
  type: 'Type',
  deviceType: 'Device Type',
  provider: 'Provider',
  region: 'Region',
  cpu: 'CPU',
  memory: 'Memory',
  disk: 'Disk',
  latency: 'Latency',
};

const formatFilterValue = (value) => {
  if (Array.isArray(value)) return `${value[0]} – ${value[1]}`;
  return String(value);
};

export const NetworkMonitoringHeader = () => {
  const {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    filters,
    setFilters,
    handleResetFilters,
  } = useNetworkMonitoring();

  const [localSearch, setLocalSearch] = useState(searchQuery || '');

  useEffect(() => {
    setLocalSearch(searchQuery || '');
  }, [searchQuery]);

  const trimmedSearch = localSearch.trim();
  const canSubmitSearch = trimmedSearch.length > 0;

  const handleSearchSubmit = () => {
    if (!canSubmitSearch) return;
    setSearchQuery(trimmedSearch);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  const handleClearInput = () => {
    setLocalSearch('');
    if (searchQuery) setSearchQuery('');
  };

  const removeFilter = (key) => {
    setFilters((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const removeSearchFilter = () => {
    setSearchQuery('');
    setLocalSearch('');
  };

  const activeSidebarFilters = Object.entries(filters || {}).filter(
    ([, value]) => value !== undefined && value !== '' && value !== null
  );

  const hasActiveFilters = !!searchQuery || activeSidebarFilters.length > 0;

  return (
    <div className={sharedStyles.headerContainer}>
      <div className={sharedStyles.header}>
        <div className={sharedStyles.headerLeft}>
          <div className={sharedStyles.headerIcon}>
            <Icon icon="mdi:monitor-dashboard" width={24} height={24} />
          </div>
          <h1 className={sharedStyles.headerTitle}>Network Monitoring</h1>
        </div>

        <div className={sharedStyles.headerRight}>
          <div className={sharedStyles.searchWrapper}>
            <Icon
              icon="mdi:magnify"
              width={16}
              className={sharedStyles.searchLeadIcon}
            />
            <input
              type="text"
              placeholder="Search devices..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className={sharedStyles.searchInput}
              aria-label="Search devices"
            />
            {localSearch && (
              <button
                type="button"
                className={sharedStyles.searchClear}
                onClick={handleClearInput}
                aria-label="Clear search input"
              >
                <Icon icon="mdi:close-circle" width={14} />
              </button>
            )}
            <button
              type="button"
              className={clsx(
                sharedStyles.searchBtn,
                !canSubmitSearch && sharedStyles.searchBtnDisabled
              )}
              onClick={handleSearchSubmit}
              disabled={!canSubmitSearch}
              aria-label="Apply search filter"
              title={canSubmitSearch ? 'Apply search' : 'Enter text to search'}
            >
              <Icon icon="mdi:arrow-right" width={16} />
            </button>
          </div>

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
            {/* <Button
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
            </Button> */}
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className={sharedStyles.filterTagsRow}>
          <Icon
            icon="mdi:filter-check"
            width={14}
            className={sharedStyles.filterTagsIcon}
          />
          <span className={sharedStyles.filterTagsLabel}>Active Filters:</span>

          {searchQuery && (
            <span className={sharedStyles.filterTag}>
              <span className={sharedStyles.filterTagKey}>Search</span>
              <span className={sharedStyles.filterTagValue}>{searchQuery}</span>
              <button
                type="button"
                className={sharedStyles.filterTagClose}
                onClick={removeSearchFilter}
                aria-label="Remove search filter"
              >
                <Icon icon="mdi:close" width={12} />
              </button>
            </span>
          )}

          {activeSidebarFilters.map(([key, value]) => (
            <span key={key} className={sharedStyles.filterTag}>
              <span className={sharedStyles.filterTagKey}>
                {FILTER_LABELS[key] || key}
              </span>
              <span className={sharedStyles.filterTagValue}>
                {formatFilterValue(value)}
              </span>
              <button
                type="button"
                className={sharedStyles.filterTagClose}
                onClick={() => removeFilter(key)}
                aria-label={`Remove ${FILTER_LABELS[key] || key} filter`}
              >
                <Icon icon="mdi:close" width={12} />
              </button>
            </span>
          ))}

          <button
            type="button"
            className={sharedStyles.resetAllBtn}
            onClick={() => {
              handleResetFilters();
              setLocalSearch('');
            }}
          >
            <Icon icon="mdi:close-circle-outline" width={13} />
            Reset All
          </button>
        </div>
      )}
    </div>
  );
};
