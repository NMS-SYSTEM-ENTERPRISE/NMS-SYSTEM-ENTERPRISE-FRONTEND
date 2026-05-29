import { Icon } from '@iconify/react';
import { Checkbox } from '@/components/ui/checkbox';
import roleStyles from './styles.module.css';

/** Permission module row inside Create Role sidebar */
export const PermissionModule = ({ module, isExpanded, onToggle }) => (
  <div className={roleStyles.permissionModule}>
    <div className={roleStyles.moduleHeader} onClick={onToggle}>
      <div className={roleStyles.moduleHeaderLeft}>
        <Icon icon={isExpanded ? 'mdi:chevron-down' : 'mdi:chevron-right'} width={20} />
        <Icon icon={module.icon} width={20} />
        <Checkbox label={module.name} onClick={(e) => e.stopPropagation()} />
      </div>
      <div className={roleStyles.moduleHeaderRight}>
        <Checkbox onClick={(e) => e.stopPropagation()} />
        <Checkbox onClick={(e) => e.stopPropagation()} />
        <Checkbox onClick={(e) => e.stopPropagation()} />
      </div>
    </div>
    {isExpanded && (
      <div className={roleStyles.permissionsList}>
        {module.permissions.map((perm) => (
          <div key={perm.name} className={roleStyles.permissionItem}>
            <div className={roleStyles.permissionName}>
              <Checkbox label={perm.name} />
            </div>
            <div className={roleStyles.permissionChecks}>
              <Checkbox defaultChecked={perm.read} />
              <Checkbox defaultChecked={perm.write} />
              <Checkbox defaultChecked={perm.delete} />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
