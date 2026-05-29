import { ActionCell } from '@/components/ui/action-cell';
import { Badge } from '@/components/ui/badge';
import styles from '@/screens/settings/shared-settings-styles.module.css';

/** Renders each cell of the Users table */
export const renderUserCell = (user, col, onEdit, onDelete) => {
  switch (col.key) {
    case 'username':
      return <a href="#" className={styles.linkBlue}>{user.username}</a>;
    case 'status': {
      const isActive = user.status === true || String(user.status).toUpperCase() === 'ACTIVE';
      const displayStatus = typeof user.status === 'boolean' 
        ? (user.status ? 'Active' : 'Inactive') 
        : user.status;
      return (
        <Badge variant={isActive ? 'success' : 'danger'}>
          {displayStatus}
        </Badge>
      );
    }
    case 'actions':
      return (
        <ActionCell
          actions={[
            { icon: 'mdi:pencil', title: 'Edit', variant: 'primary', onClick: () => onEdit?.(user) },
            { icon: 'mdi:trash-can-outline', title: 'Delete', variant: 'danger', onClick: () => onDelete?.(user) },
          ]}
        />
      );
    case 'mobile':
      return user.mobile || '—';
    default:
      return user[col.key];
  }
};
