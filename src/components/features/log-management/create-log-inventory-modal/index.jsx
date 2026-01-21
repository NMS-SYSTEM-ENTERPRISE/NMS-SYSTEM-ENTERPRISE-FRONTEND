import { useState } from 'react';
import { Icon } from '@iconify/react';
import { FilterSidebar } from '@/components/ui/filter-sidebar';

export const CreateLogInventoryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sourceType: 'Syslog',
    protocol: 'UDP',
    port: '514',
    logFormat: 'Syslog',
    encoding: 'UTF-8',
    timezone: 'UTC',
    enabled: true,
  });

  const handleApply = () => {
    console.log('Create log inventory:', formData);
    onClose();
  };

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      sourceType: 'Syslog',
      protocol: 'UDP',
      port: '514',
      logFormat: 'Syslog',
      encoding: 'UTF-8',
      timezone: 'UTC',
      enabled: true,
    });
  };

  return (
    <FilterSidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Create Log Inventory"
      filters={[
        {
          key: 'name',
          type: 'input',
          label: 'Name',
          placeholder: 'Enter log source name',
          required: true,
        },
        {
          key: 'description',
          type: 'input',
          label: 'Description',
          placeholder: 'Enter description',
        },
        {
          key: 'sourceType',
          type: 'select',
          label: 'Source Type',
          options: [
            { value: 'Syslog', label: 'Syslog' },
            { value: 'File', label: 'File' },
            { value: 'Windows Event', label: 'Windows Event' },
            { value: 'API', label: 'API' },
          ],
          required: true,
        },
        {
          key: 'protocol',
          type: 'select',
          label: 'Protocol',
          options: [
            { value: 'UDP', label: 'UDP' },
            { value: 'TCP', label: 'TCP' },
            { value: 'TLS', label: 'TLS' },
          ],
          required: true,
        },
        {
          key: 'port',
          type: 'input',
          label: 'Port',
          placeholder: '514',
          required: true,
        },
        {
          key: 'logFormat',
          type: 'select',
          label: 'Log Format',
          options: [
            { value: 'Syslog', label: 'Syslog' },
            { value: 'JSON', label: 'JSON' },
            { value: 'CSV', label: 'CSV' },
            { value: 'Custom', label: 'Custom' },
          ],
          required: true,
        },
        {
          key: 'encoding',
          type: 'select',
          label: 'Encoding',
          options: [
            { value: 'UTF-8', label: 'UTF-8' },
            { value: 'ASCII', label: 'ASCII' },
            { value: 'ISO-8859-1', label: 'ISO-8859-1' },
          ],
        },
        {
          key: 'timezone',
          type: 'select',
          label: 'Timezone',
          options: [
            { value: 'UTC', label: 'UTC' },
            { value: 'America/New_York', label: 'America/New_York' },
            { value: 'Europe/London', label: 'Europe/London' },
            { value: 'Asia/Tokyo', label: 'Asia/Tokyo' },
          ],
        },
      ]}
      values={formData}
      onChange={(key, value) => setFormData({ ...formData, [key]: value })}
      onApply={handleApply}
      onReset={handleReset}
      applyButtonText="Create Log Inventory"
      resetButtonText="Reset"
    />
  );
};

