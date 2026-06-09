import styles from '@/screens/network-monitoring/detail/styles.module.css';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import 'react-grid-layout/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import { MdDragIndicator } from 'react-icons/md';
import 'react-resizable/css/styles.css';

import { getDeviceHistory } from '@/networking/network-monitoring/network-monitoring-apis';
import {
  buildResponsiveLayouts,
  GRID_BREAKPOINTS,
  GRID_COLS,
} from '@/utils/network-monitoring/build-responsive-layouts';

const ResponsiveGridLayout = WidthProvider(Responsive);

const LG_LAYOUT = [
  { i: 'battery_charge', x: 0, y: 0, w: 4, h: 3 },
  { i: 'load_capacity', x: 4, y: 0, w: 4, h: 3 },
  { i: 'alarms', x: 8, y: 0, w: 4, h: 3 },
  { i: 'voltage_trend', x: 0, y: 3, w: 8, h: 3 },
  { i: 'runtime', x: 8, y: 3, w: 4, h: 3 },
  { i: 'frequency', x: 0, y: 6, w: 6, h: 3 },
  { i: 'temperature', x: 6, y: 6, w: 6, h: 3 },
];

const initialLayouts = buildResponsiveLayouts(LG_LAYOUT);

const UPSDetail = ({ data }) => {
  const batteryRef = useRef(null);
  const loadRef = useRef(null);
  const voltageRef = useRef(null);
  const tempRef = useRef(null);
  const freqRef = useRef(null);

  const chartsRef = useRef({});

  const [layouts, setLayouts] = useState(initialLayouts);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    if (data?.device_ip) {
      getDeviceHistory(data.device_ip).then(history => {
        setHistoryData(history || []);
      }).catch(console.error);
    }
  }, [data?.device_ip]);

  const initChart = (ref, option) => {
    if (ref.current) {
      const chart = echarts.init(ref.current);
      chart.setOption(option);
      return chart;
    }
    return null;
  };

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

    const ups = data?.frontend_data?.ups_metrics || {};

    const batteryCharge = ups.battery_charge_percent || 0;
    const loadPercent = ups.output_load_percent || 0;

    const batteryColor = batteryCharge > 20 ? '#22c55e' : '#ef4444';
    const loadColor = loadPercent > 80 ? '#ef4444' : loadPercent > 60 ? '#eab308' : '#3b82f6';

    chartsRef.current.battery = initChart(batteryRef, {
      tooltip: { formatter: '{a} <br/>{b} : {c}%' },
      series: [
        {
          name: 'Battery',
          type: 'pie',
          radius: ['70%', '85%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'center',
            formatter: '{c}%',
            fontSize: 32,
            fontWeight: 'bold',
            color: '#fff',
          },
          labelLine: { show: false },
          data: [
            { value: batteryCharge, name: 'Charge', itemStyle: { color: batteryColor } },
            { value: 100 - batteryCharge, name: 'Empty', itemStyle: { color: 'rgba(255,255,255,0.05)' }, label: { show: false } }
          ]
        }
      ]
    });

    chartsRef.current.load = initChart(loadRef, {
      tooltip: { formatter: '{a} <br/>{b} : {c}%' },
      series: [
        {
          name: 'Load',
          type: 'pie',
          radius: ['70%', '85%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'center',
            formatter: '{c}%',
            fontSize: 32,
            fontWeight: 'bold',
            color: '#fff',
          },
          labelLine: { show: false },
          data: [
            { value: loadPercent, name: 'Usage', itemStyle: { color: loadColor } },
            { value: 100 - loadPercent, name: 'Empty', itemStyle: { color: 'rgba(255,255,255,0.05)' }, label: { show: false } }
          ]
        }
      ]
    });

    const historyTimes = historyData.map(h => new Date(h.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    // Assuming history has voltage data or fallback to single point
    const inputVoltage = ups.input_voltage || 0;
    const outputVoltage = ups.output_voltage || 0;
    const batteryVoltage = ups.battery_voltage || 0;

    chartsRef.current.voltage = initChart(voltageRef, {
      tooltip: commonTooltip,
      legend: { data: ['Input (V)', 'Output (V)', 'Battery (V)'], textStyle: { color: '#ccc' }, top: 0 },
      grid: commonGrid,
      xAxis: { type: 'category', data: historyTimes.length ? historyTimes : ['Current'], axisLine: { lineStyle: { color: '#374151' } }, axisLabel: { color: '#9ca3af' }, boundaryGap: false },
      yAxis: { type: 'value', splitLine: { lineStyle: { color: '#374151', type: 'dashed' } }, axisLabel: { color: '#9ca3af' } },
      series: [
        { name: 'Input (V)', type: 'line', smooth: true, symbolSize: 6, itemStyle: { color: '#3b82f6' }, data: historyTimes.length ? historyTimes.map(() => inputVoltage) : [inputVoltage] },
        { name: 'Output (V)', type: 'line', smooth: true, symbolSize: 6, itemStyle: { color: '#22c55e' }, data: historyTimes.length ? historyTimes.map(() => outputVoltage) : [outputVoltage] },
        { name: 'Battery (V)', type: 'line', smooth: true, symbolSize: 6, itemStyle: { color: '#f97316' }, data: historyTimes.length ? historyTimes.map(() => batteryVoltage) : [batteryVoltage] },
      ]
    });

    chartsRef.current.temp = initChart(tempRef, {
      tooltip: commonTooltip,
      grid: commonGrid,
      xAxis: { type: 'category', data: ['Battery Temp'], axisLine: { lineStyle: { color: '#374151' } }, axisLabel: { color: '#9ca3af' } },
      yAxis: { type: 'value', name: '°C', splitLine: { lineStyle: { color: '#374151', type: 'dashed' } }, axisLabel: { color: '#9ca3af' } },
      series: [
        {
          name: 'Temperature',
          type: 'bar',
          barWidth: '30%',
          itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#f97316' }, { offset: 1, color: '#ef4444' }]), borderRadius: [4, 4, 0, 0] },
          data: [ups.battery_temperature || 0]
        }
      ]
    });

    chartsRef.current.freq = initChart(freqRef, {
      tooltip: commonTooltip,
      grid: commonGrid,
      xAxis: { type: 'category', data: ['Input Hz', 'Output Hz'], axisLine: { lineStyle: { color: '#374151' } }, axisLabel: { color: '#9ca3af' } },
      yAxis: { type: 'value', name: 'Hz', splitLine: { lineStyle: { color: '#374151', type: 'dashed' } }, axisLabel: { color: '#9ca3af' }, min: 40, max: 70 },
      series: [
        {
          type: 'bar',
          barWidth: '40%',
          data: [
            { value: ups.input_frequency || 0, itemStyle: { color: '#3b82f6', borderRadius: [4, 4, 0, 0] } },
            { value: ups.output_frequency || 0, itemStyle: { color: '#22c55e', borderRadius: [4, 4, 0, 0] } }
          ]
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
  }, [data, historyData]);

  const onLayoutChange = (newLayout, allLayouts) => {
    setLayouts(allLayouts);
    setTimeout(() => {
      Object.values(chartsRef.current).forEach(chart => chart && chart.resize());
    }, 200);
  };

  const ups = data?.frontend_data?.ups_metrics || {};

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
        {/* Battery Charge */}
        <div key="battery_charge" className={styles.widgetCard}>
          <div className={`${styles.widgetHeader} drag-handle`}>
            <span>Battery Charge</span>
            <MdDragIndicator className={styles.dragIcon} />
          </div>
          <div className={styles.widgetBody}>
            <div ref={batteryRef} style={{ width: '100%', height: '100%' }}></div>
          </div>
        </div>

        {/* Load Capacity */}
        <div key="load_capacity" className={styles.widgetCard}>
          <div className={`${styles.widgetHeader} drag-handle`}>
            <span>Output Load</span>
            <MdDragIndicator className={styles.dragIcon} />
          </div>
          <div className={styles.widgetBody}>
            <div ref={loadRef} style={{ width: '100%', height: '100%' }}></div>
          </div>
        </div>

        {/* Alarms Present */}
        <div key="alarms" className={styles.widgetCard}>
          <div className={`${styles.widgetHeader} drag-handle`}>
            <span>Active Alarms</span>
            <MdDragIndicator className={styles.dragIcon} />
          </div>
          <div className={`${styles.widgetBody} ${styles.widgetBodyCentered}`}>
            <div
              className={styles.kpiValue}
              style={{ color: ups.alarms_present > 0 ? '#ef4444' : '#22c55e' }}
            >
              {ups.alarms_present || 0}
            </div>
            <div className={styles.kpiSubtext}>
              {ups.alarms_present > 0 ? 'Critical Issues Detected' : 'System Normal'}
            </div>
          </div>
        </div>

        {/* Voltage Trend */}
        <div key="voltage_trend" className={styles.widgetCard}>
          <div className={`${styles.widgetHeader} drag-handle`}>
            <span>Voltage Analysis</span>
            <MdDragIndicator className={styles.dragIcon} />
          </div>
          <div className={styles.widgetBody}>
            <div ref={voltageRef} style={{ width: '100%', height: '100%' }}></div>
          </div>
        </div>

        {/* Runtime Remaining */}
        <div key="runtime" className={styles.widgetCard}>
          <div className={`${styles.widgetHeader} drag-handle`}>
            <span>Est. Runtime Remaining</span>
            <MdDragIndicator className={styles.dragIcon} />
          </div>
          <div className={`${styles.widgetBody} ${styles.widgetBodyCentered}`}>
            <div className={styles.kpiValue} style={{ color: '#3b82f6' }}>
              {ups.battery_minutes_remaining || 0}
            </div>
            <div className={styles.kpiSubtext}>Minutes</div>
          </div>
        </div>

        {/* Frequency */}
        <div key="frequency" className={styles.widgetCard}>
          <div className={`${styles.widgetHeader} drag-handle`}>
            <span>Frequency (Hz)</span>
            <MdDragIndicator className={styles.dragIcon} />
          </div>
          <div className={styles.widgetBody}>
            <div ref={freqRef} style={{ width: '100%', height: '100%' }}></div>
          </div>
        </div>

        {/* Temperature */}
        <div key="temperature" className={styles.widgetCard}>
          <div className={`${styles.widgetHeader} drag-handle`}>
            <span>Battery Temperature</span>
            <MdDragIndicator className={styles.dragIcon} />
          </div>
          <div className={styles.widgetBody}>
            <div ref={tempRef} style={{ width: '100%', height: '100%' }}></div>
          </div>
        </div>

      </ResponsiveGridLayout>
    </div>
  );
};

export default UPSDetail;
