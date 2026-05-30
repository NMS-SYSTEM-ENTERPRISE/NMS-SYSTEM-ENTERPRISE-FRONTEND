/**
 * Constants — Settings > User Management > Roles
 *
 * Immutable config: table column definitions, permission module
 * structure, and empty-form defaults.
 */

// ─── Table columns ────────────────────────────────────────────

/** Column definitions for the Roles data table. */
export const ROLES_COLUMNS = [
  { key: 'name', label: 'Role Name' },
  { key: 'description', label: 'Role Description' },
  { key: 'userCount', label: 'User Count' },
  { key: 'actions', label: 'Actions', align: 'right' },
];

// ─── Permission modules ───────────────────────────────────────

/**
 * Module + permission definitions used in the Create Role sidebar.
 * Each module has a label, icon, and a list of permissions (read/write/delete).
 */
export const PERMISSION_MODULES = [
  {
    name: 'General Settings',
    icon: 'mdi:folder-cog',
    permissions: [
      { name: 'User Settings', read: true, write: true, delete: false },
      { name: 'System Settings', read: true, write: false, delete: false },
      { name: 'Group Settings', read: true, write: true, delete: false },
      { name: 'My Account', read: true, write: true, delete: true },
    ],
  },
  {
    name: 'Monitoring',
    icon: 'mdi:folder-monitor',
    permissions: [
      { name: 'Policy Settings', read: true, write: true, delete: true },
    ],
  },
  {
    name: 'Visualization',
    icon: 'mdi:folder-eye',
    permissions: [
      { name: 'Dashboard', read: true, write: false, delete: false },
      { name: 'Template', read: false, write: false, delete: false },
      { name: 'Widget', read: true, write: false, delete: false },
      { name: 'Inventory', read: false, write: false, delete: false },
      { name: 'Metric Explorer', read: false, write: false, delete: false },
      { name: 'Log Explorer', read: false, write: false, delete: false },
      { name: 'Flow Explorer', read: false, write: false, delete: false },
      { name: 'NetRoute', read: false, write: false, delete: false },
      { name: 'Trap Explorer', read: false, write: false, delete: false },
      { name: 'Topology', read: false, write: false, delete: false },
    ],
  },
];

// ─── Form defaults ────────────────────────────────────────────

/** Default (empty) state for the Create Role form. */
export const EMPTY_ROLE = {
  name: '',
  description: '',
  permissions: {},
};

export const ROLE_TIMELINE_STEPS = [
  { title: 'Role Definition', description: 'Name the role and provide a clear description of its purpose.' },
  { title: 'Module Permissions', description: 'Select the system modules this role can access.' },
  { title: 'Action Granularity', description: 'Define Read, Read & Write, or Delete permissions per module.' },
  { title: 'Save & Assign', description: 'Create the role so it can be assigned to user profiles.' }
];
