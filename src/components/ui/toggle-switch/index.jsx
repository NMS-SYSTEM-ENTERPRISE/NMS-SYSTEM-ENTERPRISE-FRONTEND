import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * ToggleSwitch — Reusable ON/OFF toggle component.
 *
 * Usage:
 * ```jsx
 * // Basic
 * <ToggleSwitch checked={isOn} onChange={(val) => setIsOn(val)} />
 *
 * // With label
 * <ToggleSwitch
 *   checked={settings.expiry}
 *   onChange={(val) => setSettings(s => ({...s, expiry: val}))}
 *   label="Password Expiry"
 *   size="md"
 * />
 *
 * // Show ON/OFF text inside track
 * <ToggleSwitch checked={isOn} onChange={setIsOn} showInlineLabel />
 * ```
 *
 * Props:
 * @param {boolean}          checked          — Controlled checked state
 * @param {Function}         onChange         — Called with new boolean value: (checked: boolean) => void
 * @param {string}           [label]          — External label text shown beside the toggle
 * @param {'left'|'right'}   [labelPosition]  — Label placement (default: 'right')
 * @param {'sm'|'md'|'lg'}   [size]           — Toggle size (default: 'md')
 * @param {boolean}          [disabled]       — Disables the control
 * @param {boolean}          [showInlineLabel]— Shows ON/OFF text inside the track pill
 * @param {string}           [id]             — HTML id for accessibility
 * @param {string}           [className]      — Extra class for the wrapper
 */
const ToggleSwitch = ({
  checked = false,
  onChange,
  label,
  labelPosition = 'right',
  size = 'md',
  disabled = false,
  showInlineLabel = false,
  id,
  className,
}) => {
  const handleToggle = () => {
    if (!disabled && onChange) onChange(!checked);
  };

  const trackClass = clsx(
    styles.track,
    checked && styles.track_on,
    size === 'sm' && styles.track_sm,
    size === 'lg' && styles.track_lg,
  );

  const labelEl = label && (
    <span
      className={clsx(styles.label, disabled && styles.label_disabled)}
      onClick={handleToggle}
    >
      {label}
    </span>
  );

  return (
    <div className={clsx(styles.wrapper, className)}>
      {label && labelPosition === 'left' && labelEl}

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={trackClass}
        onClick={handleToggle}
      >
        <span className={styles.thumb} />
        {showInlineLabel && (
          <span className={styles.inlineLabel}>
            {checked ? 'ON' : 'OFF'}
          </span>
        )}
      </button>

      {label && labelPosition === 'right' && labelEl}
    </div>
  );
};

export { ToggleSwitch };
