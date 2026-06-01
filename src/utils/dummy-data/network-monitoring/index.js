// Mock data generator for different categories
export const generateMockData = (category, count = 15) => {
    const data = [];
    for (let i = 1; i <= count; i++) {
        const baseData = {
            id: i,
            name: `${category}-${i}`,
            status: Math.random() > 0.2 ? 'Up' : 'Down',
            ip: `172.16.${Math.floor(Math.random() * 255)}.${Math.floor(
                Math.random() * 255
            )}`,
        };

        // Add category-specific data
        switch (category) {
            case 'Server & Apps':
                return [
                    {
                        id: 1,
                        name: 'WIN-RCSAF0CE234',
                        status: 'Up',
                        ip: '172.16.8.57',
                        type: 'Windows',
                        cpu: 37.65,
                        memory: 88.71,
                        disk: 87.85,
                        group: ['Server', 'Windows'],
                        groupCount: 2,
                        tags: ['version_1', 'Micro', 'Work'],
                        activeAlerts: { critical: 2, warning: 1, info: 42 },
                        apps: ['Micro', 'Work'],
                    },
                    {
                        id: 2,
                        name: 'agent-aiops-1350',
                        status: 'Up',
                        ip: '172.16.13.50',
                        type: 'Linux',
                        cpu: 13,
                        memory: 33.92,
                        disk: 30,
                        group: ['Server', 'Linux'],
                        groupCount: 1,
                        tags: [],
                        activeAlerts: {},
                        apps: [],
                    },
                    {
                        id: 3,
                        name: 'rhel-7.5',
                        status: 'Up',
                        ip: '172.16.8.106',
                        type: 'Linux',
                        cpu: 3,
                        memory: 60,
                        disk: 6,
                        group: ['Server', 'Linux'],
                        groupCount: 2,
                        tags: ['Rabbit'],
                        activeAlerts: {},
                        apps: ['Rabbit'],
                    },
                ];

            case 'Network':
                data.push({
                    ...baseData,
                    type: ['Router', 'Switch', 'Firewall'][Math.floor(Math.random() * 3)],
                    uptime: `${Math.floor(Math.random() * 365)}d ${Math.floor(
                        Math.random() * 24
                    )}h`,
                    bandwidthIn: `${(Math.random() * 1000).toFixed(2)} Mbps`,
                    bandwidthOut: `${(Math.random() * 1000).toFixed(2)} Mbps`,
                    packetLoss: `${(Math.random() * 5).toFixed(2)}%`,
                    latency: `${Math.floor(Math.random() * 100)}ms`,
                });
                break;

            case 'Cloud':
                data.push({
                    ...baseData,
                    provider: ['AWS', 'Azure', 'GCP'][Math.floor(Math.random() * 3)],
                    region: ['us-east-1', 'eu-west-1', 'ap-south-1'][
                        Math.floor(Math.random() * 3)
                    ],
                    type: ['t2.micro', 't3.medium', 'm5.large'][
                        Math.floor(Math.random() * 3)
                    ],
                    cpu: Math.floor(Math.random() * 100),
                    memory: Math.floor(Math.random() * 100),
                    storage: `${Math.floor(Math.random() * 500)}GB`,
                    cost: `$${(Math.random() * 500).toFixed(2)}/mo`,
                });
                break;

            case 'Container':
                data.push({
                    ...baseData,
                    image: ['nginx:latest', 'redis:alpine', 'postgres:13'][
                        Math.floor(Math.random() * 3)
                    ],
                    host: `host-${Math.floor(Math.random() * 10)}`,
                    cpu: Math.floor(Math.random() * 100),
                    memory: Math.floor(Math.random() * 100),
                    network: `${(Math.random() * 100).toFixed(2)} MB/s`,
                    uptime: `${Math.floor(Math.random() * 30)}d ${Math.floor(
                        Math.random() * 24
                    )}h`,
                });
                break;

            default:
                data.push({
                    ...baseData,
                    type: `Type-${i}`,
                    value: Math.floor(Math.random() * 100),
                    description: `Description for ${category}-${i}`,
                });
        }
    }
    return data;
};

export const getProgressBarColor = (percentage) => {
    if (percentage < 40) return '#10b981';
    if (percentage < 70) return '#3b82f6';
    if (percentage < 90) return '#f59e0b';
    return '#ef4444';
};
