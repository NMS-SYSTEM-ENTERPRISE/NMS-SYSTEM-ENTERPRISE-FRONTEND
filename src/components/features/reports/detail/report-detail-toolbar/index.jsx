'use client';

import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/reports/detail/shared/styles.module.css';
import { useReportsDetail } from '@/hooks/reports-detail';

export const ReportDetailToolbar = () => {
  const { searchQuery, setSearchQuery, filteredData } = useReportsDetail();

  return (
    <div className={sharedStyles.toolbar}>
      <div className={sharedStyles.toolbarLeft}>
        <span className={sharedStyles.resultCount}>
          {filteredData.length} {filteredData.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>
      <div className={sharedStyles.toolbarRight}>
        <Input
          type="text"
          placeholder="Search..."
          containerClassName={sharedStyles.searchBar}
          className={sharedStyles.searchField}
          icon={<Icon icon="mdi:magnify" width={16} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};
