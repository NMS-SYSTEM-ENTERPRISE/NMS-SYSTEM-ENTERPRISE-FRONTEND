'use client';

import { Pagination } from '@/components/ui/pagination';
import sharedStyles from '@/components/features/reports/shared/styles.module.css';
import { useReports } from '@/hooks/reports';
import { REPORTS_PAGINATION_TOTAL } from '@/utils/dummy-data/reports';
import { ReportsTableRow } from './reports-table-row';

export const ReportsTable = () => {
  const { filteredReports, currentPage, setCurrentPage, pageSize, setPageSize } = useReports();

  return (
    <div className={sharedStyles.tableContainer}>
      <div className={sharedStyles.table}>
        <div className={sharedStyles.tableHeaderRow}>
          <span />
          <span>NAME</span>
          <span>DESCRIPTION</span>
          <span>TYPE</span>
          <span>REPORT TYPE</span>
          <span>SCHEDULE</span>
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
            currentPage={currentPage}
            totalItems={REPORTS_PAGINATION_TOTAL}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>
    </div>
  );
};
