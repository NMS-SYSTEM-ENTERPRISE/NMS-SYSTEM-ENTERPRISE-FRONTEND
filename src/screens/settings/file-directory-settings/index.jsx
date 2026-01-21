"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

// Mock file/directory data
const MOCK_FILE_DIRECTORIES = [
  { id: 1, path: '/var/log', type: 'Directory', osType: 'linux' },
  { id: 2, path: '/var/log/syslog', type: 'File', osType: 'linux' },
  { id: 3, path: 'C:\\', type: 'Directory', osType: 'windows' },
];

const FileDirectorySettings = () => {
  const [tableSearchTerm, setTableSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(null);
  const [formData, setFormData] = useState({ path: '', type: 'Directory', osType: 'linux' });

  const filteredFileDirectories = MOCK_FILE_DIRECTORIES.filter(
    (item) =>
      item.path.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(tableSearchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateFileDirectory = (e) => {
    e.preventDefault();
    alert('File/Directory created successfully!');
    setShowCreateModal(false);
    setFormData({ path: '', type: 'Directory', osType: 'linux' });
  };

  const renderOSIcon = (osType) => {
    if (osType === 'linux') {
      return <Icon icon="mdi:linux" width={20} height={20} style={{ color: '#FCC624' }} />;
    }
    return <Icon icon="mdi:microsoft-windows" width={20} height={20} style={{ color: '#0078D4' }} />;
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
            Create File/Directory List
          </button>
        </div>

        {/* Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>PATH <span className={styles.sortIcon}>↑</span></th>
                <th>TYPE</th>
                <th>OS TYPE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredFileDirectories.map((item) => (
                <tr key={item.id}>
                  <td className={styles.pathCell}>{item.path}</td>
                  <td className={styles.typeCell}>{item.type}</td>
                  <td>
                    <div className={styles.iconCell}>
                      {renderOSIcon(item.osType)}
                    </div>
                  </td>
                  <td>
                    <div className={styles.actionsCell}>
                      <button
                        className={styles.actionBtn}
                        onClick={() => setShowActionsMenu(showActionsMenu === item.id ? null : item.id)}
                      >
                        <Icon icon="mdi:dots-vertical" width={18} height={18} />
                      </button>
                      {showActionsMenu === item.id && (
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
          <span className={styles.paginationCount}>1 - {filteredFileDirectories.length} of {filteredFileDirectories.length} items</span>
        </div>
      </div>

      {/* Create File/Directory Modal */}
      {showCreateModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Create File/Directory List</h3>
              <Icon icon="mdi:close" width={20} height={20} className={styles.closeButton} onClick={() => setShowCreateModal(false)} />
            </div>
            <form onSubmit={handleCreateFileDirectory} className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Path <span className={styles.required}>*</span></label>
                <input type="text" name="path" placeholder="e.g., /var/log or C:\Program Files" value={formData.path} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Type <span className={styles.required}>*</span></label>
                <SelectComponent
                  className={styles.formSelect}
                  value={formData.type}
                  onChange={(e) => handleInputChange({ target: { name: 'type', value: e.target.value } })}
                  options={[
                    { value: 'Directory', label: 'Directory' },
                    { value: 'File', label: 'File' },
                  ]}
                  placeholder="Select type"
                />
              </div>
              <div className={styles.formGroup}>
                <label>OS Type <span className={styles.required}>*</span></label>
                <SelectComponent
                  className={styles.formSelect}
                  value={formData.osType}
                  onChange={(e) => handleInputChange({ target: { name: 'osType', value: e.target.value } })}
                  options={[
                    { value: 'linux', label: 'Linux' },
                    { value: 'windows', label: 'Windows' },
                  ]}
                  placeholder="Select OS type"
                />
              </div>
              <div className={styles.modalFooter}>
                <div className={styles.modalActions}>
                  <button type="button" className={styles.resetBtn} onClick={() => setFormData({ path: '', type: 'Directory', osType: 'linux' })}>Reset</button>
                  <button type="submit" className={styles.createBtnModal}>Create File/Directory</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FileDirectorySettings;
