"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../../shared-settings-styles.module.css';
const CreateBenchmark = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    benchmarkName: '',
    description: '',
    tags: 'Add Tags',
  });
  return (
    <>
      <div className={styles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        <div className={styles.contentArea} style={{padding: '20px'}}>
          <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
            <div className={styles.formGroup} style={{flex: 1}}>
              <label className={styles.formLabel}>Benchmark Name <span style={{color: 'var(--color-danger)'}}>*</span></label>
              <input 
                type="text" 
                className={styles.formInput}
                placeholder="Benchmark Name"
                value={formData.benchmarkName}
                onChange={(e) => setFormData({...formData, benchmarkName: e.target.value})}
              />
            </div>
            <div className={styles.formGroup} style={{flex: 1}}>
              <label className={styles.formLabel}>Description</label>
              <input 
                type="text" 
                className={styles.formInput}
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div className={styles.formGroup} style={{flex: 1}}>
              <label className={styles.formLabel}>Tags</label>
              <SelectComponent
                className={styles.formSelect}
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                options={[{ value: 'Add Tags', label: 'Add Tags' }]}
                placeholder="Add Tags"
              />
            </div>
          </div>
          <div style={{
            border: '1px solid var(--color-border)', 
            borderRadius: '4px', 
            padding: '10px 15px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-bg-secondary)',
            marginBottom: '20px'
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <Icon icon="mdi:drag-vertical" width={20} height={20} style={{color: 'var(--color-text-secondary)', cursor: 'grab'}} />
              <Icon icon="mdi:chevron-right" width={20} height={20} />
              <span style={{fontSize: '14px'}}>1 Enter Name</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <Icon icon="mdi:check" width={18} height={18} style={{color: 'var(--color-success)', cursor: 'pointer'}} />
              <Icon icon="mdi:plus-circle-outline" width={18} height={18} style={{color: 'var(--color-text-secondary)', cursor: 'pointer'}} />
              <Icon icon="mdi:link-variant" width={18} height={18} style={{color: 'var(--color-text-secondary)', cursor: 'pointer'}} />
              <Icon icon="mdi:trash-can-outline" width={18} height={18} style={{color: 'var(--color-danger)', cursor: 'pointer'}} />
            </div>
          </div>
          <button className={styles.btnSecondary} style={{border: '1px solid var(--color-primary)', color: 'var(--color-primary)'}}>
            Add Rule Group
          </button>
        </div>
        {/* Footer */}
        <div style={{
          position: 'fixed', 
          bottom: 0, 
          right: 0, 
          width: '100%',
          backgroundColor: 'var(--color-bg-primary)', 
          borderTop: '1px solid var(--color-border)', 
          padding: '15px 30px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          zIndex: 10
        }}>
          <button className={styles.btnSecondary}>Reset</button>
          <button className={styles.btnPrimary}>Create Benchmark</button>
        </div>
      </div>
    </>
  );
};
export default CreateBenchmark;
