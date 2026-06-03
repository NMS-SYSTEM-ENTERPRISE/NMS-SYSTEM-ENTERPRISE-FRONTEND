'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import sharedStyles from '@/components/features/log-management/shared/styles.module.css';
import { useLogManagement } from '@/hooks/log-management';
import { LOG_WIDGET_ICON_CLASS } from '@/utils/constants/log-management';

const WIDGET_SIDEBAR_TABS = ['All', 'Charts', 'Tables', 'Metrics'];
const WIDGET_CATEGORIES = [
  {
    category: 'Log Trends',
    widgets: [
      { id: 'w1', name: 'Log Volume', icon: 'mdi:chart-bar', colorToken: 'cyan' },
      { id: 'w2', name: 'Severity Trends', icon: 'mdi:chart-line', colorToken: 'violet' }
    ]
  },
  {
    category: 'Security',
    widgets: [
      { id: 'w3', name: 'Failed Logins', icon: 'mdi:shield-alert', colorToken: 'red' },
      { id: 'w4', name: 'Access Denied', icon: 'mdi:account-cancel', colorToken: 'orange' }
    ]
  }
];

export const LogManagementWidgetSidebar = () => {
  const { showWidgetSidebar, setShowWidgetSidebar } = useLogManagement();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(WIDGET_SIDEBAR_TABS[0]);

  if (!showWidgetSidebar) return null;

  const handleWidgetSelect = (widget) => {
    console.log('Selected widget:', widget);
    setShowWidgetSidebar(false);
  };

  return (
    <div className={sharedStyles.widgetSidebarOverlay} onClick={() => setShowWidgetSidebar(false)} role="presentation">
      <div
        className={sharedStyles.widgetSidebar}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Add widget"
      >
        <div className={sharedStyles.widgetSidebarHeader}>
          <div className={sharedStyles.widgetSidebarTitle}>
            <Icon icon="mdi:widgets" width={20} height={20} />
            <span>Add New Widget</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={sharedStyles.widgetSidebarClose}
            onClick={() => setShowWidgetSidebar(false)}
          >
            <Icon icon="mdi:close" width={18} height={18} />
          </Button>
        </div>

        <div className={sharedStyles.widgetSidebarTabs}>
          {WIDGET_SIDEBAR_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`${sharedStyles.widgetSidebarTab} ${
                activeTab === tab ? sharedStyles.widgetSidebarTabActive : ''
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={sharedStyles.widgetSidebarSearch}>
          <Input
            type="text"
            placeholder="Search widgets..."
            containerClassName={sharedStyles.widgetSearchWrap}
            className={sharedStyles.widgetSearchField}
            icon={<Icon icon="mdi:magnify" width={16} height={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={sharedStyles.widgetSidebarContent}>
          {WIDGET_CATEGORIES.map((category) => (
            <div key={category.category} className={sharedStyles.widgetCategory}>
              <h3 className={sharedStyles.widgetCategoryTitle}>{category.category}</h3>
              <div className={sharedStyles.widgetGrid}>
                {category.widgets
                  .filter((w) => w.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((widget) => (
                    <button
                      key={widget.id}
                      type="button"
                      className={sharedStyles.widgetCard}
                      onClick={() => handleWidgetSelect(widget)}
                    >
                      <Icon
                        icon={widget.icon}
                        width={32}
                        height={32}
                        className={sharedStyles[LOG_WIDGET_ICON_CLASS[widget.colorToken]]}
                      />
                      <span>{widget.name}</span>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
