'use client';

import { TrapLiveStream } from '@/components/features/trap-explorer/trap-live-stream';
import { Button } from '@/components/ui/button';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useTrapExplorer } from '@/hooks/trap-explorer';
import {
  ACKNOWLEDGED_FILTER_OPTIONS,
  SEVERITY_FILTER_OPTIONS,
  TRAP_OID_FILTER_OPTIONS,
  VENDOR_FILTER_OPTIONS,
} from '@/utils/constants/trap-explorer';
import styles from './styles.module.css';

export const TrapActionSidebar = () => {
  const {
    showFilterSidebar,
    setShowFilterSidebar,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    handleResetFilters,
    handleApplyFilters,
  } = useTrapExplorer();

  const [activeView, setActiveView] = useState('filters');
  const [localSearch, setLocalSearch] = useState(searchQuery || '');

  useEffect(() => {
    setLocalSearch(searchQuery || '');
  }, [searchQuery]);

  const handleSearch = () => setSearchQuery(localSearch);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
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
              <Icon icon="mdi:alert-octagon" width={18} />
            </div>
            <h2 className={styles.title}>Trap Explorer Actions</h2>
          </div>
          <button className={styles.closeBtn} onClick={() => setShowFilterSidebar(false)} aria-label="Close">
            <Icon icon="mdi:close" width={20} />
          </button>
        </div>

        {/* ── Tab Toggle ── */}
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewToggleBtn} ${activeView === 'filters' ? styles.viewToggleBtnActive : ''}`}
            onClick={() => setActiveView('filters')}
          >
            <Icon icon="mdi:filter-variant" width={16} />
            Filters
          </button>
          <button
            className={`${styles.viewToggleBtn} ${activeView === 'live' ? styles.viewToggleBtnActive : ''}`}
            onClick={() => setActiveView('live')}
          >
            <Icon icon="mdi:access-point" width={16} />
            Live Viewer
          </button>
        </div>

        {/* ── Content ── */}
        <div className={styles.content}>
          {activeView === 'filters' ? (
            <>
              {/* Search */}
              <div className={styles.searchSection}>
                <div className={styles.searchBar}>
                  <Icon icon="mdi:magnify" className={styles.searchLeadIcon} width={16} />
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search traps by OID, source, message…"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  {localSearch && (
                    <button
                      className={styles.searchClear}
                      onClick={() => { setLocalSearch(''); setSearchQuery(''); }}
                      aria-label="Clear search"
                    >
                      <Icon icon="mdi:close-circle" width={14} />
                    </button>
                  )}
                  <button className={styles.searchSubmitBtn} onClick={handleSearch} aria-label="Search">
                    Search
                  </button>
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
                    <label className={styles.filterLabel}>Trap OID</label>
                    <SelectComponent
                      value={filters.trapOid || ''}
                      onChange={(e) => setFilters((prev) => ({ ...prev, trapOid: e.target.value }))}
                      options={TRAP_OID_FILTER_OPTIONS}
                      placeholder="Select Trap OID"
                    />
                  </div>

                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Severity</label>
                    <SelectComponent
                      value={filters.severity || ''}
                      onChange={(e) => setFilters((prev) => ({ ...prev, severity: e.target.value }))}
                      options={SEVERITY_FILTER_OPTIONS}
                      placeholder="Select severity"
                    />
                  </div>

                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Vendor</label>
                    <SelectComponent
                      value={filters.vendor || ''}
                      onChange={(e) => setFilters((prev) => ({ ...prev, vendor: e.target.value }))}
                      options={VENDOR_FILTER_OPTIONS}
                      placeholder="Select vendor"
                    />
                  </div>

                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Acknowledged</label>
                    <SelectComponent
                      value={filters.acknowledged || ''}
                      onChange={(e) => setFilters((prev) => ({ ...prev, acknowledged: e.target.value }))}
                      options={ACKNOWLEDGED_FILTER_OPTIONS}
                      placeholder="Any status"
                    />
                  </div>

                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Source IP</label>
                    <input
                      type="text"
                      className={styles.textInput}
                      value={filters.source || ''}
                      onChange={(e) => setFilters((prev) => ({ ...prev, source: e.target.value }))}
                      placeholder="e.g. 192.168.1.1"
                    />
                  </div>

                  <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Count Range</label>
                    <div className={styles.rangeRow}>
                      <input
                        type="number"
                        className={styles.rangeInput}
                        value={filters.countMin || ''}
                        onChange={(e) => setFilters((prev) => ({ ...prev, countMin: e.target.value }))}
                        placeholder="Min"
                      />
                      <span className={styles.rangeDash}>–</span>
                      <input
                        type="number"
                        className={styles.rangeInput}
                        value={filters.countMax || ''}
                        onChange={(e) => setFilters((prev) => ({ ...prev, countMax: e.target.value }))}
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <TrapLiveStream />
          )}
        </div>

        {/* ── Footer (Filters only) ── */}
        {activeView === 'filters' && (
          <div className={styles.footer}>
            <button className={styles.resetBtn} onClick={handleResetFilters}>
              <Icon icon="mdi:refresh" width={16} />
              Reset
            </button>
            <button className={styles.applyBtn} onClick={() => handleApplyFilters(filters)}>
              <Icon icon="mdi:check" width={16} />
              Apply Filters
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
