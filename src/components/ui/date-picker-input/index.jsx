import { format, parseISO, isValid } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { Icon } from '@iconify/react';
import { Popup } from '@/components/ui/popup';
import { Input } from '@/components/ui/input';
import styles from './styles.module.css';

export const DatePickerInput = ({ value, onChange, placeholder = 'dd/mm/yyyy', required = false }) => {
  const selectedDate = value ? (isValid(parseISO(value)) ? parseISO(value) : null) : null;

  const handleSelect = (date) => {
    if (date) {
      onChange(format(date, 'yyyy-MM-dd'));
    } else {
      onChange('');
    }
  };

  const trigger = (
    <div className={styles.inputWrapper}>
      <Input
        type="text"
        value={selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''}
        placeholder={placeholder}
        readOnly
        required={required}
        className={styles.dateInput}
      />
      <Icon icon="mdi:calendar" width={18} height={18} className={styles.calendarIcon} />
    </div>
  );

  const content = (
    <div className={styles.calendarWrapper}>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        showOutsideDays
      />
    </div>
  );

  return (
    <Popup
      trigger={trigger}
      content={content}
      placement="bottom-start"
      className={styles.popupContainer}
    />
  );
};
