'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/alerts/shared/styles.module.css';
import { useAlerts } from '@/hooks/alerts';
import { ALERT_SEVERITY_TABS } from '@/utils/constants/alerts';

export const AlertsHeader = () => {
  const {
    view,
    setView,
    severityFilter,
    setSeverityFilter,
    alertCounts,
    setShowFilterSidebar,
    fetchAlerts,
  } = useAlerts();

  return (
    <header className={sharedStyles.header}>
      <div className={sharedStyles.headerLeft}>
        <div className={sharedStyles.headerIcon}>
          <Icon icon="mdi:bell-ring" width={22} />
        </div>
        <h1 className={sharedStyles.headerTitle}>Active Alerts</h1>
      </div>

      <div className={sharedStyles.headerRight}>
        {view === 'overview' && (
          <div className={sharedStyles.severityTabs}>
            {ALERT_SEVERITY_TABS.map((tab) => (
              <Button
                key={tab.label}
                variant="ghost"
                className={`${sharedStyles.severityTab} ${severityFilter === tab.id ? sharedStyles.severityTabActive : ''}`}
                onClick={() => setSeverityFilter(tab.id)}
              >
                {tab.label}{' '}
                <span className={sharedStyles.countBadge}>{alertCounts[tab.countKey]}</span>
              </Button>
            ))}
          </div>
        )}

        <div className={sharedStyles.viewToggle}>
          <Button
            variant={view === 'overview' ? 'primary' : 'ghost'}
            className={`${sharedStyles.viewToggleBtn} ${view === 'overview' ? sharedStyles.viewToggleBtnActive : ''}`}
            onClick={() => setView('overview')}
          >
            <Icon icon="mdi:view-dashboard" width={16} /> Overview
          </Button>
          <Button
            variant={view === 'list' ? 'primary' : 'ghost'}
            className={`${sharedStyles.viewToggleBtn} ${view === 'list' ? sharedStyles.viewToggleBtnActive : ''}`}
            onClick={() => setView('list')}
          >
            <Icon icon="mdi:format-list-bulleted" width={16} /> List
          </Button>
        </div>

        <div className={sharedStyles.headerActions}>
          <Button
            variant="ghost"
            size="icon"
            className={sharedStyles.actionBtn}
            onClick={() => setShowFilterSidebar(true)}
            title="Filters"
          >
            <Icon icon="mdi:filter-variant" width={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={sharedStyles.actionBtn}
            onClick={fetchAlerts}
            title="Refresh"
          >
            <Icon icon="mdi:refresh" width={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};
