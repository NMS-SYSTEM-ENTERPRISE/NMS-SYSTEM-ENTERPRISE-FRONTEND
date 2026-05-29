import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/ui/form-field';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import classNames from 'classnames';

import mainStyles from '@/screens/settings/shared-settings-styles.module.css';

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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) setErrors({});
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!group.name?.trim()) newErrors.name = 'Group Name is required';
    if (!group.description?.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSubmit();
    }
  };

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
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
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          <FormField label="Group Name" required error={errors.name}>
            <Input
              value={group.name}
              onChange={(e) => onChange('name', e.target.value)}
              onFocus={() => clearError('name')}
            />
          </FormField>
          <FormField label="Description" required error={errors.description}>
            <Input
              value={group.description}
              onChange={(e) => onChange('description', e.target.value)}
              onFocus={() => clearError('description')}
            />
          </FormField>
        </div>

        <p className={mainStyles.helpText} style={{ marginTop: '24px' }}>
          For more information: <a href="#" onClick={(e) => { e.preventDefault(); onInfoClick(); }} className={mainStyles.linkBlue}>Creating New Group</a>
        </p>
        <p className={mainStyles.helpText} style={{ marginTop: '8px' }}>
          * fields are mandatory
        </p>
      </div>
    </FilterSidebar>
  );
};
