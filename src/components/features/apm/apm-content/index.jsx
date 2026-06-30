'use client';

import { AnalyticsAccordion } from '@/components/features/apm/analytics-accordion';
import { ExplorerAccordion } from '@/components/features/apm/explorer-accordion';
import { ServiceAccordion } from '@/components/features/apm/service-accordion';
import sharedStyles from '@/components/features/apm/shared/styles.module.css';
import { Button } from '@/components/ui/button';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { Input } from '@/components/ui/input';
import { ApmSkeleton } from '@/components/ui/skeleton-loaders/apm-skeleton';
import { useApm } from '@/hooks/apm';
import { getServiceStatusColor } from '@/utils/constants/apm/status-colors';
import {
  ANALYTICS_DISTRIBUTION_DATA,
  ANALYTICS_PERFORMANCE_DATA,
  ANALYTICS_TOP_SERVICES,
  EXPLORER_TRACE_METRICS,
  FILTER_SIDEBAR_CONFIG,
  SIDEBAR_ITEMS,
} from '@/utils/dummy-data/apm';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export const ApmContent = () => {
  const router = useRouter();
  const {
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    showFilterSidebar,
    setShowFilterSidebar,
    isSidebarOpen,
    setIsSidebarOpen,
    filters,
    setFilters,
    filteredServices,
    filteredTraces,
    analyticsData,
    isLoading,
    handleResetFilters,
  } = useApm();

  const handleTraceClick = (trace) => {
    router.push(`/apm/trace/${trace.id}`);
  };

  return (
    <div className={sharedStyles.apm}>
      <div
        className={clsx(
          sharedStyles.leftSidebar,
          !isSidebarOpen && sharedStyles.sidebarCollapsed
        )}
      >
        <div className={sharedStyles.sidebarHeader}>
          <span
            className={clsx(
              sharedStyles.sidebarTitle,
              !isSidebarOpen && sharedStyles.hidden
            )}
          >
            Categories
          </span>
          <Button
            type="button"
            variant="ghost"
            className={sharedStyles.collapseBtn}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? 'Collapse' : 'Expand'}
          >
            <Icon
              icon={isSidebarOpen ? 'mdi:menu-open' : 'mdi:menu'}
              width={22}
            />
          </Button>
        </div>

        <div className={sharedStyles.sidebarNav}>
          <div className={sharedStyles.treeRoot}>
            <Icon
              icon="mdi:server-network"
              width={18}
              className={sharedStyles.rootIcon}
            />
            <span className={sharedStyles.rootLabel}>Performance</span>
          </div>

          <div className={sharedStyles.treeChildren}>
            {SIDEBAR_ITEMS.map((item) => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                className={clsx(
                  sharedStyles.navItem,
                  activeView === item.id && sharedStyles.navItemActive
                )}
                onClick={() => setActiveView(item.id)}
                onKeyDown={(e) => e.key === 'Enter' && setActiveView(item.id)}
                title={!isSidebarOpen ? item.label : ''}
              >
                <div className={sharedStyles.treeBranch} />
                <div className={sharedStyles.itemIconWrapper}>
                  <Icon icon={item.icon} width={18} height={18} />
                </div>
                <span className={sharedStyles.navText}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={sharedStyles.mainContentWrapper}>
        <div className={sharedStyles.header}>
          <div className={sharedStyles.headerLeft}>
            <div className={sharedStyles.headerIcon}>
              <Icon
                icon="mdi:chart-timeline-variant-shimmer"
                width={22}
                height={22}
              />
            </div>
            <div>
              <h1 className={sharedStyles.headerTitle}>APM</h1>
            </div>
          </div>
          <div className={sharedStyles.headerRight}>
            <Input
              type="text"
              placeholder={
                activeView === 'services'
                  ? 'Search services...'
                  : 'Search traces...'
              }
              className={sharedStyles.headerSearchInput}
              containerClassName={sharedStyles.headerSearch}
              icon={<Icon icon="mdi:magnify" width={18} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className={sharedStyles.headerActions}>
              <Button
                type="button"
                variant="ghost"
                className={sharedStyles.actionBtn}
                onClick={() => setShowFilterSidebar(true)}
                title="Filters"
              >
                <Icon icon="mdi:filter-variant" width={20} height={20} />
              </Button>
              <Button
                type="button"
                variant="ghost"
                className={sharedStyles.actionBtn}
                title="Refresh"
              >
                <Icon icon="mdi:refresh" width={20} height={20} />
              </Button>
              <Button
                type="button"
                variant="ghost"
                className={sharedStyles.actionBtn}
                title="Export"
              >
                <Icon icon="mdi:download" width={20} height={20} />
              </Button>
            </div>
          </div>
        </div>

        <div className={sharedStyles.contentArea}>
          {isLoading ? (
            <ApmSkeleton />
          ) : (
            <>
              {activeView === 'services' && (
                <ServiceAccordion
                  servicesData={filteredServices.map((service) => ({
                    name: service.name || 'Unknown',
                    type: service.framework || service.type || 'Unknown',
                    latency: service.latency_ms || service.responseTime || 0,
                    throughput: service.throughput_tpm || service.throughput || 0,
                    errors: service.error_rate || service.errorCount || 0,
                    trend: service.responseTimeTrend || [],
                    color: getServiceStatusColor(service.status),
                  }))}
                  topLatencyData={[...filteredServices]
                    .sort((a, b) => (b.latency_ms || b.responseTime || 0) - (a.latency_ms || a.responseTime || 0))
                    .slice(0, 5)
                    .map((service) => ({
                      name: service.name || 'Unknown',
                      endpoint: service.framework || service.type || 'Unknown',
                      value: `${(service.latency_ms || service.responseTime || 0).toFixed(2)} ms`,
                      sparkline: service.responseTimeTrend || [],
                    }))}
                  topThroughputData={[...filteredServices]
                    .sort((a, b) => (b.throughput_tpm || b.throughput || 0) - (a.throughput_tpm || a.throughput || 0))
                    .slice(0, 5)
                    .map((service) => ({
                      name: service.name || 'Unknown',
                      endpoint: service.framework || service.type || 'Unknown',
                      value: `${service.throughput_tpm || service.throughput || 0} tpm`,
                      sparkline: service.throughputTrend || [],
                    }))}
                  topErrorsData={[...filteredServices]
                    .sort((a, b) => (b.error_rate || b.errorCount || 0) - (a.error_rate || a.errorCount || 0))
                    .slice(0, 5)
                    .map((service) => ({
                      name: service.name || 'Unknown',
                      endpoint: service.framework || service.type || 'Unknown',
                      value: (service.error_rate || service.errorCount || 0).toString(),
                      sparkline: service.errorTrend || [],
                    }))}
                />
              )}

              {activeView === 'explorer' && (
                <ExplorerAccordion
                  traceMetrics={EXPLORER_TRACE_METRICS}
                  traces={filteredTraces.map((trace) => ({
                    id: trace.id,
                    timestamp: trace.timestamp,
                    serviceName: trace.serviceName,
                    serviceType: trace.type || 'service',
                    resource: trace.resource,
                    duration: trace.duration,
                    spans: trace.spans,
                    status:
                      trace.status === 200
                        ? 'success'
                        : trace.status >= 400
                          ? 'error'
                          : 'warning',
                  }))}
                  onTraceClick={handleTraceClick}
                />
              )}

              {activeView === 'analytics' && (
                <AnalyticsAccordion
                  performanceData={
                    analyticsData?.performanceData || ANALYTICS_PERFORMANCE_DATA
                  }
                  distributionData={
                    analyticsData?.distributionData ||
                    ANALYTICS_DISTRIBUTION_DATA
                  }
                  topServices={
                    analyticsData?.topServices || ANALYTICS_TOP_SERVICES
                  }
                />
              )}
            </>
          )}
        </div>
      </div>

      <FilterSidebar
        isOpen={showFilterSidebar}
        onClose={() => setShowFilterSidebar(false)}
        title="APM Filters"
        filters={FILTER_SIDEBAR_CONFIG}
        filterValues={filters}
        onFilterChange={(key, value) => {
          setFilters((prev) => ({ ...prev, [key]: value }));
        }}
        onApply={(appliedFilters) => {
          setSearchQuery(appliedFilters.search || '');
        }}
        onReset={handleResetFilters}
      />
    </div>
  );
};
