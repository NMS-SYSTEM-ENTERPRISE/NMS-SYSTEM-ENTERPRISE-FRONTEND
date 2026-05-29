/**
 * Dummy data — Settings > User Management > Roles
 * Replace with real API responses when backend is ready.
 */

/** @type {import('./types').Role[]} */
export const MOCK_ROLES = [
  { id: 1, name: 'Admin',    description: 'Full access',      userCount: 5  },
  { id: 2, name: 'Operator', description: 'Limited access',   userCount: 12 },
  { id: 3, name: 'Viewer',   description: 'Read-only access', userCount: 8  },
];
