export const MOCK_LOG_SOURCES = [
  { value: '172.16.14.71', label: '172.16.14.71' },
  { value: '172.16.15.126', label: '172.16.15.126' },
  { value: '192.168.1.1', label: '192.168.1.1' },
];

export const LIVE_TRAIL_TIMESTAMPS = [
  '<B5>Apr 22 16:48:54 AlOps sudo:',
  '<B6>Apr 22 16:48:54 AlOps sudo:',
  '<B5>Apr 22 16:48:55 AlOps sshd[3820821]:',
  '<38>Apr 22 16:48:55 AlOps systemd-logind[1276]:',
  '<30>Apr 22 16:48:56 AlOps systemd[1]:',
];

export const LIVE_TRAIL_MESSAGES = [
  'snr-edatas : PWD=/home/snr-edatas ; USER=root ; COMMAND=/usr/bin/lsof -p 2199681',
  'pam_unix(sudo:session): session opened for user root(uid=0) by snr-edatas(uid=1000)',
  'pam_unix(sudo:session): session closed for user root',
  'pam_unix(sshd:session): session closed for user snr-edatas',
  'Session 42881.scope: Deactivated successfully.',
  'Session 42880.scope: Consumed 24.643s CPU time.',
  'session-42881.scope: Consumed 1.651s CPU time.',
  'Connection closed by 127.0.0.1 port 47096',
];

export const generateMockLogLine = () => {
  const randomTimestamp =
    LIVE_TRAIL_TIMESTAMPS[Math.floor(Math.random() * LIVE_TRAIL_TIMESTAMPS.length)];
  const randomMessage =
    LIVE_TRAIL_MESSAGES[Math.floor(Math.random() * LIVE_TRAIL_MESSAGES.length)];
  return `${randomTimestamp} ${randomMessage}`;
};
