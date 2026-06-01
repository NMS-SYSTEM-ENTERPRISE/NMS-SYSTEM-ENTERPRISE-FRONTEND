'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import sharedStyles from '@/components/features/log-management/agent-config/shared/styles.module.css';

export const AgentConfigHeader = () => {
  const router = useRouter();

  return (
    <header className={sharedStyles.header}>
      <div className={sharedStyles.headerLeft}>
        <Button
          variant="ghost"
          size="icon"
          className={sharedStyles.backBtn}
          onClick={() => router.push('/log-management')}
        >
          <Icon icon="mdi:arrow-left" width={20} height={20} />
        </Button>
        <h1>Log Agent Configuration</h1>
      </div>
    </header>
  );
};
