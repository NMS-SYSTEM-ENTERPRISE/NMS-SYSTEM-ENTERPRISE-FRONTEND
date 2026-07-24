'use client';

import { Button } from '@/components/ui/button';
import { useSla } from '@/hooks/sla';
import { SLA_CATEGORIES, STATUS_CATEGORY_IDS } from '@/utils/constants/sla';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import styles from './styles.module.css';

export const SlaSidebar = () => {
  const router = useRouter();
  const { isSidebarOpen, setIsSidebarOpen, slas, setActiveCategory } = useSla();

  const [expandedGroup, setExpandedGroup] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const groupedSlas = useMemo(() => {
    const groups = {};
    (slas || []).forEach((sla) => {
      const g = sla.group || 'Ungrouped';
      if (!groups[g]) groups[g] = [];
      groups[g].push(sla);
    });
    return groups;
  }, [slas]);

  const getSlaStatus = (percentageStr) => {
    if (!percentageStr) return 'Unknown';
    const val = parseFloat(percentageStr.replace('%', ''));
    if (isNaN(val)) return 'Unknown';
    if (val >= 99) return 'Ok';
    if (val >= 95) return 'Warning';
    return 'Breached';
  };

  const matchesCategory = (sla, catId) => {
    if (catId === 'all') return true;
    return getSlaStatus(sla.sla_percentage) === catId;
  };

  const getGroupIcon = (groupName) => {
    const lower = groupName.toLowerCase();
    if (lower.includes('ups')) return 'mdi:car-battery';
    if (lower.includes('switch')) return 'mdi:switch';
    if (lower.includes('cctv')) return 'mdi:cctv';
    if (lower.includes('server')) return 'mdi:server';
    return 'mdi:server-network';
  };

  const handleDeviceClick = (slaId) => {
    router.push(`/sla/${slaId}`);
  };

  return (
    <aside
      className={`${styles.sidebar} ${!isSidebarOpen ? styles.sidebarCollapsed : ''}`}
    >
      <div className={styles.sidebarHeader}>
        <span
          className={`${styles.sidebarTitle} ${!isSidebarOpen ? styles.hidden : ''}`}
        >
          Categories
        </span>
        <Button
          variant="ghost"
          size="icon"
          className={styles.collapseBtn}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title={isSidebarOpen ? 'Collapse' : 'Expand'}
        >
          <Icon
            icon={isSidebarOpen ? 'mdi:menu-open' : 'mdi:menu'}
            width={20}
          />
        </Button>
      </div>

      <nav className={styles.sidebarNav}>
        {Object.entries(groupedSlas).map(([groupName, groupSlas]) => {
          const isGroupExpanded = expandedGroup === groupName;

          return (
            <div key={groupName} style={{ width: '100%', marginBottom: '8px' }}>
              {/* Level 1: Group Root */}
              <div
                className={styles.treeRoot}
                onClick={() => setExpandedGroup((prev) => (prev === groupName ? null : groupName))}
                style={{
                  cursor: 'pointer',
                  color: isGroupExpanded ? 'var(--color-chart-cyan)' : 'var(--color-text-primary)',
                }}
              >
                <div className={styles.itemIconWrapper}>
                  <Icon
                    icon={getGroupIcon(groupName)}
                    className={styles.rootIcon}
                    style={{
                      color: groupName.toLowerCase().includes('ups')
                        ? '#f97316'
                        : 'var(--color-chart-cyan)',
                    }}
                    width={18}
                  />
                </div>
                <span className={styles.rootLabel}>{groupName.replace(/_/g, ' ').toUpperCase()}</span>
              </div>

              {/* Level 2: Categories */}
              {isGroupExpanded && isSidebarOpen && (
                <div className={styles.treeChildren}>
                  {SLA_CATEGORIES.map((cat) => {
                    const catSlas = groupSlas.filter((sla) => matchesCategory(sla, cat.id));
                    const isCatExpanded = expandedCategory === cat.id;

                    return (
                      <div key={cat.id} style={{ width: '100%' }}>
                        <div
                          className={`${styles.navItem} ${isCatExpanded ? styles.navItemActive : ''}`}
                          onClick={() => {
                            setExpandedCategory((prev) => (prev === cat.id ? null : cat.id));
                            setActiveCategory(cat.id);
                          }}
                          title={!isSidebarOpen ? cat.label : ''}
                        >
                          <div className={styles.treeBranch} />
                          <div className={`${styles.itemIconWrapper} ${styles[`categoryIcon_${cat.colorToken}`]}`}>
                            <Icon icon={cat.icon} width={18} />
                          </div>
                          <span className={styles.navText}>{cat.label}</span>
                          {catSlas.length > 0 && (
                            <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'var(--color-text-muted)' }}>
                              {catSlas.length}
                            </span>
                          )}
                        </div>

                        {/* Level 3: Devices */}
                        {isCatExpanded && catSlas.length > 0 && (
                          <div
                            style={{
                              paddingLeft: '24px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px',
                              marginTop: '4px',
                              marginBottom: '8px',
                            }}
                          >
                            {catSlas.map((sla, idx) => (
                              <div
                                key={sla.device_id || idx}
                                onClick={() => handleDeviceClick(sla.device_id || sla.id)}
                                style={{
                                  padding: '6px 12px',
                                  fontSize: '11px',
                                  color: 'var(--color-text-secondary)',
                                  cursor: 'pointer',
                                  borderRadius: '6px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  transition: 'background 0.2s, color 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                  e.currentTarget.style.color = 'var(--color-text-primary)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                                }}
                              >
                                <Icon icon="mdi:circle-medium" width={14} color={cat.colorToken === 'success' ? 'var(--color-success)' : cat.colorToken === 'danger' ? 'var(--color-danger)' : cat.colorToken === 'warning' ? 'var(--color-warning)' : 'var(--color-chart-cyan)'} />
                                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={sla.ip_address}>
                                  {sla.hostname || sla.ip_address || 'Unknown'}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
