import { ActionCell } from '@/components/ui/action-cell';
import { Badge } from '@/components/ui/badge';
import styles from '@/screens/settings/shared-settings-styles.module.css';

/** Renders each cell of the Groups table */
export const renderGroupCell = (group, col, onEdit, onDelete) => {
  switch (col.key) {
    case 'name':
      return <a href="#" className={styles.linkBlue}>{group.name}</a>;
    case 'userCount':
      return <Badge variant="info">{group.userCount}</Badge>;
    case 'actions':
      return (
        <ActionCell
          actions={[
            { icon: 'mdi:pencil', title: 'Edit', variant: 'primary', onClick: () => onEdit?.(group) },
            { icon: 'mdi:trash-can-outline', title: 'Delete', variant: 'danger', onClick: () => onDelete?.(group) },
          ]}
        />
      );
    default:
      return group[col.key];
  }
};
