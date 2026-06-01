'use client';

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import landingStyles from '@/screens/settings/settings-landing.module.css';
import sharedStyles from '@/screens/settings/shared-settings-styles.module.css';
import styles from './styles.module.css';

const ACCENT_CLASS_MAP = {
  cyan: landingStyles.cardIconAccentCyan,
  purple: landingStyles.cardIconAccentPurple,
  coral: landingStyles.cardIconAccentCoral,
  green: landingStyles.cardIconAccentGreen,
  orange: landingStyles.cardIconAccentOrange,
  violet: landingStyles.cardIconAccentViolet,
  teal: landingStyles.cardIconAccentTeal,
  pink: landingStyles.cardIconAccentPink,
  indigo: landingStyles.cardIconAccentIndigo,
  blueGrey: landingStyles.cardIconAccentBlueGrey,
  brown: landingStyles.cardIconAccentBrown,
  mint: landingStyles.cardIconAccentMint,
  lime: landingStyles.cardIconAccentLime,
  yellowGreen: landingStyles.cardIconAccentYellowGreen,
};

const getAccentClass = (accent) =>
  ACCENT_CLASS_MAP[accent] ?? landingStyles.cardIconAccentCyan;

export const SettingsLandingPage = ({
  header,
  cards,
  stats,
  contentClassName,
}) => {
  const router = useRouter();

  return (
    <div className={sharedStyles.mainContent}>
      <div
        className={clsx(
          sharedStyles.contentArea,
          sharedStyles.landingContent,
          contentClassName
        )}
      >
        <div className={landingStyles.landingHeader}>
          <div className={landingStyles.landingHeaderIcon}>
            <Icon icon={header.icon} width={48} height={48} />
          </div>
          <div>
            <h2 className={landingStyles.landingTitle}>{header.title}</h2>
            <p className={landingStyles.landingDescription}>{header.description}</p>
          </div>
        </div>

        <div className={landingStyles.cardsGrid}>
          {cards.map((card) => (
            <div
              key={card.path}
              className={landingStyles.settingCard}
              onClick={() => router.push(card.path)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  router.push(card.path);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div
                className={clsx(landingStyles.cardIcon, getAccentClass(card.accent))}
              >
                <Icon icon={card.icon} width={32} height={32} />
              </div>
              <div className={landingStyles.cardContent}>
                <h3 className={landingStyles.cardTitle}>{card.title}</h3>
                <p className={landingStyles.cardDescription}>{card.description}</p>
              </div>
              <div className={landingStyles.cardArrow}>
                <Icon icon="mdi:chevron-right" width={24} height={24} />
              </div>
            </div>
          ))}
        </div>

        {stats?.length > 0 && (
          <div className={landingStyles.statsSection}>
            {stats.map((stat) => (
              <div key={stat.label} className={landingStyles.statCard}>
                <Icon icon={stat.icon} width={32} height={32} />
                <div>
                  <div className={landingStyles.statValue}>{stat.value}</div>
                  <div className={landingStyles.statLabel}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
