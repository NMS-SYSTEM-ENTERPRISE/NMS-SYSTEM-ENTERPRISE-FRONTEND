'use client';

import { createContext, useCallback, useState } from 'react';
import {
  DEFAULT_ACTIVE_WIDGET_TAB,
  DEFAULT_CONFIG_TAB,
  DEFAULT_WIDGET_FORM,
} from '@/utils/constants/dashboard-custom';
import { INITIAL_DASHBOARD_WIDGETS } from '@/utils/dummy-data/dashboard-custom';

export const DashboardCustomContext = createContext(null);

export const DashboardCustomProvider = ({ children }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [activeTab, setActiveTab] = useState(DEFAULT_ACTIVE_WIDGET_TAB);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [configTab, setConfigTab] = useState(DEFAULT_CONFIG_TAB);
  const [widgets, setWidgets] = useState(INITIAL_DASHBOARD_WIDGETS);
  const [activeHeaderAction, setActiveHeaderAction] = useState(null);
  const [widgetForm, setWidgetForm] = useState(DEFAULT_WIDGET_FORM);

  const resetForm = useCallback(() => {
    setWidgetForm({ ...DEFAULT_WIDGET_FORM, thresholds: [...DEFAULT_WIDGET_FORM.thresholds] });
    setConfigTab(DEFAULT_CONFIG_TAB);
  }, []);

  const updateFormField = useCallback((field, value) => {
    setWidgetForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleAddWidget = useCallback(
    (widget) => {
      setSelectedWidget(widget);
      setActiveTab(widget.name);
      setShowCreateModal(true);
      resetForm();
    },
    [resetForm]
  );

  const handleCreateWidget = useCallback(() => {
    const newWidget = {
      id: Date.now(),
      type: activeTab,
      title: widgetForm.name || `New ${activeTab}`,
      config: { ...widgetForm },
    };
    setWidgets((prev) => [...prev, newWidget]);
    setShowCreateModal(false);
    resetForm();
  }, [activeTab, widgetForm, resetForm]);

  const handleDeleteWidget = useCallback((widgetId) => {
    setWidgets((prev) => prev.filter((w) => w.id !== widgetId));
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowCreateModal(false);
  }, []);

  const toggleSidebarCollapsed = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  const value = {
    showCreateModal,
    setShowCreateModal,
    selectedWidget,
    activeTab,
    setActiveTab,
    isSidebarCollapsed,
    toggleSidebarCollapsed,
    configTab,
    setConfigTab,
    widgets,
    activeHeaderAction,
    setActiveHeaderAction,
    widgetForm,
    updateFormField,
    handleAddWidget,
    handleCreateWidget,
    handleDeleteWidget,
    handleCloseModal,
    resetForm,
  };

  return (
    <DashboardCustomContext.Provider value={value}>{children}</DashboardCustomContext.Provider>
  );
};
