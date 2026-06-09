import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

export const DeviceDetailSidebar = ({
  device,
  connections,
  onClose,
  isOpen,
}) => {
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

  const interfaces = device.interfaces || [];
  const cpu = Number(device.cpu || 0);
  const memory = Number(device.memory || 0);
  const disk = Number(device.disk || 0);
  const responseTime = device.response_time ?? device.responseTime;

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={onClose}
      />
      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <div
              className={styles.deviceIcon}
              style={{ borderColor: getStatusColor(device.status) }}
            >
              <Icon
                icon="mdi:server"
                width={32}
                height={32}
                style={{ color: getStatusColor(device.status) }}
              />
            </div>
            <div>
              <h2 className={styles.title}>{device.label}</h2>
              <p className={styles.subtitle}>
                {device.vendor} {device.model}
              </p>
              <div
                className={styles.statusBadge}
                style={{ backgroundColor: getStatusColor(device.status) }}
              >
                {String(device.status || 'unknown').toUpperCase()}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className={styles.closeBtn}
            onClick={onClose}
          >
            <Icon icon="mdi:close" width={24} height={24} />
          </Button>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <Button
            variant={activeTab === 'overview' ? 'primary' : 'outline'}
            className={`${styles.tab} ${activeTab === 'overview' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'interfaces' ? 'primary' : 'outline'}
            className={`${styles.tab} ${activeTab === 'interfaces' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('interfaces')}
          >
            Interfaces
          </Button>
          <Button
            variant={activeTab === 'connections' ? 'primary' : 'outline'}
            className={`${styles.tab} ${activeTab === 'connections' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('connections')}
          >
            Connections
          </Button>
          <Button
            variant={activeTab === 'metrics' ? 'primary' : 'outline'}
            className={`${styles.tab} ${activeTab === 'metrics' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('metrics')}
          >
            Metrics
          </Button>
          <Button
            variant={activeTab === 'events' ? 'primary' : 'outline'}
            className={`${styles.tab} ${activeTab === 'events' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </Button>
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
                  <span
                    className={styles.value}
                    style={{ color: getStatusColor(device.status) }}
                  >
                    {String(device.status || 'unknown').toUpperCase()}
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
                    <div
                      className={styles.metricValue}
                      style={{ color: getMetricColor(cpu) }}
                    >
                      {cpu || 0}%
                    </div>
                    <div className={styles.metricBar}>
                      <div
                        className={styles.metricBarFill}
                        style={{
                          width: `${Math.min(cpu, 100)}%`,
                          backgroundColor: getMetricColor(cpu),
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                      <Icon icon="mdi:memory" width={20} height={20} />
                      <span>Memory Usage</span>
                    </div>
                    <div
                      className={styles.metricValue}
                      style={{ color: getMetricColor(memory) }}
                    >
                      {memory || 0}%
                    </div>
                    <div className={styles.metricBar}>
                      <div
                        className={styles.metricBarFill}
                        style={{
                          width: `${Math.min(memory, 100)}%`,
                          backgroundColor: getMetricColor(memory),
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                      <Icon icon="mdi:harddisk" width={20} height={20} />
                      <span>Disk Usage</span>
                    </div>
                    <div
                      className={styles.metricValue}
                      style={{ color: getMetricColor(disk) }}
                    >
                      {disk || 0}%
                    </div>
                    <div className={styles.metricBar}>
                      <div
                        className={styles.metricBarFill}
                        style={{
                          width: `${Math.min(disk, 100)}%`,
                          backgroundColor: getMetricColor(disk),
                        }}
                      />
                    </div>
                  </div>
                  <div className={styles.metricCard}>
                    <div className={styles.metricHeader}>
                      <Icon icon="mdi:gauge" width={20} height={20} />
                      <span>Response Time</span>
                    </div>
                    <div className={styles.metricValue}>
                      {responseTime != null ? `${responseTime}ms` : '-'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interfaces' && (
            <div className={styles.interfacesTab}>
              <h3 className={styles.sectionTitle}>Network Interfaces</h3>
              <div className={styles.interfacesList}>
                {interfaces.length > 0 ? (
                  interfaces.map((iface) => (
                    <div key={iface.id} className={styles.interfaceCard}>
                      <div className={styles.interfaceHeader}>
                        <div className={styles.interfaceName}>
                          <Icon icon="mdi:ethernet" width={20} height={20} />
                          <span>{iface.name || iface.id}</span>
                        </div>
                        <span
                          className={styles.interfaceStatus}
                          style={{
                            backgroundColor:
                              iface.status === 'up'
                                ? 'var(--color-success)'
                                : 'var(--color-danger)',
                          }}
                        >
                          {String(iface.status || 'unknown').toUpperCase()}
                        </span>
                      </div>
                      <div className={styles.interfaceDetails}>
                        <div className={styles.interfaceDetail}>
                          <span className={styles.label}>Speed</span>
                          <span>{iface.speed || '-'}</span>
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
                        {iface.description || '-'}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.emptyState}>
                    <Icon icon="mdi:ethernet-off" width={48} height={48} />
                    <p>No interfaces found</p>
                  </div>
                )}
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
                        <div className={styles.connectionName}>
                          {conn.target}
                        </div>
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
              {device.metrics && device.metrics.length > 0 ? (
                <div className={styles.eventsList}>
                  {device.metrics.slice(-12).map((metric) => (
                    <div key={metric.time} className={styles.eventItem}>
                      <div
                        className={styles.eventIcon}
                        style={{ backgroundColor: 'var(--color-info)' }}
                      >
                        <Icon icon="mdi:chart-line" width={16} height={16} />
                      </div>
                      <div>
                        <div className={styles.eventTitle}>
                          CPU {metric.cpu ?? '-'}% / Memory{' '}
                          {metric.memory ?? '-'}%
                        </div>
                        <div className={styles.eventTime}>
                          {metric.latency_ms != null
                            ? `${metric.latency_ms}ms latency`
                            : 'Latency unavailable'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.chartPlaceholder}>
                  <Icon icon="mdi:chart-line" width={48} height={48} />
                  <p>No metric history found</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'events' && (
            <div className={styles.eventsTab}>
              <h3 className={styles.sectionTitle}>Recent Events</h3>
              <div className={styles.eventsList}>
                {(device.events || []).map((event) => (
                  <div
                    key={`${event.title}-${event.time}`}
                    className={styles.eventItem}
                  >
                    <div
                      className={styles.eventIcon}
                      style={{
                        backgroundColor:
                          event.severity === 'success'
                            ? 'var(--color-success)'
                            : event.severity === 'warning'
                              ? 'var(--color-warning)'
                              : event.severity === 'error'
                                ? 'var(--color-danger)'
                                : 'var(--color-info)',
                      }}
                    >
                      <Icon icon="mdi:information" width={16} height={16} />
                    </div>
                    <div>
                      <div className={styles.eventTitle}>{event.title}</div>
                      <div className={styles.eventTime}>
                        {event.time
                          ? new Date(event.time).toLocaleString()
                          : event.description}
                      </div>
                    </div>
                  </div>
                ))}
                {(!device.events || device.events.length === 0) && (
                  <div className={styles.emptyState}>
                    <Icon
                      icon="mdi:timeline-clock-outline"
                      width={48}
                      height={48}
                    />
                    <p>No recent events found</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className={styles.footer}>
          <Button
            variant="outline"
            className={styles.btnSecondary}
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </>
  );
};
