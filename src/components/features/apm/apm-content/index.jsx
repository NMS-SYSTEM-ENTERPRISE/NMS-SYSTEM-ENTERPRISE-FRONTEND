'use client';

import { AnalyticsAccordion } from '@/components/features/apm/analytics-accordion';
import { ExplorerAccordion } from '@/components/features/apm/explorer-accordion';
import { ServiceAccordion } from '@/components/features/apm/service-accordion';
import sharedStyles from '@/components/features/apm/shared/styles.module.css';
import { Button } from '@/components/ui/button';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { ApmSkeleton } from '@/components/ui/skeleton-loaders/apm-skeleton';
import { useApm } from '@/hooks/apm';
import { getServiceStatusColor } from '@/utils/constants/apm/status-colors';
import {
  ANALYTICS_DISTRIBUTION_DATA,
  ANALYTICS_PERFORMANCE_DATA,
  ANALYTICS_TOP_SERVICES,
  EXPLORER_TRACE_METRICS,
  SIDEBAR_ITEMS,
} from '@/utils/dummy-data/apm';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

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
    filterOptions,
    pagination,
    setPagination,
    isLoading,
    handleResetFilters,
  } = useApm();

  const handleTraceClick = (trace) => {
    router.push(`/apm/trace/${trace.id}`);
  };

  const dynamicFilters = useMemo(() => {
    const config = [{ key: 'search', type: 'search' }];
    if (!filterOptions) return config;

    if (activeView === 'services') {
      config.push({
        key: 'status_filter',
        type: 'select',
        label: 'Status',
        options: [
          { value: '', label: 'All' },
          ...(filterOptions.service_statuses || []).map((s) => ({ value: s, label: s })),
        ],
        placeholder: 'Select status',
      });
    } else if (activeView === 'explorer') {
      config.push({
        key: 'service',
        type: 'select',
        label: 'Service',
        options: [
          { value: '', label: 'All Services' },
          ...(filterOptions.services || []).map((s) => ({ value: s, label: s })),
        ],
        placeholder: 'Select service',
      });
      config.push({
        key: 'status_code',
        type: 'select',
        label: 'Status Code',
        options: [
          { value: '', label: 'All Codes' },
          ...(filterOptions.status_codes || []).map((s) => ({ value: String(s), label: String(s) })),
        ],
        placeholder: 'Select status code',
      });
      config.push({
        key: 'user',
        type: 'select',
        label: 'User',
        options: [
          { value: '', label: 'All Users' },
          ...(filterOptions.users || []).map((u) => ({ value: u, label: u })),
        ],
        placeholder: 'Select user',
      });
      config.push({ key: 'start_date', type: 'input', inputType: 'date', label: 'Start Date' });
      config.push({ key: 'end_date', type: 'input', inputType: 'date', label: 'End Date' });
    } else if (activeView === 'analytics') {
      config.push({ key: 'start_date', type: 'input', inputType: 'date', label: 'Start Date' });
      config.push({ key: 'end_date', type: 'input', inputType: 'date', label: 'End Date' });
    }
    return config;
  }, [activeView, filterOptions]);

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
                    name: service.name || 'Unknown Service',
                    type: service.framework || 'service',
                    latency: service.latency_ms || 0,
                    throughput: service.throughput_tpm || 0,
                    errors: service.error_rate || 0,
                    trend: service.responseTimeTrend || [],
                    color: getServiceStatusColor(service.status),
                  }))}
                  topLatencyData={[...filteredServices]
                    .sort((a, b) => (b.latency_ms || 0) - (a.latency_ms || 0))
                    .slice(0, 5)
                    .map((service) => ({
                      name: service.name || 'Unknown',
                      endpoint: service.framework || 'service',
                      value: `${(service.latency_ms || 0).toFixed(2)} ms`,
                      sparkline: service.responseTimeTrend || [],
                    }))}
                  topThroughputData={[...filteredServices]
                    .sort((a, b) => (b.throughput_tpm || 0) - (a.throughput_tpm || 0))
                    .slice(0, 5)
                    .map((service) => ({
                      name: service.name || 'Unknown',
                      endpoint: service.framework || 'service',
                      value: `${service.throughput_tpm || 0} tpm`,
                      sparkline: service.throughputTrend || [],
                    }))}
                  topErrorsData={[...filteredServices]
                    .sort((a, b) => (b.error_rate || 0) - (a.error_rate || 0))
                    .slice(0, 5)
                    .map((service) => ({
                      name: service.name || 'Unknown',
                      endpoint: service.framework || 'service',
                      value: (service.error_rate || 0).toString(),
                      sparkline: service.errorTrend || [],
                    }))}
                />
              )}

              {activeView === 'explorer' && (
                <>
                  <ExplorerAccordion
                    traceMetrics={{
                      count: analyticsData?.overview?.total_requests || EXPLORER_TRACE_METRICS.count,
                      countTrend: analyticsData?.history?.map(h => h.requests) || EXPLORER_TRACE_METRICS.countTrend,
                      avgDuration: analyticsData?.overview?.p95_latency_ms || EXPLORER_TRACE_METRICS.avgDuration,
                      durationTrend: analyticsData?.history?.map(h => h.avg_latency_ms) || EXPLORER_TRACE_METRICS.durationTrend,
                      errors: Math.round((analyticsData?.overview?.total_requests || 0) * (analyticsData?.history?.[analyticsData.history.length - 1]?.error_rate || 0) / 100) || EXPLORER_TRACE_METRICS.errors,
                      errorTrend: analyticsData?.history?.map(h => h.error_rate) || EXPLORER_TRACE_METRICS.errorTrend,
                    }}
                    traces={filteredTraces.map((trace) => ({
                      id: trace.trace_id,
                      timestamp: trace.timestamp,
                      serviceName: trace.service,
                      serviceType: 'service',
                      resource: trace.endpoint,
                      duration: trace.duration_ms,
                      spans: 1, // backend doesn't provide spans count
                      status:
                        trace.status_code >= 200 && trace.status_code < 300
                          ? 'success'
                          : trace.status_code >= 400
                            ? 'error'
                            : 'warning',
                    }))}
                    onTraceClick={handleTraceClick}
                  />
                  <div style={{ padding: '16px 24px' }}>
                    <Pagination
                      currentPage={pagination.page}
                      totalItems={pagination.total_count}
                      pageSize={pagination.limit}
                      onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
                      onPageSizeChange={(limit) => setPagination((prev) => ({ ...prev, limit, page: 1 }))}
                    />
                  </div>
                </>
              )}

              {activeView === 'analytics' && (
                <AnalyticsAccordion
                  performanceData={
                    analyticsData?.history ? {
                      requestRate: analyticsData.history.map(h => h.requests),
                      responseTime: analyticsData.history.map(h => h.avg_latency_ms),
                      errorRate: analyticsData.history.map(h => h.error_rate),
                    } : ANALYTICS_PERFORMANCE_DATA
                  }
                  distributionData={
                    analyticsData?.distributionData ||
                    ANALYTICS_DISTRIBUTION_DATA
                  }
                  topServices={
                    analyticsData?.top_endpoints ? analyticsData.top_endpoints.map(ep => ({
                      name: ep.endpoint,
                      type: 'endpoint',
                      requests: ep.count,
                      avgLatency: ep.avg_latency,
                      errorRate: 0,
                      throughput: 0,
                    })) : ANALYTICS_TOP_SERVICES
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
        filters={dynamicFilters}
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
