import * as XLSX from 'xlsx';
import {
  createExportHeaderRows,
  extractDashboardData,
  getExportFileName,
} from './export-utils';

export const downloadXlsxExport = ({
  screenTitle,
  selectedWidgets,
  dashboardElement,
  previewElement,
}) => {
  try {
    const fileName = getExportFileName(screenTitle, 'xlsx');

    // Start with header rows
    const headerRows = createExportHeaderRows(screenTitle, selectedWidgets);

    // Extract actual dashboard data if available, passing selected widgets for widget-aware extraction
    let dataRows = [];
    const elementWithData = dashboardElement || previewElement;

    if (elementWithData) {
      dataRows = extractDashboardData(elementWithData, selectedWidgets);
    }

    // Combine header and data rows
    const allRows = [...headerRows];

    if (dataRows.length > 0) {
      allRows.push(['Dashboard Data']);
      allRows.push([]); // Empty row for spacing
      allRows.push(...dataRows);
    } else {
      // Fallback if no data extracted
      allRows.push(['No data available to export']);
    }

    // Create worksheet with proper formatting
    const worksheet = XLSX.utils.aoa_to_sheet(allRows);

    // Set column widths
    const columnWidths = [
      { wch: 32 }, // Column A
      { wch: 50 }, // Column B
      { wch: 40 }, // Column C
      { wch: 40 }, // Column D
      { wch: 40 }, // Column E
    ];

    worksheet['!cols'] = columnWidths;

    // Set default row height
    const rowHeights = {};
    allRows.forEach((_, index) => {
      rowHeights[index] = 20;
    });
    worksheet['!rows'] = Object.values(rowHeights);

    // Create workbook and add worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dashboard Export');

    // Save file
    XLSX.writeFile(workbook, fileName);
  } catch (error) {
    console.error('XLSX Export Error:', error);
    throw new Error(`Failed to generate XLSX: ${error.message}`);
  }
};
