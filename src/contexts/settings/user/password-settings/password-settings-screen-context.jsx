'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { usePasswordPolicy } from '@/hooks/settings/user/password-settings/usePasswordPolicy';
import { DEFAULT_PASSWORD_SETTINGS } from '@/utils/constants/settings/users/password-settings';

const mapPolicyToSettings = (data) => ({
  expiry: data.password_expiry ?? false,
  expiryDays: data.expiry_days ?? 90,
  uppercase: data.require_uppercase ?? true,
  lowercase: data.require_lowercase ?? true,
  number: data.require_numbers ?? true,
  specialChar: data.require_special_chars ?? true,
  length: data.min_length ?? 8,
});

export const PasswordSettingsScreenContext = createContext(null);

export const PasswordSettingsScreenProvider = ({ children }) => {
  const { getPasswordPolicy, updatePasswordPolicy, resetPasswordPolicy } = usePasswordPolicy();
  const [settings, setSettings] = useState(DEFAULT_PASSWORD_SETTINGS);
  const [showTimeline, setShowTimeline] = useState(false);

  const fetchPolicy = useCallback(async () => {
    const data = await getPasswordPolicy();
    if (data) setSettings(mapPolicyToSettings(data));
  }, [getPasswordPolicy]);

  useEffect(() => {
    fetchPolicy();
  }, [fetchPolicy]);

  const toggle = useCallback((key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const update = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSave = useCallback(async () => {
    await updatePasswordPolicy({
      password_expiry: settings.expiry,
      expiry_days: settings.expiryDays,
      require_uppercase: settings.uppercase,
      require_lowercase: settings.lowercase,
      require_numbers: settings.number,
      require_special_chars: settings.specialChar,
      min_length: settings.length,
    });
  }, [settings, updatePasswordPolicy]);

  const handleReset = useCallback(async () => {
    const data = await resetPasswordPolicy();
    if (data) setSettings(mapPolicyToSettings(data));
  }, [resetPasswordPolicy]);

  const value = useMemo(
    () => ({
      settings,
      showTimeline,
      setShowTimeline,
      toggle,
      update,
      handleSave,
      handleReset,
    }),
    [settings, showTimeline, toggle, update, handleSave, handleReset]
  );

  return (
    <PasswordSettingsScreenContext.Provider value={value}>
      {children}
    </PasswordSettingsScreenContext.Provider>
  );
};
