export const ALERT_DETAILS = {
  1: {
    title: 'Very Low or No Flow Detected',
    alertId: '10000000000101',
    metric: 'network.interface.flows',
    triggerCondition: 'metric.value <= 5.0 (Static Threshold)',
    severity: 'CRITICAL',
    count: '1,256',
    duration: '2d 14h 22m',
    firstSeen: 'Tue, Sep 19, 2023 04:18:39 PM',
    lastSeen: 'Thu, Sep 28, 2023 04:15:15 PM',
    monitor: 'cisco-catalyst-core-01',
    instance: 'GigabitEthernet1/0/1',
    category: 'Network Availability',
  },
};

export const DEFAULT_ALERT_DETAIL = ALERT_DETAILS[1];
