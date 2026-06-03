'use client';

import { Pagination } from '@/components/ui/pagination';
import sharedStyles from '@/components/features/reports/shared/styles.module.css';
import { useReports } from '@/hooks/reports';
import { ReportsTableRow } from './reports-table-row';
import { ReportsTableSkeleton } from '@/components/ui/skeleton-loaders/reports-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';

export const ReportsTable = () => {
  const { filteredReports, currentPage, setCurrentPage, pageSize, setPageSize, loading, error } = useReports();

  if (loading) {
    return (
      <div className={sharedStyles.tableContainer}>
        <ReportsTableSkeleton />
      </div>
    );
  }

  if (error || filteredReports.length === 0) {
    return (
      <div className={sharedStyles.tableContainer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <NoDataFound 
          title="No Reports Found" 
          description={error ? "Unable to load reports from the database." : "No reports match your current filters or search query."}
          icon="mdi:file-document-remove-outline"
        />
      </div>
    );
  }

  return (
    <div className={sharedStyles.tableContainer}>
      <div className={sharedStyles.table}>
        <div className={sharedStyles.tableHeaderRow}>
          <span />
          <span>NAME</span>
          <span>DESCRIPTION</span>
          <span>TYPE</span>
          <span>REPORT TYPE</span>
          <span>DOWNLOAD</span>
          <span />
        </div>

        <div className={sharedStyles.tableBody}>
          {filteredReports.map((report) => (
            <ReportsTableRow key={report.id} report={report} />
          ))}
        </div>

        <div className={sharedStyles.pagination}>
          <Pagination
            className={sharedStyles.paginationComponent}
            currentPage={currentPage}
            totalItems={filteredReports.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>
    </div>
  );
};
