import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';

export const Loader = ({
  fullScreen = true,
  message = 'Processing request...',
  className,
  overlayClassName,
  show = true
}) => {
  if (!show) return null;

  return (
    <div
      className={classNames(
        styles.overlay,
        { [styles.fullScreen]: fullScreen },
        overlayClassName
      )}
    >
      <div className={classNames(styles.loaderContent, className)}>
        <div className={styles.spinner}></div>
        {message && <span className={styles.message}>{message}</span>}
      </div>
    </div>
  );
};
