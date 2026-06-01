'use client';

import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/reports-create-custom/shared/styles.module.css';
import { useReportsCreateCustom } from '@/hooks/reports-create-custom';

export const ReportsCreateSidebar = () => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    filteredCategories,
    totalTypeCount,
    openSections,
    toggleSection,
    selectedReportType,
    setSelectedReportType,
  } = useReportsCreateCustom();

  return (
    <div
      className={`${sharedStyles.leftPanel} ${!isSidebarOpen ? sharedStyles.leftPanelCollapsed : ''}`}
    >
      <div className={sharedStyles.panelHeader}>
        {isSidebarOpen && (
          <>
            <Icon icon="mdi:file-document-multiple" width={18} />
            <span>Report Types</span>
            <span className={sharedStyles.badge}>{totalTypeCount}</span>
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={`${sharedStyles.collapseBtn} ${
            isSidebarOpen ? sharedStyles.collapseBtnEnd : sharedStyles.collapseBtnStart
          }`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title={isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          <Icon
            icon={isSidebarOpen ? 'mdi:chevron-double-left' : 'mdi:chevron-double-right'}
            width={20}
          />
        </Button>
      </div>

      {!isSidebarOpen && (
        <div className={sharedStyles.collapsedView}>
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className={sharedStyles.collapsedCategoryIcon}
              title={category.label}
            >
              <Icon icon={category.icon} width={20} />
            </div>
          ))}
        </div>
      )}

      {isSidebarOpen && (
        <div className={sharedStyles.categoriesContainer}>
          {filteredCategories.map((category) => (
            <div key={category.id} className={sharedStyles.metricGroup}>
              <button
                type="button"
                className={sharedStyles.groupHeader}
                onClick={() => toggleSection(category.id)}
              >
                <Icon
                  icon={openSections[category.id] ? 'mdi:chevron-down' : 'mdi:chevron-right'}
                  width={16}
                  className={sharedStyles.groupChevron}
                />
                <div className={sharedStyles.groupHeaderContent}>
                  <Icon icon={category.icon} width={18} />
                  <span className={sharedStyles.groupTitle}>{category.label}</span>
                  <span className={sharedStyles.categoryBadge}>{category.types.length}</span>
                </div>
              </button>

              {openSections[category.id] && (
                <div className={sharedStyles.groupContent}>
                  {category.types.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      className={`${sharedStyles.metricItem} ${
                        selectedReportType?.id === type.id ? sharedStyles.metricItemActive : ''
                      }`}
                      onClick={() => setSelectedReportType(type)}
                    >
                      <span className={sharedStyles.metricItemLine} />
                      <div className={sharedStyles.typeIcon}>
                        <Icon icon={type.icon} width={16} />
                      </div>
                      <div className={sharedStyles.typeContent}>
                        <span className={sharedStyles.typeName}>{type.name}</span>
                        <span className={sharedStyles.typeDescription}>{type.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
