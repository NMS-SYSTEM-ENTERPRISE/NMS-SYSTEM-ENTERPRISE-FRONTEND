'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import sharedStyles from '@/components/features/reports/shared/styles.module.css';
import { useReports } from '@/hooks/reports';
import { ReportsRowDetails } from './reports-row-details';

export const ReportsTableRow = ({ report }) => {
  const router = useRouter();
  const {
    expandedRows,
    toggleRow,
    activePopup,
    setActivePopup,
    handleToggleFavorite,
    handleToggleSchedule,
    handleDownload,
  } = useReports();

  const isExpanded = expandedRows.has(report.id);
  const isPopupOpen = activePopup === report.id;

  const handleViewReport = () => {
    router.push(`/reports/detail/${report.id}`);
  };

  return (
    <div className={sharedStyles.accordionRow}>
      <div
        className={sharedStyles.rowMain}
        onClick={() => toggleRow(report.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleRow(report.id);
          }
        }}
        role="button"
        tabIndex={0}
      >
        <Icon
          icon="mdi:chevron-down"
          width={20}
          className={`${sharedStyles.chevron} ${isExpanded ? sharedStyles.chevronExpanded : ''}`}
        />
        <div className={sharedStyles.nameCell}>
          <button
            type="button"
            className={`${sharedStyles.starBtn} ${report.favorite ? sharedStyles.starBtnActive : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleFavorite(report.id);
            }}
          >
            <Icon icon="mdi:star" width={14} height={14} />
          </button>
          <button
            type="button"
            className={sharedStyles.reportName}
            onClick={(e) => {
              e.stopPropagation();
              handleViewReport();
            }}
          >
            {report.name}
          </button>
        </div>
        <div className={sharedStyles.descriptionCell}>
          {report.description && (
            <>
              <span className={sharedStyles.descIcon}>📄</span>
              {report.description}
            </>
          )}
        </div>
        <span>{report.type}</span>
        <span>{report.reportType}</span>
        <button
          type="button"
          className={`${sharedStyles.scheduleToggle} ${
            report.schedule ? sharedStyles.scheduleToggleOn : ''
          }`}
          onClick={(e) => {
            e.stopPropagation();
            handleToggleSchedule(report.id);
          }}
        >
          <span className={sharedStyles.toggleCircle} />
          <span className={sharedStyles.toggleLabel}>{report.schedule ? 'ON' : 'OFF'}</span>
        </button>
        <Button
          variant="ghost"
          size="icon"
          className={sharedStyles.downloadBtn}
          onClick={(e) => {
            e.stopPropagation();
            handleDownload(report.id);
          }}
        >
          <Icon icon="mdi:download" width={16} height={16} />
        </Button>
        <div className={sharedStyles.popupWrapper}>
          <Button
            variant="ghost"
            size="icon"
            className={sharedStyles.actionBtn}
            onClick={(e) => {
              e.stopPropagation();
              setActivePopup(isPopupOpen ? null : report.id);
            }}
          >
            ⋮
          </Button>

          {isPopupOpen && (
            <>
              <div
                className={sharedStyles.popupBackdrop}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePopup(null);
                }}
                role="presentation"
              />
              <div className={sharedStyles.popupMenu}>
                <button
                  type="button"
                  className={sharedStyles.popupItem}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewReport();
                    setActivePopup(null);
                  }}
                >
                  <Icon icon="mdi:eye" width={16} />
                  <span>View Report</span>
                </button>
                <button
                  type="button"
                  className={sharedStyles.popupItem}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Edit schedule:', report.id);
                    setActivePopup(null);
                  }}
                >
                  <Icon icon="mdi:calendar-edit" width={16} />
                  <span>Edit Schedule</span>
                </button>
                <button
                  type="button"
                  className={sharedStyles.popupItem}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Duplicate:', report.id);
                    setActivePopup(null);
                  }}
                >
                  <Icon icon="mdi:content-copy" width={16} />
                  <span>Duplicate</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {isExpanded && <ReportsRowDetails report={report} />}
    </div>
  );
};
