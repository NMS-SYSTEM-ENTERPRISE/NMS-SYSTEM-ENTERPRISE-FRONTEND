'use client';

import { TimelineModal } from '@/components/ui/timeline-modal';
import { SSO_TIMELINE_STEPS } from '@/utils/constants/settings/users/single-sign-on';
import { Icon } from '@iconify/react';
import { useEffect, useState, useCallback } from 'react';
import styles from '../../shared-settings-styles.module.css';

import { SsoProvider } from '@/contexts/settings/user/single-sign-on/sso-context';
import { useSso } from '@/hooks/settings/user/single-sign-on/useSso';
import { SsoForm } from '@/components/features/settings/user/single-sign-on/sso-form';

const SsoContent = () => {
  const { getSsoConfig, updateSsoConfig, resetSsoConfig, isLoading } = useSso();
  const [showTimeline, setShowTimeline] = useState(false);
  const [config, setConfig] = useState(null);

  const fetchConfig = useCallback(async () => {
    const data = await getSsoConfig();
    if (data) {
      setConfig(data);
    }
  }, [getSsoConfig]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const handleSave = async () => {
    if (config) {
      const updated = await updateSsoConfig(config);
      if (updated) {
        setConfig(updated);
      }
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all SSO configurations to their defaults?')) {
      const resetData = await resetSsoConfig();
      if (resetData) {
        setConfig(resetData);
      }
    }
  };

  return (
    <div className={styles.mainContent}>
      <div className={`${styles.contentArea} ${styles.formPageContent}`}>
        <div className={styles.contentHeader}>
          <div>
            <h2 className={styles.pageTitle}>Single Sign-On</h2>
            <p className={styles.pageDescription}>
              Single Sign-On is an authentication process that allows a user
              to access multiple applications with one set of login credentials.
              For more information:{' '}
              <a
                href="#"
                className={styles.linkBlue}
                onClick={(e) => {
                  e.preventDefault();
                  setShowTimeline(true);
                }}
              >
                Single Sign-On{' '}
                <Icon icon="mdi:open-in-new" width={14} height={14} />
              </a>
            </p>
          </div>
        </div>

        {isLoading && !config ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>Loading SSO Configuration...</div>
        ) : config ? (
          <SsoForm
            config={config}
            setConfig={setConfig}
            onSave={handleSave}
            onReset={handleReset}
          />
        ) : (
          <div style={{ padding: '20px', textAlign: 'center' }}>Failed to load SSO configuration.</div>
        )}
      </div>

      <TimelineModal
        isOpen={showTimeline}
        onClose={() => setShowTimeline(false)}
        title="Single Sign-On Setup"
        steps={SSO_TIMELINE_STEPS}
      />
    </div>
  );
};

const SingleSignOn = () => {
  return (
    <SsoProvider>
      <SsoContent />
    </SsoProvider>
  );
};

export default SingleSignOn;
