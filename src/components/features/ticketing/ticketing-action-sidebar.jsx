import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import styles from './ticketing-action-sidebar.module.css';

export const TicketingActionSidebar = ({ isOpen, onClose, mode = 'details', ticketData = null }) => {
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    if (isOpen && mode === 'details') {
      setActiveTab('details');
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const renderContent = () => {
    switch (mode) {
      case 'create':
        return (
          <div className={styles.section}>
            <h3>Create New Ticket</h3>
            <div className={styles.formGroup}>
              <label>Subject</label>
              <input type="text" className={styles.input} placeholder="Enter ticket subject" />
            </div>
            <div className={styles.formGroup}>
              <label>Requester</label>
              <input type="text" className={styles.input} placeholder="Enter requester name" />
            </div>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Priority</label>
                <SelectComponent
                  options={[
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' },
                    { value: 'critical', label: 'Critical' },
                  ]}
                  placeholder="Select Priority"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Type</label>
                <SelectComponent
                  options={[
                    { value: 'incident', label: 'Incident' },
                    { value: 'service_request', label: 'Service Request' },
                  ]}
                  placeholder="Select Type"
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Description</label>
              <textarea className={styles.textarea} rows={5} placeholder="Describe the issue..."></textarea>
            </div>
            <div className={styles.actions}>
              <button className={styles.primaryBtn}>Create Ticket</button>
              <button className={styles.secondaryBtn} onClick={onClose}>Cancel</button>
            </div>
          </div>
        );

      case 'alerts':
        return (
          <div className={styles.section}>
            <h3>Ticketing Alerts</h3>
            <div className={styles.alertList}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.alertItem}>
                  <div className={styles.alertIcon}>
                    <Icon icon="mdi:bell-ring" width={16} height={16} />
                  </div>
                  <div className={styles.alertContent}>
                    <div className={styles.alertTitle}>New Ticket Assigned</div>
                    <div className={styles.alertTime}>Just now</div>
                    <div className={styles.alertMsg}>Ticket #INC-{100+i} has been assigned to you.</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className={styles.section}>
            <h3>Filters & Settings</h3>
            <div className={styles.formGroup}>
              <label>Status Filter</label>
              <div className={styles.checkboxGroup}>
                <label><input type="checkbox" defaultChecked /> Open</label>
                <label><input type="checkbox" defaultChecked /> In Progress</label>
                <label><input type="checkbox" /> Resolved</label>
                <label><input type="checkbox" /> Closed</label>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Priority Filter</label>
              <div className={styles.checkboxGroup}>
                <label><input type="checkbox" defaultChecked /> Critical</label>
                <label><input type="checkbox" defaultChecked /> High</label>
                <label><input type="checkbox" defaultChecked /> Medium</label>
                <label><input type="checkbox" defaultChecked /> Low</label>
              </div>
            </div>
            <div className={styles.actions}>
              <button className={styles.primaryBtn}>Apply Filters</button>
              <button className={styles.secondaryBtn}>Reset</button>
            </div>
          </div>
        );

      case 'details':
        if (!ticketData) return <div className={styles.emptyState}>No ticket selected</div>;
        return (
          <div className={styles.section}>
            <div className={styles.detailsHeader}>
              <div className={styles.ticketId}>{ticketData.id}</div>
              <span className={`${styles.statusBadge} ${styles[ticketData.status.toLowerCase().replace(' ', '')] || styles.statusOpen}`}>
                {ticketData.status}
              </span>
            </div>
            <h3 className={styles.ticketSubject}>{ticketData.subject}</h3>
            
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <label>Requester</label>
                <div>{ticketData.requester}</div>
              </div>
              <div className={styles.detailItem}>
                <label>Assignee</label>
                <div>{ticketData.assignee}</div>
              </div>
              <div className={styles.detailItem}>
                <label>Priority</label>
                <span className={`${styles.priorityBadge} ${styles[ticketData.priority.toLowerCase()]}`}>
                  {ticketData.priority}
                </span>
              </div>
              <div className={styles.detailItem}>
                <label>Created</label>
                <div>{ticketData.createdDate}</div>
              </div>
              <div className={styles.detailItem}>
                <label>Due</label>
                <div className={styles.dueText}>{ticketData.dueStatus}</div>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.tabs}>
              <button 
                className={`${styles.tab} ${activeTab === 'details' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Description
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'activity' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('activity')}
              >
                Activity
              </button>
            </div>

            {activeTab === 'details' && (
              <div className={styles.tabContent}>
                <p>
                  User reported an issue regarding {ticketData.subject.toLowerCase()}. 
                  Please investigate and resolve as soon as possible.
                </p>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className={styles.activityList}>
                <div className={styles.activityItem}>
                  <div className={styles.activityDot}></div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityHeader}>
                      <span className={styles.activityUser}>System</span>
                      <span className={styles.activityTime}>Today, 10:00 AM</span>
                    </div>
                    <div className={styles.activityText}>Ticket created</div>
                  </div>
                </div>
              </div>
            )}
            
            <div className={styles.footerActions}>
              <button className={styles.primaryBtn}>Update Status</button>
              <button className={styles.secondaryBtn}>Add Note</button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.sidebarOverlay} onClick={onClose}>
      <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            {mode === 'create' && <Icon icon="mdi:plus-circle" width={24} height={24} className={styles.headerIcon} />}
            {mode === 'alerts' && <Icon icon="mdi:bell" width={24} height={24} className={styles.headerIcon} />}
            {mode === 'settings' && <Icon icon="mdi:filter" width={24} height={24} className={styles.headerIcon} />}
            {mode === 'details' && <Icon icon="mdi:ticket-account" width={24} height={24} className={styles.headerIcon} />}
            <h2>
              {mode === 'create' && 'Create Ticket'}
              {mode === 'alerts' && 'Notifications'}
              {mode === 'settings' && 'Filters'}
              {mode === 'details' && 'Ticket Details'}
            </h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <Icon icon="mdi:close" width={24} height={24} />
          </button>
        </div>

        <div className={styles.content}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
