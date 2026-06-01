export const SLO_TIMELINE_DATA = [
  {
    date: 'Today',
    items: [
      { time: '12:30 PM', slo: 'Monitor-SLO-Weekly-Perf-Windows', status: 'Ok', event: 'Target achieved' },
      { time: '10:15 AM', slo: 'slo-monthly-interface', status: 'Warning', event: 'Approaching threshold' },
    ],
  },
  {
    date: 'Yesterday',
    items: [
      { time: '06:45 PM', slo: 'Interface-SLO-Weekly-Ava-Network', status: 'Breached', event: 'SLO breached' },
      { time: '02:30 PM', slo: 'slo-tag-coorelation', status: 'Ok', event: 'Target achieved' },
      { time: '09:00 AM', slo: 'Monitor-SLO-Monthly-Ava-Server', status: 'Warning', event: 'Error budget low' },
    ],
  },
  {
    date: '2 Days Ago',
    items: [
      { time: '04:20 PM', slo: 'Monitor-SLO-Weekly-Perf-Windows', status: 'Ok', event: 'Target achieved' },
      { time: '11:00 AM', slo: 'slo-monthly-interface', status: 'Ok', event: 'Target achieved' },
    ],
  },
];
