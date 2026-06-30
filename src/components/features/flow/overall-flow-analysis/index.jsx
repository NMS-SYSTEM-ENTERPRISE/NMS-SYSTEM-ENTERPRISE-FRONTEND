import React, { useEffect, useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { getOverallFlowAnalysis } from '@/networking/network-monitoring/network-monitoring-apis';
import styles from './styles.module.css';
import cytoscape from 'cytoscape';

export const OverallFlowAnalysis = () => {
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const fetchAndRender = async () => {
      try {
        setLoading(true);
        const data = await getOverallFlowAnalysis();
        renderCytoscape(data);
      } catch (error) {
        console.error("Failed to load overall flow analysis", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndRender();

    const handleResize = () => {
      if (cyRef.current) {
        cyRef.current.resize();
        cyRef.current.fit(null, 50);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, []);

  const buildIconUrl = (iconStr, colorStr) => {
    if (!iconStr) return '';
    try {
      const parts = iconStr.split(':');
      if (parts.length === 2) {
        const prefix = parts[0];
        const name = parts[1];
        const color = (colorStr || '#ffffff').replace('#', '%23');
        return `https://api.iconify.design/${prefix}/${name}.svg?color=${color}`;
      }
    } catch (e) {}
    return '';
  };

  const renderCytoscape = (data) => {
    if (!containerRef.current) return;
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (cyRef.current) {
      cyRef.current.destroy();
      cyRef.current = null;
    }

    const elements = [];
    
    const width = containerRef.current.clientWidth || 1000;
    const height = containerRef.current.clientHeight || 600;
    
    const xSrc = 150;
    const xSvc = width / 2;
    const xDst = width - 150;

    // Background nodes for Column Labels
    elements.push({
      group: 'nodes',
      data: { id: 'label_src', label: 'SOURCES', shape: 'rectangle', width: 0, height: 0, isLabel: true },
      position: { x: xSrc, y: 40 },
      locked: true
    });
    elements.push({
      group: 'nodes',
      data: { id: 'label_svc', label: 'SERVICES', shape: 'rectangle', width: 0, height: 0, isLabel: true },
      position: { x: xSvc, y: 40 },
      locked: true
    });
    elements.push({
      group: 'nodes',
      data: { id: 'label_dst', label: 'DESTINATIONS', shape: 'rectangle', width: 0, height: 0, isLabel: true },
      position: { x: xDst, y: 40 },
      locked: true
    });

    const startY = 140;
    const availableHeight = height - startY - 80;

    // Sources
    data.sources.forEach((s, i) => {
      const spacing = Math.max(90, availableHeight / Math.max(1, data.sources.length));
      const y = startY + i * spacing;
      elements.push({
        group: 'nodes',
        data: {
          id: `s_${i}`,
          label: `${s.ip}\n${s.tag}`,
          color: s.color || '#22d3ee',
          iconUrl: buildIconUrl(s.icon, s.color || '#22d3ee'),
          shape: 'round-rectangle',
          width: 36,
          height: 36
        },
        position: { x: xSrc, y }
      });
    });

    // Services
    data.services.forEach((svc, i) => {
      const spacing = Math.max(140, availableHeight / Math.max(1, data.services.length));
      const y = startY + i * spacing;
      elements.push({
        group: 'nodes',
        data: {
          id: `svc_${i}`,
          label: `${svc.name}\n${svc.total_volume}\n${svc.sessions} Sessions`,
          color: svc.color || '#c084fc',
          iconUrl: buildIconUrl(svc.icon, svc.color || '#c084fc'),
          shape: 'hexagon',
          width: 36,
          height: 36
        },
        position: { x: xSvc, y }
      });
    });

    // Destinations
    data.destinations.forEach((d, i) => {
      const spacing = Math.max(90, availableHeight / Math.max(1, data.destinations.length));
      const y = startY + i * spacing;
      elements.push({
        group: 'nodes',
        data: {
          id: `d_${i}`,
          label: `${d.ip}\n${d.tag}`,
          color: d.color || '#f43f5e',
          iconUrl: buildIconUrl(d.icon, d.color || '#f43f5e'),
          shape: 'ellipse',
          width: 36,
          height: 36
        },
        position: { x: xDst, y }
      });
    });

    // Edges (Sources -> Services)
    data.sources.forEach((s, i) => {
      data.services.forEach((svc, j) => {
        elements.push({
          group: 'edges',
          data: {
            id: `e_s${i}_svc${j}`,
            source: `s_${i}`,
            target: `svc_${j}`,
            color: s.color || '#22d3ee'
          }
        });
      });
    });

    // Edges (Services -> Destinations)
    data.services.forEach((svc, i) => {
      data.destinations.forEach((d, j) => {
        elements.push({
          group: 'edges',
          data: {
            id: `e_svc${i}_d${j}`,
            source: `svc_${i}`,
            target: `d_${j}`,
            color: d.color || '#f43f5e'
          }
        });
      });
    });

    cyRef.current = cytoscape({
      container: containerRef.current,
      elements: elements,
      layout: { name: 'preset' },
      style: [
        {
          selector: 'node[^isLabel]',
          style: {
            'shape': 'data(shape)',
            'width': 'data(width)',
            'height': 'data(height)',
            'background-color': '#0b0f19', 
            'background-image': 'data(iconUrl)',
            'background-fit': 'contain',
            'background-width': '16px',
            'background-height': '16px',
            'border-width': 2.5,
            'border-color': 'data(color)',
            'label': 'data(label)',
            'color': 'data(color)',
            'font-family': 'var(--font-geist-mono), monospace',
            'font-size': '11px',
            'text-wrap': 'wrap',
            'text-valign': 'bottom',
            'text-margin-y': 14,
            'text-outline-color': '#0b0f19',
            'text-outline-width': 3,
            'underlay-color': 'data(color)',
            'underlay-padding': 8,
            'underlay-opacity': 0.15,
            'transition-property': 'background-color, border-color, underlay-opacity, transform',
            'transition-duration': 300
          }
        },
        {
          selector: 'node[?isLabel]',
          style: {
            'label': 'data(label)',
            'color': '#64748b',
            'font-family': 'var(--font-geist-sans), sans-serif',
            'font-size': '12px',
            'font-weight': 'bold',
            'text-valign': 'center',
            'text-halign': 'center',
            'letter-spacing': '2px',
            'background-opacity': 0,
            'text-outline-opacity': 0
          }
        },
        {
          selector: 'node[^isLabel]:hover',
          style: {
            'underlay-opacity': 0.4,
            'border-width': 4,
            'cursor': 'pointer'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2.5,
            'curve-style': 'bezier',
            'control-point-step-size': 60,
            'line-color': 'data(color)',
            'target-arrow-color': 'data(color)',
            'target-arrow-shape': 'triangle',
            'opacity': 0.45,
            'line-style': 'dashed',
            'line-dash-pattern': [8, 8],
            'transition-property': 'opacity, width, line-color',
            'transition-duration': 200
          }
        },
        {
          selector: 'edge:hover',
          style: {
            'opacity': 0.9,
            'width': 4
          }
        }
      ],
      userZoomingEnabled: true,
      userPanningEnabled: true,
      boxSelectionEnabled: false,
      minZoom: 0.2,
      maxZoom: 3,
    });

    cyRef.current.fit(null, 50);

    let offset = 0;
    const animateEdges = () => {
      offset = (offset - 0.7) % 32; /* loop seamlessly */
      if (cyRef.current) {
        cyRef.current.edges().style('line-dash-offset', offset);
        animationRef.current = requestAnimationFrame(animateEdges);
      }
    };
    animateEdges();
  };

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

      <div className={styles.canvasArea} style={{ padding: 0 }}>
        {loading && (
          <div className={styles.loadingOverlay}>
            <Icon icon="mdi:loading" width={48} className={styles.spinner} />
            <span>Generating Architecture Visualization...</span>
          </div>
        )}
        
        <div 
          ref={containerRef} 
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1, backgroundColor: '#0b0f19' }}
        />
      </div>
    </div>
  );
};
