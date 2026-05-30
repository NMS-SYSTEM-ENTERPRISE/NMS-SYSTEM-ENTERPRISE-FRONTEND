import { ActionCell } from '@/components/ui/action-cell';
import styles from '@/screens/settings/shared-settings-styles.module.css';

export const renderLdapCell = (server, col, handleEdit, handleDelete) => {
  switch (col.key) {
    case 'primary_host':
      return <span className={styles.table_name}>{server.primary_host}</span>;
    case 'domain_name':
      return server.domain_name;
    case 'ldap_groups':
      return (
        <span className={styles.destinationBadge}>
          {server.ldap_groups || 'None'}
        </span>
      );
    case 'server_type':
      return server.server_type;
    case 'actions':
      return (
        <ActionCell
          actions={[
            { icon: 'mdi:pencil', title: 'Edit', variant: 'primary', onClick: () => handleEdit(server) },
            { icon: 'mdi:trash-can-outline', title: 'Delete', variant: 'danger', onClick: () => handleDelete(server) },
          ]}
        />
      );
    default:
      return server[col.key];
  }
};
