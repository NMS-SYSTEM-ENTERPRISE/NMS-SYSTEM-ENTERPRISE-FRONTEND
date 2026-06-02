// Generate cytoscape elements from topology data with connections
export const generateElements = (data, viewMode) => {
  const nodes = [];
  const edges = [];
  const deviceMap = new Map();

  const viewDeviceIds = new Set();
  const collectViewDeviceIds = (node) => {
    if (!node) return;
    if (node.id) {
      viewDeviceIds.add(node.id);
    }
    (node.children || []).forEach(collectViewDeviceIds);
  };

  collectViewDeviceIds(data?.views?.[viewMode]);

  (data?.devices || [])
    .filter((device) => viewDeviceIds.has(device.id))
    .forEach((device) => {
      nodes.push({
        data: {
          ...device,
          label: device.label || device.name,
        },
      });
      deviceMap.set(device.id, device);
    });

  (data?.connections || [])
    .filter((connection) => deviceMap.has(connection.source) && deviceMap.has(connection.target))
    .forEach((connection) => {
      edges.push({
        data: {
          id: connection.id,
          source: connection.source,
          target: connection.target,
          label: connection.label,
          type: connection.type,
        },
      });
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

export const getIconDataUri = (type, status) => {
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
