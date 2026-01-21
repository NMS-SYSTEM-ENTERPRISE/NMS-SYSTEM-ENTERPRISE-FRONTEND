import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

const TIME_RANGES = [
  { value: '5m', label: 'Last 5 Mins', shortLabel: '5m' },
  { value: '15m', label: 'Last 15 Mins', shortLabel: '15m' },
  { value: '30m', label: 'Last 30 Mins', shortLabel: '30m' },
  { value: '1h', label: 'Last 1 Hour', shortLabel: '1h' },
  { value: '6h', label: 'Last 6 Hours', shortLabel: '6h' },
  { value: '12h', label: 'Last 12 Hours', shortLabel: '12h' },
  { value: '24h', label: 'Last 24 Hours', shortLabel: '24h' },
  { value: '48h', label: 'Last 48 Hours', shortLabel: '48h' },
  { value: 'today', label: 'Today', shortLabel: 'today' },
  { value: '1d', label: 'Last Day', shortLabel: '1d' },
  { value: '1w', label: 'Last Week', shortLabel: '1w' },
  { value: '1mo', label: 'Last Month', shortLabel: '1mo' },
  { value: 'week', label: 'This Week', shortLabel: 'week' },
  { value: 'month', label: 'This Month', shortLabel: 'month' },
  { value: '1q', label: 'Last Quarter', shortLabel: '1q' },
  { value: '1y', label: 'Last Year', shortLabel: '1y' },
  { value: 'custom', label: 'Custom', shortLabel: 'Custom' },
];

export const TimeRangeSelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedRange = TIME_RANGES.find((range) => range.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (rangeValue) => {
    onChange(rangeValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.timeRangeSelector} ref={dropdownRef}>
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.triggerLabel}>
          {selectedRange?.shortLabel || '6h'}
        </span>
        <Icon icon="mdi:chevron-down" width={14} height={14} />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {TIME_RANGES.map((range) => (
            <button
              key={range.value}
              className={`${styles.option} ${
                value === range.value ? styles.optionActive : ''
              }`}
              onClick={() => handleSelect(range.value)}
            >
              <span className={styles.optionLabel}>{range.label}</span>
              <span className={styles.optionShort}>{range.shortLabel}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
