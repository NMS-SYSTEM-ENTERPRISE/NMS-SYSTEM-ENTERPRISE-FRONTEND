import { Badge } from '@/components/ui/badge';
import { Icon } from '@iconify/react';
import styles from '@/screens/settings/shared-settings-styles.module.css';

export const renderCredentialCell = (
  credential,
  col,
  handleEdit,
  handleCopy,
  handleDuplicate,
  handleDelete,
  showActionsMenu,
  setShowActionsMenu
) => {
  switch (col.key) {
    case 'name':
      return <span className={styles.tableLinkName}>{credential.name}</span>;
    case 'type':
      return credential.type || <span style={{ opacity: 0.5 }}>N/A</span>;
    case 'protocol':
      const protocolVal = credential.protocol || credential.auth_protocol || credential.type;
      return protocolVal ? protocolVal : <span style={{ opacity: 0.5 }}>N/A</span>;
    case 'devices':
      return <Badge variant="cyan">{credential.devices_using ?? credential.devices ?? 0}</Badge>;
    case 'groups':
      const groupsList = credential.groups || [];
      return (
        <div className={styles.groupTags}>
          {groupsList.length > 0 ? (
            groupsList.map((group, idx) => (
              <Badge key={idx} variant="secondary">{group.name || group}</Badge>
            ))
          ) : (
            <span style={{ opacity: 0.5 }}>N/A</span>
          )}
        </div>
      );
    case 'actions':
      return (
        <div className={styles.actions}>
          <div className={styles.actionsMenuWrapper}>
            <button
              className={styles.actionBtn}
              onClick={(e) => {
                e.stopPropagation();
                setShowActionsMenu(showActionsMenu === credential.id ? null : credential.id);
              }}
              title="More Actions"
            >
              <Icon icon="mdi:dots-vertical" width={18} height={18} />
            </button>
            {showActionsMenu === credential.id && (
              <div className={styles.actionsMenu}>
                <button
                  type="button"
                  className={styles.editMenuBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(credential);
                  }}
                >
                  <Icon icon="mdi:pencil" width={16} height={16} /> Edit
                </button>
                <button
                  type="button"
                  className={styles.duplicateMenuBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(credential);
                  }}
                >
                  <Icon icon="mdi:content-copy" width={16} height={16} /> Copy
                </button>
                <button
                  type="button"
                  className={styles.deleteMenuBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(credential);
                  }}
                >
                  <Icon icon="mdi:trash-can" width={16} height={16} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      );
    default:
      return credential[col.key];
  }
};
