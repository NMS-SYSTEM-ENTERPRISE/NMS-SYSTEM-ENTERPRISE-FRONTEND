'use client';

import { createContext, useCallback, useMemo, useState } from 'react';

export const DeveloperDocsContext = createContext();

export const DeveloperDocsProvider = ({ children }) => {
  const [selectedSection, setSelectedSection] = useState('backend-architecture');
  const [expandedTopics, setExpandedTopics] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Documentation sections structure
  const sectionsByCategory = useMemo(
    () => ({
      backend: [
        { id: 'backend-architecture', title: 'Project Architecture & Setup', category: 'Backend' },
        { id: 'backend-database', title: 'Database Layer & Models', category: 'Backend' },
        { id: 'backend-services', title: 'Core Services & Data Ingestion', category: 'Backend' },
        { id: 'backend-api', title: 'API Layer & Routing', category: 'Backend' },
        { id: 'backend-auth', title: 'Security & Authentication', category: 'Backend' },
        { id: 'backend-performance', title: 'Performance & Scaling', category: 'Backend' },
        { id: 'backend-folder', title: 'Folder Structure', category: 'Backend' },
        { id: 'backend-codebase', title: 'Codebase Explanation', category: 'Backend' },
        { id: 'backend-features', title: 'Features Implemented', category: 'Backend' },
        { id: 'backend-git', title: 'Git & Version Control', category: 'Backend' },
        { id: 'backend-run', title: 'How to Run', category: 'Backend' },
      ],
      frontend: [
        { id: 'frontend-architecture', title: 'Architecture & Framework', category: 'Frontend' },
        { id: 'frontend-state', title: 'State Management & Ingestion', category: 'Frontend' },
        { id: 'frontend-components', title: 'UI Component Library', category: 'Frontend' },
        { id: 'frontend-charts', title: 'Data Visualization', category: 'Frontend' },
        { id: 'frontend-auth', title: 'Authentication & Access', category: 'Frontend' },
        { id: 'frontend-deployment', title: 'Deployment & Build', category: 'Frontend' },
      ],
      infrastructure: [
        { id: 'infra-overview', title: 'System Overview', category: 'Infrastructure' },
        { id: 'infra-dataflow', title: 'Data Flow Diagrams', category: 'Infrastructure' },
        { id: 'infra-protocols', title: 'Communication Protocols', category: 'Infrastructure' },
        { id: 'infra-deployment', title: 'Deployment Architecture', category: 'Infrastructure' },
        { id: 'infra-monitoring', title: 'Monitoring & Observability', category: 'Infrastructure' },
        { id: 'infra-scaling', title: 'Scaling & Performance', category: 'Infrastructure' },
      ],
    }),
    []
  );

  // Flatten sections array for easy lookup
  const sections = useMemo(() => {
    return Object.values(sectionsByCategory).flat();
  }, [sectionsByCategory]);

  const toggleTopic = useCallback((topicId) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  }, []);

  const value = {
    selectedSection,
    setSelectedSection,
    expandedTopics,
    toggleTopic,
    searchQuery,
    setSearchQuery,
    sections,
    sectionsByCategory,
  };

  return (
    <DeveloperDocsContext.Provider value={value}>{children}</DeveloperDocsContext.Provider>
  );
};
