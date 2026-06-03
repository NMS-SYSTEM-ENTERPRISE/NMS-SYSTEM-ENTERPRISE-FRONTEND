'use client';

import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';
import { useSlo } from '@/hooks/slo';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

export const SloHeader = () => {
  const {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    setShowActionSidebar,
    refreshSloPortfolio,
    handleResetFilters,
  } = useSlo();

  const tags = searchQuery ? searchQuery.split(' ').filter(Boolean) : [];

  const handleTagsChange = (newTags) => {
    setSearchQuery(newTags.join(' '));
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.headerIcon}>
          <Icon icon="ph:chart-line-up-bold" width={20} />
        </div>
        <h1 className={styles.headerTitle}>SLO Portfolio</h1>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.headerSearch}>
          <SearchInput
            placeholder="Search resources..."
            tags={tags}
            onTagsChange={handleTagsChange}
            className={styles.searchInput}
          />
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
            variant="ghost"
            size="icon"
            className={styles.actionBtn}
            onClick={() => setShowActionSidebar(true)}
            title="Filters and actions"
          >
            <Icon icon="ph:funnel-bold" />
          </Button>
          {/* <Button
            variant="ghost"
            size="icon"
            className={styles.actionBtn}
            title="Reset Search and Filters"
            onClick={handleResetFilters}
          >
            <Icon icon="ph:x-circle-bold" />
          </Button> */}
          <Button
            variant="ghost"
            size="icon"
            className={styles.actionBtn}
            title="Refresh Data"
            onClick={refreshSloPortfolio}
          >
            <Icon icon="ph:arrows-clockwise-bold" />
          </Button>
        </div>
      </div>
    </header>
  );
};
