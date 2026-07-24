import { useEffect } from 'react';
import cytoscape from 'cytoscape';
import { generateElements, getIconDataUri } from '@/utils/network-topology/utils';

export const useCytoscape = ({
  containerRef,
  cyRef,
  viewMode,
  layoutType,
  topologyData,
  searchQuery,
  setFocusedNode,
  focusedNode,
  setSelectedDevice,
  setShowDeviceModal,
}) => {
  // Focus on a node and highlight its neighbors
  const focusOnNode = (cy, node) => {
    if (!cy || cy.destroyed()) return;
    // Reset all
    cy.elements().removeClass('focused neighbor dimmed highlighted');

    // Mark the focused node
    node.addClass('focused');

    // Get neighbors (connected nodes)
    const neighbors = node.neighborhood('node');
    neighbors.addClass('neighbor');

    // Get connected edges
    const connectedEdges = node.connectedEdges();
    connectedEdges.addClass('highlighted');

    // Dim all other nodes and edges
    cy.nodes().not(node).not(neighbors).addClass('dimmed');
    cy.edges().not(connectedEdges).addClass('dimmed');

    // Animate to center on the focused node
    cy.animate({
      center: { eles: node },
      zoom: Math.max(cy.zoom(), 1.2),
      duration: 400,
      easing: 'ease-in-out-cubic',
    });
  };

  // Reset focus
  const resetFocus = (cy) => {
    if (!cy || cy.destroyed()) return;
    cy.elements().removeClass('focused neighbor dimmed highlighted');
  };

  // Get layout configuration
  const getLayoutConfig = (type) => {
    const baseConfig = {
      animate: true,
      animationDuration: 1000,
      animationEasing: 'ease-in-out-cubic',
      padding: 80,
    };

    switch (type) {
      case 'cose':
        return {
          ...baseConfig,
          name: 'cose',
          nodeRepulsion: 400000,
          idealEdgeLength: 200,
          edgeElasticity: 200,
          nestingFactor: 1.2,
          gravity: 1,
          numIter: 1000,
          initialTemp: 200,
          coolingFactor: 0.95,
          minTemp: 1.0,
        };
      case 'circle':
        return {
          ...baseConfig,
          name: 'circle',
          radius: 300,
          spacingFactor: 1.5,
        };
      case 'concentric':
        return {
          ...baseConfig,
          name: 'concentric',
          minNodeSpacing: 100,
          levelWidth: () => 2,
        };
      case 'grid':
        return {
          ...baseConfig,
          name: 'grid',
          rows: undefined,
          cols: undefined,
          spacingFactor: 1.5,
        };
      case 'breadthfirst':
        return {
          ...baseConfig,
          name: 'breadthfirst',
          directed: false,
          spacingFactor: 1.75,
          avoidOverlap: true,
        };
      default:
        return baseConfig;
    }
  };

  useEffect(() => {
    if (!containerRef.current || !topologyData) return;

    const { nodes, edges } = generateElements(topologyData, viewMode);

    const cy = cytoscape({
      container: containerRef.current,
      elements: [...nodes, ...edges],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': (ele) => {
              const status = ele.data('status');
              switch (status) {
                case 'online': return '#4ade80';
                case 'warning': return '#fb923c';
                case 'offline': return '#f87171';
                case 'group': return '#60a5fa';
                default: return '#8e8e93';
              }
            },
            'background-image': (ele) => getIconDataUri(ele.data('type'), ele.data('status')),
            'background-fit': 'none',
            'background-width': '60%',
            'background-height': '60%',
            'background-position-x': '50%',
            'background-position-y': '50%',
            'background-opacity': 0.15, // Subtle background
            'border-width': 2,
            'border-color': (ele) => {
              const status = ele.data('status');
              switch (status) {
                case 'online': return '#4ade80';
                case 'warning': return '#fb923c';
                case 'offline': return '#f87171';
                case 'group': return '#60a5fa';
                default: return '#8e8e93';
              }
            },
            'border-opacity': 0.5,
            label: 'data(label)',
            'text-valign': 'bottom',
            'text-halign': 'center',
            'text-margin-y': 8,
            color: '#ffffff',
            'font-size': '12px',
            'font-weight': 'bold',
            'text-outline-width': 2.5,
            'text-outline-color': '#0a0f1a',
            'text-wrap': 'wrap',
            'text-max-width': '120px',
            width: 50,
            height: 50,
            shape: 'ellipse', // Circular background
            'overlay-padding': 10,
            'transition-property': 'width, height, background-color, border-width',
            'transition-duration': '0.3s',
          },
        },
        {
          selector: 'node:selected',
          style: {
            width: 65,
            height: 65,
            'z-index': 999,
            'border-width': 3,
            'background-opacity': 0.25,
            'border-opacity': 1
          },
        },
        {
          selector: 'node.focused',
          style: {
            width: 70,
            height: 70,
            'z-index': 999,
            'border-width': 3,
            'background-opacity': 0.3,
            'border-opacity': 1
          },
        },
        {
          selector: 'node.neighbor',
          style: {
            'border-width': 5,
            'border-color': '#4ade80',
            'z-index': 998,
            width: 65,
            height: 65,
          },
        },
        {
          selector: 'node.highlighted',
          style: {
            'border-width': 5,
            'border-color': '#00c8ff',
            'z-index': 999,
            width: 65,
            height: 65,
          },
        },
        {
          selector: 'node.dimmed',
          style: {
            opacity: 0.3,
          },
        },
        {
          selector: 'edge',
          style: {
            width: 3,
            'line-color': '#3a4556',
            'target-arrow-color': '#3a4556',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            opacity: 0.6,
            'transition-property': 'line-color, width, opacity',
            'transition-duration': '0.3s',
          },
        },
        {
          selector: 'edge:selected',
          style: {
            'line-color': '#00c8ff',
            'target-arrow-color': '#00c8ff',
            width: 4,
            opacity: 1,
          },
        },
        {
          selector: 'edge.highlighted',
          style: {
            'line-color': '#4ade80',
            'target-arrow-color': '#4ade80',
            width: 5,
            'z-index': 9999,
            opacity: 1,
          },
        },
        {
          selector: 'edge.dimmed',
          style: {
            opacity: 0.1,
          },
        },
      ],
      minZoom: 0.1,
      maxZoom: 5,
      wheelSensitivity: 0.15,
    });

    const layout = cy.layout(getLayoutConfig(layoutType));
    layout.run();

    // Fit to view after layout with animation
    const fitTimeout = setTimeout(() => {
      if (cy && !cy.destroyed()) {
        cy.fit(undefined, 60);
        cy.center();
      }
    }, 800);

    // Enhanced click handlers with focus and neighbor highlighting
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      const deviceData = node.data();

      // Focus on this node and highlight neighbors
      focusOnNode(cy, node);
      setFocusedNode(deviceData.id);

      // Show device details if it's an actual device
      if (deviceData.ip) {
        setSelectedDevice({
          ...deviceData,
          label: deviceData.label || deviceData.name,
        });
        setShowDeviceModal(true);
      }
    });

    // Double click to center on node
    cy.on('dbltap', 'node', (evt) => {
      const node = evt.target;
      cy.animate({
        center: { eles: node },
        zoom: 1.5,
        duration: 500,
        easing: 'ease-in-out-cubic',
      });
    });

    // Click on background to reset
    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        resetFocus(cy);
        setFocusedNode(null);
      }
    });

    // Hover effects
    cy.on('mouseover', 'node', (evt) => {
      const node = evt.target;
      if (!focusedNode) {
        node.addClass('neighbor');
      }
    });

    cy.on('mouseout', 'node', (evt) => {
      const node = evt.target;
      if (!focusedNode) {
        node.removeClass('neighbor');
      }
    });

    cyRef.current = cy;

    return () => {
      clearTimeout(fitTimeout);
      if (layout) {
        try { layout.stop(); } catch (e) { }
      }
      if (cy && !cy.destroyed()) {
        try {
          cy.stop(true, true);
          cy.destroy();
        } catch (error) {
          console.error('Error destroying cytoscape:', error);
        }
      }
      cyRef.current = null;
    };
  }, [viewMode, layoutType, topologyData]);

  useEffect(() => {
    if (!cyRef.current || cyRef.current.destroyed()) return;

    const query = (searchQuery || '').trim().toLowerCase();
    cyRef.current.elements().removeClass('dimmed highlighted');

    if (!query) return;

    const matches = cyRef.current.nodes().filter((node) => {
      const label = String(node.data('label') || '').toLowerCase();
      const ip = String(node.data('ip') || '').toLowerCase();
      return label.includes(query) || ip.includes(query);
    });

    cyRef.current.nodes().not(matches).addClass('dimmed');
    matches.addClass('highlighted');
  }, [searchQuery, cyRef]);

  return { getLayoutConfig, resetFocus, focusOnNode };
};
