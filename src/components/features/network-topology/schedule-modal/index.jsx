import { useState } from 'react';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { Button } from '@/components/ui/button';
import styles from './styles.module.css';

export const ScheduleTopologyModal = ({ isOpen, onClose }) => {
  const [scheduleData, setScheduleData] = useState({
    entryPoint: '',
    schedulerType: 'once',
    days: [],
    startDate: '',
    hours: '',
    linkLayer: 'L2',
    protocol: 'CDP (+1)',
    emailRecipients: '',
    smsRecipients: '',
  });

  return (
    <FilterSidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Topology"
      filters={[
        {
          key: 'entryPoint',
          type: 'select',
          label: 'Entry Point',
          options: [
            { value: '', label: 'Select' },
            { value: 'router-1', label: 'HB1.hb1.com - (172.16.9.221)' },
            {
              value: 'router-4',
              label: 'PMG-Router.test.com - (172.16.8.90)',
            },
          ],
          placeholder: 'Select entry point',
          required: true,
        },
        {
          key: 'schedulerType',
          type: 'custom',
          label: 'Scheduler Type',
          render: (value, onChange) => (
            <div className={styles.schedulerTypeButtons}>
              {['once', 'daily', 'weekly', 'monthly'].map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={value === type ? 'primary' : 'outline'}
                  className={`${styles.schedulerTypeBtn} ${value === type ? styles.schedulerTypeBtnActive : ''
                    }`}
                  onClick={() => onChange(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          ),
        },
        scheduleData.schedulerType === 'weekly' && {
          key: 'days',
          type: 'select',
          label: 'Days',
          isMulti: true,
          options: [
            { value: 'mon', label: 'Monday' },
            { value: 'tue', label: 'Tuesday' },
            { value: 'wed', label: 'Wednesday' },
            { value: 'thu', label: 'Thursday' },
            { value: 'fri', label: 'Friday' },
            { value: 'sat', label: 'Saturday' },
            { value: 'sun', label: 'Sunday' },
          ],
          placeholder: 'Select days',
        },
        {
          key: 'startDate',
          type: 'input',
          label: 'Start Date',
          placeholder: 'MM/DD/YYYY',
          required: true,
        },
        {
          key: 'hours',
          type: 'select',
          label: 'Hours',
          options: Array.from({ length: 24 }, (_, i) => ({
            value: i.toString().padStart(2, '0'),
            label: `${i.toString().padStart(2, '0')}:00`,
          })),
          placeholder: 'Select hour',
          required: true,
        },
        {
          key: 'linkLayer',
          type: 'select',
          label: 'Link Layer',
          options: [
            { value: 'L2', label: 'L2' },
            { value: 'L3', label: 'L3' },
          ],
          required: true,
        },
        {
          key: 'protocol',
          type: 'select',
          label: 'Protocol',
          options: [
            { value: 'CDP (+1)', label: 'CDP (+1)' },
            { value: 'LLDP', label: 'LLDP' },
            { value: 'SNMP', label: 'SNMP' },
          ],
          required: true,
        },
        {
          key: 'emailRecipients',
          type: 'textarea',
          label: 'Notify via Email - Email Recipients',
          placeholder: 'Enter email addresses (comma separated)',
          rows: 2,
        },
        {
          key: 'smsRecipients',
          type: 'textarea',
          label: 'Notify via SMS - SMS Recipients',
          placeholder: 'Enter phone numbers (comma separated)',
          rows: 2,
        },
      ].filter(Boolean)}
      filterValues={scheduleData}
      onFilterChange={(key, value) =>
        setScheduleData((prev) => ({ ...prev, [key]: value }))
      }
      onApply={() => {
        console.log('Schedule topology:', scheduleData);
        onClose();
      }}
      onReset={() => {
        setScheduleData({
          entryPoint: '',
          schedulerType: 'once',
          days: [],
          startDate: '',
          hours: '',
          linkLayer: 'L2',
          protocol: 'CDP (+1)',
          emailRecipients: '',
          smsRecipients: '',
        });
      }}
      applyButtonLabel="Create Scheduler"
    />
  );
};
