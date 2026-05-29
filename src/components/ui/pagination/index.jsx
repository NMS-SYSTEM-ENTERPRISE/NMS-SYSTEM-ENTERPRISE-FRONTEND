import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { SelectComponent } from '@/components/ui/select';
import styles from './styles.module.css';

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

/**
 * Pagination — Reusable pagination bar component.
 *
 * Usage:
 * ```jsx
 * <Pagination
 *   currentPage={1}
 *   totalItems={165}
 *   pageSize={50}
 *   onPageChange={(page) => setPage(page)}
 *   onPageSizeChange={(size) => setPageSize(size)}
 * />
 * ```
 *
 * Props:
 * @param {number}   currentPage          — 1-indexed current page
 * @param {number}   totalItems           — Total number of items
 * @param {number}   pageSize             — Items per page
 * @param {Function} onPageChange         — Called with new page number (1-indexed)
 * @param {Function} [onPageSizeChange]   — Called with new page size; hides selector if omitted
 * @param {number[]} [pageSizeOptions]    — Overrides default page size choices
 * @param {boolean}  [showPageSizeSelect] — Show items-per-page dropdown (default: true if onPageSizeChange provided)
 * @param {boolean}  [showTotalCount]     — Show "X – Y of Z items" (default: true)
 * @param {string}   [className]          — Extra className for root element
 */
const Pagination = ({
  currentPage = 1,
  totalItems = 0,
  pageSize = 50,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  showPageSizeSelect,
  showTotalCount = true,
  className,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  // Derive display range
  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalItems);

  // Build visible page chips with smart ellipsis
  const buildPageChips = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [];
    const addPage = (n) => pages.push(n);
    const addEllipsis = () => pages.push('...');

    addPage(1);
    if (currentPage > 3) addEllipsis();
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      addPage(i);
    }
    if (currentPage < totalPages - 2) addEllipsis();
    addPage(totalPages);
    return pages;
  };

  const chips = buildPageChips();
  const showSelector =
    showPageSizeSelect !== undefined ? showPageSizeSelect : Boolean(onPageSizeChange);

  return (
    <div className={clsx(styles.pagination, className)}>
      {/* First / Prev */}
      <button
        className={styles.navBtn}
        disabled={!canPrev}
        onClick={() => onPageChange?.(1)}
        title="First page"
      >
        <Icon icon="mdi:chevron-double-left" width={16} />
      </button>
      <button
        className={styles.navBtn}
        disabled={!canPrev}
        onClick={() => onPageChange?.(currentPage - 1)}
        title="Previous page"
      >
        <Icon icon="mdi:chevron-left" width={16} />
      </button>

      {/* Page chips */}
      {chips.map((chip, i) =>
        chip === '...' ? (
          <span key={`ellipsis-${i}`} className={styles.ellipsis}>
            …
          </span>
        ) : (
          <button
            key={chip}
            className={clsx(styles.pageChip, chip === currentPage && styles.pageChip_active)}
            onClick={() => chip !== currentPage && onPageChange?.(chip)}
          >
            {chip}
          </button>
        ),
      )}

      {/* Next / Last */}
      <button
        className={styles.navBtn}
        disabled={!canNext}
        onClick={() => onPageChange?.(currentPage + 1)}
        title="Next page"
      >
        <Icon icon="mdi:chevron-right" width={16} />
      </button>
      <button
        className={styles.navBtn}
        disabled={!canNext}
        onClick={() => onPageChange?.(totalPages)}
        title="Last page"
      >
        <Icon icon="mdi:chevron-double-right" width={16} />
      </button>

      <div className={styles.spacer} />

      {/* Items per page */}
      {showSelector && (
        <div className={styles.pageSizeGroup}>
          <span className={styles.pageSizeLabel}>Items per page</span>
          <SelectComponent
            className={styles.pageSizeSelectWrapper}
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            options={pageSizeOptions.map((opt) => ({ value: opt, label: String(opt) }))}
            isSearchable={false}
            isClearable={false}
            menuPlacement="top"
          />
        </div>
      )}

      {/* Total count */}
      {showTotalCount && (
        <span className={styles.totalCount}>
          {rangeStart} – {rangeEnd} of {totalItems} items
        </span>
      )}
    </div>
  );
};

export { Pagination };
