import { TagSelector } from '@/components/common/tag-selector';
import { Button } from '@/components/ui/button';
import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import { useCredentialTags } from '@/hooks/discovery-settings/credential-profile/tags/useCredentialTags';
import { useCredentialGroups } from '@/hooks/discovery-settings/credential-profile/groups/useCredentialGroups';
import { required, useFormValidation } from '@/hooks/useFormValidation';
import { Icon } from '@iconify/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.css';

const CREDENTIAL_TYPES = [
  'Ping',
  'SNMP v2c',
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
  const {
    getAllCredentialTags,
    createCredentialTag,
    editCredentialTag,
    deleteCredentialTag,
  } = useCredentialTags();

  const {
    getAllCredentialGroups,
    createCredentialGroup,
    editCredentialGroup,
    deleteCredentialGroup,
  } = useCredentialGroups();

  const [formData, setFormData] = useState({
    name: credential?.name || '',
    type: credential?.type || 'Ping',
    protocol: credential?.protocol || 'SNMP',
    community_string: credential?.community_string || '',
    username: '',
    password: '',
    authProtocol: 'SHA',
    privProtocol: 'AES',
    privPassword: '',
    port: '161',
    groups: Array.isArray(credential?.groups)
      ? credential.groups.map((g) => g.id || g)
      : [],
    tags: Array.isArray(credential?.tags)
      ? credential.tags.map((t) => t.id || t)
      : [],
  });

  const [groupOptions, setGroupOptions] = useState([]);
  const [activeInlineModal, setActiveInlineModal] = useState(null);
  const [inlineModalInputValue, setInlineModalInputValue] = useState('');

  useEffect(() => {
    const loadGroups = async () => {
      const res = await getAllCredentialGroups({ limit: 1000 });
      if (res?.items) {
        setGroupOptions(res.items.map((g) => ({ value: g.id, label: g.name })));
      }
    };
    loadGroups();
  }, [getAllCredentialGroups]);

  const handleCreateGroup = async (inputValue) => {
    const res = await createCredentialGroup({ name: inputValue });
    if (res && res.id) {
      const newOption = { value: res.id, label: res.name || inputValue };
      setGroupOptions((prev) => [...prev, newOption]);
      setFormData((prev) => ({
        ...prev,
        groups: [...(prev.groups || []), res.id],
      }));
    }
  };

  const handleStaticCreateGroup = () => {
    setActiveInlineModal({ type: 'create-group', opt: null });
    setInlineModalInputValue('');
  };

  const handleEditGroupClick = (opt) => {
    setActiveInlineModal({ type: 'edit-group', opt });
    setInlineModalInputValue(opt.label);
  };

  const handleDeleteGroupClick = (opt) => {
    setActiveInlineModal({ type: 'delete-group', opt });
  };

  const handleFetchTags = useCallback(async () => {
    const res = await getAllCredentialTags({ limit: 1000 });
    if (res?.items) {
      return res.items.map((t) => ({ id: t.id, name: t.name }));
    }
    return [];
  }, [getAllCredentialTags]);

  const handleCreateTag = useCallback(
    async (name) => {
      const res = await createCredentialTag({ name });
      if (res && res.id) {
        return { id: res.id, name: res.name || name };
      }
      return null;
    },
    [createCredentialTag]
  );

  const handleEditTag = useCallback(
    async ({ id, name }) => {
      const res = await editCredentialTag({ id, name });
      return res;
    },
    [editCredentialTag]
  );

  const handleDeleteTag = useCallback(
    async (id) => {
      const res = await deleteCredentialTag(id);
      return res;
    },
    [deleteCredentialTag]
  );

  const validationRules = useMemo(
    () => ({
      name: required('Credential Name is required'),
      type: required('Credential Type is required'),
      community_string: (value, values) =>
        values.type === 'SNMP v2c'
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

  const { getFieldError, handleBlur, validateAll, revalidateField } =
    useFormValidation(formData, validationRules, { isActive: true });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    revalidateField(field);
  };

  useEffect(() => {
    revalidateField('community_string');
    revalidateField('username');
    revalidateField('password');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const payload = {
      ...formData,
      community_string: formData.community_string,
      auth_protocol: formData.authProtocol,
      priv_protocol: formData.privProtocol,
      priv_password: formData.privPassword,
      tag_ids: formData.tags,
      group_ids: Array.isArray(formData.groups) ? formData.groups : [],
    };

    onSave(payload);
  };

  return (
    <>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modal_header}>
            <h2 className={styles.modal_title}>
              {credential
                ? 'Edit Credential Profile'
                : 'Create Credential Profile'}
            </h2>
            <button
              type="button"
              className={styles.modal_close}
              onClick={onClose}
            >
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

            <FormField label="Credential Type" required>
              <SelectComponent
                className={styles.select}
                compact
                value={formData.type}
                onChange={(e) => updateField('type', e.target.value)}
                onBlur={() => handleBlur('type')}
                options={CREDENTIAL_TYPES.map((type) => ({
                  value: type,
                  label: type,
                }))}
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

            <FormField label="Community String" required={formData.type === 'SNMP v2c'}>
              <Input
                type="password"
                value={formData.community_string}
                onChange={(e) => updateField('community_string', e.target.value)}
                onBlur={() => handleBlur('community_string')}
                error={getFieldError('community_string')}
                placeholder="public"
              />
            </FormField>

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
                      compact
                      value={formData.authProtocol}
                      onChange={(e) =>
                        updateField('authProtocol', e.target.value)
                      }
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
                      compact
                      value={formData.privProtocol}
                      onChange={(e) =>
                        updateField('privProtocol', e.target.value)
                      }
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

            <div className={styles.formGroup}>
              <label>Groups</label>
              <SelectComponent
                className={styles.select}
                isMulti
                isCreatable
                onCreateOption={handleCreateGroup}
                onCreateStaticClick={handleStaticCreateGroup}
                createStaticText="Create New Group"
                onEditOption={handleEditGroupClick}
                onDeleteOption={handleDeleteGroupClick}
                value={formData.groups || []}
                onChange={(e) => {
                  const values = e.target.value || [];
                  updateField('groups', values);
                }}
                options={groupOptions}
                placeholder="Add Groups"
                noOptionsMessage={({ inputValue }) =>
                  inputValue
                    ? `No groups found matching "${inputValue}".`
                    : 'No groups found.'
                }
              />
            </div>

            <FormField label="Tags">
              <TagSelector
                selectedTags={formData.tags}
                onChange={(tags) => updateField('tags', tags)}
                placeholder="Add Tags"
                onFetchTags={handleFetchTags}
                onCreateTag={handleCreateTag}
                onEditTag={handleEditTag}
                onDeleteTag={handleDeleteTag}
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

      {activeInlineModal?.type?.startsWith('delete-') && (
        <DeleteConfirmationModal
          isOpen={true}
          onClose={() => setActiveInlineModal(null)}
          onConfirm={async () => {
            const opt = activeInlineModal.opt;
            const res = await deleteCredentialGroup(opt.value);
            if (res) {
              setGroupOptions((prev) => prev.filter((g) => g.value !== opt.value));
              setFormData((prev) => ({
                ...prev,
                groups: (prev.groups || []).filter((id) => id !== opt.value),
              }));
            }
            setActiveInlineModal(null);
          }}
          itemName={activeInlineModal.opt.label}
          itemType="Group"
        />
      )}

      {activeInlineModal && !activeInlineModal.type.startsWith('delete-') && (
        <div
          className={styles.modalOverlay}
          style={{ zIndex: 1100 }}
          onClick={() => setActiveInlineModal(null)}
        >
          <div
            className={styles.modalContent}
            style={{
              width: '400px',
              minWidth: '300px',
              height: 'fit-content',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              bottom: 'auto',
              right: 'auto',
              borderRadius: 'var(--radius-md)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modal_header}>
              <h2 className={styles.modal_title}>
                {activeInlineModal.type.includes('create') ? 'Create' : 'Edit'} Group
              </h2>
              <button
                className={styles.modal_close}
                onClick={() => setActiveInlineModal(null)}
              >
                <Icon icon="mdi:close" width={20} />
              </button>
            </div>
            <div className={styles.modal_body}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <Input
                  autoFocus
                  value={inlineModalInputValue}
                  onChange={(e) => setInlineModalInputValue(e.target.value)}
                  placeholder="Enter group name..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      document.getElementById('inlineModalSaveBtn').click();
                    }
                  }}
                />
              </div>
            </div>
            <div className={styles.modal_footer}>
              <Button variant="secondary" onClick={() => setActiveInlineModal(null)}>
                Cancel
              </Button>
              <Button
                id="inlineModalSaveBtn"
                onClick={async () => {
                  const val = inlineModalInputValue.trim();
                  if (!val) return;

                  if (activeInlineModal.type === 'create-group') {
                    await handleCreateGroup(val);
                  } else if (activeInlineModal.type === 'edit-group') {
                    if (val !== activeInlineModal.opt.label) {
                      const res = await editCredentialGroup({
                        id: activeInlineModal.opt.value,
                        name: val,
                      });
                      if (res)
                        setGroupOptions((prev) =>
                          prev.map((g) =>
                            g.value === activeInlineModal.opt.value ? { ...g, label: val } : g
                          )
                        );
                    }
                  }
                  setActiveInlineModal(null);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
