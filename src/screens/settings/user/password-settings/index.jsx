'use client';

import { PasswordSettingsContent } from '@/components/features/settings/user/password-settings/password-settings-content';
import { PasswordSettingsScreenProvider } from '@/contexts/settings/user/password-settings/password-settings-screen-context';

const PasswordSettings = () => (
  <PasswordSettingsScreenProvider>
    <PasswordSettingsContent />
  </PasswordSettingsScreenProvider>
);

export default PasswordSettings;
