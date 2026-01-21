import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

export const ScheduleModal = ({ profileName, onClose, onSave }) => {
  const [scheduleData, setScheduleData] = useState({
    enabled: true,
    frequency: 'daily',
    time: '02:00',
    dayOfWeek: '1',
    dayOfMonth: '1',
    interval: '6',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    runImmediately: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(scheduleData);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <div>
            <h2 className={styles.modal_title}>Schedule Discovery</h2>
            <p className={styles.modal_subtitle}>{profileName}</p>
          </div>
          <button className={styles.modal_close} onClick={onClose}>
            <Icon icon="mdi:close" width={20} height={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modal_body}>
          <div className={styles.toggleGroup}>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={scheduleData.enabled}
                onChange={(e) =>
                  setScheduleData({
                    ...scheduleData,
                    enabled: e.target.checked,
                  })
                }
              />
              <span>Enable Scheduling</span>
            </label>
          </div>

          {scheduleData.enabled && (
            <>
              <div className={styles.formGroup}>
                <label>Frequency *</label>
                <div className={styles.frequencyButtons}>
                  {['hourly', 'daily', 'weekly', 'monthly'].map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      className={`${styles.freqButton} ${
                        scheduleData.frequency === freq
                          ? styles.freqButton_active
                          : ''
                      }`}
                      onClick={() =>
                        setScheduleData({ ...scheduleData, frequency: freq })
                      }
                    >
                      <Icon icon="mdi:clock-outline" width={16} height={16} />
                      {freq.charAt(0).toUpperCase() + freq.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {scheduleData.frequency === 'hourly' && (
                <div className={styles.formGroup}>
                  <label>Run Every (hours) *</label>
                  <Input
                    type="number"
                    min="1"
                    max="23"
                    value={scheduleData.interval}
                    onChange={(e) =>
                      setScheduleData({
                        ...scheduleData,
                        interval: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              )}

              {(scheduleData.frequency === 'daily' ||
                scheduleData.frequency === 'weekly' ||
                scheduleData.frequency === 'monthly') && (
                <div className={styles.formGroup}>
                  <label>Time *</label>
                  <Input
                    type="time"
                    value={scheduleData.time}
                    onChange={(e) =>
                      setScheduleData({ ...scheduleData, time: e.target.value })
                    }
                    required
                  />
                </div>
              )}

              {scheduleData.frequency === 'weekly' && (
                <div className={styles.formGroup}>
                  <label>Day of Week *</label>
                  <SelectComponent
                    className={styles.select}
                    value={scheduleData.dayOfWeek}
                    onChange={(e) =>
                      setScheduleData({
                        ...scheduleData,
                        dayOfWeek: e.target.value,
                      })
                    }
                    options={[
                      { value: '0', label: 'Sunday' },
                      { value: '1', label: 'Monday' },
                      { value: '2', label: 'Tuesday' },
                      { value: '3', label: 'Wednesday' },
                      { value: '4', label: 'Thursday' },
                      { value: '5', label: 'Friday' },
                      { value: '6', label: 'Saturday' },
                    ]}
                    placeholder="Select day"
                  />
                </div>
              )}

              {scheduleData.frequency === 'monthly' && (
                <div className={styles.formGroup}>
                  <label>Day of Month *</label>
                  <Input
                    type="number"
                    min="1"
                    max="31"
                    value={scheduleData.dayOfMonth}
                    onChange={(e) =>
                      setScheduleData({
                        ...scheduleData,
                        dayOfMonth: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              )}

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>
                    <Icon icon="mdi:calendar" width={14} height={14} style={{ marginRight: '4px' }} />
                    Start Date *
                  </label>
                  <Input
                    type="date"
                    value={scheduleData.startDate}
                    onChange={(e) =>
                      setScheduleData({
                        ...scheduleData,
                        startDate: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>
                    <Icon icon="mdi:calendar" width={14} height={14} style={{ marginRight: '4px' }} />
                    End Date (optional)
                  </label>
                  <Input
                    type="date"
                    value={scheduleData.endDate}
                    onChange={(e) =>
                      setScheduleData({
                        ...scheduleData,
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className={styles.summaryBox}>
                <h4>Schedule Summary</h4>
                <p>
                  {scheduleData.frequency === 'hourly' &&
                    `Runs every ${scheduleData.interval} hour(s)`}
                  {scheduleData.frequency === 'daily' &&
                    `Runs daily at ${scheduleData.time}`}
                  {scheduleData.frequency === 'weekly' &&
                    `Runs weekly on ${
                      [
                        'Sunday',
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                      ][parseInt(scheduleData.dayOfWeek)]
                    } at ${scheduleData.time}`}
                  {scheduleData.frequency === 'monthly' &&
                    `Runs monthly on day ${scheduleData.dayOfMonth} at ${scheduleData.time}`}
                </p>
                <p className={styles.summaryDates}>
                  Starting from {scheduleData.startDate}
                  {scheduleData.endDate && ` until ${scheduleData.endDate}`}
                </p>
              </div>

              <div className={styles.toggleGroup}>
                <label className={styles.toggleLabel}>
                  <input
                    type="checkbox"
                    checked={scheduleData.runImmediately}
                    onChange={(e) =>
                      setScheduleData({
                        ...scheduleData,
                        runImmediately: e.target.checked,
                      })
                    }
                  />
                  <span>Run immediately after saving</span>
                </label>
              </div>
            </>
          )}

          <div className={styles.modal_footer}>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Schedule</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
