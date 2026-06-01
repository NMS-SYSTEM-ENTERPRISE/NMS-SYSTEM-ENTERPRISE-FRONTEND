'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useTrapExplorer } from '@/hooks/trap-explorer';
import { TRAP_CATEGORIES } from '@/utils/constants/trap-explorer';
import styles from './styles.module.css';

export const TrapSidebar = () => {
  const { activeCategory, setActiveCategory, isSidebarOpen, setIsSidebarOpen } = useTrapExplorer();

  return (
    <aside className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        <span className={`${styles.sidebarTitle} ${!isSidebarOpen ? styles.hidden : ''}`}>
          Trap Categories
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
          <Icon icon="mdi:bell-ring" className={styles.rootIcon} />
          <span className={styles.rootLabel}>Trap Management</span>
        </div>

        <div className={styles.treeChildren}>
          {TRAP_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className={`${styles.navItem} ${
                activeCategory === category.id ? styles.navItemActive : ''
              }`}
              onClick={() => setActiveCategory(category.id)}
              title={!isSidebarOpen ? category.label : ''}
            >
              <div className={styles.treeBranch} />
              <div
                className={`${styles.itemIconWrapper} ${styles[`categoryIcon_${category.colorToken}`]}`}
              >
                <Icon icon={category.icon} width={18} />
              </div>
              <span className={styles.navText}>{category.label}</span>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
};
