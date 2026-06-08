import {
  createExportHeaderRows,
  downloadBlob,
  escapeCsvValue,
  extractDashboardData,
  getExportFileName,
} from './export-utils';

export const downloadCsvExport = ({
  screenTitle,
  selectedWidgets,
  dashboardElement,
  previewElement,
}) => {
  try {
    const fileName = getExportFileName(screenTitle, 'csv');

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

    // Convert to CSV
    const csvText = allRows
      .map((row) => {
        // Handle both single values and arrays
        const cells = Array.isArray(row) ? row : [row];
        return cells.map((cell) => escapeCsvValue(cell)).join(',');
      })
      .join('\r\n');

    const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, fileName);
  } catch (error) {
    console.error('CSV Export Error:', error);
    throw new Error(`Failed to generate CSV: ${error.message}`);
  }
};
