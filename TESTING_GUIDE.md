# Download Feature - Step-by-Step Testing Guide

## 🧪 How to Test the Download Feature Properly

### Prerequisites
- Browser DevTools open (F12)
- "Downloads" folder visible or Downloads panel in browser open
- Dashboard page loaded and data visible

---

## Test 1: Export Button Location & Visibility

**Objective**: Verify the export button is in the right place

1. **Look at the Header**
   - Location: Top-right area of the page header
   - Next to: User profile button
   - Icon: Three vertical dots (⋮)
   - Expected: Button should be visible and accessible

2. **Hover over the button**
   - Expected: Slight hover effect (background change)
   - Tooltip: "More actions" appears

3. **Visual Check**
   - Button size: ~20px square
   - Color: Matches header theme
   - Alignment: Properly aligned with user profile button

**Pass/Fail**: ✅ Pass if button is visible and in header

---

## Test 2: Export Panel Open/Close

**Objective**: Verify panel opens and closes properly

1. **Click the three dots icon**
   - Watch for: Panel slides in from RIGHT side
   - Z-index: Panel should appear ABOVE everything
   - Speed: Should animate smoothly (0.3 seconds)
   - Width: Should be ~420px (or full screen on mobile)
   - Height: Should extend from top to bottom of page

2. **Panel Content Check**
   - Title: "Export dashboard content"
   - Subtitle: "Choose widgets and format to generate a clean export package."
   - Close button: X button in top-right of panel
   - Sections: "Download format", "Widgets to export"

3. **Close panel by clicking X**
   - Expected: Panel slides back to right
   - Speed: 0.3 seconds smooth animation
   - Dashboard: Should return to normal view

4. **Close panel by clicking overlay (background)**
   - Expected: Same smooth slide-out behavior
   - Overlay should disappear

5. **Re-open panel**
   - Expected: All selections should be reset (defaults applied)
   - PNG format selected
   - All widgets selected

**Pass/Fail**: ✅ Pass if panel opens/closes smoothly with animations

---

## Test 3: Format Selection

**Objective**: Verify all 4 export formats are available and selectable

1. **View Format Options**
   - PNG: Radio button + label
   - CSV: Radio button + label
   - XLSX: Radio button + label
   - PDF (Landscape): Radio button + label
   - Arrangement: 2x2 grid layout

2. **Select PNG Format**
   - Click PNG radio button
   - Expected: Radio button marked
   - Color: Background changes slightly to show selection

3. **Select CSV Format**
   - Click CSV radio button
   - Expected: CSV now selected, PNG deselected
   - Status: Panel updates (if any)

4. **Select XLSX Format**
   - Click XLSX radio button
   - Expected: XLSX now selected

5. **Select PDF Format**
   - Click PDF (Landscape) radio button
   - Expected: PDF now selected
   - Label: Should show "PDF (Landscape)" not just "PDF"

6. **Cycle Through All Formats**
   - Select each format in sequence
   - Expected: Only one format selected at a time
   - All options work without errors

**Pass/Fail**: ✅ Pass if all 4 formats selectable and appear correct

---

## Test 4: Widget Selection

**Objective**: Verify widget list and selection controls

1. **View Widget List**
   - Count: Should show ~7-10 widgets (depending on dashboard)
   - Widgets: Infrastructure summary, CPU performance, Memory, Network, Storage, Traffic, Health, etc.
   - Each has checkbox and label

2. **Verify "Select All" Button**
   - Location: Top-right of "Widgets to export" section
   - Click "Select all"
   - Expected: All checkboxes marked
   - Count: All widget checkboxes should show ✓

3. **Verify "Clear" Button**
   - Location: Next to "Select all"
   - Click "Clear"
   - Expected: All checkboxes unchecked
   - Count: No checkboxes marked

4. **Individual Widget Toggle**
   - Click checkbox for first widget
   - Expected: Checkbox marks/unmarks
   - Behavior: Can toggle any widget individually

5. **Mixed Selection**
   - Select some widgets (e.g., 3 out of 7)
   - Expected: Only selected ones are marked
   - Flexibility: Can have any combination

6. **Select All Again**
   - After partial selection, click "Select all"
   - Expected: All widgets immediately marked

**Pass/Fail**: ✅ Pass if all selection controls work independently

---

## Test 5: Download Button - PNG Format

**Objective**: Test PNG export download works

1. **Setup**
   - Select PNG format
   - Keep "Select all" (all widgets checked)
   - Status message: "Select the widgets and format, then click Download."

2. **Click Download Button**
   - Location: Bottom of export panel
   - Label: "Download export" with download icon
   - Cursor: Should change to pointer on hover

3. **During Processing**
   - Expected: Button text changes to "Preparing..."
   - Expected: Button becomes disabled
   - Status message changes to: "Generating export..."
   - Processing time: Should complete in 1-3 seconds

4. **After Download Initiates**
   - Expected: Browser download prompt or automatic download
   - Expected: Status message: "Export completed successfully."
   - Expected: Panel closes automatically

5. **File Verification**
   - Check Downloads folder
   - Filename format: `{screen_name}_{timestamp}.png`
   - Example: `control_center_2025-06-08T14-30-45-123Z.png`
   - File size: Should be reasonable (50KB - 2MB depending on dashboard)
   - File exists: Can be opened in image viewer

6. **Image Content Check**
   - Open PNG file in image viewer
   - Expected: PNG shows the dashboard/widgets
   - Quality: Should be high resolution (2x scale)
   - Content: Should include all selected widgets

**Pass/Fail**: ✅ Pass if PNG downloads and opens correctly

---

## Test 6: Download Button - CSV Format

**Objective**: Test CSV export download works

1. **Setup**
   - Select CSV format
   - Select 3-4 widgets (partial selection)
   - Note: CSV shows export metadata, not visual content

2. **Click Download Button**
   - Expected: "Preparing..." state
   - Processing: Should be very fast (<1 second)

3. **File Check**
   - Check Downloads folder
   - Filename: `{screen_name}_{timestamp}.csv`
   - File opens in: Excel, Google Sheets, Text Editor

4. **CSV Content Verification**
   - Open CSV file in text editor
   - Expected rows:
     - Row 1: "SNR Edatas" (watermark)
     - Row 2: "Report", "{screen name}"
     - Row 3: "Exported", "{current date/time}"
     - Row 4: "Widgets", "{selected widget names}"
     - Row 5: Empty line
   - Special characters: Quotes should be escaped correctly
   - Commas: Should separate values properly

5. **CSV in Spreadsheet**
   - Open in Excel/Google Sheets
   - Expected: Data properly formatted in columns
   - Column headers: Present and readable

**Pass/Fail**: ✅ Pass if CSV downloads and content is correct

---

## Test 7: Download Button - XLSX Format

**Objective**: Test XLSX (Excel) export works

1. **Setup**
   - Select XLSX format
   - Select all widgets

2. **Click Download Button**
   - Expected: Processing time ~1-2 seconds
   - Button states: "Preparing..." during processing

3. **File Check**
   - Downloads folder: Should have `.xlsx` file
   - Filename: `{screen_name}_{timestamp}.xlsx`
   - File opens in: Excel, Google Sheets, Numbers

4. **XLSX Content Verification**
   - Open in Excel
   - Expected: "Report" sheet created
   - Content: Same metadata as CSV but in Excel format
   - Formatting: Column widths set appropriately (32, 90)
   - Columns: Auto-sized to fit content

5. **Excel Features Check**
   - Expected: Proper cells/rows/columns
   - Formulas: None (data only)
   - Styling: Basic, clean formatting

**Pass/Fail**: ✅ Pass if XLSX downloads and opens in Excel

---

## Test 8: Download Button - PDF Format (Critical Test)

**Objective**: Test PDF export with landscape orientation

1. **Setup**
   - Select PDF (Landscape) format
   - Keep selected widgets
   - Important: This is visual capture, may take longer

2. **Click Download Button**
   - Expected: "Preparing..." state
   - Processing: 2-5 seconds (html2canvas conversion takes time)
   - Status updates: Should show "Generating export..."

3. **Browser Activity**
   - DevTools Console: Check for errors (should be none)
   - Network: No network requests (client-side only)

4. **File Check**
   - Downloads folder: Should have `.pdf` file
   - Filename: `{screen_name}_{timestamp}.pdf`
   - Size: Typically 100KB - 5MB depending on content

5. **PDF Content Verification**
   - Open PDF file
   - Orientation: Should be LANDSCAPE (wider than tall)
   - Size: A4 landscape format
   - Content: Dashboard/widgets visible
   - Quality: Should be clear and readable

6. **Content Check**
   - Expected visual elements: Charts, tables, metrics
   - Logo: Should include export logo/branding
   - Watermark: Should include watermark element
   - Layout: Should fit content without cutting off

**Pass/Fail**: ✅ Pass if PDF is landscape and content is visible

---

## Test 9: Error Handling - No Widgets Selected

**Objective**: Verify proper error when no widgets selected

1. **Setup**
   - Click "Clear" to unselect all widgets
   - Count: 0 widgets selected
   - All checkboxes: Unchecked

2. **Try to Download**
   - Click "Download export" button
   - Expected behavior: Button should be DISABLED (grayed out)
   - Alternative: Click should show error

3. **Error Message Check**
   - Status message: "Please select at least one widget to export."
   - Panel: Should remain open
   - Button: Should not attempt download

4. **Fix Error**
   - Click "Select all" to enable widgets
   - Status resets: "Select the widgets and format, then click Download."
   - Button: Becomes enabled again

**Pass/Fail**: ✅ Pass if error handled gracefully

---

## Test 10: Panel Z-Index - Above All Content

**Objective**: Verify export panel appears above all other UI elements

1. **Verify Panel Appears Above**
   - Chatbot widget (if present): Panel should cover it
   - User profile panel: Panel should cover it
   - Any overlays: Panel should be on top
   - Z-index should be 10001

2. **Click Elements Inside Panel**
   - Format buttons: Should respond
   - Widget checkboxes: Should respond
   - Download button: Should respond
   - Close button: Should respond
   - Expected: No interference from background elements

3. **Overlay Effectiveness**
   - Overlay background: Should dim content behind it
   - Overlay background z-index: 10000
   - Dashboard behind: Should be visible but dimmed (45% opacity)

**Pass/Fail**: ✅ Pass if panel is always on top and clickable

---

## Test 11: Multiple Downloads in Sequence

**Objective**: Verify system can handle multiple exports without issues

1. **First Export**
   - Select PNG, all widgets
   - Download
   - Wait for completion

2. **Immediately Open Panel Again**
   - Click three dots icon
   - Expected: Panel opens normally
   - State: All selections reset to defaults

3. **Second Export - Different Format**
   - Select CSV, partial widgets
   - Download
   - Verify file generated

4. **Third Export - Different Format**
   - Select XLSX
   - Download
   - Verify file generated

5. **Fourth Export - PDF**
   - Select PDF format
   - Download
   - Verify file generated

6. **Files Check**
   - All 4 files in Downloads folder
   - All with correct names and formats
   - All with different timestamps
   - All files valid and openable

**Pass/Fail**: ✅ Pass if multiple exports work sequentially

---

## Test 12: Responsive Design (Mobile)

**Objective**: Verify export panel works on mobile devices

1. **Resize Browser to Mobile**
   - Width: 375px (iPhone)
   - Expected: Panel width adjusts to `min(420px, 100%)`

2. **Export Button**
   - Location: Still visible in header
   - Clickable: Should work with touch

3. **Panel on Mobile**
   - Expected: Panel width becomes full screen (375px)
   - Height: Full screen height (100vh)
   - Content: Should be scrollable if needed

4. **Touch Interactions**
   - Click format options: Should work
   - Tap checkboxes: Should work
   - Tap download button: Should work

**Pass/Fail**: ✅ Pass if panel is usable on mobile

---

## Test 13: Browser Compatibility

**Objective**: Verify works across different browsers

Test on each browser:
- [ ] **Chrome**: DevTools → check console for errors
- [ ] **Firefox**: Should work identically
- [ ] **Safari**: Download behavior (may prompt)
- [ ] **Edge**: Should work like Chrome

For each browser:
1. Open export panel
2. Select format and widgets
3. Download
4. Verify file received
5. Open file to verify content

**Pass/Fail**: ✅ Pass if works on all major browsers

---

## Test 14: Console & Error Checking

**Objective**: Verify no errors in browser console

1. **Open DevTools** (F12)
2. **Click to DevTools Console**
3. **Trigger Export**
   - Click three dots icon
   - Select format and widgets
   - Click download
4. **Check Console**
   - Expected: No red error messages
   - Expected: No warnings related to export
   - Allowed: Info messages from app

5. **Specific Error Checks**
   - "Failed to load jsPDF": Would indicate PDF problem
   - "Cannot read property": Would indicate code issue
   - "CORS error": Would indicate resource issue
   - None of above should appear

**Pass/Fail**: ✅ Pass if no errors in console

---

## Quick Test Checklist (5-Minute Version)

- [ ] Icon visible in header
- [ ] Panel opens with animation
- [ ] Panel closes with animation
- [ ] All 4 formats available
- [ ] "Select all" / "Clear" buttons work
- [ ] Download button works for PNG
- [ ] PNG file appears in Downloads
- [ ] PNG file opens correctly
- [ ] No errors in console
- [ ] Panel can be opened again

---

## Expected Filenames for Testing

When you complete all 4 format downloads:
```
Downloads/
├── control_center_2025-06-08T14-30-45-123Z.png
├── control_center_2025-06-08T14-30-46-456Z.csv
├── control_center_2025-06-08T14-30-47-789Z.xlsx
└── control_center_2025-06-08T14-30-48-012Z.pdf
```

---

## Troubleshooting During Testing

### Issue: Icon doesn't appear
- Check: Header component is rendered
- Fix: Reload page, clear browser cache

### Issue: Panel doesn't open
- Check: Click event handler (DevTools)
- Check: Export context provider exists
- Fix: Check browser console for errors

### Issue: Download doesn't start
- Check: Browser download settings
- Check: DevTools Network tab for requests
- Check: File might be downloading but blocked

### Issue: File is corrupted
- Check: File size (should be reasonable)
- Check: File extension (PNG, CSV, etc.)
- Fix: Clear cache and try again

### Issue: PDF is blank
- Check: Preview element has content
- Check: html2canvas can capture element
- Fix: Check for CORS issues on images

---

## Success Criteria - All Must Pass

✅ Button visible in header  
✅ Panel opens/closes smoothly  
✅ All formats selectable  
✅ Widget selection works  
✅ PNG downloads and opens  
✅ CSV downloads with correct format  
✅ XLSX downloads and opens in Excel  
✅ PDF downloads with landscape orientation  
✅ Error handling works (no widgets = error)  
✅ No console errors  
✅ Multiple downloads work  
✅ Mobile responsive  
✅ Works on multiple browsers  

If all above pass: **Export feature is working correctly! ✅**
