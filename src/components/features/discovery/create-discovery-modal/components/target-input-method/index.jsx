import styles from './styles.module.css';

export const TargetInputMethod = ({ value, onChange, error }) => {
  const methods = [
    { id: 'single', label: 'Single IP/Host' },
    { id: 'range', label: 'IP Range' },
    { id: 'cidr', label: 'CIDR' },
    { id: 'csv', label: 'CSV File' },
  ];

  return (
    <div className={styles.formGroup}>
      <label>Target Input Method *</label>
      <div className={styles.inputModeButtons}>
        {methods.map((method) => (
          <label
            key={method.id}
            className={`${styles.modeButton} ${value === method.id ? styles.modeButton_active : ''
              }`}
          >
            <input
              type="radio"
              name="targetInputMethod"
              value={method.id}
              checked={value === method.id}
              onChange={() => onChange(method.id)}
              style={{ display: 'none' }}
            />
            <div className={styles.radioCircle}>
              <div className={styles.radioCircleInner} />
            </div>
            {method.label}
          </label>
        ))}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
