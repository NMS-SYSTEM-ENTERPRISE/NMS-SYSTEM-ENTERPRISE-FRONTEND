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
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email Address' },
  { key: 'mobile', label: 'Mobile Number' },
  { key: 'username', label: 'User Name' },
  { key: 'status', label: 'Status' },
  { key: 'groups', label: 'Group' },
  { key: 'role', label: 'Role' },
  { key: 'actions', label: 'Actions' },
];

// ─── Select options ───────────────────────────────────────────

/** Groups available for user assignment. */
export const GROUP_OPTIONS = [
  { value: 1, label: 'IT Infrastructure' },
  { value: 2, label: 'Operators' },
  { value: 3, label: 'Viewers' },
];

/** Roles available for user assignment. */
export const ROLE_OPTIONS = [
  { value: 1, label: 'User' },
  { value: 2, label: 'Admin' },
  { value: 3, label: 'Operator' },
];

// ─── Form defaults ────────────────────────────────────────────

/** Default (empty) state for the Create User form. */
export const EMPTY_USER = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  username: '',
  password: '',
  confirmPassword: '',
  status: true,
  groups: '', // Display
  role: '', // Display
  groupId: '', // Form binding
  roleId: '', // Form binding
};

export const USER_TIMELINE_STEPS = [
  { title: 'Define Basic Details', description: 'Enter the user\'s first name, last name, email, and mobile number.' },
  { title: 'Set Credentials', description: 'Provide a unique username and a robust password.' },
  { title: 'Assign Groups & Roles', description: 'Select appropriate groups and define the user\'s role to control access permissions.' },
  { title: 'Activate User', description: 'Toggle the status to Active to allow the user to immediately access the system.' }
];
