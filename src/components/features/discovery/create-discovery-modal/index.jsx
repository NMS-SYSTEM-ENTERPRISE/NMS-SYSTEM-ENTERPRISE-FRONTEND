import { SelectComponent } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { DiscoveryTypeSelector } from './components/discovery-type-selector';
import { TargetInputMethod } from './components/target-input-method';
import { CsvUploader } from './components/csv-uploader';
import { useCredentialProfile } from '@/hooks/discovery-settings/credential-profile/profile/useCredentialProfile';
import { useDiscoveryGroups } from '@/hooks/discovery-settings/discovery-profile/groups/useDiscoveryGroups';
import { useDiscoveryTags } from '@/hooks/discovery-settings/discovery-profile/tags/useDiscoveryTags';
import { useEffect } from 'react';
import styles from './styles.module.css';

export const CreateDiscoveryModal = ({ profile, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    type: profile?.discovery_type || profile?.type || 'network',
    otherType: '',
    host: profile?.ip_address_or_hostname || profile?.host || '',
    startIP: profile?.start_ip || '',
    endIP: profile?.end_ip || '',
    cidr: profile?.cidr_notation || '',
    csvFile: profile?.csv_file_path ? { name: profile.csv_file_path } : null,
    port: profile?.port || '',
    timeout: profile?.timeout || '30',
    retries: '3',
    credentials: Array.isArray(profile?.credential_profiles) ? profile.credential_profiles.map(c => c.id || c) : [],
    groups: Array.isArray(profile?.groups) ? profile.groups.map(g => g.id || g) : [],
    tags: Array.isArray(profile?.tags) ? profile.tags.map(t => t.id || t) : [],
    description: profile?.description || '',
  });

  const [inputMode, setInputMode] = useState(
    profile?.target_input_method === 'Single IP' ? 'single' :
      profile?.target_input_method === 'IP Range' ? 'range' :
        profile?.target_input_method === 'CIDR Notation' ? 'cidr' :
          profile?.target_input_method === 'CSV Upload' ? 'csv' :
            null
  );
  const [errors, setErrors] = useState({});

  const { getAllCredentialProfiles } = useCredentialProfile();
  const { getAllDiscoveryGroups } = useDiscoveryGroups();
  const { getAllDiscoveryTags } = useDiscoveryTags();

  const [credentialOptions, setCredentialOptions] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);

  useEffect(() => {
    const loadDropdownData = async () => {
      const [creds, groups, tags] = await Promise.all([
        getAllCredentialProfiles({ limit: 1000 }),
        getAllDiscoveryGroups({ limit: 1000 }),
        getAllDiscoveryTags({ limit: 1000 })
      ]);
      if (creds?.items) setCredentialOptions(creds.items.map(c => ({ value: c.id, label: c.name })));
      if (groups?.items) setGroupOptions(groups.items.map(g => ({ value: g.id, label: g.name })));
      if (tags?.items) setTagOptions(tags.items.map(t => ({ value: t.id, label: t.name })));
    };
    loadDropdownData();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Profile Name is required.';
    if (!formData.type) newErrors.type = 'Discovery Type is required.';
    if (formData.type === 'other' && !formData.otherType.trim()) newErrors.otherType = 'Custom Device Type is required.';
    if (!inputMode) newErrors.inputMode = 'Target Input Method is required.';

    if (inputMode === 'single' && !formData.host.trim()) newErrors.host = 'IP Address or Hostname is required.';
    if (inputMode === 'range') {
      if (!formData.startIP.trim()) newErrors.startIP = 'Start IP is required.';
      if (!formData.endIP.trim()) newErrors.endIP = 'End IP is required.';
    }
    if (inputMode === 'cidr' && !formData.cidr.trim()) newErrors.cidr = 'CIDR Notation is required.';
    if (inputMode === 'csv' && !formData.csvFile) newErrors.csvFile = 'CSV File is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        groups: formData.groups.join(', '),
      });
    }
  };

  const clearError = (field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <h2 className={styles.modal_title}>
            {profile ? 'Edit Discovery Profile' : 'Create Discovery Profile'}
          </h2>
          <button className={styles.modal_close} onClick={onClose}>
            <Icon icon="mdi:close" width={20} height={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modal_body} noValidate>
          <div className={styles.formGroup}>
            <label>Profile Name *</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => clearError('name')}
              placeholder="Enter profile name"
              error={errors.name}
            />
          </div>

          <DiscoveryTypeSelector
            value={formData.type}
            otherValue={formData.otherType}
            onChange={(val) => {
              setFormData({ ...formData, type: val });
              clearError('type');
            }}
            onOtherChange={(val) => {
              setFormData({ ...formData, otherType: val });
              clearError('otherType');
            }}
            error={errors.type || errors.otherType}
          />

          <TargetInputMethod
            value={inputMode}
            onChange={(val) => {
              setInputMode(val);
              clearError('inputMode');
            }}
            error={errors.inputMode}
          />

          {inputMode === 'single' && (
            <div className={styles.formGroup}>
              <label>IP Address or Hostname *</label>
              <Input
                value={formData.host}
                onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                onFocus={() => clearError('host')}
                placeholder="192.168.1.1 or hostname.domain.com"
                error={errors.host}
              />
            </div>
          )}

          {inputMode === 'range' && (
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Start IP *</label>
                <Input
                  value={formData.startIP}
                  onChange={(e) => setFormData({ ...formData, startIP: e.target.value })}
                  onFocus={() => clearError('startIP')}
                  placeholder="192.168.1.1"
                  error={errors.startIP}
                />
              </div>
              <div className={styles.formGroup}>
                <label>End IP *</label>
                <Input
                  value={formData.endIP}
                  onChange={(e) => setFormData({ ...formData, endIP: e.target.value })}
                  onFocus={() => clearError('endIP')}
                  placeholder="192.168.1.254"
                  error={errors.endIP}
                />
              </div>
            </div>
          )}

          {inputMode === 'cidr' && (
            <div className={styles.formGroup}>
              <label>CIDR Notation *</label>
              <Input
                value={formData.cidr}
                onChange={(e) => setFormData({ ...formData, cidr: e.target.value })}
                onFocus={() => clearError('cidr')}
                placeholder="192.168.1.0/24"
                error={errors.cidr}
              />
            </div>
          )}

          {inputMode === 'csv' && (
            <CsvUploader
              file={formData.csvFile}
              onFileChange={(file) => {
                setFormData({ ...formData, csvFile: file });
                clearError('csvFile');
              }}
              error={errors.csvFile}
            />
          )}

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Port (optional)</label>
              <Input
                value={formData.port}
                onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                placeholder="Leave empty for default"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Timeout (seconds)</label>
              <Input
                type="number"
                value={formData.timeout}
                onChange={(e) => setFormData({ ...formData, timeout: e.target.value })}
                placeholder="30"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Credentials (select multiple)</label>
            <SelectComponent
              className={styles.select}
              isMulti
              value={formData.credentials || []}
              onChange={(e) => {
                const values = e.target.value || [];
                setFormData({ ...formData, credentials: values });
              }}
              options={credentialOptions}
              placeholder="Select credentials"
              noOptionsMessage={() => "No data found"}
            />
            <p className={styles.helpText}>Select multiple credentials</p>
          </div>

          <div className={styles.formGroup}>
            <label>Groups</label>
            <SelectComponent
              className={styles.select}
              isMulti
              value={formData.groups || []}
              onChange={(e) => {
                const values = e.target.value || [];
                setFormData({ ...formData, groups: values });
              }}
              options={groupOptions}
              placeholder="Add Groups"
              noOptionsMessage={() => "No data found"}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Tags</label>
            <SelectComponent
              className={styles.select}
              isMulti
              value={formData.tags || []}
              onChange={(e) => {
                const values = e.target.value || [];
                setFormData({ ...formData, tags: values });
              }}
              options={tagOptions}
              placeholder="Add Tags"
              noOptionsMessage={() => "No data found"}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              className={styles.textarea}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description for this discovery profile"
              rows={3}
            />
          </div>

          <div className={styles.modal_footer}>
            <Button type="button" onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="cyan">
              {profile ? 'Update' : 'Create'} Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
