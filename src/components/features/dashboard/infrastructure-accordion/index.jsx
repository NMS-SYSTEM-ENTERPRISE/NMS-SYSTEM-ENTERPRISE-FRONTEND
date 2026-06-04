'use client';

import { Activity, ChevronDown, Server, ListFilter } from 'lucide-react';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import CountUp from 'react-countup';
import { Battery, CheckCircle2, Network, XCircle, Server as ServerIcon } from 'lucide-react';

const CircularGauge = ({ value, max = 100, color, size = 48, strokeWidth = 4 }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setCurrentValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedValue = Math.min(Math.max(currentValue, 0), max);
  const percent = max > 0 ? normalizedValue / max : 0;
  const offset = circumference - percent * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-bg-tertiary)" strokeWidth={strokeWidth} />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: 'stroke-dashoffset 2s ease-out' }} />
    </svg>
  );
};

const LatencyBar = ({ ping }) => {
  if (!ping) return <span style={{ color: 'var(--color-text-muted)' }}>—</span>;
  const ms = parseInt(ping);
  let blocks = 5;
  let color = '#22c55e'; // Green
  if (ms > 200) { blocks = 1; color = '#ef4444'; } // Red
  else if (ms > 100) { blocks = 2; color = '#f97316'; } // Orange
  else if (ms > 50) { blocks = 3; color = '#eab308'; } // Yellow
  else if (ms > 20) { blocks = 4; color = '#22c55e'; } // Green

  return (
    <div className={styles.latencyViz}>
      <div className={styles.latencyStrip}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.latencyBlock} style={{ backgroundColor: i < blocks ? color : 'var(--color-bg-tertiary)' }} />
        ))}
      </div>
      <div style={{ width: '60px', color, fontSize: '0.85rem', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
        <CountUp end={ms} duration={2} separator="," /> ms
      </div>
    </div>
  );
};

const UptimeVisual = ({ uptime }) => {
  if (!uptime) return <span style={{ color: 'var(--color-text-muted)' }}>—</span>;
  const days = parseFloat(uptime) || 0;

  let color = '#ef4444'; // Red
  if (days >= 20) color = '#22c55e'; // Green
  else if (days >= 5) color = '#eab308'; // Yellow

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <CircularGauge value={days} max={30} color={color} size={28} strokeWidth={4} />
      <div style={{ width: '70px', color, fontSize: '0.85rem', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
        <CountUp end={days} decimals={1} duration={2} /> days
      </div>
    </div>
  );
};

const avatarColors = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#14b8a6', '#6366f1', '#f43f5e'
];

const getAvatarData = (name) => {
  const cleanName = (name || 'Unknown').trim();
  const initial = cleanName.charAt(0).toUpperCase();
  const hash = Array.from(cleanName).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const color = avatarColors[hash % avatarColors.length];
  return { initial, color };
};

const getTypeVisuals = (type) => {
  const t = (type || '').toLowerCase();
  if (t.includes('ups') || t.includes('battery')) return { icon: <Battery size={16} />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' };
  if (t.includes('switch') || t.includes('router') || t.includes('network')) return { icon: <Network size={16} />, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' };
  return { icon: <ServerIcon size={16} />, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' };
};

const DeviceTable = ({ devices }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!devices || devices.length === 0) {
    return <div className={styles.noData}>No devices available in this category.</div>;
  }

  const totalPages = Math.ceil(devices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDevices = devices.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.deviceTable}>
          <thead>
            <tr>
              <th>Device Name</th>
              <th>IP Address</th>
              <th style={{ textAlign: 'center' }}>Type</th>
              <th>Uptime</th>
              <th>Latency</th>
              <th style={{ textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentDevices.map((device, index) => {
              const isUp = device.status === 'UP';
              const avatar = getAvatarData(device.name);
              const typeVis = getTypeVisuals(device.type);

              return (
                <tr key={index}>
                  <td>
                    <div className={styles.deviceNameContainer}>
                      <div className={styles.avatar} style={{ backgroundColor: avatar.color }}>
                        {avatar.initial}
                      </div>
                      <span className={styles.deviceNameText}>{device.name}</span>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'monospace' }}>{device.ip}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div
                      className={styles.typeIconOnly}
                      style={{ color: typeVis.color, backgroundColor: typeVis.bg }}
                      title={device.type}
                    >
                      {typeVis.icon}
                    </div>
                  </td>
                  <td><UptimeVisual uptime={device.uptime} /></td>
                  <td><LatencyBar ping={device.ping} /></td>
                  <td style={{ textAlign: 'center' }}>
                    <span
                      className={`${styles.statusIndicator} ${isUp ? styles.statusUp : styles.statusDown}`}
                      title={isUp ? 'Online' : 'Offline'}
                    >
                      {isUp ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <div className={styles.pageControls}>
            <button
              className={styles.pageButton}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
            >
              Previous
            </button>
            <button
              className={styles.pageButton}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const InfrastructureAccordion = ({ statistics }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('total');
  const [activeType, setActiveType] = useState('All');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  if (!statistics) return null;

  const tabs = [
    { id: 'total', label: 'Total Devices', count: statistics.total || 0, data: statistics.total_devices || [] },
    { id: 'online', label: 'Online', count: statistics.online || 0, data: statistics.online_devices || [] },
    { id: 'offline', label: 'Offline', count: statistics.offline || 0, data: statistics.offline_devices || [] },
  ];

  const currentTabData = tabs.find(t => t.id === activeTab)?.data || [];

  const availableTypes = ['All', ...Array.from(new Set(currentTabData.map(d => d.type).filter(Boolean)))];

  const filteredData = activeType === 'All'
    ? currentTabData
    : currentTabData.filter(d => d.type === activeType);

  return (
    <div className={styles.accordionContainer}>
      <div className={styles.accordionItem} data-open={isOpen}>
        <style>{`
          .${styles.accordionHeader}[data-open="true"]::before {
             background-color: #3b82f6;
          }
        `}</style>
        <div className={styles.accordionHeader} data-open={isOpen} onClick={() => setIsOpen(!isOpen)}>
          <div className={styles.headerLeft}>
            <div className={styles.iconWrapper} style={{ color: isOpen ? '#3b82f6' : '#94a3b8' }}>
              <ServerIcon size={20} />
            </div>
            <span className={styles.headerTitle}>Infrastructure Summary</span>
          </div>
          <div className={styles.headerRight}>
            <span
              className={styles.statBadge}
              style={{
                backgroundColor: isOpen ? '#3b82f6' : 'var(--color-bg-tertiary)',
                color: isOpen ? '#fff' : 'var(--color-text-secondary)',
                border: isOpen ? 'none' : '1px solid var(--color-border)'
              }}
            >
              {statistics.total || 0} Total
            </span>
            <ChevronDown
              size={18}
              className={styles.chevron}
            />
          </div>
        </div>

        {isOpen && (
          <div className={styles.accordionContent}>

            {/* Controls Row: Tabs and Filters */}
            <div className={styles.controlsRow}>
              <div className={styles.tabsGroup}>
                {tabs.map((tab, index) => (
                  <div key={tab.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                      className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setActiveType('All'); // Reset type filter when switching tabs
                      }}
                      title={tab.label}
                    >
                      {tab.id === 'total' && <ServerIcon size={16} />}
                      {tab.id === 'online' && <CheckCircle2 size={16} />}
                      {tab.id === 'offline' && <XCircle size={16} />}
                      <span className={styles.tabBadge}>{tab.count}</span>
                    </button>
                    {index < tabs.length - 1 && (
                      <div className={styles.verticalDivider}></div>
                    )}
                  </div>
                ))}
              </div>

              {availableTypes.length > 1 && (
                <div className={styles.filterGroup}>
                  <button
                    className={`${styles.filterToggleButton} ${isFilterVisible || activeType !== 'All' ? styles.activeFilter : ''}`}
                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                    title="Filter by Device Type"
                  >
                    <ListFilter size={16} />
                    {activeType !== 'All' && <div className={styles.filterDot} />}
                  </button>

                  {(isFilterVisible || activeType !== 'All') && (
                    <div className={styles.subTabsGroup}>
                      {availableTypes.map(type => {
                        const typeCount = type === 'All' ? currentTabData.length : currentTabData.filter(d => d.type === type).length;
                        const typeVis = type === 'All' ? { icon: <span style={{ fontWeight: 600 }}>All</span> } : getTypeVisuals(type);

                        return (
                          <button
                            key={type}
                            className={`${styles.subTabButton} ${activeType === type ? styles.activeSubTab : ''}`}
                            onClick={() => setActiveType(type)}
                            title={type !== 'All' ? type : 'All Devices'}
                          >
                            {typeVis.icon}
                            <span className={styles.subTabBadge}>{typeCount}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Table Content */}
            <DeviceTable devices={filteredData} />
          </div>
        )}
      </div>
    </div>
  );
};
