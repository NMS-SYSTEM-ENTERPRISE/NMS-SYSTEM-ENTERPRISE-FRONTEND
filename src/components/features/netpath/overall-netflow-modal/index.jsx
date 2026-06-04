import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import { Icon } from '@iconify/react';
import { getOverallNetFlow } from '@/networking/network-monitoring/network-monitoring-apis';
import styles from './styles.module.css';

export const OverallNetFlowModal = ({ onClose }) => {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let cy;
    const fetchAndRender = async () => {
      try {
        const data = await getOverallNetFlow();

        // Map nodes to cytoscape format
        const cyNodes = data.nodes.map(n => ({
          data: {
            id: n.id,
            label: n.label,
            ip: n.ip,
            status: n.status,
            type: n.type,
            icon: n.icon
          }
        }));

        // Map edges
        const cyEdges = data.links.map(l => ({
          data: {
            id: l.id,
            source: l.source,
            target: l.target,
            latency: l.latency,
            animated: l.animated,
            link_type: l.link_type
          }
        }));

        if (containerRef.current) {
          cy = cytoscape({
            container: containerRef.current,
            elements: [...cyNodes, ...cyEdges],
            style: [
              {
                selector: 'node',
                style: {
                  'width': 80,
                  'height': 80,
                  'background-color': '#1e293b',
                  'border-width': 3,
                  'border-color': (ele) => ele.data('status') === 'online' ? '#4ade80' : '#f87171',
                  'label': 'data(label)',
                  'color': '#fff',
                  'font-size': '14px',
                  'font-weight': 'bold',
                  'text-valign': 'bottom',
                  'text-margin-y': 12,
                  'text-background-color': '#0f172a',
                  'text-background-opacity': 0.85,
                  'text-background-padding': '6px',
                  'text-background-shape': 'roundrectangle',
                  'content': (ele) => ele.data('label') + '\n' + ele.data('ip'),
                  'text-wrap': 'wrap'
                }
              },
              {
                selector: 'node[type="source"]',
                style: {
                  'shape': 'rectangle',
                  'width': 90,
                  'height': 90,
                  'border-color': '#c084fc',
                  'background-color': 'rgba(192, 132, 252, 0.15)'
                }
              },
              {
                selector: 'node[type="router"]',
                style: {
                  'shape': 'hexagon',
                  'border-color': '#3b82f6'
                }
              },
              {
                selector: 'node[type="switch"]',
                style: {
                  'shape': 'diamond',
                  'border-color': '#10b981'
                }
              },
              {
                selector: 'edge',
                style: {
                  'width': 4,
                  'line-color': (ele) => {
                    if (!ele.data('animated')) return 'rgba(239, 68, 68, 0.6)';
                    const t = ele.data('link_type');
                    if (t === 'core') return 'rgba(192, 132, 252, 0.8)';
                    if (t === 'agg') return 'rgba(59, 130, 246, 0.8)';
                    if (t === 'access') return 'rgba(16, 185, 129, 0.8)';
                    return 'rgba(34, 211, 238, 0.6)';
                  },
                  'curve-style': 'bezier',
                  'target-arrow-shape': 'triangle',
                  'target-arrow-color': (ele) => {
                    if (!ele.data('animated')) return 'rgba(239, 68, 68, 0.6)';
                    const t = ele.data('link_type');
                    if (t === 'core') return 'rgba(192, 132, 252, 0.8)';
                    if (t === 'agg') return 'rgba(59, 130, 246, 0.8)';
                    if (t === 'access') return 'rgba(16, 185, 129, 0.8)';
                    return 'rgba(34, 211, 238, 0.6)';
                  },
                  'line-dash-pattern': [8, 4],
                  'line-style': (ele) => ele.data('animated') ? 'dashed' : 'solid',
                  'label': (ele) => ele.data('latency') ? `${ele.data('latency')}ms` : '',
                  'font-size': '12px',
                  'font-weight': 'bold',
                  'color': (ele) => {
                    if (!ele.data('animated')) return '#ef4444';
                    const t = ele.data('link_type');
                    if (t === 'core') return '#c084fc';
                    if (t === 'agg') return '#3b82f6';
                    if (t === 'access') return '#10b981';
                    return '#22d3ee';
                  },
                  'text-background-color': '#0b0f19',
                  'text-background-opacity': 1,
                  'text-background-padding': '4px',
                  'edge-text-rotation': 'autorotate'
                }
              }
            ],
            layout: {
              name: 'breadthfirst',
              directed: true,
              padding: 100,
              spacingFactor: 1.1,
              animate: true,
              animationDuration: 1200,
              fit: true
            },
            minZoom: 0.05,
            maxZoom: 5,
            wheelSensitivity: 0.15
          });

          // Animation for dashed lines
          let offset = 0;
          let animationRef;
          const animateEdges = () => {
            if (cy && !cy.destroyed()) {
              offset -= 1.5;
              cy.edges('[?animated]').style('line-dash-offset', offset);
              animationRef = requestAnimationFrame(animateEdges);
            }
          };
          animateEdges();

          cyRef.current = cy;
          setLoading(false);

          setTimeout(() => {
            if (cy && !cy.destroyed()) {
              cy.fit(undefined, 80);
              cy.center();
            }
          }, 1300);
        }
      } catch (err) {
        console.error("Failed to fetch overall netflow", err);
        setLoading(false);
      }
    };

    fetchAndRender();

    return () => {
      if (cy && !cy.destroyed()) cy.destroy();
    };
  }, []);

  const handleZoomIn = () => cyRef.current && cyRef.current.zoom(cyRef.current.zoom() * 1.5);
  const handleZoomOut = () => cyRef.current && cyRef.current.zoom(cyRef.current.zoom() / 1.5);
  const handleReset = () => cyRef.current && cyRef.current.fit(undefined, 80);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (wrapperRef.current.requestFullscreen) {
          await wrapperRef.current.requestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error("Error toggling fullscreen", err);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      // Re-fit cytoscape slightly after transition
      setTimeout(() => cyRef.current?.fit(undefined, 80), 200);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className={styles.modalOverlay} ref={wrapperRef}>
      {/* Absolute Branding Overlay */}
      <div className={styles.brandOverlay}>
        <div className={styles.brandIcon}>
          <Icon icon="mdi:sitemap" width={28} />
        </div>
        <div className={styles.brandText}>
          <h2>Integrated Circuit Net Flow</h2>
          <p>Holistic View of All Enterprise Network Paths</p>
        </div>
      </div>

      {/* Floating Action Controls */}
      <div className={styles.overlayControls}>
        <button className={styles.controlBtn} onClick={handleZoomIn} title="Zoom In">
          <Icon icon="mdi:magnify-plus-outline" width={24} />
        </button>
        <button className={styles.controlBtn} onClick={handleZoomOut} title="Zoom Out">
          <Icon icon="mdi:magnify-minus-outline" width={24} />
        </button>
        <button className={styles.controlBtn} onClick={handleReset} title="Reset View">
          <Icon icon="mdi:image-filter-center-focus" width={24} />
        </button>
        <button className={styles.controlBtn} onClick={toggleFullscreen} title="Toggle Fullscreen (F11)">
          <Icon icon={isFullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"} width={24} />
        </button>
        
        <button className={`${styles.controlBtn} ${styles.closeBtn}`} onClick={onClose} title="Close Net Flow">
          <Icon icon="mdi:close" width={24} />
        </button>
      </div>

      <div className={styles.cyContainer}>
        {loading && (
          <div className={styles.loader}>
            <Icon icon="svg-spinners:pulse-rings-multiple" width={60} />
            <div>Mapping Circuit Topology...</div>
          </div>
        )}
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};
