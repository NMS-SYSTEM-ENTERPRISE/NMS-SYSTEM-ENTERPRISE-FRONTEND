import { ActionCell } from '@/components/ui/action-cell';
import { Badge } from '@/components/ui/badge';
import styles from '@/screens/settings/shared-settings-styles.module.css';

export const renderTokenCell = (token, col, onEdit, onDelete) => {
  switch (col.key) {
    case 'name':
      return <a href="#" className={styles.linkBlue}>{token.name}</a>;
    case 'userName':
      return <Badge variant="cyan">{token.userName}</Badge>;
    case 'status':
      return <Badge variant="success">{token.status}</Badge>;
    case 'actions':
      return (
        <ActionCell
          actions={[
            { icon: 'mdi:pencil',        title: 'Edit', variant: 'primary', onClick: () => onEdit?.(token) },
            { icon: 'mdi:trash-can-outline', title: 'Delete', variant: 'danger', onClick: () => onDelete?.(token) },
          ]}
        />
      );
    default:
      return token[col.key];
  }
};
