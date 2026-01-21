import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

// Available tags (this could come from API)
const AVAILABLE_TAGS = [
  'Production',
  'Development',
  'Staging',
  'Critical',
  'High-Priority',
  'Low-Priority',
  'Network',
  'Server',
  'Database',
  'Firewall',
  'Router',
  'Switch',
  'Linux',
  'Windows',
  'VMware',
  'Cloud',
  'On-Premise',
  'Monitoring',
  'Backup',
  'Security',
];

export const TagSelector = ({
  selectedTags = [],
  onChange,
  placeholder = 'Add Tags',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  const filteredTags = AVAILABLE_TAGS.filter(
    (tag) =>
      !selectedTags.includes(tag) &&
      tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      onChange([...selectedTags, tag]);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onChange(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleCreateNewTag = () => {
    if (searchQuery.trim() && !selectedTags.includes(searchQuery.trim())) {
      onChange([...selectedTags, searchQuery.trim()]);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.tagSelector} ref={dropdownRef}>
      {/* Selected Tags Display */}
      {selectedTags.length > 0 && (
        <div className={styles.selectedTags}>
          {selectedTags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
              <button
                type="button"
                className={styles.tagRemove}
                onClick={() => handleRemoveTag(tag)}
              >
                <Icon icon="mdi:close" width={14} height={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Tag Input Dropdown */}
      <div className={styles.dropdownContainer}>
        <button
          type="button"
          className={styles.dropdownButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={styles.dropdownPlaceholder}>{placeholder}</span>
          <Icon
            icon="mdi:chevron-down"
            width={16}
            height={16}
            className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          />
        </button>

        {isOpen && (
          <div className={styles.dropdownMenu}>
            <div className={styles.searchBox}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search or create tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (filteredTags.length > 0) {
                      handleAddTag(filteredTags[0]);
                    } else if (searchQuery.trim()) {
                      handleCreateNewTag();
                    }
                  }
                }}
                autoFocus
              />
            </div>

            <div className={styles.tagList}>
              {filteredTags.length > 0 ? (
                filteredTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={styles.tagOption}
                    onClick={() => handleAddTag(tag)}
                  >
                    {tag}
                  </button>
                ))
              ) : (
                <div className={styles.noResults}>
                  {searchQuery ? (
                    <button
                      type="button"
                      className={styles.createTagBtn}
                      onClick={handleCreateNewTag}
                    >
                      Create "{searchQuery}"
                    </button>
                  ) : (
                    <span className={styles.noResultsText}>
                      No tags available
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
