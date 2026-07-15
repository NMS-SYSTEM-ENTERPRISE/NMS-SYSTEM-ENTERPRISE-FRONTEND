import styles from '@/screens/network-monitoring/detail/styles.module.css';
import { useEffect, useRef, useState } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiSearch,
  FiServer,
  FiTrash2,
  FiXCircle,
} from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const NetworkInterface = ({ data }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [tooltipContent, setTooltipContent] = useState(null);
  const tooltipRef = useRef(null);

  // Initialize and update tooltips when component updates
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Ensure tooltips are properly initialized and updated
      const timer = setTimeout(() => {
        const tooltipElements = document.querySelectorAll(
          '[data-tooltip-id="port-info-tooltip"]'
        );
        if (tooltipElements.length > 0) {
          // Trigger tooltip update
          tooltipElements.forEach((el) => {
            el.dispatchEvent(new Event('mouseenter'));
          });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [data, searchQuery, statusFilter]);

  const handleSearch = () => setSearchQuery(searchInput);
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };
  const clearSearch = () => {
    setSearchInput('');
    setSearchQuery('');
  };

  // Handle port hover to show rich tooltip
  const handlePortHover = (portData, port) => {
    const content = `
      <div style="min-width: 200px; font-size: 12px; line-height: 1.6;">
        <div style="font-weight: bold; margin-bottom: 8px; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 6px; color: #fff;">
          Port Information
        </div>
        <div style="margin: 6px 0;">
          <span style="color: #9ca3af; min-width: 50px; display: inline-block;">Port:</span>
          <span style="color: #fff; font-weight: 500;">${portData.description || `Port ${port.id}`}</span>
        </div>
        <div style="margin: 6px 0;">
          <span style="color: #9ca3af; min-width: 50px; display: inline-block;">Status:</span>
          <span style="color: ${port.status === 'up' ? '#22c55e' : '#ef4444'}; font-weight: 600;">${port.status.toUpperCase()}</span>
        </div>
        ${
          portData.ip_address
            ? `<div style="margin: 6px 0;">
          <span style="color: #9ca3af; min-width: 50px; display: inline-block;">IP:</span>
          <span style="color: #3b82f6;">${portData.ip_address}</span>
        </div>`
            : ''
        }
        ${
          portData.mac_address
            ? `<div style="margin: 6px 0;">
          <span style="color: #9ca3af; min-width: 50px; display: inline-block;">MAC:</span>
          <span style="color: #fff; font-size: 11px; font-family: monospace;">${portData.mac_address}</span>
        </div>`
            : ''
        }
        ${
          portData.port_type
            ? `<div style="margin: 6px 0;">
          <span style="color: #9ca3af; min-width: 50px; display: inline-block;">Type:</span>
          <span style="color: #fff;">${portData.port_type === '6' ? 'Ethernet' : portData.port_type}</span>
        </div>`
            : ''
        }
        ${
          portData.speed
            ? `<div style="margin: 6px 0;">
          <span style="color: #9ca3af; min-width: 50px; display: inline-block;">Speed:</span>
          <span style="color: #fff;">${portData.speed}</span>
        </div>`
            : ''
        }
        ${
          portData.in_percent || portData.out_percent
            ? `<div style="margin: 6px 0; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 6px;">
          ${
            portData.in_percent
              ? `<div style="margin: 4px 0;">
            <span style="color: #9ca3af; min-width: 50px; display: inline-block;">IN:</span>
            <span style="color: #3b82f6; font-weight: 500;">${parseFloat(portData.in_percent).toFixed(2)}%</span>
          </div>`
              : ''
          }
          ${
            portData.out_percent
              ? `<div style="margin: 4px 0;">
            <span style="color: #9ca3af; min-width: 50px; display: inline-block;">OUT:</span>
            <span style="color: #22c55e; font-weight: 500;">${parseFloat(portData.out_percent).toFixed(2)}%</span>
          </div>`
              : ''
          }
        </div>`
            : ''
        }
      </div>
    `;
    setTooltipContent(content);
  };

  const handlePortLeave = () => {
    setTooltipContent(null);
  };

  const interfaces = data?.frontend_data?.interfaces || [];

  const filteredData = interfaces.filter((item) => {
    const matchesSearch =
      (item.description || '')
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (item.ip_address || '').includes(searchQuery);
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Up' && (item.oper_status?.toLowerCase() === 'up' || item.status?.toLowerCase() === 'up')) ||
      (statusFilter === 'Down' && (item.oper_status?.toLowerCase() !== 'up' && item.status?.toLowerCase() !== 'up'));
    return matchesSearch && matchesStatus;
  });

  // Generate visual rack ports for ALL available interfaces
  const visualPorts = interfaces.map((iface, i) => {
    const isUp = iface.oper_status?.toLowerCase() === 'up' || iface.status?.toLowerCase() === 'up';
    const matchesSearch =
      (iface.description || '')
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (iface.ip_address || '').includes(searchQuery);
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Up' && isUp) ||
      (statusFilter === 'Down' && !isUp);
    return {
      id: iface.index || i,
      status: isUp ? 'up' : 'down',
      isVisible: matchesSearch && matchesStatus,
      data: iface, // Include full interface data for tooltip
    };
  });

  const chunkedPorts = [];
  for (let i = 0; i < visualPorts.length; i += 24) {
    chunkedPorts.push(visualPorts.slice(i, i + 24));
  }

  const renderEmptyBadge = (label = 'Unassigned') => (
    <span
      style={{
        background: 'rgba(255, 255, 255, 0.04)',
        color: '#6b7280',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '500',
        letterSpacing: '0.5px',
      }}
    >
      {label}
    </span>
  );

  return (
    <div className={styles.interfaceContainer}>
      <div
        id="rack-view-export"
        className={styles.rackViewContainer}
        style={{ alignItems: 'stretch' }}
      >
        <div
          className={styles.rackEars}
          style={{ height: 'auto', minHeight: '100px' }}
        >
          <div
            className={styles.rackEarHole}
            style={{ marginTop: '8px' }}
          ></div>
          <div
            className={styles.rackEarHole}
            style={{ marginBottom: '8px' }}
          ></div>
        </div>
        <div
          className={styles.rackPanel}
          style={{
            flexDirection: 'column',
            height: 'auto',
            padding: '24px',
            gap: '16px',
          }}
        >
          {chunkedPorts.map((rowPorts, rowIdx) => (
            <div
              key={rowIdx}
              className={styles.portsRow}
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              {rowPorts.map((port) => {
                const portData = port.data || {};

                return (
                  <div
                    key={port.id}
                    className={styles.portWrapper}
                    style={{
                      opacity: port.isVisible ? 1 : 0.15,
                      transition: 'opacity 0.3s ease',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                    data-tooltip-id="port-info-tooltip"
                    data-tooltip-place="top"
                    onMouseEnter={() => handlePortHover(portData, port)}
                    onMouseLeave={handlePortLeave}
                    title={`${portData.description || `Port ${port.id}`} - ${port.status.toUpperCase()}`}
                  >
                    <div
                      className={`${styles.portLed} ${port.status === 'up' ? styles.ledGreen : styles.ledRed}`}
                    ></div>
                    <div className={styles.portIcon}>
                      <div className={styles.portSocket}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          <div
            className={styles.deviceLabelBox}
            style={{ alignSelf: 'flex-end', marginTop: '8px' }}
          >
            {data?.device_ip || 'Device IP'}
          </div>
        </div>
        <div
          className={styles.rackEars}
          style={{ height: 'auto', minHeight: '100px' }}
        >
          <div
            className={styles.rackEarHole}
            style={{ marginTop: '8px' }}
          ></div>
          <div
            className={styles.rackEarHole}
            style={{ marginBottom: '8px' }}
          ></div>
        </div>
      </div>

      {/* Interface Table Section */}
      <div className={styles.tableSection}>
        <div
          className={styles.tableControls}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            borderBottom: '1px solid var(--color-border-light)',
            paddingBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', gap: '24px' }}>
            <button
              className={`${styles.tabButton} ${statusFilter === 'All' ? styles.tabButtonActive : ''}`}
              onClick={() => setStatusFilter('All')}
            >
              All
            </button>
            <button
              className={`${styles.tabButton} ${statusFilter === 'Up' ? styles.tabButtonActive : ''}`}
              onClick={() => setStatusFilter('Up')}
            >
              Up
            </button>
            <button
              className={`${styles.tabButton} ${statusFilter === 'Down' ? styles.tabButtonActive : ''}`}
              onClick={() => setStatusFilter('Down')}
            >
              Down
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {searchQuery && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  color: '#22c55e',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '12px',
                }}
              >
                Search: {searchQuery}
                <FiXCircle
                  onClick={clearSearch}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            )}

            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Search..."
                className={styles.searchInput}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {searchInput && (
                <FiXCircle
                  onClick={() => setSearchInput('')}
                  style={{
                    cursor: 'pointer',
                    color: '#9ca3af',
                    marginRight: '8px',
                  }}
                />
              )}
              <div
                onClick={handleSearch}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  borderLeft: '1px solid #374151',
                  paddingLeft: '8px',
                }}
              >
                <FiSearch className={styles.searchIcon} style={{ margin: 0 }} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.interfaceTable}>
            <thead>
              <tr>
                <th>Interface</th>
                <th>Status</th>
                {filteredData.some((r) => r.in_octets) && <th>Traffic In</th>}
                {filteredData.some((r) => r.out_octets) && <th>Traffic Out</th>}
                {filteredData.some((r) => r.port_type) && <th>Port Type</th>}
                {filteredData.some((r) => r.speed) && <th>Speed</th>}
                {filteredData.some((r) => r.in_errors != null || r.error != null) && <th>Errors</th>}
                {filteredData.some((r) => r.in_discards != null || r.discarded != null) && <th>Discarded</th>}
                {filteredData.some((r) => r.mac_address) && <th>MAC Address</th>}
                {filteredData.some((r) => r.ip_address) && <th>IP Address</th>}
                {filteredData.some((r) => r.assigned_vlan) && <th>VLAN</th>}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, idx) => {
                const operStatus = row.oper_status || row.admin_status || row.status || 'DOWN';
                const isUp = operStatus.toLowerCase() === 'up';
                const inErrors = row.in_errors != null ? row.in_errors : row.error != null ? row.error : null;
                const inDiscards = row.in_discards != null ? row.in_discards : row.discarded != null ? row.discarded : null;
                return (
                  <tr key={row.index || idx}>
                    <td className={styles.textBlue}>
                      {row.description || `Port ${row.index || idx + 1}`}
                    </td>
                    <td>
                      <div className={styles.statusCell}>
                        {isUp ? (
                          <FiCheckCircle className={styles.iconGreen} />
                        ) : (
                          <FiXCircle className={styles.iconRed} />
                        )}
                        <span className={isUp ? styles.textGreen : styles.textRed}>
                          {isUp ? 'Up' : 'Down'}
                        </span>
                      </div>
                    </td>
                    {filteredData.some((r) => r.in_octets) && (
                      <td className={styles.textWhite} style={{ fontSize: '12px' }}>
                        {row.in_octets || '—'}
                      </td>
                    )}
                    {filteredData.some((r) => r.out_octets) && (
                      <td className={styles.textWhite} style={{ fontSize: '12px' }}>
                        {row.out_octets || '—'}
                      </td>
                    )}
                    {filteredData.some((r) => r.port_type) && (
                      <td className={styles.textWhite}>
                        {row.port_type === '6' ? 'Ethernet' : row.port_type === '1' ? 'Other' : row.port_type || '—'}
                      </td>
                    )}
                    {filteredData.some((r) => r.speed) && (
                      <td className={styles.textWhite}>{row.speed || '—'}</td>
                    )}
                    {filteredData.some((r) => r.in_errors != null || r.error != null) && (
                      <td className={styles.textWhite}>{inErrors !== null ? inErrors : '—'}</td>
                    )}
                    {filteredData.some((r) => r.in_discards != null || r.discarded != null) && (
                      <td className={styles.textWhite}>{inDiscards !== null ? inDiscards : '—'}</td>
                    )}
                    {filteredData.some((r) => r.mac_address) && (
                      <td className={styles.textWhite} style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                        {row.mac_address || '—'}
                      </td>
                    )}
                    {filteredData.some((r) => r.ip_address) && (
                      <td className={styles.textBlue}>{row.ip_address || '—'}</td>
                    )}
                    {filteredData.some((r) => r.assigned_vlan) && (
                      <td className={styles.textWhite}>{row.assigned_vlan || '—'}</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Tooltip
        id="port-info-tooltip"
        ref={tooltipRef}
        className={styles.tooltip}
        variant="dark"
        place="top"
        clickable={false}
        positionStrategy="fixed"
        opacity={1}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 32px rgba(0, 0, 0, 0.5)',
          zIndex: 10000,
          maxWidth: '320px',
          whiteSpace: 'normal',
          wordWrap: 'break-word',
          lineHeight: '1.6',
          fontFamily: 'inherit',
        }}
        offset={8}
        noArrow={false}
        delayShow={0}
        render={({ content, activeAnchor }) => {
          if (tooltipContent && activeAnchor) {
            return <div dangerouslySetInnerHTML={{ __html: tooltipContent }} />;
          }
          return null;
        }}
      />
    </div>
  );
};

export default NetworkInterface;
