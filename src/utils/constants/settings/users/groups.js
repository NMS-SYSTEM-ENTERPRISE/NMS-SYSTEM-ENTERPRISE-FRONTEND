/**
 * Constants — Settings > User Management > Groups (User Profiles)
 *
 * Immutable config: table column definitions, select options,
 * and empty-form defaults.
 */

// ─── Table columns ────────────────────────────────────────────

/** Column definitions for the User Profiles data table. */
export const GROUPS_COLUMNS = [
  { key: 'name', label: 'User Profile Name' },
  { key: 'description', label: 'Description' },
  { key: 'scopeBy', label: 'Scope By' },
  { key: 'actions', label: 'Actions' },
];

/** Column definitions for the Preview Results modal table. */
export const PREVIEW_COLUMNS = [
  { key: 'monitor', label: 'Monitor' },
  { key: 'ip', label: 'IP' },
  { key: 'host', label: 'Host' },
  { key: 'type', label: 'Type' },
  { key: 'groups', label: 'Groups' },
];

// ─── Select options ───────────────────────────────────────────

/** Users available to assign to a profile. */
export const PROFILE_USER_OPTIONS = [
  { value: 'Admin', label: 'Admin' },
  { value: 'John Doe', label: 'John Doe' },
];

/** Roles available to assign to a profile. */
export const PROFILE_ROLE_OPTIONS = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Operator', label: 'Operator' },
];

/** Groups available to assign to a profile. */
export const PROFILE_GROUP_OPTIONS = [
  { value: 'Network', label: 'Network' },
  { value: 'Server', label: 'Server' },
];

// ─── Form defaults ────────────────────────────────────────────

/** Default (empty) state for the Create User Profile form. */
export const EMPTY_PROFILE = {
  name: '',
  description: '',
  user: '',
  role: '',
  groups: '',
};

export const GROUP_TIMELINE_STEPS = [
  { title: 'Profile Identification', description: 'Provide a clear name and description for the user profile.' },
  { title: 'Assign Target Users', description: 'Select the user account this profile belongs to.' },
  { title: 'Determine Role & Scope', description: 'Map the appropriate role and access groups.' },
  { title: 'Preview & Confirm', description: 'Review the effective permissions before creating the profile.' }
];
