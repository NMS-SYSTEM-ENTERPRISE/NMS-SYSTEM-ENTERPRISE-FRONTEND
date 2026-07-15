import styles from '@/screens/network-monitoring/detail/styles.module.css';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import 'react-grid-layout/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import { MdDragIndicator } from 'react-icons/md';
import 'react-resizable/css/styles.css';

import {
  buildResponsiveLayouts,
  GRID_BREAKPOINTS,
  GRID_COLS,
} from '@/utils/network-monitoring/build-responsive-layouts';

const ResponsiveGridLayout = WidthProvider(Responsive);

const LG_LAYOUT = [
  { i: 'hardware_specs', x: 0, y: 0, w: 6, h: 4 },
  { i: 'bandwidth', x: 6, y: 0, w: 6, h: 4 },
  { i: 'uptime', x: 0, y: 4, w: 4, h: 3 },
  { i: 'interface_status', x: 4, y: 4, w: 8, h: 3 },
];

const initialLayouts = buildResponsiveLayouts(LG_LAYOUT);

const CCTVDetail = ({ data }) => {
  const bandwidthRef = useRef(null);
  const interfaceRef = useRef(null);

  const chartsRef = useRef({});

  const [layouts, setLayouts] = useState(initialLayouts);

  useEffect(() => {
    const commonTooltip = {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#333',
      textStyle: { color: '#fff' },
    };

    const commonGrid = {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    };

    const perf = data?.frontend_data?.performance_metrics || {};
    let bIn = 0;
    let bOut = 0;

    if (perf.total_bandwidth_in) {
      bIn = parseFloat(perf.total_bandwidth_in.replace(/[^\d.-]/g, '')) || 0;
    }
    if (perf.total_bandwidth_out) {
      bOut = parseFloat(perf.total_bandwidth_out.replace(/[^\d.-]/g, '')) || 0;
    }

    if (bandwidthRef.current) {
      chartsRef.current.bandwidth = echarts.init(bandwidthRef.current);
      chartsRef.current.bandwidth.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#333',
          textStyle: { color: '#fff' },
        },
        grid: commonGrid,
        legend: { data: ['Traffic In (Mbps)', 'Traffic Out (Mbps)'], textStyle: { color: '#ccc' }, top: 0 },
        xAxis: { type: 'category', data: ['Current Traffic'], axisLine: { lineStyle: { color: '#374151' } }, axisLabel: { color: '#9ca3af' } },
        yAxis: { type: 'value', name: 'Mbps', splitLine: { lineStyle: { color: '#374151', type: 'dashed' } }, axisLabel: { color: '#9ca3af' } },
        series: [
          {
            name: 'Traffic In (Mbps)',
            type: 'bar',
            barWidth: '20%',
            itemStyle: { color: '#10b981', borderRadius: [4, 4, 0, 0] },
            data: [bIn]
          },
          {
            name: 'Traffic Out (Mbps)',
            type: 'bar',
            barWidth: '20%',
            itemStyle: { color: '#3b82f6', borderRadius: [4, 4, 0, 0] },
            data: [bOut]
          }
        ]
      });
    }

    const ifaces = data?.frontend_data?.interface_summary || {};
    const up = ifaces.interfaces_up || 0;
    const down = ifaces.interfaces_down || 0;

    if (interfaceRef.current) {
      chartsRef.current.interfaces = echarts.init(interfaceRef.current);
      chartsRef.current.interfaces.setOption({
        tooltip: { formatter: '{a} <br/>{b} : {c}' },
        legend: { bottom: '0', textStyle: { color: '#ccc' } },
        series: [
          {
            name: 'Interfaces',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: false,
            label: { show: false, position: 'center' },
            labelLine: { show: false },
            data: [
              { value: up, name: 'Up', itemStyle: { color: '#10b981' } },
              { value: down, name: 'Down', itemStyle: { color: '#ef4444' } }
            ]
          }
        ]
      });
    }

    const handleResize = () => {
      Object.values(chartsRef.current).forEach(chart => chart && chart.resize());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Object.values(chartsRef.current).forEach(chart => chart && chart.dispose());
    };
  }, [data]);

  const onLayoutChange = (newLayout, allLayouts) => {
    setLayouts(allLayouts);
    setTimeout(() => {
      Object.values(chartsRef.current).forEach(chart => chart && chart.resize());
    }, 200);
  };

  const cctv = data?.frontend_data?.cctv_metrics || null;
  const sysInfo = data?.frontend_data?.system_information || {};

  return (
    <div className={styles.detailContainer}>
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
        isResizable={true}
      >
        {/* Hardware Specs */}
        <div key="hardware_specs" className={styles.widgetCard}>
          <div className={`${styles.widgetHeader} drag-handle`}>
            <span>Camera Specifications</span>
            <MdDragIndicator className={styles.dragIcon} />
          </div>
          <div className={styles.widgetBody} style={{ padding: '16px', overflowY: 'auto' }}>
            {cctv ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Vendor</div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{cctv.vendor || 'N/A'}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Model</div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{cctv.model || 'N/A'}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Type</div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{cctv.type || 'N/A'}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Serial Number</div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{cctv.serial_number || 'N/A'}</div>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Firmware</div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px', background: 'var(--color-bg-secondary)', padding: '8px', borderRadius: '4px' }}>
                    {cctv.firmware || 'N/A'}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-secondary)' }}>
                No specialized camera metrics available.
              </div>
            )}
          </div>
        </div>

        {/* Bandwidth Usage */}
        <div key="bandwidth" className={styles.widgetCard}>
          <div className={`${styles.widgetHeader} drag-handle`}>
            <span>Bandwidth Analytics</span>
            <MdDragIndicator className={styles.dragIcon} />
          </div>
          <div className={styles.widgetBody}>
            <div ref={bandwidthRef} style={{ width: '100%', height: '100%' }}></div>
          </div>
        </div>

        {/* Uptime */}
        <div key="uptime" className={styles.widgetCard}>
          <div className={`${styles.widgetHeader} drag-handle`}>
            <span>System Uptime</span>
            <MdDragIndicator className={styles.dragIcon} />
          </div>
          <div className={`${styles.widgetBody} ${styles.widgetBodyCentered}`}>
            <div className={styles.kpiValue} style={{ color: '#3b82f6', fontSize: '32px' }}>
              {sysInfo.uptime_days || 'N/A'}
            </div>
            <div className={styles.kpiSubtext}>Uptime Duration</div>
          </div>
        </div>

        {/* Interface Status */}
        <div key="interface_status" className={styles.widgetCard}>
          <div className={`${styles.widgetHeader} drag-handle`}>
            <span>Interface Status</span>
            <MdDragIndicator className={styles.dragIcon} />
          </div>
          <div className={styles.widgetBody} style={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            <div ref={interfaceRef} style={{ width: '50%', height: '100%' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '50%' }}>
              <div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '12px' }}>Total Interfaces</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{data?.frontend_data?.interface_summary?.total_interfaces || 0}</div>
              </div>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div>
                  <div style={{ color: '#10b981', fontSize: '12px' }}>Interfaces Up</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>{data?.frontend_data?.interface_summary?.interfaces_up || 0}</div>
                </div>
                <div>
                  <div style={{ color: '#ef4444', fontSize: '12px' }}>Interfaces Down</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444' }}>{data?.frontend_data?.interface_summary?.interfaces_down || 0}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </ResponsiveGridLayout>
    </div>
  );
};

export default CCTVDetail;
