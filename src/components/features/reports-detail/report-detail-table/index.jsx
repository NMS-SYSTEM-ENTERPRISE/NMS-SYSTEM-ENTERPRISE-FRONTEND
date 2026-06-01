'use client';

import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/reports-detail/shared/styles.module.css';
import { useReportsDetail } from '@/hooks/reports-detail';
import {
  DEFAULT_MONITOR_TYPE_ICON,
  isForecastReport,
  MONITOR_TYPE_ICONS,
} from '@/utils/constants/reports-detail';

const MonitorTypeIcon = ({ type }) => {
  const icon = MONITOR_TYPE_ICONS[type] || DEFAULT_MONITOR_TYPE_ICON;
  return <Icon icon={icon} width={18} />;
};

export const ReportDetailTable = () => {
  const { report, filteredData } = useReportsDetail();
  const forecastMode = isForecastReport(report.title);

  return (
    <div className={sharedStyles.tableContainer}>
      <table className={sharedStyles.table}>
        <thead>
          <tr>
            <th>MONITOR NAME</th>
            <th>MONITOR IP</th>
            <th>TYPE</th>
            {forecastMode ? (
              <>
                <th>FORECAST (≥80%)</th>
                <th>FORECAST (≥90%)</th>
                <th>FORECAST (100%)</th>
              </>
            ) : (
              <>
                <th>CPU UTILIZATION</th>
                <th>MEMORY UTILIZATION</th>
                <th>DISK UTILIZATION</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr
              key={row.id}
              className={row.highlight ? sharedStyles.highlightRow : ''}
            >
              <td className={sharedStyles.nameCell}>{row.name}</td>
              <td className={sharedStyles.ipCell}>{row.ip}</td>
              <td className={sharedStyles.typeCell}>
                <span className={sharedStyles.typeIcon}>
                  <MonitorTypeIcon type={row.type} />
                </span>
              </td>
              {forecastMode ? (
                <>
                  <td>{row.forecast80}</td>
                  <td>{row.forecast90}</td>
                  <td>{row.forecast100}</td>
                </>
              ) : (
                <>
                  <td>{row.cpu}</td>
                  <td>{row.memory}</td>
                  <td>{row.disk}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
