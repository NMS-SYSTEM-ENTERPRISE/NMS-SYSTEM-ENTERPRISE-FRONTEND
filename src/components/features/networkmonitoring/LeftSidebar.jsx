import { Icon } from '@iconify/react';
import styles from './styles.module.css';
import { CATEGORY_CONFIGS } from '@/utils/constants/network-monitoring';

const LeftSidebar = ({ activeCategory, setActiveCategory, isCollapsed, setIsCollapsed, showFilterSidebar }) => {
  const categories = Object.keys(CATEGORY_CONFIGS);

  return (
    <div className={`${styles.leftSidebar} ${showFilterSidebar ? styles.collapsed : ''} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        {!isCollapsed && <span className={styles.sidebarTitle}>Categories</span>}
        <button 
          className={styles.collapseBtn} 
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <Icon icon={isCollapsed ? "mdi:chevron-double-right" : "mdi:chevron-double-left"} width={20} height={20} />
        </button>
      </div>
      
      <div className={styles.categoryList}>
        {categories.map((category) => (
          <div
            key={category}
            className={`${styles.categoryItem} ${
              activeCategory === category ? styles.categoryItemActive : ''
            }`}
            onClick={() => setActiveCategory(category)}
            title={isCollapsed ? category : ''}
          >
            <div className={styles.treeBranch} />
            <div className={styles.itemContent}>
              <Icon
                icon={CATEGORY_CONFIGS[category].icon}
                width={20}
                height={20}
                className={styles.categoryIcon}
                style={{ '--category-color': CATEGORY_CONFIGS[category].color }}
              />
              {!isCollapsed && <span className={styles.categoryText}>{category}</span>}
            </div>
             {activeCategory === category && !isCollapsed && (
                <div className={styles.activeDot} />
             )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
