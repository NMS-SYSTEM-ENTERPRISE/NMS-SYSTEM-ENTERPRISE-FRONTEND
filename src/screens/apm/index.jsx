'use client';
import { AnalyticsAccordion } from '@/components/features/apm/analytics-accordion';
import { ExplorerAccordion } from '@/components/features/apm/explorer-accordion';
import { ServiceAccordion } from '@/components/features/apm/service-accordion';
import { Button } from '@/components/ui/button';
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { Input } from '@/components/ui/input';
import { ApmProvider } from '@/contexts/apm';
import { useApm } from '@/hooks/apm';
import { 
  SIDEBAR_ITEMS, 
  EXPLORER_TRACE_METRICS, 
  ANALYTICS_PERFORMANCE_DATA, 
  ANALYTICS_DISTRIBUTION_DATA, 
  ANALYTICS_TOP_SERVICES,
  FILTER_SIDEBAR_CONFIG
} from '@/utils/dummy-data/apm';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

const getStatusColor = (status) => {
  switch (status) {
    case 'healthy':
      return 'var(--color-success)';
    case 'warning':
      return 'var(--color-warning)';
    case 'critical':
      return 'var(--color-danger)';
    default:
      return 'var(--color-text-muted)';
  }
};

const ApmContent = () => {
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
    handleResetFilters,
  } = useApm();

  const handleServiceClick = (service) => {
    router.push(`/apm/service/${service.id}`);
  };

  const handleTraceClick = (trace) => {
    router.push(`/apm/trace/${trace.id}`);
  };

  return (
    <div className={styles.apm}>
      {/* Left Sidebar */}
      <div
        className={`${styles.leftSidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}
      >
        <div className={styles.sidebarHeader}>
          <span
            className={`${styles.sidebarTitle} ${!isSidebarOpen ? styles.hidden : ''}`}
          >
            Categories
          </span>
          <Button
            variant="ghost"
            className={styles.collapseBtn}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? 'Collapse' : 'Expand'}
          >
            <Icon
              icon={isSidebarOpen ? 'mdi:menu-open' : 'mdi:menu'}
              width={22}
            />
          </Button>
        </div>

        <div className={styles.sidebarNav}>
          {/* Root Node */}
          <div className={styles.treeRoot}>
            <Icon
              icon="mdi:server-network"
              width={18}
              className={styles.rootIcon}
            />
            <span className={styles.rootLabel}>Performance</span>
          </div>

          {/* Children */}
          <div className={styles.treeChildren}>
            {SIDEBAR_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`${styles.navItem} ${
                  activeView === item.id ? styles.navItemActive : ''
                }`}
                onClick={() => setActiveView(item.id)}
                title={!isSidebarOpen ? item.label : ''}
              >
                <div className={styles.treeBranch} />
                <div className={styles.itemIconWrapper}>
                  <Icon icon={item.icon} width={18} height={18} />
                </div>
                <span className={styles.navText}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className={styles.mainContentWrapper}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {/* Empty - no title needed */}
          </div>

          <div className={styles.headerRight}>
            {/* Search */}
            <div className={styles.headerSearch}>
              <Icon
                icon="mdi:magnify"
                className={styles.headerSearchIcon}
                width={18}
                height={18}
              />
              <Input
                type="text"
                placeholder={
                  activeView === 'services'
                    ? 'Search services...'
                    : 'Search traces...'
                }
                className={styles.headerSearchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className={styles.headerActions}>
              <Button
                variant="ghost"
                className={styles.actionBtn}
                onClick={() => setShowFilterSidebar(true)}
                title="Filters"
              >
                <Icon icon="mdi:filter-variant" width={20} height={20} />
              </Button>
              <Button
                variant="ghost"
                className={styles.actionBtn}
                title="Refresh"
              >
                <Icon icon="mdi:refresh" width={20} height={20} />
              </Button>
              <Button
                variant="ghost"
                className={styles.actionBtn}
                title="Export"
              >
                <Icon icon="mdi:download" width={20} height={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className={styles.contentArea}>
          {/* Services View */}
          {activeView === 'services' && (
            <ServiceAccordion
              servicesData={filteredServices.map((service) => ({
                name: service.name,
                type: service.type,
                latency: service.responseTime,
                throughput: service.throughput,
                errors: service.errorCount,
                trend: service.responseTimeTrend,
                color: getStatusColor(service.status),
              }))}
              topLatencyData={[...filteredServices]
                .sort((a, b) => b.responseTime - a.responseTime)
                .slice(0, 5)
                .map((service) => ({
                  name: service.name,
                  endpoint: service.type,
                  value: `${service.responseTime.toFixed(2)} ms`,
                  sparkline: service.responseTimeTrend,
                }))}
              topThroughputData={[...filteredServices]
                .sort((a, b) => b.throughput - a.throughput)
                .slice(0, 5)
                .map((service) => ({
                  name: service.name,
                  endpoint: service.type,
                  value: `${service.throughput} tpm`,
                  sparkline: service.throughputTrend,
                }))}
              topErrorsData={[...filteredServices]
                .sort((a, b) => b.errorCount - a.errorCount)
                .slice(0, 5)
                .map((service) => ({
                  name: service.name,
                  endpoint: service.type,
                  value: service.errorCount.toString(),
                  sparkline: service.errorTrend,
                }))}
            />
          )}

          {/* Explorer View */}
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

          {/* Analytics View */}
          {activeView === 'analytics' && (
            <AnalyticsAccordion
              performanceData={ANALYTICS_PERFORMANCE_DATA}
              distributionData={ANALYTICS_DISTRIBUTION_DATA}
              topServices={ANALYTICS_TOP_SERVICES}
            />
          )}
        </div>
      </div>

      {/* Filter Sidebar */}
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
          console.log('Applied filters:', appliedFilters);
        }}
        onReset={handleResetFilters}
      />
    </div>
  );
};

export default function APM() {
  return (
    <ApmProvider>
      <ApmContent />
    </ApmProvider>
  );
}
