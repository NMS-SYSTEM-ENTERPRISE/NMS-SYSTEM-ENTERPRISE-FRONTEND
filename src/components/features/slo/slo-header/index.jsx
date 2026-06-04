import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSlo } from '@/hooks/slo';
import { Icon } from '@iconify/react';
import { DEFAULT_SLO_FILTERS } from '@/utils/constants/slo';
import styles from './styles.module.css';

export const SloHeader = () => {
  const {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    setShowActionSidebar,
    refreshSloPortfolio,
    filters,
    handleResetFilters
  } = useSlo();

  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(localSearch);
    }
  };

  const hasActiveFilters = 
    filters.status !== DEFAULT_SLO_FILTERS.status || 
    filters.sloType !== DEFAULT_SLO_FILTERS.sloType || 
    filters.frequency !== DEFAULT_SLO_FILTERS.frequency ||
    localSearch.trim() !== '';

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <Icon icon="ph:chart-line-up-bold" width={20} />
          </div>
          <h1 className={styles.headerTitle}>SLO Portfolio</h1>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.headerSearch}>
            <div className={styles.searchWrapper}>
              <Icon icon="ph:magnifying-glass-bold" className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search resources... (Hit Enter)"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.searchInputCustom}
              />
            </div>
          </div>

          <div className={styles.viewToggle}>
            <Button
              variant={viewMode === 'table' ? 'primary' : 'ghost'}
              size="icon"
              className={`${styles.viewToggleBtn} ${viewMode === 'table' ? styles.viewToggleBtnActive : ''}`}
              onClick={() => setViewMode('table')}
              title="Table view"
            >
              <Icon icon="ph:list-bold" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="icon"
              className={`${styles.viewToggleBtn} ${viewMode === 'grid' ? styles.viewToggleBtnActive : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <Icon icon="ph:squares-four-bold" />
            </Button>
          </div>

          <div className={styles.headerActions}>
            <Button
              variant={hasActiveFilters ? 'primary' : 'ghost'}
              size="icon"
              className={`${styles.actionBtn} ${hasActiveFilters ? styles.actionBtnActive : ''}`}
              onClick={() => setShowActionSidebar(true)}
              title="Filters"
            >
              <Icon icon="ph:funnel-bold" />
            </Button>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="icon"
                className={styles.actionBtn}
                title="Reset Filters"
                onClick={handleResetFilters}
              >
                <Icon icon="ph:x-circle-bold" color="var(--color-danger)" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={styles.actionBtn}
              title="Refresh"
              onClick={refreshSloPortfolio}
            >
              <Icon icon="ph:arrows-clockwise-bold" />
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
};
