'use client';
import CloudDetail from '@/components/features/networkmonitoring/detail-dashboards/CloudDetail';
import NetworkDetail from '@/components/features/networkmonitoring/detail-dashboards/NetworkDetail';
import NetworkInterface from '@/components/features/networkmonitoring/detail-dashboards/NetworkInterface';
import ServerDetail from '@/components/features/networkmonitoring/detail-dashboards/ServerDetail';
import UPSDetail from '@/components/features/networkmonitoring/detail-dashboards/UPSDetail';
import { NoDataFound } from '@/components/ui/no-data-found';
import { NetworkMonitoringSkeleton } from '@/components/ui/skeleton-loaders/network-monitoring-skeleton';
import { getDeviceById } from '@/networking/network-monitoring/network-monitoring-apis';
import { NETWORK_DETAIL_TABS } from '@/utils/constants/network-monitoring';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { FiArrowLeft, FiMaximize, FiRefreshCw } from 'react-icons/fi';
import styles from './styles.module.css';

const NetworkMonitoringDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { category, deviceId } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [deviceData, setDeviceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const decodedCategory = decodeURIComponent(category);
  const decodedDeviceId = decodeURIComponent(deviceId); // Now the IP address

  // Generate storage key for tab persistence
  const getTabStorageKey = useCallback(() => {
    return `nms-active-tab-${decodedCategory}`;
  }, [decodedCategory]);

  // Initialize activeTab from sessionStorage or URL params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if there's a tab in URL params
      const tabFromUrl = searchParams.get('tab');
      if (tabFromUrl) {
        setActiveTab(tabFromUrl);
        // Store to sessionStorage
        sessionStorage.setItem(getTabStorageKey(), tabFromUrl);
      } else {
        // Check sessionStorage for previously selected tab
        const savedTab = sessionStorage.getItem(getTabStorageKey());
        if (savedTab) {
          setActiveTab(savedTab);
        } else {
          // Default tab based on category
          if (decodedCategory === 'Network') {
            setActiveTab('Overview');
          } else {
            setActiveTab('Overview');
          }
        }
      }
    }
  }, [decodedCategory, searchParams, getTabStorageKey]);

  // Persist tab change to sessionStorage
  const handleTabChange = useCallback((tabName) => {
    setActiveTab(tabName);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(getTabStorageKey(), tabName);
    }
  }, [getTabStorageKey]);

  const fetchDeviceData = async () => {
    try {
      setIsLoading(true);
      const data = await getDeviceById(decodedDeviceId);
      setDeviceData(data);
    } catch (err) {
      console.error('Error fetching device details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDeviceData();
  }, [decodedDeviceId]);

  const renderDashboard = () => {
    if (isLoading) {
      return <NetworkMonitoringSkeleton />;
    }

    if (!deviceData || Object.keys(deviceData).length === 0) {
      return (
        <NoDataFound
          title="No Device Data Found"
          description={`Unable to retrieve telemetry data for the device at ${decodedDeviceId}.`}
          icon="lucide:server-crash"
        />
      );
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
    return d
      .toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      .replace(' ', ', ');
  };

  const lastPollTime = formatPollTime(
    deviceData?.last_polled_at ||
      deviceData?.last_updated ||
      deviceData?.timestamp
  );

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
                {deviceData?.frontend_data?.identity?.description?.substring(
                  0,
                  30
                ) ||
                  deviceData?.device_name ||
                  decodedDeviceId}
              </span>
            </div>
            <div className={styles.deviceSubtext}>
              {decodedDeviceId} |{' '}
              {deviceData?.frontend_data?.system_information?.device_type ||
                'Device'}
            </div>
          </div>
        </div>

        <div className={styles.headerRightWrapper}>
          <span className={styles.pollText}>Last Poll : {lastPollTime}</span>
          <div className={styles.actionsWrapper}>
            <button
              className={styles.iconBtn}
              onClick={fetchDeviceData}
              title="Refresh"
            >
              <FiRefreshCw />
            </button>
            {/* <button
              className={styles.iconBtn}
              onClick={async () => {
                try {
                  const { default: html2canvas } = await import('html2canvas');
                  const element = document.getElementById('rack-view-export');
                  if (!element) return;
                  const canvas = await html2canvas(element, {
                    backgroundColor: '#111827',
                  });
                  const link = document.createElement('a');
                  link.download = `rack-ports-${decodedDeviceId}.png`;
                  link.href = canvas.toDataURL();
                  link.click();
                } catch (e) {
                  console.error(e);
                }
              }}
              title="Export Diagram"
            >
              <FiImage />
            </button> */}
            <button
              className={styles.iconBtn}
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement
                    .requestFullscreen()
                    .catch(console.error);
                } else {
                  document.exitFullscreen();
                }
              }}
              title="Fullscreen"
            >
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
              onClick={() => handleTabChange(tab)}
              className={`${styles.tabButton} ${activeTab === tab ? styles.tabButtonActive : ''}`}
              title={`View ${tab} details`}
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
