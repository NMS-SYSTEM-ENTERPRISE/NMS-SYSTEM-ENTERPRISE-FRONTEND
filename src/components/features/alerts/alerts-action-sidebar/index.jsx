'use client';

import { Button } from '@/components/ui/button';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useAlerts } from '@/hooks/alerts';
import styles from './styles.module.css';
import { ALERT_SEVERITY_TABS } from '@/utils/constants/alerts';

const SEVERITY_FILTER_OPTIONS = ALERT_SEVERITY_TABS.map(tab => ({
  value: tab.id || '',
  label: tab.label
}));

export const AlertsActionSidebar = () => {
  const {
    showFilterSidebar,
    setShowFilterSidebar,
    searchQuery,
    setSearchQuery,
    severityFilter,
    setSeverityFilter,
  } = useAlerts();

  const [localSearch, setLocalSearch] = useState(searchQuery || '');
  const [localSeverity, setLocalSeverity] = useState(severityFilter || '');

  useEffect(() => {
    setLocalSearch(searchQuery || '');
  }, [searchQuery]);

  useEffect(() => {
    setLocalSeverity(severityFilter || '');
  }, [severityFilter]);

  const handleSearch = () => {
    setSearchQuery(localSearch);
    setSeverityFilter(localSeverity || null);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleResetFilters = () => {
    setLocalSearch('');
    setLocalSeverity('');
    setSearchQuery('');
    setSeverityFilter(null);
  };

  const handleApplyFilters = () => {
    handleSearch();
    setShowFilterSidebar(false);
  };

  if (!showFilterSidebar) return null;

  return (
    <>
      <div className={styles.overlay} onClick={() => setShowFilterSidebar(false)} role="presentation" />

      <aside className={styles.sidebar}>
        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIconWrap}>
              <Icon icon="mdi:filter-variant" width={18} />
            </div>
            <h2 className={styles.title}>Alert Filters</h2>
          </div>
          <button className={styles.closeBtn} onClick={() => setShowFilterSidebar(false)} aria-label="Close">
            <Icon icon="mdi:close" width={20} />
          </button>
        </div>

        {/* ── Content ── */}
        <div className={styles.content}>
          {/* Search */}
          <div className={styles.searchSection}>
            <div className={styles.searchBar}>
              <Icon icon="mdi:magnify" className={styles.searchLeadIcon} width={16} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search alerts by name, source..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {localSearch && (
                <button
                  className={styles.searchClear}
                  onClick={() => { setLocalSearch(''); }}
                  aria-label="Clear search"
                >
                  <Icon icon="mdi:close-circle" width={14} />
                </button>
              )}
            </div>
          </div>

          {/* Filters */}
          <div className={styles.filtersSection}>
            <div className={styles.filtersSectionHeader}>
              <Icon icon="mdi:tune-variant" width={16} className={styles.filtersTitleIcon} />
              <span className={styles.sectionTitle}>Filter Options</span>
            </div>

            <div className={styles.filterGrid}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Severity</label>
                <SelectComponent
                  value={localSeverity}
                  onChange={(e) => setLocalSeverity(e.target.value)}
                  options={SEVERITY_FILTER_OPTIONS}
                  placeholder="Any severity"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className={styles.footer}>
          <button className={styles.resetBtn} onClick={handleResetFilters}>
            <Icon icon="mdi:refresh" width={16} />
            Reset
          </button>
          <button className={styles.applyBtn} onClick={handleApplyFilters}>
            <Icon icon="mdi:check" width={16} />
            Apply Filters
          </button>
        </div>
      </aside>
    </>
  );
};
