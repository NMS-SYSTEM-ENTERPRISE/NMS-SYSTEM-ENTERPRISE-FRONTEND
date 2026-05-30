import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { Modal } from '@/components/ui/modal';
import styles from './styles.module.css';

export const CsvUploader = ({ file, onFileChange, error }) => {
  const fileInputRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [previewHeaders, setPreviewHeaders] = useState([]);

  const handlePreview = () => {
    if (!file || !file.size) return; // Cannot preview remote files easily without fetching
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').filter(line => line.trim());
      if (lines.length > 0) {
        const headers = lines[0].split(',').map(h => h.trim());
        const data = lines.slice(1, 11).map(line => line.split(',').map(c => c.trim())); // Preview first 10 rows
        setPreviewHeaders(headers);
        setPreviewData(data);
        setShowPreview(true);
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith('.csv')) {
        onFileChange(droppedFile);
      }
    }
  };

  return (
    <div className={styles.formGroup}>
      <label>CSV File *</label>
      <div
        className={`${styles.csvDropzone} ${error ? styles.hasError : ''}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              onFileChange(e.target.files[0]);
            }
          }}
        />

        {file ? (
          <div className={styles.csvPreview}>
            <Icon icon="mdi:file-delimited-outline" width={32} height={32} className={styles.csvIcon} />
            <div className={styles.csvDetails}>
              <span className={styles.csvName}>{file.name}</span>
              <span className={styles.csvSize}>{file.size ? (file.size / 1024).toFixed(2) + ' KB' : 'Remote File'}</span>
            </div>
            <div className={styles.csvActions}>
              <button
                type="button"
                className={styles.csvPreviewBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreview();
                }}
                title="Preview CSV"
              >
                <Icon icon="mdi:eye" width={18} height={18} />
              </button>
              <button
                type="button"
                className={styles.csvChangeBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                Change
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.csvPlaceholder}>
            <Icon icon="mdi:cloud-upload-outline" width={32} height={32} />
            <p>Click or drag and drop to upload CSV</p>
            <span className={styles.helpText}>Only .csv files are supported</span>
          </div>
        )}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}

      {showPreview && (
        <Modal isOpen onClose={() => setShowPreview(false)} className={styles.previewModal}>
          <div className={styles.previewModalHeader}>
            <h3 className={styles.previewModalTitle}>CSV Preview ({file?.name})</h3>
            <button className={styles.previewModalClose} onClick={() => setShowPreview(false)}>
              <Icon icon="mdi:close" width={20} height={20} />
            </button>
          </div>
          <div className={styles.previewModalContent}>
            {previewHeaders.length > 0 ? (
              <div className={styles.previewTableWrapper}>
                <table className={styles.previewTable}>
                  <thead>
                    <tr>
                      {previewHeaders.map((header, idx) => (
                        <th key={idx}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {row.map((cell, colIdx) => (
                          <td key={colIdx}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className={styles.previewEmpty}>No data could be parsed.</div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
