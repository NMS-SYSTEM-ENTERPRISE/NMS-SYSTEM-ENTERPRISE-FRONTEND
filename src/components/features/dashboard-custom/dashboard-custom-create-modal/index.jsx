'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/dashboard-custom/shared/styles.module.css';
import { DashboardCustomModalConfigData } from '@/components/features/dashboard-custom/dashboard-custom-modal-config-data';
import { DashboardCustomModalConfigSettings } from '@/components/features/dashboard-custom/dashboard-custom-modal-config-settings';
import { DashboardCustomModalConfigStyle } from '@/components/features/dashboard-custom/dashboard-custom-modal-config-style';
import { DashboardCustomWidgetPreview } from '@/components/features/dashboard-custom/dashboard-custom-widget-preview';
import { useDashboardCustom } from '@/hooks/dashboard-custom';
import { CONFIG_TABS, WIDGET_TABS } from '@/utils/constants/dashboard-custom';

export const DashboardCustomCreateModal = () => {
  const {
    activeTab,
    setActiveTab,
    configTab,
    setConfigTab,
    widgetForm,
    handleCloseModal,
    handleCreateWidget,
    resetForm,
  } = useDashboardCustom();

  return (
    <div className={sharedStyles.modalOverlay}>
      <div className={sharedStyles.createModal}>
        <div className={sharedStyles.modalHeader}>
          <h2>Create Widget</h2>
          <div className={sharedStyles.modalHeaderRight}>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={sharedStyles.closeBtn}
              onClick={handleCloseModal}
              aria-label="Close create widget modal"
            >
              <Icon icon="mdi:close" width={24} />
            </Button>
          </div>
        </div>

        <div className={sharedStyles.modalTabs}>
          {WIDGET_TABS.map((tab) => (
            <Button
              key={tab}
              type="button"
              variant="ghost"
              className={clsx(sharedStyles.modalTab, activeTab === tab && sharedStyles.modalTabActive)}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>

        <div className={sharedStyles.modalBody}>
          <div className={sharedStyles.previewSection}>
            <div className={sharedStyles.chartPreview}>
              <DashboardCustomWidgetPreview activeTab={activeTab} widgetForm={widgetForm} />
            </div>
          </div>

          <div className={sharedStyles.configSection}>
            <div className={sharedStyles.configTabs}>
              {CONFIG_TABS.map((tab) => (
                <Button
                  key={tab}
                  type="button"
                  variant="ghost"
                  className={clsx(
                    sharedStyles.configTab,
                    configTab === tab && sharedStyles.configTabActive
                  )}
                  onClick={() => setConfigTab(tab)}
                >
                  {tab}
                </Button>
              ))}
            </div>

            <div className={sharedStyles.configContent}>
              {configTab === 'Style' && <DashboardCustomModalConfigStyle />}
              {configTab === 'Data' && <DashboardCustomModalConfigData />}
              {configTab === 'Settings' && <DashboardCustomModalConfigSettings />}
            </div>
          </div>
        </div>

        <div className={sharedStyles.modalBottom}>
          <Button type="button" variant="secondary" className={sharedStyles.secondaryBtn} onClick={resetForm}>
            Reset
          </Button>
          <Button type="button" variant="cyan" className={sharedStyles.primaryBtn} onClick={handleCreateWidget}>
            Create Widget
          </Button>
        </div>
      </div>
    </div>
  );
};
