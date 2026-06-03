'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useSlo } from '@/hooks/slo';
import {
  SLO_CATEGORIES,
  SLO_STATUS_BADGE_VARIANT,
  SLO_TABLE_COLUMNS,
} from '@/utils/constants/slo';
import styles from './styles.module.css';
import { SloTableSkeleton } from '@/components/ui/skeleton-loaders/slo-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';

const getCategoryIcon = (sloType) =>
  SLO_CATEGORIES.find((c) => c.id === sloType)?.icon || 'ph:target-bold';

const isNegativeBudget = (value) => String(value).includes('-');

export const SloTableView = () => {
  const router = useRouter();
  const {
    paginatedSLOs,
    totalSLOs,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    isLoading,
    errorMessage,
  } = useSlo();

  const handleRowClick = (slo) => {
    router.push(`/slo/${slo.id}`);
  };

  const renderCell = (slo, column) => {
    switch (column.key) {
      case 'definition':
        return (
          <div className={styles.rowIdentity}>
            <div className={styles.rowIcon}>
              <Icon icon={getCategoryIcon(slo.sloType)} width={16} />
            </div>
            <div className={styles.rowInfo}>
              <span className={styles.rowName}>{slo.name}</span>
              <span className={styles.rowSub}>
                <Icon icon="ph:clock-bold" width={10} /> {slo.frequency}
              </span>
            </div>
          </div>
        );
      case 'status':
        return (
          <Badge variant={SLO_STATUS_BADGE_VARIANT[slo.status] || 'neutral'}>
            {slo.status}
          </Badge>
        );
      case 'objective':
        return (
          <div className={styles.metricSlot}>
            <span className={styles.metricValue}>{slo.target}</span>
            <span className={styles.metricLabel}>Target</span>
          </div>
        );
      case 'actual':
        return (
          <div className={styles.metricSlot}>
            <span className={styles.metricValue}>{slo.achieved}</span>
            <span className={styles.metricLabel}>Success</span>
          </div>
        );
      case 'errorBudget':
        return (
          <div className={styles.metricSlot}>
            <span
              className={`${styles.metricValue} ${isNegativeBudget(slo.errorBudgetLeft)
                  ? styles.metricValueNegative
                  : styles.metricValuePositive
                }`}
            >
              {slo.errorBudgetLeft}
            </span>
            <span className={styles.metricLabel}>Remaining</span>
          </div>
        );
      case 'actions':
        return (
          <Button variant="ghost" size="icon" className={styles.actionBtnRow} aria-label="View details">
            <Icon icon="ph:caret-right-bold" />
          </Button>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return <div className={styles.listContainer}><SloTableSkeleton /></div>;
  }

  if (errorMessage || paginatedSLOs.length === 0) {
    return (
      <div className={styles.listContainer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <NoDataFound
          title="No SLOs Found"
          description={errorMessage || "No Service Level Objectives match your current filters."}
          icon="mdi:target-variant"
        />
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      <Table
        columns={SLO_TABLE_COLUMNS}
        data={paginatedSLOs}
        keyExtractor={(row) => row.id}
        renderCell={renderCell}
        onRowClick={handleRowClick}
        className={styles.table}
      />
      <Pagination
        className={styles.pagination}
        currentPage={currentPage}
        totalItems={totalSLOs}
        pageSize={itemsPerPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={setItemsPerPage}
        pageSizeOptions={[50, 100]}
      />
    </div>
  );
};
