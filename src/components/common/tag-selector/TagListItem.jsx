import { Icon } from '@iconify/react';
import styles from './styles.module.css';

/**
 * Single tag row inside the dropdown — select, edit, or delete.
 */
export const TagListItem = ({ tag, onSelect, onEdit, onDelete }) => (
  <div className={styles.tagListItem}>
    <button type="button" className={styles.tagListItemSelect} onClick={onSelect}>
      {tag}
    </button>
    <div className={styles.tagListItemActions}>
      <button
        type="button"
        className={styles.tagListItemAction}
        title="Edit tag"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      >
        <Icon icon="mdi:pencil" width={16} height={16} />
      </button>
      <button
        type="button"
        className={`${styles.tagListItemAction} ${styles.tagListItemActionDanger}`}
        title="Delete tag"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Icon icon="mdi:trash-can-outline" width={16} height={16} />
      </button>
    </div>
  </div>
);
