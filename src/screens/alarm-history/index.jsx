"use client";
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

const AlarmHistory = () => {
  const router = useRouter();
  const { alertId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const alarmData = {
    monitor: 'PMG-Router.test.Com',
    ip: '172.16.9.41',
    alertId: '78509238333572',
    host: 'PMG-Router.test.Com',
    correlatedAlerts: '5',
    alertPolicy: 'Availability',
    severity: 'DOWN',
    firstSeen: '2 hours ago',
  };

  const policyTable = [
    {
      policyName: 'Availability',
      alertId: '78509238333572',
      type: 'Availability',
      monitor: '192.168.2.4:1',
      firstTriggeredAt: '19459:448 days 17 hours 7 minutes',
    },
    {
      policyName: 'Availability',
      alertId: '78509238333572',
      type: 'Availability',
      monitor: '192.168.2.40:1',
      firstTriggeredAt: '19459:5:54 days 16 hours 25 minutes',
    },
    {
      policyName: 'Availability',
      alertId: '78509238333572',
      type: 'Availability',
      monitor: '192.168.2.4:2',
      firstTriggeredAt: '19459:5:54 days 8 hours 16 minutes',
    },
    {
      policyName: 'Availability',
      alertId: '78509238333572',
      type: 'Availability',
      monitor: '192.168.2.4:3:2',
      firstTriggeredAt: '19459:22 days 9 hours 8 minutes',
    },
    {
      policyName: 'Availability',
      alertId: '78509238333572',
      type: 'Availability',
      monitor: '192.168.2.4:5:2',
      firstTriggeredAt: '19459:22 days 9 hours 8 minutes',
    },
  ];

  return (
    <div className={styles.alarmHistory}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.push('/alerts')}>
          <Icon icon="mdi:arrow-left" width={20} height={20} />
        </button>
        <h1 className={styles.title}>Alarm History</h1>
        <div className={styles.headerActions}>
          <button className={styles.actionBtn}>Acknowledge Alert</button>
          <button className={styles.actionBtn}>Suppress Alert</button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === 'overview' ? styles.tabActive : ''
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
      </div>

      <div className={styles.content}>
        {/* Left Panel - Alert Info */}
        <div className={styles.leftPanel}>
          <div className={styles.infoCard}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Monitor</span>
              <span className={styles.infoValue}>{alarmData.monitor}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>IP</span>
              <span className={styles.infoValue}>{alarmData.ip}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Alert ID</span>
              <span className={styles.infoValue}>{alarmData.alertId}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Host</span>
              <span className={styles.infoValue}>{alarmData.host}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Correlated Alerts</span>
              <span className={styles.infoValue}>
                {alarmData.correlatedAlerts}
              </span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Alert Policy</span>
              <span className={styles.infoValue}>{alarmData.alertPolicy}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Severity</span>
              <span className={`${styles.infoValue} ${styles.severityBadge}`}>
                {alarmData.severity}
              </span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>First seen</span>
              <span className={styles.infoValue}>{alarmData.firstSeen}</span>
            </div>
          </div>
        </div>

        {/* Center Panel - Topology */}
        <div className={styles.centerPanel}>
          <div className={styles.topologyCard}>
            <div className={styles.topologyCanvas}>
              {/* Root Node */}
              <div className={styles.topologyRoot}>
                <div className={styles.nodeIcon}>
                  <div className={styles.nodeCircle}>
                    <span className={styles.nodeLabel}>PAM@SQL</span>
                  </div>
                </div>
              </div>

              {/* Connection Lines */}
              <svg className={styles.connectionSvg}>
                <line
                  x1="50%"
                  y1="80"
                  x2="25%"
                  y2="200"
                  stroke="rgba(168, 85, 247, 0.5)"
                  strokeWidth="2"
                />
                <line
                  x1="50%"
                  y1="80"
                  x2="50%"
                  y2="200"
                  stroke="rgba(168, 85, 247, 0.5)"
                  strokeWidth="2"
                />
                <line
                  x1="50%"
                  y1="80"
                  x2="75%"
                  y2="200"
                  stroke="rgba(168, 85, 247, 0.5)"
                  strokeWidth="2"
                />

                {/* Second level connections */}
                <line
                  x1="25%"
                  y1="230"
                  x2="25%"
                  y2="350"
                  stroke="rgba(168, 85, 247, 0.5)"
                  strokeWidth="2"
                />
                <line
                  x1="50%"
                  y1="230"
                  x2="50%"
                  y2="350"
                  stroke="rgba(168, 85, 247, 0.5)"
                  strokeWidth="2"
                />
                <line
                  x1="75%"
                  y1="230"
                  x2="75%"
                  y2="350"
                  stroke="rgba(168, 85, 247, 0.5)"
                  strokeWidth="2"
                />
              </svg>

              {/* Second Level Nodes */}
              <div className={styles.topologyLevel2}>
                <div className={styles.nodeWrapper} style={{ left: '20%' }}>
                  <div className={styles.nodeCirclePurple}>
                    <span className={styles.nodeLabelSmall}>192.168.2.4..</span>
                  </div>
                </div>
                <div className={styles.nodeWrapper} style={{ left: '47%' }}>
                  <div className={styles.nodeCirclePurple}>
                    <span className={styles.nodeLabelSmall}>192.168.2.4..</span>
                  </div>
                </div>
                <div className={styles.nodeWrapper} style={{ left: '72%' }}>
                  <div className={styles.nodeCirclePurple}>
                    <span className={styles.nodeLabelSmall}>192.168.2.4..</span>
                  </div>
                </div>
              </div>

              {/* Third Level Nodes */}
              <div className={styles.topologyLevel3}>
                <div className={styles.nodeWrapper} style={{ left: '20%' }}>
                  <div className={styles.nodeCircleSmall}>
                    <span className={styles.nodeLabelSmall}>192.168.2.4..</span>
                  </div>
                </div>
                <div className={styles.nodeWrapper} style={{ left: '47%' }}>
                  <div className={styles.nodeCircleSmall}>
                    <span className={styles.nodeLabelSmall}>192.168.2.4..</span>
                  </div>
                </div>
                <div className={styles.nodeWrapper} style={{ left: '72%' }}>
                  <div className={styles.nodeCircleSmall}>
                    <span className={styles.nodeLabelSmall}>192.168.2.4..</span>
                  </div>
                </div>
              </div>

              {/* Bottom Icons */}
              <div className={styles.topologyBottom}>
                <div className={styles.bottomIcon}><Icon icon="mdi:monitor" width={20} height={20} /></div>
                <div className={styles.bottomIcon}><Icon icon="mdi:power-plug" width={20} height={20} /></div>
                <div className={styles.bottomIcon}><Icon icon="mdi:package-variant" width={20} height={20} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Search and Table */}
        <div className={styles.rightPanel}>
          <div className={styles.searchBox}>
            <Icon icon="mdi:magnify" width={18} height={18} />
            <input
              type="text"
              placeholder="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Policy Table */}
      <div className={styles.tableSection}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Policy Name</th>
              <th>Alert ID</th>
              <th>Type</th>
              <th>Monitor</th>
              <th>First Triggered at</th>
            </tr>
          </thead>
          <tbody>
            {policyTable.map((item, index) => (
              <tr key={index}>
                <td>
                  <span className={styles.policyName}>{item.policyName}</span>
                </td>
                <td>{item.alertId}</td>
                <td>
                  <span className={styles.typeTag}>{item.type}</span>
                </td>
                <td>{item.monitor}</td>
                <td>{item.firstTriggeredAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlarmHistory;
