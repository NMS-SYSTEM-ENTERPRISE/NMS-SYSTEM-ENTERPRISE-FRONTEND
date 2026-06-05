'use client';

import { useMemo } from 'react';
import { Icon } from '@iconify/react';
import { Pagination } from '@/components/ui/pagination';
import sharedStyles from '@/components/features/reports/shared/styles.module.css';
import { useReports } from '@/hooks/reports';
import { ReportsTableRow } from './reports-table-row';
import { ReportsTableSkeleton } from '@/components/ui/skeleton-loaders/reports-skeleton';
import { NoDataFound } from '@/components/ui/no-data-found';

const COMPLIANCE_STANDARDS = [
  {
    id: 'PCI-DSS',
    name: 'Payment Card Industry Data Security Standard',
    desc: 'ObserveOps secures credit card transaction portals, log storage environments, and verifies restriction controls on cardholder data.',
    reportsCount: 79,
    categoriesCount: 6,
    icon: 'mdi:credit-card-outline',
    color: '#06b6d4',
  },
  {
    id: 'HIPAA',
    name: 'Health Insurance Portability and Accountability Act',
    desc: 'Ensures transmission security logs, integrity controls, and detailed audit trials for electronic protected health information (ePHI).',
    reportsCount: 236,
    categoriesCount: 8,
    icon: 'mdi:medical-bag',
    color: '#3b82f6',
  },
  {
    id: 'GDPR',
    name: 'General Data Protection Regulation',
    desc: 'Provides granular logs auditing user consent, access requests, and state-of-the-art encryption logs for EU personal data protection.',
    reportsCount: 208,
    categoriesCount: 7,
    icon: 'mdi:shield-account-outline',
    color: '#10b981',
  },
  {
    id: 'SOX',
    name: 'Sarbanes-Oxley Act of 2002',
    desc: 'Track user access controls, modifications of internal accounting records, and administrative actions for strict financial auditing.',
    reportsCount: 38,
    categoriesCount: 4,
    icon: 'mdi:finance',
    color: '#f59e0b',
  },
  {
    id: 'ISO',
    name: 'ISO 27001:2022',
    desc: 'Align logging and monitoring operations to the latest ISO security control standards, tracking authorization and audit events.',
    reportsCount: 135,
    categoriesCount: 9,
    icon: 'mdi:certificate-outline',
    color: '#8b5cf6',
  },
];

export const ReportsTable = () => {
  const { 
    filteredReports, 
    currentPage, 
    setCurrentPage, 
    pageSize, 
    setPageSize, 
    loading, 
    error,
    activeTab,
    selectedComplianceStandard,
    setSelectedComplianceStandard,
  } = useReports();

  const isComplianceTab = activeTab === 'Log Compliance';

  const complianceColHeader = useMemo(() => {
    if (!isComplianceTab) return null;
    if (selectedComplianceStandard === 'PCI-DSS') return 'REQUIREMENT';
    if (selectedComplianceStandard === 'HIPAA') return 'ACT';
    if (selectedComplianceStandard === 'GDPR') return 'ARTICLE';
    if (selectedComplianceStandard === 'SOX') return 'SOX SECTION';
    if (selectedComplianceStandard === 'ISO') return 'CONTROL';
    return 'REFERENCE';
  }, [isComplianceTab, selectedComplianceStandard]);

  const emptyTitle = useMemo(() => {
    if (activeTab === 'Trap') return 'No records available';
    if (activeTab === 'Audit') return 'No records available';
    if (activeTab === 'RUM') return 'No records available';
    if (activeTab === 'NetRoute') return 'No records available';
    return 'No Reports Found';
  }, [activeTab]);

  const emptyDesc = useMemo(() => {
    if (activeTab === 'Trap') return 'No trap reports have been configured yet.';
    if (activeTab === 'Audit') return 'No audit reports have been configured yet.';
    if (activeTab === 'RUM') return 'No RUM reports have been configured yet.';
    if (activeTab === 'NetRoute') return 'No NetRoute reports have been configured yet.';
    return error ? 'Unable to load reports from the database.' : 'No reports match your current filters or search query.';
  }, [activeTab, error]);

  if (loading) {
    return (
      <div className={sharedStyles.tableContainer}>
        <ReportsTableSkeleton />
      </div>
    );
  }

  // Render compliance tiles grid if on Log Compliance tab and no standard is selected
  if (isComplianceTab && !selectedComplianceStandard) {
    return (
      <div className={sharedStyles.tableContainer} style={{ overflowY: 'auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          width: '100%',
          padding: '24px'
        }}>
          {COMPLIANCE_STANDARDS.map((standard) => (
            <div
              key={standard.id}
              onClick={() => setSelectedComplianceStandard(standard.id)}
              style={{
                background: 'rgba(18, 22, 33, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = standard.color;
                e.currentTarget.style.boxShadow = `0 8px 30px rgba(0, 0, 0, 0.4), 0 0 15px ${standard.color}1e`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '12px', 
                    background: `${standard.color}15`, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: `1px solid ${standard.color}33`,
                    color: standard.color
                  }}>
                    <Icon icon={standard.icon} width={24} height={24} />
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--color-text-muted)',
                    fontFamily: 'var(--font-geist-mono), monospace',
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    {standard.id}
                  </span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                  {standard.name}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: '1.5', marginBottom: '24px' }}>
                  {standard.desc}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Reports</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-geist-mono), monospace', marginTop: '4px' }}>
                    {standard.reportsCount}
                  </div>
                </div>
                <div style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.05)', paddingLeft: '16px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Categories</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-geist-mono), monospace', marginTop: '4px' }}>
                    {standard.categoriesCount}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || filteredReports.length === 0) {
    return (
      <div className={sharedStyles.tableContainer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <NoDataFound 
          title={emptyTitle} 
          description={emptyDesc}
          icon="mdi:file-document-remove-outline"
        />
      </div>
    );
  }

  return (
    <div className={sharedStyles.tableContainer}>
      <div className={sharedStyles.table}>
        <div 
          className={sharedStyles.tableHeaderRow}
          style={isComplianceTab ? { gridTemplateColumns: '40px 2fr 2fr 1.2fr 1fr 0.8fr 60px' } : undefined}
        >
          <span />
          <span>NAME</span>
          <span>DESCRIPTION</span>
          {isComplianceTab ? (
            <span>{complianceColHeader}</span>
          ) : (
            <span>TYPE</span>
          )}
          <span>REPORT TYPE</span>
          <span>DOWNLOAD</span>
          <span />
        </div>

        <div className={sharedStyles.tableBody}>
          {filteredReports.map((report) => (
            <ReportsTableRow key={report.id} report={report} />
          ))}
        </div>

        <div className={sharedStyles.pagination}>
          <Pagination
            className={sharedStyles.paginationComponent}
            currentPage={currentPage}
            totalItems={filteredReports.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>
    </div>
  );
};
