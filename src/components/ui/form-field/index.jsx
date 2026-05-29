import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * FormField — Wraps a label + control + optional help text into a consistent layout.
 *
 * Usage:
 * ```jsx
 * <FormField label="First Name" required helpText="Must be unique">
 *   <Input type="text" value={...} onChange={...} />
 * </FormField>
 * ```
 *
 * Props:
 * @param {string}    label        — Field label text
 * @param {boolean}   [required]   — Appends a red asterisk
 * @param {string}    [helpText]   — Small text below the control
 * @param {string}    [className]  — Extra class for the wrapper
 * @param {ReactNode} children     — The form control (Input, Select, ToggleSwitch, etc.)
 */
const FormField = ({ label, required, helpText, className, children }) => (
  <div className={clsx(styles.formField, className)}>
    {label && (
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
    )}
    {children}
    {helpText && <p className={styles.helpText}>{helpText}</p>}
  </div>
);

export { FormField };
