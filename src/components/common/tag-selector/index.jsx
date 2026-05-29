'use client';

import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { DEFAULT_AVAILABLE_TAGS } from './constants';
import { TagFormModal } from './TagFormModal';
import { TagListItem } from './TagListItem';
import styles from './styles.module.css';

export const TagSelector = ({
  selectedTags = [],
  onChange,
  placeholder = 'Add Tags',
  availableTags: controlledAvailableTags,
  onAvailableTagsChange,
}) => {
  const [internalAvailableTags, setInternalAvailableTags] = useState(DEFAULT_AVAILABLE_TAGS);
  const availableTags = controlledAvailableTags ?? internalAvailableTags;
  const setAvailableTags = onAvailableTagsChange ?? setInternalAvailableTags;

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tagForm, setTagForm] = useState({ open: false, mode: 'create', initialName: '' });
  const [tagToDelete, setTagToDelete] = useState(null);
  const dropdownRef = useRef(null);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredTags = availableTags.filter(
    (tag) =>
      !selectedTags.includes(tag) &&
      tag.toLowerCase().includes(normalizedQuery)
  );

  const canCreateFromQuery =
    normalizedQuery &&
    !availableTags.some((t) => t.toLowerCase() === normalizedQuery);

  const handleAddTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      onChange([...selectedTags, tag]);
    }
    setSearchQuery('');
  };

  const handleRemoveTag = (tagToRemove) => {
    onChange(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  const handleCreateFromInput = () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    const existing = availableTags.find(
      (t) => t.toLowerCase() === trimmed.toLowerCase()
    );
    const tagName = existing || trimmed;

    if (!existing) {
      setAvailableTags([...availableTags, trimmed]);
    }
    if (!selectedTags.includes(tagName)) {
      onChange([...selectedTags, tagName]);
    }
    setSearchQuery('');
  };

  const openCreateModal = () => {
    setTagForm({ open: true, mode: 'create', initialName: searchQuery.trim() });
  };

  const openEditModal = (tag) => {
    setTagForm({ open: true, mode: 'edit', initialName: tag });
  };

  const handleTagFormSave = (newName) => {
    if (tagForm.mode === 'create') {
      if (!availableTags.includes(newName)) {
        setAvailableTags([...availableTags, newName]);
      }
      handleAddTag(newName);
      setSearchQuery('');
      return;
    }

    const oldName = tagForm.initialName;
    if (oldName === newName) return;

    setAvailableTags(
      availableTags.map((t) => (t === oldName ? newName : t))
    );
    onChange(
      selectedTags.map((t) => (t === oldName ? newName : t))
    );
  };

  const confirmDeleteTag = () => {
    if (!tagToDelete) return;
    setAvailableTags(availableTags.filter((t) => t !== tagToDelete));
    onChange(selectedTags.filter((t) => t !== tagToDelete));
    setTagToDelete(null);
  };

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
    <>
      <div className={styles.tagSelector} ref={dropdownRef}>
        {selectedTags.length > 0 && (
          <div className={styles.selectedTags}>
            {selectedTags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
                <button
                  type="button"
                  className={styles.tagRemove}
                  onClick={() => handleRemoveTag(tag)}
                  aria-label={`Remove ${tag}`}
                >
                  <Icon icon="mdi:close" width={14} height={14} />
                </button>
              </span>
            ))}
          </div>
        )}

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
                <div className={styles.searchRow}>
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search or create tag..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        if (canCreateFromQuery) {
                          handleCreateFromInput();
                        } else if (filteredTags.length > 0) {
                          handleAddTag(filteredTags[0]);
                        }
                      }
                    }}
                  />
                  <button
                    type="button"
                    className={styles.sendBtn}
                    title="Create tag"
                    onClick={() => {
                      if (canCreateFromQuery) {
                        handleCreateFromInput();
                      } else {
                        openCreateModal();
                      }
                    }}
                  >
                    <Icon icon="mdi:send" width={18} height={18} />
                  </button>
                </div>
              </div>

              <div className={styles.tagList}>
                {filteredTags.length > 0 ? (
                  filteredTags.map((tag) => (
                    <TagListItem
                      key={tag}
                      tag={tag}
                      onSelect={() => handleAddTag(tag)}
                      onEdit={() => openEditModal(tag)}
                      onDelete={() => setTagToDelete(tag)}
                    />
                  ))
                ) : (
                  <div className={styles.noResults}>
                    {canCreateFromQuery ? (
                      <p className={styles.noResultsHint}>
                        Press send or Enter to create &quot;{searchQuery.trim()}&quot;
                      </p>
                    ) : (
                      <span className={styles.noResultsText}>No matching tags</span>
                    )}
                  </div>
                )}
              </div>

              <div className={styles.dropdownFooter}>
                <button
                  type="button"
                  className={styles.footerAction}
                  onClick={openCreateModal}
                >
                  <Icon icon="mdi:plus" width={16} height={16} />
                  Create new tag
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <TagFormModal
        isOpen={tagForm.open}
        onClose={() => setTagForm({ open: false, mode: 'create', initialName: '' })}
        onSave={handleTagFormSave}
        mode={tagForm.mode}
        initialName={tagForm.initialName}
        existingTags={availableTags}
      />

      <DeleteConfirmationModal
        isOpen={Boolean(tagToDelete)}
        onClose={() => setTagToDelete(null)}
        onConfirm={confirmDeleteTag}
        itemName={tagToDelete || ''}
        itemType="Tag"
        warningText="This tag will be removed from the list and from any current selection."
      />
    </>
  );
};
