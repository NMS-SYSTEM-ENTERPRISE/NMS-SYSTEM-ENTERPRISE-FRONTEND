'use client';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import styles from './styles.module.css';

export const ProgressTrack = ({
  percent,
  targetPercent,
  showTarget = false,
  variant = 'default',
  className,
}) => {
  const fillRef = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    const clamped = Math.min(100, Math.max(0, percent));
    fillRef.current?.style.setProperty('--progress-width', `${clamped}%`);
    if (showTarget) {
      targetRef.current?.style.setProperty('--target-position', `${targetPercent}%`);
    }
  }, [percent, targetPercent, showTarget]);

  return (
    <div className={clsx(styles.progressContainer, className)}>
      <div
        ref={fillRef}
        className={clsx(styles.progressFill, styles[`progressFill_${variant}`])}
      />
      {showTarget && (
        <div ref={targetRef} className={styles.targetLine}>
          <div className={styles.targetTooltip}>Target: {targetPercent}%</div>
        </div>
      )}
    </div>
  );
};
