import { EXPORT_WATERMARK_TEXT } from './constants';

export const getExportTimestamp = () => {
  return new Date().toISOString().replace(/[:.]/g, '-');
};

export const getExportFileName = (screenTitle, extension) => {
  const normalizedTitle = screenTitle
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_\-]/g, '')
    .toLowerCase();

  return `${normalizedTitle || 'report'}_${getExportTimestamp()}.${extension}`;
};

export const downloadBlob = (blob, fileName) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    link.remove();
  }, 200);
};

export const escapeCsvValue = (value) => {
  if (value === null || value === undefined) {
    return '';
  }
  const stringValue = String(value);
  const escaped = stringValue.replace(/"/g, '""');
  return `"${escaped}"`;
};

export const createExportHeaderRows = (screenTitle, selectedWidgets) => {
  const selectedLabels = selectedWidgets.length
    ? selectedWidgets.map((widget) => widget.label).join(' | ')
    : 'No widgets selected';

  return [
    [EXPORT_WATERMARK_TEXT],
    ['Report', screenTitle],
    ['Exported', new Date().toLocaleString()],
    ['Widgets', selectedLabels],
    [],
  ];
};

// Extract dashboard data from actual dashboard content with widget awareness
export const extractDashboardData = (dashboardElement, selectedWidgets = null) => {
  if (!dashboardElement) {
    return [];
  }

  const dataRows = [];
  
  try {
    // If specific widgets are selected, extract data for those widgets
    if (selectedWidgets && selectedWidgets.length > 0) {
      selectedWidgets.forEach((widget) => {
        // Add widget header
        dataRows.push([`[${widget.label}]`]);
        dataRows.push([]); // Spacing
        
        // Try to find widget-specific content
        // Look for elements with widget ID or widget label in their attributes
        const widgetSelector = `[data-widget-id="${widget.id}"], [id*="${widget.id}"], [class*="${widget.id}"], [aria-label*="${widget.label}"]`;
        let widgetElements = dashboardElement.querySelectorAll(widgetSelector);
        
        if (widgetElements.length > 0) {
          // Extract all text from widget elements (even hidden ones)
          widgetElements.forEach((element) => {
            extractTextFromElement(element, dataRows);
          });
        } else {
          // Fallback: Search all elements for widget label text
          const allElements = dashboardElement.querySelectorAll('*');
          let foundWidget = false;
          
          allElements.forEach((element) => {
            const text = element.textContent || element.innerText || '';
            // Look for widget label in element or its direct children
            if (text.includes(widget.label) && !foundWidget) {
              // Extract text from this element and siblings
              const parentElement = element.closest('[class*="widget"], [class*="card"], [class*="section"], [role="region"]') || element;
              extractTextFromElement(parentElement, dataRows);
              foundWidget = true;
            }
          });
        }
        
        // Add separator
        dataRows.push([]);
      });
    } else {
      // Get all text content and table data from dashboard if no specific widgets selected
      extractTextFromElement(dashboardElement, dataRows);
    }

    // Extract table data from dashboard
    const tables = dashboardElement.querySelectorAll('table');
    if (tables.length > 0) {
      dataRows.push(['[Table Data]']);
      dataRows.push([]);
      
      tables.forEach((table, tableIndex) => {
        const rows = table.querySelectorAll('tr');
        rows.forEach((row) => {
          const cells = row.querySelectorAll('td, th');
          const rowData = Array.from(cells).map(cell => cell.innerText || cell.textContent || '');
          if (rowData.some(cell => cell.trim())) {
            dataRows.push(rowData);
          }
        });
        
        if (tableIndex < tables.length - 1) {
          dataRows.push([]); // Spacing between tables
        }
      });
    }
  } catch (error) {
    console.error('Error extracting dashboard data:', error);
  }

  return dataRows.length > 0 ? dataRows : [];
};

// Helper function to extract all text from an element recursively
const extractTextFromElement = (element, dataRows) => {
  if (!element) return;

  try {
    // Get all text nodes including from nested elements
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const textContent = [];
    let node;
    
    while ((node = walker.nextNode())) {
      const text = node.textContent.trim();
      if (text && text.length > 0 && !textContent.includes(text)) {
        textContent.push(text);
      }
    }

    // Add all extracted text to data rows
    textContent.forEach((text) => {
      // Split long text by lines if needed
      if (text.includes('\n')) {
        text.split('\n').forEach((line) => {
          if (line.trim()) {
            dataRows.push([line.trim()]);
          }
        });
      } else {
        dataRows.push([text]);
      }
    });
  } catch (error) {
    console.error('Error extracting text from element:', error);
  }
};

// Get dashboard snapshot for visual export (PDF, PNG)
export const getDashboardSnapshot = (dashboardElement) => {
  if (!dashboardElement) {
    return null;
  }
  
  try {
    // Create a clone of the dashboard element for clean capture
    const clone = dashboardElement.cloneNode(true);
    
    // Create a temporary container
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = dashboardElement.offsetWidth + 'px';
    tempContainer.style.backgroundColor = '#ffffff';
    tempContainer.style.padding = '20px';
    
    tempContainer.appendChild(clone);
    document.body.appendChild(tempContainer);
    
    return { element: tempContainer, cleanup: () => document.body.removeChild(tempContainer) };
  } catch (error) {
    console.error('Error creating dashboard snapshot:', error);
    return null;
  }
};
