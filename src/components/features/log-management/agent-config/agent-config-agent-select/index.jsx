'use client';

import { Icon } from '@iconify/react';
import clsx from 'clsx';
import sharedStyles from '@/components/features/log-management/agent-config/shared/styles.module.css';
import { useLogManagementAgentConfig } from '@/hooks/log-management-agent-config';
import { AGENT_ICON_CLASS } from '@/utils/constants/log-management-agent-config';
import { AGENT_TYPES } from '@/utils/dummy-data/log-management-agent-config';

export const AgentConfigAgentSelect = () => {
  const { selectedAgent, setSelectedAgent } = useLogManagementAgentConfig();

  return (
    <section className={sharedStyles.agentSelection}>
      <h2>Select Agent Type</h2>
      <div className={sharedStyles.agentGrid}>
        {AGENT_TYPES.map((agent) => (
          <button
            key={agent.id}
            type="button"
            className={clsx(
              sharedStyles.agentCard,
              selectedAgent === agent.id && sharedStyles.agentCardActive
            )}
            onClick={() => setSelectedAgent(agent.id)}
          >
            <Icon
              icon={agent.icon}
              width={48}
              height={48}
              className={sharedStyles[AGENT_ICON_CLASS[agent.colorToken]]}
            />
            <span>{agent.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
