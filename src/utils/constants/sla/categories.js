/** Sidebar category definitions for SLA list navigation. */
export const SLA_CATEGORIES = [
  { id: 'all', label: 'All SLAs', icon: 'ph:list-bold', colorToken: 'cyan' },
  { id: 'Breached', label: 'Breached', icon: 'ph:warning-circle-bold', colorToken: 'danger' },
  { id: 'Warning', label: 'Warning', icon: 'ph:warning-bold', colorToken: 'warning' },
  { id: 'Ok', label: 'Healthy', icon: 'ph:check-circle-bold', colorToken: 'success' },
];

/** Category IDs that filter by status rather than slaType. */
export const STATUS_CATEGORY_IDS = ['Breached', 'Warning', 'Ok'];
