'use client';
import NetPathDetail from '@/components/features/netpath/netpath-detail';
import { OverallNetFlowModal } from '@/components/features/netpath/overall-netflow-modal';
import sharedStyles from '@/components/features/netpath/shared/styles.module.css';
import { Button } from '@/components/ui/button';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { Input } from '@/components/ui/input';
import { NoDataFound } from '@/components/ui/no-data-found';
import { NetPathSidebarSkeleton } from '@/components/ui/skeleton-loaders/netpath-skeleton';
import { useNetPath } from '@/hooks/netpath';
import {
  FILTER_SIDEBAR_CONFIG,
  getPathInitials,
} from '@/utils/constants/netpath/helpers';
import { Icon } from '@iconify/react';
import { useMemo, useState } from 'react';

export const NetPathContent = () => {
  const [showOverallFlow, setShowOverallFlow] = useState(false);
  const {
    activePathId,
    setActivePathId,
    searchQuery,
    setSearchQuery,
    showFilterSidebar,
    setShowFilterSidebar,
    isSidebarOpen,
    setIsSidebarOpen,
    filters,
    setFilters,
    filteredPaths,
    isLoading,
  } = useNetPath();

  const [expandedGroups, setExpandedGroups] = useState({});

  const groupedPaths = useMemo(() => {
    const groups = {};
    filteredPaths.forEach((path) => {
      const g = path.group || 'Ungrouped';
      if (!groups[g]) groups[g] = [];
      groups[g].push(path);
    });
    return groups;
  }, [filteredPaths]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: '',
      source: '',
      destination: '',
      portMin: '',
      portMax: '',
    });
  };

  const getGroupIcon = (groupName) => {
    const name = groupName.toLowerCase();
    if (
      name.includes('network') ||
      name.includes('router') ||
      name.includes('switch')
    )
      return 'mdi:sitemap-outline';
    if (name.includes('ups') || name.includes('power'))
      return 'mdi:battery-charging-high';
    if (name.includes('server') || name.includes('compute'))
      return 'mdi:server-network';
    return 'mdi:folder-network-outline';
  };

  const getNodeIcon = (type) => {
    const t = type.toLowerCase();
    if (t.includes('router')) return 'mdi:router-network';
    if (t.includes('switch')) return 'mdi:switch';
    if (t.includes('firewall')) return 'mdi:security-network';
    if (t.includes('ups')) return 'mdi:battery-charging-100';
    if (t.includes('server')) return 'mdi:server';
    return 'mdi:devices';
  };

  return (
    <div className={sharedStyles.netPathPage}>
      {/* Left Sidebar - Path List */}
      <div
        className={`${sharedStyles.leftSidebar} ${!isSidebarOpen ? sharedStyles.sidebarCollapsed : ''}`}
      >
        <div className={sharedStyles.sidebarHeader}>
          <span
            className={`${sharedStyles.sidebarTitle} ${!isSidebarOpen ? sharedStyles.hidden : ''}`}
          >
            CATEGORIES
          </span>
          <Button
            variant="ghost"
            className={sharedStyles.collapseBtn}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? 'Collapse' : 'Expand'}
          >
            <Icon
              icon={isSidebarOpen ? 'mdi:chevron-left' : 'mdi:chevron-right'}
              width={20}
            />
          </Button>
        </div>

        <div className={sharedStyles.sidebarNav}>
          {/* Search */}
          {isSidebarOpen && (
            <div className={sharedStyles.sidebarSearch}>
              <Input
                type="text"
                placeholder="Search paths..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Icon icon="mdi:magnify" />}
              />
            </div>
          )}

          {/* Path List with Tree Structure - Grouped by Category */}
          <div
            className={sharedStyles.treeChildren}
            style={{ paddingLeft: isSidebarOpen ? '11px' : '0' }}
          >
            {isLoading ? (
              <NetPathSidebarSkeleton isSidebarOpen={isSidebarOpen} />
            ) : filteredPaths.length === 0 ? (
              <div
                style={{
                  padding: isSidebarOpen ? '32px 16px' : '32px 0',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {isSidebarOpen ? (
                  <NoDataFound
                    title="No Paths Found"
                    description="Adjust your search or filters to see paths."
                    icon="mdi:magnify-close"
                  />
                ) : (
                  <div
                    style={{
                      padding: '12px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px dashed rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '16px',
                    }}
                    title="No Paths Found"
                  >
                    <Icon
                      icon="mdi:magnify-close"
                      width={24}
                      height={24}
                      color="var(--color-text-muted)"
                    />
                  </div>
                )}
              </div>
            ) : (
              Object.entries(groupedPaths).map(([groupName, paths]) => {
                const isExpanded = expandedGroups[groupName] !== false; // Default true

                return (
                  <div
                    key={groupName}
                    style={{ width: '100%', marginBottom: '8px' }}
                  >
                    {/* Group Root Node */}
                    <div
                      className={sharedStyles.treeRoot}
                      onClick={() =>
                        setExpandedGroups((prev) => ({
                          ...prev,
                          [groupName]: !isExpanded,
                        }))
                      }
                      style={{ cursor: 'pointer' }}
                    >
                      <Icon
                        icon={getGroupIcon(groupName)}
                        className={sharedStyles.rootIcon}
                        style={{
                          color: groupName.toLowerCase().includes('ups')
                            ? '#f97316'
                            : 'var(--color-chart-cyan)',
                        }}
                        width={18}
                      />
                      <span className={sharedStyles.rootLabel}>
                        {groupName.replace(/_/g, ' ').toUpperCase()}
                      </span>
                    </div>

                    {/* Group Children */}
                    {isExpanded && (
                      <div
                        className={`${sharedStyles.treeChildren} ${sharedStyles.customScrollbar}`}
                        style={{ maxHeight: '220px', overflowY: 'auto', overflowX: 'hidden' }}
                      >
                        {paths.map((path) => (
                          <div
                            key={path.id}
                            className={`${sharedStyles.navItem} ${activePathId === path.id
                              ? sharedStyles.navItemActive
                              : ''
                              }`}
                            onClick={() => setActivePathId(path.id)}
                            title={!isSidebarOpen ? path.name : ''}
                          >
                            <div className={sharedStyles.treeBranch} />

                            <div className={sharedStyles.itemIconWrapper}>
                              {isSidebarOpen ? (
                                <Icon
                                  icon={getNodeIcon(path.type || '')}
                                  width={16}
                                  className={`${sharedStyles[`avatar_${path.status}`]}`}
                                />
                              ) : (
                                <div
                                  className={`${sharedStyles.avatarText} ${sharedStyles[`avatar_${path.status}`]}`}
                                >
                                  {getPathInitials(path.name)}
                                </div>
                              )}
                            </div>

                            <div className={sharedStyles.navContent}>
                              <span className={sharedStyles.navText}>
                                {path.name}
                              </span>
                              {isSidebarOpen && (
                                <span className={sharedStyles.navSubtext}>
                                  {path.destination}:{path.port}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className={sharedStyles.mainContentWrapper}>
        <div className={sharedStyles.header}>
          <div className={sharedStyles.headerLeft}>
            <div className={sharedStyles.headerIcon}>
              <Icon
                icon="mdi:transit-connection-variant"
                width={22}
                height={22}
              />
            </div>
            <div>
              <h1 className={sharedStyles.headerTitle}>
                Network Path Analysis
              </h1>
            </div>
          </div>
          <div className={sharedStyles.headerRight}>
            <div className={sharedStyles.headerActions}>
              <button
                className={sharedStyles.actionBtn}
                onClick={() => setShowOverallFlow(true)}
                title="Overall Net Flow"
                style={{
                  width: 'auto',
                  padding: '0 16px',
                  gap: '8px',
                  background: 'rgba(34, 211, 238, 0.1)',
                  color: 'var(--color-chart-cyan)',
                  borderColor: 'rgba(34, 211, 238, 0.2)',
                }}
              >
                <Icon icon="mdi:hubline" width={18} height={18} />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  Overall Net Flow
                </span>
              </button>
              <button
                className={sharedStyles.actionBtn}
                onClick={() => setShowFilterSidebar(true)}
                title="Filters"
              >
                <Icon icon="mdi:filter-variant" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
        {/* Content Area */}
        <div className={sharedStyles.contentArea}>
          {showOverallFlow && (
            <OverallNetFlowModal onClose={() => setShowOverallFlow(false)} />
          )}

          {activePathId ? (
            <NetPathDetail pathId={activePathId} />
          ) : (
            <div
              style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <NoDataFound
                title="Select a Network Path"
                description="Choose a network path from the sidebar to view hop-by-hop details and latency."
                icon="mdi:transit-connection-variant"
                style={{
                  height: '100%',
                  border: 'none',
                  background: 'transparent',
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={showFilterSidebar}
        onClose={() => setShowFilterSidebar(false)}
        title="NetPath Filters"
        filters={FILTER_SIDEBAR_CONFIG}
        filterValues={filters}
        onFilterChange={(key, value) => {
          setFilters((prev) => ({ ...prev, [key]: value }));
        }}
        onApply={(appliedFilters) => {
          // Apply filters logic here
        }}
        onReset={handleResetFilters}
      />
    </div>
  );
};
