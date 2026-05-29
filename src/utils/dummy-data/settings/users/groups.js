/**
 * Dummy data — Settings > User Management > Groups (User Profiles)
 * Replace with real API responses when backend is ready.
 */

/** @type {import('./types').UserProfile[]} */
export const MOCK_PROFILES = [
  {
    id: 1,
    name: 'ENGINEERING-Read-only',
    description: 'THIS IS USER PROFILE FOR ENGINEERING TEAM WITH READ ONLY ACCESS',
    scopeBy: 'Group',
  },
  {
    id: 2,
    name: 'Test-Admin',
    description: 'THIS IS USER PROFILE FOR THE TEST TEAM',
    scopeBy: 'Group',
  },
];

/** Preview results shown when "Preview" is clicked in the Create User Profile sidebar. */
export const MOCK_PREVIEW_RESULTS = [
  {
    id: 1,
    monitor: 'cisco2960.snr-edatas.local',
    ip: '172.16.10.43',
    host: 'cisco2960.snr-edatas.local',
    type: 'mdi:server-network',
    groups: ['Network'],
  },
  {
    id: 2,
    monitor: 'Zenil-Kapadia',
    ip: '10.20.41.174',
    host: 'zenil-kapadia',
    type: 'mdi:microsoft-windows',
    groups: ['Server > Windows'],
  },
  {
    id: 3,
    monitor: 'sql-node-2',
    ip: '172.16.9.259',
    host: 'sqlnode2.sqlcluster.local',
    type: 'mdi:microsoft-windows',
    groups: ['Server > Windows'],
  },
  {
    id: 4,
    monitor: 'win-node1-hyperv-node',
    ip: '172.16.8.98',
    host: 'win-node1exchange19.local',
    type: 'mdi:virtualization',
    groups: ['Virtualization'],
  },
  {
    id: 5,
    monitor: 'win-ec2-01-c6234',
    ip: '172.16.8.57',
    host: 'win-ec2-01-c6234',
    type: 'mdi:microsoft-windows',
    groups: ['Server > Windows'],
  },
  {
    id: 6,
    monitor: 'snr-edatas-231',
    ip: '172.16.15.231',
    host: 'snr-edatas-231',
    type: 'mdi:linux',
    groups: ['Server > Linux'],
  },
];

/** Total count used for preview pagination (would come from API in production). */
export const PREVIEW_TOTAL_ITEMS = 165;
