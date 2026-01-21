"use client";
import CloudDetail from '@/components/features/networkmonitoring/detail-dashboards/CloudDetail';
import NetworkDetail from '@/components/features/networkmonitoring/detail-dashboards/NetworkDetail';
import NetworkInterface from '@/components/features/networkmonitoring/detail-dashboards/NetworkInterface';
import ServerDetail from '@/components/features/networkmonitoring/detail-dashboards/ServerDetail';
import styles from '@/screens/network-monitoring/detail.module.css';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiArrowLeft, FiImage, FiLogOut, FiMaximize, FiPlus, FiRefreshCw } from 'react-icons/fi';

const NetworkMonitoringDetail = () => {
  const router = useRouter();
  const { category, deviceId } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');

  const decodedCategory = decodeURIComponent(category);
  const decodedDeviceId = decodeURIComponent(deviceId);

  const renderDashboard = () => {
    switch (decodedCategory) {
      case 'Server & Apps':
        return <ServerDetail />;
      case 'Network':
        if (activeTab === 'Interface') {
          return <NetworkInterface />;
        }
        return <NetworkDetail />;
      case 'Cloud':
        return <CloudDetail />;
      default:
        return <ServerDetail />;
    }
  };

  const tabs = ['Overview', 'Interface', 'Metric Explorer', 'Configured Policies', 'Active Policies'];

  return (
    <div className={styles.dashboard}>
      {/* Top Header */}
      <div className={styles.dashboardHeader}>
        <div className={styles.titleSection}>
          <button className={styles.iconBtn} onClick={() => router.back()}>
            <FiArrowLeft size={20} />
          </button>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#0ea5e9', fontSize: '18px' }}>
                {decodedCategory === 'Network' ? 'Cisco Catalyst 9400' : decodedDeviceId}
              </span>
            </div>
            <div style={{ fontSize: '12px', color: '#0ea5e9' }}>
              {decodedDeviceId} | Cisco
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>Last Poll : 29/01/2020 14:15</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className={styles.iconBtn}><FiRefreshCw /></button>
            <button className={styles.iconBtn}><FiImage /></button>
            <button className={styles.iconBtn}><FiMaximize /></button>
            <button className={styles.iconBtn}><FiLogOut /></button>
          </div>
        </div>
      </div>

      {/* Tabs (Only for Network for now, or generally available) */}
      {decodedCategory === 'Network' && (
        <div style={{ 
          display: 'flex', 
          gap: '24px', 
          padding: '0 16px', 
          borderBottom: '1px solid #374151',
          background: '#1f2937'
        }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 0',
                color: activeTab === tab ? '#0ea5e9' : '#9ca3af',
                borderBottom: activeTab === tab ? '2px solid #0ea5e9' : '2px solid transparent',
                cursor: 'pointer',
                fontWeight: activeTab === tab ? '600' : '400',
                fontSize: '14px'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <main className={styles.dashboard_content}>
        {renderDashboard()}
      </main>

      {/* Add Widget Button */}
      <button
        className={styles.addWidgetBtn}
        onClick={() => router.push('/dashboard/custom')}
        title="Create Custom Dashboard"
      >
        <FiPlus size={24} />
      </button>
    </div>
  );
};

export default NetworkMonitoringDetail;
