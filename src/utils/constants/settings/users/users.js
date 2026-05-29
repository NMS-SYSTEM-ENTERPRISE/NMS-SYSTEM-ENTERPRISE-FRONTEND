/**
 * Constants — Settings > User Management > Users
 *
 * Immutable config: table column definitions, select options,
 * and empty-form defaults. Nothing here should change at runtime.
 */

// ─── Table columns ────────────────────────────────────────────

/** Column definitions for the Users data table. */
export const USERS_COLUMNS = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName',  label: 'Last Name' },
  { key: 'email',     label: 'Email Address' },
  { key: 'mobile',    label: 'Mobile Number' },
  { key: 'username',  label: 'User Name' },
  { key: 'status',    label: 'Status' },
  { key: 'groups',    label: 'Group' },
  { key: 'role',      label: 'Role' },
  { key: 'actions',   label: 'Actions' },
];

// ─── Select options ───────────────────────────────────────────

/** Groups available for user assignment. */
export const GROUP_OPTIONS = [
  { value: 'Admin',     label: 'Admin' },
  { value: 'Operators', label: 'Operators' },
  { value: 'Viewers',   label: 'Viewers' },
];

/** Roles available for user assignment. */
export const ROLE_OPTIONS = [
  { value: 'Admin',    label: 'Admin' },
  { value: 'Operator', label: 'Operator' },
  { value: 'Viewer',   label: 'Viewer' },
];

// ─── Form defaults ────────────────────────────────────────────

/** Default (empty) state for the Create User form. */
export const EMPTY_USER = {
  firstName:       '',
  lastName:        '',
  email:           '',
  mobile:          '',
  username:        '',
  password:        '',
  confirmPassword: '',
  status:          true,
  groups:          '',
  role:            '',
};

export const USER_TIMELINE_STEPS = [
  { title: 'Define Basic Details', description: 'Enter the user\'s first name, last name, email, and mobile number.' },
  { title: 'Set Credentials', description: 'Provide a unique username and a robust password.' },
  { title: 'Assign Groups & Roles', description: 'Select appropriate groups and define the user\'s role to control access permissions.' },
  { title: 'Activate User', description: 'Toggle the status to Active to allow the user to immediately access the system.' }
];
