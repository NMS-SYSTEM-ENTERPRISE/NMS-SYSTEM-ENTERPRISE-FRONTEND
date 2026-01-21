"use client";
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import styles from '../shared-settings-styles.module.css';
import landingStyles from '../settings-landing.module.css';
const UserSettings = () => {
  const router = useRouter();
  const userSettingsCards = [
    {
      icon: 'mdi:account-multiple',
      title: 'User Management',
      description: 'Create and manage user accounts, assign roles and groups',
      path: '/settings/user/users',
      color: '#00AEEF',
    },
    {
      icon: 'mdi:shield-account',
      title: 'Roles',
      description: 'Define roles and manage permissions for different user types',
      path: '/settings/user/roles',
      color: '#7C4DFF',
    },
    {
      icon: 'mdi:account-group',
      title: 'Groups',
      description: 'Organize users into groups for easier management',
      path: '/settings/user/groups',
      color: '#FF6B6B',
    },
    {
      icon: 'mdi:key-variant',
      title: 'Personal Access Token',
      description: 'Generate and manage API access tokens for integrations',
      path: '/settings/user/personal-access-token',
      color: '#4CAF50',
    },
    {
      icon: 'mdi:lock',
      title: 'Password Settings',
      description: 'Configure password policies and security requirements',
      path: '/settings/user/password-settings',
      color: '#FF9800',
    },
    {
      icon: 'mdi:server-network',
      title: 'LDAP Server',
      description: 'Integrate with LDAP/Active Directory for user authentication',
      path: '/settings/user/ldap-server',
      color: '#9C27B0',
    },
    {
      icon: 'mdi:login-variant',
      title: 'Single Sign-On',
      description: 'Configure SSO with SAML providers (OneLogin, Okta, Azure AD)',
      path: '/settings/user/single-sign-on',
      color: '#00BCD4',
    },
  ];
  return (
    <>
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <div className={landingStyles.landingHeader}>
            <div className={landingStyles.landingHeaderIcon}>
              <Icon icon="mdi:account-group" width={48} height={48} />
            </div>
            <div>
              <h2 className={landingStyles.landingTitle}>User Settings</h2>
              <p className={landingStyles.landingDescription}>
                Manage users, roles, groups, and authentication settings for your organization
              </p>
            </div>
          </div>
          <div className={landingStyles.cardsGrid}>
            {userSettingsCards.map((card, index) => (
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
              <Icon icon="mdi:account" width={32} height={32} />
              <div>
                <div className={landingStyles.statValue}>24</div>
                <div className={landingStyles.statLabel}>Total Users</div>
              </div>
            </div>
            <div className={landingStyles.statCard}>
              <Icon icon="mdi:shield-account" width={32} height={32} />
              <div>
                <div className={landingStyles.statValue}>5</div>
                <div className={landingStyles.statLabel}>Active Roles</div>
              </div>
            </div>
            <div className={landingStyles.statCard}>
              <Icon icon="mdi:account-group" width={32} height={32} />
              <div>
                <div className={landingStyles.statValue}>8</div>
                <div className={landingStyles.statLabel}>User Groups</div>
              </div>
            </div>
            <div className={landingStyles.statCard}>
              <Icon icon="mdi:login" width={32} height={32} />
              <div>
                <div className={landingStyles.statValue}>18</div>
                <div className={landingStyles.statLabel}>Active Sessions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserSettings;
