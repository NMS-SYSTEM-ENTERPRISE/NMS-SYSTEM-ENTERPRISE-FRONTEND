export const DEFAULT_AGENT_SETTINGS = {
  logDirectory: '/var/log',
  multilineEnabled: true,
  multilinePattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}',
  bufferSize: '5MB',
  compressionEnabled: true,
  retryAttempts: 3,
};

export const BUFFER_SIZE_OPTIONS = ['1MB', '5MB', '10MB', '50MB'];
