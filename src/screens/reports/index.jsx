"use client";
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './styles.module.css';

const REPORT_CATEGORIES = [
  { id: 'favorites', label: 'Favorites', icon: 'mdi:star' },
  { id: 'all', label: 'All Reports', icon: 'mdi:file-document-multiple' },
  { id: 'flow', label: 'Flow Reports', icon: 'mdi:chart-timeline-variant' },
  { id: 'performance', label: 'Performance', icon: 'mdi:speedometer' },
  { id: 'log-events', label: 'Log Events', icon: 'mdi:text-box-multiple' },
  { id: 'inventory', label: 'Inventory', icon: 'mdi:database' },
  { id: 'wireless', label: 'Wireless', icon: 'mdi:wifi' },
  { id: 'availability', label: 'Availability', icon: 'mdi:check-circle' },
  { id: 'virtualization', label: 'Virtualization', icon: 'mdi:cloud-outline' },
  { id: 'alert', label: 'Alert', icon: 'mdi:bell-alert' },
  { id: 'capacity-planning', label: 'Capacity Planning', icon: 'mdi:chart-box', active: true },
  { id: 'network', label: 'Network', icon: 'mdi:lan' },
  { id: 'server', label: 'Server', icon: 'mdi:server' },
  { id: 'process', label: 'Process', icon: 'mdi:cog' },
  { id: 'sdn', label: 'SDN', icon: 'mdi:network' },
  { id: 'service-check', label: 'Service Check', icon: 'mdi:check-decagram' },
  { id: 'hci', label: 'HCI', icon: 'mdi:cube-outline' },
  { id: 'wan-link', label: 'WAN Link', icon: 'mdi:router-wireless' },
  { id: 'forecast', label: 'Forecast', icon: 'mdi:chart-line' },
];

const MOCK_REPORTS = [
  {
    id: '1',
    name: 'aaaaaa',
    description: 'aaaaaa',
    type: 'Performance',
    reportType: 'Custom',
    schedule: false,
    favorite: false,
  },
  {
    id: '2',
    name: 'ABC_Kotak_Raw_Value',
    description: '',
    type: 'Performance',
    reportType: 'Custom',
    schedule: false,
    favorite: false,
  },
  {
    id: '3',
    name: 'abcd',
    description: '',
    type: 'Availability Flap Summ...',
    reportType: 'Custom',
    schedule: false,
    favorite: false,
  },
  {
    id: '4',
    name: 'Active Alerts',
    description: 'Active Alerts',
    type: 'Active Alerts',
    reportType: 'Default',
    schedule: false,
    favorite: true,
  },
  {
    id: '5',
    name: 'Alert flap report',
    description: '',
    type: 'Metric Alerts',
    reportType: 'Custom',
    schedule: false,
    favorite: false,
  },
  {
    id: '6',
    name: 'All Access Point Availability - Last Month',
    description: 'All Access Point Availability - Last Month',
    type: 'Availability',
    reportType: 'Default',
    schedule: false,
    favorite: false,
  },
  {
    id: '7',
    name: 'All Access Point Availability - This Month',
    description: 'All Access Point Availability - This Month',
    type: 'Availability',
    reportType: 'Default',
    schedule: false,
    favorite: false,
  },
  {
    id: '8',
    name: 'All Access Point Availability - This Week',
    description: 'All Access Point Availability - This Week',
    type: 'Availability',
    reportType: 'Default',
    schedule: false,
    favorite: false,
  },
  {
    id: '9',
    name: 'All Devices System CPU Percentage - (Excluded Holidays) -...',
    description:
      'All Devices System CPU Percentage - (Excluded Holidays) - ...',
    type: 'Custom Script',
    reportType: 'Default',
    schedule: false,
    favorite: false,
  },
  {
    id: '10',
    name: 'All Down Interfaces - Current',
    description: 'All Down Interfaces - Current',
    type: 'Active Alerts',
    reportType: 'Default',
    schedule: false,
    favorite: false,
  },
  {
    id: '11',
    name: 'All Down Monitors',
    description: 'All Down Monitors',
    type: 'Active Alerts',
    reportType: 'Default',
    schedule: false,
    favorite: false,
  },
  {
    id: '12',
    name: 'All Interface Availability - Last Day',
    description: 'All Interface Availability - Last Day',
    type: 'Availability',
    reportType: 'Default',
    schedule: false,
    favorite: false,
  },
  {
    id: '13',
    name: 'All Interface Availability - Last Week',
    description: 'All Interface Availability - Last Week',
    type: 'Availability',
    reportType: 'Default',
    schedule: false,
    favorite: false,
  },
  {
    id: '14',
    name: 'All Monitor Availability - Last Day',
    description: 'All Monitor Availability - Last Day',
    type: 'Availability',
    reportType: 'Default',
    schedule: false,
    favorite: false,
  },
  {
    id: '15',
    name: 'All Monitor Availability - Last Month',
    description: 'All Monitor Availability - Last Month',
    type: 'Availability',
    reportType: 'Default',
    schedule: false,
    favorite: false,
  },
  {
    id: '16',
    name: 'All Monitor Availability - Last Quarter',
    description: 'All Monitor Availability - Last Quarter',
    type: 'Availability',
    reportType: 'Default',
    schedule: false,
    favorite: false,
  },
];

const Reports = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Metric');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('capacity-planning');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState(new Set(['1'])); // First accordion open by default
  const [activePopup, setActivePopup] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    reportType: '',
    type: '',
    schedule: '',
    favorite: false,
  });

  const filteredReports = MOCK_REPORTS.filter((report) =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleRow = (id) => {
    const next = new Set(expandedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedRows(next);
  };

  const handleToggleFavorite = (reportId) => {
    console.log('Toggle favorite:', reportId);
  };

  const handleToggleSchedule = (reportId) => {
    console.log('Toggle schedule:', reportId);
  };

  const handleDownload = (reportId) => {
    console.log('Download report:', reportId);
  };

  const handleViewReport = (report) => {
    router.push(`/reports/detail/${report.id}`);
  };

  return (
    <div className={styles.reports}>
      <div className={styles.reports_content}>
        <div className={styles.contentWrapper}>
          {/* Hierarchical Sidebar */}
          <aside className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}>
            <div className={styles.sidebarHeader}>
              <span className={`${styles.sidebarTitle} ${!isSidebarOpen ? styles.hidden : ''}`}>
                CATEGORIES
              </span>
              <button className={styles.collapseBtn} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <Icon icon={isSidebarOpen ? "mdi:menu-open" : "mdi:menu"} width={20} />
              </button>
            </div>

            <div className={styles.tabs}>
              {['Metric', 'Log', 'Flow', 'NCM'].map((tab) => (
                <button
                  key={tab}
                  className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <nav className={styles.categoryNav}>
              <div className={styles.treeRoot}>
                <Icon icon="mdi:chart-bar" className={styles.rootIcon} width={18} />
                <span className={styles.rootLabel}>Report Types</span>
              </div>

              <div className={styles.treeChildren}>
                {REPORT_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    className={`${styles.categoryItem} ${
                      selectedCategory === category.id ? styles.categoryItemActive : ''
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                    title={!isSidebarOpen ? category.label : ''}
                  >
                    <div className={styles.treeBranch} />
                    <div className={styles.itemIconWrapper}>
                      <Icon icon={category.icon} width={18} />
                    </div>
                    <span className={styles.navText}>{category.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <div className={styles.mainContent}>
            <div className={styles.toolbar}>
              <div className={styles.toolbarLeft}>
                <span className={styles.resultCount}>
                  Showing {filteredReports.length} report
                  {filteredReports.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className={styles.toolbarRight}>
                <button
                  className={styles.actionBtn}
                  onClick={() => setShowFilterSidebar(true)}
                  title="Filters & Search"
                >
                  <Icon icon="mdi:filter" width={18} height={18} />
                </button>
                <button
                  className={styles.createBtn}
                  onClick={() => router.push('/reports/create-custom')}
                >
                  Create Custom Report
                </button>
              </div>
            </div>

            <div className={styles.tableContainer}>
              <div className={styles.table}>
                <div className={styles.tableHeaderRow}>
                  <span></span>
                  <span>NAME</span>
                  <span>DESCRIPTION</span>
                  <span>TYPE</span>
                  <span>REPORT TYPE</span>
                  <span>SCHEDULE</span>
                  <span>DOWNLOAD</span>
                  <span></span>
                </div>

                <div className={styles.tableBody}>
                  {filteredReports.map((report) => (
                    <div key={report.id} className={styles.accordionRow}>
                      <div className={styles.rowMain} onClick={() => toggleRow(report.id)}>
                        <Icon
                          icon="mdi:chevron-down"
                          style={{ transform: expandedRows.has(report.id) ? 'rotate(180deg)' : '' }}
                          width={20}
                          className={styles.chevron}
                        />
                        <div className={styles.nameCell}>
                          <button
                            className={`${styles.starBtn} ${
                              report.favorite ? styles.starBtnActive : ''
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFavorite(report.id);
                            }}
                          >
                            <Icon icon="mdi:star" width={14} height={14} />
                          </button>
                          <span
                            className={styles.reportName}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewReport(report);
                            }}
                          >
                            {report.name}
                          </span>
                        </div>
                        <div className={styles.descriptionCell}>
                          {report.description && (
                            <>
                              <span className={styles.descIcon}>📄</span>
                              {report.description}
                            </>
                          )}
                        </div>
                        <span>{report.type}</span>
                        <span>{report.reportType}</span>
                        <button
                          className={`${styles.scheduleToggle} ${
                            report.schedule ? styles.scheduleToggleOn : ''
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleSchedule(report.id);
                          }}
                        >
                          <span className={styles.toggleCircle}></span>
                          <span className={styles.toggleLabel}>
                            {report.schedule ? 'ON' : 'OFF'}
                          </span>
                        </button>
                        <button
                          className={styles.downloadBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(report.id);
                          }}
                        >
                          <Icon icon="mdi:download" width={16} height={16} />
                        </button>
                        <div style={{ position: 'relative' }}>
                          <button 
                            className={styles.actionBtn} 
                            onClick={(e) => {
                              e.stopPropagation();
                              setActivePopup(activePopup === report.id ? null : report.id);
                            }}
                          >
                            ⋮
                          </button>
                          
                          {activePopup === report.id && (
                            <>
                              <div 
                                className={styles.popupBackdrop}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActivePopup(null);
                                }}
                              />
                              <div className={styles.popupMenu}>
                                <button
                                  className={styles.popupItem}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewReport(report);
                                    setActivePopup(null);
                                  }}
                                >
                                  <Icon icon="mdi:eye" width={16} />
                                  <span>View Report</span>
                                </button>
                                <button
                                  className={styles.popupItem}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Edit schedule:', report.id);
                                    setActivePopup(null);
                                  }}
                                >
                                  <Icon icon="mdi:calendar-edit" width={16} />
                                  <span>Edit Schedule</span>
                                </button>
                                <button
                                  className={styles.popupItem}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    console.log('Duplicate:', report.id);
                                    setActivePopup(null);
                                  }}
                                >
                                  <Icon icon="mdi:content-copy" width={16} />
                                  <span>Duplicate</span>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {expandedRows.has(report.id) && (
                        <div className={styles.rowDetails}>
                          <div className={styles.detailsContainer}>
                            {/* Report Information */}
                            <div className={styles.infoSection}>
                              <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>
                                  <Icon icon="mdi:identifier" width={14} className={styles.labelIcon} style={{ color: '#06b6d4' }} />
                                  Report ID
                                </span>
                                <span className={styles.infoCapsule}>RPT-{report.id.padStart(6, '0')}</span>
                              </div>
                              <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>
                                  <Icon icon="mdi:calendar-plus" width={14} className={styles.labelIcon} style={{ color: '#8b5cf6' }} />
                                  Created
                                </span>
                                <span className={styles.infoCapsule}>Jan 15, 2024</span>
                              </div>
                              <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>
                                  <Icon icon="mdi:calendar-edit" width={14} className={styles.labelIcon} style={{ color: '#f59e0b' }} />
                                  Last Modified
                                </span>
                                <span className={styles.infoCapsule}>Jan 20, 2024</span>
                              </div>
                              <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>
                                  <Icon icon="mdi:account" width={14} className={styles.labelIcon} style={{ color: '#10b981' }} />
                                  Owner
                                </span>
                                <span className={styles.infoCapsule}>admin@nms.local</span>
                              </div>
                            </div>

                            {/* Schedule Configuration */}
                            <div className={styles.infoSection}>
                              <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>
                                  <Icon icon="mdi:clock-outline" width={14} className={styles.labelIcon} style={{ color: '#06b6d4' }} />
                                  Frequency
                                </span>
                                <span className={`${styles.infoCapsule} ${report.schedule ? styles.capsuleActive : styles.capsuleInactive}`}>
                                  {report.schedule ? 'Daily' : 'Not Scheduled'}
                                </span>
                              </div>
                              <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>
                                  <Icon icon="mdi:calendar-clock" width={14} className={styles.labelIcon} style={{ color: '#8b5cf6' }} />
                                  Next Run
                                </span>
                                <span className={styles.infoCapsule}>
                                  {report.schedule ? 'Tomorrow 06:00' : 'N/A'}
                                </span>
                              </div>
                              <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>
                                  <Icon icon="mdi:account-multiple" width={14} className={styles.labelIcon} style={{ color: '#f59e0b' }} />
                                  Recipients
                                </span>
                                <span className={styles.infoCapsule}>3 users</span>
                              </div>
                              <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>
                                  <Icon icon="mdi:file-document" width={14} className={styles.labelIcon} style={{ color: '#10b981' }} />
                                  Format
                                </span>
                                <span className={styles.infoCapsule}>PDF, CSV</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Pagination integrated within table */}
                <div className={styles.pagination}>
                  <div className={styles.paginationControls}>
                    <button className={styles.pageBtn}>«</button>
                    <button className={styles.pageBtn}>‹</button>
                    <button className={styles.pageBtn}>1</button>
                    <button className={styles.pageBtn}>2</button>
                    <button className={styles.pageBtn}>3</button>
                    <button className={styles.pageBtn}>4</button>
                    <button className={styles.pageBtn}>5</button>
                    <span className={styles.pageDots}>...</span>
                    <button className={styles.pageBtn}>›</button>
                    <button className={styles.pageBtn}>»</button>
                    <SelectComponent
                      className={styles.itemsSelect}
                      value={50}
                      onChange={() => {}}
                      options={[{ value: 50, label: '50' }]}
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <span className={styles.paginationText}>Items per page</span>
                    <div className={styles.paginationInfo}>
                      1 - 50 of 2811 Items
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={showFilterSidebar}
        onClose={() => setShowFilterSidebar(false)}
        title="Report Filters"
        filters={[
          {
            key: 'search',
            type: 'search',
          },
          {
            key: 'type',
            type: 'select',
            label: 'Report Type',
            options: [
              { value: '', label: 'All' },
              { value: 'Performance', label: 'Performance' },
              { value: 'Availability', label: 'Availability' },
              { value: 'Flow', label: 'Flow' },
              { value: 'Alert', label: 'Alert' },
              { value: 'Active Alerts', label: 'Active Alerts' },
              { value: 'Custom Script', label: 'Custom Script' },
            ],
            placeholder: 'Select report type',
          },
          {
            key: 'reportType',
            type: 'select',
            label: 'Category',
            options: [
              { value: '', label: 'All' },
              { value: 'Default', label: 'Default' },
              { value: 'Custom', label: 'Custom' },
            ],
            placeholder: 'Select category',
          },
          {
            key: 'schedule',
            type: 'select',
            label: 'Schedule',
            options: [
              { value: '', label: 'All' },
              { value: 'true', label: 'Scheduled' },
              { value: 'false', label: 'Not Scheduled' },
            ],
            placeholder: 'Select schedule status',
          },
          {
            key: 'favorite',
            type: 'checkbox',
            label: 'Favorites',
            checkboxLabel: 'Show only favorite reports',
          },
        ]}
        filterValues={filters}
        onFilterChange={(key, value) => {
          setFilters((prev) => ({ ...prev, [key]: value }));
        }}
        onApply={(appliedFilters) => {
          setSearchQuery(appliedFilters.search || '');
          // Apply other filters here
          console.log('Applied filters:', appliedFilters);
        }}
        onReset={() => {
          setFilters({
            search: '',
            reportType: '',
            type: '',
            schedule: '',
            favorite: false,
          });
          setSearchQuery('');
        }}
      />
    </div>
  );
};

export default Reports;
