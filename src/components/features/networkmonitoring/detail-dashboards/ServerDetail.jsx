import styles from '@/screens/network-monitoring/detail/styles.module.css';
import * as echarts from 'echarts';
import { Activity, Server, Zap, Cpu, HardDrive, Network, Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MdMemory, MdDragIndicator } from 'react-icons/md';
import 'react-grid-layout/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import 'react-resizable/css/styles.css';

import {
  buildResponsiveLayouts,
  GRID_BREAKPOINTS,
  GRID_COLS,
} from '@/utils/network-monitoring/build-responsive-layouts';

const ResponsiveGridLayout = WidthProvider(Responsive);

const LG_LAYOUT = [
  { i: 'sysInfo', x: 0, y: 0, w: 7, h: 3 },
  { i: 'status', x: 7, y: 0, w: 5, h: 3 },
  { i: 'cpu', x: 0, y: 3, w: 4, h: 3 },
  { i: 'memory', x: 4, y: 3, w: 4, h: 3 },
  { i: 'bandwidth', x: 8, y: 3, w: 4, h: 3 },
];

const initialLayouts = buildResponsiveLayouts(LG_LAYOUT);

const ServerDetail = ({ data }) => {
  const cpuGaugeRef = useRef(null);
  const memoryGaugeRef = useRef(null);
  const chartsRef = useRef({});

  const [layouts, setLayouts] = useState(initialLayouts);

  const frontendData = data?.frontend_data || {};
  const identity = frontendData.identity || {};
  const sysInfo = frontendData.system_information || {};
  const perfMetrics = frontendData.performance_metrics || {};

  const cpuLoad = parseFloat(perfMetrics.cpu_load_percent || 0);
  const memLoad = parseFloat(perfMetrics.memory_consumption_percent || 0);

  const initChart = (ref, option) => {
    if (ref.current) {
      if (chartsRef.current[ref.current]) chartsRef.current[ref.current].dispose();
      const chart = echarts.init(ref.current);
      chart.setOption(option);
      return chart;
    }
    return null;
  };

  useEffect(() => {
    const commonGaugeSettings = {
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      radius: '90%',
      center: ['50%', '75%'],
      min: 0,
      max: 100,
      splitNumber: 4,
      axisLine: {
        lineStyle: {
          width: 14,
          color: [
            [0.6, '#10b981'], // Green
            [0.85, '#f59e0b'], // Yellow
            [1, '#ef4444'], // Red
          ]
        }
      },
      pointer: {
        icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
        length: '12%',
        width: 12,
        offsetCenter: [0, '-60%'],
        itemStyle: { color: 'auto' }
      },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        distance: -40,
        color: '#9ca3af',
        fontSize: 10
      },
      detail: {
        fontSize: 22,
        offsetCenter: [0, '15%'],
        valueAnimation: true,
        formatter: '{value}%',
        color: 'inherit',
        fontWeight: 'bold'
      }
    };

    chartsRef.current.cpuGauge = initChart(cpuGaugeRef, {
      series: [
        {
          ...commonGaugeSettings,
          name: 'CPU',
          data: [{ value: cpuLoad }]
        }
      ]
    });

    chartsRef.current.memoryGauge = initChart(memoryGaugeRef, {
      series: [
        {
          ...commonGaugeSettings,
          name: 'Memory',
          data: [{ value: memLoad }]
        }
      ]
    });

    const handleResize = () => {
      Object.values(chartsRef.current).forEach(chart => chart && chart.resize());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Object.values(chartsRef.current).forEach(chart => chart && chart.dispose());
    };
  }, [cpuLoad, memLoad]);

  const onLayoutChange = (currentLayout, allLayouts) => {
    setLayouts(allLayouts);
    setTimeout(() => {
      Object.values(chartsRef.current).forEach((chart) => chart && chart.resize());
    }, 300);
  };

  const WidgetTitle = ({ icon: Icon, title, color }) => (
    <div className={styles.cardHeader}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className={`${styles.dragController} drag-handle`}>
          <MdDragIndicator />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
          <div 
            className={styles.widgetIconBox} 
            style={{ 
              color: color, 
              background: `rgba(${parseInt(color.slice(1,3),16)}, ${parseInt(color.slice(3,5),16)}, ${parseInt(color.slice(5,7),16)}, 0.1)`,
              marginRight: '8px'
            }}
          >
            <Icon size={16} />
          </div>
          <h3 className={styles.widgetTitle}>{title}</h3>
        </div>
      </div>
    </div>
  );

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      breakpoints={GRID_BREAKPOINTS}
      cols={GRID_COLS}
      rowHeight={100}
      margin={[16, 16]}
      containerPadding={[0, 0]}
      compactType="vertical"
      onLayoutChange={onLayoutChange}
      draggableHandle=".drag-handle"
    >
      <div key="sysInfo" className={styles.widgetCard}>
        <WidgetTitle icon={Info} title="System Information" color="#3b82f6" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', height: 'calc(100% - 50px)', overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '8px' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Host</span>
            <span style={{ color: '#f3f4f6', fontWeight: 600, fontSize: '0.9rem' }}>{identity.name || data?.device_name || '-'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '8px' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>IP Address</span>
            <span style={{ color: '#f3f4f6', fontWeight: 600, fontSize: '0.9rem' }}>{data?.device_ip || '-'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1f2937', paddingBottom: '8px' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>OS / Description</span>
            <span style={{ color: '#f3f4f6', fontWeight: 500, fontSize: '0.85rem', textAlign: 'right', maxWidth: '60%' }}>{identity.description || '-'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Uptime</span>
            <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.9rem' }}>{sysInfo.uptime_days || '-'}</span>
          </div>
        </div>
      </div>

      <div key="status" className={styles.widgetCard}>
        <WidgetTitle icon={Activity} title="Status & Grouping" color="#8b5cf6" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '16px', alignItems: 'center', justifyContent: 'center', height: 'calc(100% - 50px)' }}>
          <div style={{ 
            padding: '10px 24px', 
            borderRadius: '20px', 
            backgroundColor: identity.status === 'UP' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${identity.status === 'UP' ? '#10b981' : '#ef4444'}`,
            color: identity.status === 'UP' ? '#10b981' : '#ef4444',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: identity.status === 'UP' ? '#10b981' : '#ef4444' }} />
            {identity.status || 'UNKNOWN'}
          </div>
          {identity.tags && identity.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {identity.tags.map((tag, i) => (
                <span key={i} style={{ padding: '4px 10px', backgroundColor: '#1f2937', borderRadius: '4px', fontSize: '0.75rem', color: '#d1d5db', border: '1px solid #374151' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div key="cpu" className={styles.widgetCard}>
        <WidgetTitle icon={Cpu} title="CPU Utilization" color="#06b6d4" />
        <div ref={cpuGaugeRef} style={{ height: 'calc(100% - 50px)', width: '100%' }}></div>
      </div>

      <div key="memory" className={styles.widgetCard}>
        <WidgetTitle icon={MdMemory} title="Memory Utilization" color="#f59e0b" />
        <div ref={memoryGaugeRef} style={{ height: 'calc(100% - 50px)', width: '100%' }}></div>
      </div>

      <div key="bandwidth" className={styles.widgetCard}>
        <WidgetTitle icon={Network} title="Bandwidth Usage" color="#10b981" />
        <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 50px)', justifyContent: 'center', gap: '20px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '2px' }}>Traffic In</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981' }}>{perfMetrics.total_bandwidth_in || '0.0 Mbps'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '2px' }}>Traffic Out</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3b82f6' }}>{perfMetrics.total_bandwidth_out || '0.0 Mbps'}</div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveGridLayout>
  );
};

export default ServerDetail;
