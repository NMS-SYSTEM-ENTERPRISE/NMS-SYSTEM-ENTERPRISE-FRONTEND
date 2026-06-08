import { authApi } from '@/services/axios';

const BASE_URL = '/dashboard/infrastructure-summary';

/**
 * Get infrastructure summary with device statistics and threshold activities
 * @returns {Promise} Summary data with total, online, offline devices and activities
 */
export const getInfrastructureSummary = async () => {
  try {
    const response = await authApi.get(BASE_URL);
    return mapInfrastructureSummaryResponse(response.data);
  } catch (error) {
    console.error('Failed to fetch infrastructure summary:', error);
    // Return default/fallback data
    return getDefaultInfrastructureSummary();
  }
};

/**
 * Map infrastructure summary API response to component format
 */
export const mapInfrastructureSummaryResponse = (data) => {
  try {
    return {
      devices: {
        total: data?.devices?.total ?? 0,
        online: data?.devices?.online ?? 0,
        offline: data?.devices?.offline ?? 0,
        list: data?.devices?.list ?? [],
      },
      activities: {
        majorThreshold: (data?.activities?.major_threshold ?? []).map(
          (item) => ({
            name: item.name || 'Unknown Device',
            status: item.status || 'offline',
            offlineTime: item.offline_time || item.offlineTime || 'N/A',
            lastSeen: item.last_seen || item.lastSeen || 'N/A',
            severity: item.severity || 'medium',
          })
        ),
      },
      lastUpdated: data?.last_updated || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error mapping infrastructure summary:', error);
    return getDefaultInfrastructureSummary();
  }
};

/**
 * Default/fallback infrastructure summary data
 */
export const getDefaultInfrastructureSummary = () => ({
  devices: {
    total: 0,
    online: 0,
    offline: 0,
    list: [],
  },
  activities: {
    majorThreshold: [],
  },
  lastUpdated: new Date().toISOString(),
  isDefault: true,
});
