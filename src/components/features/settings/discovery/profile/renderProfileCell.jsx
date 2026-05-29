import { Badge } from '@/components/ui/badge';
import { Icon } from '@iconify/react';
import styles from '@/screens/settings/shared-settings-styles.module.css';

export const renderProfileCell = (
  profile,
  col,
  handleRun,
  handleAssignCredential,
  handleSchedule,
  handleEdit,
  handleDuplicate,
  handleDelete,
  showActionsMenu,
  setShowActionsMenu
) => {
  switch (col.key) {
    case 'name':
      return <span className={styles.tableLinkName}>{profile.name}</span>;
    case 'host':
      return profile.host;
    case 'type':
      return (
        <div className={styles.actions}>
          {profile.type === 'network' && (
            <Icon icon="mdi:wifi" width={20} height={20} />
          )}
          {profile.type === 'server' && (
            <Icon icon="mdi:database" width={20} height={20} />
          )}
          {profile.type === 'virtualization' && (
            <Icon icon="mdi:package-variant" width={20} height={20} />
          )}
        </div>
      );
    case 'discovered':
      return <Badge variant={profile.discovered > 0 ? 'success' : 'secondary'}>{profile.discovered}</Badge>;
    case 'status':
      return <span className={styles.tableMuted}>{profile.status}</span>;
    case 'scheduler':
      return profile.scheduler ? (
        <Icon icon="mdi:activity" width={18} height={18} />
      ) : null;
    case 'groups':
      return <Badge variant="cyan">{profile.groups}</Badge>;
    case 'actions':
      return (
        <div className={styles.actions}>
          <button className={styles.actionBtn} onClick={() => handleRun(profile)} title="Run Now">
            <Icon icon="mdi:play" width={18} height={18} />
          </button>
          <button className={styles.actionBtn} onClick={() => handleAssignCredential(profile)} title="Assign Credentials">
            <Icon icon="mdi:refresh" width={18} height={18} />
          </button>
          <button className={styles.actionBtn} onClick={() => handleSchedule(profile)} title="Schedule">
            <Icon icon="mdi:clock-outline" width={18} height={18} />
          </button>
          <div className={styles.actionsMenuWrapper}>
            <button
              className={styles.actionBtn}
              onClick={() => setShowActionsMenu(showActionsMenu === profile.id ? null : profile.id)}
              title="More Actions"
            >
              <Icon icon="mdi:dots-vertical" width={18} height={18} />
            </button>
            {showActionsMenu === profile.id && (
              <div className={styles.actionsMenu}>
                <button onClick={() => handleEdit(profile)}>
                  <Icon icon="mdi:pencil" width={16} height={16} /> Edit
                </button>
                <button onClick={() => handleDuplicate(profile)}>
                  <Icon icon="mdi:content-copy" width={16} height={16} /> Duplicate
                </button>
                <button onClick={() => handleDelete(profile)} className={styles.textDanger}>
                  <Icon icon="mdi:trash-can" width={16} height={16} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      );
    default:
      return profile[col.key];
  }
};
