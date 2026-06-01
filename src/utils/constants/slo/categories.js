/** Sidebar category definitions for SLO list navigation. */
export const SLO_CATEGORIES = [
  { id: 'all', label: 'All SLOs', icon: 'ph:list-bold', colorToken: 'cyan' },
  { id: 'Performance', label: 'Performance', icon: 'ph:gauge-bold', colorToken: 'violet' },
  { id: 'Availability', label: 'Availability', icon: 'ph:globe-bold', colorToken: 'success' },
  { id: 'Breached', label: 'Breached', icon: 'ph:warning-circle-bold', colorToken: 'danger' },
  { id: 'Warning', label: 'Warning', icon: 'ph:warning-bold', colorToken: 'warning' },
  { id: 'Ok', label: 'Healthy', icon: 'ph:check-circle-bold', colorToken: 'success' },
];

/** Category IDs that filter by status rather than sloType. */
export const STATUS_CATEGORY_IDS = ['Breached', 'Warning', 'Ok'];
