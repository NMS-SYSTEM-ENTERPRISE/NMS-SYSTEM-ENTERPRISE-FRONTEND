import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { Icon } from '@iconify/react';
import localStyles from './styles.module.css';

/** Read-only field with inline copy button */
export const ReadOnlyField = ({ label, value }) => (
  <FormField label={label}>
    <div className={localStyles.relativeContainer}>
      <Input type="text" value={value} readOnly />
      <button
        type="button"
        className={localStyles.copyButton}
        title="Copy"
      >
        <Icon icon="mdi:content-copy" width={18} />
      </button>
    </div>
  </FormField>
);
