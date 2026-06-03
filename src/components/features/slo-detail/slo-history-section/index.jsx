'use client';

import { Badge } from '@/components/ui/badge';
import sharedStyles from '@/components/features/slo-detail/shared/styles.module.css';
import {
  getSparklineColorToken,
  getSparklineHeightTier,
} from '@/utils/constants/slo-detail/sparkline';
import { HISTORY_STATUS_BADGE_VARIANT } from '@/utils/constants/slo-detail';

export const SloHistorySection = ({ history = [] }) => (
  <div className={sharedStyles.timelineStrip}>
    {history.map((item) => (
      <div key={item.name} className={sharedStyles.historyRow}>
        <div className={sharedStyles.historyInfo}>
          <span className={sharedStyles.historyTitle}>{item.name}</span>
          <span className={sharedStyles.historySub}>
            Target: {item.target}% • Result: {item.achieved}%
          </span>
        </div>
        <div className={sharedStyles.historyViz}>
          {item.sparkline.map((val, i) => {
            const colorToken = getSparklineColorToken(val, item.target);
            const heightTier = getSparklineHeightTier(val);
            return (
              <div
                key={`${item.name}-${i}`}
                className={`${sharedStyles.historyBlock} ${sharedStyles[`sparkline${colorToken}`]} ${sharedStyles[`sparklineH${heightTier}`]}`}
              />
            );
          })}
        </div>
        <div className={sharedStyles.historyStatusWrapper}>
          <Badge variant={HISTORY_STATUS_BADGE_VARIANT[item.status] || 'neutral'}>
            {item.status}
          </Badge>
        </div>
      </div>
    ))}
  </div>
);
