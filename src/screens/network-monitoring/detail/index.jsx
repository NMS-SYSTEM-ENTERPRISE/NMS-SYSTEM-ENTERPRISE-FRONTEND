'use client';
import CloudDetail from '@/components/features/networkmonitoring/detail-dashboards/CloudDetail';
import NetworkDetail from '@/components/features/networkmonitoring/detail-dashboards/NetworkDetail';
import NetworkInterface from '@/components/features/networkmonitoring/detail-dashboards/NetworkInterface';
import ServerDetail from '@/components/features/networkmonitoring/detail-dashboards/ServerDetail';
import UPSDetail from '@/components/features/networkmonitoring/detail-dashboards/UPSDetail';
import styles from './styles.module.css';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  FiArrowLeft,
  FiImage,
  FiLogOut,
  FiMaximize,
  FiRefreshCw,
} from 'react-icons/fi';
import { NETWORK_DETAIL_TABS } from '@/utils/constants/network-monitoring';
import { getDeviceById } from '@/networking/network-monitoring/network-monitoring-apis';

const NetworkMonitoringDetail = () => {
  const router = useRouter();
  const { category, deviceId } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [deviceData, setDeviceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const decodedCategory = decodeURIComponent(category);
  const decodedDeviceId = decodeURIComponent(deviceId); // Now the IP address

  const fetchDeviceData = async () => {
    try {
      setIsLoading(true);
      const data = await getDeviceById(decodedDeviceId);
      setDeviceData(data);
    } catch (err) {
      console.error("Error fetching device details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDeviceData();
  }, [decodedDeviceId]);

  const renderDashboard = () => {
    if (isLoading) {
       return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--color-text-secondary)' }}>Loading telemetry...</div>;
    }
    switch (decodedCategory) {
      case 'Server & Apps':
        return <ServerDetail data={deviceData} />;
      case 'Network':
        if (activeTab === 'Interface') {
          return <NetworkInterface data={deviceData} />;
        }
        return <NetworkDetail data={deviceData} />;
      case 'Cloud':
        return <CloudDetail data={deviceData} />;
      case 'UPS':
        return <UPSDetail data={deviceData} />;
      default:
        return <ServerDetail data={deviceData} />;
    }
  };

  const tabs = NETWORK_DETAIL_TABS;
  
  // Format the last updated time safely
  const formatPollTime = (dateString) => {
    if (!dateString) return new Date().toLocaleString('en-GB');
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return new Date().toLocaleString('en-GB');
    return d.toLocaleString('en-GB', { 
      day: '2-digit', month: '2-digit', year: 'numeric', 
      hour: '2-digit', minute: '2-digit', second: '2-digit' 
    }).replace(' ', ', ');
  };
  
  const lastPollTime = formatPollTime(deviceData?.last_polled_at || deviceData?.last_updated || deviceData?.timestamp);

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
                {deviceData?.frontend_data?.identity?.description?.substring(0, 30) || deviceData?.device_name || decodedDeviceId}
              </span>
            </div>
            <div className={styles.deviceSubtext}>
              {decodedDeviceId} | {deviceData?.frontend_data?.system_information?.device_type || 'Device'}
            </div>
          </div>
        </div>

        <div className={styles.headerRightWrapper}>
          <span className={styles.pollText}>
            Last Poll : {lastPollTime}
          </span>
          <div className={styles.actionsWrapper}>
            <button className={styles.iconBtn} onClick={fetchDeviceData} title="Refresh">
              <FiRefreshCw />
            </button>
            <button className={styles.iconBtn} onClick={async () => {
              try {
                const { default: html2canvas } = await import('html2canvas');
                const element = document.getElementById('rack-view-export');
                if (!element) return;
                const canvas = await html2canvas(element, { backgroundColor: '#111827' });
                const link = document.createElement('a');
                link.download = `rack-ports-${decodedDeviceId}.png`;
                link.href = canvas.toDataURL();
                link.click();
              } catch (e) {
                console.error(e);
              }
            }} title="Export Diagram">
              <FiImage />
            </button>
            <button className={styles.iconBtn} onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(console.error);
              } else {
                document.exitFullscreen();
              }
            }} title="Fullscreen">
              <FiMaximize />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
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
