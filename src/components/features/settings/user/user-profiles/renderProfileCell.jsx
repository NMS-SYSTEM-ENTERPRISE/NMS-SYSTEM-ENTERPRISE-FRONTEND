import { ActionCell } from '@/components/ui/action-cell';
import styles from '@/screens/settings/shared-settings-styles.module.css';

/** Renders each cell of the User Profiles table */
export const renderProfileCell = (profile, col, onEdit, onDelete) => {
  switch (col.key) {
    case 'name':
      return <a href="#" className={styles.linkBlue}>{profile.name}</a>;
    case 'actions':
      return (
        <ActionCell
          actions={[
            { icon: 'mdi:pencil',        title: 'Edit', variant: 'primary', onClick: () => onEdit?.(profile) },
            { icon: 'mdi:trash-can-outline', title: 'Delete', variant: 'danger', onClick: () => onDelete?.(profile) },
          ]}
        />
      );
    default:
      return profile[col.key];
  }
};
