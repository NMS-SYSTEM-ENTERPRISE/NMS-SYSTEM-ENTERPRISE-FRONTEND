import localStyles from './styles.module.css';

/** Section heading */
export const SectionTitle = ({ children }) => (
  <h3 className={localStyles.sectionTitle}>
    {children}
  </h3>
);
