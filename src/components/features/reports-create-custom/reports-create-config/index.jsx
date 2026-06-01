'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import sharedStyles from '@/components/features/reports-create-custom/shared/styles.module.css';
import { useReportsCreateCustom } from '@/hooks/reports-create-custom';
import {
  DEVICE_OPTIONS,
  GROUP_OPTIONS,
  METRIC_OPTIONS,
  OUTPUT_FORMAT_OPTIONS,
  TIME_RANGE_OPTIONS,
} from '@/utils/constants/reports-create-custom';

export const ReportsCreateConfig = () => {
  const router = useRouter();
  const { selectedReportType, reportConfig, updateReportConfig } = useReportsCreateCustom();

  const handleSaveReport = () => {
    console.log('Saving report:', { type: selectedReportType, config: reportConfig });
    router.push('/reports');
  };

  if (!selectedReportType) {
    return (
      <div className={sharedStyles.rightPanel}>
        <div className={sharedStyles.emptyState}>
          <Icon icon="mdi:file-document-outline" width={64} />
          <h3>Select a Report Type</h3>
          <p>Choose a report type from the left panel to begin configuration</p>
        </div>
      </div>
    );
  }

  return (
    <div className={sharedStyles.rightPanel}>
      <div className={sharedStyles.configHeader}>
        <div className={sharedStyles.configHeaderLeft}>
          <Icon icon={selectedReportType.icon} width={24} />
          <div>
            <h2>{selectedReportType.name} Report</h2>
            <p>{selectedReportType.description}</p>
          </div>
        </div>
      </div>

      <div className={sharedStyles.configContent}>
        <div className={sharedStyles.configSection}>
          <div className={sharedStyles.sectionHeader}>
            <Icon icon="mdi:information" width={16} />
            <span>Basic Information</span>
          </div>
          <div className={sharedStyles.sectionContent}>
            <div className={sharedStyles.formGroup}>
              <label htmlFor="report-name">Report Name *</label>
              <Input
                id="report-name"
                value={reportConfig.name}
                onChange={(e) => updateReportConfig({ name: e.target.value })}
                placeholder="Enter report name"
              />
            </div>
            <div className={sharedStyles.formGroup}>
              <label htmlFor="report-description">Description</label>
              <textarea
                id="report-description"
                className={sharedStyles.textarea}
                value={reportConfig.description}
                onChange={(e) => updateReportConfig({ description: e.target.value })}
                placeholder="Enter description"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className={sharedStyles.configSection}>
          <div className={sharedStyles.sectionHeader}>
            <Icon icon="mdi:database" width={16} />
            <span>Data Selection</span>
          </div>
          <div className={sharedStyles.sectionContent}>
            <div className={sharedStyles.formGroup}>
              <label>Time Range *</label>
              <SelectComponent
                value={reportConfig.timeRange}
                onChange={(e) => updateReportConfig({ timeRange: e.target.value })}
                options={TIME_RANGE_OPTIONS}
                placeholder="Select time range"
              />
            </div>
            <div className={sharedStyles.formGroup}>
              <label>Devices/Monitors</label>
              <SelectComponent
                isMulti
                value={reportConfig.devices}
                onChange={(e) => updateReportConfig({ devices: e.target.value || [] })}
                options={DEVICE_OPTIONS}
                placeholder="Select devices"
              />
            </div>
            <div className={sharedStyles.formGroup}>
              <label>Groups</label>
              <SelectComponent
                isMulti
                value={reportConfig.groups}
                onChange={(e) => updateReportConfig({ groups: e.target.value || [] })}
                options={GROUP_OPTIONS}
                placeholder="Select groups"
              />
            </div>
            <div className={sharedStyles.formGroup}>
              <label>Metrics</label>
              <SelectComponent
                isMulti
                value={reportConfig.metrics}
                onChange={(e) => updateReportConfig({ metrics: e.target.value || [] })}
                options={METRIC_OPTIONS}
                placeholder="Select metrics"
              />
            </div>
          </div>
        </div>

        <div className={sharedStyles.configSection}>
          <div className={sharedStyles.sectionHeader}>
            <Icon icon="mdi:file-export" width={16} />
            <span>Output Configuration</span>
          </div>
          <div className={sharedStyles.sectionContent}>
            <div className={sharedStyles.formGroup}>
              <label>Output Format</label>
              <SelectComponent
                value={reportConfig.format}
                onChange={(e) => updateReportConfig({ format: e.target.value })}
                options={OUTPUT_FORMAT_OPTIONS}
                placeholder="Select format"
              />
            </div>
            <div className={sharedStyles.formGroup}>
              <Checkbox
                checked={reportConfig.schedule}
                onChange={(e) => updateReportConfig({ schedule: e.target.checked })}
                label="Schedule Report"
                className={sharedStyles.checkboxLabel}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={sharedStyles.configFooter}>
        <Button onClick={() => router.push('/reports')} variant="secondary">
          Cancel
        </Button>
        <Button onClick={handleSaveReport}>
          <Icon icon="mdi:check" width={18} />
          Create Report
        </Button>
      </div>
    </div>
  );
};
