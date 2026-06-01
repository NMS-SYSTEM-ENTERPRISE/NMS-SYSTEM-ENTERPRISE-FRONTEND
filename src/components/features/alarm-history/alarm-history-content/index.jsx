'use client';

import { AlarmHistoryHeader } from '@/components/features/alarm-history/alarm-history-header';
import { AlarmHistoryInfoPanel } from '@/components/features/alarm-history/alarm-history-info-panel';
import { AlarmHistoryPolicyTable } from '@/components/features/alarm-history/alarm-history-policy-table';
import { AlarmHistoryTopology } from '@/components/features/alarm-history/alarm-history-topology';
import sharedStyles from '@/components/features/alarm-history/shared/styles.module.css';
import { useAlarmHistory } from '@/hooks/alarm-history';

export const AlarmHistoryContent = () => {
  const { activeTab, setActiveTab } = useAlarmHistory();

  return (
    <div className={sharedStyles.alarmHistory}>
      <AlarmHistoryHeader />

      <div className={sharedStyles.tabs}>
        <button
          type="button"
          className={`${sharedStyles.tab} ${activeTab === 'overview' ? sharedStyles.tabActive : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
      </div>

      <div className={sharedStyles.content}>
        <AlarmHistoryInfoPanel />
        <AlarmHistoryTopology />
        <AlarmHistoryPolicyTable />
      </div>
    </div>
  );
};
