'use client';
import CCTVDetail from '@/components/features/networkmonitoring/detail-dashboards/CCTVDetail';
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
import { useCallback, useEffect, useState } from 'react';
import { FiArrowLeft, FiDownload, FiMaximize, FiRefreshCw } from 'react-icons/fi';
import * as XLSX from 'xlsx';
import styles from './styles.module.css';

const NetworkMonitoringDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { category, deviceId } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [deviceData, setDeviceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  let decodedCategory = decodeURIComponent(category);
  if (decodedCategory === 'ServerApps') {
    decodedCategory = 'Server & Apps';
  }
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
  const handleTabChange = useCallback(
    (tabName) => {
      setActiveTab(tabName);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(getTabStorageKey(), tabName);
      }
    },
    [getTabStorageKey]
  );

  const fetchDeviceData = async () => {
    try {
      setIsRefreshing(true);
      const data = await getDeviceById(decodedDeviceId);
      setDeviceData(data);
    } catch (err) {
      console.error('Error fetching device details:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
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
    loadInitialData();
  }, [decodedDeviceId]);

  // Export device data to XLSX
  const exportToXLSX = useCallback(async () => {
    if (!deviceData) return;

    try {
      setIsExporting(true);
      const workbook = XLSX.utils.book_new();

      // Sheet 1: Device Summary
      const summaryData = [
        ['Device Information'],
        ['Property', 'Value'],
        [
          'Device Name',
          deviceData?.frontend_data?.identity?.description ||
          deviceData?.device_name ||
          'N/A',
        ],
        ['Device IP', decodedDeviceId],
        [
          'Device Type',
          deviceData?.frontend_data?.system_information?.device_type || 'N/A',
        ],
        [
          'Last Polled',
          formatPollTime(
            deviceData?.last_polled_at ||
            deviceData?.last_updated ||
            deviceData?.timestamp
          ),
        ],
        ['Export Date', new Date().toLocaleString('en-GB')],
        ['Category', decodedCategory],
      ];

      const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
      summarySheet['!cols'] = [{ wch: 25 }, { wch: 40 }];
      XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

      // Sheet 2: Interfaces (if available)
      const interfaces = deviceData?.frontend_data?.interfaces || [];
      if (interfaces.length > 0) {
        const interfaceData = [
          [
            'Interface',
            'Description',
            'Status',
            'IN (%)',
            'OUT (%)',
            'Port Type',
            'Error',
            'Discarded',
            'MAC Address',
            'IP Address',
            'VLAN',
          ],
          ...interfaces.map((iface, idx) => [
            iface.description || `Port ${idx + 1}`,
            iface.description || `Interface ${idx + 1}`,
            iface.status || 'Down',
            parseFloat(iface.in_percent || 0).toFixed(2),
            parseFloat(iface.out_percent || 0).toFixed(2),
            iface.port_type || 'Unknown',
            iface.error || 0,
            iface.discarded || 0,
            iface.mac_address || 'N/A',
            iface.ip_address || 'N/A',
            iface.assigned_vlan || 'Default',
          ]),
        ];

        const interfaceSheet = XLSX.utils.aoa_to_sheet(interfaceData);
        interfaceSheet['!cols'] = [
          { wch: 20 },
          { wch: 25 },
          { wch: 12 },
          { wch: 10 },
          { wch: 10 },
          { wch: 15 },
          { wch: 10 },
          { wch: 12 },
          { wch: 18 },
          { wch: 15 },
          { wch: 12 },
        ];
        XLSX.utils.book_append_sheet(workbook, interfaceSheet, 'Interfaces');
      }

      // Sheet 3: Raw JSON Data
      const jsonData = [
        [
          'Complete Device Data (JSON)',
          JSON.stringify(deviceData, null, 2),
        ],
      ];
      const jsonSheet = XLSX.utils.aoa_to_sheet(jsonData);
      jsonSheet['!cols'] = [{ wch: 30 }, { wch: 80 }];
      XLSX.utils.book_append_sheet(workbook, jsonSheet, 'Raw Data');

      // Generate filename with timestamp
      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, '-')
        .split('T')[0];
      const filename = `Device_Report_${decodedDeviceId}_${timestamp}.xlsx`;

      // Download the file
      XLSX.writeFile(workbook, filename);
    } catch (error) {
      console.error('Error exporting to XLSX:', error);
    } finally {
      setIsExporting(false);
    }
  }, [deviceData, decodedDeviceId, decodedCategory]);

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
      case 'CCTV':
        return <CCTVDetail data={deviceData} />;
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
                {deviceData?.device_name ||
                  deviceData?.frontend_data?.identity?.name ||
                  (deviceData?.frontend_data?.identity?.description !== 'none'
                    ? deviceData?.frontend_data?.identity?.description?.substring(0, 30)
                    : null) ||
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
              disabled={isRefreshing}
              title="Refresh Data"
              style={{
                opacity: isRefreshing ? 0.6 : 1,
              }}
            >
              <FiRefreshCw
                size={20}
                style={{
                  animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                  transition: 'transform 0.3s ease',
                }}
              />
            </button>
            <button
              className={styles.iconBtn}
              onClick={exportToXLSX}
              disabled={isExporting || !deviceData}
              title="Download Report (XLSX)"
              style={{
                opacity: isExporting || !deviceData ? 0.6 : 1,
              }}
            >
              <FiDownload size={20} />
            </button>
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
