'use client';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import styles from './TagFormModal.module.css';

export const TagFormModal = ({
  isOpen,
  onClose,
  onSave,
  mode = 'create',
  initialName = '',
  existingTags = [],
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setError('');
    }
  }, [isOpen, initialName]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Tag name is required');
      return;
    }
    const duplicate = existingTags.some(
      (t) => t.toLowerCase() === trimmed.toLowerCase() && t !== initialName
    );
    if (duplicate) {
      setError('A tag with this name already exists');
      return;
    }
    onSave(trimmed);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tag-form-title"
      >
        <div className={styles.header}>
          <h2 id="tag-form-title" className={styles.title}>
            {mode === 'edit' ? 'Edit Tag' : 'Create Tag'}
          </h2>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <Icon icon="mdi:close" width={20} height={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.body} noValidate>
          <FormField label="Tag Name" required>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              onBlur={() => {
                if (!name.trim()) setError('Tag name is required');
              }}
              error={error}
              placeholder="Enter tag name"
              autoFocus
            />
          </FormField>

          <div className={styles.footer}>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="cyan">
              {mode === 'edit' ? 'Save Changes' : 'Create Tag'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
