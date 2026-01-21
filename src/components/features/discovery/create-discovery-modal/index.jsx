import { TagSelector } from '@/components/common/tag-selector';
import { SelectComponent } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

export const CreateDiscoveryModal = ({ profile, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    type: profile?.type || 'network',
    host: profile?.host || '',
    startIP: '',
    endIP: '',
    cidr: '',
    csvFile: null,
    port: '',
    timeout: '30',
    retries: '3',
    credentials: [],
    groups: profile?.groups || 'Network',
    tags: profile?.tags || [],
    description: '',
  });

  const [inputMode, setInputMode] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const discoveryTypes = [
    { value: 'network', label: 'Network Device', icon: 'mdi:network' },
    { value: 'server', label: 'Server', icon: 'mdi:server' },
    { value: 'virtualization', label: 'Virtualization', icon: 'mdi:cloud' },
    { value: 'storage', label: 'Storage', icon: 'mdi:harddisk' },
    { value: 'application', label: 'Application', icon: 'mdi:cellphone' },
  ];

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

        <form onSubmit={handleSubmit} className={styles.modal_body}>
          <div className={styles.formGroup}>
            <label>Profile Name *</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter profile name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Discovery Type *</label>
            <div className={styles.typeGrid}>
              {discoveryTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  className={`${styles.typeButton} ${
                    formData.type === type.value ? styles.typeButton_active : ''
                  }`}
                  onClick={() => setFormData({ ...formData, type: type.value })}
                >
                  <Icon icon={type.icon} className={styles.typeIcon} width={24} height={24} />
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Target Input Method *</label>
            <div className={styles.inputModeButtons}>
              <button
                type="button"
                className={`${styles.modeButton} ${
                  inputMode === 'single' ? styles.modeButton_active : ''
                }`}
                onClick={() => setInputMode('single')}
              >
                Single IP/Host
              </button>
              <button
                type="button"
                className={`${styles.modeButton} ${
                  inputMode === 'range' ? styles.modeButton_active : ''
                }`}
                onClick={() => setInputMode('range')}
              >
                IP Range
              </button>
              <button
                type="button"
                className={`${styles.modeButton} ${
                  inputMode === 'cidr' ? styles.modeButton_active : ''
                }`}
                onClick={() => setInputMode('cidr')}
              >
                CIDR
              </button>
              <button
                type="button"
                className={`${styles.modeButton} ${
                  inputMode === 'csv' ? styles.modeButton_active : ''
                }`}
                onClick={() => setInputMode('csv')}
              >
                CSV File
              </button>
            </div>
          </div>

          {inputMode === 'single' && (
            <div className={styles.formGroup}>
              <label>IP Address or Hostname *</label>
              <Input
                value={formData.host}
                onChange={(e) =>
                  setFormData({ ...formData, host: e.target.value })
                }
                placeholder="192.168.1.1 or hostname.domain.com"
                required
              />
            </div>
          )}

          {inputMode === 'range' && (
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Start IP *</label>
                <Input
                  value={formData.startIP}
                  onChange={(e) =>
                    setFormData({ ...formData, startIP: e.target.value })
                  }
                  placeholder="192.168.1.1"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>End IP *</label>
                <Input
                  value={formData.endIP}
                  onChange={(e) =>
                    setFormData({ ...formData, endIP: e.target.value })
                  }
                  placeholder="192.168.1.254"
                  required
                />
              </div>
            </div>
          )}

          {inputMode === 'cidr' && (
            <div className={styles.formGroup}>
              <label>CIDR Notation *</label>
              <Input
                value={formData.cidr}
                onChange={(e) =>
                  setFormData({ ...formData, cidr: e.target.value })
                }
                placeholder="192.168.1.0/24"
                required
              />
            </div>
          )}

          {inputMode === 'csv' && (
            <div className={styles.formGroup}>
              <label>CSV File *</label>
              <input
                type="file"
                accept=".csv"
                className={styles.fileInput}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    csvFile: e.target.files?.[0] || null,
                  })
                }
                required
              />
              <p className={styles.helpText}>
                Upload a CSV file with IP addresses or hostnames
              </p>
            </div>
          )}

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Port (optional)</label>
              <Input
                value={formData.port}
                onChange={(e) =>
                  setFormData({ ...formData, port: e.target.value })
                }
                placeholder="Leave empty for default"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Timeout (seconds)</label>
              <Input
                type="number"
                value={formData.timeout}
                onChange={(e) =>
                  setFormData({ ...formData, timeout: e.target.value })
                }
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
              options={[
                { value: 'cred1', label: 'Network-SNMP-v2' },
                { value: 'cred2', label: 'Network-SNMP-v3' },
                { value: 'cred3', label: 'Linux-SSH' },
                { value: 'cred4', label: 'Windows-WMI' },
                { value: 'cred5', label: 'VMware-API' },
              ]}
              placeholder="Select credentials"
            />
            <p className={styles.helpText}>
              Select multiple credentials
            </p>
          </div>

          <div className={styles.formGroup}>
            <label>Groups</label>
            <Input
              value={formData.groups}
              onChange={(e) =>
                setFormData({ ...formData, groups: e.target.value })
              }
              placeholder="Network, Production"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Tags</label>
            <TagSelector
              selectedTags={formData.tags}
              onChange={(tags) => setFormData({ ...formData, tags })}
              placeholder="Add Tags"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              className={styles.textarea}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter description for this discovery profile"
              rows={3}
            />
          </div>

          <div className={styles.modal_footer}>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {profile ? 'Update' : 'Create'} Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
