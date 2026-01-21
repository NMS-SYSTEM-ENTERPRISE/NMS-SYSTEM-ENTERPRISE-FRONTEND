import { Icon } from '@iconify/react';
import styles from './styles.module.css';

export const SLODetailModal = ({ slo, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{slo.name}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <Icon icon="mdi:close" width={20} height={20} />
          </button>
        </div>
        <div className={styles.modalBody}>
          <p>SLO Details Modal - To be implemented</p>
        </div>
      </div>
    </div>
  );
};
