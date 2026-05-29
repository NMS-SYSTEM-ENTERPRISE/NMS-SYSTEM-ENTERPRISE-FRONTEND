import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import {
  TOKEN_USER_OPTIONS as USER_OPTIONS,
  TOKEN_VALIDITY_OPTIONS as VALIDITY_OPTIONS
} from '@/utils/constants/settings/users';
import { TokenInputRow } from './TokenInputRow';
import mainStyles from '@/screens/settings/shared-settings-styles.module.css';
import localStyles from './styles.module.css';
import classNames from 'classnames';

import { useState, useEffect } from 'react';

/** Create Personal Access Token slide-in sidebar */
export const CreateTokenSidebar = ({ isOpen, onClose, token, isEditing, onChange, onSubmit, onReset, onInfoClick, onGenerate }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) setErrors({});
  }, [isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!token.name?.trim()) newErrors.name = 'Token Name is required';
    if (!token.user || (Array.isArray(token.user) && token.user.length === 0)) newErrors.user = 'User selection is required';
    if (!token.validity || (Array.isArray(token.validity) && token.validity.length === 0)) newErrors.validity = 'Validity selection is required';

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
      title={isEditing ? 'Edit Personal Access Token' : 'Create Personal Access Token'}
      filters={[]}
      onApply={handleSubmit}
      onReset={onReset}
      applyButtonText={isEditing ? 'Update Token' : 'Create Token'}
      resetButtonText="Reset"
    >
      <FormField label="Token Name" required>
        <Input
          type="text"
          value={token.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          onFocus={() => clearError('name')}
          error={errors.name}
        />
      </FormField>

      <FormField label="Description" className={localStyles.fieldWithTopMargin}>
        <Input
          type="text"
          value={token.description}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          onFocus={() => clearError('description')}
          error={errors.description}
        />
      </FormField>

      <FormField label="User" required className={localStyles.fieldWithTopMargin}>
        <SelectComponent
          className={mainStyles.formSelect}
          value={token.user}
          onChange={(e) => handleFieldChange('user', e.target.value)}
          onFocus={() => clearError('user')}
          options={USER_OPTIONS}
          placeholder="Select"
          error={errors.user}
        />
      </FormField>

      <FormField label="Validity" required className={localStyles.fieldWithTopMargin}>
        <SelectComponent
          className={mainStyles.formSelect}
          value={token.validity}
          onChange={(e) => handleFieldChange('validity', e.target.value)}
          onFocus={() => clearError('validity')}
          options={VALIDITY_OPTIONS}
          placeholder="Select"
          error={errors.validity}
        />
      </FormField>

      <FormField label="Personal Access Token" className={localStyles.fieldWithTopMargin}>
        <TokenInputRow
          value={token.token}
          onGenerate={() => onGenerate?.()}
        />
      </FormField>

      <p className={classNames(mainStyles.helpText, localStyles.helpTextMain)}>
        For more information: <a href="#" onClick={(e) => { e.preventDefault(); onInfoClick?.(); }} className={mainStyles.link}>Personal Access Token</a>
      </p>
      <p className={classNames(mainStyles.helpText, localStyles.helpTextSub)}>
        * fields are mandatory
      </p>
    </FilterSidebar>
  );
};
