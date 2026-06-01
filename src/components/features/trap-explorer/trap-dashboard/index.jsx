'use client';

import { SourceProgressBar } from '@/components/features/trap-explorer/source-progress-bar';
import { TrapDashboardAccordion } from '@/components/features/trap-explorer/trap-dashboard-accordion';
import { useTrapDashboardCharts } from '@/hooks/trap-explorer/useTrapDashboardCharts';
import {
  DEFAULT_DASHBOARD_SECTIONS,
  SEVERITY_LEGEND,
  TRAP_DASHBOARD_SECTIONS,
  TRAP_SUMMARY_METRICS,
} from '@/utils/constants/trap-explorer';
import {
  TRAP_INCIDENT_STREAM,
  TRAP_TOP_SOURCES,
} from '@/utils/dummy-data/trap-explorer';
import { useState } from 'react';
import styles from './styles.module.css';

export const TrapDashboard = () => {
  const [expandedSections, setExpandedSections] = useState(DEFAULT_DASHBOARD_SECTIONS);
  const { volumeChartRef, severityChartRef } = useTrapDashboardCharts(expandedSections.trends);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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
            {TRAP_SUMMARY_METRICS.map((metric) => (
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
                  {SEVERITY_LEGEND.map((item) => (
                    <div key={item.name} className={styles.legendRow}>
                      <div
                        className={`${styles.legendColor} ${styles[`legendColor_${item.colorToken}`]}`}
                      />
                      <span className={styles.legendName}>{item.name}</span>
                      <span className={styles.legendVal}>{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TrapDashboardAccordion>

        <TrapDashboardAccordion
          title={TRAP_DASHBOARD_SECTIONS.sources.title}
          icon={TRAP_DASHBOARD_SECTIONS.sources.icon}
          badge={TRAP_DASHBOARD_SECTIONS.sources.badge}
          isOpen={expandedSections.sources}
          onToggle={() => toggleSection('sources')}
        >
          <div className={styles.sourceGrid}>
            {TRAP_TOP_SOURCES.map((src) => (
              <div key={src.ip} className={styles.sourceTile}>
                <div className={styles.sourceHeader}>
                  <span className={styles.sourceIP}>{src.ip}</span>
                  <span className={styles.sourceCount}>{src.count}</span>
                </div>
                <SourceProgressBar percent={src.pct} />
              </div>
            ))}
          </div>
        </TrapDashboardAccordion>

        <TrapDashboardAccordion
          title={TRAP_DASHBOARD_SECTIONS.activity.title}
          icon={TRAP_DASHBOARD_SECTIONS.activity.icon}
          badge={TRAP_DASHBOARD_SECTIONS.activity.badge}
          isOpen={expandedSections.activity}
          onToggle={() => toggleSection('activity')}
        >
          <div className={styles.timeline}>
            {TRAP_INCIDENT_STREAM.map((item, i) => (
              <div key={item.title} className={styles.timelineItem}>
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
                    <span className={styles.tag}>PDU-ID: #82{i}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TrapDashboardAccordion>
      </div>
    </div>
  );
};
