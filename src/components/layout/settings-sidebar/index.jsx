'use client';
import { NavLink } from '@/components/ui/nav-link';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

const settingsMenuItems = [
  { icon: 'mdi:account', label: 'My Account', path: '/settings/my-account' },
  {
    icon: 'mdi:account-group',
    label: 'User Settings',
    path: '/settings/user',
    subItems: [
      { label: 'User', path: '/settings/user/users' },
      { label: 'User Profile', path: '/settings/user/groups' },
      {
        label: 'Personal Access Token',
        path: '/settings/user/personal-access-token',
      },
      { label: 'Role', path: '/settings/user/roles' },
      { label: 'Password Settings', path: '/settings/user/password-settings' },
      { label: 'LDAP Server Settings', path: '/settings/user/ldap-server' },
      { label: 'Single Sign-On', path: '/settings/user/single-sign-on' },
    ],
  },
  {
    icon: 'mdi:cog',
    label: 'System Settings',
    path: '/settings/system',
    subItems: [
      {
        label: 'Two Factor Authentication',
        path: '/settings/system/two-factor-auth',
      },
      { label: 'Mail Server Settings', path: '/settings/system/mail-server' },
      { label: 'Proxy Server Settings', path: '/settings/system/proxy-server' },
      { label: 'SMS Server Settings', path: '/settings/system/sms-server' },
      { label: 'Rebranding', path: '/settings/system/rebranding' },
      { label: 'Data Retention', path: '/settings/system/data-retention' },
      { label: 'Deployment Settings', path: '/settings/system/deployment' },
      { label: 'MAC Address List', path: '/settings/system/mac-address' },
      { label: 'Storage Profile', path: '/settings/system/storage-profile' },
      { label: 'Backup Profile', path: '/settings/system/backup-profile' },
      { label: 'DNS Server Profile', path: '/settings/system/dns-server' },
      { label: 'Rule Based Tags', path: '/settings/system/rule-based-tags' },
    ],
  },
  {
    icon: 'mdi:shield',
    label: 'Compliance Settings',
    badge: 'BETA',
    path: '/settings/compliance',
    subItems: [
      { label: 'Compliance Policy', path: '/settings/compliance/policy' },
      { label: 'Benchmark', path: '/settings/compliance/benchmark' },
      { label: 'Rules', path: '/settings/compliance/rules' },
    ],
  },
  {
    icon: 'mdi:radio',
    label: 'Discovery Settings',
    path: '/settings/discovery',
    subItems: [
      { label: 'Credential Profile', path: '/settings/discovery/credential' },
      { label: 'Discovery Profile', path: '/settings/discovery/profile' },
    ],
  },
  {
    icon: 'mdi:monitor',
    label: 'Monitor Settings',
    path: '/settings/monitor',
    subItems: [
      {
        label: 'Device Monitor Settings',
        path: '/settings/monitor/device',
      },
      {
        label: 'Cloud Monitor Settings',
        path: '/settings/monitor/cloud',
      },
      {
        label: 'Agent Monitor Settings',
        path: '/settings/monitor/agent',
      },
      {
        label: 'Service Check Monitor Settings',
        path: '/settings/monitor/service-check',
      },
      {
        label: 'Process Monitor Settings',
        path: '/settings/monitor/process',
      },
      {
        label: 'Service Monitor Settings',
        path: '/settings/monitor/service',
      },
      {
        label: 'File/Directory Settings',
        path: '/settings/monitor/file-directory',
      },
      {
        label: 'SNMP Device Catalog',
        path: '/settings/monitor/snmp-catalog',
      },
      {
        label: 'Rediscover Settings',
        path: '/settings/monitor/rediscover',
      },
      {
        label: 'NetRoute Settings',
        path: '/settings/monitor/netroute',
        badge: 'BETA',
      },
      {
        label: 'Topology Scanner',
        path: '/settings/monitor/topology-scanner',
      },
      {
        label: 'Monitoring Hour',
        path: '/settings/monitor/monitoring-hour',
      },
      {
        label: 'Custom Monitoring Field',
        path: '/settings/monitor/custom-field',
      },
    ],
  },
  {
    icon: 'mdi:wifi',
    label: 'Network Config Settings',
    path: '/settings/network-config',
  },
  {
    icon: 'mdi:radio',
    label: 'SNMP Trap',
    path: '/settings/snmp-trap',
    subItems: [
      { label: 'SNMP Trap Profile', path: '/settings/snmp-trap/profile' },
      { label: 'SNMP Trap Forwarder', path: '/settings/snmp-trap/forwarder' },
      { label: 'SNMP Trap Listener', path: '/settings/snmp-trap/listener' },
    ],
  },
  {
    icon: 'mdi:file-document',
    label: 'Log Settings',
    path: '/settings/log',
    subItems: [
      { label: 'General Settings', path: '/settings/log-settings' },
      { label: 'Log Parser Library', path: '/settings/log/parser-library' },
      { label: 'Log Inventory', path: '/settings/log/inventory' },
      { label: 'Collection Profile', path: '/settings/log/collection-profile' },
      { label: 'Log Forwarder', path: '/settings/log/forwarder' },
      { label: 'Agent Monitor', path: '/settings/log/agent-monitor' },
    ],
  },
  {
    icon: 'mdi:chart-line',
    label: 'Flow Settings',
    path: '/settings/flow',
    subItems: [
      { label: 'General Settings', path: '/settings/flow-settings' },
      { label: 'Flow Collector', path: '/settings/flow/collector' },
      { label: 'Flow Filters', path: '/settings/flow/filters' },
    ],
  },
  {
    icon: 'mdi:puzzle',
    label: 'Plugin Library',
    path: '/settings/plugin',
    subItems: [
      { label: 'Runbook', path: '/settings/plugin/runbook' },
      { label: 'Metric', path: '/settings/plugin/metric' },
      { label: 'Topology', path: '/settings/plugin/topology' },
      { label: 'Log Parser Plugin', path: '/settings/plugin/log-parser' },
    ],
  },
  {
    icon: 'mdi:source-merge',
    label: 'Dependency Mapper',
    path: '/settings/dependency',
  },
  {
    icon: 'mdi:link-variant',
    label: 'Integration',
    path: '/settings/integration',
  },
];

const SettingsSidebar = () => {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSection = (path) => {
    // If sidebar is collapsed, expanding a section should open the sidebar
    if (isCollapsed) {
      setIsCollapsed(false);
    }
    setExpandedSections((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Auto-expand sections that contain the current path
  useEffect(() => {
    const newExpanded = {};
    settingsMenuItems.forEach((item) => {
      if (item.subItems) {
        const isActive = item.subItems.some((sub) =>
          pathname.startsWith(sub.path)
        );
        if (isActive) {
          newExpanded[item.path] = true;
        }
      }
    });
    setExpandedSections(newExpanded);
  }, [pathname]);

  const filterItems = (items) => {
    if (!searchTerm) return items;
    return items.filter((item) => {
      const matchesSearch = item.label
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const subItemsMatch = item.subItems?.some((sub) =>
        sub.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return matchesSearch || subItemsMatch;
    });
  };

  const filteredItems = filterItems(settingsMenuItems);

  return (
    <div
      className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ''}`}
    >
      <div className={styles.sidebarHeader}>
        <span
          className={`${styles.headerTitle} ${isCollapsed ? styles.hidden : ''}`}
        >
          Settings
        </span>
        <button className={styles.collapseBtn} onClick={toggleSidebar}>
          <Icon icon={isCollapsed ? 'mdi:menu' : 'mdi:menu-open'} width={20} />
        </button>
      </div>

      <div
        className={`${styles.searchBox} ${isCollapsed ? styles.hidden : ''}`}
      >
        <Icon icon="mdi:magnify" width={18} height={18} />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <nav className={styles.menu}>
        {filteredItems.map((item) => (
          <div key={item.path} className={styles.menuItem}>
            {item.subItems ? (
              <>
                <button
                  className={`${styles.menuButton} ${
                    pathname.startsWith(item.path)
                      ? styles.menuButtonActive
                      : ''
                  }`}
                  onClick={() => toggleSection(item.path)}
                  title={isCollapsed ? item.label : ''}
                >
                  <div className={styles.menuButtonLeft}>
                    <Icon icon={item.icon} width={20} height={20} />
                    <span className={isCollapsed ? styles.hidden : ''}>
                      {item.label}
                    </span>
                  </div>
                  {!isCollapsed && (
                    <Icon
                      icon={
                        expandedSections[item.path]
                          ? 'mdi:chevron-down'
                          : 'mdi:chevron-right'
                      }
                      width={20}
                      height={20}
                    />
                  )}
                </button>
                {/* Only show submenus if extended and expanded */}
                {!isCollapsed && expandedSections[item.path] && (
                  <div className={styles.subMenu}>
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `${styles.subMenuItem} ${
                            isActive ? styles.subMenuItemActive : ''
                          }`
                        }
                      >
                        <div className={styles.treeBranch} />
                        {subItem.label}
                        {subItem.badge && (
                          <span className={styles.badge}>{subItem.badge}</span>
                        )}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${styles.menuButton} ${
                    isActive ? styles.menuButtonActive : ''
                  }`
                }
                title={isCollapsed ? item.label : ''}
              >
                <div className={styles.menuButtonLeft}>
                  <Icon icon={item.icon} width={20} height={20} />
                  <span className={isCollapsed ? styles.hidden : ''}>
                    {item.label}
                  </span>
                </div>
              </NavLink>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SettingsSidebar;
