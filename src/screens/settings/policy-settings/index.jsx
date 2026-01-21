"use client";
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import landingStyles from '../settings-landing.module.css';
import styles from '../shared-settings-styles.module.css';
const PolicySettings = () => {
  const router = useRouter();
  const policyCards = [
    {
      icon: 'mdi:shield-check',
      title: 'Compliance Policy',
      description: 'Define and manage compliance policies for your infrastructure',
      path: '/settings/compliance/policy',
      color: '#00AEEF',
    },
    {
      icon: 'mdi:clipboard-check',
      title: 'Benchmark',
      description: 'Set up compliance benchmarks and standards (CIS, PCI-DSS, HIPAA)',
      path: '/settings/compliance/benchmark',
      color: '#4CAF50',
    },
    {
      icon: 'mdi:file-document-check',
      title: 'Compliance Rules',
      description: 'Create custom compliance rules and validation criteria',
      path: '/settings/compliance/rules',
      color: '#FF9800',
    },
  ];
  const recentPolicies = [
    { name: 'CIS Benchmark v1.2', status: 'Active', compliance: 92, lastRun: '2 hours ago' },
    { name: 'PCI-DSS Compliance', status: 'Active', compliance: 87, lastRun: '5 hours ago' },
    { name: 'HIPAA Security Rule', status: 'Active', compliance: 95, lastRun: '1 day ago' },
  ];
  return (
    <>
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <div className={landingStyles.landingHeader}>
            <div className={landingStyles.landingHeaderIcon}>
              <Icon icon="mdi:shield" width={48} height={48} />
            </div>
            <div>
              <h2 className={landingStyles.landingTitle}>Policy Settings</h2>
              <p className={landingStyles.landingDescription}>
                Manage compliance policies, benchmarks, and rules for your organization
              </p>
            </div>
          </div>
          <div className={landingStyles.cardsGrid}>
            {policyCards.map((card, index) => (
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
          {/* Recent Policies Section */}
          <div style={{marginTop: 'var(--margin-2xl)'}}>
            <h3 style={{fontSize: 'var(--font-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-chart-cyan)', marginBottom: 'var(--margin-lg)'}}>
              Recent Policy Scans
            </h3>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>POLICY NAME</th>
                    <th>STATUS</th>
                    <th>COMPLIANCE</th>
                    <th>LAST RUN</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPolicies.map((policy, index) => (
                    <tr key={index}>
                      <td>
                        <a href="#" className={styles.linkBlue}>{policy.name}</a>
                      </td>
                      <td>
                        <span className={styles.badgeSuccess}>{policy.status}</span>
                      </td>
                      <td>
                        <div style={{display: 'flex', alignItems: 'center', gap: 'var(--gap-sm)'}}>
                          <div style={{flex: 1, height: '8px', backgroundColor: 'var(--color-bg-tertiary)', borderRadius: '4px', overflow: 'hidden'}}>
                            <div style={{width: `${policy.compliance}%`, height: '100%', backgroundColor: policy.compliance >= 90 ? 'var(--color-success)' : policy.compliance >= 70 ? 'var(--color-warning)' : 'var(--color-danger)'}}></div>
                          </div>
                          <span style={{fontWeight: 'var(--font-weight-semibold)', color: policy.compliance >= 90 ? 'var(--color-success)' : policy.compliance >= 70 ? 'var(--color-warning)' : 'var(--color-danger)'}}>{policy.compliance}%</span>
                        </div>
                      </td>
                      <td>{policy.lastRun}</td>
                      <td>
                        <div className={styles.actions}>
                          <button className={styles.actionBtn} title="View Report">
                            <Icon icon="mdi:file-document" width={18} height={18} />
                          </button>
                          <button className={styles.actionBtn} title="Run Now">
                            <Icon icon="mdi:play" width={18} height={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className={landingStyles.statsSection} style={{marginTop: 'var(--margin-2xl)'}}>
            <div className={landingStyles.statCard}>
              <Icon icon="mdi:shield-check" width={32} height={32} />
              <div>
                <div className={landingStyles.statValue}>12</div>
                <div className={landingStyles.statLabel}>Active Policies</div>
              </div>
            </div>
            <div className={landingStyles.statCard}>
              <Icon icon="mdi:clipboard-check" width={32} height={32} />
              <div>
                <div className={landingStyles.statValue}>8</div>
                <div className={landingStyles.statLabel}>Benchmarks</div>
              </div>
            </div>
            <div className={landingStyles.statCard}>
              <Icon icon="mdi:alert-circle" width={32} height={32} />
              <div>
                <div className={landingStyles.statValue}>3</div>
                <div className={landingStyles.statLabel}>Non-Compliant</div>
              </div>
            </div>
            <div className={landingStyles.statCard}>
              <Icon icon="mdi:chart-line" width={32} height={32} />
              <div>
                <div className={landingStyles.statValue}>91%</div>
                <div className={landingStyles.statLabel}>Avg Compliance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PolicySettings;
