'use client';

import { createContext, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { DEFAULT_REPORT_DETAIL, MOCK_REPORT_DATA } from '@/utils/dummy-data/reports-detail';

export const ReportsDetailContext = createContext(null);

export const ReportsDetailProvider = ({ children }) => {
  const { reportId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

  const report = useMemo(
    () => MOCK_REPORT_DATA[reportId] || DEFAULT_REPORT_DETAIL,
    [reportId]
  );

  const filteredData = useMemo(
    () =>
      report.data.filter(
        (row) =>
          row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.ip.includes(searchQuery)
      ),
    [report.data, searchQuery]
  );

  const value = {
    report,
    searchQuery,
    setSearchQuery,
    filteredData,
    reportId,
  };

  return (
    <ReportsDetailContext.Provider value={value}>{children}</ReportsDetailContext.Provider>
  );
};
