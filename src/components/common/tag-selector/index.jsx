'use client';

import { DeleteConfirmationModal } from '@/components/ui/delete-modal';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { TagFormModal } from './TagFormModal';
import styles from './styles.module.css';

/**
 * TagSelector — Fully dynamic, API-driven tag picker with Create/Edit/Delete modals.
 *
 * Props:
 * @param {Array}    selectedTags   — Currently selected tag IDs
 * @param {Function} onChange       — Called with updated array of selected tag IDs
 * @param {string}   [placeholder]  — Placeholder text
 * @param {string}   [noun]         — Label noun ("tag", "group", etc.)
 * @param {Function} onFetchTags    — Async fn that returns array of { id, name } from API
 * @param {Function} onCreateTag    — Async fn(name) that creates a tag via API, returns { id, name }
 * @param {Function} [onEditTag]    — Async fn({ id, name }) that edits a tag via API
 * @param {Function} [onDeleteTag]  — Async fn(id) that deletes a tag via API
 */
export const TagSelector = ({
  selectedTags = [],
  onChange,
  placeholder = 'Add Tags',
  noun = 'tag',
  onFetchTags,
  onCreateTag,
  onEditTag,
  onDeleteTag,
}) => {
  const [availableTags, setAvailableTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedSearchQuery, setAppliedSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Modal states
  const [tagForm, setTagForm] = useState({ open: false, mode: 'create', initialName: '', editId: null });
  const [tagToDelete, setTagToDelete] = useState(null);

  const dropdownRef = useRef(null);

  // Fetch tags from API on mount
  useEffect(() => {
    const loadTags = async () => {
      if (!onFetchTags) return;
      setIsLoading(true);
      try {
        const tags = await onFetchTags();
        if (Array.isArray(tags)) {
          setAvailableTags(tags);
        }
      } catch (err) {
        console.error('Failed to fetch tags:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const normalizedQuery = appliedSearchQuery.trim().toLowerCase();

  const filteredTags = availableTags.filter(
    (tag) =>
      !selectedTags.includes(tag.id) &&
      tag.name.toLowerCase().includes(normalizedQuery)
  );

  const handleAddTag = (tag) => {
    if (!selectedTags.includes(tag.id)) {
      onChange([...selectedTags, tag.id]);
    }
    setSearchQuery('');
    setAppliedSearchQuery('');
  };

  const handleRemoveTag = (tagId) => {
    onChange(selectedTags.filter((id) => id !== tagId));
  };

  const getTagName = (tagId) => {
    const found = availableTags.find((t) => t.id === tagId);
    return found ? found.name : tagId;
  };

  // ── Create Modal ──
  const openCreateModal = () => {
    setTagForm({ open: true, mode: 'create', initialName: '', editId: null });
  };

  // ── Edit Modal ──
  const openEditModal = (tag) => {
    setTagForm({ open: true, mode: 'edit', initialName: tag.name, editId: tag.id });
  };

  // ── Delete Confirmation ──
  const openDeleteConfirm = (tag) => {
    setTagToDelete(tag);
  };

  // ── Handle TagFormModal Save (Create or Edit) ──
  const handleTagFormSave = async (newName) => {
    if (tagForm.mode === 'create') {
      if (!onCreateTag) return;
      const newTag = await onCreateTag(newName);
      if (newTag && newTag.id) {
        setAvailableTags((prev) => [...prev, newTag]);
        if (!selectedTags.includes(newTag.id)) {
          onChange([...selectedTags, newTag.id]);
        }
      }
    } else if (tagForm.mode === 'edit') {
      if (!onEditTag || !tagForm.editId) return;
      const res = await onEditTag({ id: tagForm.editId, name: newName });
      if (res) {
        setAvailableTags((prev) =>
          prev.map((t) => (t.id === tagForm.editId ? { ...t, name: newName } : t))
        );
      }
    }
  };

  // ── Handle Delete Confirm ──
  const handleDeleteConfirm = async () => {
    if (!tagToDelete || !onDeleteTag) return;
    const res = await onDeleteTag(tagToDelete.id);
    if (res) {
      setAvailableTags((prev) => prev.filter((t) => t.id !== tagToDelete.id));
      onChange(selectedTags.filter((id) => id !== tagToDelete.id));
    }
    setTagToDelete(null);
  };

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setAppliedSearchQuery('');
    }
  }, [isOpen]);

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
            {selectedTags.map((tagId) => (
              <span key={tagId} className={styles.tag}>
                {getTagName(tagId)}
                <button
                  type="button"
                  className={styles.tagRemove}
                  onClick={() => handleRemoveTag(tagId)}
                  aria-label={`Remove ${getTagName(tagId)}`}
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
                    placeholder={`Search ${noun}s...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        setAppliedSearchQuery(searchQuery);
                      }
                    }}
                  />
                  <button
                    type="button"
                    className={styles.sendBtn}
                    title="Search"
                    onClick={() => setAppliedSearchQuery(searchQuery)}
                  >
                    <Icon icon="mdi:magnify" width={18} height={18} />
                  </button>
                </div>
              </div>

              <div className={styles.tagList}>
                {isLoading ? (
                  <div className={styles.noResults}>
                    <span className={styles.noResultsText}>Loading {noun}s...</span>
                  </div>
                ) : filteredTags.length > 0 ? (
                  filteredTags.map((tag) => (
                    <div key={tag.id} className={styles.tagListItem}>
                      <button
                        type="button"
                        className={styles.tagListItemSelect}
                        onClick={() => handleAddTag(tag)}
                      >
                        {tag.name}
                      </button>
                      <div className={styles.tagListItemActions}>
                        {onEditTag && (
                          <button
                            type="button"
                            className={styles.tagListItemAction}
                            title={`Edit ${noun}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(tag);
                            }}
                          >
                            <Icon icon="mdi:pencil" width={16} height={16} />
                          </button>
                        )}
                        {onDeleteTag && (
                          <button
                            type="button"
                            className={`${styles.tagListItemAction} ${styles.tagListItemActionDanger}`}
                            title={`Delete ${noun}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteConfirm(tag);
                            }}
                          >
                            <Icon icon="mdi:trash-can-outline" width={16} height={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.noResults}>
                    <span className={styles.noResultsText}>
                      No matching {noun}s found.
                    </span>
                  </div>
                )}
              </div>

              {onCreateTag && (
                <div className={styles.dropdownFooter}>
                  <button
                    type="button"
                    className={styles.footerAction}
                    onClick={openCreateModal}
                  >
                    <Icon icon="mdi:plus" width={16} height={16} />
                    Create New {noun.charAt(0).toUpperCase() + noun.slice(1)}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      <TagFormModal
        isOpen={tagForm.open}
        onClose={() => setTagForm({ open: false, mode: 'create', initialName: '', editId: null })}
        onSave={handleTagFormSave}
        mode={tagForm.mode}
        initialName={tagForm.initialName}
        existingTags={availableTags.map((t) => t.name)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(tagToDelete)}
        onClose={() => setTagToDelete(null)}
        onConfirm={handleDeleteConfirm}
        itemName={tagToDelete?.name || ''}
        itemType={noun.charAt(0).toUpperCase() + noun.slice(1)}
        warningText={`This ${noun} will be permanently deleted. This action cannot be undone.`}
      />
    </>
  );
};
