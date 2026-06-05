'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/reports/shared/styles.module.css';
import { useReports } from '@/hooks/reports';
import { REPORT_TABS } from '@/utils/constants/reports';

export const ReportsSidebar = () => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    categories = [],
  } = useReports();

  const [isTabDropdownOpen, setIsTabDropdownOpen] = useState(false);

  return (
    <aside
      className={`${sharedStyles.sidebar} ${!isSidebarOpen ? sharedStyles.sidebarCollapsed : ''}`}
    >
      <div className={sharedStyles.sidebarHeader}>
        <span
          className={`${sharedStyles.sidebarTitle} ${!isSidebarOpen ? sharedStyles.hidden : ''}`}
        >
          CATEGORIES
        </span>
        <Button
          variant="ghost"
          size="icon"
          className={sharedStyles.collapseBtn}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Icon icon={isSidebarOpen ? 'mdi:menu-open' : 'mdi:menu'} width={20} />
        </Button>
      </div>

      {isSidebarOpen && (
        <div style={{ padding: '12px', position: 'relative' }}>
          <button
            type="button"
            onClick={() => setIsTabDropdownOpen(!isTabDropdownOpen)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '10px 14px',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              outline: 'none',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon icon="mdi:database" width={16} style={{ color: 'var(--color-accent-cyan)' }} />
              <span>{activeTab.toUpperCase()}</span>
            </div>
            <Icon icon={isTabDropdownOpen ? "mdi:chevron-up" : "mdi:chevron-down"} width={16} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
          </button>

          {isTabDropdownOpen && (
            <>
              <div 
                onClick={() => setIsTabDropdownOpen(false)} 
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 }} 
              />
              <div style={{
                position: 'absolute',
                top: 'calc(100% - 6px)',
                left: '12px',
                right: '12px',
                background: '#0b0f19',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
                zIndex: 101,
                maxHeight: '260px',
                overflowY: 'auto',
                padding: '6px'
              }}>
                {REPORT_TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab);
                      setIsTabDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      background: activeTab === tab ? 'var(--color-accent-cyan)' : 'transparent',
                      color: activeTab === tab ? '#000' : 'var(--color-text-secondary)',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left'
                    }}
                  >
                    <Icon icon="mdi:checkbox-blank-circle-outline" width={12} />
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {isSidebarOpen && (
        <div style={{ height: '1px', width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.06)' }} />
      )}

      <nav className={sharedStyles.categoryNav}>
        <div className={sharedStyles.treeRoot}>
          <Icon icon="mdi:chart-bar" className={sharedStyles.rootIcon} width={18} />
          <span className={sharedStyles.rootLabel}>Report Types</span>
        </div>

        <div className={sharedStyles.treeChildren}>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`${sharedStyles.categoryItem} ${
                selectedCategory === category.id ? sharedStyles.categoryItemActive : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
              title={!isSidebarOpen ? category.label : ''}
            >
              <div className={sharedStyles.treeBranch} />
              <div className={sharedStyles.itemIconWrapper}>
                <Icon icon={category.icon} width={18} />
              </div>
              <span className={sharedStyles.navText}>{category.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
};
