import {
  Activity,
  ChevronDown,
  Globe,
  Server,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
} from 'recharts';
import styles from './service-accordion.module.css';

// Helper for severity coloring
const getSeverityColor = (value, type = 'latency') => {
  const val = parseFloat(value);
  if (isNaN(val)) return '#94a3b8';

  if (type === 'latency') {
    if (val >= 1000) return '#ef4444'; // Red for >1s
    if (val >= 500) return '#f97316'; // Orange
    if (val >= 200) return '#eab308'; // Yellow
    return '#10b981'; // Green
  }

  if (type === 'error') {
    if (val >= 100) return '#ef4444';
    if (val >= 50) return '#f97316';
    if (val >= 10) return '#eab308';
    return '#10b981';
  }

  // Throughput - higher is better
  if (type === 'throughput') {
    if (val >= 1000) return '#10b981';
    if (val >= 500) return '#3b82f6';
    if (val >= 100) return '#eab308';
    return '#ef4444';
  }

  return '#3b82f6';
};

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

// Service Metrics Overview Component
const ServiceMetricsOverview = ({ data }) => {
  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <Server size={12} /> Service Overview
      </div>
      <div className={styles.metricsGrid}>
        {data.map((service, idx) => {
          const latencyColor = getSeverityColor(service.latency, 'latency');
          const errorColor = getSeverityColor(service.errors, 'error');
          const throughputColor = getSeverityColor(
            service.throughput,
            'throughput'
          );

          return (
            <div key={idx} className={styles.metricCard}>
              <div className={styles.metricHeader}>
                <div
                  className={styles.serviceIcon}
                  style={{
                    backgroundColor: service.color + '20',
                    color: service.color,
                  }}
                >
                  <Globe size={16} />
                </div>
                <div className={styles.serviceInfo}>
                  <span className={styles.serviceName} title={service.name}>
                    {service.name}
                  </span>
                  <span className={styles.serviceType}>{service.type}</span>
                </div>
              </div>

              <div className={styles.metricStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Latency</span>
                  <span
                    className={styles.statValue}
                    style={{ color: latencyColor }}
                  >
                    {service.latency} ms
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Throughput</span>
                  <span
                    className={styles.statValue}
                    style={{ color: throughputColor }}
                  >
                    {service.throughput} tpm
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Errors</span>
                  <span
                    className={styles.statValue}
                    style={{ color: errorColor }}
                  >
                    {service.errors}
                  </span>
                </div>
              </div>

              {/* Mini trend chart */}
              {service.trend && service.trend.length > 0 && (
                <div className={styles.trendChart}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={service.trend.map((val, i) => ({ i, value: val }))}
                    >
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={latencyColor}
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Top Services List Component
const TopServicesList = ({
  data,
  metric = 'latency',
  title = 'Top Services',
}) => {
  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <TrendingUp size={12} /> {title}
      </div>
      <div className={styles.monitorList}>
        {data.map((item, idx) => {
          const sparklineData = (item.sparkline || []).map((val, i) => ({
            i,
            value: val,
          }));
          const displayValue = item.value || item.latency || '0';
          const numericValue =
            parseFloat(displayValue.toString().replace(/[^0-9.]/g, '')) || 0;

          const mainColor = getSeverityColor(numericValue, metric);

          return (
            <div key={idx} className={styles.monitorRow}>
              <div className={styles.monitorName} title={item.name}>
                <span>{item.name}</span>
                {item.endpoint && (
                  <span className={styles.monitorSub}>{item.endpoint}</span>
                )}
              </div>

              {/* Visualization */}
              <div className={styles.vizContainer}>
                {sparklineData.length > 0 && (
                  <div className={styles.barSparkline}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={sparklineData}
                        barGap={2}
                        margin={{ top: 2, bottom: 2 }}
                      >
                        <Bar
                          dataKey="value"
                          fill={mainColor}
                          radius={[2, 2, 0, 0]}
                          isAnimationActive={false}
                          barSize={6}
                        >
                          {sparklineData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={getSeverityColor(entry.value, metric)}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

              <div className={styles.monitorValue} style={{ color: mainColor }}>
                {displayValue}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ServiceAccordion = ({
  servicesData,
  topLatencyData,
  topThroughputData,
  topErrorsData,
}) => {
  const [openSections, setOpenSections] = useState({
    services: true,
    performance: true,
    errors: true,
  });

  const toggle = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const themes = {
    services: '#06b6d4', // Cyan
    performance: '#8b5cf6', // Purple
    errors: '#ef4444', // Red
  };

  return (
    <div className={styles.accordionContainer}>
      {/* Services Overview Section */}
      <AccordionItem
        title="Active Services"
        icon={Server}
        color={themes.services}
        isOpen={openSections.services}
        onToggle={() => toggle('services')}
        badge={`${servicesData.length} Services`}
        badgeColor="#10b981"
      >
        <div className={styles.fullLayout}>
          <ServiceMetricsOverview data={servicesData} />
        </div>
      </AccordionItem>

      {/* Performance Section */}
      <AccordionItem
        title="Performance Metrics"
        icon={Zap}
        color={themes.performance}
        isOpen={openSections.performance}
        onToggle={() => toggle('performance')}
        badge="Monitoring"
        badgeColor="#3b82f6"
      >
        <div className={styles.splitLayout}>
          <TopServicesList
            data={topLatencyData}
            metric="latency"
            title="Top Latency"
          />
          <div className={styles.verticalDivider}></div>
          <TopServicesList
            data={topThroughputData}
            metric="throughput"
            title="Top Throughput"
          />
        </div>
      </AccordionItem>

      {/* Errors Section */}
      <AccordionItem
        title="Error Tracking"
        icon={Activity}
        color={themes.errors}
        isOpen={openSections.errors}
        onToggle={() => toggle('errors')}
        badge={`${topErrorsData.reduce((sum, item) => sum + parseInt(item.value || 0), 0)} Errors`}
        badgeColor="#ef4444"
      >
        <div className={styles.fullLayout}>
          <TopServicesList
            data={topErrorsData}
            metric="error"
            title="Services with Errors"
          />
        </div>
      </AccordionItem>
    </div>
  );
};
