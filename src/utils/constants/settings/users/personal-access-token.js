/**
 * Constants — Settings > User Management > Personal Access Token
 *
 * Immutable config: table column definitions, select options,
 * and empty-form defaults.
 */

// ─── Table columns ────────────────────────────────────────────

/** Column definitions for the Personal Access Tokens data table. */
export const TOKEN_COLUMNS = [
  { key: 'name',        label: 'Name' },
  { key: 'description', label: 'Description' },
  { key: 'userName',    label: 'User Name' },
  { key: 'token',       label: 'Token' },
  { key: 'createdBy',   label: 'Created By' },
  { key: 'createdTime', label: 'Created Time' },
  { key: 'expiresAt',   label: 'Expires At' },
  { key: 'status',      label: 'Status' },
  { key: 'actions',     label: 'Actions', align: 'right' },
];

// ─── Select options ───────────────────────────────────────────

/**
 * Users who can be assigned as token owners.
 * Replace with a dynamic user list from the API in production.
 */
export const TOKEN_USER_OPTIONS = [
  { value: 'admin', label: 'admin' },
  { value: 'ronak', label: 'ronak' },
];

/** Token validity period options. */
export const TOKEN_VALIDITY_OPTIONS = [
  { value: '30',  label: '30 Days' },
  { value: '60',  label: '60 Days' },
  { value: '90',  label: '90 Days' },
  { value: '365', label: '1 Year' },
];

// ─── Form defaults ────────────────────────────────────────────

/** Default (empty) state for the Create Token form. */
export const EMPTY_TOKEN = {
  name:        '',
  description: '',
  user:        '',
  validity:    '',
  token:       '',
};

export const TOKEN_TIMELINE_STEPS = [
  { title: 'Token Naming', description: 'Assign a descriptive name so the token can be easily identified later.' },
  { title: 'Expiration Policy', description: 'Set an expiration timeframe (e.g., 30 Days) to maintain security hygiene.' },
  { title: 'Assign Target User', description: 'Select the user account this token will authenticate as.' },
  { title: 'Generate & Copy', description: 'Upon creation, securely copy the token string as it will not be shown again.' }
];
