import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { useDiscoveryProfile } from '@/hooks/discovery-settings/discovery-profile/profile/useDiscoveryProfile';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

const DEVICES_COLUMNS = [
  { key: 'monitor', label: 'MONITOR' },
  { key: 'ip', label: 'IP' },
  { key: 'mac', label: 'MAC ADDRESS' },
  { key: 'type', label: 'TYPE' },
  { key: 'status', label: 'STATUS' },
  { key: 'last_seen', label: 'LAST SEEN' },
  { key: 'groups', label: 'GROUPS' },
];

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

  const renderCell = (device, col) => {
    switch (col.key) {
      case 'monitor':
        return <span className={styles.table_name}>{device.hostname || device.sys_name || device.ip_address}</span>;
      case 'ip':
        return device.ip_address;
      case 'mac':
        return device.mac_address ? <span className={styles.monoText}>{device.mac_address}</span> : <span className={styles.mutedText}>N/A</span>;
      case 'type':
        return (
          <div className={styles.typeWrapper}>
            <div className={styles.table_icon}>
              {getTypeIcon(device.protocol_type || device.device_type)}
            </div>
            <span>{device.protocol_type || device.device_type || <span className={styles.mutedText}>N/A</span>}</span>
          </div>
        );
      case 'status':
        const statusLabel = device.status || 'Unknown';
        const statusVariant = statusLabel === 'Alive' ? 'success' : statusLabel === 'Dead' ? 'danger' : 'neutral';
        return (
          <div className={styles.statusIndicator} style={{ color: `var(--color-${statusVariant})` }}>
            <div className={styles.statusDot} style={{ backgroundColor: `var(--color-${statusVariant})` }} />
            {statusLabel}
          </div>
        );
      case 'last_seen':
        return device.last_seen_at ? (
          <span className={styles.mutedDate}>{new Date(device.last_seen_at).toLocaleString()}</span>
        ) : (
          <span className={styles.mutedText}>N/A</span>
        );
      case 'groups':
        return (
          <div className={styles.table_groups}>
            {profileGroups.length > 0 ? (
              profileGroups.map((group, index) => (
                <span key={index} className={styles.group_badge}>
                  {group.name || group}
                </span>
              ))
            ) : (
              <span className={styles.mutedText}>-</span>
            )}
          </div>
        );
      default:
        return device[col.key];
    }
  };

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
        <div className={styles.searchInputWrapper}>
          <SearchInput
            tags={searchTags}
            onTagsChange={setSearchTags}
            placeholder="Search devices..."
          />
        </div>

        <Table
          className={styles.tableContainer}
          columns={DEVICES_COLUMNS}
          data={devices}
          keyExtractor={(d) => d.id}
          renderCell={renderCell}
          emptyMessage={isLoading ? "Loading devices..." : "No devices found."}
        />

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
