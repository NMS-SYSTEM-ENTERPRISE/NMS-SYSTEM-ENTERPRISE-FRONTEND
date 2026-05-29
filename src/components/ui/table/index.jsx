import { Icon } from '@iconify/react';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * Table — Reusable dark-themed data table component.
 *
 * Usage:
 * ```jsx
 * const columns = [
 *   { key: 'name',   label: 'Name',   sortable: true },
 *   { key: 'status', label: 'Status' },
 *   { key: 'actions', label: 'Actions', align: 'right' },
 * ];
 *
 * <Table
 *   columns={columns}
 *   data={rows}
 *   keyExtractor={(row) => row.id}
 *   renderCell={(row, col) => { ... }}
 *   onRowClick={(row) => { ... }}       // optional — makes rows clickable
 *   emptyMessage="No records found."    // optional
 *   isLoading={false}                   // optional — shows skeleton rows
 *   skeletonRows={5}                    // optional — number of skeleton rows
 * />
 * ```
 *
 * Props:
 * @param {Array}    columns          — Column definitions: { key, label, sortable?, align?, className? }
 * @param {Array}    data             — Array of data rows
 * @param {Function} keyExtractor     — Returns a unique key per row: (row) => string | number
 * @param {Function} renderCell       — Renders each cell: (row, column) => ReactNode
 * @param {Function} [onRowClick]     — Optional click handler per row
 * @param {string}   [emptyMessage]   — Text shown when data is empty
 * @param {boolean}  [isLoading]      — Show loading skeleton
 * @param {number}   [skeletonRows]   — Number of skeleton rows while loading
 * @param {string}   [className]      — Extra className for the container
 * @param {string}   [sortKey]        — Currently sorted column key
 * @param {'asc'|'desc'} [sortDir]   — Current sort direction
 * @param {Function} [onSort]         — Sort handler: (columnKey) => void
 */
const Table = ({
  columns = [],
  data = [],
  keyExtractor,
  renderCell,
  onRowClick,
  emptyMessage = 'No records found.',
  isLoading = false,
  skeletonRows = 5,
  className,
  sortKey,
  sortDir,
  onSort,
}) => {
  const handleRowClick = (row) => {
    if (onRowClick) onRowClick(row);
  };

  const handleSort = (col) => {
    if (col.sortable && onSort) onSort(col.key);
  };

  return (
    <div className={clsx(styles.tableContainer, className)}>
      <table className={styles.table}>
        {/* ── Head ── */}
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={clsx(
                  col.sortable && styles.th_sortable,
                  sortKey === col.key && sortDir === 'asc' && styles.th_asc,
                  sortKey === col.key && sortDir === 'desc' && styles.th_desc,
                  col.className
                )}
                style={col.align ? { textAlign: col.align } : undefined}
                onClick={() => handleSort(col)}
              >
                <span className={styles.thContent}>
                  {col.label}
                  {col.sortable && (
                    <Icon
                      icon={
                        sortKey === col.key && sortDir === 'desc'
                          ? 'mdi:arrow-down'
                          : 'mdi:arrow-up'
                      }
                      width={12}
                      className={styles.sortIcon}
                    />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        {/* ── Body ── */}
        <tbody>
          {/* Loading skeleton */}
          {isLoading &&
            Array.from({ length: skeletonRows }).map((_, i) => (
              <tr key={`skeleton-${i}`} className={styles.skeletonRow}>
                {columns.map((col) => (
                  <td key={col.key}>
                    <div className={styles.skeletonBar} />
                  </td>
                ))}
              </tr>
            ))}

          {/* Empty state */}
          {!isLoading && data.length === 0 && (
            <tr>
              <td colSpan={columns.length}>
                <div className={styles.emptyState}>
                  <Icon
                    icon="mdi:table-off"
                    width={40}
                    className={styles.emptyStateIcon}
                  />
                  <span>{emptyMessage}</span>
                </div>
              </td>
            </tr>
          )}

          {/* Data rows */}
          {!isLoading &&
            data.map((row) => (
              <tr
                key={keyExtractor ? keyExtractor(row) : row.id}
                className={clsx(onRowClick && styles.row_clickable)}
                onClick={() => handleRowClick(row)}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={col.align ? { textAlign: col.align } : undefined}
                  >
                    {renderCell ? renderCell(row, col) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export { Table };
