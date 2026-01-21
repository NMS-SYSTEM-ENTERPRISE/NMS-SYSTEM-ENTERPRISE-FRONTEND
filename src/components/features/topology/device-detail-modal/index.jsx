import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

export const DeviceDetailModal = ({ device, connections, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'var(--color-chart-cyan)';
      case 'warning':
        return 'var(--color-chart-orange)';
      case 'offline':
        return 'var(--color-chart-red)';
      default:
        return 'var(--color-text-muted)';
    }
  };

  const getMetricColor = (value) => {
    if (value < 50) return 'var(--color-chart-green)';
    if (value < 80) return 'var(--color-chart-orange)';
    return 'var(--color-chart-red)';
  };

  const interfaces = [
    {
      id: 'Gi0/0/1',
      status: 'up',
      speed: '1000',
      duplex: 'full',
      vlan: '10',
      description: 'Uplink to Core',
    },
    {
      id: 'Gi0/0/2',
      status: 'up',
      speed: '1000',
      duplex: 'full',
      vlan: '10',
      description: 'Uplink to Core',
    },
    {
      id: 'Gi0/0/3',
      status: 'up',
      speed: '1000',
      duplex: 'full',
      vlan: '20',
      description: 'Server Connection',
    },
    {
      id: 'Gi0/0/4',
      status: 'down',
      speed: '1000',
      duplex: 'auto',
      vlan: '-',
      description: 'Unused',
    },
    {
      id: 'Gi0/0/5',
      status: 'up',
      speed: '100',
      duplex: 'full',
      vlan: '30',
      description: 'Access Port',
    },
  ];

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modal_header}>
          <div className={styles.header_info}>
            <div
              className={styles.deviceIcon}
              style={{ borderColor: getStatusColor(device.status) }}
            >
              <Icon icon="mdi:server" width={32} height={32} style={{ color: getStatusColor(device.status) }} />
            </div>
            <div>
              <h2 className={styles.modal_title}>{device.label}</h2>
              <p className={styles.modal_subtitle}>
                {device.vendor} {device.model}
              </p>
              <div
                className={styles.statusBadge}
                style={{ backgroundColor: getStatusColor(device.status) }}
              >
                {device.status.toUpperCase()}
              </div>
            </div>
          </div>
          <button className={styles.modal_close} onClick={onClose}>
            <Icon icon="mdi:close" width={24} height={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === 'overview' ? styles.tab_active : ''
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === 'interfaces' ? styles.tab_active : ''
            }`}
            onClick={() => setActiveTab('interfaces')}
          >
            Interfaces ({interfaces.length})
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === 'performance' ? styles.tab_active : ''
            }`}
            onClick={() => setActiveTab('performance')}
          >
            Performance
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === 'lldp' ? styles.tab_active : ''
            }`}
            onClick={() => setActiveTab('lldp')}
          >
            LLDP Neighbors ({connections.length})
          </button>
        </div>

        {/* Content */}
        <div className={styles.modal_body}>
          {activeTab === 'overview' && (
            <div className={styles.overviewGrid}>
              <div className={styles.infoCard}>
                <div className={styles.infoCard_icon}>
                  <Icon icon="mdi:wifi" width={20} height={20} />
                </div>
                <div className={styles.infoCard_content}>
                  <span className={styles.infoCard_label}>IP Address</span>
                  <span className={styles.infoCard_value}>{device.ip}</span>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoCard_icon}>
                  <Icon icon="mdi:map-marker" width={20} height={20} />
                </div>
                <div className={styles.infoCard_content}>
                  <span className={styles.infoCard_label}>Location</span>
                  <span className={styles.infoCard_value}>
                    {device.location}
                  </span>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoCard_icon}>
                  <Icon icon="mdi:clock-outline" width={20} height={20} />
                </div>
                <div className={styles.infoCard_content}>
                  <span className={styles.infoCard_label}>Uptime</span>
                  <span className={styles.infoCard_value}>{device.uptime}</span>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoCard_icon}>
                  <Icon icon="mdi:link" width={20} height={20} />
                </div>
                <div className={styles.infoCard_content}>
                  <span className={styles.infoCard_label}>Total Ports</span>
                  <span className={styles.infoCard_value}>{device.ports}</span>
                </div>
              </div>

              <div className={styles.detailsSection}>
                <h3>Device Details</h3>
                <div className={styles.detailsGrid}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Type:</span>
                    <span className={styles.detailValue}>
                      {device.type.charAt(0).toUpperCase() +
                        device.type.slice(1)}
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Vendor:</span>
                    <span className={styles.detailValue}>{device.vendor}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Model:</span>
                    <span className={styles.detailValue}>{device.model}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Serial Number:</span>
                    <span className={styles.detailValue}>FCW2234G0JF</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Firmware:</span>
                    <span className={styles.detailValue}>17.9.4a</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interfaces' && (
            <div className={styles.interfacesTable}>
              <table>
                <thead>
                  <tr>
                    <th>Interface</th>
                    <th>Status</th>
                    <th>Speed</th>
                    <th>Duplex</th>
                    <th>VLAN</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {interfaces.map((iface) => (
                    <tr key={iface.id}>
                      <td className={styles.interfaceName}>{iface.id}</td>
                      <td>
                        <span
                          className={`${styles.statusDot} ${
                            iface.status === 'up'
                              ? styles.statusDot_up
                              : styles.statusDot_down
                          }`}
                        />
                        {iface.status.toUpperCase()}
                      </td>
                      <td>{iface.speed} Mbps</td>
                      <td>{iface.duplex}</td>
                      <td>{iface.vlan}</td>
                      <td className={styles.description}>
                        {iface.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className={styles.performanceGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricCard_header}>
                  <Icon icon="mdi:cpu-64-bit" width={24} height={24} style={{ color: "var(--color-chart-cyan)" }} />
                  <span>CPU Usage</span>
                </div>
                <div
                  className={styles.metricCard_value}
                  style={{ color: getMetricColor(device.cpu) }}
                >
                  {device.cpu}%
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressBar_fill}
                    style={{
                      width: `${device.cpu}%`,
                      backgroundColor: getMetricColor(device.cpu),
                    }}
                  />
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricCard_header}>
                  <Icon icon="mdi:harddisk" width={24} height={24} style={{ color: "var(--color-chart-purple)" }} />
                  <span>Memory Usage</span>
                </div>
                <div
                  className={styles.metricCard_value}
                  style={{ color: getMetricColor(device.memory) }}
                >
                  {device.memory}%
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressBar_fill}
                    style={{
                      width: `${device.memory}%`,
                      backgroundColor: getMetricColor(device.memory),
                    }}
                  />
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricCard_header}>
                  <Icon icon="mdi:thermometer" width={24} height={24} style={{ color: "var(--color-chart-orange)" }} />
                  <span>Temperature</span>
                </div>
                <div
                  className={styles.metricCard_value}
                  style={{ color: getMetricColor(device.temperature) }}
                >
                  {device.temperature}°C
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressBar_fill}
                    style={{
                      width: `${device.temperature}%`,
                      backgroundColor: getMetricColor(device.temperature),
                    }}
                  />
                </div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricCard_header}>
                  <Icon icon="mdi:activity" width={24} height={24} style={{ color: "var(--color-chart-green)" }} />
                  <span>Network Traffic</span>
                </div>
                <div className={styles.metricCard_value}>850 Mbps</div>
                <div className={styles.trafficInfo}>
                  <span>↑ 450 Mbps</span>
                  <span>↓ 400 Mbps</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'lldp' && (
            <div className={styles.lldpTable}>
              <div className={styles.lldp_info}>
                <FiLink size={20} />
                <p>
                  LLDP (Link Layer Discovery Protocol) neighbors discovered via
                  network topology
                </p>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Remote Device</th>
                    <th>Bandwidth</th>
                    <th>Protocol</th>
                    <th>VLAN</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {connections.map((conn, idx) => {
                    const isSource = conn.source === device.id;
                    const remoteName = isSource ? conn.target : conn.source;
                    return (
                      <tr key={idx}>
                        <td className={styles.remoteName}>{remoteName}</td>
                        <td>
                          <span className={styles.bandwidthBadge}>
                            {conn.bandwidth}
                          </span>
                        </td>
                        <td>{conn.protocol}</td>
                        <td>{conn.vlan}</td>
                        <td>
                          <span
                            className={`${styles.statusDot} ${styles.statusDot_up}`}
                          />
                          Active
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
