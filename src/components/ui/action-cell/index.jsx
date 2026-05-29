import { Icon } from '@iconify/react';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * ActionCell — Row action buttons container for use inside Table cells.
 *
 * Usage:
 * ```jsx
 * // In renderCell:
 * if (col.key === 'actions') {
 *   return (
 *     <ActionCell
 *       actions={[
 *         { icon: 'mdi:pencil',        title: 'Edit',   onClick: () => handleEdit(row) },
 *         { icon: 'mdi:dots-vertical', title: 'More',   onClick: () => handleMore(row) },
 *       ]}
 *     />
 *   );
 * }
 * ```
 *
 * Props:
 * @param {{ icon: string, title?: string, onClick: Function, variant?: 'default'|'danger', disabled?: boolean }[]} actions
 */
const ActionCell = ({ actions = [] }) => (
  <div className={styles.actions}>
    {actions.map((action, idx) => (
      <button
        key={idx}
        type="button"
        className={clsx(
          styles.actionBtn,
          action.variant === 'primary' && styles.actionBtn_primary,
          action.variant === 'danger' && styles.actionBtn_danger,
        )}
        title={action.title}
        onClick={(e) => {
          e.stopPropagation();
          action.onClick?.(e);
        }}
        disabled={action.disabled}
      >
        <Icon icon={action.icon} width={18} height={18} />
      </button>
    ))}
  </div>
);

export { ActionCell };
