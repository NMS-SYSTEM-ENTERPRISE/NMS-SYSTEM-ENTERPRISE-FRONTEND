'use client';
import CloudDetail from '@/components/features/networkmonitoring/detail-dashboards/CloudDetail';
import NetworkDetail from '@/components/features/networkmonitoring/detail-dashboards/NetworkDetail';
import NetworkInterface from '@/components/features/networkmonitoring/detail-dashboards/NetworkInterface';
import ServerDetail from '@/components/features/networkmonitoring/detail-dashboards/ServerDetail';
import styles from './styles.module.css';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  FiArrowLeft,
  FiImage,
  FiLogOut,
  FiMaximize,
  FiRefreshCw,
} from 'react-icons/fi';
import { NETWORK_DETAIL_TABS } from '@/utils/constants/network-monitoring';

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

  const tabs = NETWORK_DETAIL_TABS;

  return (
    <div className={styles.dashboard}>
      {/* Top Header */}
      <div className={styles.dashboardHeader}>
        <div className={styles.titleSection}>
          <button className={styles.iconBtn} onClick={() => router.back()}>
            <FiArrowLeft size={20} />
          </button>
          <div className={styles.deviceInfoContainer}>
            <div className={styles.deviceNameWrapper}>
              <span className={styles.deviceName}>
                {decodedCategory === 'Network'
                  ? 'Cisco Catalyst 9400'
                  : decodedDeviceId}
              </span>
            </div>
            <div className={styles.deviceSubtext}>
              {decodedDeviceId} | Cisco
            </div>
          </div>
        </div>

        <div className={styles.headerRightWrapper}>
          <span className={styles.pollText}>
            Last Poll : 29/01/2020 14:15
          </span>
          <div className={styles.actionsWrapper}>
            <button className={styles.iconBtn}>
              <FiRefreshCw />
            </button>
            <button className={styles.iconBtn}>
              <FiImage />
            </button>
            <button className={styles.iconBtn}>
              <FiMaximize />
            </button>
            <button className={styles.iconBtn}>
              <FiLogOut />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs (Only for Network for now, or generally available) */}
      {decodedCategory === 'Network' && (
        <div className={styles.tabsContainer}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${styles.tabButton} ${activeTab === tab ? styles.tabButtonActive : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <main className={styles.dashboard_content}>{renderDashboard()}</main>
    </div>
  );
};

export default NetworkMonitoringDetail;
