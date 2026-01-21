import { Icon } from '@iconify/react';
import { SelectComponent } from '@/components/ui/select';
import styles from './styles.module.css';

/**
 * Reusable Filter Sidebar Component
 * @param {boolean} isOpen - Controls sidebar visibility
 * @param {function} onClose - Close handler
 * @param {string} title - Sidebar title
 * @param {array} filters - Array of filter configurations
 * @param {object} filterValues - Current filter values
 * @param {function} onFilterChange - Filter change handler
 * @param {node} children - Additional custom content
 */
export const FilterSidebar = ({
  isOpen,
  onClose,
  title = 'Filters',
  filters = [],
  filterValues = {},
  onFilterChange,
  onApply,
  onReset,
  children,
}) => {
  if (!isOpen) return null;

  const handleFilterChange = (filterKey, value) => {
    if (onFilterChange) {
      onFilterChange(filterKey, value);
    }
  };

  const handleApply = () => {
    if (onApply) {
      onApply(filterValues);
    }
    onClose();
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose} />

      {/* Sidebar */}
      <div className={styles.sidebar}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <Icon icon="mdi:close" width={24} />
          </button>
        </div>

        {/* Search Bar (if needed) */}
        {filters.some(f => f.type === 'search') && (
          <div className={styles.searchSection}>
            <div className={styles.searchBar}>
              <Icon icon="mdi:magnify" className={styles.searchIcon} width={18} />
              <input
                type="text"
                placeholder="Search..."
                className={styles.searchInput}
                value={filterValues.search || ''}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Filters Content */}
        <div className={styles.content}>
          {filters.map((filter) => {
            if (filter.type === 'search') return null; // Already rendered above

            return (
              <div key={filter.key} className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  {filter.label}
                  {filter.required && <span className={styles.required}>*</span>}
                </label>

                {filter.type === 'select' && (
                  <SelectComponent
                    value={filterValues[filter.key] || ''}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    options={filter.options || []}
                    placeholder={filter.placeholder || 'Select...'}
                    isMulti={filter.isMulti}
                    isClearable={filter.isClearable !== false}
                  />
                )}

                {filter.type === 'multiselect' && (
                  <SelectComponent
                    value={filterValues[filter.key] || []}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    options={filter.options || []}
                    placeholder={filter.placeholder || 'Select...'}
                    isMulti={true}
                    isClearable={filter.isClearable !== false}
                  />
                )}

                {filter.type === 'input' && (
                  <input
                    type={filter.inputType || 'text'}
                    className={styles.input}
                    value={filterValues[filter.key] || ''}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    placeholder={filter.placeholder}
                  />
                )}

                {filter.type === 'checkbox' && (
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={filterValues[filter.key] || false}
                      onChange={(e) => handleFilterChange(filter.key, e.target.checked)}
                    />
                    <span>{filter.checkboxLabel}</span>
                  </label>
                )}

                {filter.type === 'range' && (
                  <div className={styles.rangeGroup}>
                    <input
                      type="number"
                      className={styles.rangeInput}
                      value={filterValues[`${filter.key}_min`] || ''}
                      onChange={(e) => handleFilterChange(`${filter.key}_min`, e.target.value)}
                      placeholder="Min"
                    />
                    <span className={styles.rangeSeparator}>-</span>
                    <input
                      type="number"
                      className={styles.rangeInput}
                      value={filterValues[`${filter.key}_max`] || ''}
                      onChange={(e) => handleFilterChange(`${filter.key}_max`, e.target.value)}
                      placeholder="Max"
                    />
                  </div>
                )}

                {filter.type === 'custom' && filter.render && filter.render(filterValues, handleFilterChange)}
              </div>
            );
          })}

          {/* Custom Children Content */}
          {children}
        </div>

        {/* Footer Actions */}
        <div className={styles.footer}>
          <button className={styles.resetBtn} onClick={handleReset}>
            <Icon icon="mdi:refresh" width={18} />
            Reset
          </button>
          <button className={styles.applyBtn} onClick={handleApply}>
            <Icon icon="mdi:check" width={18} />
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};




