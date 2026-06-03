'use client';

import { createContext, useMemo, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getReportDetail } from '@/networking/network-monitoring/network-monitoring-apis';

export const ReportsDetailContext = createContext(null);

export const ReportsDetailProvider = ({ children }) => {
  const { reportId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!reportId) return;
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getReportDetail(reportId);
        setReport(data);
      } catch (err) {
        console.error('Failed to fetch report detail:', err);
        setError('Failed to load report detail');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [reportId]);

  const filteredData = useMemo(
    () => {
      if (!report || !report.data) return [];
      return report.data.filter(
        (row) =>
          row.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.ip?.includes(searchQuery)
      );
    },
    [report, searchQuery]
  );

  const value = {
    report,
    searchQuery,
    setSearchQuery,
    filteredData,
    reportId,
    loading,
    error,
  };

  return (
    <ReportsDetailContext.Provider value={value}>{children}</ReportsDetailContext.Provider>
  );
};
