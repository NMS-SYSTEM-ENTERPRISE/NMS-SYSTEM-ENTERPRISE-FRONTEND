/**
 * Dummy data — Settings > User Management > Users
 * Replace with real API responses when backend is ready.
 */

/** @type {import('./types').User[]} */
export const MOCK_USERS = [
  {
    id: 1,
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    mobile: '',
    username: 'admin',
    status: 'Active',
    groups: 'Admin',
    role: 'Admin',
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    mobile: '+1234567890',
    username: 'john.doe',
    status: 'Active',
    groups: 'Operators',
    role: 'Operator',
  },
  {
    id: 3,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    mobile: '',
    username: 'jane.smith',
    status: 'Inactive',
    groups: 'Viewers',
    role: 'Viewer',
  },
];
