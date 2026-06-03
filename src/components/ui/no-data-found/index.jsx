import React from 'react';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

export const NoDataFound = ({
  icon = "lucide:inbox",
  title = "No Data Found",
  message = "There is no data available to display at this moment.",
  actionButton,
  className
}) => {
  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.iconWrapper}>
        <Icon icon={icon} className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {actionButton && <div className={styles.actionWrapper}>{actionButton}</div>}
    </div>
  );
};
