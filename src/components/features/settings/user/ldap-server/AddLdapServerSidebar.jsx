import { Button } from '@/components/ui/button';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import { ToggleSwitch } from '@/components/ui/toggle-switch';
import mainStyles from '@/screens/settings/shared-settings-styles.module.css';
import { SERVER_TYPE_OPTIONS } from '@/utils/constants/settings/users';
import classNames from 'classnames';
import localStyles from './styles.module.css';

import { useState, useEffect } from 'react';

/** Add LDAP Server slide-in sidebar */
export const AddLdapServerSidebar = ({
  isOpen,
  onClose,
  server,
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
    if (!server.primaryIpHost?.trim()) newErrors.primaryIpHost = 'Primary IP/Host is required';
    if (!server.domainName?.trim()) newErrors.domainName = 'Domain Name is required';
    if (!server.serverType || (Array.isArray(server.serverType) && server.serverType.length === 0)) newErrors.serverType = 'Server Type is required';
    if (!String(server.port)?.trim()) newErrors.port = 'Port is required';
    if (!server.userName?.trim()) newErrors.userName = 'User Name is required';
    if (!server.password?.trim()) newErrors.password = 'Password is required';
    if (!server.ldapGroups?.trim()) newErrors.ldapGroups = 'LDAP Groups is required';

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
    title={isEditing ? 'Edit LDAP Server' : 'Add LDAP Server'}
    filters={[]}
    onApply={handleSubmit}
    onReset={onReset}
    applyButtonText={isEditing ? 'Update LDAP Server' : 'Add LDAP Server'}
    resetButtonText="Reset"
  >
    <FormField label="Primary IP/Host" required>
      <Input
        type="text"
        placeholder="e.g. 192.168.1.1 or fd00::1 or prod.snr-edatas.com"
        value={server.primaryIpHost}
        onChange={(e) => handleFieldChange('primaryIpHost', e.target.value)}
        onFocus={() => clearError('primaryIpHost')}
        error={errors.primaryIpHost}
      />
    </FormField>

    <FormField
      label="Secondary IP/Host"
      className={localStyles.fieldWithTopMargin}
    >
      <Input
        type="text"
        placeholder="e.g. 192.168.1.1 or fd00::1 or prod.snr-edatas.com"
        value={server.secondaryIpHost}
        onChange={(e) => handleFieldChange('secondaryIpHost', e.target.value)}
        onFocus={() => clearError('secondaryIpHost')}
        error={errors.secondaryIpHost}
      />
    </FormField>

    <FormField
      label="Domain Name"
      required
      className={localStyles.fieldWithTopMargin}
    >
      <Input
        type="text"
        placeholder="e.g. prod.snr-edatas.com"
        value={server.domainName}
        onChange={(e) => handleFieldChange('domainName', e.target.value)}
        onFocus={() => clearError('domainName')}
        error={errors.domainName}
      />
    </FormField>

    <FormField
      label="Server Type"
      required
      className={localStyles.fieldWithTopMargin}
    >
      <SelectComponent
        className={mainStyles.formSelect}
        value={server.serverType}
        onChange={(e) => handleFieldChange('serverType', e.target.value)}
        onFocus={() => clearError('serverType')}
        options={SERVER_TYPE_OPTIONS}
        placeholder="Select"
        error={errors.serverType}
      />
    </FormField>

    <FormField
      label="Secure LDAP"
      required
      className={localStyles.fieldWithTopMargin}
    >
      <ToggleSwitch
        checked={server.secureLdap}
        onChange={(val) => onChange('secureLdap', val)}
        showInlineLabel
      />
    </FormField>

    <FormField label="Port" required className={localStyles.fieldWithTopMargin}>
      <Input
        type="text"
        value={server.port}
        onChange={(e) => handleFieldChange('port', e.target.value)}
        onFocus={() => clearError('port')}
        error={errors.port}
      />
    </FormField>

    <FormField
      label="User Name"
      required
      className={localStyles.fieldWithTopMargin}
    >
      <Input
        type="text"
        placeholder="e.g. johndoe@domain.com or domain/johndoe"
        value={server.userName}
        onChange={(e) => handleFieldChange('userName', e.target.value)}
        onFocus={() => clearError('userName')}
        error={errors.userName}
      />
    </FormField>

    <FormField
      label="Password"
      required
      className={localStyles.fieldWithTopMargin}
    >
      <div className={localStyles.passwordInputRow}>
        <Input
          type="password"
          value={server.password}
          onChange={(e) => handleFieldChange('password', e.target.value)}
          onFocus={() => clearError('password')}
          error={errors.password}
        />
        <Button variant="cyan" size="sm">
          Test
        </Button>
      </div>
    </FormField>

    <FormField
      label="LDAP Authentication"
      required
      className={localStyles.fieldWithTopMargin}
    >
      <ToggleSwitch
        checked={server.ldapAuthentication}
        onChange={(val) => onChange('ldapAuthentication', val)}
        showInlineLabel
      />
    </FormField>

    <FormField
      label="Auto Sync"
      required
      className={localStyles.fieldWithTopMargin}
    >
      <ToggleSwitch
        checked={server.autoSync}
        onChange={(val) => onChange('autoSync', val)}
        showInlineLabel
      />
    </FormField>

    <FormField
      label="LDAP Groups"
      required
      className={localStyles.fieldWithTopMargin}
    >
      <Input
        type="text"
        placeholder="ldap groups"
        value={server.ldapGroups}
        onChange={(e) => handleFieldChange('ldapGroups', e.target.value)}
        onFocus={() => clearError('ldapGroups')}
        error={errors.ldapGroups}
      />
    </FormField>

    <p className={classNames(mainStyles.helpText, localStyles.helpTextMain)}>
      For more information:{' '}
      <a href="#" onClick={(e) => { e.preventDefault(); onInfoClick?.(); }} className={mainStyles.link}>
        LDAP Server
      </a>
    </p>
    <p className={classNames(mainStyles.helpText, localStyles.helpTextSub)}>
      * fields are mandatory
    </p>
  </FilterSidebar>
  );
};
