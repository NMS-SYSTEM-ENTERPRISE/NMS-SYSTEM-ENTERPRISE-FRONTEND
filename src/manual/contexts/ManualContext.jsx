'use client';

import { createContext, useContext, useState, useMemo } from 'react';
import { MANUAL_FEATURES, MANUAL_CATEGORIES } from '../utils/features-data';

const ManualContext = createContext(null);

export const ManualProvider = ({ children }) => {
  const [activeFeatureId, setActiveFeatureId] = useState('getting-started');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const filteredFeatures = useMemo(() => {
    let features = MANUAL_FEATURES;

    if (activeCategory !== 'all') {
      features = features.filter((f) => f.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      features = features.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q) ||
          f.overview.toLowerCase().includes(q) ||
          f.sections.some(
            (s) =>
              s.title.toLowerCase().includes(q) ||
              s.content.toLowerCase().includes(q)
          )
      );
    }

    return features;
  }, [activeCategory, searchQuery]);

  const activeFeature = useMemo(
    () => MANUAL_FEATURES.find((f) => f.id === activeFeatureId) || MANUAL_FEATURES[0],
    [activeFeatureId]
  );

  const selectFeature = (id) => {
    setActiveFeatureId(id);
    setActiveSectionIndex(0);
  };

  return (
    <ManualContext.Provider
      value={{
        activeFeature,
        activeFeatureId,
        selectFeature,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        filteredFeatures,
        activeSectionIndex,
        setActiveSectionIndex,
        categories: MANUAL_CATEGORIES,
        allFeatures: MANUAL_FEATURES,
      }}
    >
      {children}
    </ManualContext.Provider>
  );
};

export const useManual = () => {
  const ctx = useContext(ManualContext);
  if (!ctx) throw new Error('useManual must be used within ManualProvider');
  return ctx;
};
