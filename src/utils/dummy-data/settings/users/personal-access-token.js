/**
 * Dummy data — Settings > User Management > Personal Access Token
 * Replace with real API responses when backend is ready.
 */

/** @type {import('./types').AccessToken[]} */
export const MOCK_TOKENS = [
  {
    id: 1,
    name: 'api',
    description: 'for API test in postman',
    userName: 'admin',
    token: '****************',
    createdBy: 'admin',
    createdTime: '2024-01-15 10:30:00',
    expiresAt: '2025-01-15 10:30:00',
    status: 'Active',
  },
  {
    id: 2,
    name: 'server-token',
    description: "token is used in server's postman collection",
    userName: 'admin',
    token: '****************',
    createdBy: 'admin',
    createdTime: '2024-02-20 14:15:00',
    expiresAt: '2025-02-20 14:15:00',
    status: 'Active',
  },
  {
    id: 3,
    name: 'LDAP User Token',
    description: 'This token is for Ronak user',
    userName: 'ronak',
    token: '****************',
    createdBy: 'admin',
    createdTime: '2024-03-10 09:45:00',
    expiresAt: '2025-03-10 09:45:00',
    status: 'Active',
  },
];
