import { ROUTE_PATHS } from '@/utils/constants/route-paths';

/** Accent keys map to settings-landing.module.css cardIconAccent* classes */
export const USER_SETTINGS_LANDING_CARDS = [
  {
    icon: 'mdi:account-multiple',
    title: 'User Management',
    description: 'Create and manage user accounts, assign roles and groups',
    path: ROUTE_PATHS.SETTINGS_USER_USERS,
    accent: 'cyan',
  },
  {
    icon: 'mdi:shield-account',
    title: 'Roles',
    description: 'Define roles and manage permissions for different user types',
    path: ROUTE_PATHS.SETTINGS_USER_ROLES,
    accent: 'purple',
  },
  {
    icon: 'mdi:account-group',
    title: 'Groups',
    description: 'Organize users into groups for easier management',
    path: ROUTE_PATHS.SETTINGS_USER_GROUPS,
    accent: 'coral',
  },
  {
    icon: 'mdi:key-variant',
    title: 'Personal Access Token',
    description: 'Generate and manage API access tokens for integrations',
    path: ROUTE_PATHS.SETTINGS_USER_PERSONAL_ACCESS_TOKEN,
    accent: 'green',
  },
  {
    icon: 'mdi:lock',
    title: 'Password Settings',
    description: 'Configure password policies and security requirements',
    path: ROUTE_PATHS.SETTINGS_USER_PASSWORD_SETTINGS,
    accent: 'orange',
  },
  {
    icon: 'mdi:server-network',
    title: 'LDAP Server',
    description: 'Integrate with LDAP/Active Directory for user authentication',
    path: ROUTE_PATHS.SETTINGS_USER_LDAP_SERVER,
    accent: 'violet',
  },
  {
    icon: 'mdi:login-variant',
    title: 'Single Sign-On',
    description: 'Configure SSO with SAML providers (OneLogin, Okta, Azure AD)',
    path: ROUTE_PATHS.SETTINGS_USER_SINGLE_SIGN_ON,
    accent: 'teal',
  },
];

export const USER_SETTINGS_LANDING_HEADER = {
  icon: 'mdi:account-group',
  title: 'User Settings',
  description:
    'Manage users, roles, groups, and authentication settings for your organization',
};
