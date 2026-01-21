"use client";
import { SelectComponent } from '@/components/ui/select';
import { ROUTE_PATHS } from '@/utils/constants/route-paths';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

import { useState } from 'react';

// --- Sub-Components ---

const MetricBar = ({ label, value, color }) => (
  <div className={styles.metricItem}>
    <div className={styles.metricLabel}>
      <span>{label}</span>
      <span className={styles.metricValue}>{value}%</span>
    </div>
    <div className={styles.miniBarTrack}>
      <div 
        className={styles.miniBarFill} 
        style={{ width: `${value}%`, backgroundColor: color }} 
      />
    </div>
  </div>
);

const DetailCard = ({ label, value, icon, subValue }) => (
  <div className={styles.detailCard}>
    <span className={styles.detailLabel}>{label}</span>
    <div className={styles.detailValue}>
      {icon && <Icon icon={icon} width={16} height={16} color="#94a3b8" />}
      {value}
    </div>
    {subValue && <span className={styles.rowSub} style={{fontSize: '11px'}}>{subValue}</span>}
  </div>
);

const AccordionRow = ({ item, category, isExpanded, onToggle, getProgressBarColor, config }) => {
  const router = useRouter();

  const handleDetailClick = (e) => {
    e.stopPropagation();
    const path = ROUTE_PATHS.NET_WORK_MONITORING_DETAIL.replace(
      ':category',
      encodeURIComponent(category)
    ).replace(':deviceId', encodeURIComponent(item.name));
    router.push(path);
  };

  const getIcon = () => {
     if (item.type === 'Windows') return 'mdi:microsoft-windows';
     if (item.type === 'Linux') return 'mdi:linux';
     if (config.icon) return config.icon;
     return 'mdi:server';
  };

  const getIconColor = () => {
    if (item.type === 'Windows') return '#0078D4';
    if (item.type === 'Linux') return '#FCC624';
    return config.color;
  }

  // Helper for metrics
  // Helper Gauge Component
  const renderGauge = (label, value) => {
    const size = 48; /* Increased size to fit value neatly */
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    const color = getProgressBarColor(value);

    return (
      <div className={styles.compactMetric} style={{flexDirection:'row', alignItems:'center', paddingLeft:'0'}}>
        <div style={{width: size, height: size, position:'relative', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <svg width={size} height={size} style={{transform: 'rotate(-90deg)'}}>
            <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={strokeWidth} />
            <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} 
              strokeDasharray={circumference} 
              strokeDashoffset={offset} 
              strokeLinecap="round" 
            />
          </svg>
           <span style={{position:'absolute', fontSize:'12px', fontWeight:'700', color:'#fff'}}>{value}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.accordionRow} data-expanded={isExpanded}>
      {/* 
         Table Grid Row 
         Columns: Identity | Status | Metric1 | Metric2 | Metric3 | Action 
      */}
      <div className={styles.rowMain} onClick={onToggle}>
        
        {/* Col 1: Identity */}
        <div className={styles.rowIdentity}>
           <div className={styles.rowIcon} style={{color: getIconColor()}}>
              <Icon icon={getIcon()} width={18} height={18} />
           </div>
           <div className={styles.rowInfo}>
              <span className={styles.rowName}>{item.name}</span>
              <span className={styles.rowSub}><Icon icon="mdi:ip-network" width={10}/> {item.ip}</span>
           </div>
        </div>

        {/* Col 2: Status */}
        <div className={styles.rowStatus}>
           <span className={`${styles.statusBadge} ${item.status === 'Up' ? styles.statusBadgeUp : styles.statusBadgeDown}`}>
              {item.status}
           </span>
        </div>

        {/* Col 3: CPU */}
        <div className={styles.metricSlot}>
           {item.cpu !== undefined ? renderGauge('CPU', item.cpu) : <span className={styles.rowSub}>-</span>}
        </div>

        {/* Col 4: Memory */}
        <div className={styles.metricSlot}>
           {item.memory !== undefined ? renderGauge('MEM', item.memory) : <span className={styles.rowSub}>-</span>}
        </div>

        {/* Col 5: Disk or Network */}
        <div className={styles.metricSlot}>
           {item.disk !== undefined ? renderGauge('DISK', item.disk) : 
            (item.bandwidthIn ? <span className={styles.rowSub}>{item.bandwidthIn} / {item.bandwidthOut}</span> : <span className={styles.rowSub}>-</span>)
           }
        </div>

        {/* Col 6: Actions (Monitor Link + Expand) */}
        <div className={styles.rowAction}>
           <div 
             className={`${styles.actionBtn} ${styles.dashboardBtn}`}
             onClick={(e) => {
                e.stopPropagation();
                handleDetailClick(e);
             }}
             title="View Full Analytics"
           >
              <Icon icon="mdi:monitor-dashboard" width={16} height={16} />
           </div>
           <div className={styles.chevron}>
              <Icon icon="mdi:chevron-down" width={18} height={18} />
           </div>
        </div>
      </div>

      {/* Expanded Details Panel - Structured Layout */}
      {isExpanded && (
        <div className={styles.rowDetails}>
           <div className={styles.detailsContentWrapper}>
             
             {/* Section 1: System Info */}
             <div className={styles.detailSection}>
                <h4 className={styles.sectionTitle}>System Information</h4>
                <div className={styles.detailsGrid}>
                    <DetailCard label="Device Type" value={item.type || 'Unknown'} icon="mdi:devices" />
                    <DetailCard label="IP Address" value={item.ip || '192.168.1.10'} icon="mdi:ip-network" />
                    <DetailCard label="Location" value="Data Center A" icon="mdi:map-marker" />
                    <DetailCard label="Uptime" value={item.uptime || '12d 4h'} icon="mdi:clock-outline" />
                </div>
             </div>

             {/* Section 2: Performance & Resources */}
             <div className={styles.detailSection}>
                <h4 className={styles.sectionTitle}>Performance Metrics</h4>
                <div className={styles.detailsGrid}>
                    {item.disk !== undefined && (
                      <DetailCard label="Disk Usage" value={`${item.disk}%`} icon="mdi:harddisk" 
                          subValue={<div style={{height:4, width:'100%', background:'var(--color-bg-tertiary)', borderRadius:2, marginTop:4}}>
                             <div style={{width:`${item.disk}%`, background: getProgressBarColor(item.disk), height:'100%', borderRadius:2}}/>
                          </div>}
                      />
                    )}
                    <DetailCard label="Network Traffic" value="1.2 GB/s" icon="mdi:access-point-network" subValue="In: 800MB | Out: 400MB" />
                    {/* Placeholder for more specific metrics */}
                </div>
             </div>

             {/* Section 3: Status & Groups */}
             <div className={styles.detailSection}>
                <h4 className={styles.sectionTitle}>Status & Groups</h4>
                <div className={styles.detailsGrid}>
                    <div className={styles.detailCard}>
                        <span className={styles.detailLabel}>Tags & Groups</span>
                        <div className={styles.tagsContainer} style={{marginTop:8}}>
                          {item.tags && item.tags.map(tag => <span key={tag} className={styles.tagPill}>{tag}</span>)}
                          {item.group && item.group.map(g => <span key={g} className={styles.tagPill} style={{borderColor: '#0ea5e9', color:'#0ea5e9'}}>{g}</span>)}
                          {!item.tags && !item.group && <span className={styles.rowSub}>No tags assigned</span>}
                        </div>
                    </div>
                </div>
             </div>
           
           </div>

           {/* Action Button - Removed to save space */}
        </div>
      )}
    </div>
  );
};


// Main Component
export const DetailsView = ({ category, config, data, getProgressBarColor }) => {
  // Allow multiple rows to be expanded independently. Default: First row open.
  const [expandedIds, setExpandedIds] = useState(() => {
    const initial = new Set();
    if (data && data.length > 0) {
      initial.add(data[0].id !== undefined ? data[0].id : 0);
    }
    return initial;
  });

  const toggleRow = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={styles.detailsView}>
      <div className={styles.detailsHeader}>
        <h2 className={styles.detailsTitle}>
          <Icon
            icon={config.icon}
            width={24}
            height={24}
            style={{ color: config.color }}
          />
          {category} - Details View
        </h2>
        {/* Quick Filter Stats */}
        <div className={styles.detailsStats}>
          <span className={styles.statBadge}>
            <Icon icon="mdi:check-circle" width={16} height={16} />
            {data.filter((d) => d.status === 'Up').length} Up
          </span>
          <span className={styles.statBadge}>
            <Icon icon="mdi:alert-circle" width={16} height={16} />
            {data.filter((d) => d.status === 'Down').length} Down
          </span>
          <span className={styles.statBadge}>
            <Icon icon="mdi:database" width={16} height={16} />
            {data.length} Total
          </span>
        </div>
      </div>

      {/* Unified Table Container */}
      <div className={styles.listContainer}>
         
         {/* Table Header Row */}
         <div className={styles.tableHeaderRow}>
             <span>Identity</span>
             <span>Status</span>
             <span>CPU Load</span>
             <span>Memory</span>
             <span>Disk / Network</span>
             <span></span>
         </div>

         {/* Scrollable List Body */}
         <div style={{flex:1}}>
             {data.map((item, idx) => {
                 const rowId = item.id !== undefined ? item.id : idx;
                 return (
                   <AccordionRow 
                      key={rowId} 
                      item={item} 
                      category={category} 
                      isExpanded={expandedIds.has(rowId)}
                      onToggle={() => toggleRow(rowId)}
                      getProgressBarColor={getProgressBarColor}
                      config={config}
                   />
                 );
             })}
         </div>
      
         {/* Integrated Pagination Footer */}
         <div className={styles.pagination}>
            {/* Left: Navigation Buttons */}
            <div className={styles.paginationLeft}>
              <button className={styles.paginationBtn}>«</button>
              <button className={styles.paginationBtn}>‹</button>
              <button className={`${styles.paginationBtn} ${styles.paginationBtnActive}`}>1</button>
              <button className={styles.paginationBtn}>2</button>
              <button className={styles.paginationBtn}>3</button>
              <button className={styles.paginationBtn}>›</button>
              <button className={styles.paginationBtn}>»</button>
            </div>

            {/* Right: Info & Controls */}
            <div className={styles.paginationRight}>
                <SelectComponent
                  className={styles.paginationSelect}
                  value={50}
                  onChange={() => {}}
                  options={[
                    { value: 50, label: '50' },
                    { value: 100, label: '100' },
                  ]}
                  placeholder="50"
                />
                <span className={styles.paginationCount}>
                  1 - {data.length} of {data.length} items
                </span>
            </div>
         </div>
      </div>
    </div>
  );
};
