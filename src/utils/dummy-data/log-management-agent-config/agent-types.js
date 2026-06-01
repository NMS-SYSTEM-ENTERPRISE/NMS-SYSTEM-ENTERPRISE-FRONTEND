export const AGENT_TYPES = [
  { id: 'linux', name: 'Linux Agent', icon: 'mdi:linux', colorToken: 'linux' },
  { id: 'windows', name: 'Windows Agent', icon: 'mdi:microsoft-windows', colorToken: 'windows' },
  { id: 'docker', name: 'Docker Agent', icon: 'mdi:docker', colorToken: 'docker' },
  { id: 'kubernetes', name: 'Kubernetes Agent', icon: 'mdi:kubernetes', colorToken: 'kubernetes' },
];

export const DEFAULT_AGENT_ID = 'linux';

export const AGENT_INSTALL_COMMANDS = {
  linux: 'curl -fsSL https://snr-edatas.com/install.sh | sudo bash',
  windows: 'Invoke-WebRequest -Uri https://snr-edatas.com/install.ps1 | Invoke-Expression',
  docker: 'docker run -d --name snr-edatas-agent snr-edatas/log-agent:latest',
  kubernetes: 'kubectl apply -f https://snr-edatas.com/k8s/agent.yaml',
};
