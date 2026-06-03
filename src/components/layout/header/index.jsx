import { Button } from '@/components/ui/button';
import { Popup } from '@/components/ui/popup';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MultiDateTimePicker } from '@/components/ui/multi-date-time-picker';
import { format } from 'date-fns';
import styles from './styles.module.css';

export const Header = () => {
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) setCurrentUser(JSON.parse(stored));
    } catch (e) {
      console.error('Failed to parse user', e);
    }
  }, []);

  const userData = {
    name: currentUser 
      ? [currentUser.first_name, currentUser.last_name].filter(Boolean).join(' ') || currentUser.username || 'User'
      : 'Guest User',
    email: currentUser?.email || '',
    role: 'Administrator', // Could be mapped from permissions if available later
    initials: currentUser 
      ? (currentUser.first_name?.[0] || currentUser.username?.[0] || 'U').toUpperCase() 
      : 'G',
    status: 'online', // Keep online status for aesthetics
  };

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    router.push('/');
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

      <div className={styles.divider} />

      {/* Menu Items */}
      <div className={styles.menuSection}>
        <button className={styles.menuItem}>
          <Icon icon="mdi:account-circle" width={18} height={18} />
          <span>My Profile</span>
        </button>
        <button className={styles.menuItem}>
          <Icon icon="mdi:cog" width={18} height={18} />
          <span>Account Settings</span>
        </button>
      </div>

      <div className={styles.divider} />

        {/* Footer */}
        <div className={styles.profileFooter}>
          <button className={styles.logoutButton} onClick={handleSignOut}>
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
