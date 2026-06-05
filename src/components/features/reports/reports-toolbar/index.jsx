'use client';

import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import sharedStyles from '@/components/features/reports/shared/styles.module.css';
import { useReports } from '@/hooks/reports';

export const ReportsToolbar = () => {
  const router = useRouter();
  const { 
    filteredReports, 
    setShowFilterSidebar,
    activeTab,
    selectedComplianceStandard,
    setSelectedComplianceStandard,
    complianceRefFilter,
    setComplianceRefFilter,
    reports
  } = useReports();

  const referenceLabel = useMemo(() => {
    if (selectedComplianceStandard === 'PCI-DSS') return 'Requirement';
    if (selectedComplianceStandard === 'HIPAA') return 'Act';
    if (selectedComplianceStandard === 'GDPR') return 'Article';
    if (selectedComplianceStandard === 'SOX') return 'SOX Section';
    if (selectedComplianceStandard === 'ISO') return 'Control';
    return 'Reference';
  }, [selectedComplianceStandard]);

  const uniqueComplianceRefs = useMemo(() => {
    if (activeTab !== 'Log Compliance' || !selectedComplianceStandard) return [];
    const refs = reports
      .filter(r => r.complianceStandard === selectedComplianceStandard && r.complianceRef)
      .map(r => r.complianceRef);
    return Array.from(new Set(refs));
  }, [reports, activeTab, selectedComplianceStandard]);

  return (
    <div className={sharedStyles.toolbar}>
      <div className={sharedStyles.toolbarLeft}>
        {activeTab === 'Log Compliance' && selectedComplianceStandard ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={() => setSelectedComplianceStandard(null)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--color-accent-cyan)', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px', 
                fontSize: '12px', 
                fontWeight: 'bold',
                padding: 0
              }}
            >
              <Icon icon="mdi:chevron-left" width={16} height={16} /> Log Compliance
            </button>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '12px' }}>/</span>
            <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>{selectedComplianceStandard}</span>
          </div>
        ) : (
          <span className={sharedStyles.resultCount}>
            Showing {filteredReports.length} report
            {filteredReports.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      <div className={sharedStyles.toolbarRight}>
        {activeTab === 'Log Compliance' && selectedComplianceStandard && uniqueComplianceRefs.length > 0 && (
          <select
            value={complianceRefFilter}
            onChange={(e) => setComplianceRefFilter(e.target.value)}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              color: 'var(--color-text-secondary)',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              outline: 'none',
              cursor: 'pointer',
              marginRight: '8px'
            }}
          >
            <option value="" style={{ background: '#0b0f19' }}>All {referenceLabel}s</option>
            {uniqueComplianceRefs.map(ref => (
              <option key={ref} value={ref} style={{ background: '#0b0f19' }}>{ref}</option>
            ))}
          </select>
        )}

        <Button
          className={sharedStyles.createBtn}
          onClick={() => router.push('/reports/create-custom')}
        >
          Create Custom Report
        </Button>
      </div>
    </div>
  );
};
