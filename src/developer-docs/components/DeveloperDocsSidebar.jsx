'use client';

import styles from '../styles/DeveloperDocsSidebar.module.css';
import { useContext } from 'react';
import { DeveloperDocsContext } from '../contexts/DeveloperDocsContext';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function DeveloperDocsSidebar() {
  const { selectedSection, setSelectedSection, expandedTopics, toggleTopic, sectionsByCategory } =
    useContext(DeveloperDocsContext);

  const categories = ['Backend', 'Frontend', 'Infrastructure'];

  const getCategoryIcon = (category) => {
    const icons = {
      Backend: '⚙️',
      Frontend: '🎨',
      Infrastructure: '🏗️',
    };
    return icons[category] || '📄';
  };

  const getCategoryKey = (category) => {
    const keyMap = {
      Backend: 'backend',
      Frontend: 'frontend',
      Infrastructure: 'infrastructure',
    };
    return keyMap[category];
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.content}>
        {categories.map((category) => {
          const categoryKey = getCategoryKey(category);
          const categoryItems = sectionsByCategory[categoryKey] || [];
          const isExpanded = expandedTopics[category];

          return (
            <div key={category} className={styles.category}>
              <button
                className={styles.categoryHeader}
                onClick={() => toggleTopic(category)}
              >
                <span className={styles.categoryIcon}>{getCategoryIcon(category)}</span>
                <span className={styles.categoryTitle}>{category}</span>
                {isExpanded ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              {isExpanded && (
                <div className={styles.items}>
                  {categoryItems.map((item) => (
                    <button
                      key={item.id}
                      className={`${styles.item} ${
                        selectedSection === item.id ? styles.active : ''
                      }`}
                      onClick={() => setSelectedSection(item.id)}
                    >
                      <span className={styles.dot}></span>
                      <span className={styles.label}>{item.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer tip */}
      <div className={styles.footer}>
        <p className={styles.tip}>💡 Use search to quickly find topics</p>
      </div>
    </aside>
  );
}
