import clsx from 'clsx';
import { useEffect } from 'react';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

export const Modal = ({ isOpen, onClose, children, title, className }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={clsx(styles.modalContent, className)}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>{title}</h3>
            <button className={styles.modalClose} onClick={onClose}>
              <Icon icon="mdi:close" width={20} height={20} />
            </button>
          </div>
        )}
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};
