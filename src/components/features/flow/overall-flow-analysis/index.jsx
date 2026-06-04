import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { getOverallFlowAnalysis } from '@/networking/network-monitoring/network-monitoring-apis';
import styles from './styles.module.css';

export const OverallFlowAnalysis = () => {
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAndRender = async () => {
      try {
        setLoading(true);
        const res = await getOverallFlowAnalysis();
        setData(res);
      } catch (error) {
        console.error("Failed to load overall flow analysis", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAndRender();
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className={`${styles.analysisContainer} ${isFullscreen ? styles.fullscreen : ''}`}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <div className={styles.iconWrapper}>
            <Icon icon="mdi:sitemap" width={24} color="var(--color-chart-cyan)" />
          </div>
          <div>
            <h2 className={styles.title}>Overall Flow Analysis</h2>
            <p className={styles.subtitle}>Holistic View of All Enterprise Network Flows</p>
          </div>
        </div>
        
        <div className={styles.controls}>
          <button className={styles.controlBtn} onClick={toggleFullscreen} title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
            <Icon icon={isFullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"} width={20} />
          </button>
        </div>
      </div>

      <div className={styles.canvasArea}>
        {loading && (
          <div className={styles.loadingOverlay}>
            <Icon icon="mdi:loading" width={48} className={styles.spinner} />
            <span>Analyzing Flow Architecture...</span>
          </div>
        )}
        
        {data && (
          <div className={styles.sketchCanvas}>
            {/* Column 1: Sources */}
            <div className={styles.sketchColumn}>
              <div className={styles.columnLabel}>SOURCES</div>
              {data.sources.map((node, i) => (
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

            {/* Connecting Lines Area */}
            <div className={styles.flowLinesArea}>
              <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
                <defs>
                  <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                {data.sources.map((_, i) =>
                  data.services.map((_, j) => {
                    const startY = ((i + 0.5) / Math.max(1, data.sources.length)) * 200;
                    const endY = ((j + 0.5) / Math.max(1, data.services.length)) * 200;
                    const pathStr = `M 0 ${startY} C 100 ${startY}, 100 ${endY}, 200 ${endY}`;
                    return (
                      <g key={`s2s-${i}-${j}`}>
                        <path d={pathStr} stroke="url(#flowGrad1)" strokeWidth="2" fill="none" className={styles.animatedPath} />
                        <circle r="3" fill="#22d3ee">
                          <animateMotion dur={`${1.5 + Math.random()}s`} repeatCount="indefinite" path={pathStr} />
                        </circle>
                      </g>
                    );
                  })
                )}
              </svg>
            </div>

            {/* Column 2: Services / Core */}
            <div className={`${styles.sketchColumn} ${styles.centerColumn}`}>
              <div className={styles.columnLabel}>SERVICES</div>
              {data.services.map((svc, i) => (
                <div key={i} className={styles.centralNode}>
                  <div className={styles.serviceDisc}>
                    <Icon icon={svc.icon} width={40} color={svc.color} />
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
              <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
                <defs>
                  <linearGradient id="flowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {data.services.map((_, i) =>
                  data.destinations.map((_, j) => {
                    const startY = ((i + 0.5) / Math.max(1, data.services.length)) * 200;
                    const endY = ((j + 0.5) / Math.max(1, data.destinations.length)) * 200;
                    const pathStr = `M 0 ${startY} C 100 ${startY}, 100 ${endY}, 200 ${endY}`;
                    return (
                      <g key={`svc2d-${i}-${j}`}>
                        <path d={pathStr} stroke="url(#flowGrad2)" strokeWidth="2" fill="none" className={styles.animatedPath} />
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
              {data.destinations.map((node, i) => (
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
        )}
      </div>
    </div>
  );
};
