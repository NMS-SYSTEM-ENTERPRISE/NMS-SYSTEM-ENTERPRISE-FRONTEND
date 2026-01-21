import { useState } from 'react';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

const ColumnConfigModal = ({ columnName, onClose, onUpdate }) => {
  const [config, setConfig] = useState({
    resizable: true,
    sortable: true,
    orderable: true,
    width: 0,
    colorConfigs: [],
    valueConfigs: [],
    icon: 'Select',
    iconPosition: 'left',
  });

  const handleToggle = (field) => {
    setConfig((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleUpdate = () => {
    onUpdate(config);
    onClose();
  };

  const handleReset = () => {
    setConfig({
      resizable: true,
      sortable: true,
      orderable: true,
      width: 0,
      colorConfigs: [],
      valueConfigs: [],
      icon: 'Select',
      iconPosition: 'left',
    });
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{columnName}</h3>
          <Icon icon="mdi:close" width={20} height={20} className={styles.closeButton} onClick={onClose} />
        </div>

        <div className={styles.modalBody}>
          {/* Basic Configurations */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Basic Configurations</h4>
            <div className={styles.configRow}>
              <div className={styles.configItem}>
                <span>Resizable</span>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={config.resizable}
                    onChange={() => handleToggle('resizable')}
                  />
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>
                    {config.resizable ? 'ON' : 'OFF'}
                  </span>
                </label>
              </div>

              <div className={styles.configItem}>
                <span>Sortable</span>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={config.sortable}
                    onChange={() => handleToggle('sortable')}
                  />
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>
                    {config.sortable ? 'ON' : 'OFF'}
                  </span>
                </label>
              </div>

              <div className={styles.configItem}>
                <span>Orderable</span>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={config.orderable}
                    onChange={() => handleToggle('orderable')}
                  />
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>
                    {config.orderable ? 'ON' : 'OFF'}
                  </span>
                </label>
              </div>

              <div className={styles.configItem}>
                <span>Width (%)</span>
                <input
                  type="number"
                  value={config.width}
                  onChange={(e) =>
                    setConfig({ ...config, width: e.target.value })
                  }
                  className={styles.widthInput}
                />
              </div>
            </div>
          </div>

          {/* Color Configurations */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Color Configurations</h4>
            <button className={styles.addButton}>
              <span className={styles.addIcon}>⊕</span> Add Color Configuration
            </button>
          </div>

          {/* Value Configuration */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Value Configuration</h4>
            <button className={styles.addButton}>
              <span className={styles.addIcon}>⊕</span> Add Value Configuration
            </button>
          </div>

          {/* Icon */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Icon</h4>
            <div className={styles.iconConfig}>
              <div className={styles.iconField}>
                <label>Icon</label>
                <SelectComponent
                  value={config.icon}
                  onChange={(e) =>
                    setConfig({ ...config, icon: e.target.value })
                  }
                  options={[
                    { value: 'Select', label: 'Select' },
                    { value: 'check', label: 'Check' },
                    { value: 'cross', label: 'Cross' },
                    { value: 'warning', label: 'Warning' },
                  ]}
                  placeholder="Select icon"
                />
              </div>

              <div className={styles.iconField}>
                <label>Icon Position</label>
                <div className={styles.iconPositionButtons}>
                  <button
                    className={`${styles.positionBtn} ${
                      config.iconPosition === 'left'
                        ? styles.positionBtnActive
                        : ''
                    }`}
                    onClick={() =>
                      setConfig({ ...config, iconPosition: 'left' })
                    }
                  >
                    <Icon icon="mdi:arrow-left" width={16} height={16} />
                  </button>
                  <button
                    className={`${styles.positionBtn} ${
                      config.iconPosition === 'right'
                        ? styles.positionBtnActive
                        : ''
                    }`}
                    onClick={() =>
                      setConfig({ ...config, iconPosition: 'right' })
                    }
                  >
                    <Icon icon="mdi:arrow-right" width={16} height={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.resetBtn} onClick={handleReset}>
            Reset
          </button>
          <button className={styles.updateBtn} onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColumnConfigModal;
