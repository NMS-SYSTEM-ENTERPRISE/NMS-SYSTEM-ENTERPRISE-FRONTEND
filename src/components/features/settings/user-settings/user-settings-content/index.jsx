'use client';

import { SettingsLandingPage } from '@/components/features/settings/shared/settings-landing-page';
import { useUserSettings } from '@/hooks/settings/user-settings';
import {
  USER_SETTINGS_LANDING_CARDS,
  USER_SETTINGS_LANDING_HEADER,
} from '@/utils/constants/settings/user-settings';

export const UserSettingsContent = () => {
  const { stats } = useUserSettings();

  return (
    <SettingsLandingPage
      header={USER_SETTINGS_LANDING_HEADER}
      cards={USER_SETTINGS_LANDING_CARDS}
      stats={stats}
    />
  );
};
