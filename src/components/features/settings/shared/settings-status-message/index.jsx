import clsx from 'clsx';
import styles from './styles.module.css';

export const SettingsStatusMessage = ({ children, variant = 'default', className }) => (
  <div className={clsx(styles.message, styles[variant], className)} role="status">
    {children}
  </div>
);
