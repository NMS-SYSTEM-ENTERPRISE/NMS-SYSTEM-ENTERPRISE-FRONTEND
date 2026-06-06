'use client';

import { Icon } from '@iconify/react';
import { useManual } from '../contexts/ManualContext';
import styles from '../styles/ManualSidebar.module.css';

export const ManualSidebar = () => {
  const {
    categories,
    activeCategory,
    setActiveCategory,
    filteredFeatures,
    activeFeatureId,
    selectFeature,
    searchQuery,
    setSearchQuery,
  } = useManual();

  return (
    <aside className={styles.sidebar}>
      {/* Search */}
      <div className={styles.searchBox}>
        <Icon icon="mdi:magnify" width={16} className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search modules..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className={styles.searchClear}
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
          >
            <Icon icon="mdi:close" width={14} />
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className={styles.categorySection}>
        <span className={styles.sectionLabel}>Filter by Category</span>
        <div className={styles.categoryList}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.categoryBtnActive : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <Icon icon={cat.icon} width={14} />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Module List */}
      <div className={styles.moduleSection}>
        <span className={styles.sectionLabel}>
          Modules
          <span className={styles.moduleCount}>{filteredFeatures.length}</span>
        </span>
        <nav className={styles.moduleList}>
          {filteredFeatures.length === 0 ? (
            <div className={styles.emptyState}>
              <Icon icon="mdi:magnify-close" width={28} />
              <span>No modules found</span>
            </div>
          ) : (
            filteredFeatures.map((feature) => (
              <button
                key={feature.id}
                className={`${styles.moduleItem} ${activeFeatureId === feature.id ? styles.moduleItemActive : ''}`}
                onClick={() => selectFeature(feature.id)}
              >
                <span
                  className={styles.moduleIcon}
                  style={{
                    backgroundColor: `${feature.color}18`,
                    color: feature.color,
                  }}
                >
                  <Icon icon={feature.icon} width={15} />
                </span>
                <span className={styles.moduleLabel}>{feature.title}</span>
                {activeFeatureId === feature.id && (
                  <Icon
                    icon="mdi:chevron-right"
                    width={14}
                    className={styles.activeArrow}
                  />
                )}
              </button>
            ))
          )}
        </nav>
      </div>
    </aside>
  );
};
