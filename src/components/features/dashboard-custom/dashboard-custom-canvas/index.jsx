'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/dashboard-custom/shared/styles.module.css';
import { DashboardCustomWidgetPreview } from '@/components/features/dashboard-custom/dashboard-custom-widget-preview';
import { useDashboardCustom } from '@/hooks/dashboard-custom';

export const DashboardCustomCanvas = () => {
  const { widgets, handleDeleteWidget } = useDashboardCustom();

  return (
    <div className={sharedStyles.canvas}>
      {widgets.length === 0 ? (
        <div className={sharedStyles.emptyState}>
          <Icon icon="mdi:widgets-outline" width={80} />
          <h3>No widgets added yet</h3>
          <p>Select a widget from the sidebar to get started</p>
        </div>
      ) : (
        <div className={sharedStyles.widgetGrid}>
          {widgets.map((widget) => (
            <div key={widget.id} className={sharedStyles.widgetCard}>
              <div className={sharedStyles.widgetHeader}>
                <h3>{widget.title}</h3>
                <div className={sharedStyles.widgetActions}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteWidget(widget.id)}
                    aria-label={`Remove ${widget.title}`}
                  >
                    <Icon icon="mdi:close" width={16} />
                  </Button>
                </div>
              </div>
              <div className={sharedStyles.widgetBody}>
                <DashboardCustomWidgetPreview activeTab={widget.type} widgetForm={widget.config} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
