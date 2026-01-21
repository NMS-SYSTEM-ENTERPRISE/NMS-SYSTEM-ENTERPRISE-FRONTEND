import { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import 'react-day-picker/style.css';
import styles from './styles.module.css';

export const MultiDateTimePicker = ({ onClose, onApply }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('23:59');
  const [mode, setMode] = useState('range'); // 'single', 'multiple', 'range'
  const [rangeDate, setRangeDate] = useState(undefined);
  const popupRef = useRef(null);

  // Quick select options
  const quickSelects = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 Days', value: 'last7days' },
    { label: 'Last 30 Days', value: 'last30days' },
    { label: 'This Month', value: 'thisMonth' },
    { label: 'Last Month', value: 'lastMonth' },
  ];

  const handleQuickSelect = (value) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    switch (value) {
      case 'today':
        setMode('single');
        setSelectedDates([today]);
        break;
      case 'yesterday':
        setMode('single');
        setSelectedDates([yesterday]);
        break;
      case 'last7days': {
        const last7Days = new Date(today);
        last7Days.setDate(last7Days.getDate() - 7);
        setMode('range');
        setRangeDate({ from: last7Days, to: today });
        break;
      }
      case 'last30days': {
        const last30Days = new Date(today);
        last30Days.setDate(last30Days.getDate() - 30);
        setMode('range');
        setRangeDate({ from: last30Days, to: today });
        break;
      }
      case 'thisMonth': {
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        setMode('range');
        setRangeDate({ from: firstDay, to: today });
        break;
      }
      case 'lastMonth': {
        const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);
        setMode('range');
        setRangeDate({ from: firstDay, to: lastDay });
        break;
      }
      default:
        break;
    }
  };

  const handleApply = () => {
    const result = {
      mode,
      dates: mode === 'range' ? rangeDate : selectedDates,
      startTime,
      endTime,
    };
    onApply?.(result);
    onClose?.();
  };

  const handleReset = () => {
    setSelectedDates([]);
    setRangeDate(undefined);
    setStartTime('00:00');
    setEndTime('23:59');
  };

  const formatSelectedDates = () => {
    if (mode === 'range' && rangeDate?.from) {
      const fromStr = format(rangeDate.from, 'MMM dd, yyyy');
      const toStr = rangeDate.to ? format(rangeDate.to, 'MMM dd, yyyy') : '...';
      return `${fromStr} - ${toStr}`;
    }
    if (mode === 'single' && selectedDates.length > 0) {
      return format(selectedDates[0], 'MMM dd, yyyy');
    }
    if (mode === 'multiple' && selectedDates.length > 0) {
      return `${selectedDates.length} date(s) selected`;
    }
    return 'No dates selected';
  };

  // Generate time options
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(timeStr);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className={styles.multiDateTimePicker} ref={popupRef}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <Icon icon="mdi:calendar-clock" width={20} height={20} />
          <span>Select Date & Time</span>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <Icon icon="mdi:close" width={18} height={18} />
        </button>
      </div>

      <div className={styles.content}>
        {/* Mode Selector */}
        <div className={styles.modeSelector}>
          <button
            className={clsx(styles.modeButton, mode === 'single' && styles.active)}
            onClick={() => {
              setMode('single');
              setRangeDate(undefined);
            }}
          >
            <Icon icon="mdi:calendar-today" width={16} height={16} />
            Single
          </button>
          <button
            className={clsx(styles.modeButton, mode === 'multiple' && styles.active)}
            onClick={() => {
              setMode('multiple');
              setRangeDate(undefined);
            }}
          >
            <Icon icon="mdi:calendar-multiple" width={16} height={16} />
            Multiple
          </button>
          <button
            className={clsx(styles.modeButton, mode === 'range' && styles.active)}
            onClick={() => {
              setMode('range');
              setSelectedDates([]);
            }}
          >
            <Icon icon="mdi:calendar-range" width={16} height={16} />
            Range
          </button>
        </div>

        <div className={styles.mainContent}>
          {/* Quick Select Sidebar */}
          <div className={styles.quickSelectSidebar}>
            <div className={styles.sidebarTitle}>Quick Select</div>
            {quickSelects.map((option) => (
              <button
                key={option.value}
                className={styles.quickSelectButton}
                onClick={() => handleQuickSelect(option.value)}
              >
                <Icon icon="mdi:clock-fast" width={14} height={14} />
                {option.label}
              </button>
            ))}
          </div>

          {/* Calendar */}
          <div className={styles.calendarWrapper}>
            {mode === 'range' ? (
              <DayPicker
                mode="range"
                selected={rangeDate}
                onSelect={setRangeDate}
                numberOfMonths={1}
                className={styles.calendar}
                showOutsideDays
              />
            ) : mode === 'multiple' ? (
              <DayPicker
                mode="multiple"
                selected={selectedDates}
                onSelect={setSelectedDates}
                numberOfMonths={1}
                className={styles.calendar}
                showOutsideDays
              />
            ) : (
              <DayPicker
                mode="single"
                selected={selectedDates[0]}
                onSelect={(date) => setSelectedDates(date ? [date] : [])}
                numberOfMonths={1}
                className={styles.calendar}
                showOutsideDays
              />
            )}
          </div>
        </div>

        {/* Time Selection */}
        <div className={styles.timeSection}>
          <div className={styles.timeSectionTitle}>
            <Icon icon="mdi:clock-outline" width={16} height={16} />
            Time Range
          </div>
          <div className={styles.timeInputs}>
            <div className={styles.timeInput}>
              <label>Start Time</label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={styles.timeSelect}
              >
                {timeOptions.map((time) => (
                  <option key={`start-${time}`} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.timeSeparator}>
              <Icon icon="mdi:arrow-right" width={16} height={16} />
            </div>
            <div className={styles.timeInput}>
              <label>End Time</label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={styles.timeSelect}
              >
                {timeOptions.map((time) => (
                  <option key={`end-${time}`} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Selected Summary */}
        <div className={styles.summary}>
          <div className={styles.summaryLabel}>Selected Date Range</div>
          <div className={styles.summaryValue}>{formatSelectedDates()}</div>
          <div className={styles.summaryTime}>
            <Icon icon="mdi:clock-outline" width={14} height={14} />
            {startTime} - {endTime}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className={styles.footer}>
        <button className={styles.resetButton} onClick={handleReset}>
          <Icon icon="mdi:refresh" width={16} height={16} />
          Reset
        </button>
        <div className={styles.footerActions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.applyButton} onClick={handleApply}>
            <Icon icon="mdi:check" width={16} height={16} />
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

