import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

import { getFlowExplorer } from '@/networking/network-monitoring/network-monitoring-apis';
import { useFlow } from '@/hooks/flow';
import { FlowViewSkeleton } from '@/components/ui/skeleton-loaders/flow-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';

export const FlowExplorer = () => {
  const { selectedEventSource, selectedInterface } = useFlow();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    filters: true,
    topology: true,
    results: true
  });
  const [explorerData, setExplorerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [localFilters, setLocalFilters] = useState({
    sourceIp: '',
    destIp: '',
    protocol: '',
    port: ''
  });

  const [activeFilters, setActiveFilters] = useState({
    sourceIp: '',
    destIp: '',
    protocol: '',
    port: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil((explorerData?.streams?.length || 0) / itemsPerPage);
  const paginatedStreams = explorerData?.streams?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const params = {
          eventSource: selectedEventSource,
          interface: selectedInterface,
          ...activeFilters
        };
        const data = await getFlowExplorer(params);
        setExplorerData(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Failed to fetch flow explorer data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedEventSource, selectedInterface, activeFilters]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (isLoading) {
    return <FlowViewSkeleton />;
  }

  if (!explorerData) {
    return (
      <div style={{ padding: '40px' }}>
        <NoDataFound
          title="Explorer Data Unavailable"
          description="Unable to load flow explorer topology and results for the selected query."
          icon="mdi:database-search-outline"
        />
      </div>
    );
  }

  return (
    <div className={styles.explorer}>
      <div className={styles.accordionContainer}>
        {/* Section 1: Advanced Exploration Filters */}
        <div className={styles.accordion}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('filters')}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper}>
                <Icon icon="mdi:filter-variant" width={20} />
              </div>
              <span className={styles.headerTitle}>Exploration Filters <span className={styles.badge}>QUERY</span></span>
            </div>
            <Icon icon="mdi:chevron-down" className={`${styles.chevron} ${expandedSections.filters ? styles.chevronOpen : ''}`} />
          </div>
          {expandedSections.filters && (
            <div className={styles.accordionContent}>
              <div className={styles.filterWorkspace}>
                <div className={styles.filterGrid}>
                  <div className={styles.filterField}>
                    <label>SOURCE IP / SUBNET</label>
                    <div className={styles.inputWrap}>
                      <Input type="text" placeholder="e.g. 192.168.1.0/24" icon={<Icon icon="mdi:ip-network" />} value={localFilters.sourceIp} onChange={e => setLocalFilters(prev => ({ ...prev, sourceIp: e.target.value }))} />
                    </div>
                  </div>
                  <div className={styles.filterField}>
                    <label>DESTINATION IP</label>
                    <div className={styles.inputWrap}>
                      <Input type="text" placeholder="e.g. 8.8.8.8" icon={<Icon icon="mdi:map-marker-radius" />} value={localFilters.destIp} onChange={e => setLocalFilters(prev => ({ ...prev, destIp: e.target.value }))} />
                    </div>
                  </div>
                  <div className={styles.filterField}>
                    <label>PROTOCOL / APP</label>
                    <div className={styles.inputWrap}>
                      <SelectComponent
                        value={localFilters.protocol}
                        onChange={e => setLocalFilters(prev => ({ ...prev, protocol: e.target.value }))}
                        options={[
                          { value: '', label: 'All Protocols' },
                          { value: 'TCP', label: 'TCP' },
                          { value: 'UDP', label: 'UDP' },
                          { value: 'ICMP', label: 'ICMP' }
                        ]}
                      />
                    </div>
                  </div>
                  <div className={styles.filterField}>
                    <label>PORT</label>
                    <div className={styles.inputWrap}>
                      <Input type="text" placeholder="e.g. 443" icon={<Icon icon="mdi:door-open" />} value={localFilters.port} onChange={e => setLocalFilters(prev => ({ ...prev, port: e.target.value }))} />
                    </div>
                  </div>
                </div>
                <div className={styles.filterActions}>
                  <Button variant="ghost" className={styles.clearBtn} onClick={() => {
                    const empty = { sourceIp: '', destIp: '', protocol: '', port: '' };
                    setLocalFilters(empty);
                    setActiveFilters(empty);
                  }}>Clear All</Button>
                  <Button className={styles.applyBtn} onClick={() => setActiveFilters(localFilters)}>
                    <Icon icon="mdi:play-circle-outline" width={18} /> Run Query
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Flow Architecture Sketch */}
        <div className={styles.accordion}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('topology')}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper}>
                <Icon icon="mdi:drawing" width={20} />
              </div>
              <span className={styles.headerTitle}>Flow Journey Sketch <span className={styles.badge}>BLUEPRINT</span></span>
            </div>
            <Icon icon="mdi:chevron-down" className={`${styles.chevron} ${expandedSections.topology ? styles.chevronOpen : ''}`} />
          </div>
          {expandedSections.topology && (
            <div className={styles.accordionContent}>
              <div className={styles.sketchContainer}>
                {/* Horizontal Flow Schema */}
                <div className={styles.sketchCanvas}>
                  {/* Column 1: Sources */}
                  <div className={styles.sketchColumn}>
                    <div className={styles.columnLabel}>SOURCES</div>
                    {explorerData.sources.map((node, i) => (
                      <div key={i} className={styles.nodeItem}>
                        <div className={styles.nodeIconWrap} style={{ borderColor: node.color }}>
                          <Icon icon={node.icon} width={22} color={node.color} />
                        </div>
                        <div className={styles.nodeDetails}>
                          <span className={styles.nodeIp}>{node.ip}</span>
                          <span className={styles.nodeTag}>{node.tag}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Connecting Lines Area (Abstract SVG) */}
                  <div className={styles.flowLinesArea}>
                    <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                          <stop offset="50%" stopColor="#c084fc" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.2" />
                        </linearGradient>
                      </defs>
                      {explorerData.sources.map((_, i) =>
                        explorerData.services.map((_, j) => {
                          const startY = ((i + 0.5) / Math.max(1, explorerData.sources.length)) * 200;
                          const endY = ((j + 0.5) / Math.max(1, explorerData.services.length)) * 200;
                          const pathStr = `M 0 ${startY} C 100 ${startY}, 100 ${endY}, 200 ${endY}`;
                          return (
                            <g key={`s2s-${i}-${j}`}>
                              <path d={pathStr} stroke="url(#flowGrad)" strokeWidth="2" fill="none" className={styles.animatedPath} />
                              <circle r="3" fill="#22d3ee">
                                <animateMotion dur={`${1.5 + Math.random()}s`} repeatCount="indefinite" path={pathStr} />
                              </circle>
                            </g>
                          );
                        })
                      )}
                    </svg>
                  </div>

                  {/* Column 2: Protocols/Apps */}
                  <div className={styles.sketchColumn}>
                    <div className={styles.columnLabel}>SERVICES</div>
                    {explorerData.services.map((svc, i) => (
                      <div key={i} className={styles.centralNode}>
                        <div className={styles.serviceDisc}>
                          <Icon icon={svc.icon} width={32} color={svc.color} />
                          <span className={styles.serviceName}>{svc.name}</span>
                        </div>
                        <div className={styles.serviceStats}>
                          <span className={styles.serviceStat}>{svc.total_volume} TOTAL</span>
                          <span className={styles.serviceStat}>{svc.sessions} SESSIONS</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Connecting Lines Area */}
                  <div className={styles.flowLinesArea}>
                    <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="none">
                      {explorerData.services.map((_, i) =>
                        explorerData.destinations.map((_, j) => {
                          const startY = ((i + 0.5) / Math.max(1, explorerData.services.length)) * 200;
                          const endY = ((j + 0.5) / Math.max(1, explorerData.destinations.length)) * 200;
                          const pathStr = `M 0 ${startY} C 100 ${startY}, 100 ${endY}, 200 ${endY}`;
                          return (
                            <g key={`svc2d-${i}-${j}`}>
                              <path d={pathStr} stroke="url(#flowGrad)" strokeWidth="2" fill="none" className={styles.animatedPath} />
                              <circle r="3" fill="#f43f5e">
                                <animateMotion dur={`${1.5 + Math.random()}s`} repeatCount="indefinite" path={pathStr} />
                              </circle>
                            </g>
                          );
                        })
                      )}
                    </svg>
                  </div>

                  {/* Column 3: Destinations */}
                  <div className={styles.sketchColumn}>
                    <div className={styles.columnLabel}>DESTINATIONS</div>
                    {explorerData.destinations.map((node, i) => (
                      <div key={i} className={styles.nodeItem}>
                        <div className={styles.nodeIconWrap} style={{ borderColor: node.color }}>
                          <Icon icon={node.icon} width={22} color={node.color} />
                        </div>
                        <div className={styles.nodeDetails}>
                          <span className={styles.nodeIp}>{node.ip}</span>
                          <span className={styles.nodeTag}>{node.tag}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Flow Results Stream */}
        <div className={styles.accordion}>
          <div className={styles.accordionHeader} onClick={() => toggleSection('results')}>
            <div className={styles.headerLeft}>
              <div className={styles.iconWrapper}>
                <Icon icon="mdi:database-search" width={20} />
              </div>
              <span className={styles.headerTitle}>Flow Stream <span className={styles.badge}>RECORDED</span></span>
            </div>
            <div className={styles.headerRight}>
              <div className={styles.liveIndicator}>
                <span className={styles.pulseDot} />
                LIVE STREAM
              </div>
              <Icon icon="mdi:chevron-down" className={`${styles.chevron} ${expandedSections.results ? styles.chevronOpen : ''}`} />
            </div>
          </div>
          {expandedSections.results && (
            <div className={styles.accordionContentNoPadding}>
              <div className={styles.statsStrip}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>MATCHING FLOWS</span>
                  <span className={styles.statValue}>{explorerData.matchingFlows}</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>DATA TRANSFERRED</span>
                  <span className={styles.statValue}>{explorerData.dataTransferred}</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>UNIQUE SOURCES</span>
                  <span className={styles.statValue}>{explorerData.uniqueSources}</span>
                </div>
              </div>

              <div className={styles.explorerTableContainer} style={{ maxHeight: '450px', overflowY: 'auto' }}>
                <table className={styles.explorerTable}>
                  <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'var(--color-bg-secondary)' }}>
                    <tr>
                      <th>TIMESTAMP</th>
                      <th>SOURCE <span className={styles.subHeader}>PORT</span></th>
                      <th>DESTINATION <span className={styles.subHeader}>PORT</span></th>
                      <th>PROTO</th>
                      <th>APPLICATION</th>
                      <th>VOLUME</th>
                      <th>DURATION</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStreams.map((flow, idx) => (
                      <tr key={idx} className={styles.flowRow}>
                        <td className={styles.timeCell}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-primary)' }}>{flow.time}</span>
                            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{flow.date}</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles.ipGroup}>
                            <span className={styles.ipText}>{flow.source}</span>
                            <span className={styles.portText}>{flow.sPort}</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles.ipGroup}>
                            <span className={styles.ipText}>{flow.dest}</span>
                            <span className={styles.portText}>{flow.dPort}</span>
                          </div>
                        </td>
                        <td><span className={styles.protoBadge}>{flow.proto}</span></td>
                        <td><span className={styles.appBadge}>{flow.app}</span></td>
                        <td>
                          <div className={styles.volumeGroup}>
                            <span className={styles.volumeText}>{flow.bytes}</span>
                            <span className={styles.packetText}>{flow.packets} pkts</span>
                          </div>
                        </td>
                        <td className={styles.monoText}>{flow.duration}</td>
                        <td>
                          <div className={styles.statusGroup}>
                            <span className={`${styles.statusDot} ${styles[flow.status]}`} />
                            <span className={styles.statusText}>{flow.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {explorerData.streams && explorerData.streams.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-primary)' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, explorerData.streams.length)} of {explorerData.streams.length} entries
                  </span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      style={{ height: '32px', fontSize: '12px' }}
                    >
                      <Icon icon="mdi:chevron-left" width={16} /> Previous
                    </Button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).filter(p => p === 1 || p === totalPages || Math.abs(currentPage - p) <= 1).map((page, index, array) => {
                        if (index > 0 && page - array[index - 1] > 1) {
                          return <span key={`ellipsis-${page}`} style={{ color: 'var(--color-text-muted)', padding: '0 4px' }}>...</span>;
                        }
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "primary" : "ghost"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            style={{ height: '32px', width: '32px', padding: 0, fontSize: '12px' }}
                          >
                            {page}
                          </Button>
                        );
                      })}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      style={{ height: '32px', fontSize: '12px' }}
                    >
                      Next <Icon icon="mdi:chevron-right" width={16} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
