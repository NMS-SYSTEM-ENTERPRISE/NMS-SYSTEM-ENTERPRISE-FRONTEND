'use client';
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
    {subValue && (
      <span className={styles.rowSub} style={{ fontSize: '11px' }}>
        {subValue}
      </span>
    )}
  </div>
);

const AccordionRow = ({
  item,
  category,
  isExpanded,
  onToggle,
  getProgressBarColor,
  config,
}) => {
  const router = useRouter();

  const handleDetailClick = (e) => {
    e.stopPropagation();
    let urlCategory = category;
    if (category === 'Server & Apps') {
      urlCategory = 'ServerApps';
    }
    const path = ROUTE_PATHS.NET_WORK_MONITORING_DETAIL.replace(
      ':category',
      encodeURIComponent(urlCategory)
    ).replace(':deviceId', encodeURIComponent(item.ip));
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
  };

  const getAvatarColor = (name) => {
    if (!name) return '#3b82f6';
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    // Return a muted, softer unique color with reduced saturation
    return `hsl(${hue}, 55%, 70%)`;
  };

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
      <div
        className={styles.compactMetric}
        style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: '0' }}
      >
        <div
          style={{
            width: size,
            height: size,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width={size}
            height={size}
            style={{ transform: 'rotate(-90deg)' }}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={strokeWidth}
            />
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
            />
          </svg>
          <span
            style={{
              position: 'absolute',
              fontSize: '12px',
              fontWeight: '700',
              color: '#fff',
            }}
          >
            {value}
          </span>
        </div>
      </div>
    );
  };

  const renderMiniBar = (
    label,
    value,
    max = 300,
    color = 'var(--color-accent-cyan)'
  ) => {
    const percent = Math.min((value / max) * 100, 100);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: '4px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: 'var(--color-text-secondary)',
          }}
        >
          <span>{label}</span>
          <span style={{ color: 'var(--color-text-primary)' }}>{value}V</span>
        </div>
        <div
          style={{
            height: '4px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${percent}%`,
              background: color,
              borderRadius: '2px',
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.accordionRow} data-expanded={isExpanded}>
      {/* 
         Table Grid Row 
         Columns: Identity | Type | IP | Status | Metric1 | Metric2 | Metric3 | Action 
      */}
      <div
        className={styles.rowMain}
        onClick={onToggle}
        style={{ cursor: 'pointer' }}
      >
        {/* Col 1: Identity */}
        <div
          className={styles.rowIdentity}
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <div
            className={styles.rowIconWrapper}
            style={{
              backgroundColor: `color-mix(in srgb, ${getAvatarColor(item.name)} 20%, transparent)`,
              border: `1px solid color-mix(in srgb, ${getAvatarColor(item.name)} 40%, transparent)`,
              borderRadius: '8px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                color: getAvatarColor(item.name),
                fontWeight: 'bold',
                fontSize: '14px',
                letterSpacing: '0.5px',
              }}
            >
              {item.name ? item.name.substring(0, 2).toUpperCase() : 'NA'}
            </span>
          </div>
          <div
            className={styles.rowInfo}
            style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
          >
            <span
              className={styles.rowName}
              style={{
                fontWeight: '600',
                color: 'var(--color-text-primary)',
                fontSize: '14px',
              }}
            >
              {item.name}
            </span>
          </div>
        </div>

        {/* Col 2: Type */}
        <div
          className={styles.rowType}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div
            style={{
              color: getIconColor(),
              background: 'var(--color-bg-tertiary)',
              border: '1px solid var(--color-border)',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
            }}
            title={item.type || category}
          >
            <Icon icon={getIcon()} width={18} height={18} />
          </div>
        </div>

        {/* Col 3: IP */}
        <div
          className={styles.rowIp}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <span
            className={styles.rowSub}
            style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}
          >
            {item.ip}
          </span>
        </div>

        {/* Col 4: Status */}
        <div className={styles.rowStatus}>
          <span
            className={`${styles.statusBadge} ${item.status === 'Up' ? styles.statusBadgeUp : styles.statusBadgeDown}`}
          >
            {item.status}
          </span>
        </div>

        {/* Col 3: CPU or Battery or Uptime */}
        <div className={styles.metricSlot}>
          {category === 'UPS' ? (
            item.upsMetrics &&
              item.upsMetrics.battery_charge_percent !== undefined ? (
              renderGauge('BATT', item.upsMetrics.battery_charge_percent)
            ) : item.battery !== undefined ? (
              renderGauge('BATT', item.battery)
            ) : (
              <span className={styles.rowSub}>-</span>
            )
          ) : category === 'CCTV' ? (
            <span className={styles.rowSub} style={{ fontSize: '13px', color: 'var(--color-text-primary)', fontWeight: 600 }}>
              {item.uptime || '-'}
            </span>
          ) : item.cpu !== undefined ? (
            renderGauge('CPU', item.cpu)
          ) : (
            <span className={styles.rowSub}>-</span>
          )}
        </div>

        {/* Col 4: Memory or Load or Latency */}
        <div className={styles.metricSlot}>
          {category === 'UPS' ? (
            item.upsMetrics &&
              item.upsMetrics.output_load_percent !== undefined ? (
              renderGauge('LOAD', item.upsMetrics.output_load_percent)
            ) : item.load !== undefined ? (
              renderGauge('LOAD', item.load)
            ) : (
              <span className={styles.rowSub}>-</span>
            )
          ) : category === 'CCTV' ? (
            <span className={styles.rowSub} style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>{item.latency !== undefined ? `${item.latency} ms` : '-'}</strong>
            </span>
          ) : item.memory !== undefined ? (
            renderGauge('MEM', item.memory)
          ) : (
            <span className={styles.rowSub}>-</span>
          )}
        </div>

        {/* Col 5: Disk/Network or Voltage or Bandwidth */}
        <div className={styles.metricSlot}>
          {category === 'UPS' ? (
            item.upsMetrics &&
              item.upsMetrics.input_voltage !== undefined &&
              item.upsMetrics.output_voltage !== undefined ? (
              <span
                className={styles.rowSub}
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <strong style={{ color: 'var(--color-text-primary)' }}>
                  {item.upsMetrics.input_voltage}V
                </strong>{' '}
                /{' '}
                <strong style={{ color: 'var(--color-text-primary)' }}>
                  {item.upsMetrics.output_voltage}V
                </strong>
              </span>
            ) : (
              <span className={styles.rowSub}>-</span>
            )
          ) : category === 'CCTV' || item.bandwidthIn ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                fontSize: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981' }}>
                <Icon icon="mdi:arrow-down-thick" width={14} height={14} />
                <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{item.bandwidthIn || '0 Mbps'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3b82f6' }}>
                <Icon icon="mdi:arrow-up-thick" width={14} height={14} />
                <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{item.bandwidthOut || '0 Mbps'}</span>
              </div>
            </div>
          ) : item.disk !== undefined ? (
            renderGauge('DISK', item.disk)
          ) : (
            <span className={styles.rowSub}>-</span>
          )}
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
          <button
            type="button"
            className={styles.chevron}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
            aria-expanded={isExpanded}
          >
            <Icon icon="mdi:chevron-down" width={18} height={18} />
          </button>
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
                <DetailCard
                  label="Device Type"
                  value={item.type || 'N/A'}
                  icon="mdi:devices"
                />
                <DetailCard
                  label="IP Address"
                  value={item.ip || 'N/A'}
                  icon="mdi:ip-network"
                />
                <DetailCard
                  label="Uptime"
                  value={item.uptime || 'N/A'}
                  icon="mdi:clock-outline"
                />
              </div>
              {item.description && (
                <div
                  style={{
                    marginTop: '12px',
                    padding: '12px',
                    background: 'var(--color-bg-tertiary)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    Hardware Description
                  </span>
                  {item.description}
                </div>
              )}
            </div>

            {/* Section 1.5: CCTV Details (Only shown for CCTV devices) */}
            {item.cctvMetrics && (
              <div className={styles.detailSection}>
                <h4 className={styles.sectionTitle}>CCTV Information</h4>
                <div className={styles.detailsGrid}>
                  <DetailCard
                    label="Camera Model"
                    value={item.cctvMetrics.model || 'N/A'}
                    icon="mdi:cctv"
                  />
                  <DetailCard
                    label="Vendor"
                    value={item.cctvMetrics.vendor || 'N/A'}
                    icon="mdi:domain"
                  />
                  <DetailCard
                    label="Camera Type"
                    value={item.cctvMetrics.type || 'N/A'}
                    icon="mdi:shape"
                  />
                  <DetailCard
                    label="Serial Number"
                    value={item.cctvMetrics.serial_number || 'N/A'}
                    icon="mdi:barcode"
                  />
                </div>
                {item.cctvMetrics.firmware && (
                  <div
                    style={{
                      marginTop: '12px',
                      padding: '12px',
                      background: 'var(--color-bg-tertiary)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: 'var(--color-text-secondary)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    >
                      Firmware & Build Data
                    </span>
                    {item.cctvMetrics.firmware}
                  </div>
                )}
              </div>
            )}

            {/* Section 2: Performance & Resources */}
            {(item.disk !== undefined || item.bandwidthIn || item.bandwidthOut) && (
              <div className={styles.detailSection}>
                <h4 className={styles.sectionTitle}>Performance Metrics</h4>
                <div className={styles.detailsGrid}>
                  {item.disk !== undefined && (
                    <DetailCard
                      label="Disk Usage"
                      value={`${item.disk}%`}
                      icon="mdi:harddisk"
                      subValue={
                        <div
                          style={{
                            height: 4,
                            width: '100%',
                            background: 'var(--color-bg-tertiary)',
                            borderRadius: 2,
                            marginTop: 4,
                          }}
                        >
                          <div
                            style={{
                              width: `${item.disk}%`,
                              background: getProgressBarColor(item.disk),
                              height: '100%',
                              borderRadius: 2,
                            }}
                          />
                        </div>
                      }
                    />
                  )}
                  {(item.bandwidthIn || item.bandwidthOut) && (
                    <DetailCard
                      label="Network Traffic"
                      value={item.bandwidthIn ? item.bandwidthIn : item.bandwidthOut}
                      icon="mdi:access-point-network"
                      subValue={`In: ${item.bandwidthIn || '0 Mbps'} | Out: ${item.bandwidthOut || '0 Mbps'}`}
                    />
                  )}
                  {/* Placeholder for more specific metrics */}
                </div>
              </div>
            )}

            {/* Section 3: Status & Groups */}
            <div className={styles.detailSection}>
              <h4 className={styles.sectionTitle}>Status & Groups</h4>
              <div className={styles.detailsGrid}>
                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>Tags & Groups</span>
                  <div
                    className={styles.tagsContainer}
                    style={{ marginTop: 8 }}
                  >
                    {item.tags &&
                      item.tags.map((tag) => (
                        <span key={tag} className={styles.tagPill}>
                          {tag}
                        </span>
                      ))}
                    {item.group &&
                      item.group.map((g) => (
                        <span
                          key={g}
                          className={styles.tagPill}
                          style={{ borderColor: '#0ea5e9', color: '#0ea5e9' }}
                        >
                          {g}
                        </span>
                      ))}
                    {!item.tags && !item.group && (
                      <span className={styles.rowSub}>No tags assigned</span>
                    )}
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
export const DetailsView = ({
  category,
  config,
  data,
  getProgressBarColor,
  metadata,
  filters,
  setFilters,
}) => {
  // Server-Side Pagination Logic
  const total = metadata?.total !== undefined ? metadata.total : data.length;
  const limit = metadata?.limit !== undefined ? metadata.limit : (filters?.limit || 100);
  const skip = metadata?.skip !== undefined ? metadata.skip : (filters?.skip || 0);

  const currentPage = metadata?.current_page || Math.floor(skip / limit) + 1;
  const totalPages = metadata?.pages || Math.ceil(total / limit) || 1;
  const startIndex = skip;

  // Data is already paginated by backend
  const paginatedData = data;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const newSkip = (newPage - 1) * limit;
      setFilters((prev) => ({ ...prev, skip: newSkip }));
    }
  };

  const handleLimitChange = (e) => {
    const val = e?.target?.value !== undefined ? e.target.value : e;
    setFilters((prev) => ({ ...prev, limit: Number(val), skip: 0 }));
  };

  // Ensure accordions are closed by default
  const [expandedIds, setExpandedIds] = useState(() => new Set());

  const toggleRow = (id) => {
    setExpandedIds((prev) => {
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
          <button
            className={`${styles.statBadge} ${styles.statBadgeUp} ${filters?.status === 'UP' ? styles.statBadgeActive : ''}`}
            onClick={() => setFilters(prev => ({ ...prev, status: 'UP', skip: 0 }))}
          >
            <Icon icon="mdi:check-circle" width={16} height={16} />
            {data.filter((d) => d.status === 'Up').length} Up
          </button>
          <button
            className={`${styles.statBadge} ${styles.statBadgeDown} ${filters?.status === 'DOWN' ? styles.statBadgeActive : ''}`}
            onClick={() => setFilters(prev => ({ ...prev, status: 'DOWN', skip: 0 }))}
          >
            <Icon icon="mdi:alert-circle" width={16} height={16} />
            {data.filter((d) => d.status === 'Down').length} Down
          </button>
          <button
            className={`${styles.statBadge} ${styles.statBadgeTotal} ${!filters?.status ? styles.statBadgeActive : ''}`}
            onClick={() => setFilters(prev => ({ ...prev, status: undefined, skip: 0 }))}
          >
            <Icon icon="mdi:database" width={16} height={16} />
            {data.length} Total
          </button>
        </div>
      </div>

      {/* Unified Table Container */}
      <div className={styles.listContainer}>
        {/* Table Header Row */}
        <div className={styles.tableHeaderRow}>
          <span>Identity</span>
          <span>Type</span>
          <span>IP Address</span>
          <span>Status</span>
          {category === 'UPS' ? (
            <>
              <span>Battery Level</span>
              <span>Load Capacity</span>
              <span>Voltage (In / Out)</span>
            </>
          ) : category === 'CCTV' ? (
            <>
              <span>Uptime</span>
              <span>Latency</span>
              <span>Bandwidth (In / Out)</span>
            </>
          ) : (
            <>
              <span>CPU Load</span>
              <span>Memory</span>
              <span>Disk / Network</span>
            </>
          )}
          <span></span>
        </div>

        {/* Scrollable List Body */}
        <div
          className={styles.listBody}
          style={{ flex: 1, overflowY: 'auto', paddingBottom: '16px' }}
        >
          {paginatedData.map((item, idx) => {
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
          {paginatedData.length === 0 && (
            <div
              style={{
                padding: '32px',
                textAlign: 'center',
                color: 'var(--color-text-secondary)',
              }}
            >
              No items found matching the current filters.
            </div>
          )}
        </div>

        {/* Integrated Pagination Footer */}
        <div className={styles.pagination}>
          {/* Left: Navigation Buttons */}
          <div className={styles.paginationLeft}>
            <button
              className={styles.paginationBtn}
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            <button
              className={styles.paginationBtn}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹
            </button>

            <span
              style={{
                fontSize: '13px',
                margin: '0 8px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Page {currentPage} of {totalPages}
            </span>

            <button
              className={styles.paginationBtn}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
            <button
              className={styles.paginationBtn}
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>

          {/* Right: Info & Controls */}
          <div className={styles.paginationRight}>
            <SelectComponent
              className={styles.paginationSelect}
              value={limit}
              onChange={handleLimitChange}
              options={[
                { value: 10, label: '10 / page' },
                { value: 50, label: '50 / page' },
                { value: 100, label: '100 / page' },
              ]}
            />
            <span className={styles.paginationCount}>
              {total === 0 ? 0 : startIndex + 1} -{' '}
              {Math.min(startIndex + paginatedData.length, total)} of{' '}
              {total} items
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
