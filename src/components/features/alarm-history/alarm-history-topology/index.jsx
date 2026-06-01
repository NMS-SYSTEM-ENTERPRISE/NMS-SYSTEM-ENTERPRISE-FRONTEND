'use client';

import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/alarm-history/shared/styles.module.css';

const TOPOLOGY_LINES = [
  { x1: '50%', y1: '80', x2: '25%', y2: '200' },
  { x1: '50%', y1: '80', x2: '50%', y2: '200' },
  { x1: '50%', y1: '80', x2: '75%', y2: '200' },
  { x1: '25%', y1: '230', x2: '25%', y2: '350' },
  { x1: '50%', y1: '230', x2: '50%', y2: '350' },
  { x1: '75%', y1: '230', x2: '75%', y2: '350' },
];

const LEVEL2_NODES = ['nodePos20', 'nodePos47', 'nodePos72'];
const LEVEL3_NODES = ['nodePos20', 'nodePos47', 'nodePos72'];

export const AlarmHistoryTopology = () => (
  <div className={sharedStyles.centerPanel}>
    <div className={sharedStyles.topologyCard}>
      <div className={sharedStyles.topologyCanvas}>
        <div className={sharedStyles.topologyRoot}>
          <div className={sharedStyles.nodeIcon}>
            <div className={sharedStyles.nodeCircle}>
              <span className={sharedStyles.nodeLabel}>PAM@SQL</span>
            </div>
          </div>
        </div>

        <svg className={sharedStyles.connectionSvg}>
          {TOPOLOGY_LINES.map((line) => (
            <line
              key={`${line.x1}-${line.y1}-${line.x2}-${line.y2}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              className={sharedStyles.topologyLine}
            />
          ))}
        </svg>

        <div className={sharedStyles.topologyLevel2}>
          {LEVEL2_NODES.map((posClass) => (
            <div key={`l2-${posClass}`} className={`${sharedStyles.nodeWrapper} ${sharedStyles[posClass]}`}>
              <div className={sharedStyles.nodeCirclePurple}>
                <span className={sharedStyles.nodeLabelSmall}>192.168.2.4..</span>
              </div>
            </div>
          ))}
        </div>

        <div className={sharedStyles.topologyLevel3}>
          {LEVEL3_NODES.map((posClass) => (
            <div key={`l3-${posClass}`} className={`${sharedStyles.nodeWrapper} ${sharedStyles[posClass]}`}>
              <div className={sharedStyles.nodeCircleSmall}>
                <span className={sharedStyles.nodeLabelSmall}>192.168.2.4..</span>
              </div>
            </div>
          ))}
        </div>

        <div className={sharedStyles.topologyBottom}>
          <div className={sharedStyles.bottomIcon}>
            <Icon icon="mdi:monitor" width={20} height={20} />
          </div>
          <div className={sharedStyles.bottomIcon}>
            <Icon icon="mdi:power-plug" width={20} height={20} />
          </div>
          <div className={sharedStyles.bottomIcon}>
            <Icon icon="mdi:package-variant" width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  </div>
);
