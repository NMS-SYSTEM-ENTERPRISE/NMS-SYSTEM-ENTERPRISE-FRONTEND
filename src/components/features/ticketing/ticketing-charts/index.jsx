'use client';

import { useMemo } from 'react';
import { TicketingChart } from '@/components/features/ticketing/ticketing-chart';
import sharedStyles from '@/components/features/ticketing/shared/styles.module.css';
import {
  buildStatusPieOption,
  buildTechWorkloadOption,
  useTicketingChartOptions,
} from '@/hooks/ticketing/useTicketingChartOptions';
import { TICKETING_LEGEND_DOT_CLASS } from '@/utils/constants/ticketing';
import { useTicketing } from '@/hooks/ticketing';
import { NoDataFound } from '@/components/ui/no-data-found';

export const TicketingCharts = () => {
  const { resolveColor } = useTicketingChartOptions();
  const { filteredRequests } = useTicketing();

  const pieData = useMemo(() => {
    const counts = { open: 0, progress: 0, resolved: 0, closed: 0 };
    (filteredRequests || []).forEach(t => {
      if (t.status === 'Open') counts.open++;
      else if (t.status === 'In Progress') counts.progress++;
      else if (t.status === 'Resolved') counts.resolved++;
      else if (t.status === 'Closed') counts.closed++;
    });
    return [
      { name: 'Open', value: counts.open, colorToken: 'violet' },
      { name: 'In Progress', value: counts.progress, colorToken: 'orange' },
      { name: 'Resolved', value: counts.resolved, colorToken: 'green' },
      { name: 'Closed', value: counts.closed, colorToken: 'gray' },
    ];
  }, [filteredRequests]);

  const workloadData = useMemo(() => {
    const workloads = {};
    (filteredRequests || []).forEach(t => {
      const a = t.assignee || 'Unassigned';
      workloads[a] = (workloads[a] || 0) + 1;
    });
    
    const entries = Object.entries(workloads);
    return {
      categories: entries.map(([name]) => name),
      values: entries.map(([_, count]) => count),
    };
  }, [filteredRequests]);

  const pieOption = useMemo(
    () => buildStatusPieOption(pieData, resolveColor),
    [pieData, resolveColor]
  );

  const barOption = useMemo(
    () => buildTechWorkloadOption(workloadData, resolveColor),
    [workloadData, resolveColor]
  );

  return (
    <div className={sharedStyles.distributionGrid}>
      <div className={sharedStyles.distributionCard}>
        <span className={sharedStyles.subHeader}>TICKET DISTRIBUTION</span>
        <div className={sharedStyles.chartFlex}>
          {pieData.reduce((acc, curr) => acc + curr.value, 0) === 0 ? (
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <NoDataFound title="No Data Found" description="No distribution data available." icon="mdi:chart-pie" />
            </div>
          ) : (
            <>
              <TicketingChart option={pieOption} size="pie" />
              <div className={sharedStyles.legendList}>
                {pieData.map((row) => (
                  <div key={row.name} className={sharedStyles.legendRow}>
                    <span
                      className={`${sharedStyles.legendDot} ${sharedStyles[TICKETING_LEGEND_DOT_CLASS[row.colorToken]]}`}
                    />
                    {row.name}
                    <span className={sharedStyles.legendCount}>{row.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className={sharedStyles.distributionCard}>
        <span className={sharedStyles.subHeader}>TECHNICIAN WORKLOAD</span>
        <div className={sharedStyles.horizontalBarWrap}>
          {workloadData.categories.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <NoDataFound title="No Data Found" description="No workload data available." icon="mdi:account-off" />
            </div>
          ) : (
            <TicketingChart option={barOption} size="bar" />
          )}
        </div>
      </div>
    </div>
  );
};
