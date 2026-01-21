"use client";
import { Icon } from '@iconify/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './styles.module.css';

// Mock report data
const MOCK_REPORT_DATA = {
  1: {
    title: 'CPU Forecast Report',
    category: 'Forecast',
    type: 'Forecast',
    timePeriod: '',
    generatedAt: 'Wed, Feb 05, 2025 03:04:11 PM',
    notes: [
      'Stable Growth: Utilization shows no significant growth and appears to be stable.',
      'Already Reached: The value has already reached the defined threshold.',
      'Insufficient Data: Forecasting is not possible due to insufficient data, probably because of short monitoring period.',
    ],
    data: [
      {
        id: '1',
        name: 'snr-edatas86v662',
        ip: '172.16.8.62',
        type: 'linux',
        forecast80: 'Stable Growth',
        forecast90: 'Stable Growth',
        forecast100: 'Stable Growth',
      },
      {
        id: '2',
        name: 'test-123',
        ip: '172.16.8.84',
        type: 'linux',
        forecast80: 'Stable Growth',
        forecast90: 'Stable Growth',
        forecast100: 'Stable Growth',
      },
      {
        id: '3',
        name: 'AIOps',
        ip: '172.16.14.71',
        type: 'linux',
        forecast80: 'Insufficient Data',
        forecast90: 'Insufficient Data',
        forecast100: 'Insufficient Data',
      },
      {
        id: '4',
        name: 'ubuntu860',
        ip: '172.16.8.60',
        type: 'linux',
        forecast80: 'Stable Growth',
        forecast90: 'Stable Growth',
        forecast100: 'Stable Growth',
      },
      {
        id: '5',
        name: "Bhavin's PC",
        ip: '10.20.40.45',
        type: 'windows',
        forecast80: 'Insufficient Data',
        forecast90: 'Insufficient Data',
        forecast100: 'Insufficient Data',
      },
      {
        id: '6',
        name: 'solarisf1-4',
        ip: '172.16.8.222',
        type: 'solaris',
        forecast80: 'Stable Growth',
        forecast90: 'Stable Growth',
        forecast100: 'Stable Growth',
      },
      {
        id: '7',
        name: 'centos7-6',
        ip: '172.16.8.237',
        type: 'linux',
        forecast80: 'Stable Growth',
        forecast90: 'Stable Growth',
        forecast100: 'Stable Growth',
      },
      {
        id: '8',
        name: 'snr-edatas8.61',
        ip: '172.16.8.61',
        type: 'linux',
        forecast80: 'Stable Growth',
        forecast90: 'Stable Growth',
        forecast100: 'Stable Growth',
      },
      {
        id: '9',
        name: 'aiops-8235',
        ip: '172.16.8.235',
        type: 'linux',
        forecast80: '2 weeks 2 hours',
        forecast90: '3 weeks 3 days 14 hours',
        forecast100: '1 month 3 days 2 hours',
      },
      {
        id: '10',
        name: 'newjenkins',
        ip: '172.16.8.56',
        type: 'linux',
        forecast80: 'Stable Growth',
        forecast90: 'Stable Growth',
        forecast100: 'Stable Growth',
      },
    ],
  },
  2: {
    title: 'Idle VMware ESXis',
    category: 'Capacity Planning',
    type: 'Capacity Planning',
    timePeriod: '1d',
    generatedAt: 'Wed, Feb 05, 2025 02:50:36 PM',
    notes: [
      'Monitors are idle if Any of following conditions are satisfied:',
      'CPU Utilization < 30% OR Memory Utilization < 30% OR Total Disk Utilization < 30%',
      'Monitors are Idle if Percentage of Time > 50%',
    ],
    data: [
      {
        id: '1',
        name: 'esxi26.snr-edatas.local',
        ip: '172.16.10.26',
        type: 'vmware',
        cpu: '60% of time CPU Utilization < 30%',
        memory: '0% of time Memory Utilization < 30%',
        disk: '0% of time Disk Utilization < 30%',
      },
      {
        id: '2',
        name: 'esxi27.snr-edatas.local',
        ip: '172.16.10.27',
        type: 'vmware',
        cpu: '100% of time CPU Utilization < 30%',
        memory: '0% of time Memory Utilization < 30%',
        disk: '0% of time Disk Utilization < 30%',
      },
      {
        id: '3',
        name: 'esxi15.snr-edatas.local',
        ip: '172.16.10.15',
        type: 'vmware',
        cpu: '100% of time CPU Utilization < 30%',
        memory: '0% of time Memory Utilization < 30%',
        disk: '0% of time Disk Utilization < 30%',
      },
    ],
  },
  3: {
    title: 'Underutilized VMWare ESXis',
    category: 'Capacity Planning',
    type: 'Capacity Planning',
    timePeriod: '1d',
    generatedAt: 'Thu, Feb 20, 2025 12:11:04 PM',
    notes: [
      'Monitors are Underutilized if Any of following conditions are satisfied:',
      'CPU Utilization < 50% OR Memory Utilization < 50% OR Total Disk Utilization < 50%',
      'Monitors are Underutilized if Percentage of Time > 50%',
    ],
    data: [
      {
        id: '1',
        name: 'esxi26.snr-edatas.local',
        ip: '172.16.10.26',
        type: 'vmware',
        cpu: '82% of time CPU Utilization < 50%',
        memory: '0% of time Memory Utilization < 50%',
        disk: '100% of time Disk Utilization < 50%',
        highlight: false,
      },
      {
        id: '2',
        name: 'esxi27.snr-edatas.local',
        ip: '172.16.10.27',
        type: 'vmware',
        cpu: '100% of time CPU Utilization < 50%',
        memory: '0% of time Memory Utilization < 50%',
        disk: '100% of time Disk Utilization < 50%',
        highlight: true,
      },
      {
        id: '3',
        name: 'esxi18.snr-edatas.local',
        ip: '172.16.10.18',
        type: 'vmware',
        cpu: '100% of time CPU Utilization < 50%',
        memory: '0% of time Memory Utilization < 50%',
        disk: '100% of time Disk Utilization < 50%',
        highlight: false,
      },
      {
        id: '4',
        name: 'esxi15.snr-edatas.local',
        ip: '172.16.10.15',
        type: 'vmware',
        cpu: '100% of time CPU Utilization < 50%',
        memory: '0% of time Memory Utilization < 50%',
        disk: '0% of time Disk Utilization < 50%',
        highlight: false,
      },
    ],
  },
};

const ReportDetail = () => {
  const { reportId } = useParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const report = MOCK_REPORT_DATA[reportId] || MOCK_REPORT_DATA['1'];

  const getTypeIcon = (type) => {
    const icons = {
      linux: <Icon icon="mdi:linux" width={18} />,
      windows: <Icon icon="mdi:microsoft-windows" width={18} />,
      solaris: <Icon icon="mdi:weather-sunny" width={18} />,
      vmware: <Icon icon="mdi:server" width={18} />,
    };
    return icons[type] || <Icon icon="mdi:laptop" width={18} />;
  };

  return (
    <div className={styles.reportDetail}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => router.push('/reports')}>
            <Icon icon="mdi:chevron-left" width={20} />
          </button>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{report.title}</h1>
            <span className={styles.subtitle}>Report Details & Data</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.actionBtn} title="Export">
            <Icon icon="mdi:download" width={18} />
          </button>
          <button className={styles.actionBtn} title="Share">
            <Icon icon="mdi:share-variant" width={18} />
          </button>
          <button className={styles.actionBtn} title="More">
            <Icon icon="mdi:dots-vertical" width={18} />
          </button>
        </div>
      </div>

      {/* Report Metadata */}
      <div className={styles.metadataContainer}>
        <div className={styles.metadataRow}>
          <span className={styles.metaLabel}>
            <Icon icon="mdi:folder" width={14} style={{ color: '#06b6d4' }} />
            Category
          </span>
          <span className={styles.metaCapsule}>{report.category}</span>
        </div>
        <div className={styles.metadataRow}>
          <span className={styles.metaLabel}>
            <Icon icon="mdi:file-document" width={14} style={{ color: '#8b5cf6' }} />
            Type
          </span>
          <span className={styles.metaCapsule}>{report.type}</span>
        </div>
        <div className={styles.metadataRow}>
          <span className={styles.metaLabel}>
            <Icon icon="mdi:clock-outline" width={14} style={{ color: '#f59e0b' }} />
            Time Period
          </span>
          {report.timePeriod ? (
            <span className={styles.metaCapsule}>{report.timePeriod}</span>
          ) : (
            <span className={styles.metaCapsule}>Custom</span>
          )}
        </div>
        <div className={styles.metadataRow}>
          <span className={styles.metaLabel}>
            <Icon icon="mdi:calendar-clock" width={14} style={{ color: '#10b981' }} />
            Generated At
          </span>
          <span className={styles.metaCapsule}>{report.generatedAt}</span>
        </div>
      </div>

      {/* Notes */}
      {report.notes && report.notes.length > 0 && (
        <div className={styles.notesSection}>
          <div className={styles.notesHeader}>
            <Icon icon="mdi:information" width={16} />
            <span>Important Notes</span>
          </div>
          <ul className={styles.notesList}>
            {report.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <span className={styles.resultCount}>
            {report.data.length} {report.data.length === 1 ? 'entry' : 'entries'}
          </span>
        </div>
        <div className={styles.toolbarRight}>
          <div className={styles.searchBar}>
            <Icon icon="mdi:magnify" className={styles.searchIcon} width={16} />
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>MONITOR NAME</th>
              <th>MONITOR IP</th>
              <th>TYPE</th>
              {report.title === 'CPU Forecast Report' ? (
                <>
                  <th>FORECAST (≥80%)</th>
                  <th>FORECAST (≥90%)</th>
                  <th>FORECAST (100%)</th>
                </>
              ) : (
                <>
                  <th>CPU UTILIZATION</th>
                  <th>MEMORY UTILIZATION</th>
                  <th>DISK UTILIZATION</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {report.data
              .filter((row) =>
                row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                row.ip.includes(searchQuery)
              )
              .map((row) => (
                <tr
                  key={row.id}
                  className={row.highlight ? styles.highlightRow : ''}
                >
                  <td className={styles.nameCell}>{row.name}</td>
                  <td className={styles.ipCell}>{row.ip}</td>
                  <td className={styles.typeCell}>
                    <span className={styles.typeIcon}>
                      {getTypeIcon(row.type)}
                    </span>
                  </td>
                  {report.title === 'CPU Forecast Report' ? (
                    <>
                      <td>{row.forecast80}</td>
                      <td>{row.forecast90}</td>
                      <td>{row.forecast100}</td>
                    </>
                  ) : (
                    <>
                      <td>{row.cpu}</td>
                      <td>{row.memory}</td>
                      <td>{row.disk}</td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportDetail;
