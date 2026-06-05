'use client';
import { Icon } from '@iconify/react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getApmTraceDetail } from '@/networking/apm/apm-apis';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import styles from './styles.module.css';

// Mock trace detail data
const TRACE_DETAILS = {
  id: '87afd2365ccfd2ce71bfbbf23778cd60',
  serviceName: 'hibernatewithmysql',
  traceId: '87afd2365ccfd2ce71bfbbf23778cd60',
  spans: 5,
  responseTime: 5692,
  method: 'GET',
  url: '/products',
  status: 200,
  timestamp: 'Mon, Oct 13, 2025 06:41:48 PM',
  spans_data: [
    {
      id: 'span-1',
      name: 'GET /products',
      service: 'hibernatewithmysql',
      duration: 5692,
      startTime: 0,
      type: 'HTTP',
    },
    {
      id: 'span-2',
      name: 'ProductRepository.findAll',
      service: 'hibernatewithmysql',
      duration: 4087,
      startTime: 200,
      type: 'DATABASE',
    },
    {
      id: 'span-3',
      name: 'SELECT Product',
      service: 'mysql',
      duration: 1848,
      startTime: 400,
      type: 'SQL',
    },
    {
      id: 'span-4',
      name: 'SELECT springboot.product_tbl',
      service: 'mysql',
      duration: 937,
      startTime: 2300,
      type: 'SQL',
    },
    {
      id: 'span-5',
      name: 'Transaction',
      service: 'hibernatewithmysql',
      duration: 410,
      startTime: 3300,
      type: 'INTERNAL',
    },
  ],
};

const TraceDetail = () => {
  const router = useRouter();
  const { traceId } = useParams();
  const [activeTab, setActiveTab] = useState('info');
  const [selectedSpan, setSelectedSpan] = useState(null);

  const [trace, setTrace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (traceId) {
      setLoading(true);
      getApmTraceDetail(traceId)
        .then(data => {
          setTrace(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load trace detail:", err);
          setLoading(false);
        });
    }
  }, [traceId]);

  if (loading || !trace) {
    return (
      <div className={styles.traceDetailOverlay}>
        <div className={styles.traceDetail} style={{ padding: '24px' }}>
          <h2 style={{ color: '#fff' }}>Loading Trace...</h2>
        </div>
      </div>
    );
  }

  const maxDuration = Math.max(
    ...trace.spans_data.map((s) => s.startTime + s.duration)
  );

  const getSpanColor = (type) => {
    switch (type) {
      case 'HTTP':
        return 'var(--color-chart-cyan, #06b6d4)';
      case 'DATABASE':
        return 'var(--color-chart-purple, #8b5cf6)';
      case 'SQL':
        return 'var(--color-chart-yellow, #eab308)';
      case 'INTERNAL':
        return 'var(--color-success, #10b981)';
      default:
        return 'var(--color-text-muted, #6b7280)';
    }
  };

  const handleClose = () => {
    router.push('/apm');
  };

  return (
    <div className={styles.traceDetailOverlay}>
      <div className={styles.traceDetail}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Icon icon="mdi:web" width={20} height={20} />
            <h2 className={styles.title}>{trace.resource || trace.method}</h2>
          </div>
          <button className={styles.closeBtn} onClick={handleClose}>
            <Icon icon="mdi:close" width={20} height={20} />
          </button>
        </div>

        {/* Service Info */}
        <div className={styles.serviceInfo}>
          <Icon icon="mdi:application" width={16} height={16} />
          <span>{trace.serviceName}</span>
          <span className={styles.separator}>|</span>
          <span>Trace ID: {trace.traceId}</span>
          <span className={styles.separator}>|</span>
          <span>Spans: {trace.spans}</span>
        </div>

        {/* Metrics Bar */}
        <div className={styles.metricsBar}>
          <div className={styles.metric}>
            <div className={styles.metricLabel}>Response Time</div>
            <div className={styles.metricValue}>
              <Icon icon="mdi:clock-outline" width={16} height={16} />
              {trace.responseTime} ms
            </div>
          </div>

          <div className={styles.metric}>
            <div className={styles.metricLabel}>Method</div>
            <div className={styles.metricValue}>
              <span className={styles.methodBadge}>{trace.method}</span>
              {trace.url}
            </div>
          </div>

          <div className={styles.metric}>
            <div className={styles.metricLabel}>Status</div>
            <div className={styles.metricValue}>
              <span className={styles.statusBadge} style={{ color: 'var(--color-success)' }}>
                {trace.status}
              </span>
            </div>
          </div>

          <div className={styles.metric}>
            <div className={styles.metricLabel}>Time</div>
            <div className={styles.metricValue}>{trace.timestamp}</div>
          </div>
        </div>

        {/* Timeline Header */}
        <div className={styles.timelineHeader}>
          <div className={styles.timelineLabels}>
            <span>0 ms</span>
            <span>0.50 ms</span>
            <span>1.00 ms</span>
            <span>1.50 ms</span>
            <span>2.00 ms</span>
            <span>2.50 ms</span>
            <span>3.00 ms</span>
            <span>3.50 ms</span>
            <span>4.00 ms</span>
            <span>4.50 ms</span>
            <span>5.00 ms</span>
            <span>5.50 ms</span>
          </div>
        </div>

        {/* Waterfall Chart */}
        <div className={styles.waterfall}>
          {trace.spans_data.map((span, index) => {
            const leftPercent = (span.startTime / maxDuration) * 100;
            const widthPercent = (span.duration / maxDuration) * 100;

            return (
              <div
                key={span.id}
                className={`${styles.spanRow} ${selectedSpan === span.id ? styles.spanRowSelected : ''
                  }`}
                onClick={() => setSelectedSpan(span.id)}
              >
                <div className={styles.spanLabel}>
                  <Icon
                    icon={index === 0 ? 'mdi:chevron-down' : 'mdi:circle'}
                    width={12}
                    height={12}
                  />
                  <span>{span.name}</span>
                </div>
                <div className={styles.spanTimeline}>
                  <div
                    className={styles.spanBar}
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                      backgroundColor: getSpanColor(span.type),
                    }}
                  >
                    <span className={styles.spanDuration}>
                      {span.duration}µs
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'info' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('info')}
          >
            Info
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'error' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('error')}
          >
            Error
            <span className={styles.errorBadge}>0</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'host' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('host')}
          >
            Host
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'metric' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('metric')}
          >
            Metric
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'logs' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            Logs
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === 'info' && (
            <div className={styles.infoContent}>
              <pre className={styles.jsonData}>
                {JSON.stringify(trace, null, 2)}
              </pre>
            </div>
          )}

          {activeTab === 'host' && trace.hostMetrics && (
            <div className={styles.hostContent}>
              <h4>Host Metrics</h4>
              <div className={styles.chartsGrid}>
                <div className={styles.chartCard}>
                  <div className={styles.chartTitle}>CPU Utilization (%)</div>
                  <div className={styles.chartPlaceholder} style={{ height: '120px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trace.hostMetrics.cpu}>
                        <XAxis dataKey="time" hide />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="var(--color-chart-cyan)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className={styles.chartCard}>
                  <div className={styles.chartTitle}>Memory Utilization (%)</div>
                  <div className={styles.chartPlaceholder} style={{ height: '120px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trace.hostMetrics.memory}>
                        <XAxis dataKey="time" hide />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="var(--color-chart-purple)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className={styles.chartCard}>
                  <div className={styles.chartTitle}>Load Average</div>
                  <div className={styles.chartPlaceholder} style={{ height: '120px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trace.hostMetrics.load}>
                        <XAxis dataKey="time" hide />
                        <YAxis hide />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="var(--color-chart-yellow)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'metric' && trace.databaseMetrics && (
            <div className={styles.metricContent}>
              <h4>PostgreSQL Query Metrics</h4>
              <div className={styles.metricsList}>
                {trace.databaseMetrics.map((m, i) => (
                  <div key={i} className={styles.metricRow}>
                    <span className={styles.metricRowLabel}>{m.label}</span>
                    <span className={styles.metricRowValue}>{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'logs' && trace.logs && (
            <div className={styles.logsContent}>
              <h4>Query Execution Logs</h4>
              <pre className={styles.logContainer}>
                {trace.logs.map((log, i) => (
                  <div key={i} className={styles.logLine}>
                    <span className={styles.logTimestamp}>[{new Date().toISOString()}]</span> {log}
                  </div>
                ))}
              </pre>
            </div>
          )}

          {activeTab === 'error' && (
            <div className={styles.errorContent}>
              <div className={styles.noErrors}>
                <Icon icon="mdi:check-circle" width={48} height={48} />
                <p>No errors found in this trace</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.actionBtn}>
            <Icon icon="mdi:download" width={18} height={18} />
            Export
          </button>
          <button className={styles.actionBtn}>
            <Icon icon="mdi:share-variant" width={18} height={18} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default TraceDetail;
