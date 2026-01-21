import { Button } from '@/components/ui/button';
import { Popup } from '@/components/ui/popup';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { MultiDateTimePicker } from '@/components/ui/multi-date-time-picker';
import { format } from 'date-fns';
import styles from './styles.module.css';

export const Header = () => {
  const [userStatus, setUserStatus] = useState('online'); // online, away, busy, offline
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  // Mock user data - replace with actual user data from context/store
  const userData = {
    name: 'John Anderson',
    email: 'john.anderson@company.com',
    role: 'Network Administrator',
    avatar: null, // Set to null to use initials
    initials: 'JA',
    status: userStatus,
    lastLogin: '2 hours ago',
    stats: {
      activeAlerts: 12,
      resolvedToday: 8,
      uptime: '99.8%',
    },
  };

  const handleStatusChange = (status) => {
    setUserStatus(status);
  };

  const handleDateTimeApply = (result) => {
    setSelectedDateRange(result);
    console.log('Selected date/time:', result);
  };

  const formatDateRangeDisplay = () => {
    if (!selectedDateRange) {
      return 'Select Date Range';
    }

    const { mode, dates, startTime, endTime } = selectedDateRange;

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
            {userData.avatar ? (
              <img src={userData.avatar} alt={userData.name} />
            ) : (
              <span className={styles.avatarInitials}>{userData.initials}</span>
            )}
          </div>
          <div className={`${styles.statusIndicator} ${styles[`status-${userData.status}`]}`} />
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

      {/* Quick Stats */}
      <div className={styles.quickStats}>
        <div className={styles.statItem}>
          <Icon icon="mdi:alert-circle" width={16} height={16} className={styles.statIcon} />
          <div className={styles.statContent}>
            <span className={styles.statValue}>{userData.stats.activeAlerts}</span>
            <span className={styles.statLabel}>Active Alerts</span>
          </div>
        </div>
        <div className={styles.statItem}>
          <Icon icon="mdi:check-circle" width={16} height={16} className={styles.statIcon} />
          <div className={styles.statContent}>
            <span className={styles.statValue}>{userData.stats.resolvedToday}</span>
            <span className={styles.statLabel}>Resolved</span>
          </div>
        </div>
        <div className={styles.statItem}>
          <Icon icon="mdi:server-network" width={16} height={16} className={styles.statIcon} />
          <div className={styles.statContent}>
            <span className={styles.statValue}>{userData.stats.uptime}</span>
            <span className={styles.statLabel}>Uptime</span>
          </div>
        </div>
      </div>

      {/* Status Selector */}
      <div className={styles.statusSection}>
        <div className={styles.sectionLabel}>Status</div>
        <div className={styles.statusOptions}>
          <button
            className={`${styles.statusOption} ${userStatus === 'online' ? styles.active : ''}`}
            onClick={() => handleStatusChange('online')}
          >
            <span className={`${styles.statusDot} ${styles['status-online']}`} />
            Online
          </button>
          <button
            className={`${styles.statusOption} ${userStatus === 'away' ? styles.active : ''}`}
            onClick={() => handleStatusChange('away')}
          >
            <span className={`${styles.statusDot} ${styles['status-away']}`} />
            Away
          </button>
          <button
            className={`${styles.statusOption} ${userStatus === 'busy' ? styles.active : ''}`}
            onClick={() => handleStatusChange('busy')}
          >
            <span className={`${styles.statusDot} ${styles['status-busy']}`} />
            Busy
          </button>
          <button
            className={`${styles.statusOption} ${userStatus === 'offline' ? styles.active : ''}`}
            onClick={() => handleStatusChange('offline')}
          >
            <span className={`${styles.statusDot} ${styles['status-offline']}`} />
            Offline
          </button>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Menu Items */}
      <div className={styles.menuSection}>
        <button className={styles.menuItem}>
          <Icon icon="mdi:account-circle" width={18} height={18} />
          <span>My Profile</span>
          <Icon icon="mdi:chevron-right" width={16} height={16} className={styles.menuItemArrow} />
        </button>
        <button className={styles.menuItem}>
          <Icon icon="mdi:cog" width={18} height={18} />
          <span>Account Settings</span>
          <Icon icon="mdi:chevron-right" width={16} height={16} className={styles.menuItemArrow} />
        </button>
        <button className={styles.menuItem}>
          <Icon icon="mdi:bell-outline" width={18} height={18} />
          <span>Notifications</span>
          <span className={styles.badge}>3</span>
        </button>
        <button className={styles.menuItem}>
          <Icon icon="mdi:shield-check" width={18} height={18} />
          <span>Security & Privacy</span>
          <Icon icon="mdi:chevron-right" width={16} height={16} className={styles.menuItemArrow} />
        </button>
        <button className={styles.menuItem}>
          <Icon icon="mdi:palette-outline" width={18} height={18} />
          <span>Appearance</span>
          <Icon icon="mdi:chevron-right" width={16} height={16} className={styles.menuItemArrow} />
        </button>
      </div>

      <div className={styles.divider} />

      {/* Additional Options */}
      <div className={styles.menuSection}>
        <button className={styles.menuItem}>
          <Icon icon="mdi:help-circle-outline" width={18} height={18} />
          <span>Help & Support</span>
        </button>
        <button className={styles.menuItem}>
          <Icon icon="mdi:information-outline" width={18} height={18} />
          <span>About</span>
        </button>
      </div>

      <div className={styles.divider} />

        {/* Footer */}
        <div className={styles.profileFooter}>
          <div className={styles.lastLogin}>
            <Icon icon="mdi:clock-outline" width={14} height={14} />
            Last login: {userData.lastLogin}
          </div>
          <button className={styles.logoutButton}>
            <Icon icon="mdi:logout" width={18} height={18} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.breadcrumb}>
          <Icon icon="mdi:view-dashboard" width={16} height={16} />
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbText}>Infrastructure Summary</span>
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
          <span className={styles.dateTimeText}>{formatDateRangeDisplay()}</span>
          <Icon icon="mdi:chevron-down" width={14} height={14} />
        </Button>

        {/* User Profile Button */}
        <Button
          variant="icon"
          className={styles.userButton}
          onClick={() => setShowUserProfile(!showUserProfile)}
        >
          <div className={styles.userButtonContent}>
            <div className={styles.userAvatar}>
              <span className={styles.userAvatarInitials}>{userData.initials}</span>
              <div className={`${styles.userStatusDot} ${styles[`status-${userData.status}`]}`} />
            </div>
            <Icon icon="mdi:chevron-down" width={14} height={14} />
          </div>
        </Button>
      </div>

      {/* Date Time Picker Sidebar */}
      {showDatePicker && (
        <div className={styles.datePickerOverlay} onClick={() => setShowDatePicker(false)}>
          <div className={styles.datePickerWrapper} onClick={(e) => e.stopPropagation()}>
            <MultiDateTimePicker
              onClose={() => setShowDatePicker(false)}
              onApply={handleDateTimeApply}
            />
          </div>
        </div>
      )}

      {/* User Profile Sidebar */}
      {showUserProfile && (
        <div className={styles.userProfileOverlay} onClick={() => setShowUserProfile(false)}>
          <div className={styles.userProfileWrapper} onClick={(e) => e.stopPropagation()}>
            <UserProfilePopover onClose={() => setShowUserProfile(false)} />
          </div>
        </div>
      )}
    </header>
  );
};
