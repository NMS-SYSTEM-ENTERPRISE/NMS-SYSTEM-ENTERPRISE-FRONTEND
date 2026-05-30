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
      return profile.host || profile.ip_address_or_hostname || profile.csv_file_path || profile.start_ip || profile.cidr_notation || <span style={{ opacity: 0.5 }}>N/A</span>;
    case 'type':
      const dType = profile.type || profile.discovery_type;
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-sm)' }}>
          {dType === 'network' && (
            <Icon icon="mdi:wifi" width={20} height={20} />
          )}
          {dType === 'server' && (
            <Icon icon="mdi:database" width={20} height={20} />
          )}
          {dType === 'virtualization' && (
            <Icon icon="mdi:package-variant" width={20} height={20} />
          )}
          {!['network', 'server', 'virtualization'].includes(dType) && (
            dType || <span style={{ opacity: 0.5 }}>N/A</span>
          )}
        </div>
      );
    case 'discovered':
      return <Badge variant={profile.discovered > 0 ? 'success' : 'secondary'}>{profile.discovered ?? '-'}</Badge>;
    case 'status':
      return <span className={styles.tableMuted}>{profile.status || <span style={{ opacity: 0.5 }}>N/A</span>}</span>;
    case 'scheduler':
      return (profile.scheduler || (profile.schedule_type && profile.schedule_type !== 'Once')) ? (
        <Icon icon="mdi:activity" width={18} height={18} />
      ) : <span style={{ opacity: 0.5 }}>-</span>;
    case 'groups':
      const groupsList = Array.isArray(profile.groups) ? profile.groups : (profile.groups ? [profile.groups] : []);
      return (
        <div className={styles.groupTags}>
          {groupsList.length > 0 ? (
            groupsList.map((group, idx) => (
              <Badge key={idx} variant="cyan">{group.name || group}</Badge>
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
                setShowActionsMenu(showActionsMenu === profile.id ? null : profile.id);
              }}
              title="More Actions"
            >
              <Icon icon="mdi:dots-vertical" width={18} height={18} />
            </button>
            {showActionsMenu === profile.id && (
              <div className={styles.actionsMenu}>
                <button
                  type="button"
                  className={styles.assignMenuBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAssignCredential(profile);
                  }}
                >
                  <Icon icon="mdi:refresh" width={16} height={16} /> Assign
                </button>
                <button
                  type="button"
                  className={styles.scheduleMenuBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSchedule(profile);
                  }}
                >
                  <Icon icon="mdi:clock-outline" width={16} height={16} /> Schedule
                </button>
                <button
                  type="button"
                  className={styles.editMenuBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(profile);
                  }}
                >
                  <Icon icon="mdi:pencil" width={16} height={16} /> Edit
                </button>
                <button
                  type="button"
                  className={styles.deleteMenuBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(profile);
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
      return profile[col.key];
  }
};
