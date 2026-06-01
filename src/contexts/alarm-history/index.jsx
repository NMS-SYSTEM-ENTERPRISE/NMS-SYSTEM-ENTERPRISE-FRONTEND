'use client';

import { createContext, useMemo, useState } from 'react';
import { ALARM_POLICY_TABLE } from '@/utils/dummy-data/alarm-history';

export const AlarmHistoryContext = createContext(null);

export const AlarmHistoryProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPolicies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return ALARM_POLICY_TABLE;
    return ALARM_POLICY_TABLE.filter(
      (row) =>
        row.policyName.toLowerCase().includes(query) ||
        row.monitor.toLowerCase().includes(query) ||
        row.alertId.includes(query)
    );
  }, [searchQuery]);

  const value = {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filteredPolicies,
  };

  return (
    <AlarmHistoryContext.Provider value={value}>{children}</AlarmHistoryContext.Provider>
  );
};
