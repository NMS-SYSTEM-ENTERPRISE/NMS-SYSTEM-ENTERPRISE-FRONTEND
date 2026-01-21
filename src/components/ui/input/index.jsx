import clsx from 'clsx';
import styles from './styles.module.css';

export const Input = ({ className, icon, ...props }) => {
  return (
    <div className={styles.inputWrapper}>
      {icon && <span className={styles.inputIcon}>{icon}</span>}
      <input
        className={clsx(styles.input, icon && styles.input_withIcon, className)}
        {...props}
      />
    </div>
  );
};
