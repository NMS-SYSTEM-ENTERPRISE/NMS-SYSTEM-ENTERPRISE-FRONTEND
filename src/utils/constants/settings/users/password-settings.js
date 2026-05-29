/**
 * Constants — Settings > User Management > Password Settings
 *
 * Immutable config: toggle row definitions and default policy values.
 * No table or select options needed — this is a pure settings form.
 */

// ─── Toggle rows ──────────────────────────────────────────────

/**
 * Ordered list of boolean password policy settings rendered as toggle rows.
 * Each entry maps to a key in the settings state object.
 */
export const PASSWORD_TOGGLE_ROWS = [
  { key: 'uppercase',   label: 'Password Uppercase' },
  { key: 'lowercase',   label: 'Password Lowercase' },
  { key: 'number',      label: 'Password with Number' },
  { key: 'specialChar', label: 'Password with Special Character' },
];

// ─── Form defaults ────────────────────────────────────────────

/** Default password policy settings (matches system out-of-box defaults). */
export const DEFAULT_PASSWORD_SETTINGS = {
  expiry:      true,
  expiryDays:  15,
  uppercase:   true,
  lowercase:   true,
  number:      true,
  specialChar: true,
  length:      8,
};

export const PASSWORD_TIMELINE_STEPS = [
  { title: 'Define Expiry', description: 'Enable password expiration to force periodic credential rotation.' },
  { title: 'Enforce Complexity', description: 'Require uppercase, lowercase, numbers, and special characters.' },
  { title: 'Set Minimum Length', description: 'Establish a baseline character length to prevent weak passwords.' },
  { title: 'Save & Apply', description: 'Apply these rules globally across all user accounts instantly.' }
];
