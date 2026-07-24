'use client';

import { SlaTimelineView } from '@/components/features/sla/sla-timeline-view';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import { useSla } from '@/hooks/sla';
import {
  CATEGORY_FILTER_OPTIONS,
  FREQUENCY_FILTER_OPTIONS,
  QUICK_SELECT_OPTIONS,
  STATUS_FILTER_OPTIONS,
} from '@/utils/constants/sla';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

const FilterField = ({ label, children }) => (
  <div className={styles.filterGroup}>
    <label className={styles.filterLabel}>{label}</label>
    {children}
  </div>
);

export const SlaActionSidebar = () => {
  const {
    showActionSidebar,
    setShowActionSidebar,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    handleResetFilters,
    handleApplyFilters,
  } = useSla();

  const [activeView, setActiveView] = useState('filters');

  if (!showActionSidebar) return null;

  const set = (key) => (e) =>
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));

  const isCustomRange = !filters.quick_select;

  return (
    <>
      <div
        className={styles.overlay}
        onClick={() => setShowActionSidebar(false)}
        role="presentation"
      />

      <aside className={styles.sidebar}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            <Icon icon="ph:gear-six-bold" />
            SLA Actions
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

        {/* Tab toggle */}
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
              {/* Search */}
              <div className={styles.searchSection}>
                <Input
                  type="text"
                  placeholder="Search by SLA name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Icon icon="ph:magnifying-glass-bold" width={18} />}
                />
              </div>

              <div className={styles.filtersSection}>
                <h3 className={styles.sectionTitle}>Filter Settings</h3>

                {/* ── Device Filters ── */}
                <FilterField label="Device Group">
                  <Input
                    type="text"
                    placeholder="e.g. Network, Server"
                    value={filters.device_group || ''}
                    onChange={set('device_group')}
                  />
                </FilterField>

                <FilterField label="Device Type">
                  <Input
                    type="text"
                    placeholder="e.g. Switch, UPS"
                    value={filters.device_type || ''}
                    onChange={set('device_type')}
                  />
                </FilterField>

                <FilterField label="Device Subgroup">
                  <Input
                    type="text"
                    placeholder="Further subgroup filter"
                    value={filters.device_subgroup || ''}
                    onChange={set('device_subgroup')}
                  />
                </FilterField>

                {/* ── Status / Category ── */}
                <FilterField label="Status">
                  <SelectComponent
                    value={filters.status || ''}
                    onChange={set('status')}
                    options={STATUS_FILTER_OPTIONS}
                  />
                </FilterField>

                <FilterField label="Category">
                  <SelectComponent
                    value={filters.slaType || ''}
                    onChange={set('slaType')}
                    options={CATEGORY_FILTER_OPTIONS}
                  />
                </FilterField>

                <FilterField label="Reporting Period">
                  <SelectComponent
                    value={filters.frequency || ''}
                    onChange={set('frequency')}
                    options={FREQUENCY_FILTER_OPTIONS}
                  />
                </FilterField>

                {/* ── Date / Time ── */}
                <FilterField label="Quick Select">
                  <SelectComponent
                    value={filters.quick_select || ''}
                    onChange={set('quick_select')}
                    options={QUICK_SELECT_OPTIONS}
                  />
                </FilterField>

                {isCustomRange && (
                  <>
                    <FilterField label="Start Date">
                      <Input
                        type="date"
                        value={filters.start_date || ''}
                        onChange={set('start_date')}
                      />
                    </FilterField>

                    <FilterField label="End Date">
                      <Input
                        type="date"
                        value={filters.end_date || ''}
                        onChange={set('end_date')}
                      />
                    </FilterField>
                  </>
                )}

                <FilterField label="Time Range">
                  <div className={styles.rangeGroup}>
                    <Input
                      type="time"
                      value={filters.start_time || '00:00'}
                      onChange={set('start_time')}
                    />
                    <Icon icon="ph:minus-bold" className={styles.rangeDivider} />
                    <Input
                      type="time"
                      value={filters.end_time || '23:59'}
                      onChange={set('end_time')}
                    />
                  </div>
                </FilterField>

                {/* ── Objective Range ── */}
                <FilterField label="Objective Range (%)">
                  <div className={styles.rangeGroup}>
                    <Input
                      type="number"
                      className={styles.rangeInput}
                      value={filters.targetMin || ''}
                      onChange={set('targetMin')}
                      placeholder="Min"
                    />
                    <Icon icon="ph:minus-bold" className={styles.rangeDivider} />
                    <Input
                      type="number"
                      className={styles.rangeInput}
                      value={filters.targetMax || ''}
                      onChange={set('targetMax')}
                      placeholder="Max"
                    />
                  </div>
                </FilterField>
              </div>
            </>
          ) : (
            <SlaTimelineView />
          )}
        </div>

        {activeView === 'filters' && (
          <div className={styles.footer}>
            <Button variant="ghost" className={styles.resetBtn} onClick={handleResetFilters}>
              <Icon icon="ph:arrow-counter-clockwise-bold" />
              Reset All
            </Button>
            <Button variant="cyan" className={styles.applyBtn} onClick={() => handleApplyFilters(filters)}>
              <Icon icon="ph:check-bold" />
              Apply
            </Button>
          </div>
        )}
      </aside>
    </>
  );
};
