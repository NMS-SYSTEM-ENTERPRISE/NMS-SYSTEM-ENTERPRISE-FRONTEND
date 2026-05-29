import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType,
  warningText = 'This action cannot be undone. Are you sure you want to proceed?',
}) => {
  const [confirmText, setConfirmText] = useState('');

  // Reset input when modal opens/closes
  useEffect(() => {
    if (isOpen) setConfirmText('');
  }, [isOpen]);

  if (!isOpen) return null;

  const isConfirmed = confirmText === 'DELETE';

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.iconContainer}>
          <Icon icon="mdi:alert-circle-outline" className={styles.warningIcon} />
        </div>
        
        <h2 className={styles.title}>Delete {itemType}?</h2>
        
        <div className={styles.description}>
          <p>
            You are about to delete the {itemType?.toLowerCase() || 'item'}: <strong>{itemName}</strong>.
          </p>
          <p className={styles.warningText}>{warningText}</p>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirmDelete" className={styles.inputLabel}>
            Please type <strong>DELETE</strong> to confirm.
          </label>
          <input
            id="confirmDelete"
            type="text"
            className={styles.input}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="DELETE"
            autoComplete="off"
          />
        </div>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose} className={styles.btnCancel}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={onConfirm} 
            className={styles.btnDelete}
            disabled={!isConfirmed}
          >
            <Icon icon="mdi:trash-can-outline" width={18} />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
