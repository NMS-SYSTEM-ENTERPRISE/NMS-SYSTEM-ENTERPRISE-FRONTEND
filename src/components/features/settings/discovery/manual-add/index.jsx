import React from 'react';
import { Icon } from '@iconify/react';
import { useManualAdd } from '@/hooks/settings/discovery/manual-add/useManualAdd';
import Select from 'react-select';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import sharedStyles from '@/screens/settings/shared-settings-styles.module.css';
import styles from './styles.module.css';

export const ManualAddContent = () => {
  const {
    activeTab,
    setActiveTab,
    name,
    setName,
    discoveryType,
    setDiscoveryType,
    customDiscoveryType,
    setCustomDiscoveryType,
    ipAddress,
    setIpAddress,
    selectedCredentials,
    setSelectedCredentials,
    selectedGroups,
    setSelectedGroups,
    selectedTags,
    setSelectedTags,
    customGroup,
    setCustomGroup,
    customTag,
    setCustomTag,
    credentialProfiles,
    groups,
    tags,
    isLoadingCreds,
    file,
    handleFileChange,
    handleSubmit,
    isSubmitting
  } = useManualAdd();

  const credOptions = credentialProfiles.map((c) => ({ value: c.id, label: c.name }));
  const groupOptions = groups.map((g) => ({ value: g.id, label: g.name }));
  const tagOptions = tags.map((t) => ({ value: t.id, label: t.name }));
  const typeOptions = [
    { value: 'Network Device', label: 'Network Device' },
    { value: 'Server', label: 'Server' },
    { value: 'Printer', label: 'Printer' },
    { value: 'Other', label: 'Other' },
  ];

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: 'var(--color-bg-tertiary)',
      borderColor: 'var(--color-border)',
      color: 'var(--color-text-primary)',
      padding: '2px',
      borderRadius: 'var(--radius-sm)',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'var(--color-bg-secondary)'
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? 'var(--color-bg-tertiary)' : 'transparent',
      color: 'var(--color-text-primary)'
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: 'var(--color-accent-blue-dark)'
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: 'white'
    }),
    singleValue: (base) => ({
      ...base,
      color: 'var(--color-text-primary)'
    })
  };

  return (
    <div className={sharedStyles.mainContent}>
      <div className={sharedStyles.formPageContent}>
        <h2 className={sharedStyles.pageTitle}>Add Device Manually</h2>
        <p className={sharedStyles.pageDescription} style={{ marginBottom: 'var(--margin-xl)' }}>
          Instantly discover and commission devices into network monitoring.
        </p>

        {/* Target Information Section */}
        <div className={sharedStyles.settingsSection}>
          <h3
            style={{
              color: 'var(--color-chart-cyan)',
              fontSize: 'var(--font-md)',
              marginBottom: 'var(--margin-md)',
            }}
          >
            Target Information
          </h3>

          <div className={styles.tabsWrapper}>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'single' ? styles.active : ''}`}
              onClick={() => setActiveTab('single')}
            >
              <Icon icon="mdi:server-network" width={20} />
              Single Device
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'bulk' ? styles.active : ''}`}
              onClick={() => setActiveTab('bulk')}
            >
              <Icon icon="mdi:file-excel" width={20} />
              Bulk Upload (CSV/XLSX)
            </button>
          </div>

          <div className={sharedStyles.formGrid}>
            <FormField label="Task Name">
              <Input
                type="text"
                placeholder="e.g. Core Switch Addition"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormField>

            <FormField label="Discovery Type" required>
              <Select
                options={typeOptions}
                classNamePrefix="react-select"
                value={typeOptions.find(o => o.value === discoveryType)}
                onChange={(selected) => setDiscoveryType(selected ? selected.value : 'Network Device')}
                styles={customSelectStyles}
              />
            </FormField>

            {discoveryType === 'Other' && (
              <FormField label="Custom Discovery Type" required>
                <Input
                  type="text"
                  placeholder="e.g. IoT Sensor"
                  value={customDiscoveryType}
                  onChange={(e) => setCustomDiscoveryType(e.target.value)}
                />
              </FormField>
            )}

            <div style={{ gridColumn: '1 / -1' }}>
              {activeTab === 'single' ? (
                <FormField label="IP Address or Hostname" required>
                  <Input
                    type="text"
                    placeholder="e.g. 192.168.1.1 or switch-core.local"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                  />
                  <p className={styles.helpText} style={{ marginTop: '0.5rem' }}>Enter a valid IPv4 address or resolvable hostname.</p>
                </FormField>
              ) : (
                <FormField label="Upload Device List (CSV/XLSX)" required>
                  <div className={styles.uploadArea}>
                    <input 
                      type="file" 
                      id="file-upload" 
                      accept=".csv, .xlsx, .xls"
                      onChange={handleFileChange}
                      className={styles.hiddenInput}
                    />
                    <label htmlFor="file-upload" className={styles.uploadLabel}>
                      <Icon icon={file ? "mdi:file-check" : "mdi:cloud-upload"} width={40} className={file ? styles.successIcon : styles.uploadIcon} />
                      <span className={styles.uploadText}>
                        {file ? file.name : "Click to browse or drag and drop"}
                      </span>
                      {!file && <span className={styles.uploadSubtext}>Supports .csv and .xlsx (Ensure first column contains IP/Hostname)</span>}
                    </label>
                  </div>
                </FormField>
              )}
            </div>
          </div>
        </div>

        {/* Authentication & Tagging Section */}
        <div className={sharedStyles.settingsSection}>
          <h3
            style={{
              color: 'var(--color-chart-cyan)',
              fontSize: 'var(--font-md)',
              marginBottom: 'var(--margin-md)',
            }}
          >
            Authentication & Tagging
          </h3>

          <div className={sharedStyles.formGrid}>
            <div style={{ gridColumn: '1 / -1' }}>
              <FormField label="Credential Profiles" required>
                <Select
                  isMulti
                  options={credOptions}
                  isLoading={isLoadingCreds}
                  classNamePrefix="react-select"
                  placeholder="Select credentials to try..."
                  value={credOptions.filter(o => selectedCredentials.includes(o.value))}
                  onChange={(selected) => setSelectedCredentials(selected ? selected.map(s => s.value) : [])}
                  styles={customSelectStyles}
                />
              </FormField>
            </div>

            <FormField label="Discovery Groups">
              <Select
                isMulti
                options={groupOptions}
                isLoading={isLoadingCreds}
                classNamePrefix="react-select"
                placeholder="Assign to groups (Optional)..."
                value={groupOptions.filter(o => selectedGroups.includes(o.value))}
                onChange={(selected) => setSelectedGroups(selected ? selected.map(s => s.value) : [])}
                styles={customSelectStyles}
              />
            </FormField>

            <FormField label="Discovery Tags">
              <Select
                isMulti
                options={tagOptions}
                isLoading={isLoadingCreds}
                classNamePrefix="react-select"
                placeholder="Assign tags (Optional)..."
                value={tagOptions.filter(o => selectedTags.includes(o.value))}
                onChange={(selected) => setSelectedTags(selected ? selected.map(s => s.value) : [])}
                styles={customSelectStyles}
              />
            </FormField>

            <FormField label="Custom Discovery Group">
              <Input
                type="text"
                placeholder="e.g. Core Infrastructure"
                value={customGroup}
                onChange={(e) => setCustomGroup(e.target.value)}
              />
            </FormField>

            <FormField label="Custom Discovery Tag">
              <Input
                type="text"
                placeholder="e.g. Critical"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
              />
            </FormField>
          </div>
        </div>

        <div className={sharedStyles.actionButtons}>
          <button
            className={sharedStyles.btnSecondary}
            onClick={() => {
              setName('');
              setIpAddress('');
              setFile(null);
              setSelectedCredentials([]);
              setSelectedGroups([]);
              setSelectedTags([]);
              setCustomGroup('');
              setCustomTag('');
              setCustomDiscoveryType('');
            }}
          >
            Reset
          </button>
          <button 
            className={sharedStyles.btnPrimary}
            onClick={handleSubmit} 
            disabled={isSubmitting || (activeTab === 'single' ? !ipAddress : !file) || selectedCredentials.length === 0}
          >
            {isSubmitting ? (
              <React.Fragment>
                <Icon icon="mdi:loading" className={styles.spin} width={20} /> Starting Discovery...
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Icon icon="mdi:radar" width={20} /> Discover & Add
              </React.Fragment>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
