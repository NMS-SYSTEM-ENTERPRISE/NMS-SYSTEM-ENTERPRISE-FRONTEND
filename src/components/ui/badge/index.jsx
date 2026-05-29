import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * Badge — Status/label pill component.
 *
 * Usage:
 * ```jsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="danger">Inactive</Badge>
 * <Badge variant="info">{count}</Badge>
 * <Badge variant="success" dot>Active</Badge>
 * ```
 *
 * Props:
 * @param {'success'|'danger'|'warning'|'info'|'neutral'|'cyan'} [variant] — Color variant
 * @param {boolean}   [dot]       — Show a colored dot beside the text
 * @param {string}    [className] — Extra className
 * @param {ReactNode} children    — Badge content
 */
const Badge = ({ variant = 'neutral', dot = false, className, children }) => (
  <span className={clsx(styles.badge, styles[`badge_${variant}`], className)}>
    {dot && <span className={styles.badge_dot} aria-hidden />}
    {children}
  </span>
);

export { Badge };
