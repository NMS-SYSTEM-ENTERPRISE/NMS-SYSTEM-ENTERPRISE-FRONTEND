import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { MultiDateTimePicker } from '@/components/ui/multi-date-time-picker';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

import { useAppData } from '@/contexts/AppDataContext';
import { useAuthContext } from '@/hooks/useauth';
import { getInfrastructureSummary } from '@/networking/dashboard/infrastructure-summary-apis';

// Page mapping for current route to display name and icon
const pageMap = {
  '/dashboard': { label: 'Control Center', icon: 'lucide:layout-dashboard' },
  '/network-monitoring': { label: 'Device Monitoring', icon: 'lucide:network' },
  '/network-topology': { label: 'Topology Map', icon: 'lucide:git-branch' },
  '/metric-explorer': { label: 'Metrics & KPIs', icon: 'lucide:activity' },
  '/apm': { label: 'Performance Insights', icon: 'lucide:gauge' },
  '/netpath': { label: 'Path Analysis', icon: 'lucide:route' },
  '/flow': { label: 'Traffic Flow', icon: 'lucide:workflow' },
  '/slo': { label: 'Service Objectives', icon: 'lucide:target' },
  '/trap-explorer': { label: 'Event Monitor', icon: 'lucide:layers' },
  '/alerts': { label: 'Alert Center', icon: 'lucide:bell' },
  '/ticketing': { label: 'Support Desk', icon: 'lucide:ticket' },
  '/audit': { label: 'Activity Logs', icon: 'lucide:file-text' },
  '/log-management': { label: 'Log Explorer', icon: 'lucide:file-stack' },
  '/reports': { label: 'Report Builder', icon: 'lucide:bar-chart-3' },
  '/settings': { label: 'System Settings', icon: 'lucide:settings' },
  '/settings/my-account': { label: 'My Account', icon: 'mdi:account-circle' },
};

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { logOut } = useAuthContext();
  const { showUserProfile, closeUserProfile, setShowUserProfile } =
    useAppData();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [infrastructureSummary, setInfrastructureSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState({ label: '', icon: '' });

  useEffect(() => {
    const pageInfo = pageMap[pathname] || {
      label: 'Dashboard',
      icon: 'lucide:layout-dashboard',
    };
    setCurrentPage(pageInfo);
  }, [pathname]);

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem('user') || localStorage.getItem('userData');
      if (stored) setCurrentUser(JSON.parse(stored));
    } catch (e) {
      console.error('Failed to parse user', e);
    }
  }, []);

  useEffect(() => {
    if (showUserProfile) {
      setSummaryLoading(true);
      getInfrastructureSummary()
        .then((data) => {
          setInfrastructureSummary(data);
        })
        .catch((error) => {
          console.error('Error fetching infrastructure summary:', error);
          setInfrastructureSummary(null);
        })
        .finally(() => {
          setSummaryLoading(false);
        });
    }
  }, [showUserProfile]);

  const userData = {
    name: currentUser
      ? [currentUser.first_name, currentUser.last_name]
          .filter(Boolean)
          .join(' ') ||
        currentUser.username ||
        'User'
      : 'Guest User',
    email: currentUser?.email || '',
    role: 'Administrator', // Could be mapped from permissions if available later
    initials: currentUser
      ? (
          currentUser.first_name?.[0] ||
          currentUser.username?.[0] ||
          'U'
        ).toUpperCase()
      : 'G',
    status: 'online', // Keep online status for aesthetics
  };

  const handleSignOutClick = () => {
    setShowLogoutConfirm(true);
    setShowUserProfile(false);
  };

  const confirmSignOut = () => {
    closeUserProfile();
    logOut();
    localStorage.clear();
    router.push('/');
    setShowLogoutConfirm(false);
  };

  const handleDateTimeApply = (result) => {
    setSelectedDateRange(result);
  };

  const formatDateRangeDisplay = () => {
    if (!selectedDateRange) {
      return 'Select Date Range';
    }

    const { mode, dates } = selectedDateRange;

    if (mode === 'range' && dates?.from) {
      const fromStr = format(dates.from, 'MMM dd');
      const toStr = dates.to ? format(dates.to, 'MMM dd') : '...';
      return `${fromStr} - ${toStr}`;
    }

    if (mode === 'single' && dates?.length > 0) {
      return format(dates[0], 'MMM dd, yyyy');
    }

    if (mode === 'multiple' && dates?.length > 0) {
      return `${dates.length} dates`;
    }

    return 'Select Date Range';
  };

  const UserProfilePopover = ({ onClose }) => (
    <div className={styles.userProfilePopover}>
      {/* Sidebar Header */}
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarHeaderTitle}>
          <Icon icon="mdi:account-circle" width={20} height={20} />
          <span>User Profile</span>
        </div>
        <button className={styles.sidebarCloseButton} onClick={onClose}>
          <Icon icon="mdi:close" width={18} height={18} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className={styles.profileContent}>
        {/* User Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              <span className={styles.avatarInitials}>{userData.initials}</span>
            </div>
            <div
              className={`${styles.statusIndicator} ${styles[`status-${userData.status}`]}`}
            />
          </div>
          <div className={styles.profileInfo}>
            <h3 className={styles.userName}>{userData.name}</h3>
            <p className={styles.userEmail}>{userData.email}</p>
            <span className={styles.userRole}>
              <Icon icon="mdi:shield-account" width={12} height={12} />
              {userData.role}
            </span>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Menu Items */}
        <div className={styles.menuSection}>
          <button
            className={styles.menuItem}
            onClick={() => {
              router.push('/settings/my-account');
              onClose();
            }}
          >
            <Icon icon="mdi:account-circle" width={18} height={18} />
            <span>My Profile</span>
          </button>
        </div>

        <div className={styles.divider} />

        {/* Infrastructure Summary Section */}
        <div className={styles.infrastructureSummarySection}>
          <div className={styles.summaryLabel}>
            <Icon icon="mdi:server-network" width={16} height={16} />
            <span>Infrastructure Summary</span>
          </div>

          {summaryLoading ? (
            <div className={styles.summaryLoadingState}>
              <div className={styles.loadingSpinner} />
              <span>Loading...</span>
            </div>
          ) : infrastructureSummary ? (
            <div className={styles.summaryStats}>
              <div className={styles.summaryStatItem}>
                <div className={styles.summaryStatValue}>
                  {infrastructureSummary.devices?.total ?? 0}
                </div>
                <div className={styles.summaryStatLabel}>Total Devices</div>
              </div>
              <div className={styles.summaryStatItem}>
                <div
                  className={`${styles.summaryStatValue} ${styles.statusOnline}`}
                >
                  {infrastructureSummary.devices?.online ?? 0}
                </div>
                <div className={styles.summaryStatLabel}>Online</div>
              </div>
              <div className={styles.summaryStatItem}>
                <div
                  className={`${styles.summaryStatValue} ${styles.statusOffline}`}
                >
                  {infrastructureSummary.devices?.offline ?? 0}
                </div>
                <div className={styles.summaryStatLabel}>Offline</div>
              </div>
            </div>
          ) : (
            <div className={styles.summaryEmptyState}>
              <Icon icon="mdi:alert-circle-outline" width={20} height={20} />
              <span>Unable to load summary</span>
            </div>
          )}

          {infrastructureSummary?.activities?.majorThreshold?.length > 0 && (
            <div className={styles.summaryActivities}>
              <div className={styles.activitiesLabel}>
                Major Threshold Activities
              </div>
              <div className={styles.activitiesList}>
                {infrastructureSummary.activities.majorThreshold.map(
                  (activity, idx) => (
                    <div key={idx} className={styles.activityItem}>
                      <div className={styles.activityIconWrapper}>
                        <Icon
                          icon={
                            activity.status === 'offline'
                              ? 'mdi:server-off'
                              : 'mdi:server'
                          }
                          width={14}
                          height={14}
                        />
                      </div>
                      <div className={styles.activityContent}>
                        <div className={styles.activityName}>
                          {activity.name}
                        </div>
                        <div className={styles.activityMeta}>
                          {activity.offlineTime &&
                            `Offline: ${activity.offlineTime}`}
                        </div>
                      </div>
                      <div
                        className={`${styles.activitySeverity} ${styles[`severity-${activity.severity}`]}`}
                      >
                        {activity.severity?.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.divider} />

        {/* Footer */}
        <div className={styles.profileFooter}>
          <button className={styles.logoutButton} onClick={handleSignOutClick}>
            <Icon icon="mdi:logout" width={18} height={18} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.breadcrumb}>
            <Icon icon={currentPage.icon} width={16} height={16} />
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbText}>{currentPage.label}</span>
          </div>
        </div>

        <div className={styles.headerRight}>
          {/* Date Time Picker Button */}
          <Button
            variant="icon"
            className={styles.dateTimeButton}
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <Icon icon="mdi:calendar-clock" width={18} height={18} />
            <span className={styles.dateTimeText}>
              {formatDateRangeDisplay()}
            </span>
            <Icon icon="mdi:chevron-down" width={14} height={14} />
          </Button>

          <Button
            variant="icon"
            className={styles.userButton}
            onClick={() => setShowUserProfile(!showUserProfile)}
          >
            <div className={styles.userButtonContent}>
              <div className={styles.userAvatar}>
                <span className={styles.userAvatarInitials}>
                  {userData.initials}
                </span>
                <div
                  className={`${styles.userStatusDot} ${styles[`status-${userData.status}`]}`}
                />
              </div>
              <Icon icon="mdi:chevron-down" width={14} height={14} />
            </div>
          </Button>
        </div>

        {/* Date Time Picker Sidebar */}
        {showDatePicker && (
          <div
            className={styles.datePickerOverlay}
            onClick={() => setShowDatePicker(false)}
          >
            <div
              className={styles.datePickerWrapper}
              onClick={(e) => e.stopPropagation()}
            >
              <MultiDateTimePicker
                onClose={() => setShowDatePicker(false)}
                onApply={handleDateTimeApply}
              />
            </div>
          </div>
        )}

        {/* User Profile Sidebar */}
        {showUserProfile && (
          <div
            className={styles.userProfileOverlay}
            onClick={() => setShowUserProfile(false)}
          >
            <div
              className={styles.userProfileWrapper}
              onClick={(e) => e.stopPropagation()}
            >
              <UserProfilePopover onClose={() => closeUserProfile()} />
            </div>
          </div>
        )}

        {/* Logout Confirmation Modal */}
        <Modal
          isOpen={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
        >
          <div className={styles.logoutModalContent}>
            <div className={styles.geometricProjection}></div>
            <div className={styles.logoutModalHeader}>
              <div className={styles.logoutModalIconWrapper}>
                <Icon icon="mdi:logout-variant" width={28} />
              </div>
              <h3>Sign Out</h3>
              <p>Are you sure you want to sign out of the NetMonitor System?</p>
            </div>
            <div className={styles.logoutModalDivider}></div>
            <div className={styles.logoutModalActions}>
              <Button
                variant="secondary"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </Modal>
      </header>
    </>
  );
};
