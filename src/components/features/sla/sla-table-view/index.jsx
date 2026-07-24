'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { Icon } from '@iconify/react';
import { useSla } from '@/hooks/sla';
import {
  SLA_CATEGORIES,
  SLA_STATUS_BADGE_VARIANT,
  SLA_TABLE_COLUMNS,
} from '@/utils/constants/sla';
import styles from './styles.module.css';
import { SlaTableSkeleton } from '@/components/ui/skeleton-loaders/sla-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';

const getCategoryIcon = (slaType) =>
  SLA_CATEGORIES.find((c) => c.id === slaType)?.icon || 'ph:target-bold';

const isNegativeBudget = (value) => String(value).includes('-');

export const SlaTableView = () => {
  const {
    paginatedSLAs,
    totalSLAs,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    isLoading,
    errorMessage,
  } = useSla();

  const getSlaStatus = (percentageStr) => {
    if (!percentageStr) return { label: 'UNKNOWN', variant: 'neutral' };
    const val = parseFloat(String(percentageStr).replace('%', ''));
    if (isNaN(val)) return { label: 'UNKNOWN', variant: 'neutral' };

    if (val >= 99) return { label: 'OK', variant: 'success' };
    if (val >= 95) return { label: 'WARNING', variant: 'warning' };
    return { label: 'BREACHED', variant: 'danger' };
  };

  const renderCell = (sla, column) => {
    switch (column.key) {
      case 'device':
        return (
          <div className={styles.rowIdentity}>
            <div className={styles.rowIcon}>
              <Icon icon="mdi:server-network" width={16} />
            </div>
            <div className={styles.rowInfo}>
              <span className={styles.rowName} title={sla.ip_address}>
                {sla.hostname || sla.ip_address || 'Unknown'}
              </span>
              <span className={styles.rowSub}>
                {sla.group} • {sla.device_type}
              </span>
            </div>
          </div>
        );
      case 'status': {
        const status = getSlaStatus(sla.sla_percentage);
        return (
          <div className={styles.metricSlat}>
            <span className={`${styles.metricValue} ${styles[`metricValue${status.label}`] || ''}`}>
              {sla.sla_percentage}
            </span>
            <Badge variant={status.variant} style={{ fontSize: '9px', padding: '0px 6px', height: '18px' }}>
              {status.label}
            </Badge>
          </div>
        );
      }
      case 'availability': {
        const availStatus = getSlaStatus(sla.availability_achieved);
        return (
          <div className={styles.metricSlat}>
            <span className={`${styles.metricValue} ${styles[`metricValue${availStatus.label}`] || ''}`}>
              {sla.availability_achieved || 'N/A'}
            </span>
            <span className={styles.metricLabel}>Achieved</span>
          </div>
        );
      }
      case 'performance': {
        const perfStatus = getSlaStatus(sla.performance_achieved);
        return (
          <div className={styles.metricSlat}>
            <span className={`${styles.metricValue} ${styles[`metricValue${perfStatus.label}`] || ''}`}>
              {sla.performance_achieved || 'N/A'}
            </span>
            <span className={styles.metricLabel}>Achieved</span>
          </div>
        );
      }
      case 'tickets': {
        const hasTickets = parseInt(sla.open_tickets, 10) > 0;
        return (
          <div className={styles.metricSlat}>
            <span className={`${styles.metricValue} ${hasTickets ? styles.metricValueWARNING : styles.metricValueOK}`}>
              {sla.open_tickets || 0}
            </span>
            <span className={styles.metricLabel}>Open / {sla.total_tickets || 0} Total</span>
          </div>
        );
      }

      default:
        return null;
    }
  };

  if (isLoading) {
    return <div className={styles.listContainer}><SlaTableSkeleton /></div>;
  }

  if (errorMessage || paginatedSLAs.length === 0) {
    return (
      <div className={styles.listContainer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%', minHeight: '400px', padding: '0' }}>
        <NoDataFound
          title="No SLAs Found"
          description={errorMessage || "No SLA reports match your current filters."}
          icon="mdi:target-variant"
        />
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      <div className={styles.tableWrapper}>
        <Table
          columns={SLA_TABLE_COLUMNS.filter(c => c.key !== 'actions')}
          data={paginatedSLAs}
          keyExtractor={(row, idx) => row.device_id || row.id || idx}
          renderCell={renderCell}
          className={styles.table}
        />
      </div>
      <Pagination
        className={styles.pagination}
        currentPage={currentPage}
        totalItems={totalSLAs}
        pageSize={itemsPerPage}
        onPageChange={setCurrentPage}
        onPageSizeChange={setItemsPerPage}
        pageSizeOptions={[50, 100]}
      />
    </div>
  );
};
