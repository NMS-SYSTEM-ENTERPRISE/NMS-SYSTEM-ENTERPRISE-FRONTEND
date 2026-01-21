import clsx from 'clsx';
import styles from './styles.module.css';

export const MetricCard = ({ title, children, className, headerAction }) => {
  return (
    <div className={clsx(styles.metricCard, className)}>
      <div className={styles.metricCard_header}>
        <h3 className={styles.metricCard_title}>{title}</h3>
        {headerAction && (
          <div className={styles.metricCard_action}>{headerAction}</div>
        )}
      </div>
      <div className={styles.metricCard_content}>{children}</div>
    </div>
  );
};
