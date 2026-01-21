import { Activity, AlertCircle, ChevronDown, Cpu, Server, Timer, Zap } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer } from 'recharts';
import styles from './styles.module.css';

// Helper for professional NMS severity coloring
const getSeverityColor = (value, inverse = false) => {
  const val = parseFloat(value);
  if (isNaN(val)) return '#94a3b8'; // Slate-400 for unknown
  
  if (inverse) {
     // For things like availability where high is good
     if (val >= 99) return '#10b981'; // Emerald
     if (val >= 95) return '#3b82f6'; // Blue
     if (val >= 90) return '#f59e0b'; // Amber
     return '#ef4444'; // Red
  }

  // Standard: High usage = Bad
  if (val >= 80) return '#ef4444'; // Red
  if (val >= 60) return '#f97316'; // Orange
  if (val >= 40) return '#eab308'; // Yellow
  return '#3b82f6'; // Professional Blue (instead of green for low load, looks cleaner)
};

// Sub-component for individual Accordion Item
const AccordionItem = ({ title, icon: Icon, color, isOpen, onToggle, children, badge, badgeColor, contentLayout = 'split' }) => {
  return (
    <div className={styles.accordionItem} data-open={isOpen}>
      <style>{`
        /* Dynamic Accent Line */
        .${styles.accordionItem}[data-open="true"]::before {
           background-color: ${color};
        }
      `}</style>
      <div className={styles.accordionHeader} onClick={onToggle}>
        <div className={styles.headerLeft}>
          <div className={styles.iconWrapper} style={{ color: isOpen ? color : '#94a3b8' }}>
            <Icon size={20} />
          </div>
          <span className={styles.headerTitle}>{title}</span>
        </div>
        <div className={styles.headerRight}>
          {badge && (
            <span 
              className={styles.statBadge}
              style={{ 
                backgroundColor: isOpen ? (badgeColor || color) : 'var(--color-bg-tertiary)',
                color: isOpen ? '#fff' : 'var(--color-text-secondary)',
                border: isOpen ? 'none' : '1px solid var(--color-border)'
              }} 
            >
              {badge}
            </span>
          )}
          <ChevronDown 
            size={18} 
            className={styles.chevron}
          />
        </div>
      </div>
      {isOpen && (
        <div className={`${styles.accordionContent} ${contentLayout === 'full' ? styles.accordionContentFull : ''}`}>
          {children}
        </div>
      )}
    </div>
  );
};

// Reusable Simple Circular Gauge Component
const CircularGauge = ({ value, max = 100, color, size = 50, strokeWidth = 4 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedValue = Math.min(Math.max(value, 0), max);
  const percent = normalizedValue / max;
  const offset = circumference - percent * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-bg-tertiary)"
        strokeWidth={strokeWidth}
      />
      {/* Progress Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
    </svg>
  );
};

// Generic Gauge List for Group Metrics
const GroupMetricList = ({ data, unit = "%" }) => {
  const maxValue = Math.max(...data.map(d => parseFloat(d.value) || 0));
  // If unit is %, max is 100 for gauge scaling, otherwise use calculated max
  const gaugeMax = unit === '%' ? 100 : (maxValue || 100);

  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <Server size={12} /> Group Overview
      </div>
      <div className={styles.gaugeGrid}>
        {data.map((item, idx) => {
          const val = parseFloat(item.value);
          
          // Calculate percentage for coloring and visual fill
          // If metric is %, use value directly. If GB/other, relative to max in group.
          let percentage = val;
          if (unit !== '%') {
             percentage = (val / maxValue) * 100;
          }

          const color = getSeverityColor(percentage);
          
          return (
            <div key={idx} className={styles.gaugeItem}>
               <div className={styles.gaugeWrapper}>
                  <CircularGauge value={val} max={gaugeMax} color={color} size={48} strokeWidth={4} />
                  <span className={styles.gaugeText} style={{ color }}>
                    {/* Show rounded value for GB, or % for percentage */}
                    {Math.round(val)}{unit === '%' ? '%' : ''}
                  </span>
               </div>
               <div className={styles.gaugeInfo}>
                  <span className={styles.gaugeLabel} title={item.label}>{item.label}</span>
                  <span className={styles.gaugeValue}>{item.value}{unit}</span>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Generic Top Monitor List
const TopMonitorList = ({ data, variant = 'history', titleIcon: Icon = Activity, title = "Top Monitors" }) => {
  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <Icon size={12} /> {title}
      </div>
      <div className={styles.monitorList}>
        {data.map((item, idx) => {
           const sparklineData = (item.sparkline || []).map((val, i) => ({ i, value: val }));
           const displayValue = item.value || item.packets || '0';
           const numericValue = parseFloat(displayValue.replace(/[^0-9.]/g, '')) || 0;
           
           // Highlight current value color
           let mainColor = getSeverityColor(numericValue);
           // Special case for dropped packets - always red if > 0
           if (item.packets && numericValue > 0) mainColor = '#ef4444';
           
           return (
            <div key={idx} className={styles.monitorRow}>
              <div className={styles.monitorName} title={item.monitor || item.interface}>
                <span>{item.monitor}</span>
                {item.interface && <span className={styles.monitorSub}>{item.interface}</span>}
              </div>
              
              {/* Visualization Container */}
              <div className={styles.vizContainer}>
                {variant === 'history' ? (
                  /* History Strip Visualization */
                  <div className={styles.historyStrip}>
                    {sparklineData.length > 0 ? (
                      sparklineData.slice(-12).map((pt, i) => (
                        <div 
                           key={i} 
                           className={styles.historyBlock}
                           style={{ backgroundColor: getSeverityColor(pt.value) }}
                           title={`Val: ${pt.value}`}
                        />
                      ))
                    ) : (
                      [...Array(10)].map((_, i) => <div key={i} className={styles.historyBlock} style={{opacity: 0.1}} />)
                    )}
                  </div>
                ) : (
                  /* Bar Chart Visualization with Solid Attractive Colors */
                  <div className={styles.barSparkline}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sparklineData} barGap={2} margin={{top:2, bottom:2}}>
                        <Bar 
                          dataKey="value" 
                          fill={mainColor} 
                          radius={[2, 2, 0, 0]} 
                          isAnimationActive={false}
                          barSize={6}
                        >
                          {sparklineData.map((entry, index) => {
                             // Use solid attractive colors.
                             // For 'bar-color' variant (Network), we color strictly by value severity
                             // allowing 0s to be subtle and drops/errors to be Red.
                             const cellColor = variant === 'bar-color' ? getSeverityColor(entry.value) : mainColor;
                             return <Cell key={`cell-${index}`} fill={cellColor} /> 
                          })}
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

export const PerformanceAccordion = ({ cpuGroupData, cpuTopData, memoryGroupData, memoryTopData, droppedPacketsData, latencyData }) => {
  // State to manage open sections.
  const [openSections, setOpenSections] = useState({
    cpu: true,
    memory: true,
    network: true
  });

  const toggle = (section) => {
    // Unique layout behavior: If user clicks one, maybe others close? 
    // "Accordion" usually implies one open at a time, but for a dashboard, distinct sections might be better.
    // Let's keep independent toggling for maximum flexibility.
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Section Theme Colors (Used for headers/accents, not data)
  const themes = {
    cpu: '#3b82f6',    // Blue
    memory: '#8b5cf6', // Indigo
    network: '#0ea5e9', // Sky
  };

  return (
    <div className={styles.accordionContainer}>
      {/* CPU Section */}
      <AccordionItem 
        title="System CPU Performance" 
        icon={Cpu} 
        color={themes.cpu}
        isOpen={openSections.cpu}
        onToggle={() => toggle('cpu')}
        badge="82% Peak"
        badgeColor="#ef4444"
        contentLayout="full" // Use full to control internal grid
      >
        <div className={styles.splitLayout}>
           <GroupMetricList data={cpuGroupData} unit="%" />
           <div className={styles.verticalDivider}></div>
           <TopMonitorList data={cpuTopData} variant="history" />
        </div>
      </AccordionItem>

      {/* Memory Section */}
      <AccordionItem 
        title="Memory Utilization" 
        icon={Zap} 
        color={themes.memory}
        isOpen={openSections.memory}
        onToggle={() => toggle('memory')}
        badge="Healthy"
        badgeColor="#10b981"
        contentLayout="full"
      >
        <div className={styles.splitLayout}>
           <GroupMetricList data={memoryGroupData} unit=" GB" />
           <div className={styles.verticalDivider}></div>
           <TopMonitorList data={memoryTopData} variant="history" />
        </div>
      </AccordionItem>

      {/* Network Section - Split into Dropped Packets (Alert) and Latency */}
      <AccordionItem 
        title="Network Health & Latency" 
        icon={Activity} 
        color={themes.network}
        isOpen={openSections.network}
        onToggle={() => toggle('network')}
        badge="3 Alerts"
        badgeColor="#f59e0b"
        contentLayout="full"
      >
        {/* Render using the Split Layout Logic in CSS */}
        <div className={styles.splitLayout}>
           {/* Left Col: Dropped Packets */}
           <TopMonitorList 
              data={droppedPacketsData} 
              variant="bar-color" // Use colored bars
              title="Dropped Packets (Top Interfaces)"
              titleIcon={AlertCircle}
           />
           
           {/* Center Divider is handled by CSS grid gap/borders */}
           <div className={styles.verticalDivider}></div>
           
           {/* Right Col: Latency */}
           <TopMonitorList 
              data={latencyData} 
              variant="bar" 
              title="Top Latency"
              titleIcon={Timer}
           />
        </div>
      </AccordionItem>

    </div>
  );
};
