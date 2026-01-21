import { Activity, ChevronDown, HardDrive, Layers, Server } from 'lucide-react';
import { useState } from 'react';
import { Area, AreaChart, Bar, BarChart, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer } from 'recharts';
import styles from './styles.module.css';

// Helper for Severity Colors (Consistent with Dashboard)
const getSeverityColor = (value, inverse = false) => {
  const val = parseFloat(value);
  if (isNaN(val)) return '#94a3b8';
  
  if (inverse) {
     if (val <= 10) return '#ef4444'; // Red (Low space)
     if (val <= 20) return '#f97316'; // Orange
     return '#3b82f6'; // Blue (Good)
  }

  // Standard: High usage/errors = Bad
  if (val >= 80) return '#ef4444'; 
  if (val >= 60) return '#f97316';
  if (val >= 40) return '#eab308';
  return '#3b82f6'; 
};

// Accordion Item Component
const AccordionItem = ({ title, icon: Icon, color, isOpen, onToggle, children, badge, badgeColor, layout = 'split' }) => {
  return (
    <div className={styles.accordionItem} data-open={isOpen}>
      <style>{`
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
          <ChevronDown size={18} className={styles.chevron} />
        </div>
      </div>
      {isOpen && (
        <div className={styles.accordionContent} data-layout={layout}>
          {children}
        </div>
      )}
    </div>
  );
};

// Unique List Component
const ResourceMonitorList = ({ data, title, type = 'bar', unit = '', colorOverride, spread = false }) => {
  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        {type === 'pie' ? <PieChart size={12} /> : <Activity size={12} />} {title}
      </div>
      <div className={styles.monitorList} data-spread={spread}>
        {data.map((item, idx) => {
           // Parse Value
           const rawValue = item.value || item.packets || '0';
           let numValue = parseFloat(String(rawValue).replace(/[^0-9.]/g, '')) || 0;

           // Parse percentage from monitor name if available (specifically for Disk Used %)
           // This handles cases where value is "606" but name is "sqlvm 60.6%"
           if (title === "Disk Used %") {
             const nameStr = item.monitor || item.name || '';
             // Try to find a pattern like " 60.6%" or " 60%"
             const match = nameStr.match(/(\d+(?:\.\d+)?)%/);
             if (match) {
                numValue = parseFloat(match[1]);
             } else if (numValue > 100) {
                // Heuristic fallback if regex fails but value is clearly unscaled
                if (numValue > 1000) numValue /= 100; // e.g. 1498 -> 14.98
                else numValue /= 10; // e.g. 606 -> 60.6
             }
           }
           
           // Clamp for display to 100 max
           const chartValue = Math.min(Math.max(numValue, 0), 100);

           // Determine Color
           // Use Override if provided (e.g. solid Blue theme), otherwise severity
           let itemColor = colorOverride || getSeverityColor(numValue);
           
           // Special Logic for specific types
           if (title.includes("Error") && numValue > 0) itemColor = '#ef4444';
           if (title.includes("Low Disk")) itemColor = getSeverityColor(numValue, true); // Inverse logic

           // Data for Charts
           const sparklineData = (item.sparkline || []).map((v, i) => ({ i, value: v }));
           
           // Donut Data
           const pieData = [
             { name: 'Used', value: chartValue, color: itemColor },
             { name: 'Free', value: 100 - chartValue, color: 'rgba(255,255,255,0.08)' }
           ];

           return (
            <div key={idx} className={styles.monitorRow}>
              <div className={styles.monitorName} title={item.monitor || item.name}>
                <span className={styles.monitorNameText}>{item.monitor || item.name}</span>
                {item.interface && <span className={styles.monitorSubText}>{item.interface}</span>}
              </div>
              
              <div className={styles.vizContainer}>
                {type === 'pie' && (
                  /* Neat Ring Chart with Percentage */
                  <div className={styles.pieContainer}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            innerRadius={16}
                            outerRadius={22}
                            dataKey="value"
                            stroke="none"
                            startAngle={90}
                            endAngle={-270}
                            cornerRadius={3}
                          >
                             {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                             ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: '700',
                          color: itemColor
                      }}>
                          {Math.round(numValue)}%
                      </div>
                  </div>
                )}

                {type === 'progress' && (
                  /* Sleek Progress Pill with Label */
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', width: '100%'}}>
                    <div className={styles.progressContainer}>
                      <div 
                        className={styles.progressBar} 
                        style={{ width: `${Math.min(numValue, 100)}%`, backgroundColor: itemColor }}
                      />
                    </div>
                    <span style={{fontSize: '11px', fontWeight: '600', color: itemColor, minWidth: '35px'}}>
                      {Math.round(numValue)}%
                    </span>
                  </div>
                )}

                {type === 'bar' && (
                   /* Clean Vertical 'Audio' Bars */
                   <div className={styles.chartSparkline}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sparklineData} barGap={4} margin={{top:5, bottom:5}}>
                           <Bar dataKey="value" fill={itemColor} barSize={2} radius={[1, 1, 0, 0]}>
                              {sparklineData.map((e, i) => (
                                <Cell key={i} fill={itemColor} fillOpacity={e.value > 0 ? 0.9 : 0.2} />
                              ))}
                           </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                   </div>
                )}
                
                {type === 'area' && (
                   /* Smooth Line Wave (Neat) */
                   <div className={styles.chartSparkline}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sparklineData} margin={{top:5, bottom:5}}>
                           <defs>
                              <linearGradient id={`grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={itemColor} stopOpacity={0.3}/>
                                <stop offset="95%" stopColor={itemColor} stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <Area 
                              type="monotone" 
                              dataKey="value" 
                              stroke={itemColor} 
                              fill={`url(#grad-${idx})`} 
                              strokeWidth={2} 
                              dot={false}
                              activeDot={false}
                           />
                        </AreaChart>
                      </ResponsiveContainer>
                   </div>
                )}
                
                {type === 'line' && (
                   /* Sharp Activity Line */
                   <div className={styles.chartSparkline}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sparklineData} margin={{top:5, bottom:5, left: 5, right: 5}}>
                           <Line 
                              type="monotone" 
                              dataKey="value" 
                              stroke={itemColor} 
                              strokeWidth={2} 
                              dot={false}
                              isAnimationActive={true}
                           />
                        </LineChart>
                      </ResponsiveContainer>
                   </div>
                )}
                
                {type === 'none' && (
                    /* Spacer for Text Only formatting */
                    <div style={{width: '100%'}}></div>
                )}
              </div>

              {type !== 'pie' && (
              <div className={styles.monitorValue} style={{ color: itemColor }}>
                {rawValue}{unit}
              </div>
              )}
            </div>
           );
        })}
      </div>
    </div>
  );
};


export const ResourceAccordion = ({ 
  diskUsageData, 
  lowDiskSpaceData,
  errorPacketsData,
  networkPacketsData,
  networkBytesData,
  deviceAvailabilityData,
  deviceDowntimeData
}) => {
  
  const [openSections, setOpenSections] = useState({
    storage: true,
    network: true,
    health: true
  });

  const toggle = (sec) => setOpenSections(prev => ({...prev, [sec]: !prev[sec]}));
  
  return (
    <div className={styles.accordionContainer}>
      {/* 1. Storage Health & Capacity */}
      <AccordionItem
        title="Storage Health & Capacity"
        icon={HardDrive}
        color="#8b5cf6" // Purple Theme
        isOpen={openSections.storage}
        onToggle={() => toggle('storage')}
        badge="2 Alerts"
        badgeColor="#ef4444"
        layout="full"
      >
         <ResourceMonitorList 
            title="Disk Used %"
            data={diskUsageData}
            type="pie" // Unique Donut Viz
            unit="" 
         />
         <ResourceMonitorList 
            title="Low Disk Space (Critical Volumes)"
            data={lowDiskSpaceData}
            type="progress" // Unique Progress Viz
            unit="%"
         />
      </AccordionItem>

      {/* 2. Network Traffic Analysis */}
      <AccordionItem
        title="Network Traffic Analysis"
        icon={Layers}
        color="#06b6d4" // Cyan Theme
        isOpen={openSections.network}
        onToggle={() => toggle('network')}
        badge="High Load"
        badgeColor="#3b82f6"
        layout="triple"
      >
         {/* Column 1: Packets */}
         <ResourceMonitorList 
            title="Packets Per Second"
            data={networkPacketsData}
            type="line" // Changed from 'none' to 'line'
            unit=""
            colorOverride="#10b981" 
         />
         
         {/* Column 2: Errors */}
         <ResourceMonitorList 
            title="Interface Errors"
            data={errorPacketsData}
            type="bar" 
            colorOverride="#ef4444"
        />
         
         {/* Column 3: Throughput */}
         <ResourceMonitorList 
              title="Network Throughput (Bytes/s)"
              data={networkBytesData}
              type="area" 
              colorOverride="#3b82f6" 
          />
      </AccordionItem>

      {/* 3. Infrastructure Health */}
      <AccordionItem
        title="Infrastructure Health"
        icon={Server} // Imported from lucide-react (need to check imports)
        color="#f59e0b" // Amber Theme
        isOpen={openSections.health}
        onToggle={() => toggle('health')}
        badge="Critical"
        badgeColor="#ef4444"
        layout="full"
      >
        <ResourceMonitorList 
           title="Device Availability Status"
           data={deviceAvailabilityData || []}
           type="progress" // Use progress bars for Up/Down counts
           unit="" 
        />
        <ResourceMonitorList 
           title="Device Downtime Duration"
           data={deviceDowntimeData || []}
           type="area" // Area charts for trend
           unit=""
           colorOverride="#ef4444"
        />
      </AccordionItem>
     </div>
  );
};
