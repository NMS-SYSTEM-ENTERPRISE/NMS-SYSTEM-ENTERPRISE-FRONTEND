import classNames from 'classnames';
import styles from './styles.module.css';

export const Checkbox = ({ checked, defaultChecked, onChange, label, disabled, className, ...props }) => {
  return (
    <label className={classNames(styles.checkboxWrapper, className)}>
      <input
        type="checkbox"
        className={styles.checkboxInput}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {label && <span className={styles.checkboxLabel}>{label}</span>}
    </label>
  );
};
