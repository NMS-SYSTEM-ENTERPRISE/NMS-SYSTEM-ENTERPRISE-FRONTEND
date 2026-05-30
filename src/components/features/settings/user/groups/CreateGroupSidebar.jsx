import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { useFormValidation, required } from '@/hooks/useFormValidation';
import mainStyles from '@/screens/settings/shared-settings-styles.module.css';
import { useMemo } from 'react';

export const CreateGroupSidebar = ({
  isOpen,
  onClose,
  group,
  isEditing,
  onChange,
  onSubmit,
  onReset,
  onInfoClick,
}) => {
  const validationRules = useMemo(
    () => ({
      name: required('Group Name is required'),
      description: required('Description is required'),
    }),
    []
  );

  const { getFieldError, handleBlur, validateAll, revalidateField } = useFormValidation(
    group,
    validationRules,
    { isActive: isOpen }
  );

  const updateField = (field, value) => {
    onChange(field, value);
    revalidateField(field);
  };

  const handleSave = () => {
    if (validateAll()) {
      onSubmit();
    }
  };

  return (
    <FilterSidebar
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Group' : 'Create Group'}
      onApply={handleSave}
      onReset={onReset}
      applyButtonText={isEditing ? 'Update Group' : 'Create Group'}
      resetButtonText="Reset"
    >
      <div className={mainStyles.formGrid}>
          <FormField label="Group Name" required>
            <Input
              value={group.name}
              onChange={(e) => updateField('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              error={getFieldError('name')}
            />
          </FormField>
          <FormField label="Description" required>
            <Input
              value={group.description}
              onChange={(e) => updateField('description', e.target.value)}
              onBlur={() => handleBlur('description')}
              error={getFieldError('description')}
            />
          </FormField>
        </div>

        <p className={mainStyles.helpText} style={{ marginTop: 'var(--margin-lg)' }}>
          For more information:{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onInfoClick?.();
            }}
            className={mainStyles.linkBlue}
          >
            Creating New Group
          </a>
        </p>
        <p className={mainStyles.helpText} style={{ marginTop: 'var(--margin-sm)' }}>
          * fields are mandatory
        </p>
    </FilterSidebar>
  );
};
