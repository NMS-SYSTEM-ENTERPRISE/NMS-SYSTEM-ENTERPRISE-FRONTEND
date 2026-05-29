/**
 * Constants — Settings > User Management > Groups
 *
 * Immutable config: table column definitions, select options,
 * and empty-form defaults.
 */

// ─── Table columns ────────────────────────────────────────────

/** Column definitions for the Groups data table. */
export const GROUPS_COLUMNS = [
  { key: 'name', label: 'Group Name' },
  { key: 'description', label: 'Description' },
  { key: 'userCount', label: 'User Count' },
  { key: 'actions', label: 'Actions' },
];

// ─── Form defaults ────────────────────────────────────────────

/** Default (empty) state for the Create Group form. */
export const EMPTY_GROUP = {
  name: '',
  description: '',
};

export const GROUP_TIMELINE_STEPS = [
  { title: 'Group Definition', description: 'Provide a unique name and clear description for the group.' },
  { title: 'Review Settings', description: 'Review the details before finalizing group creation.' }
];
