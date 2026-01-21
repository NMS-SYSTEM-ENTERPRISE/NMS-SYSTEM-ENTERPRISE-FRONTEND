"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../../shared-settings-styles.module.css';
const MOCK_BENCHMARKS = [
  {
    id: 1,
    name: 'pmg test 1',
    description: 'this is for test',
    usedCount: 0,
    tags: [
      { label: 'test', color: 'var(--color-warning)' },
      { label: '+5', color: 'var(--color-warning)' }
    ],
  },
  {
    id: 2,
    name: 'CIS_Cisco_IOS_XE_16.x_Benchmark_v2.1.0',
    description: "Please see the below link for CIS's current terms of use: http...",
    usedCount: 1,
    tags: [
      { label: 'framework:cis', color: 'var(--color-warning)' },
      { label: '+2', color: 'var(--color-warning)' }
    ],
    isLocked: true,
  },
  {
    id: 3,
    name: 'CIS Cisco IOS XE 16.x Benchmark ---- test',
    description: "Please see the below link for our current terms of use: http:...",
    usedCount: 1,
    tags: [
      { label: 'cis', color: 'var(--color-warning)' },
      { label: '+4', color: 'var(--color-warning)' }
    ],
  },
];
const Benchmark = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [benchmarks, setBenchmarks] = useState(MOCK_BENCHMARKS);
  const filteredBenchmarks = benchmarks.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className={styles.mainContent}>
<div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <div>
              {/* Title area if needed, but image shows empty left side in content header row, just search and create button */}
            </div>
          </div>
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
            <Link href="/settings/compliance/benchmark/create" className={styles.btnPrimary}>
              Create Benchmark
            </Link>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>BENCHMARK</th>
                  <th>DESCRIPTION</th>
                  <th>USED COUNT</th>
                  <th>TAG</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredBenchmarks.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        {item.isLocked && <Icon icon="mdi:lock-outline" width={16} height={16} style={{color: 'var(--color-text-secondary)'}} />}
                        <a href="#" className={styles.linkBlue}>
                          {item.name}
                        </a>
                      </div>
                    </td>
                    <td>{item.description}</td>
                    <td>
                      <span className={styles.badgeInfo} style={{borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0}}>
                        {item.usedCount}
                      </span>
                    </td>
                    <td>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        {item.tags.map((tag, index) => (
                          <span key={index} className={styles.badge} style={{backgroundColor: 'rgba(255, 159, 28, 0.2)', color: tag.color}}>
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className={styles.actions}>
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
              options={[{ value: 50, label: '50' }]}
              placeholder="50"
              isSearchable={false}
            />
            <span className={styles.paginationInfo}>Items per page</span>
            <span className={styles.paginationTotal}>1 - 3 of 3 Items</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Benchmark;
