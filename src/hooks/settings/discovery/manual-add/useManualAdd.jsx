import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { allCredentialProfilesApi } from '@/networking/discovery-settings/credential-profile/profile/profile-apis';
import { allDiscoveryGroupsApi, createDiscoveryGroupApi } from '@/networking/discovery-settings/discovery-profile/groups/groups-apis';
import { allDiscoveryTagsApi, createDiscoveryTagApi } from '@/networking/discovery-settings/discovery-profile/tags/tags-apis';
import { createManualDeviceApi, uploadManualDevicesXlsxApi } from '@/networking/discovery-settings/manual-devices/manual-devices-apis';

export const useManualAdd = () => {
  const [activeTab, setActiveTab] = useState('single');
  const [name, setName] = useState('');
  const [discoveryType, setDiscoveryType] = useState('Network Device');
  const [customDiscoveryType, setCustomDiscoveryType] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [selectedCredentials, setSelectedCredentials] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [customGroup, setCustomGroup] = useState('');
  const [customTag, setCustomTag] = useState('');
  
  const [credentialProfiles, setCredentialProfiles] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tags, setTags] = useState([]);
  
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCreds, setIsLoadingCreds] = useState(false);

  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const fetchDependencies = useCallback(async () => {
    try {
      setIsLoadingCreds(true);
      const [credsRes, groupsRes, tagsRes] = await Promise.all([
        allCredentialProfilesApi({ limit: 1000 }),
        allDiscoveryGroupsApi({ limit: 1000 }),
        allDiscoveryTagsApi({ limit: 1000 })
      ]);
      setCredentialProfiles(credsRes.data?.items || []);
      setGroups(groupsRes.data?.items || []);
      setTags(tagsRes.data?.items || []);
    } catch (err) {
      console.error(err);
      showError('Failed to load dependencies');
    } finally {
      setIsLoadingCreds(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchDependencies();
  }, [fetchDependencies]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const submitSingleDevice = async () => {
    if (!ipAddress.trim()) {
      showError('IP Address or Hostname is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      let protocol = "Ping";
      let snmp_community = "";
      let snmp_version = "";
      let ssh_username = "";
      let ssh_password = "";

      // Attempt to grab credentials from the selected credential profiles
      if (selectedCredentials.length > 0) {
        const cred = credentialProfiles.find(c => c.id === selectedCredentials[0]);
        if (cred) {
          protocol = cred.type || "Ping";
          snmp_community = cred.community_string || "";
          snmp_version = cred.type || "";
          ssh_username = cred.username || "";
          ssh_password = cred.password || "";
        }
      }

      let groupName = customGroup.trim();
      if (!groupName && selectedGroups.length > 0) {
         const g = groups.find(g => g.id === selectedGroups[0]);
         if (g) groupName = g.name;
      }

      const finalDiscoveryType = discoveryType === 'Other' ? (customDiscoveryType.trim() || 'Other') : discoveryType;

      const payload = {
        ip_address: ipAddress.trim(),
        device_name: name.trim() || `Manual Add - ${ipAddress}`,
        device_type: finalDiscoveryType,
        device_group: groupName,
        protocol: protocol,
        snmp_community: snmp_community,
        snmp_version: snmp_version,
        ssh_username: ssh_username,
        ssh_password: ssh_password
      };

      await createManualDeviceApi(payload);
      showSuccess('Manual device added and discovery queued successfully.');
      router.push('/settings/discovery/profile'); // Or wherever you want to redirect
    } catch (err) {
      console.error(err);
      showError(err?.detail || 'Failed to add manual device');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitBulkDevices = async () => {
    if (!file) {
      showError('Please upload an XLSX or CSV file');
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('file', file);

      const res = await uploadManualDevicesXlsxApi(formData);
      showSuccess(res.data?.message || 'Bulk manual devices added and discovery queued successfully.');
      router.push('/settings/discovery/profile');
    } catch (err) {
      console.error(err);
      showError(err?.response?.data?.detail || err?.detail || err?.message || 'Failed to upload manual devices');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (activeTab === 'single') {
      submitSingleDevice();
    } else {
      submitBulkDevices();
    }
  };

  return {
    activeTab,
    setActiveTab,
    name,
    setName,
    discoveryType,
    setDiscoveryType,
    customDiscoveryType,
    setCustomDiscoveryType,
    ipAddress,
    setIpAddress,
    selectedCredentials,
    setSelectedCredentials,
    selectedGroups,
    setSelectedGroups,
    selectedTags,
    setSelectedTags,
    customGroup,
    setCustomGroup,
    customTag,
    setCustomTag,
    credentialProfiles,
    groups,
    tags,
    isLoadingCreds,
    file,
    handleFileChange,
    handleSubmit,
    isSubmitting
  };
};
