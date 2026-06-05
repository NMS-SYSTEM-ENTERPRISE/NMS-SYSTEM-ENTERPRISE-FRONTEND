'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import sharedStyles from '@/components/features/ticketing/shared/styles.module.css';
import { useTicketing } from '@/hooks/ticketing';
import { TICKETING_SIDEBAR_ITEMS } from '@/utils/constants/ticketing';

export const TicketingHeader = () => {
  const { activeCategory, searchQuery, setSearchQuery, handleOpenSidebar, viewMode, setViewMode } = useTicketing();

  const activeItem = TICKETING_SIDEBAR_ITEMS.find((i) => i.id === activeCategory);

  return (
    <header className={sharedStyles.header}>
      <div className={sharedStyles.headerLeft}>
        <div className={sharedStyles.headerIcon}>
          <Icon icon={activeItem?.icon || 'mdi:ticket'} width={20} />
        </div>
        <h1 className={sharedStyles.headerTitle}>{activeItem?.label || 'Tickets'}</h1>
      </div>

      <div className={sharedStyles.headerRight}>
        <div className={sharedStyles.headerToolbar}>
          <Input
            type="text"
            placeholder="Search tickets..."
            containerClassName={sharedStyles.searchBox}
            className={sharedStyles.searchField}
            icon={<Icon icon="mdi:magnify" width={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className={sharedStyles.viewToggleGroup}>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={clsx(sharedStyles.actionBtn, viewMode === 'dashboard' && sharedStyles.activeActionBtn)}
              onClick={() => setViewMode('dashboard')}
              title="Dashboard View"
            >
              <Icon icon="mdi:view-dashboard-outline" width={18} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={clsx(sharedStyles.actionBtn, viewMode === 'list' && sharedStyles.activeActionBtn)}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <Icon icon="mdi:format-list-bulleted" width={18} />
            </Button>
          </div>

          <div className={sharedStyles.headerActions}>
            <Button
              type="button"
              variant="cyan"
              size="md"
              className={sharedStyles.createBtn}
              onClick={() => handleOpenSidebar('create')}
            >
              <Icon icon="mdi:plus" width={16} />
              <span>New Ticket</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="md"
              className={sharedStyles.actionBtn}
              onClick={() => handleOpenSidebar('alerts')}
              aria-label="Ticket alerts"
            >
              <Icon icon="mdi:bell-outline" width={20} />
              <span className={sharedStyles.notificationDot} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
