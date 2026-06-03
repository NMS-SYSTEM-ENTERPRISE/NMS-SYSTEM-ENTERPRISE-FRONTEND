import React from 'react';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

export const NoDataFound = ({
  title = "No Data Available",
  description = "There is currently no information to display for this section.",
  icon = "lucide:database"
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <Icon icon={icon} width={36} className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
