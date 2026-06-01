'use client';

import clsx from 'clsx';
import sharedStyles from '@/components/features/dashboard-custom/shared/styles.module.css';
import { useDashboardCustomWidgetPreview } from '@/hooks/dashboard-custom';
import { SEVERITY_BADGE_CLASS } from '@/utils/constants/dashboard-custom';
import { PREVIEW_TABLE_ROWS } from '@/utils/dummy-data/dashboard-custom';

export const DashboardCustomWidgetPreview = ({ activeTab, widgetForm }) => {
  const { chartRef, isTablePreview } = useDashboardCustomWidgetPreview(activeTab, widgetForm);

  if (isTablePreview) {
    return (
      <div className={sharedStyles.previewTableContainer}>
        <table className={sharedStyles.previewTable}>
          <thead>
            <tr>
              <th>Severity</th>
              <th>Time</th>
              <th>Source</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {PREVIEW_TABLE_ROWS.map((row) => (
              <tr key={row.id}>
                <td>
                  <span
                    className={clsx(
                      sharedStyles.statusBadge,
                      sharedStyles[SEVERITY_BADGE_CLASS[row.severity]]
                    )}
                  >
                    {row.severity}
                  </span>
                </td>
                <td>{row.time}</td>
                <td>{row.source}</td>
                <td>{row.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <div ref={chartRef} className={sharedStyles.chartFill} />;
};
