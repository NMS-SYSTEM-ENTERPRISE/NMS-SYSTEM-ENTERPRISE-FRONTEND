"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './create.module.css';

const CreateSNMPDeviceCatalog = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    systemOid: '',
    name: '',
    vendor: '',
    type: 'SNMP Device',
  });

  const [metricGroups, setMetricGroups] = useState([
    {
      id: 1,
      name: '',
      groupType: 'Scalar', // Scalar or Tabular
      oids: [
        {
          id: 1,
          name: 'system.cpu.percent',
          oid: '1.3.6.1.4.1165.5.11.4.1.1.5',
        },
      ],
    },
  ]);

  const [showAssignMonitorsModal, setShowAssignMonitorsModal] = useState(false);
  const [showTestOidModal, setShowTestOidModal] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState(null);

  const handleAddMetricGroup = () => {
    const newId = Math.max(...metricGroups.map((g) => g.id), 0) + 1;
    setMetricGroups([
      ...metricGroups,
      {
        id: newId,
        name: '',
        groupType: 'Scalar',
        oids: [],
      },
    ]);
  };

  const handleRemoveMetricGroup = (groupId) => {
    setMetricGroups(metricGroups.filter((g) => g.id !== groupId));
  };

  const handleUpdateGroup = (groupId, field, value) => {
    setMetricGroups(
      metricGroups.map((g) => (g.id === groupId ? { ...g, [field]: value } : g))
    );
  };

  const handleAddOid = (groupId) => {
    setMetricGroups(
      metricGroups.map((g) => {
        if (g.id === groupId) {
          const newOidId = Math.max(...g.oids.map((o) => o.id), 0) + 1;
          return {
            ...g,
            oids: [
              ...g.oids,
              {
                id: newOidId,
                name: '',
                oid: '',
              },
            ],
          };
        }
        return g;
      })
    );
  };

  const handleRemoveOid = (groupId, oidId) => {
    setMetricGroups(
      metricGroups.map((g) => {
        if (g.id === groupId) {
          return {
            ...g,
            oids: g.oids.filter((o) => o.id !== oidId),
          };
        }
        return g;
      })
    );
  };

  const handleUpdateOid = (groupId, oidId, field, value) => {
    setMetricGroups(
      metricGroups.map((g) => {
        if (g.id === groupId) {
          return {
            ...g,
            oids: g.oids.map((o) =>
              o.id === oidId ? { ...o, [field]: value } : o
            ),
          };
        }
        return g;
      })
    );
  };

  const handleTestOidGroup = (groupId) => {
    setActiveGroupId(groupId);
    setShowTestOidModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData, metricGroups);
    // Handle form submission
  };

  const handleReset = () => {
    setFormData({
      systemOid: '',
      name: '',
      vendor: '',
      type: 'SNMP Device',
    });
    setMetricGroups([
      {
        id: 1,
        name: '',
        groupType: 'Scalar',
        oids: [],
      },
    ]);
  };

  return (
    <div className={styles.createPage}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.push(-1)}>
          <Icon icon="mdi:chevron-left" width={20} height={20} />
          <span>Create SNMP Device Catalog</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Info Link */}
        <div className={styles.infoLink}>
          <span>For more information: </span>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Creating a Custom SNMP Device Catalog <Icon icon="mdi:open-in-new" width={14} height={14} />
          </a>
        </div>

        {/* Basic Information */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>
              System OID <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 1.3.6.1.4.147387"
              value={formData.systemOid}
              onChange={(e) =>
                setFormData({ ...formData, systemOid: e.target.value })
              }
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>
              Type <span className={styles.required}>*</span>
            </label>
            <SelectComponent
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className={styles.select}
              options={[
                { value: 'SNMP Device', label: '📋 SNMP Device' },
                { value: 'Network', label: 'Network' },
              ]}
              placeholder="Select type"
            />
          </div>
        </div>

        {/* Metric Groups */}
        <div className={styles.metricGroupsSection}>
          <h2 className={styles.sectionTitle}>Metric Group</h2>

          {metricGroups.map((group, index) => (
            <div key={group.id} className={styles.metricGroupCard}>
              <div className={styles.metricGroupHeader}>
                <div className={styles.formGroupInline}>
                  <label>
                    Metric Group Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Must be unique within the catalog"
                    value={group.name}
                    onChange={(e) =>
                      handleUpdateGroup(group.id, 'name', e.target.value)
                    }
                    className={styles.input}
                  />
                </div>

                <div className={styles.groupTypeButtons}>
                  <button
                    type="button"
                    className={`${styles.typeBtn} ${
                      group.groupType === 'Scalar' ? styles.typeBtnActive : ''
                    }`}
                    onClick={() =>
                      handleUpdateGroup(group.id, 'groupType', 'Scalar')
                    }
                  >
                    Scalar
                  </button>
                  <button
                    type="button"
                    className={`${styles.typeBtn} ${
                      group.groupType === 'Tabular' ? styles.typeBtnActive : ''
                    }`}
                    onClick={() =>
                      handleUpdateGroup(group.id, 'groupType', 'Tabular')
                    }
                  >
                    Tabular
                  </button>
                  <button
                    type="button"
                    className={styles.testBtn}
                    onClick={() => handleTestOidGroup(group.id)}
                  >
                    Test OID Group
                  </button>
                </div>

                {metricGroups.length > 1 && (
                  <button
                    type="button"
                    className={styles.removeGroupBtn}
                    onClick={() => handleRemoveMetricGroup(group.id)}
                  >
                    <Icon icon="mdi:close" width={18} height={18} />
                  </button>
                )}
              </div>

              {/* OID Listing */}
              <div className={styles.oidListing}>
                <h3 className={styles.oidListingTitle}>OID Listing</h3>

                <div className={styles.oidTable}>
                  <div className={styles.oidTableHeader}>
                    <div className={styles.oidColumn}>OID Name</div>
                    <div className={styles.oidColumn}>OID</div>
                    <div className={styles.oidActions}></div>
                  </div>

                  {group.oids.map((oid) => (
                    <div key={oid.id} className={styles.oidRow}>
                      <div className={styles.oidColumn}>
                        <input
                          type="text"
                          placeholder="e.g. system.cpu.percent"
                          value={oid.name}
                          onChange={(e) =>
                            handleUpdateOid(
                              group.id,
                              oid.id,
                              'name',
                              e.target.value
                            )
                          }
                          className={styles.oidInput}
                        />
                      </div>
                      <div className={styles.oidColumn}>
                        <input
                          type="text"
                          placeholder="e.g. 1.3.6.1.4.1165.5.11.4.1.1.5"
                          value={oid.oid}
                          onChange={(e) =>
                            handleUpdateOid(
                              group.id,
                              oid.id,
                              'oid',
                              e.target.value
                            )
                          }
                          className={styles.oidInput}
                        />
                      </div>
                      <div className={styles.oidActions}>
                        <button type="button" className={styles.chooseOidBtn}>
                          Choose OID
                        </button>
                        <button
                          type="button"
                          className={styles.assignKeyValueBtn}
                        >
                          Assign Key-Value
                        </button>
                        <button
                          type="button"
                          className={styles.oidAddBtn}
                          onClick={() => handleAddOid(group.id)}
                        >
                          <Icon icon="mdi:plus" width={16} height={16} />
                        </button>
                        {group.oids.length > 1 && (
                          <button
                            type="button"
                            className={styles.oidRemoveBtn}
                            onClick={() => handleRemoveOid(group.id, oid.id)}
                          >
                            <Icon icon="mdi:trash-can" width={16} height={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className={styles.addMetricGroupBtn}
            onClick={handleAddMetricGroup}
          >
            <Icon icon="mdi:plus" width={16} height={16} />
            Add Metric Group
          </button>
        </div>

        {/* Form Actions */}
        <div className={styles.formActions}>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={handleReset}
          >
            Reset
          </button>
          <button type="submit" className={styles.submitBtn}>
            Create SNMP Device Catalog
          </button>
        </div>
      </form>

      {/* Test OID Group Modal */}
      {showTestOidModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowTestOidModal(false)}
        >
          <div
            className={styles.testOidModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>OID Group Test Result</h2>
              <button
                className={styles.modalClose}
                onClick={() => setShowTestOidModal(false)}
              >
                <Icon icon="mdi:close" width={20} height={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.oidTestResults}>
                <div className={styles.testResultRow}>
                  <input type="radio" name="oid" id="oid1" />
                  <label htmlFor="oid1">.1.3.6.1.4.112356</label>
                  <input type="radio" name="oid" id="oid2" />
                  <label htmlFor="oid2">. 1.3.6.1.4.112356</label>
                  <input type="radio" name="oid" id="oid3" defaultChecked />
                  <label htmlFor="oid3">
                    .1.3.6.1.4.112356.101.5.2.2.1.1.1
                  </label>
                  <span>-</span>
                  <input type="radio" name="oid" id="oid4" />
                  <label htmlFor="oid4">.1.3.6.1.4.112356</label>
                  <input type="radio" name="oid" id="oid5" />
                  <label htmlFor="oid5">.</label>
                </div>
                <table className={styles.testResultTable}>
                  <thead>
                    <tr>
                      <th>1</th>
                      <th>97.106.97.121</th>
                      <th>1</th>
                      <th>1</th>
                      <th>2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>guest</td>
                      <td>2</td>
                      <td>1</td>
                      <td>2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.selectParentBtn}>
                Select Parent OID
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Monitors Modal */}
      {showAssignMonitorsModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowAssignMonitorsModal(false)}
        >
          <div
            className={styles.assignModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>Assign Monitors</h2>
              <button
                className={styles.modalClose}
                onClick={() => setShowAssignMonitorsModal(false)}
              >
                <Icon icon="mdi:close" width={20} height={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.assignSearch}>
                <input type="text" placeholder="10.1" />
                <button className={styles.viewSelectedBtn}>
                  <Icon icon="mdi:information" width={16} height={16} className={styles.infoIcon} /> View Selected
                </button>
              </div>
              <table className={styles.assignTable}>
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>
                      Monitor <span className={styles.sortIcon}>↓</span>
                    </th>
                    <th>IP</th>
                    <th>Type</th>
                    <th>Groups</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" defaultChecked />
                    </td>
                    <td>
                      <span className={styles.statusDot}></span>
                      fg_firewall.mindarray.com
                    </td>
                    <td>172.16.10.1</td>
                    <td>📋</td>
                    <td>
                      <span className={styles.groupTag}>NETWORK</span>
                      <span className={styles.groupCount}>+2</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowAssignMonitorsModal(false)}
              >
                Cancel
              </button>
              <button className={styles.assignBtn}>Assign Monitors</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSNMPDeviceCatalog;
