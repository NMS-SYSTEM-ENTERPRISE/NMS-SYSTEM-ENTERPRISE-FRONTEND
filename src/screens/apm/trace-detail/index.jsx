'use client';
import { Icon } from '@iconify/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
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

  const trace = TRACE_DETAILS;
  const maxDuration = Math.max(
    ...trace.spans_data.map((s) => s.startTime + s.duration)
  );

  const getSpanColor = (type) => {
    switch (type) {
      case 'HTTP':
        return '#06b6d4';
      case 'DATABASE':
        return '#8b5cf6';
      case 'SQL':
        return '#eab308';
      case 'INTERNAL':
        return '#10b981';
      default:
        return '#6b7280';
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
            <h2 className={styles.title}>GET /products</h2>
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
              <span className={styles.statusBadge} style={{ color: '#10b981' }}>
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
                className={`${styles.spanRow} ${
                  selectedSpan === span.id ? styles.spanRowSelected : ''
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
                {JSON.stringify(
                  {
                    timestamp: '176836118903765',
                    'event.id': '182524309-8-1-',
                    'service.span.id': '59542fdd-d537f8a',
                    'service.span.parent.id': '',
                    'service.span.trace.id': '87afd2365ccfd2ce71bfbbf23778cd60',
                    'service.span.start.time.us': 1768361189403765,
                    'service.span.duration.us': 5692,
                    'service.span.name': 'GET /products',
                    'service.span.method.name': '1.1',
                    'service.span.method.value': '/products',
                    'service.span.status.code': '200',
                    'service.span.entity': '-',
                    'service.span.service.name': 'hibernatewithmysql',
                    'network.peer.address': '172.16.18.134',
                    'server.address': '172.16.12.183',
                    'client.address': '172.16.18.134',
                    'url.path': '/products',
                    'network.peer.port': '49885',
                    'http.request.method': '1.1',
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          )}

          {activeTab === 'host' && (
            <div className={styles.hostContent}>
              <h4>Host Metrics</h4>
              <div className={styles.chartsGrid}>
                <div className={styles.chartCard}>
                  <div className={styles.chartTitle}>CPU Utilization</div>
                  <div className={styles.chartPlaceholder}>
                    <Icon icon="mdi:chart-line" width={32} height={32} />
                  </div>
                </div>
                <div className={styles.chartCard}>
                  <div className={styles.chartTitle}>Memory Utilization</div>
                  <div className={styles.chartPlaceholder}>
                    <Icon icon="mdi:chart-line" width={32} height={32} />
                  </div>
                </div>
                <div className={styles.chartCard}>
                  <div className={styles.chartTitle}>Load Average</div>
                  <div className={styles.chartPlaceholder}>
                    <Icon icon="mdi:chart-line" width={32} height={32} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'metric' && (
            <div className={styles.metricContent}>
              <p>Metric data will be displayed here</p>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className={styles.logsContent}>
              <p>Logs related to this trace will be displayed here</p>
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
