import { TagSelector } from '@/components/common/tag-selector';
import { SelectComponent } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { useFormValidation, required } from '@/hooks/useFormValidation';
import { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

const CREDENTIAL_TYPES = [
  'SNMP v2',
  'SNMP v3',
  'SSH',
  'Telnet',
  'WMI',
  'VMware',
  'IPMI',
  'HTTP/HTTPS',
];

const AUTH_TYPES = ['SNMP v3', 'SSH', 'Telnet', 'WMI'];

export const CreateCredentialModal = ({ credential, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: credential?.name || '',
    type: credential?.type || 'SNMP v2',
    protocol: credential?.protocol || 'SNMP',
    community: '',
    username: '',
    password: '',
    authProtocol: 'SHA',
    privProtocol: 'AES',
    privPassword: '',
    port: '161',
    groups: credential?.groups?.join(', ') || '',
    tags: credential?.tags || [],
  });

  const validationRules = useMemo(
    () => ({
      name: required('Credential Name is required'),
      type: required('Credential Type is required'),
      community: (value, values) =>
        values.type === 'SNMP v2'
          ? required('Community String is required')(value)
          : null,
      username: (value, values) =>
        AUTH_TYPES.includes(values.type)
          ? required('Username is required')(value)
          : null,
      password: (value, values) =>
        AUTH_TYPES.includes(values.type)
          ? required('Password is required')(value)
          : null,
    }),
    []
  );

  const { getFieldError, handleBlur, validateAll, revalidateField } = useFormValidation(
    formData,
    validationRules,
    { isActive: true }
  );

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    revalidateField(field);
  };

  useEffect(() => {
    revalidateField('community');
    revalidateField('username');
    revalidateField('password');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <h2 className={styles.modal_title}>
            {credential ? 'Edit Credential Profile' : 'Create Credential Profile'}
          </h2>
          <button type="button" className={styles.modal_close} onClick={onClose}>
            <Icon icon="mdi:close" width={20} height={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modal_body} noValidate>
          <FormField label="Credential Name" required>
            <Input
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              error={getFieldError('name')}
              placeholder="Enter credential name"
            />
          </FormField>

          <div className={styles.formRow}>
            <FormField label="Credential Type" required>
              <SelectComponent
                className={styles.select}
                value={formData.type}
                onChange={(e) => updateField('type', e.target.value)}
                onBlur={() => handleBlur('type')}
                options={CREDENTIAL_TYPES.map((type) => ({ value: type, label: type }))}
                placeholder="Select credential type"
                error={getFieldError('type')}
                isClearable={false}
              />
            </FormField>

            <FormField label="Port">
              <Input
                value={formData.port}
                onChange={(e) => updateField('port', e.target.value)}
                placeholder="161"
              />
            </FormField>
          </div>

          {formData.type === 'SNMP v2' && (
            <FormField label="Community String" required>
              <Input
                type="password"
                value={formData.community}
                onChange={(e) => updateField('community', e.target.value)}
                onBlur={() => handleBlur('community')}
                error={getFieldError('community')}
                placeholder="public"
              />
            </FormField>
          )}

          {AUTH_TYPES.includes(formData.type) && (
            <>
              <FormField label="Username" required>
                <Input
                  value={formData.username}
                  onChange={(e) => updateField('username', e.target.value)}
                  onBlur={() => handleBlur('username')}
                  error={getFieldError('username')}
                  placeholder="Enter username"
                />
              </FormField>

              <FormField label="Password" required>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                  error={getFieldError('password')}
                  placeholder="Enter password"
                />
              </FormField>
            </>
          )}

          {formData.type === 'SNMP v3' && (
            <>
              <div className={styles.formRow}>
                <FormField label="Auth Protocol">
                  <SelectComponent
                    className={styles.select}
                    value={formData.authProtocol}
                    onChange={(e) => updateField('authProtocol', e.target.value)}
                    options={[
                      { value: 'MD5', label: 'MD5' },
                      { value: 'SHA', label: 'SHA' },
                      { value: 'SHA-224', label: 'SHA-224' },
                      { value: 'SHA-256', label: 'SHA-256' },
                    ]}
                    placeholder="Select auth protocol"
                    isClearable={false}
                  />
                </FormField>

                <FormField label="Priv Protocol">
                  <SelectComponent
                    className={styles.select}
                    value={formData.privProtocol}
                    onChange={(e) => updateField('privProtocol', e.target.value)}
                    options={[
                      { value: 'DES', label: 'DES' },
                      { value: 'AES', label: 'AES' },
                      { value: 'AES-192', label: 'AES-192' },
                      { value: 'AES-256', label: 'AES-256' },
                    ]}
                    placeholder="Select priv protocol"
                    isClearable={false}
                  />
                </FormField>
              </div>

              <FormField label="Privacy Password">
                <Input
                  type="password"
                  value={formData.privPassword}
                  onChange={(e) => updateField('privPassword', e.target.value)}
                  placeholder="Enter privacy password"
                />
              </FormField>
            </>
          )}

          <FormField label="Groups (comma separated)">
            <Input
              value={formData.groups}
              onChange={(e) => updateField('groups', e.target.value)}
              placeholder="Network, Switches, Production"
            />
          </FormField>

          <FormField label="Tags">
            <TagSelector
              selectedTags={formData.tags}
              onChange={(tags) => updateField('tags', tags)}
              placeholder="Add Tags"
            />
          </FormField>

          <p className={styles.mandatoryNote}>* fields are mandatory</p>

          <div className={styles.modal_footer}>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {credential ? 'Update' : 'Create'} Credential
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
