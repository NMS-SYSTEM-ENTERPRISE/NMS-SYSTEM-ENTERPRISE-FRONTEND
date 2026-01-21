"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

// Mock monitoring hour data
const MOCK_MONITORING_HOURS = [
  {
    id: 1,
    name: '24*7',
    usedCount: 155,
  },
];

const MonitoringHour = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tableSearchTerm, setTableSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    timeSlots: [],
  });

  const filteredMonitoringHours = MOCK_MONITORING_HOURS.filter((mh) =>
    mh.name.toLowerCase().includes(tableSearchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateMonitoringHour = (e) => {
    e.preventDefault();
    console.log('Creating Monitoring Hour:', formData);
    setShowCreateModal(false);
    setFormData({
      name: '',
      description: '',
      timeSlots: [],
    });
  };

  const handleEdit = (mh) => {
    console.log('Editing:', mh.name);
    setShowActionsMenu(null);
  };

  const handleDelete = (mh) => {
    console.log('Deleting:', mh.name);
    setShowActionsMenu(null);
  };

  return (
    <>
      <div className={styles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        {/* Header */}
        <div className={styles.mainContent_header}>
          <div className={styles.searchBar}>
            <Icon icon="mdi:magnify" width={18} height={18} />
            <input
              type="text"
              placeholder="search"
              value={tableSearchTerm}
              onChange={(e) => setTableSearchTerm(e.target.value)}
            />
          </div>
          <button
            className={styles.createBtn}
            onClick={() => setShowCreateModal(true)}
          >
            Create Monitoring Hour
          </button>
        </div>

        {/* Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  MONITORING HOUR NAME{' '}
                  <span className={styles.sortIcon}>↑</span>
                </th>
                <th>USED COUNT</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredMonitoringHours.map((mh) => (
                <tr key={mh.id}>
                  <td className={styles.nameCell}>{mh.name}</td>
                  <td>
                    <span className={styles.usedCountBadge}>
                      {mh.usedCount}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionsCell}>
                      <button
                        className={styles.actionBtn}
                        onClick={() =>
                          setShowActionsMenu(
                            showActionsMenu === mh.id ? null : mh.id
                          )
                        }
                      >
                        <Icon icon="mdi:dots-vertical" width={18} height={18} />
                      </button>
                      {showActionsMenu === mh.id && (
                        <div className={styles.actionsMenu}>
                          <div
                            className={styles.actionItem}
                            onClick={() => handleEdit(mh)}
                          >
                            <Icon icon="mdi:pencil" width={16} height={16} />
                            Edit
                          </div>
                          <div
                            className={styles.actionItem}
                            onClick={() => handleDelete(mh)}
                          >
                            <Icon icon="mdi:trash-can" width={16} height={16} />
                            Delete
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <button className={styles.paginationBtn}>«</button>
          <button className={styles.paginationBtn}>‹</button>
          <button
            className={`${styles.paginationBtn} ${styles.paginationBtnActive}`}
          >
            1
          </button>
          <button className={styles.paginationBtn}>›</button>
          <button className={styles.paginationBtn}>»</button>
          <SelectComponent
            className={styles.paginationSelect}
            value={50}
            onChange={() => {}}
            options={[
              { value: 50, label: '50' },
              { value: 100, label: '100' },
              { value: 200, label: '200' },
            ]}
            placeholder="50"
            isSearchable={false}
          />
          <span className={styles.paginationInfo}>items per page</span>
          <span className={styles.paginationCount}>1 - 1 of 1 items</span>
        </div>
      </div>

      {/* Create Monitoring Hour Modal */}
      {showCreateModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowCreateModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Create Monitoring Hour</h3>
              <Icon
                icon="mdi:close"
                width={20}
                height={20}
                className={styles.closeButton}
                onClick={() => setShowCreateModal(false)}
              />
            </div>
            <form
              onSubmit={handleCreateMonitoringHour}
              className={styles.modalBody}
            >
              <div className={styles.formGroup}>
                <label>
                  Monitoring Hour Name{' '}
                  <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter monitoring hour name (e.g., 24*7, Business Hours)"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              <div className={styles.modalFooter}>
                <p className={styles.mandatoryNote}>
                  <span className={styles.required}>*</span> fields are
                  mandatory
                </p>
                <div className={styles.modalActions}>
                  <button
                    type="button"
                    className={styles.resetBtn}
                    onClick={() =>
                      setFormData({ name: '', description: '', timeSlots: [] })
                    }
                  >
                    Reset
                  </button>
                  <button type="submit" className={styles.createBtnModal}>
                    Create Monitoring Hour
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MonitoringHour;
