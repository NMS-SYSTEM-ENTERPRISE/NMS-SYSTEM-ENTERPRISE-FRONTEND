'use client';

import { Input } from '@/components/ui/input';
import sharedStyles from '@/components/features/dashboard-custom/shared/styles.module.css';
import { useDashboardCustom } from '@/hooks/dashboard-custom';

export const DashboardCustomModalConfigSettings = () => {
  const { widgetForm, updateFormField } = useDashboardCustom();

  return (
    <div className={sharedStyles.configOptions}>
      <div className={sharedStyles.formGroup}>
        <label>Widget Name</label>
        <Input
          type="text"
          value={widgetForm.name}
          onChange={(e) => updateFormField('name', e.target.value)}
          className={sharedStyles.input}
          placeholder="Enter widget name"
        />
      </div>
      <div className={sharedStyles.formGroup}>
        <label>Widget Description</label>
        <textarea
          value={widgetForm.description}
          onChange={(e) => updateFormField('description', e.target.value)}
          className={sharedStyles.textarea}
          placeholder="Enter widget description"
          rows={4}
        />
      </div>
    </div>
  );
};
