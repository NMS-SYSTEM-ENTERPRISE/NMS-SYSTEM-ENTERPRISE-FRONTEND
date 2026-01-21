"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const MOCK_MAC_ADDRESSES = [
  {
    id: 1,
    mac: '00:1C:0F:BD:24:02',
    deviceIp: '172.16.12.2',
    interfaceIp: '',
    interfaceName: 'Gi1/0/2',
  },
  {
    id: 2,
    mac: '00:1C:0F:BD:24:03',
    deviceIp: '172.16.12.2',
    interfaceIp: '',
    interfaceName: 'Gi1/0/3',
  },
  {
    id: 3,
    mac: '00:1C:0F:BD:24:04',
    deviceIp: '172.16.12.2',
    interfaceIp: '',
    interfaceName: 'Gi1/0/4',
  },
  {
    id: 4,
    mac: '00:1C:0F:BD:24:05',
    deviceIp: '172.16.12.2',
    interfaceIp: '',
    interfaceName: 'Gi1/0/5',
  },
  {
    id: 5,
    mac: '00:1C:0F:BD:24:09',
    deviceIp: '172.16.12.2',
    interfaceIp: '',
    interfaceName: 'Gi1/0/9',
  },
  {
    id: 6,
    mac: '84:39:BE:1E:05:41',
    deviceIp: '172.16.10.1',
    interfaceIp: '172.24.24.1',
    interfaceName: 'port2',
  },
  {
    id: 7,
    mac: '00:1C:0F:BD:24:08',
    deviceIp: '172.16.12.2',
    interfaceIp: '',
    interfaceName: 'Gi1/0/8',
  },
  {
    id: 8,
    mac: 'CA:02:CF:F7:00:54',
    deviceIp: '172.16.14.52',
    interfaceIp: 'fe80::c802:cfff:fef7::54',
    interfaceName: 'Fa3/0',
  },
  {
    id: 9,
    mac: '84:39:BE:1E:05:42',
    deviceIp: '172.16.10.1',
    interfaceIp: '10.20.40.1',
    interfaceName: 'port3',
  },
  {
    id: 10,
    mac: '00:1C:0F:BD:24:0B',
    deviceIp: '172.16.12.2',
    interfaceIp: '',
    interfaceName: 'Gi1/0/11',
  },
  {
    id: 11,
    mac: '00:1C:0F:BD:24:0C',
    deviceIp: '172.16.12.2',
    interfaceIp: '',
    interfaceName: 'Gi1/0/12',
  },
  {
    id: 12,
    mac: 'CA:02:CF:F7:00:1C',
    deviceIp: '172.16.14.52',
    interfaceIp: '192.168.60.1',
    interfaceName: 'Fa1/0',
  },
];
const MACAddressList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const filteredItems = MOCK_MAC_ADDRESSES.filter(
    (item) =>
      item.mac.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deviceIp.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.interfaceName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <div>
              <h2 className={styles.pageTitle}>MAC Address List</h2>
              <p className={styles.pageDescription}>
                Manage MAC addresses of network devices discovered within
                snr-edatas AIOps. For more information:{' '}
                <a href="#" className={styles.link}>
                  MAC Address List
                  <Icon icon="mdi:open-in-new" width={16} height={16} />
                </a>
              </p>
            </div>
            <button className={styles.btnPrimary}>Create Mac Address</button>
          </div>
          <div className={styles.toolbar}>
            <div className={styles.searchBox}>
              <Icon icon="mdi:magnify" width={18} height={18} />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>MAC ADDRESS</th>
                  <th>DEVICE IP ADDRESS</th>
                  <th>INTERFACE IP ADDRESS</th>
                  <th>INTERFACE NAME</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.mac}</td>
                    <td>{item.deviceIp}</td>
                    <td>{item.interfaceIp}</td>
                    <td>{item.interfaceName}</td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} title="More">
                          <Icon
                            icon="mdi:dots-vertical"
                            width={18}
                            height={18}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.pagination}>
            <button className={styles.paginationBtn}>
              <Icon icon="mdi:chevron-double-left" width={18} height={18} />
            </button>
            <button className={styles.paginationBtn}>
              <Icon icon="mdi:chevron-left" width={18} height={18} />
            </button>
            <span className={styles.pageNumber}>1</span>
            <button className={styles.paginationBtn}>
              <Icon icon="mdi:chevron-right" width={18} height={18} />
            </button>
            <button className={styles.paginationBtn}>
              <Icon icon="mdi:chevron-double-right" width={18} height={18} />
            </button>
            <span className={styles.paginationBtn}>2</span>
            <span className={styles.paginationBtn}>3</span>
            <span className={styles.paginationBtn}>4</span>
            <span className={styles.paginationBtn}>5</span>
            <span style={{ margin: '0 8px' }}>...</span>
            <button className={styles.paginationBtn}>
              <Icon icon="mdi:chevron-right" width={18} height={18} />
            </button>
            <button className={styles.paginationBtn}>
              <Icon icon="mdi:chevron-double-right" width={18} height={18} />
            </button>
            <SelectComponent
              className={styles.itemsPerPageSelect}
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              options={[
                { value: 50, label: '50' },
                { value: 100, label: '100' },
              ]}
              placeholder="50"
              isSearchable={false}
            />
            <span className={styles.paginationInfo}>Items per page</span>
            <span className={styles.paginationTotal}>1 - 50 of 1550 Items</span>
          </div>
        </div>
  );
};
export default MACAddressList;
