"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

// Mock custom field data
const MOCK_CUSTOM_FIELDS = [
  { id: 1, name: 'abc' },
  { id: 2, name: 'Environment' },
  { id: 3, name: 'Field 10' },
  { id: 4, name: 'Field 6' },
  { id: 5, name: 'Field 7' },
  { id: 6, name: 'Field 8' },
  { id: 7, name: 'Field 9' },
  { id: 8, name: 'Floor' },
  { id: 9, name: 'Location' },
  { id: 10, name: 'Serial Number' },
];

const CustomMonitoringField = () => {
  const [tableSearchTerm, setTableSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  const [formData, setFormData] = useState({ fieldName: '', description: '' });

  const filteredFields = MOCK_CUSTOM_FIELDS.filter((field) =>
    field.name.toLowerCase().includes(tableSearchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateField = (e) => {
    e.preventDefault();
    alert('Custom field created successfully!');
    setShowCreateModal(false);
    setFormData({ fieldName: '', description: '' });
  };

  return (
    <>
      <div className={styles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        {/* Toolbar */}
        <div className={styles.mainContent_header}>
          <div className={styles.searchBar}>
            <Icon icon="mdi:magnify" width={18} height={18} />
            <input
              type="text"
              placeholder="Search"
              value={tableSearchTerm}
              onChange={(e) => setTableSearchTerm(e.target.value)}
            />
          </div>
          <button className={styles.createBtn} onClick={() => setShowCreateModal(true)}>
            Create Custom Field
          </button>
        </div>

        {/* Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>FIELD NAME <span className={styles.sortIcon}>↑</span></th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredFields.map((field) => (
                <tr key={field.id}>
                  <td className={styles.fieldNameCell}>{field.name}</td>
                  <td>
                    <div className={styles.actionsCell}>
                      <button
                        className={styles.actionBtn}
                        onClick={() => setShowActionsMenu(showActionsMenu === field.id ? null : field.id)}
                      >
                        <Icon icon="mdi:dots-vertical" width={18} height={18} />
                      </button>
                      {showActionsMenu === field.id && (
                        <div className={styles.actionsMenu}>
                          <div className={styles.actionItem} onClick={() => alert('Editing...')}><Icon icon="mdi:pencil" width={16} height={16} /> Edit</div>
                          <div className={styles.actionItem} onClick={() => alert('Deleting...')}><Icon icon="mdi:trash-can" width={16} height={16} /> Delete</div>
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
          <button className={`${styles.paginationBtn} ${styles.paginationBtnActive}`}>1</button>
          <button className={styles.paginationBtn}>›</button>
          <button className={styles.paginationBtn}>»</button>
          <SelectComponent
            className={styles.paginationSelect}
            value={50}
            onChange={() => {}}
            options={[{ value: 50, label: '50' }]}
            placeholder="50"
            isSearchable={false}
          />
          <span className={styles.paginationInfo}>items per page</span>
          <span className={styles.paginationCount}>1 - {filteredFields.length} of {filteredFields.length} items</span>
        </div>
      </div>

      {/* Create Custom Field Modal */}
      {showCreateModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Create Custom Monitoring Field</h3>
              <Icon icon="mdi:close" width={20} height={20} className={styles.closeButton} onClick={() => setShowCreateModal(false)} />
            </div>
            <form onSubmit={handleCreateField} className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Field Name <span className={styles.required}>*</span></label>
                <input type="text" name="fieldName" placeholder="e.g., Location, Environment" value={formData.fieldName} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea name="description" placeholder="Enter field description" value={formData.description} onChange={handleInputChange} rows={4} />
              </div>
              <div className={styles.modalFooter}>
                <div className={styles.modalActions}>
                  <button type="button" className={styles.resetBtn} onClick={() => setFormData({ fieldName: '', description: '' })}>Reset</button>
                  <button type="submit" className={styles.createBtnModal}>Create Field</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomMonitoringField;
