'use client';

import { Pagination } from '@/components/ui/pagination';
import sharedStyles from '@/components/features/reports/shared/styles.module.css';
import { useReports } from '@/hooks/reports';
import { ReportsTableRow } from './reports-table-row';

export const ReportsTable = () => {
  const { filteredReports, currentPage, setCurrentPage, pageSize, setPageSize, loading, error } = useReports();

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
          {loading ? (
            <div style={{ padding: '24px', textAlign: 'center', width: '100%' }}>Loading reports...</div>
          ) : error ? (
            <div style={{ padding: '24px', textAlign: 'center', width: '100%', color: 'red' }}>Error loading reports.</div>
          ) : filteredReports.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', width: '100%' }}>No reports found.</div>
          ) : (
            filteredReports.map((report) => (
              <ReportsTableRow key={report.id} report={report} />
            ))
          )}
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
