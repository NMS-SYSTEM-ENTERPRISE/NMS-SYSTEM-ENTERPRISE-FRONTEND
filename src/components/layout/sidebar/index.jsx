"use client";
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { NavLink } from '@/components/ui/nav-link';
import { usePathname } from 'next/navigation';
import styles from './styles.module.css';

const menuGroups = [
  {
    id: 'overview',
    label: 'Overview',
    items: [
      { icon: 'lucide:layout-dashboard', label: 'Control Center', path: '/', badge: null },
    ],
  },
  {
    id: 'monitoring',
    label: 'Infrastructure',
    items: [
      { icon: 'lucide:network', label: 'Device Monitoring', path: '/network-monitoring', badge: null },
      { icon: 'lucide:git-branch', label: 'Topology Map', path: '/network-topology', badge: null },
      { icon: 'lucide:activity', label: 'Metrics & KPIs', path: '/metric-explorer', badge: null },
      { icon: 'lucide:gauge', label: 'Performance Insights', path: '/apm', badge: null },
    ],
  },
  {
    id: 'analysis',
    label: 'Analytics',
    items: [
      { icon: 'lucide:route', label: 'Path Analysis', path: '/netpath', badge: null },
      { icon: 'lucide:workflow', label: 'Traffic Flow', path: '/flow', badge: null },
      { icon: 'lucide:target', label: 'Service Objectives', path: '/slo', badge: null },
      { icon: 'lucide:layers', label: 'Event Monitor', path: '/trap-explorer', badge: null },
    ],
  },
  {
    id: 'management',
    label: 'Operations',
    items: [
      { icon: 'lucide:bell', label: 'Alert Center', path: '/alerts', badge: 5 },
      { icon: 'lucide:bar-chart-3', label: 'Report Builder', path: '/reports', badge: null },
      { icon: 'lucide:file-text', label: 'Activity Logs', path: '/audit', badge: null },
      { icon: 'lucide:file-stack', label: 'Log Explorer', path: '/log-management', badge: null },
      { icon: 'lucide:ticket', label: 'Support Desk', path: '/ticketing', badge: 3 },
    ],
  },
  {
    id: 'system',
    label: 'Configuration',
    items: [
      { icon: 'lucide:settings', label: 'System Settings', path: '/settings/my-account', badge: null },
    ],
  },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Default Open
  const pathname = usePathname();

  const isPathActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ''}`}>
      {/* Logo Section */}
      <div className={styles.logoSection}>
        {!isCollapsed && (
          <div className={styles.logoWrapper}>
            <div className={styles.logoIcon}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#gradient1)" />
                <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="url(#gradient2)" opacity="0.7" />
                <defs>
                  <linearGradient id="gradient1" x1="2" y1="2" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#06b6d4" />
                    <stop offset="1" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="2" y1="12" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3b82f6" />
                    <stop offset="1" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>NetMonitor</span>
              <span className={styles.logoSubtitle}>Pro</span>
            </div>
          </div>
        )}
        <button 
          className={styles.collapseButton} 
          onClick={toggleSidebar}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon 
            icon={isCollapsed ? 'lucide:chevrons-right' : 'lucide:chevrons-left'} 
            width={18} 
            height={18} 
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className={styles.navigation}>
        {menuGroups.map((group, groupIndex) => (
          <div key={group.id} className={styles.menuGroup}>
            {!isCollapsed && (
              <div className={styles.treeRoot}>
                 {/* Using a generic icon for the group/root if none provided, or just text */}
                 <span className={styles.groupLabel}>{group.label}</span>
              </div>
            )}
            <div className={styles.groupItems}>
              {group.items.map((item) => {
                const isActive = isPathActive(item.path);
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <div className={styles.treeBranch} />
                    <div className={styles.navItemIcon}>
                      <Icon icon={item.icon} width={18} height={18} />
                    </div>
                    {!isCollapsed && (
                      <>
                        <span className={styles.navItemLabel}>{item.label}</span>
                        {item.badge && (
                          <span className={styles.navItemBadge}>{item.badge}</span>
                        )}
                      </>
                    )}
                    {isCollapsed && item.badge && (
                      <span className={styles.navItemBadgeCollapsed}>{item.badge}</span>
                    )}
                  </NavLink>
                );
              })}
            </div>
            {/* Divider removed for tree look, or kept subtle */}
          </div>
        ))}
      </nav>
    </aside>
  );
};
