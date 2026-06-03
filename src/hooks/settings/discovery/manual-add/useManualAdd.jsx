import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/useToast';
import { allCredentialProfilesApi } from '@/networking/discovery-settings/credential-profile/profile/profile-apis';
import { allDiscoveryGroupsApi, createDiscoveryGroupApi } from '@/networking/discovery-settings/discovery-profile/groups/groups-apis';
import { allDiscoveryTagsApi, createDiscoveryTagApi } from '@/networking/discovery-settings/discovery-profile/tags/tags-apis';
import { createDiscoveryProfileApi, reDiscoverProfileApi, uploadCsvApi } from '@/networking/discovery-settings/discovery-profile/profile/profile-apis';
import * as XLSX from 'xlsx';

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

  const processFileToCsv = async (inputFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const csvStr = XLSX.utils.sheet_to_csv(firstSheet);
          
          const blob = new Blob([csvStr], { type: 'text/csv' });
          const file = new File([blob], 'upload.csv', { type: 'text/csv' });
          resolve(file);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(inputFile);
    });
  };

  const createCustomDependencies = async () => {
    const newGroups = [...selectedGroups];
    const newTags = [...selectedTags];

    if (customGroup.trim()) {
      try {
        const res = await createDiscoveryGroupApi({ name: customGroup.trim() });
        if (res.data?.id) newGroups.push(res.data.id);
      } catch (err) {
        console.error("Failed to create custom group:", err);
      }
    }

    if (customTag.trim()) {
      try {
        const res = await createDiscoveryTagApi({ name: customTag.trim() });
        if (res.data?.id) newTags.push(res.data.id);
      } catch (err) {
        console.error("Failed to create custom tag:", err);
      }
    }

    return { finalGroups: newGroups, finalTags: newTags };
  };

  const submitSingleDevice = async () => {
    if (!ipAddress.trim()) {
      showError('IP Address or Hostname is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const { finalGroups, finalTags } = await createCustomDependencies();
      const finalDiscoveryType = discoveryType === 'Other' ? (customDiscoveryType.trim() || 'Other') : discoveryType;

      const payload = {
        name: name.trim() || `Manual Add - ${ipAddress}`,
        description: 'Manually added device',
        discovery_type: finalDiscoveryType,
        target_input_method: 'Single IP',
        ip_address_or_hostname: ipAddress,
        credential_ids: selectedCredentials,
        group_ids: finalGroups,
        tag_ids: finalTags,
      };

      const res = await createDiscoveryProfileApi(payload);
      if (res.data?.id) {
        await reDiscoverProfileApi(res.data.id);
        showSuccess('Device discovery started successfully. Please check Discovery Profiles for progress.');
        router.push('/settings/discovery/profile');
      }
    } catch (err) {
      console.error(err);
      showError(err?.detail || 'Failed to start device discovery');
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
      let uploadFile = file;
      
      // Convert to CSV if it's XLSX
      if (file.name.endsWith('.xlsx')) {
        uploadFile = await processFileToCsv(file);
      }

      const formData = new FormData();
      formData.append('file', uploadFile);

      const uploadRes = await uploadCsvApi(formData);
      const csvPath = uploadRes.data?.csv_file_path;

      if (!csvPath) throw new Error('Failed to upload file to backend');

      const { finalGroups, finalTags } = await createCustomDependencies();
      const finalDiscoveryType = discoveryType === 'Other' ? (customDiscoveryType.trim() || 'Other') : discoveryType;

      const payload = {
        name: name.trim() || `Manual Upload - ${file.name}`,
        description: 'Bulk added devices via upload',
        discovery_type: finalDiscoveryType,
        target_input_method: 'CSV',
        csv_file_path: csvPath,
        credential_ids: selectedCredentials,
        group_ids: finalGroups,
        tag_ids: finalTags,
      };

      const res = await createDiscoveryProfileApi(payload);
      if (res.data?.id) {
        await reDiscoverProfileApi(res.data.id);
        showSuccess('Bulk device discovery started successfully. Please check Discovery Profiles for progress.');
        router.push('/settings/discovery/profile');
      }
    } catch (err) {
      console.error(err);
      showError(err?.detail || err?.message || 'Failed to start bulk discovery');
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
