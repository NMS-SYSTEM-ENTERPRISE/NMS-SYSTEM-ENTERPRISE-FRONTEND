import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

export const DeviceDetailSidebar = ({ device, connections, onClose, isOpen }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !device) return null;

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
    { id: 'Gi0/0/1', status: 'up', speed: '1000', duplex: 'full', vlan: '10', description: 'Uplink to Core' },
    { id: 'Gi0/0/2', status: 'up', speed: '1000', duplex: 'full', vlan: '10', description: 'Uplink to Core' },
    { id: 'Gi0/0/3', status: 'up', speed: '1000', duplex: 'full', vlan: '20', description: 'Server Connection' },
    { id: 'Gi0/0/4', status: 'down', speed: '1000', duplex: 'auto', vlan: '-', description: 'Unused' },
    { id: 'Gi0/0/5', status: 'up', speed: '100', duplex: 'full', vlan: '30', description: 'Access Port' },
  ];

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`} onClick={onClose} />
      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <div className={styles.deviceIcon} style={{ borderColor: getStatusColor(device.status) }}>
              <Icon icon="mdi:server" width={32} height={32} style={{ color: getStatusColor(device.status) }} />
            </div>
            <div>
              <h2 className={styles.title}>{device.label}</h2>
              <p className={styles.subtitle}>
                {device.vendor} {device.model}
              </p>
              <div className={styles.statusBadge} style={{ backgroundColor: getStatusColor(device.status) }}>
                {device.status.toUpperCase()}
              </div>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <Icon icon="mdi:close" width={24} height={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'overview' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'interfaces' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('interfaces')}
          >
            Interfaces
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'connections' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('connections')}
          >
            Connections
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'metrics' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('metrics')}
          >
            Metrics
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'events' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {activeTab === 'overview' && (
            <div className={styles.overviewTab}>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Device Name</span>
                  <span className={styles.value}>{device.label}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>IP Address</span>
                  <span className={styles.value}>{device.ip || '-'}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Type</span>
                  <span className={styles.value}>{device.type}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Vendor</span>
                  <span className={styles.value}>{device.vendor || '-'}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Model</span>
                  <span className={styles.value}>{device.model || '-'}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Status</span>
                  <span className={styles.value} style={{ color: getStatusColor(device.status) }}>
                    {device.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Quick Metrics</h3>
                <div className={styles.metricsGrid}>
                  <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                      <Icon icon="mdi:cpu-64-bit" width={20} height={20} />
                      <span>CPU Usage</span>
                    </div>
                    <div className={styles.metricValue} style={{ color: getMetricColor(45) }}>
                      45%
                    </div>
                    <div className={styles.metricBar}>
                      <div className={styles.metricBarFill} style={{ width: '45%', backgroundColor: getMetricColor(45) }} />
                    </div>
                  </div>
                  <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                      <Icon icon="mdi:memory" width={20} height={20} />
                      <span>Memory Usage</span>
                    </div>
                    <div className={styles.metricValue} style={{ color: getMetricColor(67) }}>
                      67%
                    </div>
                    <div className={styles.metricBar}>
                      <div className={styles.metricBarFill} style={{ width: '67%', backgroundColor: getMetricColor(67) }} />
                    </div>
                  </div>
                  <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                      <Icon icon="mdi:harddisk" width={20} height={20} />
                      <span>Disk Usage</span>
                    </div>
                    <div className={styles.metricValue} style={{ color: getMetricColor(23) }}>
                      23%
                    </div>
                    <div className={styles.metricBar}>
                      <div className={styles.metricBarFill} style={{ width: '23%', backgroundColor: getMetricColor(23) }} />
                    </div>
                  </div>
                  <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                      <Icon icon="mdi:gauge" width={20} height={20} />
                      <span>Response Time</span>
                    </div>
                    <div className={styles.metricValue}>24ms</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interfaces' && (
            <div className={styles.interfacesTab}>
              <h3 className={styles.sectionTitle}>Network Interfaces</h3>
              <div className={styles.interfacesList}>
                {interfaces.map((iface) => (
                  <div key={iface.id} className={styles.interfaceCard}>
                    <div className={styles.interfaceHeader}>
                      <div className={styles.interfaceName}>
                        <Icon icon="mdi:ethernet" width={20} height={20} />
                        <span>{iface.id}</span>
                      </div>
                      <span
                        className={styles.interfaceStatus}
                        style={{
                          backgroundColor: iface.status === 'up' ? 'var(--color-success)' : 'var(--color-danger)',
                        }}
                      >
                        {iface.status.toUpperCase()}
                      </span>
                    </div>
                    <div className={styles.interfaceDetails}>
                      <div className={styles.interfaceDetail}>
                        <span className={styles.label}>Speed</span>
                        <span>{iface.speed} Mbps</span>
                      </div>
                      <div className={styles.interfaceDetail}>
                        <span className={styles.label}>Duplex</span>
                        <span>{iface.duplex}</span>
                      </div>
                      <div className={styles.interfaceDetail}>
                        <span className={styles.label}>VLAN</span>
                        <span>{iface.vlan}</span>
                      </div>
                    </div>
                    <div className={styles.interfaceDescription}>
                      {iface.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'connections' && (
            <div className={styles.connectionsTab}>
              <h3 className={styles.sectionTitle}>Connected Devices</h3>
              {connections && connections.length > 0 ? (
                <div className={styles.connectionsList}>
                  {connections.map((conn, index) => (
                    <div key={index} className={styles.connectionCard}>
                      <Icon icon="mdi:lan-connect" width={24} height={24} />
                      <div>
                        <div className={styles.connectionName}>{conn.target}</div>
                        <div className={styles.connectionType}>{conn.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <Icon icon="mdi:lan-disconnect" width={48} height={48} />
                  <p>No connections found</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className={styles.metricsTab}>
              <h3 className={styles.sectionTitle}>Performance Metrics</h3>
              <div className={styles.chartPlaceholder}>
                <Icon icon="mdi:chart-line" width={48} height={48} />
                <p>Performance charts will appear here</p>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className={styles.eventsTab}>
              <h3 className={styles.sectionTitle}>Recent Events</h3>
              <div className={styles.eventsList}>
                <div className={styles.eventItem}>
                  <div className={styles.eventIcon} style={{ backgroundColor: 'var(--color-success)' }}>
                    <Icon icon="mdi:check-circle" width={16} height={16} />
                  </div>
                  <div>
                    <div className={styles.eventTitle}>Device Online</div>
                    <div className={styles.eventTime}>2 hours ago</div>
                  </div>
                </div>
                <div className={styles.eventItem}>
                  <div className={styles.eventIcon} style={{ backgroundColor: 'var(--color-warning)' }}>
                    <Icon icon="mdi:alert" width={16} height={16} />
                  </div>
                  <div>
                    <div className={styles.eventTitle}>High CPU Usage</div>
                    <div className={styles.eventTime}>5 hours ago</div>
                  </div>
                </div>
                <div className={styles.eventItem}>
                  <div className={styles.eventIcon} style={{ backgroundColor: 'var(--color-info)' }}>
                    <Icon icon="mdi:information" width={16} height={16} />
                  </div>
                  <div>
                    <div className={styles.eventTitle}>Configuration Updated</div>
                    <div className={styles.eventTime}>1 day ago</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className={styles.footer}>
          <button className={styles.btnSecondary} onClick={onClose}>
            Close
          </button>
          <button className={styles.btnPrimary}>
            <Icon icon="mdi:open-in-new" width={18} height={18} />
            View Full Details
          </button>
        </div>
      </div>
    </>
  );
};


