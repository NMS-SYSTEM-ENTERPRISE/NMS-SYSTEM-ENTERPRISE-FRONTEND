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
    handleDownload,
    activeTab,
  } = useReports();

  const isExpanded = expandedRows.has(report.id);
  const isPopupOpen = activePopup === report.id;

  const handleViewReport = () => {
    router.push(`/reports/detail/${report.id}`);
  };

  const isCompliance = activeTab === 'Log Compliance';

  return (
    <div className={sharedStyles.accordionRow}>
      <div
        className={sharedStyles.rowMain}
        style={isCompliance ? { gridTemplateColumns: '40px 2fr 2fr 1.2fr 1fr 0.8fr 60px' } : undefined}
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
        {isCompliance ? (
          <span style={{ fontFamily: 'var(--font-geist-mono), monospace', color: 'var(--color-accent-cyan)', fontSize: '12px' }}>
            {report.complianceRef}
          </span>
        ) : (
          <span>{report.type}</span>
        )}
        <span>{report.reportType}</span>
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
              </div>
            </>
          )}
        </div>
      </div>

      {isExpanded && <ReportsRowDetails report={report} />}
    </div>
  );
};
