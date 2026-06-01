'use client';

import { TrapLiveStream } from '@/components/features/trap-explorer/trap-live-stream';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
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

  if (!showFilterSidebar) return null;

  return (
    <>
      <div className={styles.overlay} onClick={() => setShowFilterSidebar(false)} role="presentation" />

      <aside className={styles.sidebar}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <Icon icon="mdi:alert-octagon" width={20} />
            Trap Explorer Actions
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className={styles.closeBtn}
            onClick={() => setShowFilterSidebar(false)}
            aria-label="Close"
          >
            <Icon icon="mdi:close" width={24} />
          </Button>
        </div>

        <div className={styles.viewToggle}>
          <Button
            variant="ghost"
            className={`${styles.viewToggleBtn} ${activeView === 'filters' ? styles.viewToggleBtnActive : ''}`}
            onClick={() => setActiveView('filters')}
          >
            <Icon icon="mdi:filter" width={18} />
            Filters
          </Button>
          <Button
            variant="ghost"
            className={`${styles.viewToggleBtn} ${activeView === 'live' ? styles.viewToggleBtnActive : ''}`}
            onClick={() => setActiveView('live')}
          >
            <Icon icon="mdi:access-point" width={18} />
            Live Viewer
          </Button>
        </div>

        <div className={styles.content}>
          {activeView === 'filters' ? (
            <>
              <div className={styles.searchSection}>
                <Input
                  type="text"
                  placeholder="Search traps..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon="mdi:magnify"
                />
              </div>

              <div className={styles.filtersSection}>
                <h3 className={styles.sectionTitle}>Filters</h3>

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
                  <label className={styles.filterLabel}>Source</label>
                  <Input
                    type="text"
                    className={styles.input}
                    value={filters.source || ''}
                    onChange={(e) => setFilters((prev) => ({ ...prev, source: e.target.value }))}
                    placeholder="Enter source IP"
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
                  <label className={styles.filterLabel}>Severity</label>
                  <SelectComponent
                    value={filters.severity || ''}
                    onChange={(e) => setFilters((prev) => ({ ...prev, severity: e.target.value }))}
                    options={SEVERITY_FILTER_OPTIONS}
                    placeholder="Select severity"
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Acknowledged</label>
                  <SelectComponent
                    value={filters.acknowledged || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, acknowledged: e.target.value }))
                    }
                    options={ACKNOWLEDGED_FILTER_OPTIONS}
                    placeholder="Select status"
                  />
                </div>

                <div className={styles.filterGroup}>
                  <span className={styles.filterLabel}>Count Range</span>
                  <div className={styles.rangeGroup}>
                    <Input
                      type="number"
                      className={styles.rangeInput}
                      value={filters.countMin || ''}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, countMin: e.target.value }))
                      }
                      placeholder="Min"
                    />
                    <span className={styles.rangeSeparator}>-</span>
                    <Input
                      type="number"
                      className={styles.rangeInput}
                      value={filters.countMax || ''}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, countMax: e.target.value }))
                      }
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <TrapLiveStream />
          )}
        </div>

        {activeView === 'filters' && (
          <div className={styles.footer}>
            <Button variant="ghost" className={styles.resetBtn} onClick={handleResetFilters}>
              <Icon icon="mdi:refresh" width={18} />
              Reset
            </Button>
            <Button variant="cyan" className={styles.applyBtn} onClick={() => handleApplyFilters(filters)}>
              <Icon icon="mdi:check" width={18} />
              Apply Filters
            </Button>
          </div>
        )}
      </aside>
    </>
  );
};
