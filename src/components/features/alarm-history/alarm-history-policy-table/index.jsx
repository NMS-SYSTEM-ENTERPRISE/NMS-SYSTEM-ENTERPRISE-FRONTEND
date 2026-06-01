'use client';

import { Input } from '@/components/ui/input';
import sharedStyles from '@/components/features/alarm-history/shared/styles.module.css';
import { useAlarmHistory } from '@/hooks/alarm-history';

export const AlarmHistoryPolicyTable = () => {
  const { searchQuery, setSearchQuery, filteredPolicies } = useAlarmHistory();

  return (
    <>
      <div className={sharedStyles.rightPanel}>
        <div className={sharedStyles.searchBox}>
          <Input
            type="text"
            placeholder="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon="mdi:magnify"
            className={sharedStyles.searchField}
          />
        </div>
      </div>

      <div className={sharedStyles.tableSection}>
        <table className={sharedStyles.table}>
          <thead>
            <tr>
              <th>Policy Name</th>
              <th>Alert ID</th>
              <th>Type</th>
              <th>Monitor</th>
              <th>First Triggered at</th>
            </tr>
          </thead>
          <tbody>
            {filteredPolicies.map((item) => (
              <tr key={`${item.monitor}-${item.firstTriggeredAt}`}>
                <td>
                  <span className={sharedStyles.policyName}>{item.policyName}</span>
                </td>
                <td>{item.alertId}</td>
                <td>
                  <span className={sharedStyles.typeTag}>{item.type}</span>
                </td>
                <td>{item.monitor}</td>
                <td>{item.firstTriggeredAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
