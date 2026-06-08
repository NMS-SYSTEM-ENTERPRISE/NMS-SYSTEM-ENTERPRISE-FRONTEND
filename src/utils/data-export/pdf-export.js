import html2canvas from 'html2canvas';
import { getExportFileName } from './export-utils';

export const downloadPdfExport = async ({
  screenTitle,
  dashboardElement,
  previewElement,
}) => {
  // Use dashboard element if available, otherwise fall back to preview
  const elementToCapture = dashboardElement || previewElement;

  if (!elementToCapture) {
    throw new Error(
      'Dashboard element or preview element is required for PDF export'
    );
  }

  try {
    const jsPDFModule = await import('jspdf');
    const jsPDF = jsPDFModule.jsPDF || jsPDFModule.default || jsPDFModule;
    if (!jsPDF) {
      throw new Error('Failed to load jsPDF module.');
    }

    // Calculate actual height needed to capture all content
    const scrollHeight =
      elementToCapture.scrollHeight || elementToCapture.offsetHeight;
    const clientHeight = elementToCapture.clientHeight;
    const actualHeight = Math.max(scrollHeight, clientHeight, 800);

    // Capture element to canvas - with proper height configuration
    const canvas = await html2canvas(elementToCapture, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      windowHeight: actualHeight,
      height: actualHeight,
      windowWidth: elementToCapture.scrollWidth || elementToCapture.offsetWidth,
      width: elementToCapture.scrollWidth || elementToCapture.offsetWidth,
    });

    const imageData = canvas.toDataURL('image/png');

    // Create landscape PDF
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Add title page with export info
    pdf.setFontSize(20);
    pdf.text(screenTitle, pageWidth / 2, 40, { align: 'center' });

    pdf.setFontSize(12);
    pdf.text(`Export Date: ${new Date().toLocaleString()}`, pageWidth / 2, 70, {
      align: 'center',
    });

    // Add page break before dashboard content
    pdf.addPage();

    // Calculate image dimensions to fit page
    const imageWidth = pageWidth - 40;
    let imageHeight = (canvas.height * imageWidth) / canvas.width;

    // Add dashboard image - handle multiple pages if content is tall
    let yPosition = 20;
    let remainingHeight = imageHeight;

    while (remainingHeight > 0) {
      const maxHeightPerPage = pageHeight - 40;
      const heightThisPage = Math.min(remainingHeight, maxHeightPerPage);

      // Calculate source dimensions for this page
      const srcHeight = (heightThisPage * canvas.width) / imageWidth;
      const srcY = imageHeight - remainingHeight;

      // Create a temporary canvas for this page section
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = Math.ceil(srcHeight);

      const ctx = tempCanvas.getContext('2d');
      ctx.drawImage(
        canvas,
        0,
        srcY,
        canvas.width,
        Math.ceil(srcHeight),
        0,
        0,
        canvas.width,
        Math.ceil(srcHeight)
      );

      const pageImageData = tempCanvas.toDataURL('image/png');
      pdf.addImage(
        pageImageData,
        'PNG',
        20,
        yPosition,
        imageWidth,
        heightThisPage
      );

      remainingHeight -= heightThisPage;
      if (remainingHeight > 0) {
        pdf.addPage();
        yPosition = 20;
      }
    }

    pdf.save(getExportFileName(screenTitle, 'pdf'));
  } catch (error) {
    console.error('PDF Export Error:', error);
    throw new Error(`Failed to generate PDF: ${error.message}`);
  }
};
