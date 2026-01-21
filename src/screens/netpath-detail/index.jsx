"use client";
import { PathHistory } from '@/components/features/netpath/path-history';
import { PathVisualization } from '@/components/features/netpath/path-visualization';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './styles.module.css';

// Mock data for path details
const PATH_DATA = {
  1: {
    name: 'Local Machine -Mydevice',
    source: 'DESKTOP-K2M5DQG',
    destination: '10.20.40.206',
    port: '443',
  },
  2: {
    name: 'google',
    source: 'susib',
    destination: 'www.google.com',
    port: '443',
  },
  3: {
    name: 'Microsoft',
    source: '172.16.16.1',
    destination: 'www.microsoft.com',
    port: '551',
  },
};

// Simple Semi-Circle Gauge Component - Slightly Larger for better visibility
const SemiGauge = ({ value, label, color = '#38bdf8' }) => {
  const radius = 22;
  const strokeWidth = 5;
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const circumference = Math.PI * radius;
  const strokeDasharray = `${(normalizedValue / 100) * circumference} ${circumference}`;

  return (
    <div className={styles.gaugeContainer}>
      <svg width="54" height="32" viewBox="0 0 54 32">
        <path
          d="M 5 27 A 22 22 0 0 1 49 27"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M 5 27 A 22 22 0 0 1 49 27"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
        />
      </svg>
      <div className={styles.gaugeInfo}>
        <span className={styles.gaugeValue}>{normalizedValue}%</span>
        <span className={styles.gaugeLabel}>{label}</span>
      </div>
    </div>
  );
};


const NetPathDetail = ({ pathId: propPathId }) => {
  const router = useRouter();
  // Use propPathId directly - when used in dynamic route, it will be passed from the page component
  const pathId = propPathId || '1';
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const pathInfo = PATH_DATA[pathId] || PATH_DATA['1'];

  const formatDateTime = (date) => {
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${weekday}, Oct ${day}, ${year} ${hours}:${minutes}:00 ${period}`;
  };

  return (
    <div className={styles.netPathDetail}>
      <div className={styles.header}>
        <div className={styles.headerContentWrapper}>
          <div className={styles.headerLeftSection}>
            {!propPathId && (
              <button
                className={styles.backBtn}
                onClick={() => router.push('/netpath')}
              >
                <Icon icon="mdi:chevron-left" width={20} height={20} />
              </button>
            )}
            <div className={styles.globeIcon}>
              <Icon icon="mdi:web" width={24} height={24} color="#38bdf8" />
            </div>
            <div className={styles.mainTitleGroup}>
              <h1 className={styles.destinationTitle}>{pathInfo.destination}</h1>
              <div className={styles.pathFlowHeader}>
                <span className={styles.flowNode}>{pathInfo.source}</span>
                <Icon icon="mdi:arrow-right-thin" className={styles.flowArrow} />
                <span className={styles.flowNode}>{pathInfo.destination}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.headerRightSection}>
            <div className={styles.metricBlock}>
              <span className={styles.metricBlockLabel}>PORT</span>
              <span className={styles.metricBlockValue}>{pathInfo.port}</span>
            </div>
            
            <div className={styles.vSeparator} />

            <div className={styles.latencyGroup}>
              <span className={styles.metricBlockLabel}>LATENCY (MIN / AVG / MAX)</span>
              <div className={styles.latencyValues}>
                <span className={styles.latVal}>0.36ms</span>
                <span className={styles.latDivider}>/</span>
                <span className={styles.latValHighlight}>0.44ms</span>
                <span className={styles.latDivider}>/</span>
                <span className={styles.latVal}>0.51ms</span>
              </div>
            </div>

            <div className={styles.vSeparator} />

            <div className={styles.gaugeGroup}>
              <SemiGauge value={0} label="Packet Loss" color="#ef4444" />
              <div className={styles.vSeparatorSmall} />
              <SemiGauge value={100} label="Transit Likelihood" color="#10b981" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <PathVisualization pathInfo={pathInfo} />

        <PathHistory />

        <div className={styles.footer}>
          <div className={styles.navControls}>
            <button className={styles.navBtn}>
              <Icon icon="mdi:chevron-double-left" width={16} height={16} />
            </button>
            <button className={styles.navBtn}>
              <Icon icon="mdi:chevron-left" width={16} height={16} />
            </button>
            <span className={styles.dateTime}>
              {formatDateTime(currentDateTime)}
            </span>
            <button className={styles.navBtn}>
              <Icon icon="mdi:chevron-right" width={16} height={16} />
            </button>
            <button className={styles.navBtn}>
              <Icon icon="mdi:chevron-double-right" width={16} height={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetPathDetail;
