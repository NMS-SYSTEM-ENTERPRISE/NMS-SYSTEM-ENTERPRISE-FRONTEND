'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/log-management-agent-config/shared/styles.module.css';
import { useLogManagementAgentConfig } from '@/hooks/log-management-agent-config';

export const AgentConfigInstall = () => {
  const { installCommand } = useLogManagementAgentConfig();

  return (
    <section className={sharedStyles.installSection}>
      <h2>Installation Instructions</h2>
      <div className={sharedStyles.codeBlock}>
        <code>{installCommand}</code>
        <Button
          variant="ghost"
          size="icon"
          className={sharedStyles.copyBtn}
          title="Copy"
          onClick={() => navigator.clipboard.writeText(installCommand)}
        >
          <Icon icon="mdi:content-copy" width={18} height={18} />
        </Button>
      </div>
    </section>
  );
};
