import { Icon } from '@iconify/react';
import { Popup } from '@/components/ui/popup';
import { Button } from '@/components/ui/button';
import styles from './styles.module.css';

const TIME_RANGES = [
  { value: '30m', label: 'Last 30 Mins', shortLabel: '30m' },
  { value: '1h', label: 'Last 1 Hour', shortLabel: '1h' },
  { value: '6h', label: 'Last 6 Hours', shortLabel: '6h' },
  { value: '12h', label: 'Last 12 Hours', shortLabel: '12h' },
  { value: '24h', label: 'Last 24 Hours', shortLabel: '24h' },
  { value: '7d', label: 'Last 7 Days', shortLabel: '7d' },
  { value: '30d', label: 'Last 30 Days', shortLabel: '30d' },
];

export const TimeRangeSelector = ({ value, onChange }) => {
  const selectedRange = TIME_RANGES.find((range) => range.value === value);

  return (
    <div className={styles.timeRangeSelector}>
      <Popup
        placement="bottom-end"
        trigger={
          <Button variant="ghost" className={styles.trigger}>
            <span className={styles.triggerLabel}>
              {selectedRange?.shortLabel || '6h'}
            </span>
            <Icon icon="mdi:chevron-down" width={14} height={14} />
          </Button>
        }
        content={
          <div className={styles.dropdown}>
            {TIME_RANGES.map((range) => (
              <Button
                key={range.value}
                variant="ghost"
                className={`${styles.option} ${
                  value === range.value ? styles.optionActive : ''
                }`}
                onClick={() => onChange(range.value)}
              >
                <span className={styles.optionLabel}>{range.label}</span>
                <span className={styles.optionShort}>{range.shortLabel}</span>
              </Button>
            ))}
          </div>
        }
      />
    </div>
  );
};
