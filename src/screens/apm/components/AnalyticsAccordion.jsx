import {
  Activity,
  BarChart3,
  ChevronDown,
  Clock,
  TrendingDown,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import styles from './service-accordion.module.css';

// Accordion Item Component
const AccordionItem = ({
  title,
  icon: Icon,
  color,
  isOpen,
  onToggle,
  children,
  badge,
  badgeColor,
}) => {
  return (
    <div className={styles.accordionItem} data-open={isOpen}>
      <style>{`
        .${styles.accordionItem}[data-open="true"]::before {
           background-color: ${color};
        }
      `}</style>
      <div className={styles.accordionHeader} onClick={onToggle}>
        <div className={styles.headerLeft}>
          <div
            className={styles.iconWrapper}
            style={{ color: isOpen ? color : '#94a3b8' }}
          >
            <Icon size={20} />
          </div>
          <span className={styles.headerTitle}>{title}</span>
        </div>
        <div className={styles.headerRight}>
          {badge && (
            <span
              className={styles.statBadge}
              style={{
                backgroundColor: isOpen
                  ? badgeColor || color
                  : 'var(--color-bg-tertiary)',
                color: isOpen ? '#fff' : 'var(--color-text-secondary)',
                border: isOpen ? 'none' : '1px solid var(--color-border)',
              }}
            >
              {badge}
            </span>
          )}
          <ChevronDown size={18} className={styles.chevron} />
        </div>
      </div>
      {isOpen && <div className={styles.accordionContent}>{children}</div>}
    </div>
  );
};

// Performance Trend Widget
const PerformanceTrendWidget = ({ title, data, color, icon: Icon, trend }) => {
  const chartData = data.map((val, i) => ({ time: i, value: val }));
  const currentValue = data[data.length - 1];
  const previousValue = data[data.length - 2];
  const change = (
    ((currentValue - previousValue) / previousValue) *
    100
  ).toFixed(1);
  const isPositive = change > 0;

  return (
    <div className={styles.analyticsWidget}>
      <div className={styles.analyticsWidgetInner}>
        {/* Header with icon and title */}
        <div className={styles.analyticsWidgetHeader}>
          <div
            className={styles.analyticsIconBadge}
            style={{ backgroundColor: color + '15', borderColor: color + '40' }}
          >
            <Icon size={20} style={{ color }} />
          </div>
          <div className={styles.analyticsWidgetInfo}>
            <span className={styles.analyticsWidgetTitle}>{title}</span>
            <div
              className={styles.analyticsWidgetTrend}
              style={{ color: isPositive ? '#10b981' : '#ef4444' }}
            >
              {isPositive ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          </div>
        </div>

        {/* Large value display */}
        <div className={styles.analyticsWidgetValue}>
          <span style={{ color }}>{currentValue.toLocaleString()}</span>
        </div>

        {/* Chart area */}
        <div className={styles.analyticsWidgetChart}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id={`gradient-analytics-${title}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2.5}
                fill={`url(#gradient-analytics-${title})`}
                dot={false}
                isAnimationActive={true}
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// Distribution Chart Widget
const DistributionWidget = ({ title, data, color }) => {
  const chartData = data.map((item, i) => ({
    name: item.label,
    value: item.value,
  }));
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={styles.analyticsWidget}>
      <div className={styles.analyticsWidgetInner}>
        {/* Header */}
        <div className={styles.analyticsWidgetHeader}>
          <div
            className={styles.analyticsIconBadge}
            style={{ backgroundColor: color + '15', borderColor: color + '40' }}
          >
            <BarChart3 size={20} style={{ color }} />
          </div>
          <div className={styles.analyticsWidgetInfo}>
            <span className={styles.analyticsWidgetTitle}>{title}</span>
            <span className={styles.analyticsWidgetSubtitle}>
              {total.toLocaleString()} total
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className={styles.distributionChartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={color}
                    opacity={0.9 - index * 0.12}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className={styles.distributionLegend}>
          {data.slice(0, 3).map((item, idx) => (
            <div key={idx} className={styles.legendItem}>
              <div
                className={styles.legendDot}
                style={{ backgroundColor: color, opacity: 0.9 - idx * 0.12 }}
              />
              <span className={styles.legendLabel}>{item.label}</span>
              <span className={styles.legendValue}>
                {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Top Services Performance Table
const TopServicesTable = ({ services }) => {
  return (
    <div className={styles.analyticsTable}>
      <table className={styles.traceTable}>
        <thead>
          <tr>
            <th>SERVICE</th>
            <th>REQUESTS</th>
            <th>AVG LATENCY</th>
            <th>ERROR RATE</th>
            <th>THROUGHPUT</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, idx) => (
            <tr key={idx} className={styles.traceRow}>
              <td>
                <div className={styles.serviceCell}>
                  <span className={styles.serviceName}>{service.name}</span>
                  <span className={styles.serviceType}>{service.type}</span>
                </div>
              </td>
              <td className={styles.metricCell}>
                {service.requests.toLocaleString()}
              </td>
              <td>
                <span
                  className={styles.durationValue}
                  style={{
                    color:
                      service.avgLatency > 1000
                        ? '#ef4444'
                        : service.avgLatency > 500
                          ? '#f97316'
                          : '#10b981',
                  }}
                >
                  {service.avgLatency} ms
                </span>
              </td>
              <td>
                <span
                  className={styles.errorRate}
                  style={{
                    color:
                      service.errorRate > 5
                        ? '#ef4444'
                        : service.errorRate > 2
                          ? '#f97316'
                          : '#10b981',
                  }}
                >
                  {service.errorRate}%
                </span>
              </td>
              <td className={styles.metricCell}>{service.throughput} tpm</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const AnalyticsAccordion = ({
  performanceData,
  distributionData,
  topServices,
}) => {
  const [openSections, setOpenSections] = useState({
    performance: true,
    distribution: true,
    topServices: true,
  });

  const toggle = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const themes = {
    performance: '#3b82f6', // Blue
    distribution: '#8b5cf6', // Purple
    topServices: '#06b6d4', // Cyan
  };

  return (
    <div className={styles.accordionContainer}>
      {/* Performance Trends Section */}
      <AccordionItem
        title="Performance Trends"
        icon={TrendingUp}
        color={themes.performance}
        isOpen={openSections.performance}
        onToggle={() => toggle('performance')}
        badge="Last 24h"
        badgeColor="#10b981"
      >
        <div className={styles.fullLayout}>
          <div className={styles.metricsWidgetGrid}>
            <PerformanceTrendWidget
              title="Request Rate"
              data={performanceData.requestRate}
              color="#3b82f6"
              icon={Activity}
            />
            <PerformanceTrendWidget
              title="Response Time"
              data={performanceData.responseTime}
              color="#8b5cf6"
              icon={Clock}
            />
            <PerformanceTrendWidget
              title="Error Rate"
              data={performanceData.errorRate}
              color="#ef4444"
              icon={Zap}
            />
          </div>
        </div>
      </AccordionItem>

      {/* Distribution Analysis Section */}
      <AccordionItem
        title="Distribution Analysis"
        icon={BarChart3}
        color={themes.distribution}
        isOpen={openSections.distribution}
        onToggle={() => toggle('distribution')}
        badge="Overview"
        badgeColor="#8b5cf6"
      >
        <div className={styles.fullLayout}>
          <div className={styles.metricsWidgetGrid}>
            <DistributionWidget
              title="Response Time Distribution"
              data={distributionData.responseTime}
              color="#8b5cf6"
            />
            <DistributionWidget
              title="Request Distribution"
              data={distributionData.requests}
              color="#3b82f6"
            />
            <DistributionWidget
              title="Error Distribution"
              data={distributionData.errors}
              color="#ef4444"
            />
          </div>
        </div>
      </AccordionItem>

      {/* Top Services Section */}
      <AccordionItem
        title="Top Services Performance"
        icon={Activity}
        color={themes.topServices}
        isOpen={openSections.topServices}
        onToggle={() => toggle('topServices')}
        badge={`${topServices.length} Services`}
        badgeColor="#06b6d4"
      >
        <div className={styles.fullLayout}>
          <TopServicesTable services={topServices} />
        </div>
      </AccordionItem>
    </div>
  );
};
