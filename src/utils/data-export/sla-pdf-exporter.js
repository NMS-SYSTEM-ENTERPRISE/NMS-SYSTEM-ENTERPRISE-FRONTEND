import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import snrLogo from '@/assets/images/snr-logo-xl.svg';
import watermarkIcon from '@/assets/images/snr-edatas-favicon.png';
import { manropeBase64 } from '@/assets/fonts/manrope-base64';

const loadImageAsDataUrl = (src) =>
  new Promise((resolve, reject) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch (error) {
        reject(error);
      }
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    // Handle both string paths and Next.js static import objects
    img.src = typeof src === 'string' ? src : src.src;
  });

export const exportSlaReportToPdf = async (slaData = []) => {
  // A4 Landscape: 842 x 595 pt
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });

  doc.addFileToVFS('Manrope.ttf', manropeBase64);
  doc.addFont('Manrope.ttf', 'manrope', 'normal');
  doc.addFont('Manrope.ttf', 'manrope', 'bold');

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const exportDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

  const MARGIN = 40;
  let currentY = MARGIN;

  const logoDataUrl = await loadImageAsDataUrl(snrLogo).catch(() => null);
  const watermarkDataUrl = await loadImageAsDataUrl(watermarkIcon).catch(() => null);

  const totalDevices = slaData.length;
  let healthy = 0;
  let atRisk = 0;
  let breached = 0;

  slaData.forEach(sla => {
    const val = parseFloat(String(sla.sla_percentage).replace('%', ''));
    if (!isNaN(val)) {
      if (val >= 99) healthy++;
      else if (val >= 95) atRisk++;
      else breached++;
    } else {
      breached++;
    }
  });

  const drawHeader = () => {
    if (logoDataUrl) {
      doc.addImage(logoDataUrl, 'PNG', MARGIN, MARGIN, 120, 35);
    }

    doc.setFont('manrope', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42);
    doc.text('SLA Compliance Report', pageWidth - MARGIN, MARGIN + 15, { align: 'right' });

    doc.setFont('manrope', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated: ${exportDate}`, pageWidth - MARGIN, MARGIN + 30, { align: 'right' });

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(1);
    doc.line(MARGIN, MARGIN + 50, pageWidth - MARGIN, MARGIN + 50);

    return MARGIN + 70;
  };

  const drawWatermark = () => {
    if (watermarkDataUrl) {
      doc.setGState(new doc.GState({ opacity: 0.04 })); // Subtle watermark
      const wmWidth = 350;
      const wmHeight = 350;
      doc.addImage(watermarkDataUrl, 'PNG', (pageWidth - wmWidth) / 2, (pageHeight - wmHeight) / 2, wmWidth, wmHeight);
      doc.setGState(new doc.GState({ opacity: 1.0 }));
    }
  };

  const drawFooter = (pageNumber) => {
    const footerY = pageHeight - 30;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(1);
    doc.line(MARGIN, footerY - 10, pageWidth - MARGIN, footerY - 10);

    doc.setFont('manrope', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text('SNR Edatas Private Limited - NetMonitor Enterprise', MARGIN, footerY);
    doc.text(`Page ${pageNumber}`, pageWidth - MARGIN, footerY, { align: 'right' });
  };

  // Exact width distribution for 762pt total available width
  const columns = [
    { header: 'Device', width: 162 },
    { header: 'IP Address', width: 110 },
    { header: 'Group / Type', width: 150 },
    { header: 'Availability', width: 80, align: 'center' },
    { header: 'Performance', width: 80, align: 'center' },
    { header: 'SLA Status', width: 100, align: 'center' },
    { header: 'Open Tickets', width: 80, align: 'center' }
  ];

  let pageNum = 1;
  drawWatermark();
  currentY = drawHeader();

  const drawSummarySection = (y) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(1);
    doc.roundedRect(MARGIN, y, pageWidth - (MARGIN * 2), 56, 6, 6, 'FD');

    doc.setFont('manrope', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(30, 58, 138);
    doc.text('Executive Summary', MARGIN + 15, y + 20);

    const metricsY = y + 42;
    const boxWidth = (pageWidth - (MARGIN * 2)) / 4;

    const drawMetric = (label, value, xOffset, valueColor) => {
      doc.setFont('manrope', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      doc.text(label, xOffset, metricsY);

      doc.setFont('manrope', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(...valueColor);
      doc.text(String(value), xOffset + 95, metricsY);
    };

    drawMetric('Total Evaluated:', totalDevices, MARGIN + 15, [15, 23, 42]);
    drawMetric('Healthy Devices:', healthy, MARGIN + 15 + boxWidth, [22, 163, 74]);
    drawMetric('At Risk Devices:', atRisk, MARGIN + 15 + (boxWidth * 2), [234, 88, 12]);
    drawMetric('Breached Devices:', breached, MARGIN + 15 + (boxWidth * 3), [220, 38, 38]);

    return y + 80;
  };

  currentY = drawSummarySection(currentY);

  const drawTableHeader = (y) => {
    doc.setFillColor(241, 245, 249); // slate-100
    doc.rect(MARGIN, y, pageWidth - (MARGIN * 2), 24, 'F');

    doc.setFont('manrope', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);

    let startX = MARGIN + 6;
    columns.forEach(col => {
      const align = col.align || 'left';
      let x = startX;
      if (align === 'center') x = startX + (col.width / 2) - 6;
      if (align === 'right') x = startX + col.width - 12;
      doc.text(col.header, x, y + 16, { align });
      startX += col.width;
    });

    return y + 24;
  };

  currentY = drawTableHeader(currentY);

  doc.setFont('manrope', 'normal');
  doc.setFontSize(9);

  const rowHeight = 28;

  slaData.forEach((sla, index) => {
    if (currentY + rowHeight > pageHeight - 60) {
      drawFooter(pageNum);
      doc.addPage();
      pageNum++;
      drawWatermark();
      currentY = drawHeader();
      currentY = drawTableHeader(currentY);
      doc.setFont('manrope', 'normal');
      doc.setFontSize(9);
    }

    if (index % 2 === 1) {
      doc.setFillColor(248, 250, 252); // slate-50
      doc.rect(MARGIN, currentY, pageWidth - (MARGIN * 2), rowHeight, 'F');
    }

    let startX = MARGIN + 6;
    doc.setTextColor(15, 23, 42); // slate-900

    const drawCell = (text, colIndex, customColor = null, isBold = false) => {
      const col = columns[colIndex];
      const align = col.align || 'left';
      let x = startX;
      if (align === 'center') x = startX + (col.width / 2) - 6;
      if (align === 'right') x = startX + col.width - 12;

      if (customColor) {
        doc.setTextColor(...customColor);
      } else {
        doc.setTextColor(15, 23, 42);
      }

      doc.setFont('manrope', isBold ? 'bold' : 'normal');

      // Truncate long texts
      let safeText = String(text || 'N/A');
      if (doc.getTextWidth(safeText) > col.width - 12) {
        while (doc.getTextWidth(safeText + '...') > col.width - 12 && safeText.length > 0) {
          safeText = safeText.substring(0, safeText.length - 1);
        }
        safeText += '...';
      }

      doc.text(safeText, x, currentY + 18, { align });
      startX += col.width;
    };

    const getStatusColor = (valStr) => {
      const val = parseFloat(String(valStr).replace('%', ''));
      if (isNaN(val)) return [100, 116, 139]; // slate-500 neutral
      if (val >= 99) return [22, 163, 74]; // green-600
      if (val >= 95) return [234, 88, 12]; // orange-600
      return [220, 38, 38]; // red-600
    };

    drawCell(sla.hostname || sla.ip_address || 'Unknown', 0, null, true);
    drawCell(sla.ip_address || 'N/A', 1);
    drawCell(`${sla.group || 'Unknown'} / ${sla.device_type || 'Unknown'}`, 2);

    drawCell(sla.availability_achieved || 'N/A', 3, getStatusColor(sla.availability_achieved), true);
    drawCell(sla.performance_achieved || 'N/A', 4, getStatusColor(sla.performance_achieved), true);

    // SLA % and status
    const slaStatusStr = sla.sla_percentage || 'N/A';
    const slaColor = getStatusColor(slaStatusStr);

    const slaCol = columns[5];
    let xSla = startX + (slaCol.width / 2) - 6;
    doc.setTextColor(...slaColor);
    doc.setFont('manrope', 'bold');

    let slaLabel = 'UNKNOWN';
    const slaVal = parseFloat(String(slaStatusStr).replace('%', ''));
    if (!isNaN(slaVal)) {
      if (slaVal >= 99) slaLabel = 'OK';
      else if (slaVal >= 95) slaLabel = 'WARNING';
      else slaLabel = 'BREACHED';
    }

    doc.text(`${slaStatusStr} [${slaLabel}]`, xSla, currentY + 18, { align: 'center' });
    startX += slaCol.width;

    // Tickets
    const hasTickets = parseInt(sla.open_tickets, 10) > 0;
    drawCell(String(sla.open_tickets || '0'), 6, hasTickets ? [234, 88, 12] : [22, 163, 74], true);

    currentY += rowHeight;
  });

  drawFooter(pageNum);
  doc.save(`SNR_Enterprise_SLA_Report_${format(new Date(), 'yyyyMMdd')}.pdf`);
};
