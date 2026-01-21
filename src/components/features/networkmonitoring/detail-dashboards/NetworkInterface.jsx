import styles from '@/screens/network-monitoring/detail.module.css';
import { useState } from 'react';
import { FiAlertCircle, FiCheckCircle, FiEye, FiSearch, FiServer, FiTrash2, FiXCircle } from 'react-icons/fi';

// Mock Data for Interfaces
const interfaceData = [
  { id: 1, name: 'Slot0/30 (30)', desc: 'D-Link DGS-1210-52 Rev.F1/6.10.007 Port 30', status: 'Up', in: 30, out: 20, type: 6, error: 0, discarded: 0, mac: 'F5-B7-07-8C-B0-29', ip: '192.168.3.35', vlan: 3 },
  { id: 2, name: 'Slot0/22 (22)', desc: 'D-Link DGS-1210-52 Rev.F1/6.10.007 Port 22', status: 'Up', in: 8, out: 12, type: 6, error: 0, discarded: 0, mac: '4E-D7-3A-5A-08-85', ip: '192.168.222', vlan: 2 },
  { id: 3, name: 'Slot0/23 (23)', desc: 'D-Link DGS-1210-52 Rev.F1/6.10.007 Port 23', status: 'Down', in: 0, out: 0, type: 6, error: 1, discarded: 0, mac: 'B0-59-6E-B8-3E-2F', ip: '192.168.5.96', vlan: 5 },
  { id: 4, name: 'Slot0/24 (24)', desc: 'D-Link DGS-1210-52 Rev.F1/6.10.007 Port 24', status: 'Up', in: 45, out: 42, type: 6, error: 0, discarded: 0, mac: '67-01-B0-81-4B-1C', ip: '192.168.1.16', vlan: 1 },
  { id: 5, name: 'Slot0/25 (25)', desc: 'D-Link DGS-1210-52 Rev.F1/6.10.007 Port 25', status: 'Up', in: 26, out: 28, type: 6, error: 0, discarded: 0, mac: '0A-6A-22-E2-8D-54', ip: '192.168.6.130', vlan: 6 },
  { id: 6, name: 'Slot0/26 (26)', desc: 'D-Link DGS-1210-52 Rev.F1/6.10.007 Port 26', status: 'Down', in: 0, out: 0, type: 6, error: 1, discarded: 0, mac: '37-C9-93-2A-2D-A5', ip: '192.168.8.18', vlan: 8 },
];

// Mock Data for Ports (Visual Rack)
const ports = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  status: Math.random() > 0.8 ? 'down' : 'up', // Random status
}));

const NetworkInterface = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = interfaceData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ip.includes(searchTerm)
  );

  return (
    <div className={styles.interfaceContainer}>
      {/* Visual Rack View */}
      <div className={styles.rackViewContainer}>
        <div className={styles.rackEars}>
          <div className={styles.rackEarHole}></div>
          <div className={styles.rackEarHole}></div>
        </div>
        <div className={styles.rackPanel}>
          <div className={styles.portsRow}>
            {ports.map((port) => (
              <div key={port.id} className={styles.portWrapper}>
                <div className={`${styles.portLed} ${port.status === 'up' ? styles.ledGreen : styles.ledRed}`}></div>
                <div className={styles.portIcon}>
                  <div className={styles.portSocket}></div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.deviceLabelBox}>
            172.16.10.10
          </div>
        </div>
        <div className={styles.rackEars}>
          <div className={styles.rackEarHole}></div>
          <div className={styles.rackEarHole}></div>
        </div>
      </div>

      {/* Interface Table Section */}
      <div className={styles.tableSection}>
        <div className={styles.tableControls}>
          <div className={styles.searchWrapper}>
            <FiSearch className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search" 
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <FiEye className={styles.viewIcon} />
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.interfaceTable}>
            <thead>
              <tr>
                <th>Interface</th>
                <th>Description</th>
                <th>Status</th>
                <th>IN (%)</th>
                <th>OUT (%)</th>
                <th>Port Type</th>
                <th>Error</th>
                <th>Discarded</th>
                <th>Mac Address</th>
                <th>IP Address</th>
                <th>Assigned VLAN</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id}>
                  <td className={styles.textBlue}>{row.name}</td>
                  <td className={styles.textWhite}>{row.desc}</td>
                  <td>
                    <div className={styles.statusCell}>
                      {row.status === 'Up' ? <FiCheckCircle className={styles.iconGreen} /> : <FiXCircle className={styles.iconRed} />}
                      <span className={row.status === 'Up' ? styles.textGreen : styles.textRed}>{row.status}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.progressBarWrapper}>
                      <div className={styles.progressBar} style={{ width: `${row.in}%` }}></div>
                    </div>
                    <span className={styles.progressText}>{row.in}%</span>
                  </td>
                  <td>
                    <div className={styles.progressBarWrapper}>
                      <div className={styles.progressBar} style={{ width: `${row.out}%` }}></div>
                    </div>
                    <span className={styles.progressText}>{row.out}%</span>
                  </td>
                  <td>
                    <div className={styles.iconCell}>
                      <FiServer className={styles.iconOrange} /> <span>{row.type}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.iconCell}>
                      <FiAlertCircle className={styles.iconRed} /> <span>{row.error}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.iconCell}>
                      <FiTrash2 className={styles.iconYellow} /> <span>{row.discarded}</span>
                    </div>
                  </td>
                  <td className={styles.textWhite}>{row.mac}</td>
                  <td className={styles.textWhite}>{row.ip}</td>
                  <td className={styles.textWhite}>{row.vlan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NetworkInterface;
