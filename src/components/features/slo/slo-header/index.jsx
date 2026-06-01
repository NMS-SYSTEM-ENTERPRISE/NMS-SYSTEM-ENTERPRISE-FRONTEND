'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import { useSlo } from '@/hooks/slo';
import styles from './styles.module.css';

export const SloHeader = () => {
  const {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    setShowActionSidebar,
  } = useSlo();

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
          <Input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon="ph:magnifying-glass-bold"
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
          <Button variant="ghost" size="icon" className={styles.actionBtn} title="Refresh">
            <Icon icon="ph:arrows-clockwise-bold" />
          </Button>
          <Button variant="cyan" size="icon" className={styles.actionBtnPrimary} title="Create SLO">
            <Icon icon="ph:plus-bold" className={styles.addIcon} />
          </Button>
        </div>
      </div>
    </header>
  );
};
