'use client';

import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { SelectComponent } from '@/components/ui/select';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/useToast';
import { useUser } from '@/hooks/settings/user/users/useUser';
import {
  TIMEZONE_OPTIONS,
  DATE_FORMAT_OPTIONS,
  TIME_FORMAT_OPTIONS,
} from '@/utils/constants/settings/my-account';
import styles from '../shared-settings-styles.module.css';

const MyAccount = () => {
  const { showSuccess, showError } = useToast();
  const { getUserMe, updateUserMe } = useUser();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    username: '',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '24-hour',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  useEffect(() => {
    const fetchMyAccount = async () => {
      const data = await getUserMe();
      if (data) {
        setFormData({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          mobile: data.mobile_number || '',
          username: data.username || '',
          timezone: data.timezone || 'UTC',
          dateFormat: data.date_format || 'MM/DD/YYYY',
          timeFormat: data.time_format || '24-hour',
        });
      }
    };
    fetchMyAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearError = (field, isPassword = false) => {
    if (isPassword) {
      setPasswordErrors((prev) => ({ ...prev, [field]: undefined }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateProfile = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!passwordData.currentPassword) newErrors.currentPassword = 'Current Password is required.';
    if (!passwordData.newPassword) newErrors.newPassword = 'New Password is required.';
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateProfile()) {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        username: formData.username,
        mobile_number: formData.mobile || null,
        timezone: formData.timezone,
        date_format: formData.dateFormat,
        time_format: formData.timeFormat,
      };

      const success = await updateUserMe(payload);
      if (success) {
        // showSuccess is handled inside UserContext
        console.log('Account settings updated.');
      }
    } else {
      showError('Please fix the validation errors.');
    }
  };

  const handlePasswordChange = async () => {
    if (validatePassword()) {
      // Need to send the full payload to updateUserMe as per typical PUT endpoints unless it supports partial
      // Sending existing profile data + password fields
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        username: formData.username,
        mobile_number: formData.mobile || null,
        timezone: formData.timezone,
        date_format: formData.dateFormat,
        time_format: formData.timeFormat,
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
        confirm_new_password: passwordData.confirmPassword,
      };

      const success = await updateUserMe(payload);
      if (success) {
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } else {
      showError('Please fix the password validation errors.');
    }
  };

  const handleResetProfile = () => {
    setErrors({});
    getUserMe().then((data) => {
      if (data) {
        setFormData({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          mobile: data.mobile_number || '',
          username: data.username || '',
          timezone: data.timezone || 'UTC',
          dateFormat: data.date_format || 'MM/DD/YYYY',
          timeFormat: data.time_format || '24-hour',
        });
        showSuccess('Form reset to saved settings.');
      }
    });
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.formPageContent}>
        <h2 className={styles.pageTitle}>My Account</h2>
        <p className={styles.pageDescription} style={{ marginBottom: 'var(--margin-xl)' }}>
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
            <FormField label="First Name" required>
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                error={errors.firstName}
                onFocus={() => clearError('firstName')}
                placeholder="Enter first name"
              />
            </FormField>

            <FormField label="Last Name" required>
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                error={errors.lastName}
                onFocus={() => clearError('lastName')}
                placeholder="Enter last name"
              />
            </FormField>

            <FormField label="Email Address" required>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                onFocus={() => clearError('email')}
                placeholder="Enter email address"
              />
            </FormField>

            <FormField label="Mobile Number">
              <Input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                error={errors.mobile}
                onFocus={() => clearError('mobile')}
                placeholder="Enter mobile number"
              />
            </FormField>

            <FormField label="Username">
              <Input
                type="text"
                value={formData.username}
                disabled
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
              />
            </FormField>
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
            <FormField label="Timezone">
              <SelectComponent
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                options={TIMEZONE_OPTIONS}
                placeholder="Select Timezone"
              />
            </FormField>

            <FormField label="Date Format">
              <SelectComponent
                value={formData.dateFormat}
                onChange={(e) => setFormData({ ...formData, dateFormat: e.target.value })}
                options={DATE_FORMAT_OPTIONS}
                placeholder="Select Date Format"
              />
            </FormField>

            <FormField label="Time Format">
              <SelectComponent
                value={formData.timeFormat}
                onChange={(e) => setFormData({ ...formData, timeFormat: e.target.value })}
                options={TIME_FORMAT_OPTIONS}
                placeholder="Select Time Format"
              />
            </FormField>
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
            <FormField label="Current Password" required>
              <Input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, currentPassword: e.target.value })
                }
                error={passwordErrors.currentPassword}
                onFocus={() => clearError('currentPassword', true)}
                placeholder="Enter current password"
              />
            </FormField>

            <FormField label="New Password" required>
              <Input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                }
                error={passwordErrors.newPassword}
                onFocus={() => clearError('newPassword', true)}
                placeholder="Enter new password"
              />
            </FormField>

            <FormField label="Confirm New Password" required>
              <Input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                }
                error={passwordErrors.confirmPassword}
                onFocus={() => clearError('confirmPassword', true)}
                placeholder="Confirm new password"
              />
            </FormField>
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
          <button
            className={styles.btnSecondary}
            onClick={handleResetProfile}
          >
            Reset
          </button>
          <button className={styles.btnPrimary} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
