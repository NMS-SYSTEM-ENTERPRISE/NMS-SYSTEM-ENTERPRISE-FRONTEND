'use client';

import { FlowActionSidebar } from '@/components/features/flow/flow-action-sidebar';
import { FlowAnalytics } from '@/components/features/flow/flow-analytics';
import { FlowDashboard } from '@/components/features/flow/flow-dashboard';
import { FlowExplorer } from '@/components/features/flow/flow-explorer';
import { FlowHeader } from '@/components/features/flow/flow-header';
import { FlowSidebar } from '@/components/features/flow/flow-sidebar';
import { OverallFlowAnalysis } from '@/components/features/flow/overall-flow-analysis';
import sharedStyles from '@/components/features/flow/shared/styles.module.css';
import { Icon } from '@iconify/react';
import { useFlow } from '@/hooks/flow';
import { FLOW_SIDEBAR_ITEMS } from '@/utils/constants/flow';

export const FlowContent = () => {
  const {
    activeView,
    showActionSidebar,
    setShowActionSidebar,
    flowConfig,
    setFlowConfig,
  } = useFlow();

  const placeholderItem = FLOW_SIDEBAR_ITEMS.find((i) => i.id === activeView);
  const isKnownView = ['dashboard', 'explorer', 'analytics', 'overall_flow'].includes(activeView);

  return (
    <div className={sharedStyles.flow}>
      <FlowSidebar />

      <div className={sharedStyles.mainContentWrapper}>
        <FlowHeader />

        <div className={sharedStyles.contentArea}>
          {activeView === 'dashboard' && <FlowDashboard config={flowConfig} />}
          {activeView === 'explorer' && <FlowExplorer config={flowConfig} />}
          {activeView === 'analytics' && <FlowAnalytics config={flowConfig} />}
          {activeView === 'overall_flow' && <OverallFlowAnalysis />}

          {!isKnownView && (
            <div className={sharedStyles.placeholderView}>
              <Icon icon={placeholderItem?.icon || 'mdi:help'} width={64} height={64} />
              <h2>{placeholderItem?.label || 'View'} View</h2>
              <p>This section is currently under development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
