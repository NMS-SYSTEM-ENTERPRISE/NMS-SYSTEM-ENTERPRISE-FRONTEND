'use client';

import { SourceProgressBar } from '@/components/features/trap-explorer/source-progress-bar';
import { TrapDashboardAccordion } from '@/components/features/trap-explorer/trap-dashboard-accordion';
import { useTrapDashboardCharts } from '@/hooks/trap-explorer/useTrapDashboardCharts';
import {
  DEFAULT_DASHBOARD_SECTIONS,
  SEVERITY_LEGEND,
  TRAP_DASHBOARD_SECTIONS,
} from '@/utils/constants/trap-explorer';
import { useState, useEffect, useContext } from 'react';
import { TrapExplorerContext } from '@/contexts/trap-explorer';
import { getTrapDashboard } from '@/networking/network-monitoring/network-monitoring-apis';
import styles from './styles.module.css';
import { TrapDashboardSkeleton } from '@/components/ui/skeleton-loaders/trap-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';

export const TrapDashboard = () => {
  const [expandedSections, setExpandedSections] = useState(DEFAULT_DASHBOARD_SECTIONS);
  const [dashboardStats, setDashboardStats] = useState(null);

  const { filteredTraps, isLoading: trapsLoading } = useContext(TrapExplorerContext);
  const { volumeChartRef, severityChartRef } = useTrapDashboardCharts(expandedSections.trends, dashboardStats);
  const [isStatsLoading, setIsStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsStatsLoading(true);
        const data = await getTrapDashboard();
        setDashboardStats(data);
      } catch (err) {
        console.error('Failed to fetch trap dashboard stats:', err);
      } finally {
        setIsStatsLoading(false);
      }
    };
    fetchStats();
    // Refresh stats every minute or whenever traps change (filteredTraps updates when trap_received fires)
  }, [filteredTraps]);

  if (trapsLoading || isStatsLoading) {
    return <TrapDashboardSkeleton />;
  }

  if (!dashboardStats) {
    return (
      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <NoDataFound
          title="Dashboard Unavailable"
          description="Unable to load trap dashboard statistics."
          icon="mdi:chart-arc"
        />
      </div>
    );
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const dynamicSummaryMetrics = [
    { key: 'critical', label: 'CRITICAL TRAPS', value: dashboardStats?.criticalTraps?.toLocaleString() || '0', colorToken: 'critical' },
    { key: 'major', label: 'MAJOR TRAPS', value: dashboardStats?.majorTraps?.toLocaleString() || '0', colorToken: 'major' },
    { key: 'total', label: 'TOTAL EVENTS', value: dashboardStats?.totalEvents?.toLocaleString() || '0', colorToken: 'cyan' },
    { key: 'ack', label: 'ACK RATE', value: `${dashboardStats?.ackRate || 0}%`, colorToken: 'success' },
  ];

  // Derive incident stream from live traps (latest 5)
  const incidentStream = (filteredTraps || []).slice(0, 5).map(t => ({
    title: t.name || t.trapOid,
    time: t.timestamp.split(' ')[4] || t.timestamp, // rough time extraction
    desc: t.message || 'No description provided.',
    node: t.source,
    severity: t.severity,
  }));

  // Top sources with percentage maxing out at top count
  const topSources = dashboardStats?.topSources || [];
  const maxCount = Math.max(...topSources.map(s => s.count), 1);

  return (
    <div className={styles.dashboard}>
      <div className={styles.accordionContainer}>
        <TrapDashboardAccordion
          title={TRAP_DASHBOARD_SECTIONS.summary.title}
          icon={TRAP_DASHBOARD_SECTIONS.summary.icon}
          badge={TRAP_DASHBOARD_SECTIONS.summary.badge}
          isOpen={expandedSections.summary}
          onToggle={() => toggleSection('summary')}
        >
          <div className={styles.metricGrid}>
            {dynamicSummaryMetrics.map((metric) => (
              <div key={metric.key} className={styles.metricTile}>
                <span className={styles.metricLabel}>{metric.label}</span>
                <span className={`${styles.metricVal} ${styles[`metricVal_${metric.colorToken}`]}`}>
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </TrapDashboardAccordion>

        <TrapDashboardAccordion
          title={TRAP_DASHBOARD_SECTIONS.trends.title}
          icon={TRAP_DASHBOARD_SECTIONS.trends.icon}
          badge={TRAP_DASHBOARD_SECTIONS.trends.badge}
          isOpen={expandedSections.trends}
          onToggle={() => toggleSection('trends')}
        >
          {dashboardStats?.totalEvents === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <NoDataFound
                title="No Trend Data"
                description="Not enough trap data in the last 24 hours to generate trend visualizations."
                icon="mdi:chart-timeline-variant-shimmer"
              />
            </div>
          ) : (
            <div className={styles.distributionGrid}>
              <div className={styles.distributionCard}>
                <span className={styles.subHeader}>VOLUME (24H)</span>
                <div ref={volumeChartRef} className={styles.mainChart} />
              </div>
              <div className={styles.distributionCard}>
                <span className={styles.subHeader}>SEVERITY DISTRIBUTION</span>
                <div className={styles.chartWrap}>
                  <div ref={severityChartRef} className={styles.pieChart} />
                  <div className={styles.customLegend}>
                    {SEVERITY_LEGEND.map((item, idx) => (
                      <div key={item.name} className={styles.legendRow}>
                        <div
                          className={`${styles.legendColor} ${styles[`legendColor_${item.colorToken}`]}`}
                        />
                        <span className={styles.legendName}>{item.name}</span>
                        <span className={styles.legendVal}>{dashboardStats?.severityChartData?.[idx] || 0}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </TrapDashboardAccordion>

        <TrapDashboardAccordion
          title={TRAP_DASHBOARD_SECTIONS.sources.title}
          icon={TRAP_DASHBOARD_SECTIONS.sources.icon}
          badge={TRAP_DASHBOARD_SECTIONS.sources.badge}
          isOpen={expandedSections.sources}
          onToggle={() => toggleSection('sources')}
        >
          {topSources.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <NoDataFound
                title="No Top Sources"
                description="No devices have emitted traps in the current timeframe."
                icon="mdi:server-network-off"
              />
            </div>
          ) : (
            <div className={styles.sourceGrid}>
              {topSources.map((src) => (
                <div key={src.ip} className={styles.sourceTile}>
                  <div className={styles.sourceHeader}>
                    <span className={styles.sourceIP}>{src.ip}</span>
                    <span className={styles.sourceCount}>{src.count}</span>
                  </div>
                  <SourceProgressBar percent={Math.round((src.count / maxCount) * 100)} />
                </div>
              ))}
            </div>
          )}
        </TrapDashboardAccordion>

        <TrapDashboardAccordion
          title={TRAP_DASHBOARD_SECTIONS.activity.title}
          icon={TRAP_DASHBOARD_SECTIONS.activity.icon}
          badge={TRAP_DASHBOARD_SECTIONS.activity.badge}
          isOpen={expandedSections.activity}
          onToggle={() => toggleSection('activity')}
        >
          {incidentStream.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <NoDataFound
                title="No Incident Stream"
                description="No recent live traps to display in the incident feed."
                icon="mdi:bell-off-outline"
              />
            </div>
          ) : (
            <div className={styles.timeline}>
              {incidentStream.map((item, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div
                    className={`${styles.timelineNode} ${styles[`timelineNode_${item.severity}`]}`}
                  />
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineHeader}>
                      <span className={styles.timelineTitle}>{item.title}</span>
                      <span className={styles.timelineTime}>{item.time}</span>
                    </div>
                    <div className={styles.timelineDesc}>{item.desc}</div>
                    <div className={styles.timelineMeta}>
                      <span className={styles.tag}>Node: {item.node}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TrapDashboardAccordion>
      </div>
    </div>
  );
};
