/** Returns sparkline height tier (1–7) for CSS class mapping. */
export const getSparklineHeightTier = (value) =>
  Math.min(7, Math.max(1, Math.round((value - 70) / 4)));

/** Returns color token for sparkline blocks. */
export const getSparklineColorToken = (value, target) => {
  if (value >= target) return 'Success';
  if (value > 80) return 'Warning';
  return 'Danger';
};
