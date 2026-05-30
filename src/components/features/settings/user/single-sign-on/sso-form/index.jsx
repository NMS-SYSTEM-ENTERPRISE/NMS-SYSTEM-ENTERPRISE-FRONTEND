import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { useToast } from '@/hooks/useToast';
import mainStyles from '@/screens/settings/shared-settings-styles.module.css';
import localStyles from './styles.module.css';

const CopyableField = ({ label, value, readOnly = true, onChange, onCopySuccess }) => {
  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const ok = await copyToClipboard(value || '');
    if (ok) {
      onCopySuccess?.(`${label} copied to clipboard`);
    }
  };

  return (
    <FormField label={label}>
      <div className={localStyles.inputWithCopy}>
        <input
          type="text"
          value={value || ''}
          readOnly={readOnly}
          onChange={onChange}
        />
        <button
          type="button"
          className={localStyles.copyButton}
          title="Copy to clipboard"
          onClick={handleCopy}
        >
          <Icon icon="mdi:content-copy" width={18} height={18} />
        </button>
      </div>
    </FormField>
  );
};

export const SsoForm = ({ config, setConfig, onSave, onReset }) => {
  const { showSuccess } = useToast();

  const handleFieldChange = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={mainStyles.settingsFormPanel}>
      {/* Service Provider Details */}
      <div className={mainStyles.settingsSection}>
        <h3 className={mainStyles.sectionTitle}>Service Provider Details</h3>
        <div className={mainStyles.formGrid}>
          <CopyableField
            label="Service Provider Entity ID"
            value={config.sp_entity_id}
            onCopySuccess={showSuccess}
          />
          <CopyableField
            label="Redirect / ACS URL"
            value={config.sp_acs_url}
            onCopySuccess={showSuccess}
          />
          <CopyableField
            label="Service Provider Login URL"
            value={config.sp_login_url}
            onCopySuccess={showSuccess}
          />
          <CopyableField
            label="Service Provider Logout URL"
            value={config.sp_logout_url}
            onCopySuccess={showSuccess}
          />
        </div>
      </div>

      {/* Identity Provider Details */}
      <div className={mainStyles.settingsSection}>
        <h3 className={mainStyles.sectionTitle}>Identity Provider Details</h3>
        <div className={mainStyles.formGrid}>
          <FormField label="Identity Provider" required>
            <SelectComponent
              value={config.idp_type}
              onChange={(e) => handleFieldChange('idp_type', e.target.value)}
              options={[
                { value: 'OneLogin', label: 'OneLogin' },
                { value: 'Okta', label: 'Okta' },
                { value: 'Azure AD', label: 'Azure AD' },
                { value: 'Custom', label: 'Custom' },
              ]}
              placeholder="Select"
            />
          </FormField>

          <FormField label="Identity Provider Configuration">
            <div className={localStyles.buttonGroup}>
              <Button variant="secondary" type="button">
                Upload Metadata File
              </Button>
              <Button variant="primary" type="button">
                Configure Manually
              </Button>
            </div>
          </FormField>

          <FormField label="Identity Provider Entity ID" required>
            <Input
              type="text"
              value={config.idp_entity_id || ''}
              onChange={(e) => handleFieldChange('idp_entity_id', e.target.value)}
            />
          </FormField>

          <FormField label="Identity Provider Login URL" required>
            <Input
              type="text"
              value={config.idp_login_url || ''}
              onChange={(e) => handleFieldChange('idp_login_url', e.target.value)}
            />
          </FormField>

          <FormField label="Identity Provider Logout URL" required>
            <Input
              type="text"
              value={config.idp_logout_url || ''}
              onChange={(e) => handleFieldChange('idp_logout_url', e.target.value)}
            />
          </FormField>

          <FormField label="NameID Format" required>
            <SelectComponent
              value={config.nameid_format}
              onChange={(e) => handleFieldChange('nameid_format', e.target.value)}
              options={[
                { value: 'Unspecified', label: 'Unspecified' },
                { value: 'Email', label: 'Email' },
                { value: 'Persistent', label: 'Persistent' },
              ]}
              placeholder="Select"
            />
          </FormField>

          <FormField label="Identity Provider X.509 Certificate">
            <div className={localStyles.buttonGroup}>
              <Button variant="primary" type="button">
                Configure Manually
              </Button>
              <Button variant="secondary" type="button">
                Upload Certificate
              </Button>
            </div>
          </FormField>

          <FormField label={
            <span>
              Identity Provider Fingerprint
              <Icon
                icon="mdi:information-outline"
                width={16}
                height={16}
                className={localStyles.infoIcon}
              />
            </span>
          }>
            <Input
              type="text"
              value={config.idp_fingerprint || ''}
              onChange={(e) => handleFieldChange('idp_fingerprint', e.target.value)}
              placeholder="Certificate fingerprint (optional)"
            />
          </FormField>
        </div>

        {config.x509_certificate && (
          <div className={localStyles.certificateBlock}>
            <p>-----BEGIN CERTIFICATE-----</p>
            <p className={localStyles.certificateBody}>
              {config.x509_certificate.length > 50 
                ? config.x509_certificate.substring(0, 50) + '...'
                : config.x509_certificate}
            </p>
            <p>-----END CERTIFICATE-----</p>
          </div>
        )}
      </div>

      <div className={localStyles.actionButtons}>
        <Button variant="secondary" onClick={onReset} type="button">
          Reset to Defaults
        </Button>
        <Button variant="primary" onClick={onSave} type="button">
          Save Configuration
        </Button>
      </div>
    </div>
  );
};
