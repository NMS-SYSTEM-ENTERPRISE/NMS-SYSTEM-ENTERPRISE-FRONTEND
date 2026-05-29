import { ActionCell } from '@/components/ui/action-cell';
import { Badge } from '@/components/ui/badge';
import styles from '@/screens/settings/shared-settings-styles.module.css';

/** Renders each cell of the Roles table */
export const renderRoleCell = (role, col, onEdit, onDelete) => {
  switch (col.key) {
    case 'name':
      return <a href="#" className={styles.linkBlue}>{role.name}</a>;
    case 'userCount':
      return <Badge variant="info">{role.userCount}</Badge>;
    case 'actions':
      return (
        <ActionCell
          actions={[
            { icon: 'mdi:pencil',        title: 'Edit', variant: 'primary', onClick: () => onEdit?.(role) },
            { icon: 'mdi:trash-can-outline', title: 'Delete', variant: 'danger', onClick: () => onDelete?.(role) },
          ]}
        />
      );
    default:
      return role[col.key];
  }
};
