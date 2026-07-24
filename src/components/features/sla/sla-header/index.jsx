import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSla } from '@/hooks/sla';
import { Icon } from '@iconify/react';
import { DEFAULT_SLA_FILTERS } from '@/utils/constants/sla';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import { SlaPdfTemplate } from '../sla-pdf-template';
import watermarkSrc from '@/assets/images/snr-edatas-favicon.png';
import styles from './styles.module.css';

const loadImageDataUrl = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      canvas.getContext('2d').drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(null);
    img.src = typeof src === 'string' ? src : src.src;
  });

export const SlaHeader = () => {
  const {
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    setShowActionSidebar,
    refreshSlaPortfolio,
    filters,
    handleResetFilters,
    paginatedSLAs
  } = useSla();

  const pdfTemplateRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPdf = async () => {
    if (!paginatedSLAs || paginatedSLAs.length === 0 || !pdfTemplateRef.current) return;
    setIsExporting(true);
    try {
      // 1. Pre-load watermark
      const wmDataUrl = await loadImageDataUrl(watermarkSrc);

      // 2. Capture the hidden React template as a high-res canvas
      const element = pdfTemplateRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');

      // 3. Create A4 Landscape PDF in pt
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
      const pdfW = pdf.internal.pageSize.getWidth();  // 841.89pt
      const pdfH = pdf.internal.pageSize.getHeight(); // 595.28pt

      // Scale canvas to fit PDF width exactly
      const imgScaledH = (canvas.height / canvas.width) * pdfW;
      const totalPages = Math.ceil(imgScaledH / pdfH);

      const wmSize = 220; // watermark square size in pt
      const wmX = (pdfW - wmSize) / 2;
      const wmY = (pdfH - wmSize) / 2;

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();

        // Draw the content slice for this page
        const yOffset = -(page * pdfH);
        pdf.addImage(imgData, 'PNG', 0, yOffset, pdfW, imgScaledH);

        // Draw centered watermark over each page at very low opacity
        if (wmDataUrl) {
          pdf.saveGraphicsState();
          pdf.setGState(new pdf.GState({ opacity: 0.04 }));
          pdf.addImage(wmDataUrl, 'PNG', wmX, wmY, wmSize, wmSize);
          pdf.restoreGraphicsState();
        }

        // Clean white footer strip drawn on top
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, pdfH - 28, pdfW, 28, 'F');
        pdf.setDrawColor(226, 232, 240);
        pdf.setLineWidth(0.5);
        pdf.line(24, pdfH - 28, pdfW - 24, pdfH - 28);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(148, 163, 184);
        pdf.text('SNR Edatas Private Limited — NetMonitor Enterprise', 24, pdfH - 10);
        pdf.text(`Page ${page + 1} of ${totalPages}`, pdfW - 24, pdfH - 10, { align: 'right' });
      }

      pdf.save(`SNR_Enterprise_SLA_Report_${format(new Date(), 'yyyyMMdd')}.pdf`);
    } catch (err) {
      console.error('PDF generation failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(localSearch);
    }
  };

  const hasActiveFilters =
    filters.status !== DEFAULT_SLA_FILTERS.status ||
    filters.slaType !== DEFAULT_SLA_FILTERS.slaType ||
    filters.frequency !== DEFAULT_SLA_FILTERS.frequency ||
    localSearch.trim() !== '';

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerIcon}>
            <Icon icon="ph:chart-line-up-bold" width={20} />
          </div>
          <h1 className={styles.headerTitle}>SLA Report</h1>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.headerSearch}>
            <div className={styles.searchWrapper}>
              <Icon icon="ph:magnifying-glass-bold" className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search resources... (Hit Enter)"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.searchInputCustom}
              />
            </div>
          </div>

          <div className={styles.viewToggle}>
            <Button
              variant={viewMode === 'table' ? 'primary' : 'ghost'}
              size="icon"
              className={`${styles.viewToggleBtn} ${viewMode === 'table' ? styles.viewToggleBtnActive : ''}`}
              onClick={() => setViewMode('table')}
              title="Table view"
            >
              <Icon icon="ph:list-bold" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="icon"
              className={`${styles.viewToggleBtn} ${viewMode === 'grid' ? styles.viewToggleBtnActive : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid view"
            >
              <Icon icon="ph:squares-four-bold" />
            </Button>
          </div>

          <div className={styles.headerActions}>
            <Button
              variant="outline"
              className={styles.exportBtn}
              title="Export PDF"
              onClick={handleExportPdf}
              disabled={isExporting}
              style={{ opacity: isExporting ? 0.7 : 1, cursor: isExporting ? 'not-allowed' : 'pointer', minWidth: '110px' }}
            >
              {isExporting ? (
                <>
                  <Icon icon="ph:spinner-bold" width={17} style={{ animation: 'spin 0.9s linear infinite' }} />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Icon icon="ph:file-pdf-bold" color="var(--color-danger)" width={18} />
                  <span>EXPORT</span>
                </>
              )}
            </Button>
            <Button
              variant={hasActiveFilters ? 'primary' : 'ghost'}
              size="icon"
              className={`${styles.actionBtn} ${hasActiveFilters ? styles.actionBtnActive : ''}`}
              onClick={() => setShowActionSidebar(true)}
              title="Filters"
            >
              <Icon icon="ph:funnel-bold" />
            </Button>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="icon"
                className={styles.actionBtn}
                title="Reset Filters"
                onClick={handleResetFilters}
              >
                <Icon icon="ph:x-circle-bold" color="var(--color-danger)" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={styles.actionBtn}
              title="Refresh"
              onClick={refreshSlaPortfolio}
            >
              <Icon icon="ph:arrows-clockwise-bold" />
            </Button>
          </div>
        </div>
      </header>
      {/* Hidden PDF Template for html2canvas export */}
      {paginatedSLAs && paginatedSLAs.length > 0 && (
        <SlaPdfTemplate slaData={paginatedSLAs} templateRef={pdfTemplateRef} />
      )}
    </div>
  );
};
