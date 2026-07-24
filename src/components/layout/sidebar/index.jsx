'use client';
import { NavLink } from '@/components/ui/nav-link';
import { getAlerts } from '@/networking/network-monitoring/network-monitoring-apis';
import { fetchTicketsApi } from '@/networking/network-monitoring/ticketing-apis';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

const menuGroups = [
  {
    id: 'overview',
    label: 'Overview',
    items: [
      {
        icon: 'lucide:layout-dashboard',
        label: 'Control Center',
        path: '/dashboard',
        badge: null,
      },
    ],
  },
  {
    id: 'monitoring',
    label: 'Infrastructure',
    items: [
      {
        icon: 'lucide:network',
        label: 'Device Monitoring',
        path: '/network-monitoring',
        badge: null,
      },
      {
        icon: 'lucide:git-branch',
        label: 'Topology Map',
        path: '/network-topology',
        badge: null,
      },
      {
        icon: 'lucide:activity',
        label: 'Metrics & KPIs',
        path: '/metric-explorer',
        badge: null,
      },
      {
        icon: 'lucide:gauge',
        label: 'Performance Insights',
        path: '/apm',
        badge: null,
      },
    ],
  },
  {
    id: 'analysis',
    label: 'Analytics',
    items: [
      {
        icon: 'lucide:route',
        label: 'Path Analysis',
        path: '/netpath',
        badge: null,
      },
      {
        icon: 'lucide:workflow',
        label: 'Traffic Flow',
        path: '/flow',
        badge: null,
      },
      {
        icon: 'lucide:target',
        label: 'Service Objectives',
        path: '/slo',
        badge: null,
      },
      {
        icon: 'lucide:layers',
        label: 'Event Monitor',
        path: '/trap-explorer',
        badge: null,
      },
      // {
      //   icon: 'lucide:layout-panel-left',
      //   label: 'Dashboard Builder',
      //   path: '/dashboard/custom',
      //   badge: 'New',
      // },
    ],
  },
  {
    id: 'management',
    label: 'Operations',
    items: [
      { icon: 'lucide:bell', label: 'Alert Center', path: '/alerts', badge: 5 },
      {
        icon: 'lucide:ticket',
        label: 'Support Desk',
        path: '/ticketing',
        badge: 3,
      },
      {
        icon: 'lucide:file-text',
        label: 'Activity Logs',
        path: '/audit',
        badge: null,
      },

      {
        icon: 'lucide:file-stack',
        label: 'Log Explorer',
        path: '/log-management',
        badge: null,
      },

      {
        icon: 'lucide:bar-chart-3',
        label: 'Report Builder',
        path: '/reports',
        badge: null,
      },
    ],
  },
  {
    id: 'system',
    label: 'Configuration',
    items: [
      {
        icon: 'lucide:settings',
        label: 'System Settings',
        path: '/settings',
      },
    ],
  },
  {
    id: 'help',
    label: 'Help & Documentation',
    items: [
      {
        icon: 'lucide:help-circle',
        label: 'Manual',
        path: '/manual',
        badge: null,
      },
      {
        icon: 'lucide:book-open',
        label: 'Dev Docs',
        path: '/developer-documentation',
        badge: null,
      },
    ],
  },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Default Open
  const pathname = usePathname();

  const [alertCount, setAlertCount] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchCounts = async () => {
      try {
        const [alertsRes, ticketsRes] = await Promise.all([
          getAlerts({ activeOnly: true }),
          fetchTicketsApi({ limit: 100 }),
        ]);

        if (!isMounted) return;

        const getArray = (res) => {
          if (Array.isArray(res)) return res;
          if (res?.items && Array.isArray(res.items)) return res.items;
          if (res?.data && Array.isArray(res.data)) return res.data;
          return [];
        };

        const activeAlerts = getArray(alertsRes).filter(
          (a) => a.is_active
        ).length;
        setAlertCount(activeAlerts);

        const activeTickets = getArray(ticketsRes).filter(
          (t) => t.status === 'Open' || t.status === 'In Progress'
        ).length;
        setTicketCount(activeTickets);
      } catch (error) {
        console.error('Error fetching sidebar badges:', error);
      }
    };

    fetchCounts();
    const interval = setInterval(fetchCounts, 30000); // refresh every 30s
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const getDynamicMenuGroups = () => {
    return menuGroups.map((group) => {
      if (group.id !== 'management') return group;

      return {
        ...group,
        items: group.items.map((item) => {
          if (item.label === 'Alert Center') {
            return { ...item, badge: alertCount > 0 ? alertCount : null };
          }
          if (item.label === 'Support Desk') {
            return { ...item, badge: ticketCount > 0 ? ticketCount : null };
          }
          return item;
        }),
      };
    });
  };

  const dynamicMenuGroups = getDynamicMenuGroups();

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
    <aside
      className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ''}`}
    >
      {/* Logo Section */}
      <div className={styles.logoSection}>
        {!isCollapsed && (
          <div className={styles.logoWrapper}>
            <div className={styles.snrLogoContainer}>
              <img
                src="/images/snr-logo-sm.svg"
                alt="SNR"
                className={styles.snrLogo}
              />
            </div>
            <div className={styles.logoTextWrapper}>
              <div className={styles.logoText}>
                <span className={styles.logoTitle}>NetMonitor</span>
                <span className={styles.logoSubtitle}>Pro</span>
              </div>
            </div>
          </div>
        )}
        <button
          className={styles.collapseButton}
          onClick={toggleSidebar}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon
            icon={
              isCollapsed ? 'lucide:chevrons-right' : 'lucide:chevrons-left'
            }
            width={18}
            height={18}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className={styles.navigation}>
        {dynamicMenuGroups.map((group, groupIndex) => (
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
                        <span className={styles.navItemLabel}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className={styles.navItemBadge}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {isCollapsed && item.badge && (
                      <span className={styles.navItemBadgeCollapsed}>
                        {item.badge}
                      </span>
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
