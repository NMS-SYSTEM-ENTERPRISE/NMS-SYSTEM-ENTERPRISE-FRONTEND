'use client';

import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/reports/shared/styles.module.css';
import { getReportRowMetadata } from '@/utils/dummy-data/reports';

export const ReportsRowDetails = ({ report }) => {
  const meta = getReportRowMetadata(report.id, report.schedule);

  return (
    <div className={sharedStyles.rowDetails}>
      <div className={sharedStyles.detailsContainer}>
        <div className={sharedStyles.infoSection}>
          <div className={sharedStyles.infoRow}>
            <span className={sharedStyles.infoLabel}>
              <Icon
                icon="mdi:identifier"
                width={14}
                className={`${sharedStyles.labelIcon} ${sharedStyles.labelIconCyan}`}
              />
              Report ID
            </span>
            <span className={sharedStyles.infoCapsule}>{meta.reportId}</span>
          </div>
          <div className={sharedStyles.infoRow}>
            <span className={sharedStyles.infoLabel}>
              <Icon
                icon="mdi:calendar-plus"
                width={14}
                className={`${sharedStyles.labelIcon} ${sharedStyles.labelIconViolet}`}
              />
              Created
            </span>
            <span className={sharedStyles.infoCapsule}>{meta.created}</span>
          </div>
          <div className={sharedStyles.infoRow}>
            <span className={sharedStyles.infoLabel}>
              <Icon
                icon="mdi:calendar-edit"
                width={14}
                className={`${sharedStyles.labelIcon} ${sharedStyles.labelIconAmber}`}
              />
              Last Modified
            </span>
            <span className={sharedStyles.infoCapsule}>{meta.lastModified}</span>
          </div>
          <div className={sharedStyles.infoRow}>
            <span className={sharedStyles.infoLabel}>
              <Icon
                icon="mdi:account"
                width={14}
                className={`${sharedStyles.labelIcon} ${sharedStyles.labelIconGreen}`}
              />
              Owner
            </span>
            <span className={sharedStyles.infoCapsule}>{meta.owner}</span>
          </div>
        </div>

        <div className={sharedStyles.infoSection}>
          <div className={sharedStyles.infoRow}>
            <span className={sharedStyles.infoLabel}>
              <Icon
                icon="mdi:clock-outline"
                width={14}
                className={`${sharedStyles.labelIcon} ${sharedStyles.labelIconCyan}`}
              />
              Frequency
            </span>
            <span
              className={`${sharedStyles.infoCapsule} ${
                report.schedule ? sharedStyles.capsuleActive : sharedStyles.capsuleInactive
              }`}
            >
              {meta.frequency}
            </span>
          </div>
          <div className={sharedStyles.infoRow}>
            <span className={sharedStyles.infoLabel}>
              <Icon
                icon="mdi:calendar-clock"
                width={14}
                className={`${sharedStyles.labelIcon} ${sharedStyles.labelIconViolet}`}
              />
              Next Run
            </span>
            <span className={sharedStyles.infoCapsule}>{meta.nextRun}</span>
          </div>
          <div className={sharedStyles.infoRow}>
            <span className={sharedStyles.infoLabel}>
              <Icon
                icon="mdi:account-multiple"
                width={14}
                className={`${sharedStyles.labelIcon} ${sharedStyles.labelIconAmber}`}
              />
              Recipients
            </span>
            <span className={sharedStyles.infoCapsule}>{meta.recipients}</span>
          </div>
          <div className={sharedStyles.infoRow}>
            <span className={sharedStyles.infoLabel}>
              <Icon
                icon="mdi:file-document"
                width={14}
                className={`${sharedStyles.labelIcon} ${sharedStyles.labelIconGreen}`}
              />
              Format
            </span>
            <span className={sharedStyles.infoCapsule}>{meta.format}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
