import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

const discoveryTypes = [
  { value: 'network', label: 'Network Device', icon: 'mdi:network' },
  { value: 'server', label: 'Server', icon: 'mdi:server' },
  { value: 'virtualization', label: 'Virtualization', icon: 'mdi:cloud' },
  { value: 'storage', label: 'Storage', icon: 'mdi:harddisk' },
  { value: 'application', label: 'Application', icon: 'mdi:cellphone' },
  { value: 'other', label: 'Other', icon: 'mdi:devices' },
];

export const DiscoveryTypeSelector = ({
  value,
  otherValue,
  onChange,
  onOtherChange,
  error,
}) => {
  return (
    <div className={styles.formGroup}>
      <label>Discovery Type *</label>
      <div className={styles.typeGrid}>
        {discoveryTypes.map((type) => (
          <button
            key={type.value}
            type="button"
            className={`${styles.typeButton} ${
              value === type.value ? styles.typeButton_active : ''
            }`}
            onClick={() => onChange(type.value)}
          >
            <Icon
              icon={type.icon}
              className={styles.typeIcon}
              width={24}
              height={24}
            />
            <span>{type.label}</span>
          </button>
        ))}
      </div>

      {value === 'other' && (
        <div style={{ marginTop: 'var(--margin-md)' }}>
          <Input
            value={otherValue || ''}
            onChange={(e) => onOtherChange(e.target.value)}
            placeholder="Enter custom device type"
            error={error}
          />
        </div>
      )}
      {error && value !== 'other' && (
        <span className={styles.errorText}>{error}</span>
      )}
    </div>
  );
};
