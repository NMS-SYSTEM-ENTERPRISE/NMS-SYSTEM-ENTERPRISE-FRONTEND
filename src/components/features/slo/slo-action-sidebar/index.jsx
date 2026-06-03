'use client';

import { SloTimelineView } from '@/components/features/slo/slo-timeline-view';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchInput } from '@/components/ui/search-input';
import { SelectComponent } from '@/components/ui/select';
import { useSlo } from '@/hooks/slo';
import {
  CATEGORY_FILTER_OPTIONS,
  FREQUENCY_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
} from '@/utils/constants/slo';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

export const SloActionSidebar = () => {
  const {
    showActionSidebar,
    setShowActionSidebar,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    handleResetFilters,
    handleApplyFilters,
  } = useSlo();

  const [activeView, setActiveView] = useState('filters');

  if (!showActionSidebar) return null;

  const handleApply = () => {
    handleApplyFilters(filters);
  };

  return (
    <>
      <div
        className={styles.overlay}
        onClick={() => setShowActionSidebar(false)}
        role="presentation"
      />

      <aside className={styles.sidebar}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <Icon icon="ph:gear-six-bold" />
            SLO Actions
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className={styles.closeBtn}
            onClick={() => setShowActionSidebar(false)}
            aria-label="Close sidebar"
          >
            <Icon icon="ph:x-bold" />
          </Button>
        </div>

        <div className={styles.viewToggle}>
          <Button
            variant="ghost"
            className={`${styles.viewToggleBtn} ${activeView === 'filters' ? styles.viewToggleBtnActive : ''}`}
            onClick={() => setActiveView('filters')}
          >
            <Icon icon="ph:funnel-bold" />
            Filters
          </Button>
          <Button
            variant="ghost"
            className={`${styles.viewToggleBtn} ${activeView === 'timeline' ? styles.viewToggleBtnActive : ''}`}
            onClick={() => setActiveView('timeline')}
          >
            <Icon icon="ph:clock-bold" />
            Timeline
          </Button>
        </div>

        <div className={styles.content}>
          {activeView === 'filters' ? (
            <>
              <div className={styles.searchSection}>
                <SearchInput
                  placeholder="Search by SLO name..."
                  className={styles.searchInput}
                  tags={searchQuery ? searchQuery.split(' ').filter(Boolean) : []}
                  onTagsChange={(newTags) => setSearchQuery(newTags.join(' '))}
                />
              </div>

              <div className={styles.filtersSection}>
                <h3 className={styles.sectionTitle}>Filter Settings</h3>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Status</label>
                  <SelectComponent
                    value={filters.status || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    options={STATUS_FILTER_OPTIONS}
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Category</label>
                  <SelectComponent
                    value={filters.sloType || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sloType: e.target.value,
                      }))
                    }
                    options={CATEGORY_FILTER_OPTIONS}
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Reporting Period</label>
                  <SelectComponent
                    value={filters.frequency || ''}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        frequency: e.target.value,
                      }))
                    }
                    options={FREQUENCY_FILTER_OPTIONS}
                  />
                </div>

                <div className={styles.filterGroup}>
                  <span className={styles.filterLabel}>
                    Objective Range (%)
                  </span>
                  <div className={styles.rangeGroup}>
                    <Input
                      type="number"
                      className={styles.rangeInput}
                      value={filters.targetMin || ''}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          targetMin: e.target.value,
                        }))
                      }
                      placeholder="Min"
                    />
                    <Icon
                      icon="ph:minus-bold"
                      className={styles.rangeDivider}
                    />
                    <Input
                      type="number"
                      className={styles.rangeInput}
                      value={filters.targetMax || ''}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          targetMax: e.target.value,
                        }))
                      }
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <SloTimelineView />
          )}
        </div>

        {activeView === 'filters' && (
          <div className={styles.footer}>
            <Button
              variant="ghost"
              className={styles.resetBtn}
              onClick={handleResetFilters}
            >
              <Icon icon="ph:arrow-counter-clockwise-bold" />
              Reset All
            </Button>
            <Button
              variant="cyan"
              className={styles.applyBtn}
              onClick={handleApply}
            >
              <Icon icon="ph:check-bold" />
              Apply
            </Button>
          </div>
        )}
      </aside>
    </>
  );
};
