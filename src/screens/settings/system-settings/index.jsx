"use client";
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import styles from '../shared-settings-styles.module.css';
import landingStyles from '../settings-landing.module.css';
const SystemSettings = () => {
  const router = useRouter();
  const systemSettingsCards = [
    {
      icon: 'mdi:two-factor-authentication',
      title: 'Two Factor Authentication',
      description: 'Enable 2FA for enhanced security with app or email verification',
      path: '/settings/system/two-factor-auth',
      color: '#00AEEF',
    },
    {
      icon: 'mdi:email',
      title: 'Mail Server',
      description: 'Configure SMTP settings for email notifications and alerts',
      path: '/settings/system/mail-server',
      color: '#4CAF50',
    },
    {
      icon: 'mdi:server-network',
      title: 'Proxy Server',
      description: 'Set up HTTP/Socks proxy for external connections',
      path: '/settings/system/proxy-server',
      color: '#FF9800',
    },
    {
      icon: 'mdi:cellphone-message',
      title: 'SMS Server',
      description: 'Configure SMS gateway for text message alerts',
      path: '/settings/system/sms-server',
      color: '#9C27B0',
    },
    {
      icon: 'mdi:palette',
      title: 'Rebranding',
      description: 'Customize logos, colors, and branding elements',
      path: '/settings/system/rebranding',
      color: '#E91E63',
    },
    {
      icon: 'mdi:database-clock',
      title: 'Data Retention',
      description: 'Manage retention policies for metrics, logs, and flows',
      path: '/settings/system/data-retention',
      color: '#00BCD4',
    },
    {
      icon: 'mdi:cloud-upload',
      title: 'Deployment',
      description: 'View deployment information and system configuration',
      path: '/settings/system/deployment',
      color: '#3F51B5',
    },
    {
      icon: 'mdi:ethernet',
      title: 'MAC Address List',
      description: 'Manage MAC address whitelist and blacklist',
      path: '/settings/system/mac-address',
      color: '#607D8B',
    },
    {
      icon: 'mdi:harddisk',
      title: 'Storage Profile',
      description: 'Configure storage destinations for backups and exports',
      path: '/settings/system/storage-profile',
      color: '#795548',
    },
    {
      icon: 'mdi:backup-restore',
      title: 'Backup Profile',
      description: 'Schedule and manage system backup configurations',
      path: '/settings/system/backup-profile',
      color: '#009688',
    },
    {
      icon: 'mdi:dns',
      title: 'DNS Server',
      description: 'Configure DNS server profiles for name resolution',
      path: '/settings/system/dns-server',
      color: '#8BC34A',
    },
    {
      icon: 'mdi:tag-multiple',
      title: 'Rule Based Tags',
      description: 'Create dynamic tagging rules for automatic device classification',
      path: '/settings/system/rule-based-tags',
      color: '#CDDC39',
    },
  ];
  return (
    <>
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <div className={landingStyles.landingHeader}>
            <div className={landingStyles.landingHeaderIcon}>
              <Icon icon="mdi:cog" width={48} height={48} />
            </div>
            <div>
              <h2 className={landingStyles.landingTitle}>System Settings</h2>
              <p className={landingStyles.landingDescription}>
                Configure core system settings, security, storage, and infrastructure options
              </p>
            </div>
          </div>
          <div className={landingStyles.cardsGrid}>
            {systemSettingsCards.map((card, index) => (
              <div
                key={index}
                className={landingStyles.settingCard}
                onClick={() => router.push(card.path)}
              >
                <div className={landingStyles.cardIcon} style={{ backgroundColor: `${card.color}20`, color: card.color }}>
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
          <div className={landingStyles.statsSection}>
            <div className={landingStyles.statCard}>
              <Icon icon="mdi:shield-check" width={32} height={32} />
              <div>
                <div className={landingStyles.statValue}>Enabled</div>
                <div className={landingStyles.statLabel}>2FA Status</div>
              </div>
            </div>
            <div className={landingStyles.statCard}>
              <Icon icon="mdi:database" width={32} height={32} />
              <div>
                <div className={landingStyles.statValue}>90 Days</div>
                <div className={landingStyles.statLabel}>Data Retention</div>
              </div>
            </div>
            <div className={landingStyles.statCard}>
              <Icon icon="mdi:backup-restore" width={32} height={32} />
              <div>
                <div className={landingStyles.statValue}>Daily</div>
                <div className={landingStyles.statLabel}>Backup Schedule</div>
              </div>
            </div>
            <div className={landingStyles.statCard}>
              <Icon icon="mdi:harddisk" width={32} height={32} />
              <div>
                <div className={landingStyles.statValue}>256 GB</div>
                <div className={landingStyles.statLabel}>Storage Used</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SystemSettings;
