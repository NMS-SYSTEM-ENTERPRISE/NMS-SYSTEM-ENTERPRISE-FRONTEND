import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';
import classNames from 'classnames';

/**
 * Reusable modal for displaying a step-by-step process timeline.
 * 
 * @param {boolean} isOpen 
 * @param {Function} onClose 
 * @param {string} title 
 * @param {{ title: string, description: string }[]} steps
 */
export const TimelineModal = ({ isOpen, onClose, title, steps = [] }) => {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose} title="Close">
            <Icon icon="mdi:close" width={24} height={24} />
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.timeline}>
            {steps.map((step, idx) => (
              <div key={idx} className={styles.timelineStep}>
                <div className={classNames(styles.timelineMarker, { [styles.timelineMarkerActive]: true })}>
                  <Icon icon="mdi:check" width={12} color="var(--color-bg-primary)" />
                </div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
