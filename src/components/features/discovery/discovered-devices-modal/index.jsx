'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Pagination } from '@/components/ui/pagination';
import { SearchInput } from '@/components/ui/search-input';
import { Table } from '@/components/ui/table';
import { useDiscoveryProfile } from '@/hooks/discovery-settings/discovery-profile/profile/useDiscoveryProfile';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

const DEVICES_COLUMNS = [
  { key: 'select', label: '' },
  { key: 'ip_address', label: 'IP ADDRESS' },
  { key: 'hostname', label: 'HOSTNAME' },
  { key: 'mac_address', label: 'MAC ADDRESS' },
  { key: 'device_type', label: 'DEVICE TYPE' },
  { key: 'protocol_type', label: 'PROTOCOL' },
  { key: 'status', label: 'STATUS' },
  { key: 'discovered_at', label: 'DISCOVERED AT' },
];

export const DiscoveredDevicesModal = ({ profile, onClose }) => {
  const { getProfileDevices, commissionDevices, isLoading: isContextLoading } = useDiscoveryProfile();
  
  const [devices, setDevices] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [searchTags, setSearchTags] = useState([]);
  
  const [selectedIds, setSelectedIds] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchDevices = async () => {
    setIsFetching(true);
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
    setIsFetching(false);
  };

  useEffect(() => {
    if (!profile) return;
    fetchDevices();
  }, [profile, currentPage, pageSize, searchTags]);

  const handleSelectAll = (checked) => {
    if (checked) {
      const selectable = devices.filter(d => d.status !== 'Commissioned').map(d => d.id);
      setSelectedIds(selectable);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  const handleCommission = async () => {
    if (selectedIds.length === 0) return;
    const success = await commissionDevices(selectedIds);
    if (success) {
      setSelectedIds([]);
      fetchDevices(); // Refresh list to show updated status
    }
  };

  const renderCell = (row, col) => {
    switch (col.key) {
      case 'select':
        if (row.status === 'Commissioned') return null; // Only uncommissioned can be selected
        return (
          <Checkbox
            checked={selectedIds.includes(row.id)}
            onChange={(e) => handleSelectRow(row.id, e.target.checked)}
          />
        );
      case 'status':
        const st = row.status || 'Unknown';
        const variant = st === 'Commissioned' ? 'success' : st === 'Alive' ? 'info' : st === 'Dead' ? 'danger' : 'neutral';
        return <Badge variant={variant} dot>{st}</Badge>;
      case 'discovered_at':
        return <span className={styles.tableMuted}>{row.discovered_at ? new Date(row.discovered_at).toLocaleString() : '-'}</span>;
      case 'hostname':
      case 'mac_address':
      case 'device_type':
        return row[col.key] || <span className={styles.tableMuted}>N/A</span>;
      case 'protocol_type':
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {row.protocol_type === 'Ping' && <Icon icon="mdi:lan-connect" width={16} height={16} />}
            {row.protocol_type?.startsWith('SNMP') && <Icon icon="mdi:server-network" width={16} height={16} />}
            <span>{row.protocol_type || <span className={styles.tableMuted}>N/A</span>}</span>
          </div>
        );
      default:
        return row[col.key];
    }
  };

  if (!profile) return null;

  const selectableCount = devices.filter(d => d.status !== 'Commissioned').length;
  const isAllSelected = selectableCount > 0 && selectedIds.length === selectableCount;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Discovered Devices: {profile.name}</h2>
          <button type="button" className={styles.closeBtn} onClick={onClose}>
            <Icon icon="mdi:close" width={24} height={24} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.toolbar}>
            <div className={styles.toolbarActions}>
              <Checkbox
                checked={isAllSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
                label="Select All"
                disabled={selectableCount === 0}
              />
              <Button
                variant="primary"
                onClick={handleCommission}
                disabled={selectedIds.length === 0 || isContextLoading}
                icon="mdi:check-circle-outline"
              >
                Commission Selected ({selectedIds.length})
              </Button>
            </div>
            <SearchInput
              tags={searchTags}
              onTagsChange={setSearchTags}
              placeholder="Search devices by IP or Hostname..."
            />
          </div>

          <Table
            className={styles.devicesTable}
            columns={DEVICES_COLUMNS}
            data={devices}
            keyExtractor={(d) => d.id}
            renderCell={renderCell}
            isLoading={isFetching}
            emptyMessage={isFetching ? "Loading devices..." : "No devices found for this profile."}
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
      </div>
    </div>
  );
};
