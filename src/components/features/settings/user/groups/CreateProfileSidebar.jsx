import { Button } from '@/components/ui/button';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import {
  PROFILE_USER_OPTIONS as USER_OPTIONS,
  PROFILE_ROLE_OPTIONS as ROLE_OPTIONS,
  PROFILE_GROUP_OPTIONS as GROUP_OPTIONS
} from '@/utils/constants/settings/users';
import mainStyles from '@/screens/settings/shared-settings-styles.module.css';
import localStyles from './styles.module.css';
import classNames from 'classnames';
import Link from 'next/link';

import { useState, useEffect } from 'react';

/** Create User Profile slide-in sidebar */
export const CreateProfileSidebar = ({ isOpen, onClose, profile, isEditing, onChange, onSubmit, onReset, onPreview, onInfoClick }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) setErrors({});
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!profile.name?.trim()) newErrors.name = 'Profile Name is required';
    if (!profile.user || (Array.isArray(profile.user) && profile.user.length === 0)) newErrors.user = 'User selection is required';
    if (!profile.role || (Array.isArray(profile.role) && profile.role.length === 0)) newErrors.role = 'Role selection is required';
    if (!profile.groups || (Array.isArray(profile.groups) && profile.groups.length === 0)) newErrors.groups = 'Groups selection is required';

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

  return (
    <FilterSidebar
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit User Profile' : 'Create User Profile'}
      filters={[]}
      onApply={handleSubmit}
      onReset={onReset}
      applyButtonText={isEditing ? 'Update User Profile' : 'Create User Profile'}
      resetButtonText="Reset"
      customFooterButtons={
        <Button variant="secondary" onClick={onPreview} className={localStyles.previewButton}>
          Preview
        </Button>
      }
    >
      <FormField label="User Profile Name" required>
        <Input
          type="text"
          placeholder="e.g. <Department-Role>"
          value={profile.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          onFocus={() => clearError('name')}
          error={errors.name}
        />
      </FormField>

      <FormField label="Description" className={localStyles.fieldWithTopMargin}>
        <Input
          type="text"
          value={profile.description}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          onFocus={() => clearError('description')}
          error={errors.description}
        />
      </FormField>

      <FormField label="User" required className={localStyles.fieldWithTopMargin}>
        <SelectComponent
          className={mainStyles.formSelect}
          value={profile.user}
          onChange={(e) => handleFieldChange('user', e.target.value)}
          onFocus={() => clearError('user')}
          options={USER_OPTIONS}
          placeholder="Select User"
          error={errors.user}
        />
        <Link href="/settings/user/users" className={classNames(mainStyles.link, localStyles.smallLink)}>Create User</Link>
      </FormField>

      <FormField label="Role" required className={localStyles.fieldWithTopMargin}>
        <SelectComponent
          className={mainStyles.formSelect}
          value={profile.role}
          onChange={(e) => handleFieldChange('role', e.target.value)}
          onFocus={() => clearError('role')}
          options={ROLE_OPTIONS}
          placeholder="Select"
          error={errors.role}
        />
        <Link href="/settings/user/roles" className={classNames(mainStyles.link, localStyles.smallLink)}>Create Role</Link>
      </FormField>

      <FormField label="Groups" required className={localStyles.fieldWithTopMargin}>
        <SelectComponent
          className={mainStyles.formSelect}
          value={profile.groups}
          onChange={(e) => handleFieldChange('groups', e.target.value)}
          onFocus={() => clearError('groups')}
          options={GROUP_OPTIONS}
          placeholder="Select"
          error={errors.groups}
        />
        <Link href="/settings/user/groups" className={classNames(mainStyles.link, localStyles.smallLink)}>Create Group</Link>
      </FormField>

      <p className={classNames(mainStyles.helpText, localStyles.helpTextMain)}>
        For more information: <a href="#" onClick={(e) => { e.preventDefault(); onInfoClick?.(); }} className={mainStyles.link}>Create User Profile</a>
      </p>
      <p className={classNames(mainStyles.helpText, localStyles.helpTextSub)}>
        * fields are mandatory
      </p>
    </FilterSidebar>
  );
};
