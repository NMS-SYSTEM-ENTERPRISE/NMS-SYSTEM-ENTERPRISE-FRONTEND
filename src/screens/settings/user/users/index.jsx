"use client";
import { FilterSidebar } from '@/components/ui/filter-sidebar';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';
const MOCK_USERS = [
  { id: 1, firstName: 'Admin', lastName: 'User', email: 'admin@example.com', mobile: '', username: 'admin', status: 'Active', groups: 'Admin', role: 'Admin' },
  { id: 2, firstName: 'John', lastName: 'Doe', email: 'john@example.com', mobile: '+1234567890', username: 'john.doe', status: 'Active', groups: 'Operators', role: 'Operator' },
  { id: 3, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', mobile: '', username: 'jane.smith', status: 'Inactive', groups: 'Viewers', role: 'Viewer' },
];
const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    username: '',
    password: '',
    confirmPassword: '',
    status: true,
    groups: '',
    role: '',
  });
  const filteredUsers = MOCK_USERS.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <div className={styles.toolbar}>
            <div className={styles.searchBox}>
              <Icon icon="mdi:magnify" width={18} height={18} />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className={styles.btnPrimary} onClick={() => setShowCreateModal(true)}>
              <Icon icon="mdi:plus" width={18} height={18} />
              Create User
            </button>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>FIRST NAME</th>
                  <th>LAST NAME</th>
                  <th>EMAIL ADDRESS</th>
                  <th>MOBILE NUMBER</th>
                  <th>USER NAME</th>
                  <th>STATUS</th>
                  <th>GROUP</th>
                  <th>ROLE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile || '-'}</td>
                    <td>
                      <a href="#" className={styles.linkBlue}>{user.username}</a>
                    </td>
                    <td>
                      <span className={user.status === 'Active' ? styles.badgeSuccess : styles.badgeDanger}>
                        {user.status}
                      </span>
                    </td>
                    <td>{user.groups}</td>
                    <td>{user.role}</td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} title="Edit">
                          <Icon icon="mdi:pencil" width={18} height={18} />
                        </button>
                        <button className={styles.actionBtn} title="More">
                          <Icon icon="mdi:dots-vertical" width={18} height={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Create User Sidebar */}
      <FilterSidebar
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create User"
        filters={[]}
        onApply={() => {
          console.log('Create user:', newUser);
          setShowCreateModal(false);
        }}
        onReset={() => setNewUser({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          username: '',
          password: '',
          confirmPassword: '',
          status: true,
          groups: '',
          role: '',
        })}
        applyButtonText="Create User"
        resetButtonText="Reset"
      >
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>First Name <span style={{color: 'var(--color-danger)'}}>*</span></label>
            <input
              type="text"
              className={styles.formInput}
              value={newUser.firstName}
              onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Last Name <span style={{color: 'var(--color-danger)'}}>*</span></label>
            <input
              type="text"
              className={styles.formInput}
              value={newUser.lastName}
              onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email Address <span style={{color: 'var(--color-danger)'}}>*</span></label>
            <input
              type="email"
              className={styles.formInput}
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Mobile Number</label>
            <input
              type="tel"
              className={styles.formInput}
              value={newUser.mobile}
              onChange={(e) => setNewUser({...newUser, mobile: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>User Name <span style={{color: 'var(--color-danger)'}}>*</span></label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="Must be unique"
              value={newUser.username}
              onChange={(e) => setNewUser({...newUser, username: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password <span style={{color: 'var(--color-danger)'}}>*</span></label>
            <input
              type="password"
              className={styles.formInput}
              placeholder="Do not use simple password"
              value={newUser.password}
              onChange={(e) => setNewUser({...newUser, password: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Confirm Password <span style={{color: 'var(--color-danger)'}}>*</span></label>
            <input
              type="password"
              className={styles.formInput}
              placeholder="Same as the password field"
              value={newUser.confirmPassword}
              onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Status</label>
            <button
              className={`${styles.toggleBtn} ${newUser.status ? styles.toggleBtnOn : ''}`}
              onClick={() => setNewUser({...newUser, status: !newUser.status})}
            >
              <span className={styles.toggleSlider}></span>
              <span className={styles.toggleLabel}>{newUser.status ? 'ON' : 'OFF'}</span>
            </button>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Groups <span style={{color: 'var(--color-danger)'}}>*</span></label>
            <SelectComponent
              className={styles.formSelect}
              value={newUser.groups}
              onChange={(e) => setNewUser({...newUser, groups: e.target.value})}
              options={[
                { value: 'Admin', label: 'Admin' },
                { value: 'Operators', label: 'Operators' },
                { value: 'Viewers', label: 'Viewers' },
              ]}
              placeholder="Select"
            />
            <a href="#" className={styles.link} style={{fontSize: 'var(--font-xs)', marginTop: '4px'}}>Create Group</a>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Role <span style={{color: 'var(--color-danger)'}}>*</span></label>
            <SelectComponent
              className={styles.formSelect}
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              options={[
                { value: 'Admin', label: 'Admin' },
                { value: 'Operator', label: 'Operator' },
                { value: 'Viewer', label: 'Viewer' },
              ]}
              placeholder="Select"
            />
            <a href="#" className={styles.link} style={{fontSize: 'var(--font-xs)', marginTop: '4px'}}>Create Role</a>
          </div>
        </div>
        <p style={{fontSize: 'var(--font-xs)', color: 'var(--color-text-secondary)', marginTop: 'var(--margin-lg)'}}>
          For more information: <a href="#" className={styles.link}>Creating New User</a>
        </p>
        <p style={{fontSize: 'var(--font-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--margin-sm)'}}>
          * fields are mandatory
        </p>
      </FilterSidebar>
    </>
  );
};
export default Users;
