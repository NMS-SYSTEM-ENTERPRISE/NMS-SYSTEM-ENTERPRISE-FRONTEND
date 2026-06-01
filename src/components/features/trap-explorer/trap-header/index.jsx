'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import { useTrapExplorer } from '@/hooks/trap-explorer';
import styles from './styles.module.css';

export const TrapHeader = () => {
  const {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    setShowLiveViewer,
    setShowFilterSidebar,
  } = useTrapExplorer();

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.headerIcon}>
          <Icon icon="mdi:bell-ring" width={24} height={24} />
        </div>
        <h1 className={styles.headerTitle}>Trap Explorer</h1>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.headerSearch}>
          <Input
            type="text"
            placeholder="Search traps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon="mdi:magnify"
            className={styles.searchInput}
          />
        </div>

        <div className={styles.viewToggle}>
          <Button
            variant={viewMode === 'list' ? 'primary' : 'ghost'}
            className={`${styles.viewToggleBtn} ${viewMode === 'list' ? styles.viewToggleBtnActive : ''}`}
            onClick={() => setViewMode('list')}
          >
            <Icon icon="mdi:format-list-bulleted" width={16} height={16} />
            List
          </Button>
          <Button
            variant={viewMode === 'dashboard' ? 'primary' : 'ghost'}
            className={`${styles.viewToggleBtn} ${viewMode === 'dashboard' ? styles.viewToggleBtnActive : ''}`}
            onClick={() => setViewMode('dashboard')}
          >
            <Icon icon="mdi:view-dashboard" width={16} height={16} />
            Dashboard
          </Button>
        </div>

        <div className={styles.headerActions}>
          <Button
            variant="ghost"
            size="icon"
            className={styles.actionBtn}
            onClick={() => setShowLiveViewer(true)}
            title="Live Viewer"
          >
            <Icon icon="mdi:pulse" width={20} height={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={styles.actionBtn}
            onClick={() => setShowFilterSidebar(true)}
            title="Filters"
          >
            <Icon icon="mdi:filter-variant" width={20} height={20} />
          </Button>
          <Button variant="ghost" size="icon" className={styles.actionBtn} title="Refresh">
            <Icon icon="mdi:refresh" width={20} height={20} />
          </Button>
          <Button variant="ghost" size="icon" className={styles.actionBtn} title="Export">
            <Icon icon="mdi:download" width={20} height={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};
