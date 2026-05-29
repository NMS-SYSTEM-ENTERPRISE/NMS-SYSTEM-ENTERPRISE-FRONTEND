import { Badge } from '@/components/ui/badge';
import { Icon } from '@iconify/react';
import styles from '@/screens/settings/discovery/credential/styles.module.css';

export const renderCredentialCell = (credential, col, handleEdit, handleDuplicate, handleDelete) => {
  switch (col.key) {
    case 'name':
      return <span className={styles.table_name}>{credential.name}</span>;
    case 'type':
      return credential.type;
    case 'protocol':
      return credential.protocol;
    case 'devices':
      return <Badge variant="cyan">{credential.devices}</Badge>;
    case 'groups':
      return (
        <div className={styles.groupTags}>
          {credential.groups.map((group, idx) => (
            <Badge key={idx} variant="secondary">{group}</Badge>
          ))}
        </div>
      );
    case 'actions':
      return (
        <div className={styles.table_actions}>
          <button className={styles.actionButton} onClick={() => handleEdit(credential)} title="Edit">
            <Icon icon="mdi:pencil" width={18} height={18} />
          </button>
          <button className={styles.actionButton} onClick={() => handleDuplicate(credential)} title="Duplicate">
            <Icon icon="mdi:content-copy" width={18} height={18} />
          </button>
          <button className={styles.actionButton} onClick={() => handleDelete(credential)} title="Delete">
            <Icon icon="mdi:trash-can" width={18} height={18} className={styles.textDanger} />
          </button>
        </div>
      );
    default:
      return credential[col.key];
  }
};
