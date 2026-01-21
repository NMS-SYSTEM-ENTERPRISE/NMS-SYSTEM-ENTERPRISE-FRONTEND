"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from './styles.module.css';

// Mock NetRoute data
const MOCK_NETROUTES = [
  { id: 1, routeName: 'OpenAI', source: 'AIOps', destination: 'www.openai.com', port: 443, tag: 'openai', manageStatus: true },
  { id: 2, routeName: 'fb', source: 'AIOps', destination: 'www.facebook.com', port: 443, tag: 'fb', manageStatus: true },
];

const NetRouteSettings = () => {
  const [tableSearchTerm, setTableSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    routeName: '',
    destination: '',
    port: '0',
    intervalTime: '5',
    source: '',
    tags: [],
  });

  const filteredNetRoutes = MOCK_NETROUTES.filter(
    (route) =>
      route.routeName.toLowerCase().includes(tableSearchTerm.toLowerCase()) ||
      route.destination.toLowerCase().includes(tableSearchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateNetRoute = (e) => {
    e.preventDefault();
    alert('NetRoute created successfully!');
    setShowCreateModal(false);
    handleReset();
  };

  const handleReset = () => {
    setFormData({ routeName: '', destination: '', port: '0', intervalTime: '5', source: '', tags: [] });
  };

  return (
    <>
      <div className={styles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>NetRoute Settings</h1>
          <p className={styles.pageDescription}>
            Effortlessly track network paths with NetRoute Analysis in snr-edatas AIOps.
          </p>
        </div>

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
          <button
            className={styles.createBtn}
            onClick={() => setShowCreateModal(true)}
          >
            Create NetRoute
          </button>
        </div>

        {/* Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ROUTE NAME</th>
                <th>SOURCE</th>
                <th>DESTINATION</th>
                <th>PORT</th>
                <th>TAG</th>
                <th>MANAGE STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredNetRoutes.map((route) => (
                <tr key={route.id}>
                  <td className={styles.routeNameCell}>{route.routeName}</td>
                  <td><span className={styles.sourceBadge}>{route.source}</span></td>
                  <td className={styles.destinationCell}>{route.destination}</td>
                  <td>{route.port}</td>
                  <td>{route.tag && <span className={styles.tagBadge}>{route.tag}</span>}</td>
                  <td>
                    <div className={styles.statusToggle}>
                      <Icon icon="mdi:refresh" width={16} height={16} className={styles.statusIcon} />
                      <span className={`${styles.statusDot} ${route.manageStatus ? styles.statusOn : ''}`}></span>
                    </div>
                  </td>
                  <td>
                    <button className={styles.actionBtn}>
                      <Icon icon="mdi:dots-vertical" width={18} height={18} />
                    </button>
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
          <span className={styles.paginationCount}>1 - {filteredNetRoutes.length} of {filteredNetRoutes.length} items</span>
        </div>
      </div>

      {/* Create NetRoute Modal */}
      {showCreateModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCreateModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Create NetRoute</h3>
              <Icon icon="mdi:close" width={20} height={20} className={styles.closeButton} onClick={() => setShowCreateModal(false)} />
            </div>
            <form onSubmit={handleCreateNetRoute} className={styles.modalBody}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Route Name <span className={styles.required}>*</span></label>
                  <input type="text" name="routeName" value={formData.routeName} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Destination IP/Host/URL <span className={styles.required}>*</span></label>
                  <input type="text" name="destination" value={formData.destination} onChange={handleInputChange} required />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Port <span className={styles.required}>*</span></label>
                  <input type="number" name="port" value={formData.port} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Interval Time <span className={styles.required}>*</span></label>
                  <div className={styles.intervalGroup}>
                    <input type="number" name="intervalTime" value={formData.intervalTime} onChange={handleInputChange} required />
                    <span className={styles.intervalUnit}>Mins</span>
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <div className={styles.modalActions}>
                  <button type="button" className={styles.resetBtn} onClick={handleReset}>Reset</button>
                  <button type="submit" className={styles.createBtnModal}>Create NetRoute</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NetRouteSettings;
