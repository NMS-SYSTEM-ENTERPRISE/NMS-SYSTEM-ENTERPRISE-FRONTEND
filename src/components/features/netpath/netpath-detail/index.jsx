'use client';
import { PathHistory } from '@/components/features/netpath/path-history';
import { PathVisualization } from '@/components/features/netpath/path-visualization';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

import { Button } from '@/components/ui/button';
import { getNetPathDetail } from '@/networking/network-monitoring/network-monitoring-apis';
import { NetPathDetailSkeleton } from '@/components/ui/skeleton-loaders/netpath-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';

// Simple Semi-Circle Gauge Component - Slightly Larger for better visibility
const SemiGauge = ({ value, label, color = 'var(--color-chart-cyan)' }) => {
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
  const [pathInfo, setPathInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const data = await getNetPathDetail(pathId);
        setPathInfo(data);
      } catch (err) {
        console.error("Failed to load path detail", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (pathId) fetchDetail();
  }, [pathId]);

  if (isLoading) {
    return <NetPathDetailSkeleton />;
  }

  if (!pathInfo) {
    return (
      <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <NoDataFound
          title="Path Details Unavailable"
          description={`Unable to locate telemetry and node data for path ID: ${pathId}.`}
          icon="mdi:alert-circle-outline"
        />
      </div>
    );
  }

  return (
    <div className={styles.netPathDetail}>
      <div className={styles.header}>
        <div className={styles.headerContentWrapper}>
          <div className={styles.headerLeftSection}>
            {!propPathId && (
              <Button
                variant="ghost"
                className={styles.backBtn}
                onClick={() => router.push('/netpath')}
              >
                <Icon icon="mdi:chevron-left" width={20} height={20} />
              </Button>
            )}
            <div className={styles.globeIcon}>
              <Icon
                icon="mdi:web"
                width={24}
                height={24}
                color="var(--color-chart-cyan)"
              />
            </div>
            <div className={styles.mainTitleGroup}>
              <h1 className={styles.destinationTitle}>
                {pathInfo.destination}
              </h1>
              <div className={styles.pathFlowHeader}>
                <span className={styles.flowNode}>{pathInfo.source}</span>
                <Icon
                  icon="mdi:arrow-right-thin"
                  className={styles.flowArrow}
                />
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
              <span className={styles.metricBlockLabel}>
                LATENCY (AVG)
              </span>
              <div className={styles.latencyValues}>
                <span className={styles.latValHighlight}>{pathInfo.avg_latency || '0.44ms'}</span>
              </div>
            </div>

            <div className={styles.vSeparator} />

            <div className={styles.gaugeGroup}>
              <SemiGauge
                value={parseFloat(pathInfo.packet_loss) || 0}
                label="Packet Loss"
                color="var(--color-danger)"
              />
              <div className={styles.vSeparatorSmall} />
              <SemiGauge
                value={parseFloat(pathInfo.availability) || 100}
                label="Transit Likelihood"
                color="var(--color-success)"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <PathVisualization pathInfo={pathInfo} />

        <PathHistory historyData={pathInfo.history} />
      </div>
    </div>
  );
};

export default NetPathDetail;
