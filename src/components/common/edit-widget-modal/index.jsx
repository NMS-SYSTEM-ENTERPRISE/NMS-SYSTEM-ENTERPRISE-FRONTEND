import { useState } from 'react';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

const EditWidgetModal = ({ onClose, initialData = {} }) => {
  const [config, setConfig] = useState({
    text: initialData.text || 'CPU Widgets',
    fontSize: initialData.fontSize || '88px',
    fontColor: initialData.fontColor || 'Green',
    textAlign: initialData.textAlign || 'center',
  });

  const fontSizes = [
    '12px',
    '16px',
    '20px',
    '24px',
    '32px',
    '40px',
    '48px',
    '56px',
    '64px',
    '72px',
    '80px',
    '88px',
    '96px',
    '104px',
    '112px',
  ];

  const fontColors = [
    'White',
    'Black',
    'Green',
    'Blue',
    'Red',
    'Yellow',
    'Orange',
    'Purple',
    'Cyan',
    'Gray',
  ];

  const getColorValue = (colorName) => {
    const colorMap = {
      White: '#ffffff',
      Black: '#000000',
      Green: '#84cc16',
      Blue: '#3b82f6',
      Red: '#ef4444',
      Yellow: '#fbbf24',
      Orange: '#f97316',
      Purple: '#8b5cf6',
      Cyan: '#06b6d4',
      Gray: '#6b7280',
    };
    return colorMap[colorName] || '#84cc16';
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Edit Widget</h3>
          <Icon icon="mdi:close" width={20} height={20} className={styles.closeButton} onClick={onClose} />
        </div>

        <div className={styles.modalContent}>
          {/* Preview */}
          <div className={styles.previewArea}>
            <div
              className={styles.previewText}
              style={{
                fontSize: config.fontSize,
                color: getColorValue(config.fontColor),
                textAlign: config.textAlign,
              }}
            >
              {config.text}
            </div>
          </div>

          {/* Configuration */}
          <div className={styles.configArea}>
            <div className={styles.formGroup}>
              <label>
                Text to display <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                value={config.text}
                onChange={(e) => setConfig({ ...config, text: e.target.value })}
                placeholder="Enter text"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Font Size</label>
              <SelectComponent
                value={config.fontSize}
                onChange={(e) =>
                  setConfig({ ...config, fontSize: e.target.value })
                }
                options={fontSizes.map((size) => ({
                  value: size,
                  label: size,
                }))}
                placeholder="Select font size"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Font Color</label>
              <SelectComponent
                value={config.fontColor}
                onChange={(e) =>
                  setConfig({ ...config, fontColor: e.target.value })
                }
                options={fontColors.map((color) => ({
                  value: color,
                  label: color,
                }))}
                placeholder="Select font color"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Text Align</label>
              <div className={styles.alignButtons}>
                <button
                  className={`${styles.alignBtn} ${
                    config.textAlign === 'left' ? styles.alignBtnActive : ''
                  }`}
                  onClick={() => setConfig({ ...config, textAlign: 'left' })}
                >
                  <Icon icon="mdi:format-align-left" width={20} height={20} />
                </button>
                <button
                  className={`${styles.alignBtn} ${
                    config.textAlign === 'center' ? styles.alignBtnActive : ''
                  }`}
                  onClick={() => setConfig({ ...config, textAlign: 'center' })}
                >
                  <Icon icon="mdi:format-align-center" width={20} height={20} />
                </button>
                <button
                  className={`${styles.alignBtn} ${
                    config.textAlign === 'right' ? styles.alignBtnActive : ''
                  }`}
                  onClick={() => setConfig({ ...config, textAlign: 'right' })}
                >
                  <Icon icon="mdi:format-align-right" width={20} height={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWidgetModal;
