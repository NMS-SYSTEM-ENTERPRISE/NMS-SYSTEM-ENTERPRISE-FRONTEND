import {
  Activity,
  AlertTriangle,
  ChevronDown,
  Clock,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import styles from './service-accordion.module.css';

// Helper for severity coloring
const getSeverityColor = (value, type = 'duration') => {
  const val = parseFloat(value);
  if (isNaN(val)) return '#94a3b8';

  if (type === 'duration') {
    if (val >= 5000) return '#ef4444'; // Red for >5s
    if (val >= 2000) return '#f97316'; // Orange
    if (val >= 1000) return '#eab308'; // Yellow
    return '#10b981'; // Green
  }

  if (type === 'error') {
    if (val >= 50) return '#ef4444';
    if (val >= 20) return '#f97316';
    if (val >= 5) return '#eab308';
    return '#10b981';
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

// Trace Metrics Widget Component
const TraceMetricsWidget = ({
  title,
  value,
  trend,
  icon: Icon,
  color,
  unit = '',
}) => {
  const trendData = trend.map((val, i) => ({ i, value: val }));

  return (
    <div className={styles.metricWidget}>
      <div className={styles.widgetHeader}>
        <div
          className={styles.widgetIcon}
          style={{ backgroundColor: color + '20', color }}
        >
          <Icon size={16} />
        </div>
        <span className={styles.widgetTitle}>{title}</span>
      </div>

      <div className={styles.widgetChartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <defs>
              <linearGradient
                id={`gradient-${title}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={color} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              fill={`url(#gradient-${title})`}
              dot={false}
              isAnimationActive={true}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Value Overlay */}
        <div className={styles.widgetValueOverlay}>
          <span className={styles.widgetValue} style={{ color }}>
            {value.toLocaleString()}
            {unit && <span className={styles.widgetUnit}>{unit}</span>}
          </span>
        </div>
      </div>
    </div>
  );
};

// Enhanced Trace Table Component
const TraceTable = ({ traces, onTraceClick }) => {
  const getStatusColor = (status) => {
    if (status === 'error') return '#ef4444';
    if (status === 'warning') return '#f97316';
    return '#10b981';
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.traceTable}>
        <thead>
          <tr>
            <th>TIMESTAMP</th>
            <th>SERVICE</th>
            <th>RESOURCE</th>
            <th>DURATION</th>
            <th>SPANS</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {traces.map((trace, idx) => {
            const durationColor = getSeverityColor(trace.duration, 'duration');

            return (
              <tr
                key={idx}
                className={styles.traceRow}
                onClick={() => onTraceClick && onTraceClick(trace)}
              >
                <td className={styles.timestampCell}>
                  <Clock size={14} />
                  <span>{trace.timestamp}</span>
                </td>
                <td>
                  <div className={styles.serviceCell}>
                    <span className={styles.serviceName}>
                      {trace.serviceName}
                    </span>
                    <span className={styles.serviceType}>
                      {trace.serviceType}
                    </span>
                  </div>
                </td>
                <td className={styles.resourceCell}>{trace.resource}</td>
                <td>
                  <span
                    className={styles.durationValue}
                    style={{ color: durationColor }}
                  >
                    {trace.duration} ms
                  </span>
                </td>
                <td className={styles.spansCell}>
                  <span className={styles.spanBadge}>{trace.spans}</span>
                </td>
                <td>
                  <span
                    className={styles.statusBadge}
                    style={{
                      backgroundColor: getStatusColor(trace.status) + '20',
                      color: getStatusColor(trace.status),
                      border: `1px solid ${getStatusColor(trace.status)}40`,
                    }}
                  >
                    {trace.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const ExplorerAccordion = ({ traceMetrics, traces, onTraceClick }) => {
  const [openSections, setOpenSections] = useState({
    metrics: true,
    traces: true,
  });

  const toggle = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const themes = {
    metrics: '#8b5cf6', // Purple
    traces: '#06b6d4', // Cyan
  };

  return (
    <div className={styles.accordionContainer}>
      {/* Trace Metrics Section */}
      <AccordionItem
        title="Trace Metrics Overview"
        icon={TrendingUp}
        color={themes.metrics}
        isOpen={openSections.metrics}
        onToggle={() => toggle('metrics')}
        badge="Real-time"
        badgeColor="#10b981"
      >
        <div className={styles.fullLayout}>
          <div className={styles.metricsWidgetGrid}>
            <TraceMetricsWidget
              title="Trace Count"
              value={traceMetrics.count}
              trend={traceMetrics.countTrend}
              icon={Activity}
              color="#3b82f6"
            />
            <TraceMetricsWidget
              title="Avg Duration"
              value={traceMetrics.avgDuration}
              trend={traceMetrics.durationTrend}
              icon={Clock}
              color="#8b5cf6"
              unit=" ms"
            />
            <TraceMetricsWidget
              title="Errors"
              value={traceMetrics.errors}
              trend={traceMetrics.errorTrend}
              icon={AlertTriangle}
              color="#ef4444"
            />
          </div>
        </div>
      </AccordionItem>

      {/* Trace List Section */}
      <AccordionItem
        title="Recent Traces"
        icon={Zap}
        color={themes.traces}
        isOpen={openSections.traces}
        onToggle={() => toggle('traces')}
        badge={`${traces.length} Traces`}
        badgeColor="#3b82f6"
      >
        <div className={styles.fullLayout}>
          <TraceTable traces={traces} onTraceClick={onTraceClick} />
        </div>
      </AccordionItem>
    </div>
  );
};
