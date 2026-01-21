'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './styles.module.css';

const AgentConfig = () => {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [deploymentType, setDeploymentType] = useState('Host/VM');
  const [serviceName, setServiceName] = useState('');
  const [applicationPath, setApplicationPath] = useState(
    '/home/user/app/application.jar'
  );
  const [showSuccess, setShowSuccess] = useState(false);

  const languages = [
    { value: 'java', label: 'Java', icon: 'mdi:language-java' },
    { value: 'dotnet', label: '.NET', icon: 'mdi:dot-net' },
    { value: 'php', label: 'PHP', icon: 'mdi:language-php' },
    { value: 'nodejs', label: 'Node.js', icon: 'mdi:nodejs' },
  ];

  const handleApplyConfiguration = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getInstrumentationCommand = () => {
    if (selectedLanguage === 'java') {
      return `java -javaagent:/snr-edatas/snr-edatas/instrumentation/agents/java/snr-edatas-javaagent.jar \\
-Datel.javaagent.configuration-file=/snr-edatas/snr-edatas/config/Java_Demo.properties \\
-jar ${applicationPath}`;
    }
    return 'Configuration command for ' + selectedLanguage;
  };

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(getInstrumentationCommand());
  };

  return (
    <div className={styles.agentConfig}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button
            className={styles.backBtn}
            onClick={() => router.push('/apm')}
          >
            <Icon icon="mdi:chevron-left" width={20} height={20} />
          </button>
          <div className={styles.configIcon}>
            <Icon icon="mdi:cog" width={24} height={24} />
          </div>
          <h1 className={styles.title}>Agent Configuration - aiops1350</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.tabActive}`}>Metric</button>
        <button className={styles.tab}>Log</button>
        <button className={styles.tab}>Trace</button>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* APM Agent Status */}
        <div className={styles.statusSection}>
          <div className={styles.statusLabel}>APM Agent Status</div>
          <div className={styles.statusBadge}>
            <div className={styles.statusDot} />
            <span>ON</span>
          </div>
        </div>

        {/* New Service Setup */}
        <div className={styles.setupSection}>
          <h2 className={styles.sectionTitle}>New Service Setup</h2>

          {/* Language Selection */}
          <div className={styles.formGroup}>
            <label>Choose Your Language</label>
            <div className={styles.languageGrid}>
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  className={`${styles.languageBtn} ${
                    selectedLanguage === lang.value
                      ? styles.languageBtnActive
                      : ''
                  }`}
                  onClick={() => setSelectedLanguage(lang.value)}
                >
                  <Icon icon={lang.icon} width={24} height={24} />
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Deployment Type */}
          <div className={styles.formGroup}>
            <label>
              Deployment Type <span className={styles.required}>*</span>
            </label>
            <div className={styles.deploymentTypes}>
              <button
                className={`${styles.deploymentBtn} ${
                  deploymentType === 'Host/VM' ? styles.deploymentBtnActive : ''
                }`}
                onClick={() => setDeploymentType('Host/VM')}
              >
                Host/VM
              </button>
              <button
                className={`${styles.deploymentBtn} ${
                  deploymentType === 'Docker' ? styles.deploymentBtnActive : ''
                }`}
                onClick={() => setDeploymentType('Docker')}
              >
                Docker
              </button>
            </div>
          </div>

          {/* Service Name */}
          <div className={styles.formGroup}>
            <label>
              Service Name <span className={styles.required}>*</span>
            </label>
            <Input
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="Enter your service name"
            />
          </div>

          {/* Application Path */}
          <div className={styles.formGroup}>
            <label>
              Application Path <span className={styles.required}>*</span>
              <Icon
                icon="mdi:information-outline"
                width={16}
                height={16}
                className={styles.infoIcon}
              />
            </label>
            <Input
              value={applicationPath}
              onChange={(e) => setApplicationPath(e.target.value)}
              placeholder="/home/user/app/application.jar"
            />
          </div>

          {/* Service Attributes */}
          <div className={styles.formGroup}>
            <label>Service Attributes</label>
            <button className={styles.addBtn}>
              <Icon icon="mdi:plus-circle" width={18} height={18} />
              Add Service Attributes
            </button>
          </div>

          {/* Custom Parameters */}
          <div className={styles.formGroup}>
            <label>Custom Parameters</label>
            <button className={styles.addBtn}>
              <Icon icon="mdi:plus-circle" width={18} height={18} />
              Add Custom Parameters
            </button>
          </div>

          {/* Apply Configuration Button */}
          <div className={styles.formActions}>
            <Button onClick={handleApplyConfiguration}>
              Apply Configuration
            </Button>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className={styles.successMessage}>
              <Icon icon="mdi:check-circle" width={20} height={20} />
              <span>APM Configuration Applied Successfully</span>
            </div>
          )}
        </div>

        {/* Instrumentation Command */}
        <div className={styles.commandSection}>
          <h3 className={styles.commandTitle}>
            To instrument your Java application, add the following argument to
            your java -jar command.
          </h3>
          <p className={styles.commandSubtitle}>
            Start collecting Traces by restarting your service.
          </p>

          <div className={styles.commandBox}>
            <button className={styles.copyBtn} onClick={handleCopyCommand}>
              <Icon icon="mdi:content-copy" width={18} height={18} />
            </button>
            <pre className={styles.commandCode}>
              {getInstrumentationCommand()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentConfig;
