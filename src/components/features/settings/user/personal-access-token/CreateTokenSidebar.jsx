import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import {
  TOKEN_USER_OPTIONS as USER_OPTIONS,
  TOKEN_VALIDITY_OPTIONS as VALIDITY_OPTIONS,
} from '@/utils/constants/settings/users';
import { TokenInputRow } from './TokenInputRow';
import { useFormValidation, required, selectRequired } from '@/hooks/useFormValidation';
import mainStyles from '@/screens/settings/shared-settings-styles.module.css';
import localStyles from './styles.module.css';
import classNames from 'classnames';
import { useMemo } from 'react';

/** Create Personal Access Token slide-in sidebar */
export const CreateTokenSidebar = ({
  isOpen,
  onClose,
  token,
  isEditing,
  onChange,
  onSubmit,
  onReset,
  onInfoClick,
  onGenerate,
}) => {
  const validationRules = useMemo(
    () => ({
      name: required('Token Name is required'),
      user: selectRequired('User selection is required'),
      validity: selectRequired('Validity selection is required'),
    }),
    []
  );

  const { getFieldError, handleBlur, validateAll, revalidateField } = useFormValidation(
    token,
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
          onChange={(e) => updateField('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          error={getFieldError('name')}
        />
      </FormField>

      <FormField label="Description">
        <Input
          type="text"
          value={token.description}
          onChange={(e) => updateField('description', e.target.value)}
          onBlur={() => handleBlur('description')}
          error={getFieldError('description')}
        />
      </FormField>

      <FormField label="User" required>
        <SelectComponent
          className={mainStyles.formSelect}
          value={token.user}
          onChange={(e) => updateField('user', e.target.value)}
          onBlur={() => handleBlur('user')}
          options={USER_OPTIONS}
          placeholder="Select"
          error={getFieldError('user')}
        />
      </FormField>

      <FormField label="Validity" required>
        <SelectComponent
          className={mainStyles.formSelect}
          value={token.validity}
          onChange={(e) => updateField('validity', e.target.value)}
          onBlur={() => handleBlur('validity')}
          options={VALIDITY_OPTIONS}
          placeholder="Select"
          error={getFieldError('validity')}
        />
      </FormField>

      <FormField label="Personal Access Token">
        <TokenInputRow value={token.token} onGenerate={() => onGenerate?.()} />
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
          Personal Access Token
        </a>
      </p>
      <p className={classNames(mainStyles.helpText, localStyles.helpTextSub)}>
        * fields are mandatory
      </p>
    </FilterSidebar>
  );
};
