import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { useDiscoveryProfile } from '@/hooks/discovery-settings/discovery-profile/profile/useDiscoveryProfile';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export const AssignCredentialModal = ({ profile, onClose, onAssign }) => {
  const { getProfileDevices, isLoading } = useDiscoveryProfile();
  
  const [searchTags, setSearchTags] = useState([]);
  const [devices, setDevices] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  useEffect(() => {
    if (!profile?.id) return;
    const fetchDevices = async () => {
      const params = {
        page: currentPage,
        limit: pageSize,
      };
      if (searchTags.length > 0) {
        params.search = searchTags.join(' ');
      }
      const data = await getProfileDevices(profile.id, params);
      if (data) {
        setDevices(data.items || []);
        setTotalRecords(data.total_records || 0);
      }
    };
    fetchDevices();
  }, [profile, currentPage, pageSize, searchTags, getProfileDevices]);

  const getTypeIcon = (type = '') => {
    const t = type.toLowerCase();
    if (t.includes('virtual') || t.includes('esxi')) {
      return <Icon icon="mdi:package-variant" width={20} height={20} style={{ color: 'var(--color-chart-purple)' }} />;
    }
    if (t.includes('citrix')) {
      return <Icon icon="mdi:activity" width={20} height={20} style={{ color: 'var(--color-chart-cyan)' }} />;
    }
    if (t.includes('cisco') || t.includes('database')) {
      return <Icon icon="mdi:database" width={20} height={20} style={{ color: 'var(--color-chart-orange)' }} />;
    }
    if (t.includes('ping') || t.includes('snmp')) {
      return <Icon icon="mdi:lan-connect" width={20} height={20} style={{ color: 'var(--color-chart-blue)' }} />;
    }
    return <Icon icon="mdi:wifi" width={20} height={20} style={{ color: 'var(--color-chart-blue)' }} />;
  };

  const profileGroups = Array.isArray(profile?.groups) ? profile.groups : (profile?.groups ? [profile.groups] : []);

  return (
    <Modal
      isOpen
      onClose={onClose}
      className={styles.assignModal}
      customModelBodyStyle={styles.modal_body}
    >
      <div className={styles.modal_header}>
        <h2 className={styles.modal_title}>Assign: {profile?.name || 'Profile'}</h2>
        <button className={styles.modal_close} onClick={onClose}>
          <Icon icon="mdi:close" width={20} height={20} />
        </button>
      </div>

      <div className={styles.modal_content}>
        <div style={{ marginBottom: '16px' }}>
          <SearchInput
            tags={searchTags}
            onTagsChange={setSearchTags}
            placeholder="Search devices..."
          />
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>MONITOR</th>
                <th>IP</th>
                <th>MAC ADDRESS</th>
                <th>TYPE</th>
                <th>STATUS</th>
                <th>LAST SEEN</th>
                <th>GROUPS</th>
              </tr>
            </thead>
            <tbody>
              {devices.length > 0 ? (
                devices.map((device) => {
                  const statusLabel = device.status || 'Unknown';
                  const statusVariant = statusLabel === 'Alive' ? 'success' : statusLabel === 'Dead' ? 'danger' : 'neutral';
                  
                  return (
                    <tr key={device.id}>
                      <td className={styles.table_name}>{device.hostname || device.sys_name || device.ip_address}</td>
                      <td>{device.ip_address}</td>
                      <td>{device.mac_address ? <span style={{ fontFamily: 'monospace' }}>{device.mac_address}</span> : <span style={{ opacity: 0.5 }}>N/A</span>}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className={styles.table_icon} style={{ display: 'flex' }}>
                            {getTypeIcon(device.protocol_type || device.device_type)}
                          </div>
                          <span>{device.protocol_type || device.device_type || <span style={{ opacity: 0.5 }}>N/A</span>}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: `var(--color-${statusVariant})`, fontWeight: 500, fontSize: '0.75rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: `var(--color-${statusVariant})` }} />
                          {statusLabel}
                        </div>
                      </td>
                      <td>
                        {device.last_seen_at ? (
                          <span style={{ fontSize: '0.9em', color: 'var(--color-text-muted)' }}>
                            {new Date(device.last_seen_at).toLocaleString()}
                          </span>
                        ) : (
                          <span style={{ opacity: 0.5 }}>N/A</span>
                        )}
                      </td>
                      <td>
                        <div className={styles.table_groups}>
                          {profileGroups.length > 0 ? (
                            profileGroups.map((group, index) => (
                              <span key={index} className={styles.group_badge}>
                                {group.name || group}
                              </span>
                            ))
                          ) : (
                            <span style={{ opacity: 0.5 }}>-</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', opacity: 0.7 }}>
                    {isLoading ? 'Loading devices...' : 'No devices found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={totalRecords}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className={styles.modal_footer}>
        <Button onClick={onClose} variant="outline" style={{ marginRight: '8px' }}>Cancel</Button>
        <Button onClick={() => onAssign?.(devices)}>Assign</Button>
      </div>
    </Modal>
  );
};
