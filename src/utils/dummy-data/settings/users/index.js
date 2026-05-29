/**
 * Barrel export — Settings > User Management dummy data
 *
 * Import individual modules for better tree-shaking:
 *   import { MOCK_USERS } from '@/utils/dummy-data/settings/users/users';
 *
 * Or import everything at once (use sparingly):
 *   import * as usersData from '@/utils/dummy-data/settings/users';
 */

export * from './users';
export * from './roles';
export * from './user-profiles';
export * from './ldap-server';
export * from './personal-access-token';
