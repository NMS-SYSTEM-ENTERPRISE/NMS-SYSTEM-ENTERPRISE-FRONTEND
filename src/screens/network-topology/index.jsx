"use client";
import { DeviceDetailSidebar } from '@/components/features/topology/device-detail-sidebar';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { Icon } from '@iconify/react';
import cytoscape from 'cytoscape';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

// Mock network topology data with hierarchical structure and connections
const MOCK_TOPOLOGY_DATA = {
  network: {
    name: 'Network',
    children: [
      {
        name: 'Router',
        type: 'group',
        children: [
          {
            name: 'Cisco Systems',
            type: 'vendor',
            children: [
              {
                id: 'router-1',
                name: 'HB1.hb1.com',
                ip: '172.16.9.221',
                type: 'router',
                status: 'online',
                vendor: 'Cisco',
                model: 'ISR 4451',
                connections: ['sw-1', 'sw-2', 'fw-1'],
              },
              {
                id: 'router-2',
                name: 'cisco841.snr-edatas.local',
                ip: '172.16.12.86',
                type: 'router',
                status: 'offline',
                vendor: 'Cisco',
                model: 'ISR 841',
                connections: ['sw-3'],
              },
              {
                id: 'router-3',
                name: 'Gandhinagar_RTU_ES1',
                ip: '192.168.1.1',
                type: 'router',
                status: 'offline',
                vendor: 'Cisco',
                model: 'ASR 1001',
                connections: ['router-4', 'sw-4'],
              },
              {
                id: 'router-4',
                name: 'PMG-Router.test.com',
                ip: '172.16.8.90',
                type: 'router',
                status: 'online',
                vendor: 'Cisco',
                model: 'ISR 4331',
                connections: ['router-1', 'router-3', 'fw-1'],
              },
            ],
          },
          {
            name: 'Hewlett Packard Enterprise',
            type: 'vendor',
            children: [
              {
                id: 'router-5',
                name: 'Router_231',
                ip: '192.168.231.2',
                type: 'router',
                status: 'offline',
                vendor: 'HPE',
                model: 'FlexNetwork',
                connections: ['sw-5'],
              },
              {
                id: 'router-6',
                name: 'Router___',
                ip: '192.168.241.2',
                type: 'router',
                status: 'online',
                vendor: 'HPE',
                model: 'MSR3000',
                connections: ['sw-6', 'ap-1'],
              },
            ],
          },
        ],
      },
      {
        name: 'Firewall',
        type: 'group',
        children: [
          {
            name: 'Fortinet',
            type: 'vendor',
            children: [
              {
                id: 'fw-1',
                name: 'fg_firewall.mindarrauy.com',
                ip: '172.16.8.111',
                type: 'firewall',
                status: 'online',
                vendor: 'Fortinet',
                model: 'FortiGate 100F',
                connections: ['router-1', 'router-4', 'srv-1', 'srv-2'],
              },
            ],
          },
        ],
      },
      {
        name: 'Switch',
        type: 'group',
        children: [
          {
            name: 'Cisco Systems',
            type: 'vendor',
            children: [
              {
                id: 'sw-1',
                name: 'ciscostack1.test.com',
                ip: '172.16.8.211',
                type: 'switch',
                status: 'offline',
                vendor: 'Cisco',
                model: 'Catalyst 3850',
                connections: ['router-1', 'ap-1', 'ap-2', 'srv-1'],
              },
              {
                id: 'sw-2',
                name: 'ciscostack2.test.com',
                ip: '172.16.8.212',
                type: 'switch',
                status: 'online',
                vendor: 'Cisco',
                model: 'Catalyst 2960',
                connections: ['router-1', 'ap-3', 'srv-2'],
              },
              {
                id: 'sw-3',
                name: 'Cisco Switch',
                ip: '172.16.9.202',
                type: 'switch',
                status: 'offline',
                vendor: 'Cisco',
                model: 'Catalyst 9300',
                connections: ['router-2', 'srv-3'],
              },
            ],
          },
          {
            name: 'D-Link',
            type: 'vendor',
            children: [
              {
                id: 'sw-4',
                name: 'Dlink',
                ip: '192.168.1.10',
                type: 'switch',
                status: 'online',
                vendor: 'D-Link',
                model: 'DGS-1210',
                connections: ['router-3', 'ap-4'],
              },
            ],
          },
          {
            name: 'Hewlett Packard Enterprise',
            type: 'vendor',
            children: [
              {
                id: 'sw-5',
                name: 'g4g4.com',
                ip: '172.16.8.225',
                type: 'switch',
                status: 'warning',
                vendor: 'HPE',
                model: 'Aruba 2930F',
                connections: ['router-5', 'srv-4'],
              },
              {
                id: 'sw-6',
                name: 'g3g3.com',
                ip: '172.16.8.224',
                type: 'switch',
                status: 'online',
                vendor: 'HPE',
                model: 'ProCurve 2810',
                connections: ['router-6', 'ap-5', 'srv-5'],
              },
            ],
          },
        ],
      },
      {
        name: 'Servers',
        type: 'group',
        children: [
          {
            name: 'Dell',
            type: 'vendor',
            children: [
              {
                id: 'srv-1',
                name: 'Web Server 1',
                ip: '192.168.10.1',
                type: 'server',
                status: 'online',
                vendor: 'Dell',
                model: 'PowerEdge R740',
                connections: ['fw-1', 'sw-1', 'srv-3'],
              },
              {
                id: 'srv-2',
                name: 'Web Server 2',
                ip: '192.168.10.2',
                type: 'server',
                status: 'online',
                vendor: 'Dell',
                model: 'PowerEdge R740',
                connections: ['fw-1', 'sw-2', 'srv-3'],
              },
              {
                id: 'srv-3',
                name: 'DB Server',
                ip: '192.168.10.3',
                type: 'server',
                status: 'online',
                vendor: 'Dell',
                model: 'PowerEdge R940',
                connections: ['sw-3', 'srv-1', 'srv-2'],
              },
            ],
          },
          {
            name: 'HP',
            type: 'vendor',
            children: [
              {
                id: 'srv-4',
                name: 'File Server',
                ip: '192.168.10.4',
                type: 'server',
                status: 'warning',
                vendor: 'HP',
                model: 'ProLiant DL380',
                connections: ['sw-5'],
              },
              {
                id: 'srv-5',
                name: 'Backup Server',
                ip: '192.168.10.5',
                type: 'server',
                status: 'offline',
                vendor: 'HP',
                model: 'ProLiant DL360',
                connections: ['sw-6'],
              },
            ],
          },
        ],
      },
      {
        name: 'Access Points',
        type: 'group',
        children: [
          {
            name: 'Cisco Meraki',
            type: 'vendor',
            children: [
              {
                id: 'ap-1',
                name: 'Lobby AP',
                ip: '10.0.0.1',
                type: 'access-point',
                status: 'online',
                vendor: 'Cisco',
                model: 'Meraki MR46',
                connections: ['sw-1', 'router-6'],
              },
              {
                id: 'ap-2',
                name: 'Conf Room AP',
                ip: '10.0.0.2',
                type: 'access-point',
                status: 'online',
                vendor: 'Cisco',
                model: 'Meraki MR46',
                connections: ['sw-1'],
              },
              {
                id: 'ap-3',
                name: 'Cafeteria AP',
                ip: '10.0.0.3',
                type: 'access-point',
                status: 'online',
                vendor: 'Cisco',
                model: 'Meraki MR56',
                connections: ['sw-2'],
              },
              {
                id: 'ap-4',
                name: 'Floor 1 AP',
                ip: '10.0.0.4',
                type: 'access-point',
                status: 'online',
                vendor: 'Cisco',
                model: 'Meraki MR46',
                connections: ['sw-4'],
              },
              {
                id: 'ap-5',
                name: 'Floor 2 AP',
                ip: '10.0.0.5',
                type: 'access-point',
                status: 'warning',
                vendor: 'Cisco',
                model: 'Meraki MR46',
                connections: ['sw-6'],
              },
            ],
          },
        ],
      },
    ],
  },
  sdn: {
    name: 'SDN',
    children: [
      {
        name: 'Cisco SD-WAN',
        type: 'group',
        children: [
          {
            id: 'sdn-1',
            name: 'Manager',
            type: 'controller',
            status: 'online',
            connections: ['sdn-2', 'sdn-3'],
          },
          {
            id: 'sdn-2',
            name: 'Manager Node',
            ip: '10.10.1.1',
            type: 'manager',
            status: 'online',
            connections: ['sdn-1', 'sdn-3'],
          },
          {
            id: 'sdn-3',
            name: 'WAN Edge',
            type: 'edge',
            status: 'online',
            connections: ['sdn-1', 'sdn-2'],
          },
        ],
      },
    ],
  },
  cloud: {
    name: 'Global',
    children: [
      {
        name: 'AWS Cloud',
        type: 'cloud-provider',
        children: [
          {
            id: 'cloud-1',
            name: 'us-east-1',
            type: 'region',
            status: 'online',
            connections: ['cloud-3', 'topic-1'],
          },
          {
            id: 'cloud-2',
            name: 'us-west-1',
            type: 'region',
            status: 'online',
            connections: ['cloud-3'],
          },
          {
            id: 'cloud-3',
            name: 'testdb(us-east-1)',
            type: 'database',
            status: 'online',
            connections: ['cloud-1', 'cloud-2', 'topic-2'],
          },
        ],
      },
      {
        name: 'MyTopic',
        type: 'service',
        children: [
          {
            id: 'topic-1',
            name: 'testlam(MyTopic)',
            type: 'topic',
            status: 'online',
            connections: ['cloud-1', 'topic-2'],
          },
          {
            id: 'topic-2',
            name: 'ServiceQueue',
            type: 'queue',
            status: 'warning',
            connections: ['cloud-3', 'topic-1'],
          },
        ],
      },
    ],
  },
};

// Generate cytoscape elements from topology data with connections
const generateElements = (data, viewMode) => {
  const nodes = [];
  const edges = [];
  const deviceMap = new Map();

  const traverse = (node, depth = 0) => {
    if (node.id) {
      // Leaf node with actual device
      nodes.push({
        data: {
          id: node.id,
          label: node.name,
          type: node.type,
          status: node.status,
          ip: node.ip,
          vendor: node.vendor,
          model: node.model,
          depth,
        },
      });
      deviceMap.set(node.id, node);
    } else if (node.children) {
      // Traverse children
      node.children.forEach((child) => traverse(child, depth + 1));
    }
  };

  if (viewMode === 'network') {
    traverse(data.network);
  } else if (viewMode === 'sdn') {
    traverse(data.sdn);
  } else if (viewMode === 'cloud') {
    traverse(data.cloud);
  }

  // Create edges based on connections
  deviceMap.forEach((device, deviceId) => {
    if (device.connections) {
      device.connections.forEach((targetId) => {
        if (deviceMap.has(targetId)) {
          // Only add edge if both nodes exist
          const edgeId = `edge-${deviceId}-${targetId}`;
          const reverseEdgeId = `edge-${targetId}-${deviceId}`;
          
          // Avoid duplicate edges
          if (!edges.some(e => e.data.id === edgeId || e.data.id === reverseEdgeId)) {
            edges.push({
              data: {
                id: edgeId,
                source: deviceId,
                target: targetId,
              },
            });
          }
        }
      });
    }
  });

  return { nodes, edges };
};

// SVG Icons for devices
const DEVICE_ICONS = {
  router: (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v4h-2zm0 6h2v2h-2z"/></svg>`,
  switch: (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}"><path d="M8 11h8v2H8zm0-4h8v2H8zm0 8h8v2H8z"/><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12z"/></svg>`,
  firewall: (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm6 9.09c0 4-2.55 7.7-6 8.83-3.45-1.13-6-4.82-6-8.83v-4.7l6-2.25 6 2.25v4.7z"/></svg>`,
  server: (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}"><path d="M4 6h16v2H4zm0 6h16v2H4zm0 6h16v2H4z"/><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H4V4h16v16z"/></svg>`,
  'access-point': (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`,
  cloud: (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>`,
  database: (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}"><path d="M12 2C6.48 2 2 4.02 2 6.5S6.48 11 12 11s10-2.02 10-4.5S17.52 2 12 2zm0 2c3.31 0 6 1.12 6 2.5S15.31 9 12 9 6 7.88 6 6.5 8.69 4 12 4zm0 16c-3.31 0-6-1.12-6-2.5V15c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5v2.5c0 1.38-2.69 2.5-6 2.5zm0-5c-3.31 0-6-1.12-6-2.5V10c0 1.38 2.69 2.5 6 2.5s6-1.12 6-2.5v2.5c0 1.38-2.69 2.5-6 2.5z"/></svg>`,
  controller: (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}"><path d="M12 2L2 22h20L12 2zm0 3.5L18.5 20H5.5L12 5.5zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z"/></svg>`,
  default: (color) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}"><circle cx="12" cy="12" r="10"/></svg>`,
};

const getIconDataUri = (type, status) => {
  let color = '#8e8e93'; // Default gray
  switch (status) {
    case 'online': color = '#4ade80'; break;
    case 'warning': color = '#fb923c'; break;
    case 'offline': color = '#f87171'; break;
    case 'group': color = '#60a5fa'; break;
  }

  // Map types to icons
  let iconFunc = DEVICE_ICONS.default;
  if (type === 'router') iconFunc = DEVICE_ICONS.router;
  else if (type === 'switch') iconFunc = DEVICE_ICONS.switch;
  else if (type === 'firewall') iconFunc = DEVICE_ICONS.firewall;
  else if (type === 'server') iconFunc = DEVICE_ICONS.server;
  else if (type === 'access-point') iconFunc = DEVICE_ICONS['access-point'];
  else if (['region', 'cloud-provider'].includes(type)) iconFunc = DEVICE_ICONS.cloud;
  else if (['database', 'topic', 'queue'].includes(type)) iconFunc = DEVICE_ICONS.database;
  else if (['controller', 'manager', 'edge'].includes(type)) iconFunc = DEVICE_ICONS.controller;

  const svgString = iconFunc(color);
  const encoded = encodeURIComponent(svgString);
  return `data:image/svg+xml;utf8,${encoded}`;
};

export default function NetworkTopology() {
  const cyRef = useRef(null);
  const containerRef = useRef(null);

  const [viewMode, setViewMode] = useState('network');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLayer3, setShowLayer3] = useState(true);
  const [layoutType, setLayoutType] = useState('cose');
  const [expandedNodes, setExpandedNodes] = useState({});
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showCreateViewModal, setShowCreateViewModal] = useState(false);
  const [focusedNode, setFocusedNode] = useState(null);
  const [showMinimap, setShowMinimap] = useState(true);

  const [scheduleData, setScheduleData] = useState({
    entryPoint: '',
    schedulerType: 'once',
    days: [],
    startDate: '',
    hours: '',
    linkLayer: 'L2',
    protocol: 'CDP (+1)',
    emailRecipients: '',
    smsRecipients: '',
  });

  const [createViewData, setCreateViewData] = useState({
    viewName: '',
    viewGroup: '',
    includeExclude: 'include',
    monitorFilter: '',
    security: 'public',
  });

  // Initialize cytoscape with advanced features
  useEffect(() => {
    if (!containerRef.current) return;

    const { nodes, edges } = generateElements(MOCK_TOPOLOGY_DATA, viewMode);

    const cy = cytoscape({
      container: containerRef.current,
      elements: [...nodes, ...edges],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': (ele) => {
               const status = ele.data('status');
               switch(status) {
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
               switch(status) {
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
      layout: getLayoutConfig(layoutType),
      minZoom: 0.1,
      maxZoom: 5,
      wheelSensitivity: 0.15,
    });

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
          id: deviceData.id,
          label: deviceData.label,
          type: deviceData.type,
          ip: deviceData.ip,
          status: deviceData.status,
          vendor: deviceData.vendor,
          model: deviceData.model,
          location: 'Data Center',
          ports: 24,
          uptime: '120 days',
          cpu: 45,
          memory: 65,
          temperature: 42,
          interfaces: [],
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
      if (cy && !cy.destroyed()) {
        try {
          cy.destroy();
        } catch (error) {
          console.error('Error destroying cytoscape:', error);
        }
      }
      cyRef.current = null;
    };
  }, [viewMode, layoutType]);

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

  const handleZoomIn = () => {
    if (cyRef.current && !cyRef.current.destroyed()) {
      cyRef.current.animate({
        zoom: cyRef.current.zoom() * 1.3,
        duration: 300,
      });
    }
  };

  const handleZoomOut = () => {
    if (cyRef.current && !cyRef.current.destroyed()) {
      cyRef.current.animate({
        zoom: cyRef.current.zoom() * 0.7,
        duration: 300,
      });
    }
  };

  const handleFitView = () => {
    if (cyRef.current && !cyRef.current.destroyed()) {
      cyRef.current.animate({
        fit: { padding: 60 },
        duration: 500,
        easing: 'ease-in-out-cubic',
      });
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.parentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleResetView = () => {
    if (cyRef.current && !cyRef.current.destroyed()) {
      resetFocus(cyRef.current);
      setFocusedNode(null);
      handleFitView();
    }
  };

  const handleRelayout = () => {
    if (cyRef.current && !cyRef.current.destroyed()) {
      const layout = cyRef.current.layout(getLayoutConfig(layoutType));
      layout.run();
    }
  };

  const handleExportPNG = () => {
    if (cyRef.current && !cyRef.current.destroyed()) {
      const png = cyRef.current.png({
        output: 'blob',
        bg: '#0a0f1a',
        full: true,
        scale: 2,
      });
      const url = URL.createObjectURL(png);
      const link = document.createElement('a');
      link.href = url;
      link.download = `topology-${viewMode}-${Date.now()}.png`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleExportJSON = () => {
    if (cyRef.current && !cyRef.current.destroyed()) {
      const json = cyRef.current.json();
      const blob = new Blob([JSON.stringify(json, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `topology-${viewMode}-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  // Render device tree recursively
  const renderTreeNode = (node, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes[node.name];
    const isDevice = !!node.id;

    const getStatusColor = (status) => {
      switch (status) {
        case 'online':
          return styles.statusOnline;
        case 'offline':
          return styles.statusOffline;
        case 'warning':
          return styles.statusWarning;
        default:
          return '';
      }
    };

    const getNodeIcon = (type) => {
      if (type === 'group') return 'mdi:folder';
      if (type === 'vendor') return 'mdi:domain';
      if (type === 'router') return 'mdi:router';
      if (type === 'switch') return 'mdi:switch';
      if (type === 'firewall') return 'mdi:security';
      if (type === 'controller') return 'mdi:server-network';
      if (type === 'cloud-provider') return 'mdi:cloud';
      if (type === 'region') return 'mdi:earth';
      if (type === 'server') return 'mdi:server';
      if (type === 'access-point') return 'mdi:wifi';
      return 'mdi:circle';
    };

    const handleNodeClick = () => {
      if (hasChildren) {
        setExpandedNodes((prev) => ({
          ...prev,
          [node.name]: !prev[node.name],
        }));
      } else if (isDevice && cyRef.current && !cyRef.current.destroyed()) {
        // Focus on this device in the topology
        const cyNode = cyRef.current.getElementById(node.id);
        if (cyNode) {
          focusOnNode(cyRef.current, cyNode);
          setFocusedNode(node.id);
        }
      }
    };

    return (
      <div key={node.name || node.id} className={styles.treeNode}>
        <div
          className={`${styles.treeNodeLabel} ${
            isDevice ? styles.treeNodeDevice : ''
          } ${focusedNode === node.id ? styles.treeNodeFocused : ''}`}
          style={{ paddingLeft: `${depth * 15}px` }}
          onClick={handleNodeClick}
        >
          {hasChildren && (
            <Icon
              icon={isExpanded ? 'mdi:chevron-down' : 'mdi:chevron-right'}
              width={16}
              height={16}
              className={styles.treeNodeChevron}
            />
          )}
          {!hasChildren && <span className={styles.treeNodeSpacer}></span>}
          <Icon
            icon={getNodeIcon(node.type)}
            width={16}
            height={16}
            className={`${styles.treeNodeIcon} ${
              isDevice ? getStatusColor(node.status) : ''
            }`}
          />
          <span className={styles.treeNodeText}>{node.name}</span>
          {isDevice && node.ip && (
            <span className={styles.treeNodeIp}>{node.ip}</span>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className={styles.treeNodeChildren}>
            {node.children.map((child) => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const currentTopologyData = MOCK_TOPOLOGY_DATA[viewMode];

  return (
    <div className={styles.networkTopology}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Icon
            icon="mdi:sitemap"
            width={24}
            height={24}
            className={styles.headerIcon}
          />
          <h1 className={styles.title}>Network Topology</h1>
          <div className={styles.headerStats}>
            <span className={styles.statBadge}>
              <Icon icon="mdi:server-network" width={16} height={16} />
              {cyRef.current?.nodes().length || 0} Devices
            </span>
            <span className={styles.statBadge}>
              <Icon icon="mdi:connection" width={16} height={16} />
              {cyRef.current?.edges().length || 0} Connections
            </span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchBar}>
            <Icon
              icon="mdi:magnify"
              className={styles.searchIcon}
              width={18}
              height={18}
            />
            <input
              type="text"
              placeholder="Search devices..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className={styles.headerBtn}
            onClick={() => setShowCreateViewModal(true)}
            title="Create Topology View"
          >
            <Icon icon="mdi:plus-circle" width={18} height={18} />
            Create View
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Left Sidebar - Device Tree */}
        <div className={styles.leftSidebar}>
          {/* View Mode Tabs */}
          <div className={styles.viewTabs}>
            <button
              className={`${styles.viewTab} ${
                viewMode === 'network' ? styles.viewTabActive : ''
              }`}
              onClick={() => setViewMode('network')}
              title="Network View"
            >
              <Icon icon="mdi:lan" width={20} height={20} />
            </button>
            <button
              className={`${styles.viewTab} ${
                viewMode === 'sdn' ? styles.viewTabActive : ''
              }`}
              onClick={() => setViewMode('sdn')}
              title="SDN View"
            >
              <Icon icon="mdi:network-outline" width={20} height={20} />
            </button>
            <button
              className={`${styles.viewTab} ${
                viewMode === 'cloud' ? styles.viewTabActive : ''
              }`}
              onClick={() => setViewMode('cloud')}
              title="Cloud View"
            >
              <Icon icon="mdi:cloud" width={20} height={20} />
            </button>
          </div>

          {/* Device Tree Search */}
          <div className={styles.treeSearch}>
            <Icon icon="mdi:magnify" width={16} height={16} />
            <input type="text" placeholder="Filter devices..." />
          </div>

          {/* Device Tree */}
          <div className={styles.deviceTree}>
            {currentTopologyData && renderTreeNode(currentTopologyData)}
          </div>

          {/* Legend */}
          <div className={styles.legend}>
            <div className={styles.legendTitle}>Status Legend</div>
            <div className={styles.legendItems}>
              <div className={styles.legendItem}>
                <div className={`${styles.legendDot} ${styles.legendOnline}`}></div>
                <span>Online</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.legendDot} ${styles.legendWarning}`}></div>
                <span>Warning</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.legendDot} ${styles.legendOffline}`}></div>
                <span>Offline</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Topology Canvas */}
        <div className={styles.topologyCanvas}>
          {/* Top Toolbar */}
          <div className={styles.canvasToolbar}>
            <div className={styles.canvasToolbarLeft}>
              <div className={styles.layoutSelector}>
                <Icon icon="mdi:graph" width={16} height={16} />
                <select
                  value={layoutType}
                  onChange={(e) => setLayoutType(e.target.value)}
                  className={styles.layoutSelect}
                >
                  <option value="cose">Force-Directed</option>
                  <option value="circle">Circle</option>
                  <option value="concentric">Concentric</option>
                  <option value="grid">Grid</option>
                  <option value="breadthfirst">Hierarchical</option>
                </select>
              </div>
              <button
                className={styles.toolbarBtn}
                onClick={handleRelayout}
                title="Re-apply Layout"
              >
                <Icon icon="mdi:refresh" width={18} height={18} />
              </button>
              <button
                className={`${styles.layerToggle} ${
                  showLayer3 ? styles.layerToggleActive : ''
                }`}
                onClick={() => setShowLayer3(!showLayer3)}
              >
                <span>Layer 3</span>
                <div className={styles.toggleSwitch}>
                  <div
                    className={`${styles.toggleKnob} ${
                      showLayer3 ? styles.toggleKnobOn : ''
                    }`}
                  ></div>
                </div>
              </button>
            </div>
            <div className={styles.canvasToolbarRight}>
              <button
                className={styles.toolbarBtn}
                onClick={() => setShowScheduleModal(true)}
                title="Schedule Topology"
              >
                <Icon icon="mdi:calendar-clock" width={18} height={18} />
              </button>
              <button
                className={styles.toolbarBtn}
                onClick={handleExportPNG}
                title="Export as PNG"
              >
                <Icon icon="mdi:image-outline" width={18} height={18} />
              </button>
              <button
                className={styles.toolbarBtn}
                onClick={handleExportJSON}
                title="Export as JSON"
              >
                <Icon icon="mdi:code-json" width={18} height={18} />
              </button>
            </div>
          </div>

          {/* Cytoscape Container */}
          <div ref={containerRef} className={styles.cytoscape} />

          {/* Info Panel */}
          {focusedNode && (
            <div className={styles.infoPanel}>
              <div className={styles.infoPanelHeader}>
                <Icon icon="mdi:information" width={18} height={18} />
                <span>Focused Device</span>
                <button
                  className={styles.infoPanelClose}
                  onClick={handleResetView}
                >
                  <Icon icon="mdi:close" width={16} height={16} />
                </button>
              </div>
              <div className={styles.infoPanelContent}>
                <p>Click on neighboring devices to explore connections</p>
                <p>Double-click to center and zoom</p>
              </div>
            </div>
          )}

          {/* Right Controls */}
          <div className={styles.rightControls}>
            <button
              className={styles.controlBtn}
              onClick={handleZoomIn}
              title="Zoom In"
            >
              <Icon icon="mdi:plus" width={20} height={20} />
            </button>
            <button
              className={styles.controlBtn}
              onClick={handleZoomOut}
              title="Zoom Out"
            >
              <Icon icon="mdi:minus" width={20} height={20} />
            </button>
            <button
              className={styles.controlBtn}
              onClick={handleFitView}
              title="Fit to Screen"
            >
              <Icon icon="mdi:fit-to-screen" width={20} height={20} />
            </button>
            <button
              className={styles.controlBtn}
              onClick={handleResetView}
              title="Reset View"
            >
              <Icon icon="mdi:restore" width={20} height={20} />
            </button>
            <button
              className={styles.controlBtn}
              onClick={handleFullscreen}
              title="Fullscreen"
            >
              <Icon icon="mdi:fullscreen" width={20} height={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Device Detail Sidebar */}
      <DeviceDetailSidebar
        device={selectedDevice}
        connections={[]}
        isOpen={showDeviceModal}
        onClose={() => {
          setShowDeviceModal(false);
          setSelectedDevice(null);
        }}
      />

      {/* Schedule Topology Modal */}
      <FilterSidebar
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        title="Schedule Topology"
        filters={[
          {
            key: 'entryPoint',
            type: 'select',
            label: 'Entry Point',
            options: [
              { value: '', label: 'Select' },
              { value: 'router-1', label: 'HB1.hb1.com - (172.16.9.221)' },
              {
                value: 'router-4',
                label: 'PMG-Router.test.com - (172.16.8.90)',
              },
            ],
            placeholder: 'Select entry point',
            required: true,
          },
          {
            key: 'schedulerType',
            type: 'custom',
            label: 'Scheduler Type',
            render: (value, onChange) => (
              <div className={styles.schedulerTypeButtons}>
                {['once', 'daily', 'weekly', 'monthly'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`${styles.schedulerTypeBtn} ${
                      value === type ? styles.schedulerTypeBtnActive : ''
                    }`}
                    onClick={() => onChange(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            ),
          },
          scheduleData.schedulerType === 'weekly' && {
            key: 'days',
            type: 'select',
            label: 'Days',
            isMulti: true,
            options: [
              { value: 'mon', label: 'Monday' },
              { value: 'tue', label: 'Tuesday' },
              { value: 'wed', label: 'Wednesday' },
              { value: 'thu', label: 'Thursday' },
              { value: 'fri', label: 'Friday' },
              { value: 'sat', label: 'Saturday' },
              { value: 'sun', label: 'Sunday' },
            ],
            placeholder: 'Select days',
          },
          {
            key: 'startDate',
            type: 'input',
            label: 'Start Date',
            placeholder: 'MM/DD/YYYY',
            required: true,
          },
          {
            key: 'hours',
            type: 'select',
            label: 'Hours',
            options: Array.from({ length: 24 }, (_, i) => ({
              value: i.toString().padStart(2, '0'),
              label: `${i.toString().padStart(2, '0')}:00`,
            })),
            placeholder: 'Select hour',
            required: true,
          },
          {
            key: 'linkLayer',
            type: 'select',
            label: 'Link Layer',
            options: [
              { value: 'L2', label: 'L2' },
              { value: 'L3', label: 'L3' },
            ],
            required: true,
          },
          {
            key: 'protocol',
            type: 'select',
            label: 'Protocol',
            options: [
              { value: 'CDP (+1)', label: 'CDP (+1)' },
              { value: 'LLDP', label: 'LLDP' },
              { value: 'SNMP', label: 'SNMP' },
            ],
            required: true,
          },
          {
            key: 'emailRecipients',
            type: 'textarea',
            label: 'Notify via Email - Email Recipients',
            placeholder: 'Enter email addresses (comma separated)',
            rows: 2,
          },
          {
            key: 'smsRecipients',
            type: 'textarea',
            label: 'Notify via SMS - SMS Recipients',
            placeholder: 'Enter phone numbers (comma separated)',
            rows: 2,
          },
        ].filter(Boolean)}
        filterValues={scheduleData}
        onFilterChange={(key, value) =>
          setScheduleData((prev) => ({ ...prev, [key]: value }))
        }
        onApply={() => {
          console.log('Schedule topology:', scheduleData);
          setShowScheduleModal(false);
        }}
        onReset={() => {
          setScheduleData({
            entryPoint: '',
            schedulerType: 'once',
            days: [],
            startDate: '',
            hours: '',
            linkLayer: 'L2',
            protocol: 'CDP (+1)',
            emailRecipients: '',
            smsRecipients: '',
          });
        }}
        applyButtonLabel="Create Scheduler"
      />

      {/* Create Topology View Modal */}
      <FilterSidebar
        isOpen={showCreateViewModal}
        onClose={() => setShowCreateViewModal(false)}
        title="Create Topology View"
        filters={[
          {
            key: 'viewName',
            type: 'input',
            label: 'Topology View Name',
            placeholder: 'Enter view name',
            required: true,
          },
          {
            key: 'viewGroup',
            type: 'input',
            label: 'Topology View Group',
            placeholder: '<standalone> or <key:value>',
            helpText: 'Enter a standalone name or key:value pair',
          },
          {
            key: 'includeExclude',
            type: 'custom',
            label: 'Include/Exclude',
            render: (value, onChange) => (
              <div className={styles.includeExcludeButtons}>
                <button
                  type="button"
                  className={`${styles.includeExcludeBtn} ${
                    value === 'include' ? styles.includeExcludeBtnActive : ''
                  }`}
                  onClick={() => onChange('include')}
                >
                  Include
                </button>
                <button
                  type="button"
                  className={`${styles.includeExcludeBtn} ${
                    value === 'exclude' ? styles.includeExcludeBtnActive : ''
                  }`}
                  onClick={() => onChange('exclude')}
                >
                  Exclude
                </button>
              </div>
            ),
          },
          {
            key: 'monitorFilter',
            type: 'select',
            label: 'Monitor Filter',
            options: [
              { value: '', label: 'Select' },
              { value: 'all', label: 'All Monitors' },
              { value: 'network', label: 'Network Devices' },
              { value: 'servers', label: 'Servers' },
            ],
            placeholder: 'Select monitor filter',
          },
          {
            key: 'security',
            type: 'custom',
            label: 'Security',
            render: (value, onChange) => (
              <div className={styles.securityButtons}>
                <button
                  type="button"
                  className={`${styles.securityBtn} ${
                    value === 'public' ? styles.securityBtnActive : ''
                  }`}
                  onClick={() => onChange('public')}
                >
                  Public
                </button>
                <button
                  type="button"
                  className={`${styles.securityBtn} ${
                    value === 'private' ? styles.securityBtnActive : ''
                  }`}
                  onClick={() => onChange('private')}
                >
                  Private
                </button>
              </div>
            ),
            required: true,
          },
        ]}
        filterValues={createViewData}
        onFilterChange={(key, value) =>
          setCreateViewData((prev) => ({ ...prev, [key]: value }))
        }
        onApply={() => {
          console.log('Create topology view:', createViewData);
          setShowCreateViewModal(false);
        }}
        onReset={() => {
          setCreateViewData({
            viewName: '',
            viewGroup: '',
            includeExclude: 'include',
            monitorFilter: '',
            security: 'public',
          });
        }}
        applyButtonLabel="Create Topology View"
      />
    </div>
  );
}
