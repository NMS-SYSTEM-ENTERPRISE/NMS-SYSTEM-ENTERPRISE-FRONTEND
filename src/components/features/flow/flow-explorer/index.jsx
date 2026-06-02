import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

import { getFlowExplorer } from '@/networking/network-monitoring/network-monitoring-apis';

export const FlowExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    filters: true,
    topology: true,
    results: true
  });
  const [explorerData, setExplorerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getFlowExplorer();
        setExplorerData(data);
      } catch (error) {
        console.error("Failed to fetch flow explorer data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  if (isLoading || !explorerData) {
    return <div className={styles.explorer}>Loading Flow Explorer...</div>;
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
                      <Input type="text" placeholder="e.g. 192.168.1.0/24" icon={<Icon icon="mdi:ip-network" />} />
                    </div>
                  </div>
                  <div className={styles.filterField}>
                    <label>DESTINATION IP</label>
                    <div className={styles.inputWrap}>
                      <Input type="text" placeholder="e.g. 8.8.8.8" icon={<Icon icon="mdi:map-marker-radius" />} />
                    </div>
                  </div>
                  <div className={styles.filterField}>
                    <label>PROTOCOL / APP</label>
                    <div className={styles.inputWrap}>
                      <SelectComponent
                        value=""
                        onChange={() => { }}
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
                      <Input type="text" placeholder="e.g. 443" icon={<Icon icon="mdi:door-open" />} />
                    </div>
                  </div>
                </div>
                <div className={styles.filterActions}>
                  <Button variant="ghost" className={styles.clearBtn}>Clear All</Button>
                  <Button className={styles.applyBtn}>
                    <Icon icon="mdi:play-circle" width={18} />
                    Run Query
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
                      <path d="M 0 50 C 100 50, 100 100, 200 100" stroke="url(#flowGrad)" strokeWidth="2" fill="none" className={styles.animatedPath} />
                      <path d="M 0 150 C 100 150, 100 100, 200 100" stroke="url(#flowGrad)" strokeWidth="2" fill="none" className={styles.animatedPath} />
                      <circle r="3" fill="#22d3ee">
                        <animateMotion dur="2s" repeatCount="indefinite" path="M 0 50 C 100 50, 100 100, 200 100" />
                      </circle>
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
                      <path d="M 0 100 L 200 50" stroke="url(#flowGrad)" strokeWidth="2" fill="none" className={styles.animatedPath} />
                      <path d="M 0 100 L 200 150" stroke="url(#flowGrad)" strokeWidth="2" fill="none" className={styles.animatedPath} />
                      <circle r="3" fill="#f43f5e">
                        <animateMotion dur="1.5s" repeatCount="indefinite" path="M 0 100 L 200 50" />
                      </circle>
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

              <div className={styles.explorerTableContainer}>
                <table className={styles.explorerTable}>
                  <thead>
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
                    {explorerData.streams.map((flow, idx) => (
                      <tr key={idx} className={styles.flowRow}>
                        <td className={styles.timeCell}>{flow.time}</td>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
