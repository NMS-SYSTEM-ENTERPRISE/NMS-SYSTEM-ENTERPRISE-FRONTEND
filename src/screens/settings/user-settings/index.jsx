'use client';

import { UserSettingsContent } from '@/components/features/settings/user-settings/user-settings-content';
import { UserSettingsProvider } from '@/contexts/settings/user-settings';

const UserSettings = () => (
  <UserSettingsProvider>
    <UserSettingsContent />
  </UserSettingsProvider>
);

export default UserSettings;
