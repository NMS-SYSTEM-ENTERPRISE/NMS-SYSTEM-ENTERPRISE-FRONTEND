"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../../shared-settings-styles.module.css';
const CreateComplianceRule = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    ruleCheckIn: 'Config File',
    ruleConfiguration: 'Basic',
    condition: 'Select',
    resultPattern: '',
    occurrence: 'Select',
    remediationAction: 'Select',
    
    // Step 2
    ruleName: '',
    description: '',
    severity: 'High',
    tags: 'Add Tags',
    rationale: '',
    impact: '',
    defaultValue: '',
    references: '',
    additionalInfo: '',
    controlName: 'Select',
  });
  const handleNext = () => {
    setCurrentStep(2);
  };
  const handleReset = () => {
    // Reset logic
  };
  return (
    <>
      <div className={styles.mainContent} style={{marginLeft: 0, width: '100%'}}>
        <div style={{display: 'flex', height: 'calc(100vh - 60px)'}}>
          {/* Left Sidebar Steps */}
          <div style={{width: '250px', borderRight: '1px solid var(--color-border)', padding: '20px'}}>
            <div 
              style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                marginBottom: '20px', 
                cursor: 'pointer',
                color: currentStep === 1 ? 'var(--color-primary)' : 'var(--color-text-secondary)'
              }}
              onClick={() => setCurrentStep(1)}
            >
              <div style={{
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                border: `1px solid ${currentStep === 1 ? 'var(--color-primary)' : 'var(--color-text-secondary)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
              }}>
                {currentStep > 1 ? <Icon icon="mdi:check" /> : '1'}
              </div>
              <span style={{fontSize: '14px', fontWeight: currentStep === 1 ? '500' : '400'}}>Audit & Remediation Properties</span>
            </div>
            <div 
              style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                cursor: 'pointer',
                color: currentStep === 2 ? 'var(--color-primary)' : 'var(--color-text-secondary)'
              }}
              onClick={() => setCurrentStep(2)}
            >
              <div style={{
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                border: `1px solid ${currentStep === 2 ? 'var(--color-primary)' : 'var(--color-text-secondary)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
              }}>
                2
              </div>
              <span style={{fontSize: '14px', fontWeight: currentStep === 2 ? '500' : '400'}}>General Properties</span>
            </div>
          </div>
          {/* Content Area */}
          <div style={{flex: 1, padding: '20px', overflowY: 'auto'}}>
            {currentStep === 1 && (
              <div style={{maxWidth: '800px'}}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Rule Check In <span style={{color: 'var(--color-danger)'}}>*</span></label>
                  <div className={styles.buttonGroup}>
                    <button 
                      className={`${styles.modeBtn} ${formData.ruleCheckIn === 'Config File' ? styles.modeBtnActive : ''}`}
                      onClick={() => setFormData({...formData, ruleCheckIn: 'Config File'})}
                    >
                      Config File
                    </button>
                    <button 
                      className={`${styles.modeBtn} ${formData.ruleCheckIn === 'CLI' ? styles.modeBtnActive : ''}`}
                      onClick={() => setFormData({...formData, ruleCheckIn: 'CLI'})}
                    >
                      CLI
                    </button>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Rule Configuration <span style={{color: 'var(--color-danger)'}}>*</span></label>
                  <div className={styles.buttonGroup}>
                    <button 
                      className={`${styles.modeBtn} ${formData.ruleConfiguration === 'Basic' ? styles.modeBtnActive : ''}`}
                      onClick={() => setFormData({...formData, ruleConfiguration: 'Basic'})}
                    >
                      Basic
                    </button>
                    <button 
                      className={`${styles.modeBtn} ${formData.ruleConfiguration === 'Advanced' ? styles.modeBtnActive : ''}`}
                      onClick={() => setFormData({...formData, ruleConfiguration: 'Advanced'})}
                    >
                      Advanced
                    </button>
                  </div>
                </div>
                <h3 style={{fontSize: '16px', color: 'var(--color-primary)', marginBottom: '15px', marginTop: '30px'}}>Rule Condition</h3>
                
                <div style={{display: 'flex', gap: '20px', alignItems: 'flex-end'}}>
                  <div className={styles.formGroup} style={{flex: 1}}>
                    <label className={styles.formLabel}>Condition <span style={{color: 'var(--color-danger)'}}>*</span></label>
                    <SelectComponent
                      className={styles.formSelect}
                      value={formData.condition}
                      onChange={(e) => setFormData({...formData, condition: e.target.value})}
                      options={[{ value: 'Select', label: 'Select' }]}
                      placeholder="Select"
                    />
                  </div>
                  <div className={styles.formGroup} style={{flex: 2}}>
                    <label className={styles.formLabel}>Result Pattern <span style={{color: 'var(--color-danger)'}}>*</span></label>
                    <input 
                      type="text" 
                      className={styles.formInput}
                      value={formData.resultPattern}
                      onChange={(e) => setFormData({...formData, resultPattern: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGroup} style={{flex: 1}}>
                    <label className={styles.formLabel}>Occurrence <span style={{color: 'var(--color-danger)'}}>*</span></label>
                    <SelectComponent
                      className={styles.formSelect}
                      value={formData.occurrence}
                      onChange={(e) => setFormData({...formData, occurrence: e.target.value})}
                      options={[{ value: 'Select', label: 'Select' }]}
                      placeholder="Select"
                    />
                  </div>
                  <div style={{marginBottom: '10px'}}>
                    <Icon icon="mdi:plus-circle-outline" width={24} height={24} style={{color: 'var(--color-primary)', cursor: 'pointer'}} />
                  </div>
                </div>
                <h3 style={{fontSize: '16px', color: 'var(--color-primary)', marginBottom: '15px', marginTop: '30px'}}>Remediation Action</h3>
                
                <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                  <div className={styles.formGroup} style={{flex: 1}}>
                    <label className={styles.formLabel}>Action to be taken</label>
                    <SelectComponent
                      className={styles.formSelect}
                      value={formData.remediationAction}
                      onChange={(e) => setFormData({...formData, remediationAction: e.target.value})}
                      options={[{ value: 'Select', label: 'Select' }]}
                      placeholder="Select"
                    />
                  </div>
                  <button className={styles.btnSecondary} style={{marginTop: '10px'}}>
                    Create Runbook
                  </button>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div style={{maxWidth: '800px'}}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Rule Name <span style={{color: 'var(--color-danger)'}}>*</span></label>
                  <input 
                    type="text" 
                    className={styles.formInput}
                    value={formData.ruleName}
                    onChange={(e) => setFormData({...formData, ruleName: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Description</label>
                  <input 
                    type="text" 
                    className={styles.formInput}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Rule Severity <span style={{color: 'var(--color-danger)'}}>*</span></label>
                  <div className={styles.buttonGroup}>
                    {['Critical', 'High', 'Medium', 'Low', 'Info'].map(severity => (
                      <button 
                        key={severity}
                        className={`${styles.modeBtn} ${formData.severity === severity ? styles.modeBtnActive : ''}`}
                        onClick={() => setFormData({...formData, severity})}
                        style={{
                          backgroundColor: formData.severity === severity ? 'var(--color-primary)' : 'transparent',
                          color: formData.severity === severity ? '#fff' : 'inherit'
                        }}
                      >
                        {severity}
                      </button>
                    ))}
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Tags</label>
                  <SelectComponent
                    className={styles.formSelect}
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    options={[{ value: 'Add Tags', label: 'Add Tags' }]}
                    placeholder="Add Tags"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Rationale</label>
                  <textarea 
                    className={styles.formInput}
                    style={{height: '80px', resize: 'none'}}
                    placeholder="Add text here"
                    value={formData.rationale}
                    onChange={(e) => setFormData({...formData, rationale: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Impact</label>
                  <textarea 
                    className={styles.formInput}
                    style={{height: '80px', resize: 'none'}}
                    placeholder="Add text here"
                    value={formData.impact}
                    onChange={(e) => setFormData({...formData, impact: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Default Value</label>
                  <textarea 
                    className={styles.formInput}
                    style={{height: '80px', resize: 'none'}}
                    placeholder="Add text here"
                    value={formData.defaultValue}
                    onChange={(e) => setFormData({...formData, defaultValue: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>References</label>
                  <textarea 
                    className={styles.formInput}
                    style={{height: '80px', resize: 'none'}}
                    placeholder="Add text here"
                    value={formData.references}
                    onChange={(e) => setFormData({...formData, references: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Additional Information</label>
                  <textarea 
                    className={styles.formInput}
                    style={{height: '80px', resize: 'none'}}
                    placeholder="Add text here"
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Control's Name</label>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <SelectComponent
                      className={styles.formSelect}
                      value={formData.controlName}
                      onChange={(e) => setFormData({...formData, controlName: e.target.value})}
                      options={[{ value: 'Select', label: 'Select' }]}
                      placeholder="Select"
                    />
                    <button style={{background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer'}}>
                      <Icon icon="mdi:close" width={18} height={18} />
                    </button>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Control's Description</label>
                  <div style={{color: 'var(--color-text-secondary)', fontSize: '14px', padding: '10px 0'}}>
                    Description
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Footer */}
        <div style={{
          position: 'fixed', 
          bottom: 0, 
          right: 0, 
          // Actually, the main content is full width.
          width: '100%',
          backgroundColor: 'var(--color-bg-primary)', 
          borderTop: '1px solid var(--color-border)', 
          padding: '15px 30px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          zIndex: 10
        }}>
          <button className={styles.btnSecondary} onClick={handleReset}>Reset</button>
          {currentStep === 1 ? (
            <button className={styles.btnPrimary} onClick={handleNext}>Next</button>
          ) : (
            <button className={styles.btnPrimary} onClick={() => console.log('Finish')}>Finish</button>
          )}
        </div>
      </div>
    </>
  );
};
export default CreateComplianceRule;
