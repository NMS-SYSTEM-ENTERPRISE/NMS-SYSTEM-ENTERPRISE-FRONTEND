/**
 * Constants — Settings > User Management > LDAP Server
 *
 * Immutable config: table column definitions, select options,
 * and empty-form defaults.
 */

// ─── Table columns ────────────────────────────────────────────

/** Column definitions for the LDAP Servers data table. */
export const LDAP_COLUMNS = [
  { key: 'ipHost',     label: 'IP/Host' },
  { key: 'fqdn',       label: 'FQDN' },
  { key: 'ldapGroups', label: 'LDAP Groups' },
  { key: 'lastSyncAt', label: 'Last Sync At' },
  { key: 'sync',       label: 'Sync' },
  { key: 'actions',    label: 'Actions', align: 'right' },
];

// ─── Select options ───────────────────────────────────────────

/** Directory server type options. */
export const SERVER_TYPE_OPTIONS = [
  { value: 'Microsoft AD', label: 'Microsoft AD' },
  { value: 'OpenLDAP',     label: 'OpenLDAP' },
];

// ─── Form defaults ────────────────────────────────────────────

/** Default (empty) state for the Add LDAP Server form. */
export const EMPTY_LDAP_SERVER = {
  primaryIpHost:       '',
  secondaryIpHost:     '',
  domainName:          '',
  serverType:          'Microsoft AD',
  secureLdap:          false,
  port:                '389',
  userName:            '',
  password:            '',
  ldapAuthentication:  false,
  autoSync:            false,
  ldapGroups:          '',
};

export const LDAP_TIMELINE_STEPS = [
  { title: 'Server Configuration', description: 'Enter the primary/secondary IP, Domain, and Port of your LDAP/AD server.' },
  { title: 'Authentication Setup', description: 'Provide valid credentials and test the connection securely.' },
  { title: 'Group Mapping', description: 'Define the LDAP groups to sync and associate them with local roles.' },
  { title: 'Sync Settings', description: 'Enable Auto Sync to keep user data fresh automatically.' }
];
