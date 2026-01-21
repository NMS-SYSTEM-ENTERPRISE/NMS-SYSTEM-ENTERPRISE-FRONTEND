"use client";
import AlertCountWidget from '@/components/common/alert-count-widget';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

const WidgetsDemo = () => {
  const MOCK_CPU_GRID_DATA = [
    {
      monitor: 'HB1-2328-26-4992-88.hb1.com',
      value: '16%',
      color: '#06b6d4',
    },
    {
      monitor: 'HB1-2328-26-4992-104.hb1.com',
      value: '83%',
      color: '#06b6d4',
    },
    {
      monitor: 'HB1-2328-26-4992-38.hb1.com',
      value: '83%',
      color: '#06b6d4',
    },
  ];

  const MEMORY_PIE_DATA = [
    { label: 'HB1-2328-26-4992-262.hb1.com', value: 14.3, color: '#06b6d4' },
    { label: 'HB1-2328-26-4992-248.hb1.com', value: 14.3, color: '#22c55e' },
    { label: 'HB1-2328-26-4992-33.hb1.com', value: 14.3, color: '#fbbf24' },
    { label: 'HB1-2328-26-4992-66.hb1.com', value: 14.3, color: '#f97316' },
    { label: 'HB1-2328-26-4992-223.hb1.com', value: 14.3, color: '#ef4444' },
    { label: 'HB1-2328-26-4992-145.hb1.com', value: 14.3, color: '#8b5cf6' },
    { label: 'HB1-2328-26-4992-278.hb1.com', value: 14.3, color: '#ec4899' },
  ];

  return (
    <div className={styles.widgetsDemo}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Icon icon="mdi:view-grid" width={20} height={20} />
          <div className={styles.dashboardDropdown}>
            <span className={styles.dashboardName}>Free Text</span>
            <Icon icon="mdi:chevron-down" width={16} height={16} />
          </div>
          <Icon
            icon="mdi:star"
            width={20}
            height={20}
            className={styles.starIcon}
          />
        </div>

        <div className={styles.headerActions}>
          <button className={styles.todayBadge}>today</button>
          <span className={styles.timeText}>Today</span>
          <button className={styles.iconBtn}>
            <Icon icon="mdi:calendar" width={20} height={20} />
          </button>
          <button className={styles.iconBtn}>
            <Icon icon="mdi:pencil" width={20} height={20} />
          </button>
          <button className={styles.iconBtn}>
            <Icon icon="mdi:share-variant" width={20} height={20} />
          </button>
          <button className={styles.iconBtn}>
            <Icon icon="mdi:dots-vertical" width={20} height={20} />
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className={styles.timeline}>
        <div className={styles.timelineTrack}>
          <div className={styles.timelineProgress}></div>
        </div>
        <div className={styles.timeMarkers}>
          <span>01:53</span>
          <span>08:07</span>
          <span>14:21</span>
          <span>20:35</span>
          <span>02:48</span>
          <span>09:02</span>
          <span>15:16</span>
          <span>21:30</span>
          <span>03:44</span>
          <span>09:58</span>
          <span>16:34</span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Alert Count Widget */}
        <div className={styles.alertCountSection}>
          <AlertCountWidget />
        </div>

        {/* CPU Widgets Section */}
        <div className={styles.sectionTitle}>CPU Widgets</div>

        <div className={styles.cpuSection}>
          {/* CPU Chart */}
          <div className={styles.cpuWidget}>
            <h3 className={styles.widgetTitle}>Cpu Widget</h3>
            <svg width="100%" height="300" viewBox="0 0 800 300">
              <defs>
                <linearGradient id="cpuGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Y-axis labels */}
              <text x="20" y="60" fill="#888" fontSize="11">
                75%
              </text>
              <text x="20" y="120" fill="#888" fontSize="11">
                50%
              </text>
              <text x="20" y="180" fill="#888" fontSize="11">
                25%
              </text>
              <text x="25" y="240" fill="#888" fontSize="11">
                0%
              </text>

              {/* Area chart */}
              <path
                d="M 60,150 L 100,140 L 140,145 L 180,135 L 220,150 L 260,130 L 300,145 L 340,135 L 380,150 L 420,140 L 460,135 L 500,145 L 540,130 L 580,135 L 620,145 L 660,140 L 700,135 L 740,140 L 780,135 L 780,250 L 60,250 Z"
                fill="url(#cpuGradient)"
              />
              <path
                d="M 60,150 L 100,140 L 140,145 L 180,135 L 220,150 L 260,130 L 300,145 L 340,135 L 380,150 L 420,140 L 460,135 L 500,145 L 540,130 L 580,135 L 620,145 L 660,140 L 700,135 L 740,140 L 780,135"
                stroke="#06b6d4"
                strokeWidth="2"
                fill="none"
              />

              {/* X-axis labels */}
              <text x="80" y="280" fill="#888" fontSize="11">
                28. Apr
              </text>
              <text x="220" y="280" fill="#888" fontSize="11">
                02:00
              </text>
              <text x="360" y="280" fill="#888" fontSize="11">
                04:00
              </text>
              <text x="500" y="280" fill="#888" fontSize="11">
                06:00
              </text>
              <text x="640" y="280" fill="#888" fontSize="11">
                08:00
              </text>
            </svg>
          </div>

          {/* CPU Grid */}
          <div className={styles.cpuGrid}>
            <h3 className={styles.widgetTitle}>Cpu grid widate</h3>
            <div className={styles.gridSearch}>
              <Icon icon="mdi:magnify" width={16} height={16} />
              <input type="text" placeholder="Search" />
            </div>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>MONITOR</th>
                  <th>SYSTEM.CPU.PERCENT.AVG</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CPU_GRID_DATA.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <span className={styles.monitorLink}>{row.monitor}</span>
                    </td>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Memory Widgets Section */}
        <div className={styles.sectionTitle}>Memory Widgets</div>

        <div className={styles.memorySection}>
          {/* Memory Gauge */}
          <div className={styles.memoryGauge}>
            <h3 className={styles.widgetTitle}>Memory Gauge</h3>
            <svg width="100%" height="350" viewBox="0 0 400 350">
              {/* Outer circle (background) */}
              <circle cx="200" cy="200" r="140" fill="#3a3a3a" />

              {/* Inner circle (dark) */}
              <circle cx="200" cy="200" r="110" fill="#1a1a1a" />

              {/* Progress arc (cyan) */}
              <circle
                cx="200"
                cy="200"
                r="125"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="30"
                strokeDasharray="592 785"
                strokeLinecap="butt"
                transform="rotate(-90 200 200)"
              />

              {/* Percentage text */}
              <text
                x="200"
                y="220"
                textAnchor="middle"
                fill="#fff"
                fontSize="52"
                fontWeight="bold"
              >
                75.58%
              </text>
            </svg>
          </div>

          {/* Memory Pie */}
          <div className={styles.memoryPie}>
            <h3 className={styles.widgetTitle}>memory- pie</h3>
            <div className={styles.pieContainer}>
              <svg width="300" height="300" viewBox="0 0 300 300">
                {/* Create pie chart segments */}
                <g transform="translate(150, 150)">
                  {/* Segment 1 - Blue */}
                  <path
                    d="M 0,-100 A 100,100 0 0,1 70.7,70.7 L 0,0 Z"
                    fill="#06b6d4"
                  />
                  {/* Segment 2 - Green */}
                  <path
                    d="M 70.7,70.7 A 100,100 0 0,1 0,100 L 0,0 Z"
                    fill="#22c55e"
                  />
                  {/* Segment 3 - Yellow */}
                  <path
                    d="M 0,100 A 100,100 0 0,1 -70.7,70.7 L 0,0 Z"
                    fill="#fbbf24"
                  />
                  {/* Segment 4 - Orange */}
                  <path
                    d="M -70.7,70.7 A 100,100 0 0,1 -100,0 L 0,0 Z"
                    fill="#f97316"
                  />
                  {/* Segment 5 - Red */}
                  <path
                    d="M -100,0 A 100,100 0 0,1 -70.7,-70.7 L 0,0 Z"
                    fill="#ef4444"
                  />
                  {/* Segment 6 - Purple */}
                  <path
                    d="M -70.7,-70.7 A 100,100 0 0,1 0,-100 L 0,0 Z"
                    fill="#8b5cf6"
                  />
                  {/* Segment 7 - Pink */}
                  <path
                    d="M 0,-100 A 100,100 0 0,1 50,-86.6 L 0,0 Z"
                    fill="#ec4899"
                  />
                  {/* Gray segment */}
                  <path
                    d="M 50,-86.6 A 100,100 0 0,1 70.7,-70.7 L 0,0 Z"
                    fill="#64748b"
                  />
                </g>
              </svg>

              <div className={styles.pieLegend}>
                {MEMORY_PIE_DATA.map((item, index) => (
                  <div key={index} className={styles.legendItem}>
                    <span
                      className={styles.legendColor}
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className={styles.legendLabel}>{item.label}</span>
                    <span className={styles.legendValue}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetsDemo;
