"use client";
import { SelectComponent } from '@/components/ui/select';
import { useState } from 'react';
import styles from '../shared-settings-styles.module.css';
const MyAccount = () => {
  const [formData, setFormData] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@snr-edatas.com',
    mobile: '+1 234 567 8900',
    username: 'admin',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12-hour',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const handleSave = () => {
    console.log('Save account:', formData);
  };
  const handlePasswordChange = () => {
    console.log('Change password:', passwordData);
  };
  return (
      <div className={styles.mainContent}>
        <div className={styles.contentArea}>
          <h2 className={styles.pageTitle}>My Account</h2>
          <p className={styles.pageDescription}>
            Manage your personal account settings and preferences
          </p>
          {/* Profile Section */}
          <div className={styles.settingsSection}>
            <h3
              style={{
                color: 'var(--color-chart-cyan)',
                fontSize: 'var(--font-md)',
                marginBottom: 'var(--margin-md)',
              }}
            >
              Profile Information
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  First Name{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Last Name{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Email Address{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <input
                  type="email"
                  className={styles.formInput}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Mobile Number</label>
                <input
                  type="tel"
                  className={styles.formInput}
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Username</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={formData.username}
                  disabled
                  style={{ opacity: 0.6, cursor: 'not-allowed' }}
                />
              </div>
            </div>
          </div>
          {/* Preferences Section */}
          <div className={styles.settingsSection}>
            <h3
              style={{
                color: 'var(--color-chart-cyan)',
                fontSize: 'var(--font-md)',
                marginBottom: 'var(--margin-md)',
              }}
            >
              Preferences
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Timezone</label>
                <SelectComponent
                  className={styles.formSelect}
                  value={formData.timezone}
                  onChange={(e) =>
                    setFormData({ ...formData, timezone: e.target.value })
                  }
                  options={[
                    { value: 'UTC', label: 'UTC' },
                    { value: 'America/New_York', label: 'America/New_York' },
                    { value: 'Europe/London', label: 'Europe/London' },
                    { value: 'Asia/Tokyo', label: 'Asia/Tokyo' },
                    { value: 'Asia/Kolkata', label: 'Asia/Kolkata' },
                  ]}
                  placeholder="Select"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Date Format</label>
                <SelectComponent
                  className={styles.formSelect}
                  value={formData.dateFormat}
                  onChange={(e) =>
                    setFormData({ ...formData, dateFormat: e.target.value })
                  }
                  options={[
                    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
                  ]}
                  placeholder="Select"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Time Format</label>
                <SelectComponent
                  className={styles.formSelect}
                  value={formData.timeFormat}
                  onChange={(e) =>
                    setFormData({ ...formData, timeFormat: e.target.value })
                  }
                  options={[
                    { value: '12-hour', label: '12-hour' },
                    { value: '24-hour', label: '24-hour' },
                  ]}
                  placeholder="Select"
                />
              </div>
            </div>
          </div>
          {/* Change Password Section */}
          <div className={styles.settingsSection}>
            <h3
              style={{
                color: 'var(--color-chart-cyan)',
                fontSize: 'var(--font-md)',
                marginBottom: 'var(--margin-md)',
              }}
            >
              Change Password
            </h3>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Current Password{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <input
                  type="password"
                  className={styles.formInput}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  New Password{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <input
                  type="password"
                  className={styles.formInput}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Confirm New Password{' '}
                  <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <input
                  type="password"
                  className={styles.formInput}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <button
              className={styles.btnPrimary}
              onClick={handlePasswordChange}
              style={{ marginTop: 'var(--margin-md)' }}
            >
              Change Password
            </button>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.btnSecondary}>Reset</button>
            <button className={styles.btnPrimary} onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
  );
};
export default MyAccount;
