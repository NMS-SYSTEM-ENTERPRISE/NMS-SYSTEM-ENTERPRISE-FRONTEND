'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useTrapExplorer } from '@/hooks/trap-explorer';
import styles from './styles.module.css';

export const TrapHeader = () => {
  const {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    setShowFilterSidebar,
    setShowLiveViewer,
    filters,
    handleResetFilters,
    setFilters,
    fetchTraps,
    isLoading,
  } = useTrapExplorer();

  const [localSearch, setLocalSearch] = useState(searchQuery || '');

  useEffect(() => {
    setLocalSearch(searchQuery || '');
  }, [searchQuery]);

  const handleSearchSubmit = () => {
    setSearchQuery(localSearch);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchSubmit();
  };

  const handleClearSearch = () => {
    setLocalSearch('');
    setSearchQuery('');
  };

  const handleRefresh = () => {
    fetchTraps();
  };

  const handleOpenFilters = () => {
    setShowFilterSidebar(true);
  };

  const handleOpenLiveViewer = () => {
    setShowLiveViewer(true);
  };

  // Build active filter tags (exclude empty/null values)
  const FILTER_LABELS = {
    trapOid: 'Trap OID',
    source: 'Source',
    vendor: 'Vendor',
    severity: 'Severity',
    acknowledged: 'Acknowledged',
    countMin: 'Min Count',
    countMax: 'Max Count',
  };

  const activeFilters = Object.entries(filters || {}).filter(
    ([, v]) => v !== '' && v !== null && v !== undefined
  );

  const removeFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: '' }));
  };

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        {/* Left: Title */}
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <Icon icon="mdi:bell-ring" width={22} height={22} />
          </div>
          <h1 className={styles.headerTitle}>Trap Explorer</h1>
        </div>

        {/* Right: Search + View Toggle + Actions */}
        <div className={styles.headerRight}>
          {/* Search */}
          <div className={styles.searchWrapper}>
            <Icon icon="mdi:magnify" width={16} className={styles.searchLeadIcon} />
            <input
              type="text"
              placeholder="Search traps..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.searchInput}
            />
            {localSearch && (
              <button className={styles.searchClear} onClick={handleClearSearch} aria-label="Clear">
                <Icon icon="mdi:close-circle" width={14} />
              </button>
            )}
            <button className={styles.searchBtn} onClick={handleSearchSubmit} aria-label="Search">
              <Icon icon="mdi:arrow-right" width={16} />
            </button>
          </div>

          {/* View Toggle */}
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewToggleBtn} ${viewMode === 'list' ? styles.viewToggleBtnActive : ''}`}
              onClick={() => setViewMode('list')}
            >
              <Icon icon="mdi:format-list-bulleted" width={15} height={15} />
              List
            </button>
            <button
              className={`${styles.viewToggleBtn} ${viewMode === 'dashboard' ? styles.viewToggleBtnActive : ''}`}
              onClick={() => setViewMode('dashboard')}
            >
              <Icon icon="mdi:view-dashboard" width={15} height={15} />
              Dashboard
            </button>
          </div>

          {/* Action Buttons */}
          <div className={styles.headerActions}>
            <button
              className={styles.actionBtn}
              onClick={handleOpenLiveViewer}
              title="Live Viewer"
              aria-label="Live Viewer"
            >
              <Icon icon="mdi:pulse" width={18} height={18} />
            </button>
            <button
              className={styles.actionBtn}
              onClick={handleOpenFilters}
              title="Filters"
              aria-label="Filters"
            >
              <Icon icon="mdi:filter-variant" width={18} height={18} />
            </button>
            <button
              className={`${styles.actionBtn} ${isLoading ? styles.actionBtnSpin : ''}`}
              onClick={handleRefresh}
              title="Refresh"
              aria-label="Refresh"
              disabled={isLoading}
            >
              <Icon icon="mdi:refresh" width={18} height={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Active Filter Tags */}
      {activeFilters.length > 0 && (
        <div className={styles.filterTags}>
          <Icon icon="mdi:filter-check" width={14} className={styles.filterTagsIcon} />
          <span className={styles.filterTagsLabel}>Filters:</span>
          {activeFilters.map(([key, value]) => (
            <span key={key} className={styles.filterTag}>
              <span className={styles.filterTagKey}>{FILTER_LABELS[key] || key}</span>
              <span className={styles.filterTagValue}>{value}</span>
              <button className={styles.filterTagClose} onClick={() => removeFilter(key)} aria-label={`Remove ${key}`}>
                <Icon icon="mdi:close" width={12} />
              </button>
            </span>
          ))}
          <button className={styles.resetAllBtn} onClick={handleResetFilters}>
            <Icon icon="mdi:close-circle-outline" width={13} />
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};
