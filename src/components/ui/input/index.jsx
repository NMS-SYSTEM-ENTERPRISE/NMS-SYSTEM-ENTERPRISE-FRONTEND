import clsx from 'clsx';
import styles from './styles.module.css';

export const Input = ({ className, containerClassName, icon, error, ...props }) => {
  return (
    <div className={clsx(styles.rootWrapper, containerClassName)}>
      <div className={styles.inputWrapper}>
        {icon && <span className={styles.inputIcon}>{icon}</span>}
        <input
          className={clsx(styles.input, icon && styles.input_withIcon, error && styles.input_error, className)}
          {...props}
        />
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
