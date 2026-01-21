"use client";
import { SLOActionSidebar } from '@/components/features/slo/slo-action-sidebar';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import styles from './styles.module.css';

// Mock SLO data
const MOCK_SLOS = [
  {
    id: '1',
    name: 'Monitor-SLO-Weekly-Perf-Windows',
    status: 'Ok',
    sloType: 'Performance',
    frequency: 'Daily',
    target: '90%',
    achieved: '100%',
    violation: '0%',
    errorBudgetLeft: '2 h 24 m',
    mttr: '-',
    mtbf: '-',
  },
  {
    id: '2',
    name: 'slo-tag-coorelation',
    status: 'Ok',
    sloType: 'Availability',
    frequency: 'Quarterly',
    target: '75%',
    achieved: '93.56%',
    violation: '6.44%',
    errorBudgetLeft: '2 W 2 d 18 h 55 m 17 s',
    mttr: '5 d 19 h 4 m 43 s',
    mtbf: 'N/A',
  },
  {
    id: '3',
    name: 'slo-monthly-interface',
    status: 'Warning',
    sloType: 'Availability',
    frequency: 'Monthly',
    target: '75%',
    achieved: '80.68%',
    violation: '19.32%',
    errorBudgetLeft: '1 d 18 h 55 m 17 s',
    mttr: '5 d 19 h 4 m 43 s',
    mtbf: 'N/A',
  },
  {
    id: '4',
    name: 'Monitor-SLO-Monthly-Ava-Server,Network,W...',
    status: 'Breached',
    sloType: 'Availability',
    frequency: 'Monthly',
    target: '90%',
    achieved: '80.68%',
    violation: '19.32%',
    errorBudgetLeft: '2 d 19 h 4 m 43 s',
    mttr: '5 d 19 h 4 m 43 s',
    mtbf: 'N/A',
  },
  {
    id: '5',
    name: 'Interface-SLO-Weekly-Ava-Network',
    status: 'Breached',
    sloType: 'Availability',
    frequency: 'Weekly',
    target: '90%',
    achieved: '16.92%',
    violation: '83.08%',
    errorBudgetLeft: '-5 d 2 h 46 m 43 s',
    mttr: '5 d 19 h 34 m 43 s',
    mtbf: 'N/A',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All SLOs', icon: 'ph:list-bold', color: 'var(--color-accent-cyan)' },
  { id: 'Performance', label: 'Performance', icon: 'ph:gauge-bold', color: '#8b5cf6' },
  { id: 'Availability', label: 'Availability', icon: 'ph:globe-bold', color: '#10b981' },
  { id: 'Breached', label: 'Breached', icon: 'ph:warning-circle-bold', color: '#ef4444' },
  { id: 'Warning', label: 'Warning', icon: 'ph:warning-bold', color: '#f59e0b' },
  { id: 'Ok', label: 'Healthy', icon: 'ph:check-circle-bold', color: '#10b981' },
];

const SLO = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSLO, setSelectedSLO] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [showActionSidebar, setShowActionSidebar] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    sloType: '',
    frequency: '',
    targetMin: '',
    targetMax: '',
    violationMin: '',
    violationMax: '',
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  // Filter Logic
  const filteredSLOs = MOCK_SLOS.filter((slo) => {
    // Search Filter
    const matchesSearch = slo.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category Filter
    let matchesCategory = true;
    if (activeCategory !== 'all') {
      if (['Breached', 'Warning', 'Ok'].includes(activeCategory)) {
        matchesCategory = slo.status === activeCategory;
      } else {
        matchesCategory = slo.sloType === activeCategory;
      }
    }

    return matchesSearch && matchesCategory;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Ok': return styles.statusOk;
      case 'Warning': return styles.statusWarning;
      case 'Breached': return styles.statusBreached;
      default: return '';
    }
  };

  const handleRowClick = (slo) => {
    router.push(`/slo/${slo.id}`);
  };

  return (
    <div className={styles.sloPage}>
      {/* Sidebar */}
      <aside className={`${styles.leftSidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}>
        <div className={styles.sidebarHeader}>
          <span className={`${styles.sidebarTitle} ${!isSidebarOpen ? styles.hidden : ''}`}>
            Categories
          </span>
          <button className={styles.collapseBtn} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Icon icon={isSidebarOpen ? "mdi:menu-open" : "mdi:menu"} width={20} />
          </button>
        </div>
        
        <nav className={styles.sidebarNav}>
          <div className={styles.treeRoot}>
            <Icon icon="ph:target-bold" className={styles.rootIcon} />
            <span className={styles.rootLabel}>SLO Management</span>
          </div>

          <div className={styles.treeChildren}>
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className={`${styles.navItem} ${activeCategory === cat.id ? styles.navItemActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                title={!isSidebarOpen ? cat.label : ''}
              >
                <div className={styles.treeBranch} />
                <div className={styles.itemIconWrapper}>
                  <Icon icon={cat.icon} width={18} />
                </div>
                <span className={styles.navText}>{cat.label}</span>
              </div>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={styles.mainContentWrapper}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <Icon icon="ph:chart-line-up-bold" width={20} />
            </div>
            <h1 className={styles.headerTitle}>SLO Portfolio</h1>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.headerSearch}>
              <Icon icon="ph:magnifying-glass-bold" className={styles.headerSearchIcon} width={16} />
              <input
                type="text"
                placeholder="Search resources..."
                className={styles.headerSearchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewToggleBtn} ${viewMode === 'table' ? styles.viewToggleBtnActive : ''}`}
                onClick={() => setViewMode('table')}
              >
                <Icon icon="ph:list-bold" />
              </button>
              <button
                className={`${styles.viewToggleBtn} ${viewMode === 'grid' ? styles.viewToggleBtnActive : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Icon icon="ph:squares-four-bold" />
              </button>
            </div>

            <div className={styles.headerActions}>
              <button className={styles.actionBtn} onClick={() => setShowActionSidebar(true)}>
                <Icon icon="ph:funnel-bold" />
              </button>
              <button className={styles.actionBtn}>
                <Icon icon="ph:arrows-clockwise-bold" />
              </button>
              <button className={styles.actionBtn} style={{background: 'var(--color-accent-cyan)', color: '#000'}}>
                <Icon icon="ph:plus-bold" />
              </button>
            </div>
          </div>
        </header>

        <div className={styles.contentArea}>
          <div className={styles.toolbar}>
            <span className={styles.resultCount}>
               {filteredSLOs.length} entries found
            </span>
          </div>

          {viewMode === 'table' ? (
            <div className={styles.listContainer}>
              <div className={styles.tableHeaderRow}>
                <span>Definition</span>
                <span>Status</span>
                <span>Objective</span>
                <span>Actual</span>
                <span>Error Budget</span>
                <span></span>
              </div>
              <div className={styles.listBody}>
                {filteredSLOs.map((slo) => (
                  <div key={slo.id} className={styles.tableRow} onClick={() => handleRowClick(slo)}>
                    <div className={styles.rowIdentity}>
                      <div className={styles.rowIcon}>
                        <Icon icon={CATEGORIES.find(c => c.id === slo.sloType)?.icon || 'ph:target-bold'} width={16} />
                      </div>
                      <div className={styles.rowInfo}>
                        <span className={styles.rowName}>{slo.name}</span>
                        <span className={styles.rowSub}>
                          <Icon icon="ph:clock-bold" width={10} /> {slo.frequency} 
                        </span>
                      </div>
                    </div>

                    <div className={styles.rowStatus}>
                      <span className={`${styles.statusBadge} ${getStatusClass(slo.status)}`}>
                        {slo.status}
                      </span>
                    </div>

                    <div className={styles.metricSlot}>
                      <span className={styles.metricValue}>{slo.target}</span>
                      <span className={styles.metricLabel}>Target</span>
                    </div>

                    <div className={styles.metricSlot}>
                      <span className={styles.metricValue}>{slo.achieved}</span>
                      <span className={styles.metricLabel}>Success</span>
                    </div>

                    <div className={styles.metricSlot}>
                      <span className={styles.metricValue} style={{ color: slo.errorBudgetLeft.includes('-') ? '#ef4444' : '#10b981' }}>
                        {slo.errorBudgetLeft}
                      </span>
                      <span className={styles.metricLabel}>Remaining</span>
                    </div>

                    <div className={styles.rowAction}>
                      <button className={styles.actionBtnRow}>
                        <Icon icon="ph:caret-right-bold" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={styles.pagination}>
                <div className={styles.paginationLeft}>
                  <button className={styles.paginationBtn}><Icon icon="ph:caret-double-left-bold" /></button>
                  <button className={styles.paginationBtn}><Icon icon="ph:caret-left-bold" /></button>
                  <button className={`${styles.paginationBtn} ${styles.paginationBtnActive}`}>1</button>
                  <button className={styles.paginationBtn}>2</button>
                  <button className={styles.paginationBtn}><Icon icon="ph:caret-right-bold" /></button>
                  <button className={styles.paginationBtn}><Icon icon="ph:caret-double-right-bold" /></button>
                </div>
                
                <div className={styles.paginationRight}>
                    <div className={styles.paginationCount}>
                      <span>1 - {filteredSLOs.length} of {filteredSLOs.length}</span>
                      <span>Total Items</span>
                    </div>
                    <Select
                      className={styles.paginationSelect}
                      value={{ value: itemsPerPage, label: String(itemsPerPage) }}
                      onChange={(opt) => setItemsPerPage(Number(opt.value))}
                      options={[{ value: 50, label: '50' }, { value: 100, label: '100' }]}
                      isSearchable={false}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          minHeight: '28px',
                          height: '28px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: state.isFocused ? '1px solid var(--color-accent-cyan)' : '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '6px',
                          fontSize: '11px',
                          boxShadow: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': {
                            borderColor: 'var(--color-accent-cyan)',
                          }
                        }),
                        singleValue: (base) => ({ ...base, color: '#fff', fontWeight: '600' }),
                        indicatorSeparator: () => ({ display: 'none' }),
                        dropdownIndicator: (base) => ({ ...base, padding: '0 8px', color: 'var(--color-text-muted)' }),
                        menu: (base) => ({ 
                          ...base, 
                          background: '#0b0f19', 
                          border: '1px solid var(--color-border)',
                          borderRadius: '8px',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
                          overflow: 'hidden'
                        }),
                        option: (base, state) => ({
                            ...base,
                            background: state.isSelected ? 'var(--color-accent-cyan)' : state.isFocused ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                            color: state.isSelected ? '#000' : '#fff',
                            fontSize: '11px',
                            fontWeight: state.isSelected ? '700' : '500',
                            padding: '8px 12px',
                            cursor: 'pointer'
                        })
                      }}
                    />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.gridWrapper}>
              <div className={styles.gridContainer}>
                {filteredSLOs.map((slo) => (
                  <div key={slo.id} className={styles.gridCard} onClick={() => handleRowClick(slo)}>
                    <div className={styles.cardHeader}>
                      <span className={styles.cardName}>{slo.name}</span>
                      <span className={`${styles.statusBadge} ${getStatusClass(slo.status)}`}>
                        {slo.status}
                      </span>
                    </div>
                    <div className={styles.cardMeta}>
                      <div className={styles.cardMetaItem}>
                        <span className={styles.cardMetaLabel}>Category</span>
                        <span className={styles.cardMetaValue}>{slo.sloType}</span>
                      </div>
                      <div className={styles.cardMetaItem}>
                        <span className={styles.cardMetaLabel}>Period</span>
                        <span className={styles.frequencyBadge}>{slo.frequency}</span>
                      </div>
                    </div>
                    <div className={styles.cardMetrics}>
                      <div className={styles.metric}>
                        <div className={styles.metricLabel}>Target</div>
                        <div className={styles.metricValueGrid} style={{ color: 'var(--color-accent-cyan)' }}>{slo.target}</div>
                      </div>
                      <div className={styles.metric}>
                        <div className={styles.metricLabel}>Achieved</div>
                        <div className={styles.metricValueGrid} style={{ color: '#10b981' }}>{slo.achieved}</div>
                      </div>
                      <div className={styles.metric}>
                        <div className={styles.metricLabel}>Violation</div>
                        <div className={styles.metricValueGrid} style={{ color: '#ef4444' }}>{slo.violation}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <SLOActionSidebar
        isOpen={showActionSidebar}
        onClose={() => setShowActionSidebar(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFilterChange={(key, value) => {
          setFilters((prev) => ({ ...prev, [key]: value }));
        }}
      />
    </div>
  );
};

export default SLO;
