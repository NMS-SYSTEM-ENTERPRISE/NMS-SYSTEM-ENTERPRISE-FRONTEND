'use client';
import { TicketingActionSidebar } from '@/components/features/ticketing/ticketing-action-sidebar';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { TicketingCharts, TicketingStats } from './dashboard';
import { TicketingRequests } from './requests';
import styles from './styles.module.css';

const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'mdi:view-dashboard-outline' },
  { id: 'all', label: 'All Tickets', icon: 'mdi:ticket-outline' },
  { id: 'my-tickets', label: 'My Tickets', icon: 'mdi:account-outline' },
  { id: 'open', label: 'Open Tickets', icon: 'mdi:alert-circle-outline' },
  { id: 'closed', label: 'Closed Tickets', icon: 'mdi:check-circle-outline' },
];

const Ticketing = () => {
  const [activeCategory, setActiveCategory] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default Collapsed
  // Expanded sections: stats, analytics, list
  const [expandedSections, setExpandedSections] = useState(
    new Set(['stats', 'analytics', 'list'])
  );
  const [sidebarState, setSidebarState] = useState({
    isOpen: false,
    mode: 'details',
    ticketData: null,
  });

  const toggleSection = (section) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };
  const handleOpenSidebar = (mode, ticketData = null) => {
    setSidebarState({
      isOpen: true,
      mode,
      ticketData,
    });
  };

  const handleCloseSidebar = () => {
    setSidebarState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className={styles.ticketingPage}>
      {/* Left Sidebar */}
      <div
        className={`${styles.leftSidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}
      >
        <div className={styles.sidebarHeader}>
          <span
            className={`${styles.sidebarTitle} ${!isSidebarOpen ? styles.hidden : ''}`}
          >
            Ticketing System
          </span>
          <button
            className={styles.collapseBtn}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Icon
              icon={isSidebarOpen ? 'mdi:menu-open' : 'mdi:menu'}
              width={20}
            />
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          <div className={styles.treeRoot}>
            <Icon
              icon="mdi:ticket-confirmation-outline"
              className={styles.rootIcon}
            />
            <span className={styles.rootLabel}>Tickets</span>
          </div>

          <div className={styles.treeChildren}>
            {SIDEBAR_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`${styles.navItem} ${
                  activeCategory === item.id ? styles.navItemActive : ''
                }`}
                onClick={() => {
                  setActiveCategory(item.id);
                  const newExpanded = new Set(expandedSections);
                  newExpanded.add('list');
                  setExpandedSections(newExpanded);
                }}
                title={!isSidebarOpen ? item.label : ''}
              >
                <div className={styles.treeBranch} />
                <div className={styles.itemIconWrapper}>
                  <Icon
                    icon={item.icon}
                    width={18}
                    style={{
                      color:
                        activeCategory === item.id ? 'inherit' : item.color,
                    }}
                  />
                </div>
                <span className={styles.navText}>{item.label}</span>
                {item.id === 'open' && <span className={styles.badge}>5</span>}
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content Wrapper */}
      <div className={styles.mainContentWrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <Icon
                icon={
                  SIDEBAR_ITEMS.find((i) => i.id === activeCategory)?.icon ||
                  'mdi:ticket'
                }
                width={20}
              />
            </div>
            <h1 className={styles.headerTitle}>
              {SIDEBAR_ITEMS.find((i) => i.id === activeCategory)?.label ||
                'Tickets'}
            </h1>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.searchBox}>
              <Icon icon="mdi:magnify" className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.headerActions}>
              <button
                className={styles.createBtn}
                onClick={() => handleOpenSidebar('create')}
              >
                <Icon icon="mdi:plus" width={16} />
                <span>New Ticket</span>
              </button>
              <button
                className={styles.actionBtn}
                onClick={() => handleOpenSidebar('alerts')}
              >
                <Icon icon="mdi:bell-outline" width={20} />
                <span className={styles.notificationDot} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area with Timeline Accordion */}
        <div className={styles.contentArea}>
          <div className={styles.timelineContainer}>
            {/* Group 1: Real-time Analytics */}
            <div
              className={styles.accordionGroup}
              data-open={expandedSections.has('stats')}
            >
              <div
                className={styles.accordionHeader}
                onClick={() => toggleSection('stats')}
              >
                <div className={styles.headerNode}>
                  <Icon icon="mdi:monitor-dashboard" width={18} />
                </div>
                <div className={styles.headerInfo}>
                  <h3 className={styles.sectionTitle}>
                    Real-time Analytics{' '}
                    <span className={styles.badge} data-type="dashboard">
                      Live
                    </span>
                  </h3>
                </div>
                <Icon
                  icon="mdi:chevron-down"
                  className={styles.accordionChevron}
                  width={20}
                />
              </div>
              <div className={styles.accordionContent}>
                <TicketingStats />
              </div>
            </div>

            {/* Group 2: Traffic Distribution */}
            <div
              className={styles.accordionGroup}
              data-open={expandedSections.has('analytics')}
            >
              <div
                className={styles.accordionHeader}
                onClick={() => toggleSection('analytics')}
              >
                <div className={styles.headerNode}>
                  <Icon icon="mdi:chart-pie" width={18} />
                </div>
                <div className={styles.headerInfo}>
                  <h3 className={styles.sectionTitle}>
                    Traffic Distribution{' '}
                    <span
                      className={styles.badge}
                      style={{
                        color: '#c084fc',
                        background: 'rgba(192, 132, 252, 0.1)',
                      }}
                    >
                      Analytics
                    </span>
                  </h3>
                </div>
                <Icon
                  icon="mdi:chevron-down"
                  className={styles.accordionChevron}
                  width={20}
                />
              </div>
              <div className={styles.accordionContent}>
                <TicketingCharts />
              </div>
            </div>

            {/* Group 3: Top Conversations (Ticket Management) */}
            <div
              className={styles.accordionGroup}
              data-open={expandedSections.has('list')}
            >
              <div
                className={styles.accordionHeader}
                onClick={() => toggleSection('list')}
              >
                <div className={styles.headerNode}>
                  <Icon icon="mdi:format-list-bulleted" width={18} />
                </div>
                <div className={styles.headerInfo}>
                  <h3 className={styles.sectionTitle}>
                    Top Conversations{' '}
                    <span className={styles.badge} data-type="list">
                      Summary
                    </span>
                  </h3>
                </div>
                <Icon
                  icon="mdi:chevron-down"
                  className={styles.accordionChevron}
                  width={20}
                />
              </div>
              <div className={styles.accordionContent} style={{ padding: 0 }}>
                <TicketingRequests
                  category={activeCategory}
                  searchQuery={searchQuery}
                  onTicketClick={(ticket) =>
                    handleOpenSidebar('details', ticket)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Sidebar (Right) */}
      <TicketingActionSidebar
        isOpen={sidebarState.isOpen}
        onClose={handleCloseSidebar}
        mode={sidebarState.mode}
        ticketData={sidebarState.ticketData}
      />
    </div>
  );
};

export default Ticketing;
