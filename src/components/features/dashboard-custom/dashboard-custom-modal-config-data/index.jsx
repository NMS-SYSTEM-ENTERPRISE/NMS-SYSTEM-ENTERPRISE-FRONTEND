'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import clsx from 'clsx';
import sharedStyles from '@/components/features/dashboard-custom/shared/styles.module.css';
import { useDashboardCustom } from '@/hooks/dashboard-custom';
import { CATEGORY_BUTTONS } from '@/utils/constants/dashboard-custom';

export const DashboardCustomModalConfigData = () => {
  const { widgetForm, updateFormField } = useDashboardCustom();

  return (
    <div className={sharedStyles.configOptions}>
      <div className={sharedStyles.formGroup}>
        <label>
          Metric <span className={sharedStyles.required}>*</span>
        </label>
        <Input
          type="text"
          value={widgetForm.counter}
          onChange={(e) => updateFormField('counter', e.target.value)}
          className={sharedStyles.input}
          placeholder="Search metric..."
        />
      </div>

      <div className={sharedStyles.formGroup}>
        <label>
          Aggregation <span className={sharedStyles.required}>*</span>
        </label>
        <SelectComponent
          options={[
            { value: 'avg', label: 'Avg' },
            { value: 'max', label: 'Max' },
            { value: 'min', label: 'Min' },
            { value: 'sum', label: 'Sum' },
          ]}
          value={widgetForm.aggregation}
          onChange={(e) => updateFormField('aggregation', e.target.value)}
        />
      </div>

      <div className={sharedStyles.formGroup}>
        <label>Source Filter</label>
        <div className={sharedStyles.radioGroup}>
          <label className={sharedStyles.radioLabel}>
            <input
              type="radio"
              name="sourceFilter"
              value="everywhere"
              checked={widgetForm.sourceFilter === 'everywhere'}
              onChange={(e) => updateFormField('sourceFilter', e.target.value)}
            />
            Everywhere
          </label>
          <label className={sharedStyles.radioLabel}>
            <input
              type="radio"
              name="sourceFilter"
              value="source"
              checked={widgetForm.sourceFilter === 'source'}
              onChange={(e) => updateFormField('sourceFilter', e.target.value)}
            />
            Source
          </label>
        </div>
      </div>

      {widgetForm.sourceFilter === 'source' && (
        <div className={sharedStyles.formGroup}>
          <label>Source</label>
          <Input
            type="text"
            value={widgetForm.source}
            onChange={(e) => updateFormField('source', e.target.value)}
            className={sharedStyles.input}
            placeholder="Enter source..."
          />
        </div>
      )}

      <div className={sharedStyles.formGroup}>
        <label>Result By</label>
        <SelectComponent
          options={[
            { value: 'host', label: 'Host' },
            { value: 'service', label: 'Service' },
          ]}
          value={widgetForm.resultBy}
          onChange={(e) => updateFormField('resultBy', e.target.value)}
          placeholder="Select result by"
        />
      </div>

      <div className={sharedStyles.formGroup}>
        <label>Filters</label>
        <div className={sharedStyles.filterTags}>
          {CATEGORY_BUTTONS.map((cat) => (
            <Button
              key={cat}
              type="button"
              variant="ghost"
              className={clsx(
                sharedStyles.filterTag,
                widgetForm.selectedCategory === cat && sharedStyles.filterTagActive
              )}
              onClick={() => updateFormField('selectedCategory', cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
