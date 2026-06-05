'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/log-management/shared/styles.module.css';
import { useLogManagement } from '@/hooks/log-management';
import { toast } from 'sonner';

const getSeverityIcon = (severity) => {
  const key = severity?.toLowerCase();
  if (key === 'critical' || key === 'error' || key === 'alert' || key === 'emergency') return 'mdi:alert-circle';
  if (key === 'warning' || key === 'notice') return 'mdi:alert';
  return 'mdi:information';
};

const formatTimestamp = (ts) => {
  if (!ts) return '';
  const date = new Date(ts);
  return isNaN(date.getTime()) ? ts : date.toLocaleString('en-US', { hour12: false }).replace(',', '');
};

export const LogManagementEventDetail = () => {
  const { showEventDetail, selectedEvent, closeEventDetail } = useLogManagement();
  const [activeTab, setActiveTab] = useState('parsed');

  useEffect(() => {
    if (selectedEvent) {
      setActiveTab('parsed');
    }
  }, [selectedEvent]);

  const handleCopyMessage = () => {
    if (!selectedEvent) return;
    navigator.clipboard.writeText(selectedEvent.message);
    toast.success('Log message copied to clipboard');
  };

  const handleCopyAllDetails = () => {
    if (!selectedEvent) return;
    const text = `Event ID: ${selectedEvent.id}
Timestamp: ${formatTimestamp(selectedEvent.timestamp)}
Severity: ${selectedEvent.severity.toUpperCase()}
Source: ${selectedEvent.source}
Category: ${selectedEvent.category}
Log Type: ${selectedEvent.type}
Message: ${selectedEvent.message}`;
    navigator.clipboard.writeText(text);
    toast.success('All event details copied to clipboard');
  };

  if (!showEventDetail) return null;

  return (
    <>
      <div
        className={sharedStyles.detailOverlay}
        onClick={closeEventDetail}
        role="presentation"
      />
      <aside
        className={`${sharedStyles.detailSidebar} ${showEventDetail ? sharedStyles.detailSidebarOpen : ''}`}
      >
        <div className={sharedStyles.detailSidebarHeader}>
          <div className={sharedStyles.detailSidebarTitle}>
            <div className={sharedStyles.detailTitleIcon}>
              <Icon icon="mdi:format-list-bulleted-type" width={18} />
            </div>
            <div className={sharedStyles.detailTitleText}>
              <h2>Event Detail</h2>
              <span>Inspect log metadata & content</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={sharedStyles.detailSidebarClose}
            onClick={closeEventDetail}
          >
            <Icon icon="mdi:close" width={20} height={20} />
          </Button>
        </div>

        {selectedEvent && (
          <div className={sharedStyles.detailSidebarBody}>
            <div className={sharedStyles.detailActionBar}>
              <div
                className={sharedStyles.detailSeverityCard}
                data-severity={selectedEvent.severity.toLowerCase()}
              >
                <Icon icon={getSeverityIcon(selectedEvent.severity)} width={20} />
                <span className={sharedStyles.severityValue}>{selectedEvent.severity}</span>
              </div>
              <div className={sharedStyles.detailQuickActions}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={sharedStyles.miniActionBtn}
                  onClick={handleCopyMessage}
                  title="Copy Log Message"
                >
                  <Icon icon="mdi:content-copy" width={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={sharedStyles.miniActionBtn}
                  onClick={handleCopyAllDetails}
                  title="Copy All Details"
                >
                  <Icon icon="mdi:clipboard-text-outline" width={16} />
                </Button>
              </div>
            </div>

            <div className={sharedStyles.detailSection}>
              <div className={sharedStyles.detailHeaderSmall}>
                <Icon icon="mdi:card-account-details-outline" width={16} />
                <span>Core Metadata</span>
              </div>
              <div className={sharedStyles.metadataCard}>
                <div className={sharedStyles.metaRow}>
                  <label>Timestamp</label>
                  <div className={sharedStyles.metaValueText}>{formatTimestamp(selectedEvent.timestamp)}</div>
                </div>
                <div className={sharedStyles.metaRow}>
                  <label>Source Host</label>
                  <div className={`${sharedStyles.metaValueText} ${sharedStyles.highlightText}`}>
                    {selectedEvent.source}
                  </div>
                </div>
                <div className={sharedStyles.metaRow}>
                  <label>Category</label>
                  <div className={sharedStyles.metaValueText}>{selectedEvent.category}</div>
                </div>
                <div className={sharedStyles.metaRow}>
                  <label>Log Type</label>
                  <div className={sharedStyles.metaValueText}>
                    <span className={sharedStyles.badge} data-type="info">
                      {selectedEvent.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className={sharedStyles.detailSection}>
              <div className={sharedStyles.detailHeaderWithTabs}>
                <div className={sharedStyles.detailHeaderSmall}>
                  <Icon icon="mdi:text-box-outline" width={16} />
                  <span>Log Message</span>
                </div>
                <div className={sharedStyles.viewToggle}>
                  <button
                    type="button"
                    className={`${sharedStyles.toggleBtn} ${activeTab === 'parsed' ? sharedStyles.active : ''}`}
                    onClick={() => setActiveTab('parsed')}
                  >
                    Parsed
                  </button>
                  <button
                    type="button"
                    className={`${sharedStyles.toggleBtn} ${activeTab === 'raw' ? sharedStyles.active : ''}`}
                    onClick={() => setActiveTab('raw')}
                  >
                    Raw
                  </button>
                </div>
              </div>
              <div className={sharedStyles.messageBox}>
                {activeTab === 'parsed' ? (
                  <div className={sharedStyles.parsedMessage}>
                    {selectedEvent.message.split(', ').map((part, i) => {
                      const sepIdx = part.indexOf(': ');
                      if (sepIdx !== -1) {
                        const key = part.slice(0, sepIdx);
                        const val = part.slice(sepIdx + 2);
                        return (
                          <div key={i} className={sharedStyles.logPart}>
                            <span className={sharedStyles.partKey}>{key}:</span>
                            <span className={sharedStyles.partVal}>{val}</span>
                          </div>
                        );
                      }
                      return (
                        <div key={i} className={sharedStyles.logPart}>
                          <span className={sharedStyles.partText}>{part}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className={sharedStyles.rawMessage}>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontFamily: 'var(--font-geist-mono), monospace', fontSize: '12px', color: '#94a3b8', lineHeight: '1.5' }}>
                      {selectedEvent.message}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            <div className={sharedStyles.detailSection}>
              <div className={sharedStyles.detailHeaderSmall}>
                <Icon icon="mdi:xml" width={16} />
                <span>Extended Attributes</span>
              </div>
              <div className={sharedStyles.attributesGrid}>
                {selectedEvent.extendedAttributes && selectedEvent.extendedAttributes.length > 0 ? (
                  selectedEvent.extendedAttributes.map((attr) => (
                    <div key={attr.key} className={sharedStyles.attrTag}>
                      <span className={sharedStyles.attrKey}>{attr.key}:</span>
                      <span className={sharedStyles.attrVal}>{attr.val}</span>
                    </div>
                  ))
                ) : (
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No extended attributes found</span>
                )}
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
