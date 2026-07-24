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

  const pageRefs = useRef([]);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPdf = async () => {
    if (!paginatedSLAs || paginatedSLAs.length === 0) return;
    const pages = pageRefs.current.filter(Boolean);
    if (pages.length === 0) return;

    setIsExporting(true);
    try {
      // 1. Pre-load watermark asset
      const wmDataUrl = await loadImageDataUrl(watermarkSrc);

      // 2. Create A4 Landscape PDF
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
      const pdfW = pdf.internal.pageSize.getWidth();   // 841.89 pt
      const pdfH = pdf.internal.pageSize.getHeight();  // 595.28 pt
      const wmSize = 200;
      const wmX = (pdfW - wmSize) / 2;
      const wmY = (pdfH - wmSize) / 2;

      // 3. Capture each A4 page-div individually — zero row-cutting guaranteed
      for (let i = 0; i < pages.length; i++) {
        const canvas = await html2canvas(pages[i], {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
        });

        if (i > 0) pdf.addPage();

        // Fit captured canvas to exact PDF page dimensions
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfW, pdfH);

        // Draw watermark centred on every page
        if (wmDataUrl) {
          pdf.saveGraphicsState();
          pdf.setGState(new pdf.GState({ opacity: 0.04 }));
          pdf.addImage(wmDataUrl, 'PNG', wmX, wmY, wmSize, wmSize);
          pdf.restoreGraphicsState();
        }
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
        <SlaPdfTemplate slaData={paginatedSLAs} pageRefs={pageRefs} />
      )}
    </div>
  );
};
