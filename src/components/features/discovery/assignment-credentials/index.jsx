import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

const monitors = [
  {
    id: 1,
    name: '172.16.10.180',
    ip: '172.16.10.180',
    type: 'virtualization',
    groups: ['Virtualization', '+1'],
  },
  {
    id: 2,
    name: 'esxi15.snr-edatas.local',
    ip: '172.16.10.15',
    type: 'virtualization',
    groups: ['Virtualization', 'VMware ESXi', '+1'],
  },
  {
    id: 3,
    name: 'xen7/master',
    ip: '172.16.10.231',
    type: 'citrix',
    groups: ['Virtualization', '+1'],
  },
  {
    id: 4,
    name: 'xen7/bkp',
    ip: '172.16.10.232',
    type: 'citrix',
    groups: ['Virtualization', 'Citrix Xen', '+1'],
  },
  {
    id: 5,
    name: 'Sita3-ctdge02',
    ip: '10.10.1.18',
    type: 'network',
    groups: ['SDN', 'Cisco SD-WAN', 'WAN Edge', '+2'],
  },
  {
    id: 6,
    name: 'Sita3-ctdge01',
    ip: '10.10.1.17',
    type: 'network',
    groups: ['SDN', 'Cisco SD-WAN', 'WAN Edge', '+2'],
  },
  {
    id: 7,
    name: 'esxi26.snr-edatas.local',
    ip: '172.16.10.26',
    type: 'virtualization',
    groups: ['Virtualization', 'VMware ESXi', '+1'],
  },
  {
    id: 8,
    name: 'DC-ctsdge01',
    ip: '10.10.1.1',
    type: 'network',
    groups: ['SDN', 'Cisco SD-WAN', 'WAN Edge', '+2'],
  },
  {
    id: 9,
    name: 'Controller',
    ip: '10.10.1.5',
    type: 'network',
    groups: ['SDN', 'Cisco SD-WAN', 'Controller', '+2'],
  },
  {
    id: 10,
    name: 'Validator',
    ip: '10.10.1.3',
    type: 'network',
    groups: ['SDN', 'Cisco SD-WAN', 'Validator', '+2'],
  },
  {
    id: 11,
    name: 'Manager',
    ip: '10.10.1.1',
    type: 'cisco',
    groups: ['SDN', 'Cisco SD-WAN', 'Manager', '+2'],
  },
  {
    id: 12,
    name: 'esxi18.snr-edatas.local',
    ip: '172.16.10.18',
    type: 'virtualization',
    groups: ['Virtualization', 'VMware ESXi', '+1'],
  },
  {
    id: 13,
    name: 'Sita2-ctsdge01',
    ip: '10.10.1.15',
    type: 'network',
    groups: ['SDN', 'Cisco SD-WAN', 'WAN Edge', '+2'],
  },
];

export const AssignCredentialModal = ({ profileName, onClose, onAssign }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredMonitors = monitors.filter(
    (monitor) =>
      monitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      monitor.ip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type) => {
    switch (type) {
      case 'virtualization':
        return (
          <Icon
            icon="mdi:package-variant"
            width={20}
            height={20}
            style={{ color: 'var(--color-chart-purple)' }}
          />
        );
      case 'citrix':
        return (
          <Icon
            icon="mdi:activity"
            width={20}
            height={20}
            style={{ color: 'var(--color-chart-cyan)' }}
          />
        );
      case 'network':
        return (
          <Icon
            icon="mdi:wifi"
            width={20}
            height={20}
            style={{ color: 'var(--color-chart-blue)' }}
          />
        );
      case 'cisco':
        return (
          <Icon
            icon="mdi:database"
            width={20}
            height={20}
            style={{ color: 'var(--color-chart-orange)' }}
          />
        );
      default:
        return <Icon icon="mdi:wifi" width={20} height={20} />;
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
        <h2 className={styles.modal_title}>Assign {profileName}</h2>
        <button className={styles.modal_close} onClick={onClose}>
          <Icon icon="mdi:close" width={20} height={20} />
        </button>
      </div>

      <div className={styles.modal_content}>
        <div className={styles.searchBar}>
          <Icon icon="mdi:magnify" width={18} height={18} />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>MONITOR</th>
                <th>IP</th>
                <th>TYPE</th>
                <th>GROUPS</th>
              </tr>
            </thead>
            <tbody>
              {filteredMonitors.map((monitor) => (
                <tr key={monitor.id}>
                  <td className={styles.table_name}>{monitor.name}</td>
                  <td>{monitor.ip}</td>
                  <td>
                    <div className={styles.table_icon}>
                      {getTypeIcon(monitor.type)}
                    </div>
                  </td>
                  <td>
                    <div className={styles.table_groups}>
                      {monitor.groups.map((group, index) => (
                        <span key={index} className={styles.group_badge}>
                          {group}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <button className={styles.pagination_button}>«</button>
          <button className={styles.pagination_button}>‹</button>
          <button
            className={`${styles.pagination_button} ${styles.pagination_button_active}`}
          >
            1
          </button>
          <button className={styles.pagination_button}>›</button>
          <button className={styles.pagination_button}>»</button>
          <SelectComponent
            className={styles.pagination_select}
            value={50}
            onChange={() => {}}
            options={[
              { value: 50, label: '50' },
              { value: 100, label: '100' },
              { value: 200, label: '200' },
            ]}
            placeholder="50"
          />
          <span className={styles.pagination_info}>Items per page</span>
          <span className={styles.pagination_count}>1 - 21 of 21 items</span>
        </div>
      </div>

      <div className={styles.modal_footer}>
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
};
