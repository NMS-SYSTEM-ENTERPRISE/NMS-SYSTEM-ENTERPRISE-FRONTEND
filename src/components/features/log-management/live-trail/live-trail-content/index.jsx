'use client';

import { LiveTrailControls } from '@/components/features/log-management/live-trail/live-trail-controls';
import { LiveTrailFooter } from '@/components/features/log-management/live-trail/live-trail-footer';
import { LiveTrailHeader } from '@/components/features/log-management/live-trail/live-trail-header';
import { LiveTrailLogView } from '@/components/features/log-management/live-trail/live-trail-log-view';
import sharedStyles from '@/components/features/log-management/live-trail/shared/styles.module.css';

export const LiveTrailContent = () => (
  <div className={sharedStyles.liveTrail}>
    <LiveTrailHeader />
    <LiveTrailControls />
    <LiveTrailLogView />
    <LiveTrailFooter />
  </div>
);
