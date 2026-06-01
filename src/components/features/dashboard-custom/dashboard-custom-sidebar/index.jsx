'use client';

import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/dashboard-custom/shared/styles.module.css';
import { useDashboardCustom } from '@/hooks/dashboard-custom';
import { WIDGET_CATEGORIES, WIDGET_ICON_COLOR_CLASS } from '@/utils/constants/dashboard-custom';

export const DashboardCustomSidebar = () => {
  const { isSidebarCollapsed, toggleSidebarCollapsed, handleAddWidget } = useDashboardCustom();

  return (
    <div
      className={clsx(
        sharedStyles.dashboardSidebar,
        isSidebarCollapsed && sharedStyles.collapsed
      )}
    >
      <div className={sharedStyles.sidebarHeader}>
        {!isSidebarCollapsed && (
          <>
            <Icon icon="mdi:view-grid-plus" width={20} />
            <span>Widgets</span>
          </>
        )}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={sharedStyles.sidebarToggle}
          onClick={toggleSidebarCollapsed}
          aria-label={isSidebarCollapsed ? 'Expand widget sidebar' : 'Collapse widget sidebar'}
        >
          <Icon icon={isSidebarCollapsed ? 'mdi:menu' : 'mdi:chevron-left'} width={20} />
        </Button>
      </div>

      <div className={sharedStyles.sidebarContent}>
        {WIDGET_CATEGORIES.map((category) => (
          <div key={category.category} className={sharedStyles.sidebarCategory}>
            {!isSidebarCollapsed && <h3>{category.category}</h3>}
            <div className={sharedStyles.sidebarGrid}>
              {category.widgets.map((widget) => (
                <Button
                  key={widget.id}
                  type="button"
                  variant="ghost"
                  className={sharedStyles.sidebarWidgetBtn}
                  onClick={() => handleAddWidget(widget)}
                  title={widget.name}
                >
                  <Icon
                    icon={widget.icon}
                    width={isSidebarCollapsed ? 28 : 22}
                    className={sharedStyles[WIDGET_ICON_COLOR_CLASS[widget.colorToken]]}
                  />
                  {!isSidebarCollapsed && <span>{widget.name}</span>}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
