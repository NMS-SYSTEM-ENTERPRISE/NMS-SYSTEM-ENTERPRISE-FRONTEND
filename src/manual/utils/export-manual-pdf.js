import snrLogo from '@/assets/images/snr-logo-xl.svg';
import { MANUAL_CATEGORIES, MANUAL_FEATURES } from './features-data';
import { MANUAL_IMAGE_MAP } from './image-map';

const MARGIN = 48;
const HEADER_BOTTOM = 58;
const FOOTER_TOP_OFFSET = 28;
const CONTENT_WIDTH = 499; // A4 width (595) - 2 * margin

const hexToRgb = (hex) => {
  const normalized = (hex || '#3b82f6').replace('#', '');
  if (normalized.length !== 6) return { r: 59, g: 130, b: 246 };
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
};

const resolveImageSrc = (image) => {
  if (!image) return null;
  if (typeof image === 'string') return image;
  if (image?.src) return image.src;
  return null;
};

const loadImageAsDataUrl = (src) =>
  new Promise((resolve, reject) => {
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
    img.src = src;
  });

const getCategoryLabel = (categoryId) =>
  MANUAL_CATEGORIES.find((category) => category.id === categoryId)?.label ||
  categoryId;

const getWorkflowSteps = (feature) => {
  const steps = feature.sections.reduce((acc, section) => {
    if (section.steps?.length) return [...acc, ...section.steps];
    return acc;
  }, []);

  if (steps.length > 0) return steps.slice(0, 4);
  return feature.sections.slice(0, 3).map((section) => section.title);
};

export const exportManualToPdf = async () => {
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentBottom = pageHeight - FOOTER_TOP_OFFSET - 12;
  const generatedAt = new Date().toLocaleString();
  const exportDate = new Date().toISOString().split('T')[0];

  const logoSrc = resolveImageSrc(snrLogo);
  const logoDataUrl = logoSrc ? await loadImageAsDataUrl(logoSrc) : null;

  const tocEntries = [];
  const TOC_START_PAGE = 2;
  const TOC_PAGE_COUNT = 2;

  const drawHeader = () => {
    if (logoDataUrl) {
      pdf.addImage(logoDataUrl, 'PNG', MARGIN, 16, 96, 30);
    }

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor(30, 58, 138);
    pdf.text('User Manual', pageWidth - MARGIN, 30, { align: 'right' });

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(100, 116, 139);
    pdf.text('NetMonitor Enterprise AIOps Platform', pageWidth - MARGIN, 42, {
      align: 'right',
    });

    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.75);
    pdf.line(MARGIN, HEADER_BOTTOM - 4, pageWidth - MARGIN, HEADER_BOTTOM - 4);
  };

  const drawFooter = (pageNumber, totalPages) => {
    const footerY = pageHeight - 22;

    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.5);
    pdf.line(MARGIN, footerY - 10, pageWidth - MARGIN, footerY - 10);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(100, 116, 139);
    pdf.text('SNR Edatas Private Limited', MARGIN, footerY);
    pdf.text(`Page ${pageNumber} of ${totalPages}`, pageWidth / 2, footerY, {
      align: 'center',
    });
    pdf.text(exportDate, pageWidth - MARGIN, footerY, { align: 'right' });
  };

  const ensureSpace = (currentY, requiredHeight) => {
    if (currentY + requiredHeight <= contentBottom) return currentY;

    pdf.addPage();
    return HEADER_BOTTOM + 8;
  };

  const ensureTocSpace = (currentY, requiredHeight, tocPageRef) => {
    if (currentY + requiredHeight <= contentBottom) return currentY;

    if (tocPageRef.page < TOC_START_PAGE + TOC_PAGE_COUNT - 1) {
      tocPageRef.page += 1;
      pdf.setPage(tocPageRef.page);
      return HEADER_BOTTOM + 8;
    }

    return currentY;
  };

  const writeParagraph = (text, startY, options = {}) => {
    const {
      fontSize = 10,
      fontStyle = 'normal',
      color = [71, 85, 105],
      indent = 0,
      lineGap = 4,
    } = options;

    pdf.setFont('helvetica', fontStyle);
    pdf.setFontSize(fontSize);
    pdf.setTextColor(...color);

    const lines = pdf.splitTextToSize(text, CONTENT_WIDTH - indent);
    let y = startY;

    lines.forEach((line) => {
      y = ensureSpace(y, fontSize + lineGap);
      pdf.text(line, MARGIN + indent, y);
      y += fontSize + lineGap;
    });

    return y;
  };

  const writeSectionHeading = (title, index, accentColor, startY) => {
    const rgb = hexToRgb(accentColor);
    let y = ensureSpace(startY, 28);

    pdf.setFillColor(rgb.r, rgb.g, rgb.b);
    pdf.roundedRect(MARGIN, y - 12, 22, 18, 3, 3, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(255, 255, 255);
    pdf.text(String(index + 1).padStart(2, '0'), MARGIN + 11, y, {
      align: 'center',
    });

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(15, 23, 42);
    pdf.text(title, MARGIN + 30, y);

    pdf.setDrawColor(rgb.r, rgb.g, rgb.b);
    pdf.setLineWidth(1);
    pdf.line(MARGIN, y + 6, pageWidth - MARGIN, y + 6);

    return y + 20;
  };

  const addScreenshot = async (imageEntry, startY) => {
    const src = resolveImageSrc(imageEntry?.src);
    if (!src) return startY;

    try {
      const dataUrl = await loadImageAsDataUrl(src);
      const props = pdf.getImageProperties(dataUrl);
      const maxWidth = CONTENT_WIDTH;
      const imageHeight = (props.height * maxWidth) / props.width;
      const blockHeight = imageHeight + 28;

      let y = ensureSpace(startY, blockHeight);
      pdf.addImage(dataUrl, 'PNG', MARGIN, y, maxWidth, imageHeight);
      y += imageHeight + 8;

      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(8);
      pdf.setTextColor(100, 116, 139);
      const captionLines = pdf.splitTextToSize(imageEntry.caption || '', CONTENT_WIDTH);
      captionLines.forEach((line) => {
        y = ensureSpace(y, 10);
        pdf.text(line, MARGIN, y);
        y += 10;
      });

      return y + 8;
    } catch {
      return startY;
    }
  };

  // Cover page
  if (logoDataUrl) {
    pdf.addImage(logoDataUrl, 'PNG', pageWidth / 2 - 110, 120, 220, 68);
  }

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(30);
  pdf.setTextColor(15, 23, 42);
  pdf.text('User Manual', pageWidth / 2, 230, { align: 'center' });

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(14);
  pdf.setTextColor(59, 130, 246);
  pdf.text('NetMonitor Enterprise AIOps Platform', pageWidth / 2, 258, {
    align: 'center',
  });

  pdf.setFontSize(11);
  pdf.setTextColor(71, 85, 105);
  pdf.text('Complete end-to-end documentation for all platform modules', pageWidth / 2, 290, {
    align: 'center',
  });

  pdf.setFillColor(239, 246, 255);
  pdf.roundedRect(MARGIN, 330, CONTENT_WIDTH, 110, 8, 8, 'F');
  pdf.setDrawColor(186, 230, 253);
  pdf.roundedRect(MARGIN, 330, CONTENT_WIDTH, 110, 8, 8, 'S');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(30, 58, 138);
  pdf.text('Document Information', MARGIN + 18, 352);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(51, 65, 85);
  pdf.text(`Version: v1.0 Enterprise`, MARGIN + 18, 372);
  pdf.text(`Total Modules: ${MANUAL_FEATURES.length}`, MARGIN + 18, 388);
  pdf.text(`Generated: ${generatedAt}`, MARGIN + 18, 404);
  pdf.text(`Publisher: SNR Edatas Private Limited`, MARGIN + 18, 420);

  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(9);
  pdf.setTextColor(148, 163, 184);
  pdf.text(
    'Confidential — For authorized users of the NetMonitor Enterprise platform.',
    pageWidth / 2,
    pageHeight - 48,
    { align: 'center' }
  );

  // Reserve table of contents pages
  for (let index = 0; index < TOC_PAGE_COUNT; index += 1) {
    pdf.addPage();
  }

  // Module content
  for (let featureIndex = 0; featureIndex < MANUAL_FEATURES.length; featureIndex += 1) {
    const feature = MANUAL_FEATURES[featureIndex];

    pdf.addPage();
    const modulePage = pdf.internal.getNumberOfPages();

    tocEntries.push({
      title: feature.title,
      page: modulePage,
      category: feature.category,
      moduleNumber: featureIndex + 1,
    });

    let y = HEADER_BOTTOM + 10;
    const accent = hexToRgb(feature.color);

    pdf.setFillColor(accent.r, accent.g, accent.b);
    pdf.roundedRect(MARGIN, y - 10, CONTENT_WIDTH, 72, 6, 6, 'F');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(255, 255, 255);
    pdf.text(`MODULE ${String(featureIndex + 1).padStart(2, '0')}`, MARGIN + 16, y + 6);

    pdf.setFontSize(20);
    pdf.text(feature.title, MARGIN + 16, y + 30);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(feature.description, MARGIN + 16, y + 48, {
      maxWidth: CONTENT_WIDTH - 32,
    });

    y += 82;

    y = writeParagraph(feature.overview, y, {
      fontSize: 10,
      color: [51, 65, 85],
    });
    y += 6;

    const workflowSteps = getWorkflowSteps(feature);
    if (workflowSteps.length > 0) {
      y = ensureSpace(y, 24);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(15, 23, 42);
      pdf.text('Continuous Workflow', MARGIN, y);
      y += 16;

      workflowSteps.forEach((step, stepIndex) => {
        y = ensureSpace(y, 16);
        pdf.setFillColor(accent.r, accent.g, accent.b);
        pdf.circle(MARGIN + 6, y - 4, 6, 'F');
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(8);
        pdf.setTextColor(255, 255, 255);
        pdf.text(String(stepIndex + 1), MARGIN + 6, y - 1, { align: 'center' });
        y = writeParagraph(step, y, { indent: 18, fontSize: 9 });
      });

      y += 4;
    }

    const images = MANUAL_IMAGE_MAP[feature.imageSet] || [];
    if (images.length > 0) {
      y = ensureSpace(y, 20);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(15, 23, 42);
      pdf.text('Screenshots & Visual Reference', MARGIN, y);
      y += 16;

      for (const imageEntry of images) {
        y = await addScreenshot(imageEntry, y);
      }
    }

    y = ensureSpace(y, 20);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(15, 23, 42);
    pdf.text('Detailed Guide', MARGIN, y);
    y += 16;

    for (let sectionIndex = 0; sectionIndex < feature.sections.length; sectionIndex += 1) {
      const section = feature.sections[sectionIndex];
      y = writeSectionHeading(section.title, sectionIndex, feature.color, y);
      y = writeParagraph(section.content, y);

      if (section.steps?.length) {
        y = ensureSpace(y, 16);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        pdf.setTextColor(30, 58, 138);
        pdf.text('Step-by-Step Guide', MARGIN + 4, y);
        y += 14;

        section.steps.forEach((step, stepIndex) => {
          y = ensureSpace(y, 14);
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(8);
          pdf.setTextColor(accent.r, accent.g, accent.b);
          pdf.text(`${stepIndex + 1}.`, MARGIN + 4, y);
          y = writeParagraph(step, y, { indent: 18, fontSize: 9 });
        });
      }

      y += 8;
    }
  }

  // Render table of contents
  const tocPageRef = { page: TOC_START_PAGE };
  pdf.setPage(tocPageRef.page);

  let tocY = HEADER_BOTTOM + 12;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(20);
  pdf.setTextColor(15, 23, 42);
  pdf.text('Table of Contents', MARGIN, tocY);
  tocY += 10;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(100, 116, 139);
  pdf.text(
    `${MANUAL_FEATURES.length} modules · Complete platform documentation`,
    MARGIN,
    tocY + 14
  );
  tocY += 32;

  const categoriesInOrder = MANUAL_CATEGORIES.filter((category) => category.id !== 'all');

  categoriesInOrder.forEach((category) => {
    const entries = tocEntries.filter((entry) => entry.category === category.id);
    if (entries.length === 0) return;

    tocY = ensureTocSpace(tocY, 20, tocPageRef);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(30, 58, 138);
    pdf.text(getCategoryLabel(category.id), MARGIN, tocY);
    tocY += 14;

    entries.forEach((entry) => {
      tocY = ensureTocSpace(tocY, 14, tocPageRef);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(51, 65, 85);
      pdf.text(
        `${String(entry.moduleNumber).padStart(2, '0')}. ${entry.title}`,
        MARGIN + 10,
        tocY
      );

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(148, 163, 184);
      const pageLabel = String(entry.page);
      pdf.text(pageLabel, pageWidth - MARGIN, tocY, { align: 'right' });

      const titleWidth = pdf.getTextWidth(
        `${String(entry.moduleNumber).padStart(2, '0')}. ${entry.title}`
      );
      const pageLabelWidth = pdf.getTextWidth(pageLabel);
      const dotsStart = MARGIN + 10 + titleWidth + 8;
      const dotsEnd = pageWidth - MARGIN - pageLabelWidth - 8;
      let dotX = dotsStart;

      pdf.setTextColor(203, 213, 225);
      while (dotX < dotsEnd) {
        pdf.text('.', dotX, tocY);
        dotX += 4;
      }

      tocY += 14;
    });

    tocY += 6;
  });

  // Apply headers and footers to all pages
  const totalPages = pdf.internal.getNumberOfPages();
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
    pdf.setPage(pageNumber);
    if (pageNumber > 1) {
      drawHeader();
    }
    drawFooter(pageNumber, totalPages);
  }

  pdf.save(`SNR_NetMonitor_User_Manual_${exportDate}.pdf`);
};
