"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

const SNMPTrapListener = () => {
  // SNMP v1/v2c state
  const [v1v2cEnabled, setV1v2cEnabled] = useState(true);
  const [v1v2cPort, setV1v2cPort] = useState('1620');
  const [community, setCommunity] = useState('');
  const [showCommunity, setShowCommunity] = useState(false);
  
  // SNMP v3 state
  const [v3Enabled, setV3Enabled] = useState(true);
  const [v3Port, setV3Port] = useState('1630');
  const [securityUserName, setSecurityUserName] = useState('');
  const [securityLevel, setSecurityLevel] = useState('');

  const handleReset = () => {
    setV1v2cEnabled(true);
    setV1v2cPort('1620');
    setCommunity('');
    setV3Enabled(true);
    setV3Port('1630');
    setSecurityUserName('');
    setSecurityLevel('');
  };

  const handleSave = () => {
    alert('SNMP Trap Listener settings saved successfully!');
  };

  return (
    <>
      <div className={styles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        <div className={styles.content}>
          {/* SNMP v1/v2c Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>
                <h3>SNMP v1/v2c</h3>
                <div className={styles.toggle}>
                  <span className={styles.toggleLabel}>
                    {v1v2cEnabled ? 'ON' : 'OFF'}
                  </span>
                  <button
                    className={`${styles.toggleSwitch} ${
                      v1v2cEnabled ? styles.toggleSwitchOn : ''
                    }`}
                    onClick={() => setV1v2cEnabled(!v1v2cEnabled)}
                  >
                    <span className={styles.toggleHandle}></span>
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.sectionBody}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Port <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    value={v1v2cPort}
                    onChange={(e) => setV1v2cPort(e.target.value)}
                    disabled={!v1v2cEnabled}
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Community <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.passwordField}>
                    <input
                      type={showCommunity ? 'text' : 'password'}
                      className={styles.input}
                      value={community}
                      onChange={(e) => setCommunity(e.target.value)}
                      disabled={!v1v2cEnabled}
                    />
                    <button
                      className={styles.eyeBtn}
                      onClick={() => setShowCommunity(!showCommunity)}
                    >
                      {showCommunity ? (
                        <Icon icon="mdi:eye-off" width={16} height={16} />
                      ) : (
                        <Icon icon="mdi:eye" width={16} height={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* SNMP v3 Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>
                <h3>SNMP v3</h3>
                <div className={styles.toggle}>
                  <span className={styles.toggleLabel}>
                    {v3Enabled ? 'ON' : 'OFF'}
                  </span>
                  <button
                    className={`${styles.toggleSwitch} ${
                      v3Enabled ? styles.toggleSwitchOn : ''
                    }`}
                    onClick={() => setV3Enabled(!v3Enabled)}
                  >
                    <span className={styles.toggleHandle}></span>
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.sectionBody}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Port <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    value={v3Port}
                    onChange={(e) => setV3Port(e.target.value)}
                    disabled={!v3Enabled}
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Security User Name{' '}
                    <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    className={styles.input}
                    value={securityUserName}
                    onChange={(e) => setSecurityUserName(e.target.value)}
                    disabled={!v3Enabled}
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Security Level{' '}
                    <span className={styles.required}>*</span>
                  </label>
                  <SelectComponent
                    className={styles.select}
                    value={securityLevel}
                    onChange={(e) => setSecurityLevel(e.target.value)}
                    isDisabled={!v3Enabled}
                    options={[
                      { value: '', label: 'Select' },
                      { value: 'noAuthNoPriv', label: 'No Auth, No Priv' },
                      { value: 'authNoPriv', label: 'Auth, No Priv' },
                      { value: 'authPriv', label: 'Auth, Priv' },
                    ]}
                    placeholder="Select"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <button className={styles.resetBtn} onClick={handleReset}>
            Reset
          </button>
          <button className={styles.saveBtn} onClick={handleSave}>
            Save SNMP Trap Listener Settings
          </button>
        </div>
      </div>
    </>
  );
};

export default SNMPTrapListener;
