import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';
import styles from './styles.module.css';

// Mock path nodes data
const generatePathNodes = () => [
  {
    id: 1,
    ip: '172.16.12.90',
    type: 'source',
    latency: null,
    icon: 'monitor',
  },
  {
    id: 2,
    ip: '172.16.10.1',
    type: 'router',
    latency: 0.44,
    icon: 'router',
  },
  {
    id: 3,
    ip: '33-240-103.1.mountain.com.3...',
    type: 'intermediate',
    latency: 0.21,
    icon: null,
  },
  {
    id: 4,
    ip: '103.156.102.9',
    type: 'intermediate',
    latency: 11.74,
    icon: null,
  },
  {
    id: 5,
    ip: '72.14.235.169',
    type: 'intermediate',
    latency: null,
    count: 3,
    icon: null,
  },
  {
    id: 6,
    ip: '142.250.183.100',
    type: 'destination',
    latency: null,
    label: 'GOOGLE, US',
    icon: 'flag',
  },
];

export const PathVisualization = ({ pathInfo }) => {
  const [pathNodes] = useState(generatePathNodes());
  
  // Calculate unified percentage positions for perfect alignment
  const nodesWithPositions = useMemo(() => {
    return pathNodes.map((node, index) => {
      const step = 100 / (pathNodes.length);
      return {
        ...node,
        // Distribute nodes horizontally and vertically
        x: 10 + (index * (80 / (pathNodes.length - 1))), // 10% to 90%
        y: 15 + (index * (70 / (pathNodes.length - 1))), // 15% to 85%
      };
    });
  }, [pathNodes]);

  const getNodeIcon = (node) => {
    if (node.icon === 'monitor') return <Icon icon="mdi:desktop-classic" width={28} height={28} />;
    if (node.icon === 'router') return <Icon icon="mdi:router-wireless" width={28} height={28} />;
    if (node.icon === 'flag') return <Icon icon="mdi:flag-variant" width={28} height={28} />;
    if (node.count) return node.count;
    return <div className={styles.rectDot} />;
  };

  const getNodeClass = (node) => {
    if (node.type === 'source') return styles.nodeSource;
    if (node.type === 'destination') return styles.nodeDestination;
    if (node.count) return styles.nodeCount;
    return styles.nodeIntermediate;
  };

  // Calculate connections using the same 0-1000 scale as nodes
  const connections = useMemo(() => {
    const lines = [];
    nodesWithPositions.forEach((node, i) => {
      if (i === 0) return;
      const prev = nodesWithPositions[i - 1];
      
      // Convert percentages to 0-1000 units
      const x1 = prev.x * 10;
      const y1 = prev.y * 10;
      const x2 = node.x * 10;
      const y2 = node.y * 10;
      
      const midX = (x1 + x2) / 2;
      const iconRadius = 35; // Approx radius in 1000-scale to stop at icon edge

      // Stepped path:
      // Start slightly after first icon
      // Horizontal to mid -> Vertical to target Y -> Horizontal to target icon edge
      const d = `M ${x1 + iconRadius} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2 - iconRadius} ${y2}`;
      
      lines.push({ 
        d, 
        id: `seg-${i}`, 
        color: node.type === 'destination' ? '#22d3ee' : '#f97316',
        latency: node.latency,
        midX,
        y1,
        y2
      });
    });
    return lines;
  }, [nodesWithPositions]);

  return (
    <div className={styles.pathVisualization}>
      <div className={styles.pathContainer}>
        {/* SVG Layer for animated connections */}
        <svg className={styles.svgLayer} preserveAspectRatio="none" viewBox="0 0 1000 1000">
          <defs>
            <marker
              id="arrowhead"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 Z" fill="currentColor" fillOpacity="0.8" />
            </marker>
          </defs>
          
          {connections.map((conn) => (
            <g key={conn.id} style={{ color: conn.color }}>
              {/* Clean Static Trace */}
              <path 
                d={conn.d} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
                strokeOpacity="0.1"
              />
              
              {/* Primary Animated Flow Line */}
              <path 
                d={conn.d} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
                strokeOpacity="0.6"
                className={styles.activePath}
                markerEnd="url(#arrowhead)"
                strokeDasharray="8, 12"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="1000"
                  to="0"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Precise Single Data Pulse */}
              <circle r="4" fill="#fff" fillOpacity="0.9">
                <animateMotion 
                  dur={`${2.2 + Math.random() * 0.5}s`} 
                  repeatCount="indefinite" 
                  path={conn.d} 
                  rotate="auto" 
                />
              </circle>
            </g>
          ))}
        </svg>

        {/* Nodes Layer */}
        <div className={styles.nodesLayer}>
          {nodesWithPositions.map((node, index) => (
            <div 
              key={node.id}
              className={`${styles.node} ${getNodeClass(node)}`}
              style={{ 
                position: 'absolute', 
                left: `${node.x}%`, 
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)' // Perfect center alignment
              }}
            >
              <div className={styles.nodeIconWrapper}>
                {getNodeIcon(node)}
              </div>
              <div className={styles.nodeLabel}>
                <span className={styles.nodeIp}>{node.ip}</span>
                {node.label && <span className={styles.nodeSubLabel}>{node.label}</span>}
                {index === 0 && <span className={styles.nodeSubLabel}>SOURCE</span>}
                {index === pathNodes.length - 1 && <span className={styles.nodeSubLabel}>DESTINATION</span>}
              </div>
            </div>
          ))}

          {/* Latency Badges - Positioned based on connections */}
          {connections.map((conn, i) => (
            conn.latency && (
              <div 
                key={`latency-${i}`}
                className={styles.latencyBadge}
                style={{ 
                  position: 'absolute', 
                  left: `${conn.midX / 10}%`, 
                  top: `${conn.y1 / 10}%`,
                  transform: 'translate(-50%, -150%)'
                }}
              >
                <Icon icon="mdi:clock-fast" width={10} style={{ marginRight: '4px', opacity: 0.6 }} />
                {conn.latency}ms
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};
