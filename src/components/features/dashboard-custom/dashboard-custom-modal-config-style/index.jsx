'use client';

import { Button } from '@/components/ui/button';
import { SelectComponent } from '@/components/ui/select';
import { ToggleSwitch } from '@/components/ui/toggle-switch';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/dashboard-custom/shared/styles.module.css';
import { useDashboardCustom } from '@/hooks/dashboard-custom';
import { getStyleOptionsForTab } from '@/utils/constants/dashboard-custom';

export const DashboardCustomModalConfigStyle = () => {
  const { activeTab, widgetForm, updateFormField } = useDashboardCustom();
  const styleOptions = getStyleOptionsForTab(activeTab);

  return (
    <div className={sharedStyles.configOptions}>
      <div className={sharedStyles.formGroup}>
        <label>Widget Style</label>
        <div className={sharedStyles.styleGrid}>
          {styleOptions.map((style) => (
            <Button
              key={style.id}
              type="button"
              variant="ghost"
              className={clsx(
                sharedStyles.styleCard,
                widgetForm.style === style.id && sharedStyles.styleCardActive
              )}
              onClick={() => updateFormField('style', style.id)}
            >
              <div className={sharedStyles.styleCardInner}>
                <Icon icon={style.icon} width={24} />
                <span className={sharedStyles.styleCardLabel}>{style.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div className={sharedStyles.formGroup}>
        <label>Rotation</label>
        <div className={sharedStyles.rotationControl}>
          <input
            type="number"
            value={widgetForm.rotation}
            onChange={(e) => updateFormField('rotation', parseInt(e.target.value, 10) || 0)}
            className={sharedStyles.numberInput}
          />
          <div className={sharedStyles.sliderControl}>
            <input
              type="range"
              min="0"
              max="360"
              value={widgetForm.rotation}
              onChange={(e) => updateFormField('rotation', parseInt(e.target.value, 10))}
              className={sharedStyles.slider}
            />
          </div>
        </div>
      </div>

      <div className={sharedStyles.formGroup}>
        <label>Line Width</label>
        <div className={sharedStyles.sliderControl}>
          <input
            type="range"
            min="1"
            max="10"
            value={widgetForm.lineWidth}
            onChange={(e) => updateFormField('lineWidth', parseInt(e.target.value, 10))}
            className={sharedStyles.slider}
          />
          <span className={sharedStyles.sliderValue}>{widgetForm.lineWidth}px</span>
        </div>
      </div>

      <div className={sharedStyles.togglesGrid}>
        <ToggleSwitch
          label="Legend"
          checked={widgetForm.legend}
          onChange={(val) => updateFormField('legend', val)}
          className={sharedStyles.toggleItem}
        />
        <ToggleSwitch
          label="X-Axis Title"
          checked={widgetForm.xAxisTitle}
          onChange={(val) => updateFormField('xAxisTitle', val)}
          className={sharedStyles.toggleItem}
        />
        <ToggleSwitch
          label="Y-Axis Title"
          checked={widgetForm.yAxisTitle}
          onChange={(val) => updateFormField('yAxisTitle', val)}
          className={sharedStyles.toggleItem}
        />
        <ToggleSwitch
          label="Z-Axis Title"
          checked={widgetForm.zAxisTitle}
          onChange={(val) => updateFormField('zAxisTitle', val)}
          className={sharedStyles.toggleItem}
        />
        <ToggleSwitch
          label="Markers"
          checked={widgetForm.showMarkers}
          onChange={(val) => updateFormField('showMarkers', val)}
          className={sharedStyles.toggleItem}
        />
        <ToggleSwitch
          label="Area"
          checked={widgetForm.area}
          onChange={(val) => updateFormField('area', val)}
          className={sharedStyles.toggleItem}
        />
      </div>

      <div className={sharedStyles.formGroup}>
        <label>Timeline Preference</label>
        <SelectComponent
          options={[
            { value: 'default', label: 'Default' },
            { value: 'custom', label: 'Custom' },
          ]}
          value={widgetForm.timelinePreference}
          onChange={(e) => updateFormField('timelinePreference', e.target.value)}
        />
      </div>

      <div className={sharedStyles.formGroup}>
        <label>Sorting</label>
        <SelectComponent
          options={[
            { value: 'none', label: 'None' },
            { value: 'asc', label: 'Ascending' },
            { value: 'desc', label: 'Descending' },
          ]}
          value={widgetForm.sorting || 'none'}
          onChange={(e) => updateFormField('sorting', e.target.value)}
        />
      </div>
    </div>
  );
};
