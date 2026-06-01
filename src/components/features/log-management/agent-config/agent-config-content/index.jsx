'use client';

import { AgentConfigAgentSelect } from '@/components/features/log-management/agent-config/agent-config-agent-select';
import { AgentConfigForm } from '@/components/features/log-management/agent-config/agent-config-form';
import { AgentConfigHeader } from '@/components/features/log-management/agent-config/agent-config-header';
import { AgentConfigInstall } from '@/components/features/log-management/agent-config/agent-config-install';
import sharedStyles from '@/components/features/log-management/agent-config/shared/styles.module.css';

export const AgentConfigContent = () => (
  <div className={sharedStyles.pageContainer}>
    <AgentConfigHeader />
    <div className={sharedStyles.content}>
      <AgentConfigAgentSelect />
      <AgentConfigInstall />
      <AgentConfigForm />
    </div>
  </div>
);
