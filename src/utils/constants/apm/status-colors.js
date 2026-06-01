export const getServiceStatusColor = (status) => {
  switch (status) {
    case 'healthy':
      return 'var(--color-success)';
    case 'warning':
      return 'var(--color-warning)';
    case 'critical':
      return 'var(--color-danger)';
    default:
      return 'var(--color-text-muted)';
  }
};
