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
    const path = ROUTE_PATHS.NET_WORK_MONITORING_DETAIL.replace(
      ':category',
      encodeURIComponent(category)
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
        onClick={handleDetailClick}
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

        {/* Col 3: CPU or Battery */}
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
          ) : item.cpu !== undefined ? (
            renderGauge('CPU', item.cpu)
          ) : (
            <span className={styles.rowSub}>-</span>
          )}
        </div>

        {/* Col 4: Memory or Load */}
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
          ) : item.memory !== undefined ? (
            renderGauge('MEM', item.memory)
          ) : (
            <span className={styles.rowSub}>-</span>
          )}
        </div>

        {/* Col 5: Disk/Network or Voltage/Chart */}
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
          ) : item.disk !== undefined ? (
            renderGauge('DISK', item.disk)
          ) : item.bandwidthIn ? (
            <span
              className={styles.rowSub}
              style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}
            >
              <strong style={{ color: 'var(--color-text-primary)' }}>
                {item.bandwidthIn}
              </strong>{' '}
              /{' '}
              <strong style={{ color: 'var(--color-text-primary)' }}>
                {item.bandwidthOut}
              </strong>
            </span>
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
                <DetailCard
                  label="Device Type"
                  value={item.type || 'Unknown'}
                  icon="mdi:devices"
                />
                <DetailCard
                  label="IP Address"
                  value={item.ip || '192.168.1.10'}
                  icon="mdi:ip-network"
                />
                <DetailCard
                  label="Location"
                  value="Data Center A"
                  icon="mdi:map-marker"
                />
                <DetailCard
                  label="Uptime"
                  value={item.uptime || '12d 4h'}
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

            {/* Section 2: Performance & Resources */}
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
                <DetailCard
                  label="Network Traffic"
                  value="1.2 GB/s"
                  icon="mdi:access-point-network"
                  subValue="In: 800MB | Out: 400MB"
                />
                {/* Placeholder for more specific metrics */}
              </div>
            </div>

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
  filters = {},
  setFilters,
  searchQuery,
  setSearchQuery,
}) => {
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  // Pagination Logic
  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
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

  const removeFilter = (key) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({});
    if (setSearchQuery) setSearchQuery('');
  };

  const hasActiveFilters = Object.keys(filters).length > 0 || !!searchQuery;

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
          <span className={`${styles.statBadge} ${styles.statBadgeUp}`}>
            <Icon icon="mdi:check-circle" width={16} height={16} />
            {data.filter((d) => d.status === 'Up').length} Up
          </span>
          <span className={`${styles.statBadge} ${styles.statBadgeDown}`}>
            <Icon icon="mdi:alert-circle" width={16} height={16} />
            {data.filter((d) => d.status === 'Down').length} Down
          </span>
          <span className={`${styles.statBadge} ${styles.statBadgeTotal}`}>
            <Icon icon="mdi:database" width={16} height={16} />
            {data.length} Total
          </span>
        </div>
      </div>

      {/* Active Filters Row */}
      {hasActiveFilters && (
        <div className={styles.activeFiltersRow}>
          <span className={styles.activeFiltersLabel}>Active Filters:</span>
          <div className={styles.filterTagsList}>
            {searchQuery && (
              <div className={styles.filterTag}>
                <span>Search: {searchQuery}</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className={styles.filterTagClose}
                >
                  <Icon icon="mdi:close" width={14} />
                </button>
              </div>
            )}
            {Object.entries(filters).map(([key, value]) => {
              if (value === undefined || value === '') return null;
              // format label, e.g., if array for range
              let displayValue = Array.isArray(value)
                ? `${value[0]} - ${value[1]}`
                : value;
              return (
                <div key={key} className={styles.filterTag}>
                  <span style={{ textTransform: 'capitalize' }}>
                    {key}: {displayValue}
                  </span>
                  <button
                    onClick={() => removeFilter(key)}
                    className={styles.filterTagClose}
                  >
                    <Icon icon="mdi:close" width={14} />
                  </button>
                </div>
              );
            })}
          </div>
          <button onClick={clearAllFilters} className={styles.clearFiltersBtn}>
            Clear All
          </button>
        </div>
      )}

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
              value={itemsPerPage}
              onChange={(val) => {
                setItemsPerPage(val);
                setCurrentPage(1);
              }}
              options={[
                { value: 10, label: '10 / page' },
                { value: 50, label: '50 / page' },
                { value: 100, label: '100 / page' },
              ]}
            />
            <span className={styles.paginationCount}>
              {data.length === 0 ? 0 : startIndex + 1} -{' '}
              {Math.min(startIndex + itemsPerPage, data.length)} of{' '}
              {data.length} items
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
