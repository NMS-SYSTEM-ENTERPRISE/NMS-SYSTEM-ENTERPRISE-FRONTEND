import { Icon } from '@iconify/react';
import { useRef } from 'react';
import styles from './styles.module.css';

export const CsvUploader = ({ file, onFileChange, error }) => {
  const fileInputRef = useRef(null);

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
              <span className={styles.csvSize}>{(file.size / 1024).toFixed(2)} KB</span>
            </div>
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
        ) : (
          <div className={styles.csvPlaceholder}>
            <Icon icon="mdi:cloud-upload-outline" width={32} height={32} />
            <p>Click or drag and drop to upload CSV</p>
            <span className={styles.helpText}>Only .csv files are supported</span>
          </div>
        )}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
