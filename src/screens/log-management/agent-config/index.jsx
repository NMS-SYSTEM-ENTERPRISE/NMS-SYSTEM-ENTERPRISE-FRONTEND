"use client";
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

const AgentConfig = () => {
  const [selectedAgent, setSelectedAgent] = useState('linux');
  const [agentSettings, setAgentSettings] = useState({
    logDirectory: '/var/log',
    multilineEnabled: true,
    multilinePattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}',
    bufferSize: '5MB',
    compressionEnabled: true,
    retryAttempts: 3,
  });

  const agentTypes = [
    { id: 'linux', name: 'Linux Agent', icon: 'mdi:linux', color: '#FCC624' },
    {
      id: 'windows',
      name: 'Windows Agent',
      icon: 'mdi:microsoft-windows',
      color: '#0078D4',
    },
    {
      id: 'docker',
      name: 'Docker Agent',
      icon: 'mdi:docker',
      color: '#2496ED',
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes Agent',
      icon: 'mdi:kubernetes',
      color: '#326CE5',
    },
  ];

  const getInstallCommand = () => {
    switch (selectedAgent) {
      case 'linux':
        return 'curl -fsSL https://snr-edatas.com/install.sh | sudo bash';
      case 'windows':
        return 'Invoke-WebRequest -Uri https://snr-edatas.com/install.ps1 | Invoke-Expression';
      case 'docker':
        return 'docker run -d --name snr-edatas-agent snr-edatas/log-agent:latest';
      case 'kubernetes':
        return 'kubectl apply -f https://snr-edatas.com/k8s/agent.yaml';
      default:
        return '';
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn}>
            <Icon icon="mdi:arrow-left" width={20} height={20} />
          </button>
          <h1>Log Agent Configuration</h1>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.agentSelection}>
          <h2>Select Agent Type</h2>
          <div className={styles.agentGrid}>
            {agentTypes.map((agent) => (
              <button
                key={agent.id}
                className={`${styles.agentCard} ${
                  selectedAgent === agent.id ? styles.agentCardActive : ''
                }`}
                onClick={() => setSelectedAgent(agent.id)}
              >
                <Icon
                  icon={agent.icon}
                  width={48}
                  height={48}
                  style={{ color: agent.color }}
                />
                <span>{agent.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.installSection}>
          <h2>Installation Instructions</h2>
          <div className={styles.codeBlock}>
            <code>{getInstallCommand()}</code>
            <button className={styles.copyBtn} title="Copy">
              <Icon icon="mdi:content-copy" width={18} height={18} />
            </button>
          </div>
        </div>

        <div className={styles.configSection}>
          <h2>Agent Configuration</h2>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Log Directory</label>
              <input
                type="text"
                value={agentSettings.logDirectory}
                onChange={(e) =>
                  setAgentSettings({
                    ...agentSettings,
                    logDirectory: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Buffer Size</label>
              <select
                value={agentSettings.bufferSize}
                onChange={(e) =>
                  setAgentSettings({
                    ...agentSettings,
                    bufferSize: e.target.value,
                  })
                }
              >
                <option>1MB</option>
                <option>5MB</option>
                <option>10MB</option>
                <option>50MB</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Enable Multiline Logs</label>
              <input
                type="checkbox"
                checked={agentSettings.multilineEnabled}
                onChange={(e) =>
                  setAgentSettings({
                    ...agentSettings,
                    multilineEnabled: e.target.checked,
                  })
                }
              />
            </div>
            {agentSettings.multilineEnabled && (
              <div className={styles.formGroup}>
                <label>Multiline Pattern (Regex)</label>
                <input
                  type="text"
                  value={agentSettings.multilinePattern}
                  onChange={(e) =>
                    setAgentSettings({
                      ...agentSettings,
                      multilinePattern: e.target.value,
                    })
                  }
                />
              </div>
            )}
            <div className={styles.formGroup}>
              <label>Enable Compression</label>
              <input
                type="checkbox"
                checked={agentSettings.compressionEnabled}
                onChange={(e) =>
                  setAgentSettings({
                    ...agentSettings,
                    compressionEnabled: e.target.checked,
                  })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Retry Attempts</label>
              <input
                type="number"
                value={agentSettings.retryAttempts}
                onChange={(e) =>
                  setAgentSettings({
                    ...agentSettings,
                    retryAttempts: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnSecondary}>Reset to Default</button>
          <button className={styles.btnPrimary}>Save Configuration</button>
        </div>
      </div>
    </div>
  );
};

export default AgentConfig;
