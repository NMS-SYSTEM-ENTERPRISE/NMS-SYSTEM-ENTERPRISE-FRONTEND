/**
 * Constants — Settings > User Management > LDAP Server
 *
 * Immutable config: table column definitions, select options,
 * and empty-form defaults.
 */

// ─── Table columns ────────────────────────────────────────────

/** Column definitions for the LDAP Servers data table (API field keys). */
export const LDAP_COLUMNS = [
  { key: 'primary_host', label: 'IP/HOST' },
  { key: 'domain_name', label: 'DOMAIN' },
  { key: 'server_type', label: 'SERVER TYPE' },
  { key: 'ldap_groups', label: 'LDAP GROUPS' },
  { key: 'actions', label: 'ACTIONS' },
];

/** @deprecated Use LDAP_COLUMNS */
export const LDAP_TABLE_COLUMNS = LDAP_COLUMNS;

// ─── Select options ───────────────────────────────────────────

/** Directory server type options. */
export const SERVER_TYPE_OPTIONS = [
  { value: 'Microsoft AD', label: 'Microsoft AD' },
  { value: 'OpenLDAP',     label: 'OpenLDAP' },
];

// ─── Form defaults ────────────────────────────────────────────

/** Default (empty) state for the Add LDAP Server form (API field keys). */
export const EMPTY_LDAP_SERVER = {
  primary_host: '',
  secondary_host: '',
  domain_name: '',
  server_type: 'Microsoft AD',
  secure_ldap: false,
  port: '389',
  user_name: '',
  password: '',
  ldap_auth: false,
  auto_sync: false,
  ldap_groups: '',
};

export const LDAP_TIMELINE_STEPS = [
  { title: 'Server Configuration', description: 'Enter the primary/secondary IP, Domain, and Port of your LDAP/AD server.' },
  { title: 'Authentication Setup', description: 'Provide valid credentials and test the connection securely.' },
  { title: 'Group Mapping', description: 'Define the LDAP groups to sync and associate them with local roles.' },
  { title: 'Sync Settings', description: 'Enable Auto Sync to keep user data fresh automatically.' }
];
