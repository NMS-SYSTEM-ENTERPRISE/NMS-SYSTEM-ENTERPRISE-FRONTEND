'use client';

import styles from '../styles/DeveloperDocsHeader.module.css';
import { Search, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { DeveloperDocsContext } from '../contexts/DeveloperDocsContext';

export default function DeveloperDocsHeader() {
  const { searchQuery, setSearchQuery } = useContext(DeveloperDocsContext);
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo/Title */}
        <div className={styles.brand}>
          <div className={styles.icon}>
            <span>📚</span>
          </div>
          <h1 className={styles.title}>Developer Documentation</h1>
        </div>

        {/* Search Bar */}
        <div className={`${styles.searchBox} ${isFocused ? styles.focused : ''}`}>
          <Search size={20} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={styles.input}
          />
          {searchQuery && (
            <button
              onClick={handleClear}
              className={styles.clearBtn}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Help */}
        <div className={styles.help}>
          <button className={styles.helpBtn} title="Help">
            ?
          </button>
        </div>
      </div>
    </header>
  );
}
