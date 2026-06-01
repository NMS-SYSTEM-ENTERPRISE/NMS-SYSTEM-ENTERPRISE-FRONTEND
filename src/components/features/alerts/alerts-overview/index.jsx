'use client';

import { AlertsAccordion } from '@/components/features/alerts/alerts-accordion';
import sharedStyles from '@/components/features/alerts/shared/styles.module.css';
import { useAlerts } from '@/hooks/alerts';
import { useAlertsCharts } from '@/hooks/alerts/useAlertsCharts';
import {
  ALERT_OVERVIEW_SECTIONS,
  ALERT_SUMMARY_METRICS,
} from '@/utils/constants/alerts';

export const AlertsOverview = () => {
  const { openSections, toggleSection, alertCounts, categoryStats } = useAlerts();
  const { overviewPieRef, policyBarRef } = useAlertsCharts(openSections.analytics);

  const getMetricValue = (key) => {
    if (key === 'ack') return '94.2%';
    return alertCounts[key];
  };

  return (
    <div className={sharedStyles.accordionContainer}>
      <AlertsAccordion
        title={ALERT_OVERVIEW_SECTIONS.summary.title}
        icon={ALERT_OVERVIEW_SECTIONS.summary.icon}
        badge={ALERT_OVERVIEW_SECTIONS.summary.badge}
        isOpen={openSections.summary}
        onToggle={() => toggleSection('summary')}
      >
        <div className={sharedStyles.statsRow}>
          {ALERT_SUMMARY_METRICS.map((metric) => (
            <div key={metric.key} className={sharedStyles.metricTile}>
              <span
                className={`${sharedStyles.metricLabel} ${
                  metric.colorToken !== 'default'
                    ? sharedStyles[`metricLabel_${metric.colorToken}`]
                    : ''
                }`}
              >
                {metric.label}
              </span>
              <span
                className={`${sharedStyles.metricValue} ${
                  metric.colorToken !== 'default'
                    ? sharedStyles[`metricValue_${metric.colorToken}`]
                    : ''
                }`}
              >
                {metric.value ?? getMetricValue(metric.key)}
              </span>
            </div>
          ))}
        </div>
      </AlertsAccordion>

      <AlertsAccordion
        title={ALERT_OVERVIEW_SECTIONS.analytics.title}
        icon={ALERT_OVERVIEW_SECTIONS.analytics.icon}
        badge={ALERT_OVERVIEW_SECTIONS.analytics.badge}
        isOpen={openSections.analytics}
        onToggle={() => toggleSection('analytics')}
      >
        <div className={sharedStyles.chartsGrid}>
          <div className={sharedStyles.chartGroup}>
            <span className={sharedStyles.chartSubHeader}>ALERT CLASSIFICATION</span>
            <div ref={overviewPieRef} className={sharedStyles.chartBox} />
          </div>
          <div className={sharedStyles.chartGroup}>
            <span className={sharedStyles.chartSubHeader}>POLICY PERFORMANCE</span>
            <div ref={policyBarRef} className={sharedStyles.chartBox} />
          </div>
        </div>
      </AlertsAccordion>

      <AlertsAccordion
        title={ALERT_OVERVIEW_SECTIONS.categories.title}
        icon={ALERT_OVERVIEW_SECTIONS.categories.icon}
        badge={ALERT_OVERVIEW_SECTIONS.categories.badge}
        isOpen={openSections.categories}
        onToggle={() => toggleSection('categories')}
      >
        <div className={sharedStyles.categoriesGrid}>
          {categoryStats.map((stat) => (
            <div key={stat.name} className={sharedStyles.categoryTile}>
              <div className={sharedStyles.catHeader}>
                <span className={sharedStyles.catName}>{stat.name}</span>
                <span className={sharedStyles.catTotal}>{stat.total}</span>
              </div>
              <div className={sharedStyles.envTimeline}>
                <div className={sharedStyles.envNode}>
                  <div className={`${sharedStyles.nodeMarker} ${sharedStyles.nodeMarker_danger}`} />
                  <span className={sharedStyles.label}>Down</span>
                  <span className={sharedStyles.val}>{stat.down}</span>
                </div>
                <div className={sharedStyles.envNode}>
                  <div className={`${sharedStyles.nodeMarker} ${sharedStyles.nodeMarker_critical}`} />
                  <span className={sharedStyles.label}>Critical</span>
                  <span className={sharedStyles.val}>{stat.critical}</span>
                </div>
                <div className={sharedStyles.envNode}>
                  <div className={`${sharedStyles.nodeMarker} ${sharedStyles.nodeMarker_warning}`} />
                  <span className={sharedStyles.label}>Warning</span>
                  <span className={sharedStyles.val}>{stat.warning}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AlertsAccordion>
    </div>
  );
};
