import { Icon } from '@iconify/react';
import styles from './styles.module.css';
import { CATEGORY_CONFIGS } from '@/utils/constants/network-monitoring';
const getSubGroupIcon = (groupName) => {
  const name = groupName?.toLowerCase() || '';
  if (name.includes('core')) return 'mdi:server-network';
  if (name.includes('distribution')) return 'mdi:transit-connection-variant';
  if (name.includes('aggregation')) return 'mdi:family-tree';
  if (name.includes('ups')) return 'mdi:battery-charging';
  if (name.includes('router')) return 'mdi:router-network';
  if (name.includes('firewall')) return 'mdi:shield-network';
  if (name.includes('access')) return 'mdi:access-point-network';
  if (name.includes('anpr') || name.includes('camera')) return 'mdi:cctv';
  if (name.includes('server')) return 'mdi:server';
  return 'mdi:hub';
};

const formatGroupName = (name) => {
  if (!name) return '';
  const acronyms = ['anpr', 'ups', 'cctv', 'ip', 'dscl', 'poe', 'sfp', 'tor'];
  return name.split(/[_ ]+/)
    .map(word => acronyms.includes(word.toLowerCase()) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const LeftSidebar = ({ activeCategory, setActiveCategory, activeGroup, setActiveGroup, availableGroups, isCollapsed, setIsCollapsed, showFilterSidebar, filteredData, setFilters, groupCounts }) => {
  const categories = Object.keys(CATEGORY_CONFIGS);

  const handleDeviceClick = (deviceName) => {
    if (setFilters) {
      setFilters(prev => ({ ...prev, search: deviceName, skip: 0 }));
    }
  };

  return (
    <div className={`${styles.leftSidebar} ${showFilterSidebar ? styles.collapsed : ''} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        {!isCollapsed && <span className={styles.sidebarTitle}>Categories</span>}
        <button
          className={styles.collapseBtn}
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <Icon icon={isCollapsed ? "mdi:chevron-double-right" : "mdi:chevron-double-left"} width={20} height={20} />
        </button>
      </div>

      <div className={styles.categoryList}>
        {categories.map((category) => (
          <div key={category} className={styles.categoryGroupWrapper}>
            <div
              className={`${styles.categoryItem} ${activeCategory === category && !activeGroup ? styles.categoryItemActive : ''
                }`}
              onClick={() => {
                setActiveCategory(category);
                if (setActiveGroup) setActiveGroup(null);
              }}
              title={isCollapsed ? category : ''}
            >
              <div className={styles.treeBranch} />
              <div className={styles.itemContent}>
                <Icon
                  icon={CATEGORY_CONFIGS[category].icon}
                  width={20}
                  height={20}
                  className={styles.categoryIcon}
                  style={{ '--category-color': CATEGORY_CONFIGS[category].color }}
                />
                {!isCollapsed && <span className={styles.categoryText}>{category}</span>}
              </div>
              {activeCategory === category && !activeGroup && !isCollapsed && (
                <div className={styles.activeDot} />
              )}
            </div>

            {!isCollapsed && activeCategory === category && availableGroups && availableGroups[category] && (
              <div className={styles.subGroupsList}>
                {availableGroups[category].map(group => (
                  <div key={group} style={{ position: 'relative' }}>
                    <div
                      className={`${styles.categoryItem} ${styles.subGroupItem} ${activeGroup === group ? styles.categoryItemActive : ''
                        }`}
                      onClick={() => setActiveGroup(group)}
                      title={isCollapsed ? formatGroupName(group) : ''}
                    >
                      <div className={styles.treeBranch} />
                      <div className={styles.itemContent}>
                        <Icon icon={getSubGroupIcon(group)} width={16} height={16} className={styles.subGroupIcon} />
                        {!isCollapsed && <span className={styles.categoryText}>{formatGroupName(group)}</span>}
                        {!isCollapsed && groupCounts && groupCounts[group] !== undefined && (
                          <span className={styles.groupCount}>{groupCounts[group]}</span>
                        )}
                      </div>
                    </div>
                    {/* Render devices if this group is active */}
                    {!isCollapsed && activeGroup === group && filteredData && filteredData.length > 0 && (
                      <div className={styles.deviceListWrapper}>
                        <div className={styles.deviceListSpine} />
                        <div className={styles.deviceList}>
                          {filteredData.map(device => (
                            <div
                              key={device.id || device.device_ip}
                              className={styles.deviceItem}
                              title={device.name}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeviceClick(device.name);
                              }}
                            >
                              <div className={styles.deviceTreeBranch} />
                              <div className={styles.deviceItemContent}>
                                <Icon icon="mdi:server-network" width={14} height={14} className={styles.deviceIcon} />
                                <span className={styles.deviceItemText}>{device.name}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
