import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import { ToggleSwitch } from '@/components/ui/toggle-switch';
import { GROUP_OPTIONS, ROLE_OPTIONS } from '@/utils/constants/settings/users';
import Link from 'next/link';
import mainStyles from '@/screens/settings/shared-settings-styles.module.css';
import localStyles from './styles.module.css';
import classNames from 'classnames';

import { useState, useEffect } from 'react';

/** Create User slide-in sidebar form */
export const CreateUserSidebar = ({ isOpen, onClose, user, isEditing, onChange, onSubmit, onReset, onInfoClick }) => {
  const [errors, setErrors] = useState({});

  // Clear errors when the modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      setErrors({});
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!user.firstName?.trim()) newErrors.firstName = 'First Name is required';
    if (!user.lastName?.trim()) newErrors.lastName = 'Last Name is required';
    if (!user.email?.trim()) newErrors.email = 'Email Address is required';
    if (!user.username?.trim()) newErrors.username = 'User Name is required';
    if (!user.password?.trim()) newErrors.password = 'Password is required';
    if (!user.confirmPassword?.trim()) newErrors.confirmPassword = 'Confirm Password is required';
    else if (user.password !== user.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (!user.groups || (Array.isArray(user.groups) && user.groups.length === 0)) newErrors.groups = 'Groups selection is required';
    if (!user.role || (Array.isArray(user.role) && user.role.length === 0)) newErrors.role = 'Role selection is required';

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
      title={isEditing ? 'Edit User' : 'Create User'}
      filters={[]}
      onApply={handleSubmit}
      onReset={onReset}
      applyButtonText={isEditing ? 'Update User' : 'Create User'}
    >
      <div className={mainStyles.formGrid}>
        <FormField label="First Name" required>
          <Input
            type="text"
            value={user.firstName}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
            onFocus={() => clearError('firstName')}
            error={errors.firstName}
          />
        </FormField>

        <FormField label="Last Name" required>
          <Input
            type="text"
            value={user.lastName}
            onChange={(e) => handleFieldChange('lastName', e.target.value)}
            onFocus={() => clearError('lastName')}
            error={errors.lastName}
          />
        </FormField>

        <FormField label="Email Address" required>
          <Input
            type="email"
            value={user.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            onFocus={() => clearError('email')}
            error={errors.email}
          />
        </FormField>

        <FormField label="Mobile Number">
          <Input
            type="tel"
            value={user.mobile}
            onChange={(e) => handleFieldChange('mobile', e.target.value)}
            onFocus={() => clearError('mobile')}
            error={errors.mobile}
          />
        </FormField>

        <FormField label="User Name" required>
          <Input
            type="text"
            placeholder="Must be unique"
            value={user.username}
            onChange={(e) => handleFieldChange('username', e.target.value)}
            onFocus={() => clearError('username')}
            error={errors.username}
          />
        </FormField>

        <FormField label="Password" required>
          <Input
            type="password"
            placeholder="Do not use simple password"
            value={user.password}
            onChange={(e) => handleFieldChange('password', e.target.value)}
            onFocus={() => clearError('password')}
            error={errors.password}
          />
        </FormField>

        <FormField label="Confirm Password" required>
          <Input
            type="password"
            placeholder="Same as the password field"
            value={user.confirmPassword}
            onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
            onFocus={() => clearError('confirmPassword')}
            error={errors.confirmPassword}
          />
        </FormField>

        <FormField label="Status">
          <ToggleSwitch
            checked={user.status}
            onChange={(val) => handleFieldChange('status', val)}
            showInlineLabel
          />
        </FormField>

        <FormField label="Groups" required>
          <SelectComponent
            className={mainStyles.formSelect}
            value={user.groups}
            onChange={(e) => handleFieldChange('groups', e.target.value)}
            onFocus={() => clearError('groups')}
            options={GROUP_OPTIONS}
            placeholder="Select"
            error={errors.groups}
          />
          <Link href="/settings/user/groups" className={classNames(mainStyles.link, localStyles.smallLink)}>
            Create Group
          </Link>
        </FormField>

        <FormField label="Role" required>
          <SelectComponent
            className={mainStyles.formSelect}
            value={user.role}
            onChange={(e) => handleFieldChange('role', e.target.value)}
            onFocus={() => clearError('role')}
            options={ROLE_OPTIONS}
            placeholder="Select"
            error={errors.role}
          />
          <Link href="/settings/user/roles" className={classNames(mainStyles.link, localStyles.smallLink)}>
            Create Role
          </Link>
        </FormField>
      </div>

      <p className={classNames(mainStyles.helpText, localStyles.helpTextMain)}>
        For more information:{' '}
        <a href="#" onClick={(e) => { e.preventDefault(); onInfoClick?.(); }} className={mainStyles.link}>Creating New User</a>
      </p>
      <p className={classNames(mainStyles.helpText, localStyles.helpTextSub)}>
        * fields are mandatory
      </p>
    </FilterSidebar>
  );
};
