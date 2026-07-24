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
import { getSlaReport } from '@/networking/network-monitoring/network-monitoring-apis';
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
  const [exportData, setExportData] = useState([]);

  // Build API params from all active filters
  const buildExportParams = () => {
    const p = { limit: 500, page: 1 };
    if (searchQuery) p.search = searchQuery;
    if (filters.device_group) p.device_group = filters.device_group;
    if (filters.device_type) p.device_type = filters.device_type;
    if (filters.device_subgroup) p.device_subgroup = filters.device_subgroup;
    if (filters.quick_select) p.quick_select = filters.quick_select;
    if (filters.start_date) p.start_date = filters.start_date;
    if (filters.end_date) p.end_date = filters.end_date;
    if (filters.start_time) p.start_time = filters.start_time;
    if (filters.end_time) p.end_time = filters.end_time;
    return p;
  };

  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      // 1. Fetch ALL data from API using current filters (paginate if needed)
      const params = buildExportParams();
      const firstPage = await getSlaReport(params);
      let allItems = firstPage.items || [];
      const totalApiPages = firstPage.total_pages || 1;

      // Fetch remaining pages if dataset spans multiple API pages
      for (let p = 2; p <= totalApiPages; p++) {
        const nextPage = await getSlaReport({ ...params, page: p });
        allItems = [...allItems, ...(nextPage.items || [])];
      }

      if (allItems.length === 0) return;

      // 2. Inject data into the PDF template and wait for React to render it
      setExportData(allItems);
      await new Promise((r) => setTimeout(r, 300)); // Allow React to rerender

      // 3. Pre-load watermark
      const wmDataUrl = await loadImageDataUrl(watermarkSrc);

      // 4. Create A4 Landscape PDF
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const wmSize = 200;
      const wmX = (pdfW - wmSize) / 2;
      const wmY = (pdfH - wmSize) / 2;

      const domPages = pageRefs.current.filter(Boolean);

      // 5. Capture each pre-chunked A4 page div individually
      for (let i = 0; i < domPages.length; i++) {
        const canvas = await html2canvas(domPages[i], {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
        });

        if (i > 0) pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdfW, pdfH);

        // Centered watermark on every page
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
      setExportData([]);
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
      {/* Hidden PDF Template — rendered only during export with full API data */}
      {exportData.length > 0 && (
        <SlaPdfTemplate slaData={exportData} pageRefs={pageRefs} />
      )}
    </div>
  );
};
