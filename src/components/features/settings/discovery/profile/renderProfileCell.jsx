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
  handleViewDevices,
  handleViewLogs,
  handleReDiscover,
  showActionsMenu,
  setShowActionsMenu
) => {
  switch (col.key) {
    case 'name':
      return <span className={styles.tableLinkName}>{profile.name}</span>;
    case 'host':
      if (profile.ip_address_or_hostname) return profile.ip_address_or_hostname;
      if (profile.cidr_notation) return profile.cidr_notation;
      if (profile.start_ip && profile.end_ip) return `${profile.start_ip} - ${profile.end_ip}`;
      if (profile.start_ip) return profile.start_ip;
      if (profile.csv_file_path) return profile.csv_file_path;
      return profile.host || <span style={{ opacity: 0.5 }}>N/A</span>;
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
      const count = profile.discovered ?? profile.discovered_count ?? 0;
      return (
        <Badge
          variant={count > 0 ? 'success' : 'secondary'}
          className={count > 0 ? styles.clickableBadge : ''}
          onClick={count > 0 ? () => handleViewDevices(profile) : undefined}
          style={count > 0 ? { cursor: 'pointer' } : {}}
        >
          {count || '-'}
        </Badge>
      );
    case 'status':
      const st = profile.status || 'Unknown';
      let stVariant = 'neutral';
      if (st === 'Running' || st === 'Active' || st === 'Completed') stVariant = 'success';
      else if (st === 'Scheduled') stVariant = 'cyan';
      else if (st === 'Failed' || st === 'Error') stVariant = 'danger';
      else if (st === 'Idle') stVariant = 'neutral';

      return (
        <Badge variant={stVariant} dot>
          {st}
        </Badge>
      );
    case 'scheduler':
      if (profile.schedule_type) {
        if (profile.schedule_type !== 'Once' && profile.schedule_interval) {
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Icon icon="mdi:clock-outline" width={14} height={14} />
              <span>{profile.schedule_interval}m</span>
            </div>
          );
        }
        return <span>{profile.schedule_type}</span>;
      }
      return profile.scheduler ? (
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
    case 'tags':
      const tagsList = Array.isArray(profile.tags) ? profile.tags : (profile.tags ? [profile.tags] : []);
      return (
        <div className={styles.groupTags}>
          {tagsList.length > 0 ? (
            tagsList.map((tag, idx) => (
              <Badge key={idx} variant="neutral" className={styles.tagBadge}>
                {tag.name || tag}
              </Badge>
            ))
          ) : (
            <span style={{ opacity: 0.5 }}>-</span>
          )}
        </div>
      );
    case 'credentials':
      const credsList = Array.isArray(profile.credential_profiles) ? profile.credential_profiles : (profile.credential_profiles ? [profile.credential_profiles] : []);
      return (
        <div className={styles.groupTags}>
          {credsList.length > 0 ? (
            credsList.map((cred, idx) => (
              <Badge key={idx} variant="info" className={styles.tagBadge}>
                <Icon icon="mdi:key" width={12} height={12} style={{ marginRight: 4 }} />
                {cred.name || cred}
              </Badge>
            ))
          ) : (
            <span style={{ opacity: 0.5 }}>-</span>
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
                  className={styles.assignMenuBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReDiscover(profile);
                  }}
                >
                  <Icon icon="mdi:radar" width={16} height={16} /> Re-Discover
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
                  className={styles.assignMenuBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDevices(profile);
                  }}
                >
                  <Icon icon="mdi:server-network" width={16} height={16} /> View Devices
                </button>
                <button
                  type="button"
                  className={styles.scheduleMenuBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewLogs(profile);
                  }}
                >
                  <Icon icon="mdi:console" width={16} height={16} /> View Logs
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
