import { Button } from '@/components/ui/button';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import { useFormValidation, required, selectRequired } from '@/hooks/useFormValidation';
import mainStyles from '@/screens/settings/shared-settings-styles.module.css';
import localStyles from './styles.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { allGroupsApi } from '@/networking/settings/user/groups/group-apis';
import { allRolesApi } from '@/networking/settings/user/roles/role-apis';
import { allUsersApi } from '@/networking/settings/user/users/user-apis';

/** Create User Profile slide-in sidebar */
export const CreateProfileSidebar = ({
  isOpen,
  onClose,
  profile,
  isEditing,
  onChange,
  onSubmit,
  onReset,
  onPreview,
  onInfoClick,
}) => {
  const [groupOptions, setGroupOptions] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const fetchOptions = async () => {
        try {
          const [groupsRes, rolesRes, usersRes] = await Promise.all([
            allGroupsApi({ limit: 100 }),
            allRolesApi({ limit: 100 }),
            allUsersApi({ limit: 100 }),
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
          if (usersRes?.data?.items) {
            setUserOptions(
              usersRes.data.items.map((u) => ({ value: u.id, label: u.username }))
            );
          }
        } catch (err) {
          console.error('Failed to load profile options:', err);
        }
      };
      fetchOptions();
    }
  }, [isOpen]);
  const validationRules = useMemo(
    () => ({
      name: required('Profile Name is required'),
      user: selectRequired('User selection is required'),
      role: selectRequired('Role selection is required'),
      groups: selectRequired('Groups selection is required'),
    }),
    []
  );

  const { getFieldError, handleBlur, validateAll, revalidateField } = useFormValidation(
    profile,
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
    >
      <FormField label="User Profile Name" required>
        <Input
          type="text"
          placeholder="e.g. <Department-Role>"
          value={profile.name}
          onChange={(e) => updateField('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          error={getFieldError('name')}
        />
      </FormField>

      <FormField label="Description">
        <Input
          type="text"
          value={profile.description}
          onChange={(e) => updateField('description', e.target.value)}
          onBlur={() => handleBlur('description')}
          error={getFieldError('description')}
        />
      </FormField>

      <FormField label="User" required>
        <SelectComponent
          className={mainStyles.formSelect}
          value={profile.user}
          onChange={(e) => updateField('user', e.target.value)}
          onBlur={() => handleBlur('user')}
          options={userOptions}
          placeholder="Select User"
          error={getFieldError('user')}
        />
        <Link href="/settings/user/users" className={classNames(mainStyles.link, localStyles.smallLink)}>
          Create User
        </Link>
      </FormField>

      <FormField label="Role" required>
        <SelectComponent
          className={mainStyles.formSelect}
          value={profile.role}
          onChange={(e) => updateField('role', e.target.value)}
          onBlur={() => handleBlur('role')}
          options={roleOptions}
          placeholder="Select"
          error={getFieldError('role')}
        />
        <Link href="/settings/user/roles" className={classNames(mainStyles.link, localStyles.smallLink)}>
          Create Role
        </Link>
      </FormField>

      <FormField label="Groups" required>
        <SelectComponent
          className={mainStyles.formSelect}
          value={profile.groups}
          onChange={(e) => updateField('groups', e.target.value)}
          onBlur={() => handleBlur('groups')}
          options={groupOptions}
          placeholder="Select"
          error={getFieldError('groups')}
        />
        <Link href="/settings/user/groups" className={classNames(mainStyles.link, localStyles.smallLink)}>
          Create Group
        </Link>
      </FormField>

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
          Create User Profile
        </a>
      </p>
      <p className={classNames(mainStyles.helpText, localStyles.helpTextSub)}>
        * fields are mandatory
      </p>
    </FilterSidebar>
  );
};
