export const generateMockData = () => {
  const data = [];
  const now = Date.now();
  for (let i = 0; i < 100; i++) {
    data.push({
      timestamp: now - (100 - i) * 60000,
      value: 45 + Math.random() * 10,
    });
  }
  return data;
};

export const MONITORS = [
  { id: '1', name: 'xen71master(6492031471S)', ip: '172.16.10.231' },
  { id: '2', name: 'server01(6492031472)', ip: '172.16.10.232' },
];

export const INSTANCE_TYPES = [
  { id: '1', name: 'citrix.xen.cluster.node' },
  { id: '2', name: 'system.node' },
];

export const METRICS = [
  'system.memory.free.percent',
  'system.memory.free.bytes',
  'system.load.avg1.min',
  'system.cpu.percent',
  'system.load.avg5.min',
  'system.memory.used.percent',
  'system.load.avg15.min',
  'system.memory.available.bytes',
  'system.memory.used.bytes',
  'system.blocked.processes',
  'system.swap.memory.free.bytes',
  'system.running.processes',
  'system.cpu.nice.percent',
  'system.context.switches',
  'system.cpu.kernel.percent',
  'system.interrupts',
  'system.memory.capacity.bytes',
  'system.cpu.steal.percent',
  'system.swap.memory.used.bytes',
];
