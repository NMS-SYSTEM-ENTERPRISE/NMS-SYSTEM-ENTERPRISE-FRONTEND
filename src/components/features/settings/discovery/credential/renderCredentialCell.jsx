import { Badge } from '@/components/ui/badge';
import { Icon } from '@iconify/react';
import styles from '@/screens/settings/shared-settings-styles.module.css';

export const renderCredentialCell = (
  credential,
  col,
  handleEdit,
  handleCopy,
  handleDuplicate,
  handleDelete
) => {
  switch (col.key) {
    case 'name':
      return <span className={styles.tableLinkName}>{credential.name}</span>;
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
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(credential);
            }}
            title="Edit"
          >
            <Icon icon="mdi:pencil" width={18} height={18} />
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={(e) => {
              e.stopPropagation();
              handleCopy(credential);
            }}
            title="Copy to clipboard"
          >
            <Icon icon="mdi:content-copy" width={18} height={18} />
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={(e) => {
              e.stopPropagation();
              handleDuplicate(credential);
            }}
            title="Duplicate"
          >
            <Icon icon="mdi:duplicate" width={18} height={18} />
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(credential);
            }}
            title="Delete"
          >
            <Icon icon="mdi:trash-can" width={18} height={18} className={styles.textDanger} />
          </button>
        </div>
      );
    default:
      return credential[col.key];
  }
};
