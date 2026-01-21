"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

const REPORT_CATEGORIES = [
  {
    id: 'monitoring',
    label: 'Monitoring Reports',
    icon: 'mdi:monitor-dashboard',
    types: [
      { id: 'availability', name: 'Availability', icon: 'mdi:check-circle', description: 'Monitor availability reports' },
      { id: 'performance', name: 'Performance', icon: 'mdi:speedometer', description: 'Performance metrics reports' },
      { id: 'availability-status', name: 'Availability Status', icon: 'mdi:chart-bar', description: 'Availability status overview' },
      { id: 'availability-flap', name: 'Availability Flap Summary', icon: 'mdi:chart-timeline', description: 'Flap summary reports' },
    ]
  },
  {
    id: 'alerts',
    label: 'Alert Reports',
    icon: 'mdi:bell-alert',
    types: [
      { id: 'active-alerts', name: 'Active Alerts', icon: 'mdi:alert-circle', description: 'Current active alerts' },
      { id: 'metric-alerts', name: 'Metric Alerts', icon: 'mdi:alert-octagon', description: 'Metric-based alerts' },
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics Reports',
    icon: 'mdi:chart-line',
    types: [
      { id: 'log-events', name: 'Log Events', icon: 'mdi:text-box-multiple', description: 'System log events' },
      { id: 'log-analytics', name: 'Log Analytics', icon: 'mdi:chart-line', description: 'Log analytics reports' },
      { id: 'flow-analytics', name: 'Flow Analytics', icon: 'mdi:chart-timeline-variant', description: 'Flow data analytics' },
    ]
  },
  {
    id: 'system',
    label: 'System Reports',
    icon: 'mdi:cog',
    types: [
      { id: 'inventory', name: 'Inventory', icon: 'mdi:database', description: 'Device inventory reports' },
      { id: 'custom-script', name: 'Custom Script', icon: 'mdi:code-tags', description: 'Custom script reports' },
      { id: 'polling-data', name: 'Polling Data', icon: 'mdi:view-grid', description: 'Polling data reports' },
    ]
  },
];

const CreateCustomReport = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Collapsed by default (icons only)
  
  // Select first report type by default
  const firstReportType = REPORT_CATEGORIES[0]?.types[0] || null;
  const [selectedReportType, setSelectedReportType] = useState(firstReportType);
  const [openSections, setOpenSections] = useState({
    monitoring: true,
    alerts: true,
    analytics: true,
    system: true,
  });
  
  // Report configuration state
  const [reportConfig, setReportConfig] = useState({
    name: '',
    description: '',
    timeRange: 'last-24-hours',
    devices: [],
    groups: [],
    metrics: [],
    format: 'pdf',
    schedule: false,
  });

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handleSelectReportType = (type) => {
    setSelectedReportType(type);
  };

  const handleSaveReport = () => {
    console.log('Saving report:', { type: selectedReportType, config: reportConfig });
    router.push('/reports');
  };

  const filteredCategories = REPORT_CATEGORIES.map(category => ({
    ...category,
    types: category.types.filter(type =>
      type.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.types.length > 0);

  return (
    <div className={styles.createCustomReport}>
      {/* Premium Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => router.push('/reports')}>
            <Icon icon="mdi:chevron-left" width={20} />
          </button>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Create Custom Report</h1>
            <span className={styles.subtitle}>Select a report type and configure parameters</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchBar}>
            <Icon icon="mdi:magnify" className={styles.searchIcon} width={18} />
            <input
              type="text"
              placeholder="Search report types..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {/* Left Panel - Report Types */}
        <div className={`${styles.leftPanel} ${!isSidebarOpen ? styles.leftPanelCollapsed : ''}`}>
          <div className={styles.panelHeader}>
            {isSidebarOpen && (
              <>
                <Icon icon="mdi:file-document-multiple" width={18} />
                <span>Report Types</span>
                <span className={styles.badge}>{filteredCategories.reduce((acc, cat) => acc + cat.types.length, 0)}</span>
              </>
            )}
            <button
              className={styles.collapseBtn}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
              style={{ marginLeft: isSidebarOpen ? 'auto' : '0' }}
            >
              <Icon
                icon={isSidebarOpen ? "mdi:chevron-double-left" : "mdi:chevron-double-right"}
                width={20}
              />
            </button>
          </div>

          {/* Collapsed View - Icons Only */}
          {!isSidebarOpen && (
            <div className={styles.collapsedView}>
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className={styles.collapsedCategoryIcon}
                  title={category.label}
                >
                  <Icon icon={category.icon} width={20} />
                </div>
              ))}
            </div>
          )}

          {/* Expanded View - Full Tree */}
          {isSidebarOpen && (
            <div className={styles.categoriesContainer}>
              {filteredCategories.map((category) => (
                <div key={category.id} className={styles.metricGroup}>
                  <div 
                    className={styles.groupHeader}
                    onClick={() => toggleSection(category.id)}
                  >
                    <Icon
                      icon={openSections[category.id] ? "mdi:chevron-down" : "mdi:chevron-right"}
                      width={16}
                      className={styles.groupChevron}
                    />
                    <div className={styles.groupHeaderContent}>
                      <Icon icon={category.icon} width={18} />
                      <span className={styles.groupTitle}>{category.label}</span>
                      <span className={styles.categoryBadge}>{category.types.length}</span>
                    </div>
                  </div>

                  {openSections[category.id] && (
                    <div className={styles.groupContent}>
                      {category.types.map((type) => (
                        <div
                          key={type.id}
                          className={`${styles.metricItem} ${
                            selectedReportType?.id === type.id ? styles.metricItemActive : ''
                          }`}
                          onClick={() => handleSelectReportType(type)}
                        >
                          <span className={styles.metricItemLine}></span>
                          <div className={styles.typeIcon}>
                            <Icon icon={type.icon} width={16} />
                          </div>
                          <div className={styles.typeContent}>
                            <span className={styles.typeName}>{type.name}</span>
                            <span className={styles.typeDescription}>{type.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Panel - Configuration */}
        <div className={styles.rightPanel}>
          {selectedReportType ? (
            <>
              <div className={styles.configHeader}>
                <div className={styles.configHeaderLeft}>
                  <Icon icon={selectedReportType.icon} width={24} />
                  <div>
                    <h2>{selectedReportType.name} Report</h2>
                    <p>{selectedReportType.description}</p>
                  </div>
                </div>
              </div>

              <div className={styles.configContent}>
                {/* Basic Information */}
                <div className={styles.configSection}>
                  <div className={styles.sectionHeader}>
                    <Icon icon="mdi:information" width={16} />
                    <span>Basic Information</span>
                  </div>
                  <div className={styles.sectionContent}>
                    <div className={styles.formGroup}>
                      <label>Report Name *</label>
                      <Input
                        value={reportConfig.name}
                        onChange={(e) => setReportConfig({ ...reportConfig, name: e.target.value })}
                        placeholder="Enter report name"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Description</label>
                      <textarea
                        className={styles.textarea}
                        value={reportConfig.description}
                        onChange={(e) => setReportConfig({ ...reportConfig, description: e.target.value })}
                        placeholder="Enter description"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Data Selection */}
                <div className={styles.configSection}>
                  <div className={styles.sectionHeader}>
                    <Icon icon="mdi:database" width={16} />
                    <span>Data Selection</span>
                  </div>
                  <div className={styles.sectionContent}>
                    <div className={styles.formGroup}>
                      <label>Time Range *</label>
                      <SelectComponent
                        value={reportConfig.timeRange}
                        onChange={(e) => setReportConfig({ ...reportConfig, timeRange: e.target.value })}
                        options={[
                          { value: 'last-24-hours', label: 'Last 24 Hours' },
                          { value: 'last-7-days', label: 'Last 7 Days' },
                          { value: 'last-30-days', label: 'Last 30 Days' },
                          { value: 'last-quarter', label: 'Last Quarter' },
                          { value: 'custom', label: 'Custom Range' },
                        ]}
                        placeholder="Select time range"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Devices/Monitors</label>
                      <SelectComponent
                        isMulti
                        value={reportConfig.devices}
                        onChange={(e) => setReportConfig({ ...reportConfig, devices: e.target.value || [] })}
                        options={[
                          { value: 'all', label: 'All Devices' },
                          { value: 'device1', label: 'Server-01' },
                          { value: 'device2', label: 'Switch-01' },
                          { value: 'device3', label: 'Router-01' },
                        ]}
                        placeholder="Select devices"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Groups</label>
                      <SelectComponent
                        isMulti
                        value={reportConfig.groups}
                        onChange={(e) => setReportConfig({ ...reportConfig, groups: e.target.value || [] })}
                        options={[
                          { value: 'network', label: 'Network' },
                          { value: 'server', label: 'Server' },
                          { value: 'production', label: 'Production' },
                          { value: 'staging', label: 'Staging' },
                        ]}
                        placeholder="Select groups"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Metrics</label>
                      <SelectComponent
                        isMulti
                        value={reportConfig.metrics}
                        onChange={(e) => setReportConfig({ ...reportConfig, metrics: e.target.value || [] })}
                        options={[
                          { value: 'cpu', label: 'CPU Usage' },
                          { value: 'memory', label: 'Memory Usage' },
                          { value: 'disk', label: 'Disk Usage' },
                          { value: 'network', label: 'Network Traffic' },
                          { value: 'uptime', label: 'Uptime' },
                        ]}
                        placeholder="Select metrics"
                      />
                    </div>
                  </div>
                </div>

                {/* Output Configuration */}
                <div className={styles.configSection}>
                  <div className={styles.sectionHeader}>
                    <Icon icon="mdi:file-export" width={16} />
                    <span>Output Configuration</span>
                  </div>
                  <div className={styles.sectionContent}>
                    <div className={styles.formGroup}>
                      <label>Output Format</label>
                      <SelectComponent
                        value={reportConfig.format}
                        onChange={(e) => setReportConfig({ ...reportConfig, format: e.target.value })}
                        options={[
                          { value: 'pdf', label: 'PDF' },
                          { value: 'csv', label: 'CSV' },
                          { value: 'xlsx', label: 'Excel (XLSX)' },
                          { value: 'html', label: 'HTML' },
                        ]}
                        placeholder="Select format"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={reportConfig.schedule}
                          onChange={(e) => setReportConfig({ ...reportConfig, schedule: e.target.checked })}
                        />
                        <span>Schedule Report</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.configFooter}>
                <Button onClick={() => router.push('/reports')} variant="secondary">
                  Cancel
                </Button>
                <Button onClick={handleSaveReport}>
                  <Icon icon="mdi:check" width={18} />
                  Create Report
                </Button>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <Icon icon="mdi:file-document-outline" width={64} />
              <h3>Select a Report Type</h3>
              <p>Choose a report type from the left panel to begin configuration</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCustomReport;
