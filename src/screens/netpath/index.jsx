"use client";
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NetPathDetail from '../netpath-detail';
import styles from './styles.module.css';

// Mock data for network paths
const NETWORK_PATHS = [
  {
    id: '1',
    name: 'Local Machine - Mydevice',
    source: 'DESKTOP-K2M5DQG',
    destination: '10.20.40.206',
    port: '443',
    status: 'online',
    lastPolled: 'Tue, Nov 12, 2024 04:55:33 PM',
  },
  {
    id: '2',
    name: 'Google DNS',
    source: 'Localhost',
    destination: '8.8.8.8',
    port: '53',
    status: 'online',
    lastPolled: 'Tue, Nov 12, 2024 04:55:33 PM',
  },
  {
    id: '3',
    name: 'Microsoft Azure',
    source: '172.16.16.1',
    destination: 'www.microsoft.com',
    port: '443',
    status: 'online',
    lastPolled: 'Tue, Nov 12, 2024 04:55:33 PM',
  },
  {
    id: '4',
    name: 'Internal DNS',
    source: 'Localhost',
    destination: '192.168.1.5',
    port: '53',
    status: 'error',
    lastPolled: 'Tue, Nov 12, 2024 04:55:33 PM',
  },
  {
    id: '5',
    name: 'Corporate Web Server',
    source: 'Localhost',
    destination: 'www.snr-edatas.com',
    port: '80',
    status: 'warning',
    lastPolled: 'Tue, Nov 12, 2024 04:55:33 PM',
  },
];

const NetPath = () => {
  const [activePathId, setActivePathId] = useState(NETWORK_PATHS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Collapsed by default
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    source: '',
    destination: '',
    portMin: '',
    portMax: '',
  });
  const router = useRouter();

  const filteredPaths = NETWORK_PATHS.filter(
    (path) =>
      path.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activePath = NETWORK_PATHS.find((p) => p.id === activePathId) || NETWORK_PATHS[0];

  const handleViewDetails = (pathId) => {
    router.push(`/netpath/${pathId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return '#10b981';
      case 'error':
        return '#ef4444';
      case 'warning':
        return '#f59e0b';
      default:
        return '#9ca3af';
    }
  };

  // Get first 2 letters for avatar
  const getInitials = (name) => {
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className={styles.netPathPage}>
      {/* Left Sidebar - Path List */}
      <div 
        className={`${styles.leftSidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}
      >
        <div className={styles.sidebarHeader}>
          <span className={`${styles.sidebarTitle} ${!isSidebarOpen ? styles.hidden : ''}`}>
            CATEGORIES
          </span>
          <button 
            className={styles.collapseBtn}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? "Collapse" : "Expand"}
          >
            <Icon 
              icon={isSidebarOpen ? "mdi:chevron-left" : "mdi:chevron-right"} 
              width={20} 
            />
          </button>
        </div>
        
        <div className={styles.sidebarNav}>
          {/* Search */}
          {isSidebarOpen && (
            <div className={styles.sidebarSearch}>
              <Icon icon="mdi:magnify" className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search paths..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          )}

          {/* Path List with Tree Structure - Matching APM */}
          <div className={styles.treeChildren}>
            {filteredPaths.map((path) => (
              <div
                key={path.id}
                className={`${styles.navItem} ${
                  activePathId === path.id ? styles.navItemActive : ''
                }`}
                onClick={() => setActivePathId(path.id)}
                title={!isSidebarOpen ? path.name : ''}
              >
                {/* Tree Branch */}
                <div className={styles.treeBranch} />
                
                {/* Icon with status or Avatar */}
                <div className={styles.itemIconWrapper}>
                  {isSidebarOpen ? (
                    <div 
                      className={styles.statusDot} 
                      style={{ backgroundColor: getStatusColor(path.status) }}
                    />
                  ) : (
                    <div 
                      className={styles.avatarText}
                      style={{ 
                        backgroundColor: getStatusColor(path.status) + '30',
                        color: getStatusColor(path.status)
                      }}
                    >
                      {getInitials(path.name)}
                    </div>
                  )}
                </div>
                
                {/* Path details */}
                <div className={styles.navContent}>
                  <span className={styles.navText}>{path.name}</span>
                  {isSidebarOpen && (
                    <span className={styles.navSubtext}>{path.destination}:{path.port}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className={styles.mainContentWrapper}>
        {/* Content Area */}
        <div className={styles.contentArea}>
          <NetPathDetail pathId={activePathId} />
        </div>
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={showFilterSidebar}
        onClose={() => setShowFilterSidebar(false)}
        title="NetPath Filters"
        filters={[
          {
            key: 'status',
            type: 'select',
            label: 'Status',
            options: [
              { value: '', label: 'All' },
              { value: 'online', label: 'Online' },
              { value: 'error', label: 'Error' },
              { value: 'warning', label: 'Warning' },
            ],
            placeholder: 'Select status',
          },
          {
            key: 'source',
            type: 'input',
            label: 'Source',
            placeholder: 'Enter source',
          },
        ]}
        filterValues={filters}
        onFilterChange={(key, value) => {
          setFilters((prev) => ({ ...prev, [key]: value }));
        }}
        onApply={(appliedFilters) => {
          // Apply filters logic here
        }}
        onReset={() => {
          setFilters({
            search: '',
            status: '',
            source: '',
            destination: '',
            portMin: '',
            portMax: '',
          });
        }}
      />
    </div>
  );
};

export default NetPath;
