'use client';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import styles from './styles.module.css';

import { useState } from 'react';

/**
 * SearchInput — Tag-based search input.
 *
 * Usage:
 * ```jsx
 * <SearchInput
 *   tags={searchTags}
 *   onTagsChange={(newTags) => setSearchTags(newTags)}
 *   placeholder="Search..."
 * />
 * ```
 */
const SearchInput = ({ tags = [], onTagsChange, placeholder = 'Search', className, ...props }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onTagsChange?.([...tags, trimmed]);
    }
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove last tag if input is empty
      const newTags = [...tags];
      newTags.pop();
      onTagsChange?.(newTags);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onTagsChange?.(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className={clsx(styles.searchBox, className)}>
      {tags.map((tag, idx) => (
        <span key={idx} className={styles.tagPill}>
          {tag}
          <button type="button" className={styles.tagRemoveBtn} onClick={() => handleRemoveTag(tag)}>
            <Icon icon="mdi:close" width={14} height={14} />
          </button>
        </span>
      ))}
      <input
        type="text"
        className={styles.input}
        placeholder={tags.length === 0 ? placeholder : ''}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        {...props}
      />
      <button type="button" onClick={handleAddTag} className={styles.searchIconBtn} title="Click to search">
        <Icon icon="mdi:magnify" width={18} height={18} />
      </button>
    </div>
  );
};

export { SearchInput };
