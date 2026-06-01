import { useState } from 'react';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { Button } from '@/components/ui/button';
import styles from './styles.module.css';

export const CreateViewTopologyModal = ({ isOpen, onClose }) => {
  const [createViewData, setCreateViewData] = useState({
    viewName: '',
    viewGroup: '',
    includeExclude: 'include',
    monitorFilter: '',
    security: 'public',
  });

  return (
    <FilterSidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Create Topology View"
      filters={[
        {
          key: 'viewName',
          type: 'input',
          label: 'Topology View Name',
          placeholder: 'Enter view name',
          required: true,
        },
        {
          key: 'viewGroup',
          type: 'input',
          label: 'Topology View Group',
          placeholder: '<standalone> or <key:value>',
          helpText: 'Enter a standalone name or key:value pair',
        },
        {
          key: 'includeExclude',
          type: 'custom',
          label: 'Include/Exclude',
          render: (value, onChange) => (
            <div className={styles.includeExcludeButtons}>
              <Button
                type="button"
                variant={value === 'include' ? 'primary' : 'outline'}
                className={`${styles.includeExcludeBtn} ${value === 'include' ? styles.includeExcludeBtnActive : ''
                  }`}
                onClick={() => onChange('include')}
              >
                Include
              </Button>
              <Button
                type="button"
                variant={value === 'exclude' ? 'primary' : 'outline'}
                className={`${styles.includeExcludeBtn} ${value === 'exclude' ? styles.includeExcludeBtnActive : ''
                  }`}
                onClick={() => onChange('exclude')}
              >
                Exclude
              </Button>
            </div>
          ),
        },
        {
          key: 'monitorFilter',
          type: 'select',
          label: 'Monitor Filter',
          options: [
            { value: '', label: 'Select' },
            { value: 'all', label: 'All Monitors' },
            { value: 'network', label: 'Network Devices' },
            { value: 'servers', label: 'Servers' },
          ],
          placeholder: 'Select monitor filter',
        },
        {
          key: 'security',
          type: 'custom',
          label: 'Security',
          render: (value, onChange) => (
            <div className={styles.securityButtons}>
              <Button
                type="button"
                variant={value === 'public' ? 'primary' : 'outline'}
                className={`${styles.securityBtn} ${value === 'public' ? styles.securityBtnActive : ''
                  }`}
                onClick={() => onChange('public')}
              >
                Public
              </Button>
              <Button
                type="button"
                variant={value === 'private' ? 'primary' : 'outline'}
                className={`${styles.securityBtn} ${value === 'private' ? styles.securityBtnActive : ''
                  }`}
                onClick={() => onChange('private')}
              >
                Private
              </Button>
            </div>
          ),
          required: true,
        },
      ]}
      filterValues={createViewData}
      onFilterChange={(key, value) =>
        setCreateViewData((prev) => ({ ...prev, [key]: value }))
      }
      onApply={() => {
        console.log('Create topology view:', createViewData);
        onClose();
      }}
      onReset={() => {
        setCreateViewData({
          viewName: '',
          viewGroup: '',
          includeExclude: 'include',
          monitorFilter: '',
          security: 'public',
        });
      }}
      applyButtonLabel="Create Topology View"
    />
  );
};
