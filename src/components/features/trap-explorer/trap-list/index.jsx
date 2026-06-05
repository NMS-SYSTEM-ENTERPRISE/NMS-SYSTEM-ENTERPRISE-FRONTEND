'use client';

import { Pagination } from '@/components/ui/pagination';
import { useTrapExplorer } from '@/hooks/trap-explorer';
import { TrapListRow } from './trap-list-row';
import styles from './styles.module.css';
import { TrapListSkeleton } from '@/components/ui/skeleton-loaders/trap-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';

export const TrapList = () => {
  const {
    paginatedTraps,
    totalTraps,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    expandedTrapIds,
    toggleTrapExpanded,
    setSelectedTrapForHistory,
    isLoading,
  } = useTrapExplorer();

  if (isLoading) {
    return <TrapListSkeleton />;
  }

  if (paginatedTraps.length === 0) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <NoDataFound
          title="No Traps Found"
          description="No SNMP traps match your current filters or search query."
          icon="mdi:inbox-remove-outline"
        />
      </div>
    );
  }

  return (
    /* listContainer is flex-column: header (fixed) → listBody (scrolls) → pagination (fixed) */
    <div className={styles.listContainer}>
      {/* Column headers — fixed, never scroll */}
      <div className={styles.tableHeaderRow}>
        <span>Identity &amp; Trap OID</span>
        <span>Source Node</span>
        <span>Count</span>
        <span>Timestamp</span>
        <span>Status</span>
        <span />
      </div>

      {/* Scrollable rows */}
      <div className={styles.listBody}>
        {paginatedTraps.map((trap) => (
          <TrapListRow
            key={trap.id}
            trap={trap}
            isExpanded={expandedTrapIds.has(trap.id)}
            onToggle={() => toggleTrapExpanded(trap.id)}
            onViewHistory={setSelectedTrapForHistory}
          />
        ))}
      </div>

      {/* Pagination — pinned to bottom of the card */}
      <Pagination
        className={styles.pagination}
        currentPage={currentPage}
        totalItems={totalTraps}
        pageSize={itemsPerPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={setItemsPerPage}
        pageSizeOptions={[50, 100]}
      />
    </div>
  );
};
