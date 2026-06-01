'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import sharedStyles from '@/components/features/log-management-agent-config/shared/styles.module.css';
import { useLogManagementAgentConfig } from '@/hooks/log-management-agent-config';
import { BUFFER_SIZE_OPTIONS } from '@/utils/dummy-data/log-management-agent-config';

export const AgentConfigForm = () => {
  const { agentSettings, updateAgentSettings, resetSettings } = useLogManagementAgentConfig();

  return (
    <>
      <section className={sharedStyles.configSection}>
        <h2>Agent Configuration</h2>
        <div className={sharedStyles.formGrid}>
          <div className={sharedStyles.formGroup}>
            <label htmlFor="log-directory">Log Directory</label>
            <Input
              id="log-directory"
              type="text"
              value={agentSettings.logDirectory}
              onChange={(e) => updateAgentSettings({ logDirectory: e.target.value })}
            />
          </div>
          <div className={sharedStyles.formGroup}>
            <label htmlFor="buffer-size">Buffer Size</label>
            <SelectComponent
              id="buffer-size"
              value={agentSettings.bufferSize}
              onChange={(e) => updateAgentSettings({ bufferSize: e.target.value })}
              options={BUFFER_SIZE_OPTIONS.map((size) => ({ value: size, label: size }))}
            />
          </div>
          <div className={sharedStyles.formGroup}>
            <Checkbox
              checked={agentSettings.multilineEnabled}
              onChange={(e) => updateAgentSettings({ multilineEnabled: e.target.checked })}
              label="Enable Multiline Logs"
            />
          </div>
          {agentSettings.multilineEnabled && (
            <div className={sharedStyles.formGroup}>
              <label htmlFor="multiline-pattern">Multiline Pattern (Regex)</label>
              <Input
                id="multiline-pattern"
                type="text"
                value={agentSettings.multilinePattern}
                onChange={(e) => updateAgentSettings({ multilinePattern: e.target.value })}
              />
            </div>
          )}
          <div className={sharedStyles.formGroup}>
            <Checkbox
              checked={agentSettings.compressionEnabled}
              onChange={(e) => updateAgentSettings({ compressionEnabled: e.target.checked })}
              label="Enable Compression"
            />
          </div>
          <div className={sharedStyles.formGroup}>
            <label htmlFor="retry-attempts">Retry Attempts</label>
            <Input
              id="retry-attempts"
              type="number"
              value={agentSettings.retryAttempts}
              onChange={(e) =>
                updateAgentSettings({ retryAttempts: Number(e.target.value) })
              }
            />
          </div>
        </div>
      </section>

      <div className={sharedStyles.actions}>
        <Button variant="secondary" className={sharedStyles.btnSecondary} onClick={resetSettings}>
          Reset to Default
        </Button>
        <Button className={sharedStyles.btnPrimary}>Save Configuration</Button>
      </div>
    </>
  );
};
