'use client';

import { AgentConfigContent } from '@/components/features/log-management-agent-config/agent-config-content';
import { LogManagementAgentConfigProvider } from '@/contexts/log-management-agent-config';

export default function AgentConfigPage() {
  return (
    <LogManagementAgentConfigProvider>
      <AgentConfigContent />
    </LogManagementAgentConfigProvider>
  );
}
