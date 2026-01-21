"use client";
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import styles from '../shared-settings-styles.module.css';
import landingStyles from '../settings-landing.module.css';
const LogOverview = () => {
  const router = useRouter();
  const logSettingsCards = [
    {
      icon: 'mdi:cog',
      title: 'Log Settings',
      description: 'Configure log collection, storage, processing, and alert settings',
      path: '/settings/log-settings',
      color: '#00AEEF',
    },
    {
      icon: 'mdi:code-braces',
      title: 'Log Parser Library',
      description: 'Manage log parsers with regex patterns and field mappings',
      path: '/settings/log/parser-library',
      color: '#7C4DFF',
    },
    {
      icon: 'mdi:database',
      title: 'Log Inventory',
      description: 'View and manage all log sources and collection profiles',
      path: '/settings/log/inventory',
      color: '#4CAF50',
    },
    {
      icon: 'mdi:file-document-multiple',
      title: 'Collection Profile',
      description: 'Define log collection profiles for different sources',
      path: '/settings/log/collection-profile',
      color: '#FF9800',
    },
    {
      icon: 'mdi:share',
      title: 'Log Forwarder',
      description: 'Forward logs to external systems and SIEM platforms',
      path: '/settings/log/forwarder',
      color: '#9C27B0',
    },
    {
      icon: 'mdi:monitor-eye',
      title: 'Agent Monitor',
      description: 'Monitor log collection agents and their health status',
      path: '/settings/log/agent-monitor',
      color: '#00BCD4',
    },
  ];
  const logStats = [
    { label: 'Logs/Second', value: '1.2K', icon: 'mdi:speedometer', color: '#00AEEF' },
    { label: 'Total Sources', value: '45', icon: 'mdi:server', color: '#4CAF50' },
    { label: 'Active Parsers', value: '28', icon: 'mdi:code-braces', color: '#FF9800' },
    { label: 'Storage Used', value: '2.4 TB', icon: 'mdi:database', color: '#9C27B0' },
  ];
  return (
    <>
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <div className={landingStyles.landingHeader}>
            <div className={landingStyles.landingHeaderIcon}>
              <Icon icon="mdi:file-document" width={48} height={48} />
            </div>
            <div>
              <h2 className={landingStyles.landingTitle}>Log Settings</h2>
              <p className={landingStyles.landingDescription}>
                Configure log collection, parsing, storage, and forwarding for centralized log management
              </p>
            </div>
          </div>
          <div className={landingStyles.cardsGrid}>
            {logSettingsCards.map((card, index) => (
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
          {/* Real-time Stats */}
          <div style={{marginTop: 'var(--margin-2xl)'}}>
            <h3 style={{fontSize: 'var(--font-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-chart-cyan)', marginBottom: 'var(--margin-lg)'}}>
              Real-time Log Statistics
            </h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--gap-lg)'}}>
              {logStats.map((stat, index) => (
                <div key={index} style={{padding: 'var(--padding-xl)', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 'var(--gap-lg)'}}>
                  <div style={{width: '64px', height: '64px', borderRadius: 'var(--radius-md)', backgroundColor: `${stat.color}20`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon icon={stat.icon} width={32} height={32} />
                  </div>
                  <div>
                    <div style={{fontSize: 'var(--font-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-text-primary)'}}>{stat.value}</div>
                    <div style={{fontSize: 'var(--font-sm)', color: 'var(--color-text-secondary)', marginTop: 'var(--margin-xs)'}}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={landingStyles.statsSection} style={{marginTop: 'var(--margin-2xl)'}}>
            <div className={landingStyles.statCard}>
              <Icon icon="mdi:check-circle" width={32} height={32} />
              <div>
                <div className={landingStyles.statValue}>98.5%</div>
                <div className={landingStyles.statLabel}>Collection Rate</div>
              </div>
            </div>
            <div className={landingStyles.statCard}>
              <Icon icon="mdi:alert" width={32} height={32} />
              <div>
                <div className={landingStyles.statValue}>234</div>
                <div className={landingStyles.statLabel}>Errors Today</div>
              </div>
            </div>
            <div className={landingStyles.statCard}>
              <Icon icon="mdi:clock-outline" width={32} height={32} />
              <div>
                <div className={landingStyles.statValue}>90 Days</div>
                <div className={landingStyles.statLabel}>Retention Period</div>
              </div>
            </div>
            <div className={landingStyles.statCard}>
              <Icon icon="mdi:chart-timeline-variant" width={32} height={32} />
              <div>
                <div className={landingStyles.statValue}>5.2M</div>
                <div className={landingStyles.statLabel}>Logs Today</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LogOverview;
