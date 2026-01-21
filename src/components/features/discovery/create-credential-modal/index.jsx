import { TagSelector } from '@/components/common/tag-selector';
import { SelectComponent } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const credentialTypes = [
    'SNMP v2',
    'SNMP v3',
    'SSH',
    'Telnet',
    'WMI',
    'VMware',
    'IPMI',
    'HTTP/HTTPS',
  ];

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <h2 className={styles.modal_title}>
            {credential
              ? 'Edit Credential Profile'
              : 'Create Credential Profile'}
          </h2>
          <button className={styles.modal_close} onClick={onClose}>
            <Icon icon="mdi:close" width={20} height={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modal_body}>
          <div className={styles.formGroup}>
            <label>Credential Name *</label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter credential name"
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Credential Type *</label>
              <SelectComponent
                className={styles.select}
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                options={credentialTypes.map((type) => ({
                  value: type,
                  label: type,
                }))}
                placeholder="Select credential type"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Port</label>
              <Input
                value={formData.port}
                onChange={(e) =>
                  setFormData({ ...formData, port: e.target.value })
                }
                placeholder="161"
              />
            </div>
          </div>

          {formData.type === 'SNMP v2' && (
            <div className={styles.formGroup}>
              <label>Community String *</label>
              <Input
                type="password"
                value={formData.community}
                onChange={(e) =>
                  setFormData({ ...formData, community: e.target.value })
                }
                placeholder="public"
                required
              />
            </div>
          )}

          {(formData.type === 'SNMP v3' ||
            formData.type === 'SSH' ||
            formData.type === 'Telnet' ||
            formData.type === 'WMI') && (
            <>
              <div className={styles.formGroup}>
                <label>Username *</label>
                <Input
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Password *</label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter password"
                  required
                />
              </div>
            </>
          )}

          {formData.type === 'SNMP v3' && (
            <>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Auth Protocol</label>
                  <SelectComponent
                    className={styles.select}
                    value={formData.authProtocol}
                    onChange={(e) =>
                      setFormData({ ...formData, authProtocol: e.target.value })
                    }
                    options={[
                      { value: 'MD5', label: 'MD5' },
                      { value: 'SHA', label: 'SHA' },
                      { value: 'SHA-224', label: 'SHA-224' },
                      { value: 'SHA-256', label: 'SHA-256' },
                    ]}
                    placeholder="Select auth protocol"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Priv Protocol</label>
                  <SelectComponent
                    className={styles.select}
                    value={formData.privProtocol}
                    onChange={(e) =>
                      setFormData({ ...formData, privProtocol: e.target.value })
                    }
                    options={[
                      { value: 'DES', label: 'DES' },
                      { value: 'AES', label: 'AES' },
                      { value: 'AES-192', label: 'AES-192' },
                      { value: 'AES-256', label: 'AES-256' },
                    ]}
                    placeholder="Select priv protocol"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Privacy Password</label>
                <Input
                  type="password"
                  value={formData.privPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, privPassword: e.target.value })
                  }
                  placeholder="Enter privacy password"
                />
              </div>
            </>
          )}

          <div className={styles.formGroup}>
            <label>Groups (comma separated)</label>
            <Input
              value={formData.groups}
              onChange={(e) =>
                setFormData({ ...formData, groups: e.target.value })
              }
              placeholder="Network, Switches, Production"
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
