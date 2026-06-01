'use client';

import { useEffect, useRef } from 'react';
import styles from './styles.module.css';

export const SourceProgressBar = ({ percent }) => {
  const barRef = useRef(null);

  useEffect(() => {
    barRef.current?.style.setProperty('--source-pct', `${percent}%`);
  }, [percent]);

  return (
    <div className={styles.sourceBar}>
      <div ref={barRef} className={styles.sourceProgress} />
    </div>
  );
};
