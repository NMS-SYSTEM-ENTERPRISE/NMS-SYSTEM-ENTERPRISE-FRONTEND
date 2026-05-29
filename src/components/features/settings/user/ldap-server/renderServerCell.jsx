import { ActionCell } from '@/components/ui/action-cell';
import { Badge } from '@/components/ui/badge';

export const renderServerCell = (server, col, onEdit, onDelete) => {
  switch (col.key) {
    case 'ldapGroups':
      return <Badge variant="cyan">{server.ldapGroups}</Badge>;
    case 'sync':
      return (
        <ActionCell
          actions={[{ icon: 'mdi:play-circle-outline', title: 'Sync Now' }]}
        />
      );
    case 'actions':
      return (
        <ActionCell
          actions={[
            { icon: 'mdi:pencil', title: 'Edit', variant: 'primary', onClick: () => onEdit?.(server) },
            { icon: 'mdi:trash-can-outline', title: 'Delete', variant: 'danger', onClick: () => onDelete?.(server) },
          ]}
        />
      );
    default:
      return server[col.key];
  }
};
