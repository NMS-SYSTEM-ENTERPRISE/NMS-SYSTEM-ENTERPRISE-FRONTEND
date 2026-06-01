'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Pagination } from '@/components/ui/pagination';
import { useTrapExplorer } from '@/hooks/trap-explorer';
import { TrapListRow } from './trap-list-row';
import styles from './styles.module.css';

export const TrapList = () => {
  const {
    paginatedTraps,
    totalTraps,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    expandedTrapIds,
    selectedTrapIds,
    toggleTrapExpanded,
    toggleTrapSelected,
    toggleSelectAllTraps,
    setSelectedTrapForHistory,
  } = useTrapExplorer();

  const allSelected =
    paginatedTraps.length > 0 && selectedTrapIds.length === paginatedTraps.length;

  return (
    <div className={styles.listContainer}>
      <div className={styles.tableHeaderRow}>
        <div className={styles.headerSelect}>
          <Checkbox
            checked={allSelected}
            onChange={(e) => toggleSelectAllTraps(e.target.checked)}
          />
        </div>
        <span>Identity & Trap OID</span>
        <span>Source Node</span>
        <span>Stats</span>
        <span>Timestamp</span>
        <span>Status</span>
        <span />
      </div>

      <div className={styles.listBody}>
        {paginatedTraps.map((trap) => (
          <TrapListRow
            key={trap.id}
            trap={trap}
            isExpanded={expandedTrapIds.has(trap.id)}
            onToggle={() => toggleTrapExpanded(trap.id)}
            isSelected={selectedTrapIds.includes(trap.id)}
            onSelect={toggleTrapSelected}
            onViewHistory={setSelectedTrapForHistory}
          />
        ))}
      </div>

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
