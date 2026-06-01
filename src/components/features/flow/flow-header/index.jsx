'use client';

import { Button } from '@/components/ui/button';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/flow/shared/styles.module.css';
import { useFlow } from '@/hooks/flow';
import { FLOW_EVENT_SOURCE_OPTIONS, FLOW_INTERFACE_OPTIONS } from '@/utils/constants/flow';

export const FlowHeader = () => {
  const {
    activeView,
    selectedEventSource,
    setSelectedEventSource,
    selectedInterface,
    setSelectedInterface,
    setShowActionSidebar,
  } = useFlow();

  return (
    <div className={sharedStyles.header}>
      <div className={sharedStyles.headerLeft}>
        <div className={sharedStyles.headerIcon}>
          <Icon icon="mdi:swap-horizontal-bold" width={24} height={24} />
        </div>
        <h1 className={sharedStyles.headerTitle}>Flow Analysis</h1>
      </div>

      <div className={sharedStyles.headerRight}>
        <div className={sharedStyles.filterGroup}>
          <label className={sharedStyles.filterLabel}>Event Source:</label>
          <SelectComponent
            variant="borderless"
            className={sharedStyles.select}
            value={selectedEventSource}
            onChange={(e) => setSelectedEventSource(e.target.value)}
            options={FLOW_EVENT_SOURCE_OPTIONS}
            placeholder="Select"
          />
        </div>

        <div className={sharedStyles.filterGroup}>
          <label className={sharedStyles.filterLabel}>Interface:</label>
          <SelectComponent
            variant="borderless"
            className={sharedStyles.select}
            value={selectedInterface}
            onChange={(e) => setSelectedInterface(e.target.value)}
            options={FLOW_INTERFACE_OPTIONS}
            placeholder="Select"
          />
        </div>

        <div className={sharedStyles.headerActions}>
          <Button type="button" variant="ghost" className={sharedStyles.actionBtn} title="Refresh">
            <Icon icon="mdi:refresh" width={20} height={20} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            className={sharedStyles.actionBtn}
            onClick={() => setShowActionSidebar(true)}
            title={activeView === 'dashboard' ? 'Dashboard Actions' : 'Explorer Configuration'}
          >
            <Icon icon="mdi:cog" width={20} height={20} />
          </Button>
          <Button type="button" variant="ghost" className={sharedStyles.actionBtn} title="Export">
            <Icon icon="mdi:download" width={20} height={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};
