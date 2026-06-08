'use client';

import { createContext, useCallback, useContext, useState } from 'react';

/**
 * AppDataContext
 * Global context for managing application-wide state including:
 * - User Profile sidebar visibility
 * - Global UI state
 * - User related data
 */
const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [userData, setUserData] = useState(null);

  // Close sidebar immediately without delay
  const closeUserProfile = useCallback(() => {
    setShowUserProfile(false);
  }, []);

  // Open sidebar
  const openUserProfile = useCallback(() => {
    setShowUserProfile(true);
  }, []);

  // Toggle sidebar
  const toggleUserProfile = useCallback(() => {
    setShowUserProfile((prev) => !prev);
  }, []);

  const value = {
    showUserProfile,
    setShowUserProfile,
    closeUserProfile,
    openUserProfile,
    toggleUserProfile,
    userData,
    setUserData,
  };

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
};

/**
 * Hook to use AppDataContext
 * Usage: const { showUserProfile, closeUserProfile } = useAppData();
 */
export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider');
  }
  return context;
};

export default AppDataContext;
