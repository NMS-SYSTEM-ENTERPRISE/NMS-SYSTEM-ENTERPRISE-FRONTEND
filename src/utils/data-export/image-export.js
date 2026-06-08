import html2canvas from 'html2canvas';
import { downloadBlob, getExportFileName } from './export-utils';

export const downloadPngExport = async ({
  screenTitle,
  dashboardElement,
  previewElement,
}) => {
  // Use dashboard element if available, otherwise fall back to preview
  const elementToCapture = dashboardElement || previewElement;

  if (!elementToCapture) {
    throw new Error(
      'Dashboard element or preview element is required for PNG export'
    );
  }

  try {
    // Calculate actual height needed to capture all content
    const scrollHeight =
      elementToCapture.scrollHeight || elementToCapture.offsetHeight;
    const clientHeight = elementToCapture.clientHeight;
    const actualHeight = Math.max(scrollHeight, clientHeight, 800);

    const scrollWidth =
      elementToCapture.scrollWidth || elementToCapture.offsetWidth;
    const clientWidth = elementToCapture.clientWidth;
    const actualWidth = Math.max(scrollWidth, clientWidth, 800);

    // Capture element to canvas - with proper full-page configuration
    const canvas = await html2canvas(elementToCapture, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
      windowHeight: actualHeight,
      height: actualHeight,
      windowWidth: actualWidth,
      width: actualWidth,
    });

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Unable to generate PNG image from dashboard'));
          return;
        }
        const fileName = getExportFileName(screenTitle, 'png');
        downloadBlob(blob, fileName);
        resolve();
      }, 'image/png');
    });
  } catch (error) {
    console.error('PNG Export Error:', error);
    throw new Error(`Failed to generate PNG: ${error.message}`);
  }
};
