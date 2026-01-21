"use client";
import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from '../../shared-settings-styles.module.css';
const MOCK_REDISCOVER_JOBS = [
  { id: 1, name: 'Daily Network Scan', devices: 156, schedule: 'Daily at 2:00 AM', lastRun: '2 hours ago', status: 'Success', discovered: 3 },
  { id: 2, name: 'Weekly Full Discovery', devices: 256, schedule: 'Weekly on Sunday', lastRun: '3 days ago', status: 'Success', discovered: 12 },
  { id: 3, name: 'Critical Devices Check', devices: 45, schedule: 'Every 6 hours', lastRun: '4 hours ago', status: 'Failed', discovered: 0 },
];
const RediscoverSettings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [settings, setSettings] = useState({
    autoDiscovery: true,
    discoveryInterval: '24',
    retryAttempts: '3',
    timeout: '60',
    parallelScans: '10',
    notifyOnNewDevice: true,
    notifyOnChange: true,
  });
  const filteredJobs = MOCK_REDISCOVER_JOBS.filter(job =>
    job.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <h2 className={styles.pageTitle}>Rediscover Settings</h2>
          <p className={styles.pageDescription}>
            Configure automatic device rediscovery and monitoring settings
          </p>
          {/* Settings Section */}
          <div className={styles.settingsSection}>
            <h3 style={{color: 'var(--color-chart-cyan)', fontSize: 'var(--font-md)', marginBottom: 'var(--margin-md)'}}>
              General Settings
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Enable Auto Discovery</label>
                <button
                  className={`${styles.toggleBtn} ${settings.autoDiscovery ? styles.toggleBtnOn : ''}`}
                  onClick={() => setSettings({...settings, autoDiscovery: !settings.autoDiscovery})}
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>{settings.autoDiscovery ? 'ON' : 'OFF'}</span>
                </button>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Discovery Interval (hours)</label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={settings.discoveryInterval}
                  onChange={(e) => setSettings({...settings, discoveryInterval: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Retry Attempts</label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={settings.retryAttempts}
                  onChange={(e) => setSettings({...settings, retryAttempts: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Timeout (seconds)</label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={settings.timeout}
                  onChange={(e) => setSettings({...settings, timeout: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Parallel Scans</label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={settings.parallelScans}
                  onChange={(e) => setSettings({...settings, parallelScans: e.target.value})}
                />
              </div>
            </div>
          </div>
          {/* Notification Settings */}
          <div className={styles.settingsSection}>
            <h3 style={{color: 'var(--color-chart-cyan)', fontSize: 'var(--font-md)', marginBottom: 'var(--margin-md)'}}>
              Notification Settings
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Notify on New Device</label>
                <button
                  className={`${styles.toggleBtn} ${settings.notifyOnNewDevice ? styles.toggleBtnOn : ''}`}
                  onClick={() => setSettings({...settings, notifyOnNewDevice: !settings.notifyOnNewDevice})}
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>{settings.notifyOnNewDevice ? 'ON' : 'OFF'}</span>
                </button>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Notify on Device Change</label>
                <button
                  className={`${styles.toggleBtn} ${settings.notifyOnChange ? styles.toggleBtnOn : ''}`}
                  onClick={() => setSettings({...settings, notifyOnChange: !settings.notifyOnChange})}
                >
                  <span className={styles.toggleSlider}></span>
                  <span className={styles.toggleLabel}>{settings.notifyOnChange ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>
          </div>
          {/* Scheduled Jobs */}
          <div className={styles.settingsSection}>
            <h3 style={{color: 'var(--color-chart-cyan)', fontSize: 'var(--font-md)', marginBottom: 'var(--margin-md)'}}>
              Scheduled Discovery Jobs
            </h3>
            <div className={styles.toolbar}>
              <div className={styles.searchBox}>
                <Icon icon="mdi:magnify" width={18} height={18} />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className={styles.btnPrimary}>
                <Icon icon="mdi:plus" width={18} height={18} />
                Create Job
              </button>
            </div>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>JOB NAME</th>
                    <th>DEVICES</th>
                    <th>SCHEDULE</th>
                    <th>LAST RUN</th>
                    <th>STATUS</th>
                    <th>DISCOVERED</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job.id}>
                      <td>
                        <a href="#" className={styles.linkBlue}>{job.name}</a>
                      </td>
                      <td>
                        <span className={styles.badgeInfo}>{job.devices}</span>
                      </td>
                      <td>{job.schedule}</td>
                      <td>{job.lastRun}</td>
                      <td>
                        <span className={job.status === 'Success' ? styles.badgeSuccess : styles.badgeDanger}>
                          {job.status}
                        </span>
                      </td>
                      <td>
                        <span className={styles.badgeSuccess}>{job.discovered} new</span>
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <button className={styles.actionBtn} title="Run Now">
                            <Icon icon="mdi:play" width={18} height={18} />
                          </button>
                          <button className={styles.actionBtn} title="Edit">
                            <Icon icon="mdi:pencil" width={18} height={18} />
                          </button>
                          <button className={styles.actionBtn} title="More">
                            <Icon icon="mdi:dots-vertical" width={18} height={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.btnSecondary}>Reset</button>
            <button className={styles.btnPrimary}>Save Settings</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default RediscoverSettings;
