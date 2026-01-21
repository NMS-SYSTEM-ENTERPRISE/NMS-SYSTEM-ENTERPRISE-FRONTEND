import { Icon } from '@iconify/react';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import styles from './netpath-overview.module.css';

const NetPathOverview = ({ path, onViewDetails }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [timeRange, setTimeRange] = useState('24h');

  // Removed chart initialization logic for Performance Metrics

  return (
    <div className={styles.container}>
      {/* 1. Top Action Bar */}
      <div className={styles.actionBar}>
        <div className={styles.pathIdentity}>
          <div className={styles.iconBox}>
            <Icon icon="mdi:web" width={24} />
          </div>
          <div className={styles.identityInfo}>
            <h1 className={styles.pathName}>{path.name}</h1>
            <div className={styles.pathRoute}>
              <span>{path.source}</span>
              <Icon icon="mdi:arrow-right-thin" className={styles.routeArrow} />
              <span>{path.destination}:{path.port}</span>
            </div>
          </div>
          <span className={`${styles.statusBadge} ${styles[path.status]}`}>
            {path.status}
          </span>
        </div>

        <div className={styles.actions}>
          <button className={styles.actionButton} title="Analyze Path">
            <Icon icon="mdi:google-analytics" />
            <span>Analyze</span>
          </button>
          <button className={styles.actionButton} title="Edit Configuration">
            <Icon icon="mdi:pencil" />
            <span>Edit</span>
          </button>
          <button className={styles.actionButton} title="History">
            <Icon icon="mdi:history" />
            <span>History</span>
          </button>
          <div className={styles.divider} />
          <button className={styles.primaryButton} onClick={() => onViewDetails(path.id)}>
            <span>Deep Dive</span>
            <Icon icon="mdi:arrow-right" />
          </button>
        </div>
      </div>

      {/* 2. Main Grid Layout */}
      <div className={styles.bentoGrid}>
        {/* Row 1: Stats Cards (Evenly Distributed) */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Availability</span>
            <Icon icon="mdi:check-circle" className={styles.statIconSuccess} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>99.9%</span>
            <span className={styles.statTrend}>+0.1%</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Avg Latency</span>
            <Icon icon="mdi:speedometer" className={styles.statIconInfo} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>18<small>ms</small></span>
            <span className={styles.statTrendNeutral}>~ Stable</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Packet Loss</span>
            <Icon icon="mdi:package-variant-closed" className={styles.statIconWarning} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>0.01%</span>
            <span className={styles.statTrendGood}>-0.05%</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statLabel}>Jitter</span>
            <Icon icon="mdi:waveform" className={styles.statIconNeutral} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>2<small>ms</small></span>
            <span className={styles.statTrend}>Normal</span>
          </div>
        </div>

        {/* Row 2: Details Panel (Replaces Chart) + Activity Feed */}
        <div className={styles.detailsSection}>
          <div className={styles.sectionHeader}>
            <h3>Path Configuration Details</h3>
          </div>
          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Probing Interval</span>
              <span className={styles.detailValue}>5 minutes</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Protocol</span>
              <span className={styles.detailValue}>TCP (Port 443)</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Traffic Class</span>
              <span className={styles.detailValue}>Best Effort (DSCP 0)</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Alert Profile</span>
              <span className={styles.detailValue}>Standard Production</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Last Polled</span>
              <span className={styles.detailValue}>{path.lastPolled}</span>
            </div>
          </div>
        </div>

        <div className={styles.activitySection}>
          <div className={styles.sectionHeader}>
            <h3>Activity Feed</h3>
            <button className={styles.iconBtn}><Icon icon="mdi:filter-variant" /></button>
          </div>
          <div className={styles.feedList}>
            <div className={styles.feedItem}>
              <div className={styles.feedLine} />
              <div className={`${styles.feedDot} ${styles.dotError}`} />
              <div className={styles.feedContent}>
                <span className={styles.feedTime}>14:00</span>
                <span className={styles.feedText}>Latency spike detected (>100ms)</span>
              </div>
            </div>
            <div className={styles.feedItem}>
              <div className={styles.feedLine} />
              <div className={`${styles.feedDot} ${styles.dotSuccess}`} />
              <div className={styles.feedContent}>
                <span className={styles.feedTime}>14:05</span>
                <span className={styles.feedText}>Path recovered to normal state</span>
              </div>
            </div>
            <div className={styles.feedItem}>
              <div className={styles.feedLine} />
              <div className={`${styles.feedDot} ${styles.dotInfo}`} />
              <div className={styles.feedContent}>
                <span className={styles.feedTime}>12:30</span>
                <span className={styles.feedText}>Scheduled maintenance completed</span>
              </div>
            </div>
             <div className={styles.feedItem}>
              <div className={styles.feedLine} />
              <div className={`${styles.feedDot} ${styles.dotNeutral}`} />
              <div className={styles.feedContent}>
                <span className={styles.feedTime}>09:00</span>
                <span className={styles.feedText}>Daily report generated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetPathOverview;
