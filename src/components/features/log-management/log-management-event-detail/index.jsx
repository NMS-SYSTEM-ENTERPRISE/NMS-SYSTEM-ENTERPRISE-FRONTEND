'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/log-management/shared/styles.module.css';
import { useLogManagement } from '@/hooks/log-management';
import { MOCK_EVENT_EXTENDED_ATTRIBUTES } from '@/utils/dummy-data/log-management';

const getSeverityIcon = (severity) => {
  const key = severity.toLowerCase();
  if (key === 'critical') return 'mdi:alert-octagon';
  if (key === 'warning') return 'mdi:alert';
  return 'mdi:information';
};

export const LogManagementEventDetail = () => {
  const { showEventDetail, selectedEvent, closeEventDetail } = useLogManagement();

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
                  onClick={() => navigator.clipboard.writeText(selectedEvent.message)}
                  title="Copy Log Message"
                >
                  <Icon icon="mdi:content-copy" width={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={sharedStyles.miniActionBtn}
                  title="Share Event"
                >
                  <Icon icon="mdi:share-variant" width={16} />
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
                  <div className={sharedStyles.metaValueText}>{selectedEvent.timestamp}</div>
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
              </div>
            </div>

            <div className={sharedStyles.detailSection}>
              <div className={sharedStyles.detailHeaderWithTabs}>
                <div className={sharedStyles.detailHeaderSmall}>
                  <Icon icon="mdi:text-box-outline" width={16} />
                  <span>Log Message</span>
                </div>
                <div className={sharedStyles.viewToggle}>
                  <button type="button" className={`${sharedStyles.toggleBtn} ${sharedStyles.active}`}>
                    Parsed
                  </button>
                  <button type="button" className={sharedStyles.toggleBtn}>
                    Raw
                  </button>
                </div>
              </div>
              <div className={sharedStyles.messageBox}>
                <div className={sharedStyles.parsedMessage}>
                  {selectedEvent.message.split(', ').map((part, i) => (
                    <div key={i} className={sharedStyles.logPart}>
                      {part.includes(':') ? (
                        <>
                          <span className={sharedStyles.partKey}>{part.split(': ')[0]}:</span>
                          <span className={sharedStyles.partVal}>{part.split(': ')[1]}</span>
                        </>
                      ) : (
                        <span className={sharedStyles.partText}>{part}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={sharedStyles.detailSection}>
              <div className={sharedStyles.detailHeaderSmall}>
                <Icon icon="mdi:xml" width={16} />
                <span>Extended Attributes</span>
              </div>
              <div className={sharedStyles.attributesGrid}>
                {MOCK_EVENT_EXTENDED_ATTRIBUTES.map((attr) => (
                  <div key={attr.key} className={sharedStyles.attrTag}>
                    <span className={sharedStyles.attrKey}>{attr.key}:</span>
                    <span className={sharedStyles.attrVal}>{attr.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
