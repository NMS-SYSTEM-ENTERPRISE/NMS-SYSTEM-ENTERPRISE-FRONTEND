import { useState } from 'react';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

const ScheduleMaintenanceModal = ({ monitor, onClose, onSchedule }) => {
  const [formData, setFormData] = useState({
    onMaintenanceDate: '26/04/2023',
    onMaintenanceHours: '',
    offMaintenanceDate: '27/04/2023',
    offMaintenanceHours: '',
    schedulerType: 'Once',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSchedule = (e) => {
    e.preventDefault();
    onSchedule(formData);
  };

  const handleReset = () => {
    setFormData({
      onMaintenanceDate: '',
      onMaintenanceHours: '',
      offMaintenanceDate: '',
      offMaintenanceHours: '',
      schedulerType: 'Once',
    });
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.title}>
            {monitor?.ip || monitor?.name} Schedule Maintenance
          </h3>
          <Icon icon="mdi:close" width={20} height={20} className={styles.closeButton} onClick={onClose} />
        </div>

        <form onSubmit={handleSchedule} className={styles.modalBody}>
          {/* On Maintenance Section */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>On Maintenance</h4>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>
                  Start Date <span className={styles.required}>*</span>
                </label>
                <input
                  type="date"
                  value={formData.onMaintenanceDate}
                  onChange={(e) =>
                    handleInputChange('onMaintenanceDate', e.target.value)
                  }
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  Hours <span className={styles.required}>*</span>
                </label>
                <SelectComponent
                  value={formData.onMaintenanceHours}
                  onChange={(e) =>
                    handleInputChange('onMaintenanceHours', e.target.value)
                  }
                  options={[
                    { value: '', label: 'Select' },
                    ...Array.from({ length: 24 }, (_, i) => ({
                      value: i,
                      label: `${i.toString().padStart(2, '0')}:00`,
                    })),
                  ]}
                  placeholder="Select"
                />
              </div>
            </div>
          </div>

          {/* Off Maintenance Section */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Off Maintenance</h4>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>
                  Start Date <span className={styles.required}>*</span>
                </label>
                <input
                  type="date"
                  value={formData.offMaintenanceDate}
                  onChange={(e) =>
                    handleInputChange('offMaintenanceDate', e.target.value)
                  }
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  Hours <span className={styles.required}>*</span>
                </label>
                <SelectComponent
                  value={formData.offMaintenanceHours}
                  onChange={(e) =>
                    handleInputChange('offMaintenanceHours', e.target.value)
                  }
                  options={[
                    { value: '', label: 'Select' },
                    ...Array.from({ length: 24 }, (_, i) => ({
                      value: i,
                      label: `${i.toString().padStart(2, '0')}:00`,
                    })),
                  ]}
                  placeholder="Select"
                />
              </div>
            </div>
          </div>

          {/* Scheduler Type */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Scheduler Type</h4>

            <div className={styles.schedulerTypes}>
              {['Once', 'Daily', 'Weekly', 'Monthly'].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`${styles.typeBtn} ${
                    formData.schedulerType === type ? styles.typeBtnActive : ''
                  }`}
                  onClick={() => handleInputChange('schedulerType', type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={handleReset}
            >
              Reset
            </button>
            <button type="submit" className={styles.scheduleBtn}>
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleMaintenanceModal;
