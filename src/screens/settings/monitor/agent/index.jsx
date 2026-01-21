"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from '../../shared-settings-styles.module.css';

const MOCK_AGENTS = [
  { id: 1, name: 'Linux-Server-01', ip: '172.16.8.100', type: 'Linux', version: '2.5.1', status: 'Running', lastSeen: '2 mins ago', cpu: 45, memory: 67 },
  { id: 2, name: 'Windows-Server-02', ip: '172.16.8.101', type: 'Windows', version: '2.5.1', status: 'Running', lastSeen: '5 mins ago', cpu: 23, memory: 54 },
  { id: 3, name: 'Docker-Host-01', ip: '172.16.8.102', type: 'Docker', version: '2.5.0', status: 'Stopped', lastSeen: '2 hours ago', cpu: 0, memory: 0 },
  { id: 4, name: 'K8s-Node-01', ip: '172.16.8.103', type: 'Kubernetes', version: '2.5.1', status: 'Running', lastSeen: '1 min ago', cpu: 78, memory: 82 },
];

const AgentMonitorSettings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgents, setSelectedAgents] = useState([]);

  const filteredAgents = MOCK_AGENTS.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.ip.includes(searchTerm)
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
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div style={{display: 'flex', gap: 'var(--gap-sm)'}}>
              <button className={styles.btnSecondary}>
                <Icon icon="mdi:refresh" width={18} height={18} />
                Refresh
              </button>
              <button className={styles.btnPrimary}>
                <Icon icon="mdi:plus" width={18} height={18} />
                Add Agent
              </button>
            </div>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>AGENT NAME</th>
                  <th>IP ADDRESS</th>
                  <th>TYPE</th>
                  <th>VERSION</th>
                  <th>STATUS</th>
                  <th>LAST SEEN</th>
                  <th>CPU %</th>
                  <th>MEMORY %</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map((agent) => (
                  <tr key={agent.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedAgents.includes(agent.id)}
                        onChange={() => {
                          if (selectedAgents.includes(agent.id)) {
                            setSelectedAgents(selectedAgents.filter(id => id !== agent.id));
                          } else {
                            setSelectedAgents([...selectedAgents, agent.id]);
                          }
                        }}
                      />
                    </td>
                    <td>
                      <a href="#" className={styles.linkBlue}>{agent.name}</a>
                    </td>
                    <td>{agent.ip}</td>
                    <td>
                      <span className={styles.badgeInfo}>{agent.type}</span>
                    </td>
                    <td>{agent.version}</td>
                    <td>
                      <span className={agent.status === 'Running' ? styles.badgeSuccess : styles.badgeDanger}>
                        {agent.status}
                      </span>
                    </td>
                    <td>{agent.lastSeen}</td>
                    <td>
                      <span style={{color: agent.cpu > 70 ? 'var(--color-danger)' : agent.cpu > 50 ? 'var(--color-warning)' : 'var(--color-success)'}}>
                        {agent.cpu}%
                      </span>
                    </td>
                    <td>
                      <span style={{color: agent.memory > 70 ? 'var(--color-danger)' : agent.memory > 50 ? 'var(--color-warning)' : 'var(--color-success)'}}>
                        {agent.memory}%
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} title="View Details">
                          <Icon icon="mdi:eye" width={18} height={18} />
                        </button>
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
          <div className={styles.pagination}>
            <button className={styles.paginationBtn}>
              <Icon icon="mdi:chevron-double-left" width={18} height={18} />
            </button>
            <button className={styles.paginationBtn}>
              <Icon icon="mdi:chevron-left" width={18} height={18} />
            </button>
            <span className={styles.pageNumber}>1</span>
            <button className={styles.paginationBtn}>
              <Icon icon="mdi:chevron-right" width={18} height={18} />
            </button>
            <button className={styles.paginationBtn}>
              <Icon icon="mdi:chevron-double-right" width={18} height={18} />
            </button>
            <SelectComponent
              className={styles.itemsPerPageSelect}
              value={50}
              onChange={() => {}}
              options={[
                { value: 50, label: '50' },
                { value: 100, label: '100' },
              ]}
              placeholder="50"
              isSearchable={false}
            />
            <span className={styles.paginationInfo}>Items per page</span>
            <span className={styles.paginationTotal}>1 - {filteredAgents.length} of {MOCK_AGENTS.length} Items</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentMonitorSettings;
