import { useState, useMemo } from 'react';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { PERMISSION_MODULES } from '@/utils/constants/settings/users';
import { PermissionModule } from './PermissionModule';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormValidation, required } from '@/hooks/useFormValidation';
import mainStyles from '@/screens/settings/shared-settings-styles.module.css';
import roleStyles from './styles.module.css';
import classNames from 'classnames';

/** Create Role slide-in sidebar */
export const CreateRoleSidebar = ({
  isOpen,
  onClose,
  role,
  isEditing,
  onChange,
  onSubmit,
  onReset,
  onInfoClick,
}) => {
  const [expandedModules, setExpandedModules] = useState({});

  const validationRules = useMemo(
    () => ({
      name: required('Role Name is required'),
    }),
    []
  );

  const { getFieldError, handleBlur, validateAll, revalidateField } = useFormValidation(
    role,
    validationRules,
    { isActive: isOpen }
  );

  const updateField = (field, value) => {
    onChange(field, value);
    revalidateField(field);
  };

  const handleSubmit = () => {
    if (validateAll()) {
      onSubmit();
      return true;
    }
    return false;
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
          onChange={(e) => updateField('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          error={getFieldError('name')}
        />
      </FormField>

      <FormField label="Role Description" className={roleStyles.fieldWithTopMargin}>
        <Input
          type="text"
          value={role.description}
          onChange={(e) => updateField('description', e.target.value)}
          onBlur={() => handleBlur('description')}
          error={getFieldError('description')}
        />
      </FormField>

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
        For more information:{' '}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onInfoClick?.();
          }}
          className={mainStyles.link}
        >
          Creating New Role
        </a>
      </p>
      <p className={classNames(mainStyles.helpText, roleStyles.helpTextMain)}>
        * fields are mandatory
      </p>
    </FilterSidebar>
  );
};
