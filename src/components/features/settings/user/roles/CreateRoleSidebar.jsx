import { useState, useEffect } from 'react';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { PERMISSION_MODULES } from '@/utils/constants/settings/users';
import { PermissionModule } from './PermissionModule';
import { Checkbox } from '@/components/ui/checkbox';
import mainStyles from '@/screens/settings/shared-settings-styles.module.css';
import roleStyles from './styles.module.css';
import classNames from 'classnames';

/** Create Role slide-in sidebar */
export const CreateRoleSidebar = ({ isOpen, onClose, role, isEditing, onChange, onSubmit, onReset, onInfoClick }) => {
  const [expandedModules, setExpandedModules] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) setErrors({});
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!role.name?.trim()) newErrors.name = 'Role Name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit();
      return true;
    }
    return false;
  };

  const handleFieldChange = (field, value) => {
    onChange(field, value);
    clearError(field);
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const toggleModule = (name) =>
    setExpandedModules((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <FilterSidebar
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Role' : 'Create Role'}
      filters={[]}
      onApply={handleSubmit}
      onReset={onReset}
      applyButtonText={isEditing ? 'Update Role' : 'Create Role'}
      resetButtonText="Reset"
    >
      <FormField label="Role Name" required>
        <Input
          type="text"
          placeholder="Must be unique"
          value={role.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          onFocus={() => clearError('name')}
          error={errors.name}
        />
      </FormField>

      <FormField label="Role Description" className={roleStyles.fieldWithTopMargin}>
        <Input
          type="text"
          value={role.description}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          onFocus={() => clearError('description')}
          error={errors.description}
        />
      </FormField>

      {/* Permissions matrix header */}
      <div className={roleStyles.permissionsHeader}>
        <div className={roleStyles.permissionsHeaderLeft}>
          <Checkbox label="All Module" />
        </div>
        <div className={roleStyles.permissionsHeaderRight}>
          <Checkbox label="Read" />
          <Checkbox label="Read & Write" />
          <Checkbox label="Delete" />
        </div>
      </div>

      {PERMISSION_MODULES.map((mod) => (
        <PermissionModule
          key={mod.name}
          module={mod}
          isExpanded={!!expandedModules[mod.name]}
          onToggle={() => toggleModule(mod.name)}
        />
      ))}

      <p className={classNames(mainStyles.helpText, roleStyles.helpTextMain)}>
        For more information: <a href="#" onClick={(e) => { e.preventDefault(); onInfoClick?.(); }} className={mainStyles.link}>Creating New Role</a>
      </p>
      <p className={classNames(mainStyles.helpText, roleStyles.helpTextMain)}>
        * fields are mandatory
      </p>
    </FilterSidebar>
  );
};
