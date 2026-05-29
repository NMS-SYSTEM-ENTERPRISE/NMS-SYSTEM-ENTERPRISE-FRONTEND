import mainStyles from '@/screens/settings/shared-settings-styles.module.css';
import localStyles from './styles.module.css';
import classNames from 'classnames';

/**
 * SettingRow — A single labeled row in the password settings list.
 * Renders a label on the left and any control on the right.
 */
export const SettingRow = ({ label, required, noBorder, children }) => (
  <div
    className={classNames(mainStyles.settingRow, { [localStyles.noBorder]: noBorder })}
  >
    <span className={mainStyles.settingLabel}>
      {label}
      {required && <span className={localStyles.requiredAsterisk}>*</span>}
    </span>
    <div className={mainStyles.settingControl}>
      {children}
    </div>
  </div>
);
