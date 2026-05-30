import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import { ToggleSwitch } from '@/components/ui/toggle-switch';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import mainStyles from '@/screens/settings/shared-settings-styles.module.css';
import localStyles from './styles.module.css';
import { useState } from 'react';
import { useToast } from '@/hooks/useToast';

export const CreateLdapSidebar = ({
  isOpen,
  onClose,
  server,
  setServer,
  onApply,
  onReset,
  isEditing,
  onTest
}) => {
  const [isTesting, setIsTesting] = useState(false);
  const { showError } = useToast();

  const handleTestConnection = async (e) => {
    e.preventDefault();
    if (!server.primary_host || !server.user_name || !server.password) {
      showError('Host, Username, and Password are required to test connection.');
      return;
    }
    setIsTesting(true);
    await onTest({
      host: server.primary_host,
      port: parseInt(server.port) || 389,
      domain: server.domain_name || '',
      username: server.user_name,
      password: server.password,
      use_ssl: server.secure_ldap
    });
    setIsTesting(false);
  };

  return (
    <FilterSidebar
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit LDAP Server' : 'Add LDAP Server'}
      filters={[]}
      onApply={onApply}
      onReset={onReset}
      applyButtonText={isEditing ? 'Save Changes' : 'Add LDAP Server'}
      resetButtonText="Reset"
    >
      <div className={mainStyles.formGrid}>
        <FormField label="Primary IP/Host" required>
          <Input
            type="text"
            placeholder="e.g. 192.168.1.1 or prod.snr-edatas.com"
            value={server.primary_host}
            onChange={(e) => setServer({ ...server, primary_host: e.target.value })}
          />
        </FormField>

        <FormField label="Secondary IP/Host">
          <Input
            type="text"
            placeholder="e.g. 192.168.1.1 or prod.snr-edatas.com"
            value={server.secondary_host}
            onChange={(e) => setServer({ ...server, secondary_host: e.target.value })}
          />
        </FormField>

        <FormField label="Domain Name" required>
          <Input
            type="text"
            placeholder="e.g. prod.snr-edatas.com"
            value={server.domain_name}
            onChange={(e) => setServer({ ...server, domain_name: e.target.value })}
          />
        </FormField>

        <FormField label="Server Type" required>
          <SelectComponent
            value={server.server_type}
            onChange={(e) => setServer({ ...server, server_type: e.target.value })}
            options={[
              { value: 'Microsoft AD', label: 'Microsoft AD' },
              { value: 'OpenLDAP', label: 'OpenLDAP' },
            ]}
            placeholder="Select"
          />
        </FormField>

        <FormField label="Secure LDAP" required>
          <ToggleSwitch
            checked={server.secure_ldap}
            onChange={(val) => setServer({ ...server, secure_ldap: val })}
          />
        </FormField>

        <FormField label="Port" required>
          <Input
            type="text"
            value={server.port}
            onChange={(e) => setServer({ ...server, port: e.target.value })}
          />
        </FormField>

        <FormField label="User Name" required>
          <Input
            type="text"
            placeholder="e.g. johndoe@domain.com"
            value={server.user_name}
            onChange={(e) => setServer({ ...server, user_name: e.target.value })}
          />
        </FormField>

        <FormField label="Password" required>
          <div className={localStyles.passwordRow}>
            <div className={localStyles.passwordInput}>
              <Input
                type="password"
                value={server.password}
                onChange={(e) => setServer({ ...server, password: e.target.value })}
              />
            </div>
            <Button 
              variant="secondary"
              onClick={handleTestConnection} 
              disabled={isTesting}
              className={localStyles.testButton}
            >
              {isTesting ? <Icon icon="eos-icons:loading" width={16} /> : 'Test'}
            </Button>
          </div>
        </FormField>

        <FormField label="LDAP Authentication" required>
          <ToggleSwitch
            checked={server.ldap_auth}
            onChange={(val) => setServer({ ...server, ldap_auth: val })}
          />
        </FormField>

        <FormField label="Auto Sync" required>
          <ToggleSwitch
            checked={server.auto_sync}
            onChange={(val) => setServer({ ...server, auto_sync: val })}
          />
        </FormField>

        <FormField label="LDAP Groups" required>
          <Input
            type="text"
            placeholder="ldap groups"
            value={server.ldap_groups}
            onChange={(e) => setServer({ ...server, ldap_groups: e.target.value })}
          />
        </FormField>
      </div>

      <p className={localStyles.helpTextMain}>
        For more information:{' '}
        <a href="#" className={mainStyles.linkBlue}>
          LDAP Server
        </a>
      </p>
      <p className={localStyles.helpTextSub}>
        * fields are mandatory
      </p>
    </FilterSidebar>
  );
};
