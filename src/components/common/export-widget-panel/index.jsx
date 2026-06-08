'use client';

import faviconPath from '@/assets/images/snr-edatas-favicon.png';
import logoPath from '@/assets/images/snr-logo-xl.svg';
import { useExport } from '@/contexts/export';
import {
  downloadCsvExport,
  downloadPdfExport,
  downloadPngExport,
  downloadXlsxExport,
} from '@/utils/data-export';
import {
  DEFAULT_EXPORT_FORMAT,
  DEFAULT_WIDGET_LIST,
  EXPORT_FORMATS,
} from '@/utils/data-export/constants';
import { Icon } from '@iconify/react';
import { useMemo, useRef, useState } from 'react';
import styles from './styles.module.css';

export const ExportWidgetPanel = ({
  screenTitle = 'Dashboard',
  availableWidgets = DEFAULT_WIDGET_LIST,
  dashboardElement = null,
}) => {
  const { isExportPanelOpen, closeExportPanel } = useExport();
  const [selectedWidgetIds, setSelectedWidgetIds] = useState(
    availableWidgets.map((widget) => widget.id)
  );
  const [exportFormat, setExportFormat] = useState(DEFAULT_EXPORT_FORMAT);
  const [isBusy, setIsBusy] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    'Select the widgets and format, then click Download.'
  );
  const previewRef = useRef(null);

  const selectedWidgets = useMemo(
    () =>
      availableWidgets.filter((widget) =>
        selectedWidgetIds.includes(widget.id)
      ),
    [availableWidgets, selectedWidgetIds]
  );

  const handleWidgetToggle = (widgetId) => {
    setSelectedWidgetIds((current) =>
      current.includes(widgetId)
        ? current.filter((id) => id !== widgetId)
        : [...current, widgetId]
    );
  };

  const handleSelectAll = () => {
    setSelectedWidgetIds(availableWidgets.map((widget) => widget.id));
  };

  const handleClearAll = () => {
    setSelectedWidgetIds([]);
  };

  const resetExportState = () => {
    // Reset all state to defaults for next export
    setSelectedWidgetIds(availableWidgets.map((widget) => widget.id));
    setExportFormat(DEFAULT_EXPORT_FORMAT);
    setStatusMessage('Select the widgets and format, then click Download.');
    setIsBusy(false);
  };

  const handleDownload = async () => {
    if (selectedWidgetIds.length === 0) {
      setStatusMessage('Please select at least one widget to export.');
      return;
    }

    setIsBusy(true);
    setStatusMessage('Generating export...');

    try {
      const exportDetails = {
        screenTitle,
        selectedWidgets,
        previewElement: previewRef.current,
        dashboardElement, // Pass actual dashboard element if available
      };

      if (exportFormat === 'png') {
        await downloadPngExport(exportDetails);
      } else if (exportFormat === 'xlsx') {
        await downloadXlsxExport(exportDetails);
      } else if (exportFormat === 'csv') {
        await downloadCsvExport(exportDetails);
      } else if (exportFormat === 'pdf') {
        await downloadPdfExport(exportDetails);
      }

      setStatusMessage('Export completed successfully.');
    } catch (error) {
      console.error('Export Error:', error);
      setStatusMessage(
        `Export failed: ${error.message || 'Please try again.'}`
      );
    } finally {
      setIsBusy(false);
      // Auto-close after success and reset state for next export
      if (statusMessage.includes('successfully')) {
        setTimeout(() => {
          resetExportState();
          closeExportPanel();
        }, 800);
      }
    }
  };

  return (
    <div className={styles.exportWidgetPanelContainer}>
      {isExportPanelOpen && (
        <div className={styles.exportOverlay} onClick={closeExportPanel} />
      )}

      <aside
        className={`${styles.exportPanel} ${isExportPanelOpen ? styles.exportPanelOpen : ''}`}
      >
        <div className={styles.exportPanelHeader}>
          <div>
            <p className={styles.exportPanelTitle}>Export dashboard content</p>
            <p className={styles.exportPanelSubtitle}>
              Choose widgets and format to generate a clean export package.
            </p>
          </div>
          <button
            className={styles.closeButton}
            type="button"
            onClick={closeExportPanel}
          >
            <Icon icon="mdi:close" width={20} height={20} />
          </button>
        </div>

        <section className={styles.exportSection}>
          <h3 className={styles.sectionTitle}>Download format</h3>
          <div className={styles.formatGrid}>
            {EXPORT_FORMATS.map((format) => (
              <label className={styles.formatOption} key={format.id}>
                <input
                  type="radio"
                  name="export-format"
                  value={format.id}
                  checked={exportFormat === format.id}
                  onChange={() => setExportFormat(format.id)}
                />
                <span>{format.label}</span>
              </label>
            ))}
          </div>
        </section>

        <section className={styles.exportSection}>
          <div className={styles.sectionHeaderRow}>
            <h3 className={styles.sectionTitle}>Widgets to export</h3>
            <div className={styles.selectionActions}>
              <button
                className={styles.linkButton}
                type="button"
                onClick={handleSelectAll}
              >
                Select all
              </button>
              <button
                className={styles.linkButton}
                type="button"
                onClick={handleClearAll}
              >
                Clear
              </button>
            </div>
          </div>

          <div className={styles.widgetList}>
            {availableWidgets.map((widget) => (
              <label key={widget.id} className={styles.widgetCheckboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedWidgetIds.includes(widget.id)}
                  onChange={() => handleWidgetToggle(widget.id)}
                />
                <span>{widget.label}</span>
              </label>
            ))}
          </div>
        </section>

        <div className={styles.exportFooter}>
          <div className={styles.exportStatus}>{statusMessage}</div>
          <button
            className={styles.downloadButton}
            type="button"
            onClick={handleDownload}
            disabled={isBusy || selectedWidgetIds.length === 0}
          >
            <Icon icon="mdi:download-outline" width={16} />
            {isBusy ? 'Preparing...' : 'Download export'}
          </button>
        </div>

        {/* Hidden preview element - used as fallback if no dashboard element provided */}
        <div className={styles.exportPreviewWrapper} ref={previewRef}>
          <div className={styles.exportPreviewContent}>
            <div className={styles.exportPreviewHeader}>
              <img
                src={logoPath}
                alt="SNR Edatas"
                className={styles.exportLogo}
              />
              <div>
                <h4>{screenTitle} export</h4>
                <p>{selectedWidgets.length} widget(s) selected</p>
              </div>
            </div>
            <div className={styles.exportPreviewSummary}>
              <p className={styles.previewLabel}>Export details</p>
              <ul>
                {selectedWidgets.map((widget) => (
                  <li key={widget.id}>{widget.label}</li>
                ))}
              </ul>
            </div>
            <div className={styles.exportWatermark}>
              <img src={faviconPath} alt="Watermark" />
              <span>{screenTitle}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
