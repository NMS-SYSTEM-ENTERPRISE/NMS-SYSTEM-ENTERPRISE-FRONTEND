import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

const MOCK_FLOWS = [
  {
    time: '16:48:12.450',
    source: '192.168.1.15',
    sPort: '54212',
    dest: '104.26.10.233',
    dPort: '443',
    proto: 'TCP',
    app: 'HTTPS',
    bytes: '4.2 KB',
    packets: '12',
    duration: '1.2s',
    flags: 'ACK, PSH',
    status: 'active'
  },
  {
    time: '16:48:11.890',
    source: '192.168.1.140',
    sPort: '49321',
    dest: '172.217.167.78',
    dPort: '443',
    proto: 'TCP',
    app: 'Google Services',
    bytes: '128.5 KB',
    packets: '154',
    duration: '15.4s',
    flags: 'ACK, FIN',
    status: 'closed'
  },
  {
    time: '16:48:10.120',
    source: '10.0.0.52',
    sPort: '123',
    dest: '162.159.200.1',
    dPort: '123',
    proto: 'UDP',
    app: 'NTP',
    bytes: '176 B',
    packets: '2',
    duration: '0.1s',
    flags: '-',
    status: 'closed'
  },
  {
    time: '16:48:09.550',
    source: '192.168.1.64',
    sPort: '55678',
    dest: '52.114.77.33',
    dPort: '443',
    proto: 'TCP',
    app: 'Microsoft Teams',
    bytes: '890.2 KB',
    packets: '640',
    duration: '120.5s',
    flags: 'ACK, PSH',
    status: 'active'
  },
  {
    time: '16:48:08.210',
    source: '192.168.1.15',
    sPort: '61002',
    dest: '34.107.243.93',
    dPort: '80',
    proto: 'TCP',
    app: 'HTTP',
    bytes: '15.7 KB',
    packets: '28',
    duration: '2.5s',
    flags: 'ACK, FIN',
    status: 'closed'
  }
];

export const FlowExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    filters: true,
    topology: true,
    results: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

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
                      <Icon icon="mdi:ip-network" className={styles.fieldIcon} />
                      <input type="text" placeholder="e.g. 192.168.1.0/24" />
                    </div>
                  </div>
                  <div className={styles.filterField}>
                    <label>DESTINATION IP</label>
                    <div className={styles.inputWrap}>
                      <Icon icon="mdi:map-marker-radius" className={styles.fieldIcon} />
                      <input type="text" placeholder="e.g. 8.8.8.8" />
                    </div>
                  </div>
                  <div className={styles.filterField}>
                    <label>PROTOCOL / APP</label>
                    <div className={styles.inputWrap}>
                      <Icon icon="mdi:application-cog" className={styles.fieldIcon} />
                      <select>
                        <option>All Protocols</option>
                        <option>TCP</option>
                        <option>UDP</option>
                        <option>ICMP</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.filterField}>
                    <label>PORT</label>
                    <div className={styles.inputWrap}>
                      <Icon icon="mdi:door-open" className={styles.fieldIcon} />
                      <input type="text" placeholder="e.g. 443" />
                    </div>
                  </div>
                </div>
                <div className={styles.filterActions}>
                  <button className={styles.clearBtn}>Clear All</button>
                  <button className={styles.applyBtn}>
                    <Icon icon="mdi:play-circle" width={18} />
                    Run Query
                  </button>
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
                    <div className={styles.nodeItem}>
                      <div className={styles.nodeIconWrap} style={{ borderColor: '#22d3ee' }}>
                        <Icon icon="mdi:desktop-classic" width={22} color="#22d3ee" />
                      </div>
                      <div className={styles.nodeDetails}>
                        <span className={styles.nodeIp}>192.168.1.15</span>
                        <span className={styles.nodeTag}>ENDPOINT</span>
                      </div>
                    </div>
                    <div className={styles.nodeItem}>
                      <div className={styles.nodeIconWrap} style={{ borderColor: '#22d3ee' }}>
                        <Icon icon="mdi:server-network" width={22} color="#22d3ee" />
                      </div>
                      <div className={styles.nodeDetails}>
                        <span className={styles.nodeIp}>172.16.45.10</span>
                        <span className={styles.nodeTag}>GATEWAY</span>
                      </div>
                    </div>
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
                    <div className={styles.centralNode}>
                      <div className={styles.serviceDisc}>
                        <Icon icon="mdi:application-cog" width={32} color="#c084fc" />
                        <span className={styles.serviceName}>HTTPS / TLS 1.3</span>
                      </div>
                      <div className={styles.serviceStats}>
                        <span className={styles.serviceStat}>850.5 GB TOTAL</span>
                        <span className={styles.serviceStat}>12.4K SESSIONS</span>
                      </div>
                    </div>
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
                    <div className={styles.nodeItem}>
                      <div className={styles.nodeIconWrap} style={{ borderColor: '#f43f5e' }}>
                        <Icon icon="mdi:cloud-check" width={22} color="#f43f5e" />
                      </div>
                      <div className={styles.nodeDetails}>
                        <span className={styles.nodeIp}>Amazon AWS</span>
                        <span className={styles.nodeTag}>Cloud Service</span>
                      </div>
                    </div>
                    <div className={styles.nodeItem}>
                      <div className={styles.nodeIconWrap} style={{ borderColor: '#f43f5e' }}>
                        <Icon icon="mdi:flag-variant" width={22} color="#f43f5e" />
                      </div>
                      <div className={styles.nodeDetails}>
                        <span className={styles.nodeIp}>104.26.10.233</span>
                        <span className={styles.nodeTag}>Cloudflare</span>
                      </div>
                    </div>
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
            <div className={styles.accordionContent} style={{ padding: 0 }}>
              <div className={styles.statsStrip}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>MATCHING FLOWS</span>
                  <span className={styles.statValue}>1,248</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>DATA TRANSFERRED</span>
                  <span className={styles.statValue}>4.2 GB</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>UNIQUE SOURCES</span>
                  <span className={styles.statValue}>42</span>
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
                    {MOCK_FLOWS.map((flow, idx) => (
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
