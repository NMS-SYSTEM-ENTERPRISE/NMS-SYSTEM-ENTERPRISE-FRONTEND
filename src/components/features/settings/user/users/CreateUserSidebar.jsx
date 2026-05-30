import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import { ToggleSwitch } from '@/components/ui/toggle-switch';
import { useFormValidation, required } from '@/hooks/useFormValidation';
import Link from 'next/link';
import mainStyles from '@/screens/settings/shared-settings-styles.module.css';
import localStyles from './styles.module.css';
import classNames from 'classnames';
import { useMemo, useState, useEffect } from 'react';
import { allGroupsApi } from '@/networking/settings/user/groups/group-apis';
import { allRolesApi } from '@/networking/settings/user/roles/role-apis';

/** Create User slide-in sidebar form */
export const CreateUserSidebar = ({
  isOpen,
  onClose,
  user,
  isEditing,
  onChange,
  onSubmit,
  onReset,
  onInfoClick,
}) => {
  const [groupOptions, setGroupOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const fetchOptions = async () => {
        try {
          const [groupsRes, rolesRes] = await Promise.all([
            allGroupsApi({ limit: 100 }),
            allRolesApi({ limit: 100 }),
          ]);
          if (groupsRes?.data?.items) {
            setGroupOptions(
              groupsRes.data.items.map((g) => ({ value: g.id, label: g.name }))
            );
          }
          if (rolesRes?.data?.items) {
            setRoleOptions(
              rolesRes.data.items.map((r) => ({ value: r.id, label: r.name }))
            );
          }
        } catch (err) {
          console.error('Failed to load group/role options:', err);
        }
      };
      fetchOptions();
    }
  }, [isOpen]);

  const validationRules = useMemo(
    () => ({
      firstName: required('First Name is required'),
      lastName: required('Last Name is required'),
      email: required('Email Address is required'),
      username: required('User Name is required'),
      password: required('Password is required'),
      confirmPassword: (value, values) => {
        if (!value?.trim()) return 'Confirm Password is required';
        if (values.password !== value) return 'Passwords do not match';
        return null;
      },
      groupId: required('Groups selection is required'),
      roleId: required('Role selection is required'),
    }),
    []
  );

  const { getFieldError, handleBlur, validateAll, revalidateField } = useFormValidation(
    user,
    validationRules,
    { isActive: isOpen }
  );

  const updateField = (field, value) => {
    onChange(field, value);
    revalidateField(field);
    if (field === 'password') revalidateField('confirmPassword');
  };

  const handleSubmit = () => {
    if (validateAll()) {
      onSubmit();
      return true;
    }
    return false;
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
            onChange={(e) => updateField('firstName', e.target.value)}
            onBlur={() => handleBlur('firstName')}
            error={getFieldError('firstName')}
          />
        </FormField>

        <FormField label="Last Name" required>
          <Input
            type="text"
            value={user.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            onBlur={() => handleBlur('lastName')}
            error={getFieldError('lastName')}
          />
        </FormField>

        <FormField label="Email Address" required>
          <Input
            type="email"
            value={user.email}
            onChange={(e) => updateField('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            error={getFieldError('email')}
          />
        </FormField>

        <FormField label="Mobile Number">
          <Input
            type="tel"
            value={user.mobile}
            onChange={(e) => updateField('mobile', e.target.value)}
            onBlur={() => handleBlur('mobile')}
            error={getFieldError('mobile')}
          />
        </FormField>

        <FormField label="User Name" required>
          <Input
            type="text"
            placeholder="Must be unique"
            value={user.username}
            onChange={(e) => updateField('username', e.target.value)}
            onBlur={() => handleBlur('username')}
            error={getFieldError('username')}
          />
        </FormField>

        <FormField label="Password" required>
          <Input
            type="password"
            placeholder="Do not use simple password"
            value={user.password}
            onChange={(e) => updateField('password', e.target.value)}
            onBlur={() => handleBlur('password')}
            error={getFieldError('password')}
          />
        </FormField>

        <FormField label="Confirm Password" required>
          <Input
            type="password"
            placeholder="Same as the password field"
            value={user.confirmPassword}
            onChange={(e) => updateField('confirmPassword', e.target.value)}
            onBlur={() => handleBlur('confirmPassword')}
            error={getFieldError('confirmPassword')}
          />
        </FormField>

        <FormField label="Status">
          <ToggleSwitch
            checked={user.status}
            onChange={(val) => updateField('status', val)}
            showInlineLabel
          />
        </FormField>

        <FormField label="Groups" required>
          <SelectComponent
            className={mainStyles.formSelect}
            value={user.groupId}
            onChange={(e) => updateField('groupId', e.target.value)}
            onBlur={() => handleBlur('groupId')}
            options={groupOptions}
            placeholder="Select"
            error={getFieldError('groupId')}
          />
          <Link href="/settings/user/groups" className={classNames(mainStyles.link, localStyles.smallLink)}>
            Create Group
          </Link>
        </FormField>

        <FormField label="Role" required>
          <SelectComponent
            className={mainStyles.formSelect}
            value={user.roleId}
            onChange={(e) => updateField('roleId', e.target.value)}
            onBlur={() => handleBlur('roleId')}
            options={roleOptions}
            placeholder="Select"
            error={getFieldError('roleId')}
          />
          <Link href="/settings/user/roles" className={classNames(mainStyles.link, localStyles.smallLink)}>
            Create Role
          </Link>
        </FormField>
      </div>

      <p className={classNames(mainStyles.helpText, localStyles.helpTextMain)}>
        For more information:{' '}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onInfoClick?.();
          }}
          className={mainStyles.link}
        >
          Creating New User
        </a>
      </p>
      <p className={classNames(mainStyles.helpText, localStyles.helpTextSub)}>
        * fields are mandatory
      </p>
    </FilterSidebar>
  );
};
