'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useSlo } from '@/hooks/slo';
import { SLO_CATEGORIES } from '@/utils/constants/slo';
import styles from './styles.module.css';

export const SloSidebar = () => {
  const { activeCategory, setActiveCategory, isSidebarOpen, setIsSidebarOpen } = useSlo();

  return (
    <aside className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        <span className={`${styles.sidebarTitle} ${!isSidebarOpen ? styles.hidden : ''}`}>
          Categories
        </span>
        <Button
          variant="ghost"
          size="icon"
          className={styles.collapseBtn}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title={isSidebarOpen ? 'Collapse' : 'Expand'}
        >
          <Icon icon={isSidebarOpen ? 'mdi:menu-open' : 'mdi:menu'} width={20} />
        </Button>
      </div>

      <nav className={styles.sidebarNav}>
        <div className={styles.treeRoot}>
          <Icon icon="ph:target-bold" className={styles.rootIcon} />
          <span className={styles.rootLabel}>SLO Management</span>
        </div>

        <div className={styles.treeChildren}>
          {SLO_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className={`${styles.navItem} ${activeCategory === cat.id ? styles.navItemActive : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              title={!isSidebarOpen ? cat.label : ''}
            >
              <div className={styles.treeBranch} />
              <div className={`${styles.itemIconWrapper} ${styles[`categoryIcon_${cat.colorToken}`]}`}>
                <Icon icon={cat.icon} width={18} />
              </div>
              <span className={styles.navText}>{cat.label}</span>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
};
