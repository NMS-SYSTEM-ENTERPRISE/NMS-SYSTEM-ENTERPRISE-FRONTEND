"use client";
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import landingStyles from './settings-landing.module.css';
import styles from './shared-settings-styles.module.css';

const SettingsLanding = () => {
  const router = useRouter();
  
  const settingCards = [
    {
      icon: 'mdi:account',
      title: 'My Account',
      description: 'Manage personal account details and preferences',
      path: '/settings/my-account',
      color: '#00AEEF',
    },
    {
      icon: 'mdi:account-group',
      title: 'User Management',
      description: 'Manage users, roles, and access controls',
      path: '/settings/user',
      color: '#4CAF50',
    },
    {
      icon: 'mdi:cog',
      title: 'System Settings',
      description: 'Configure system-wide settings and parameters',
      path: '/settings/system',
      color: '#FF9800',
    },
    {
      icon: 'mdi:shield',
      title: 'Compliance',
      description: 'Manage compliance policies and benchmarks',
      path: '/settings/compliance',
      color: '#E91E63',
    },
     {
      icon: 'mdi:monitor',
      title: 'Monitor Settings',
      description: 'Configure monitoring intervals and protocols',
      path: '/settings/monitor',
      color: '#9C27B0',
    },
     {
      icon: 'mdi:file-document',
      title: 'Log Settings',
      description: 'Manage log collection and forwarding',
      path: '/settings/log',
      color: '#607D8B',
    },
  ];

  return (
    <div className={styles.mainContent}>
      <div className={styles.contentArea}>
        <div className={landingStyles.landingHeader}>
          <div className={landingStyles.landingHeaderIcon}>
            <Icon icon="mdi:cog-box" width={48} height={48} />
          </div>
          <div>
            <h2 className={landingStyles.landingTitle}>Settings Overview</h2>
            <p className={landingStyles.landingDescription}>
              Manage all your application settings from one central location
            </p>
          </div>
        </div>

        <div className={landingStyles.cardsGrid}>
          {settingCards.map((card, index) => (
            <div
              key={index}
              className={landingStyles.settingCard}
              onClick={() => router.push(card.path)}
            >
              <div
                className={landingStyles.cardIcon}
                style={{ backgroundColor: `${card.color}20`, color: card.color }}
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
      </div>
    </div>
  );
};

export default SettingsLanding;
