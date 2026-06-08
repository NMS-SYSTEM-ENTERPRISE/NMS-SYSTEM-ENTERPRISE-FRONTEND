'use client';

import {
  BarChart3,
  BookOpen,
  Boxes,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  Eye,
  Folder,
  GitBranch,
  Globe,
  HardDrive,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  Lock,
  Play,
  Rocket,
  Server,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wifi,
} from 'lucide-react';
import { useContext, useMemo } from 'react';
import { DeveloperDocsContext } from '../contexts/DeveloperDocsContext';
import styles from '../styles/DeveloperDocsSidebar.module.css';

export default function DeveloperDocsSidebar() {
  const {
    selectedSection,
    setSelectedSection,
    activeCategory,
    setActiveCategory,
    filteredSections,
    sections,
    searchQuery,
    setSearchQuery,
  } = useContext(DeveloperDocsContext);

  const categories = ['All', 'Backend', 'Frontend', 'Infrastructure'];

  const getCategoryIcon = (category) => {
    const icons = {
      All: <BookOpen size={16} />,
      Backend: <Server size={16} />,
      Frontend: <LayoutDashboard size={16} />,
      Infrastructure: <HardDrive size={16} />,
    };
    return icons[category] || <BookOpen size={16} />;
  };

  const filteredItems = useMemo(() => {
    const items = filteredSections;
    if (!searchQuery?.trim()) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [filteredSections, searchQuery]);

  const getItemIcon = (item) => {
    const iconMap = {
      'backend-architecture': <Layers size={16} />,
      'backend-database': <Database size={16} />,
      'backend-services': <ServerCog size={16} />,
      'backend-api': <Code2 size={16} />,
      'backend-auth': <ShieldCheck size={16} />,
      'backend-performance': <TrendingUp size={16} />,
      'backend-folder': <Folder size={16} />,
      'backend-codebase': <Code2 size={16} />,
      'backend-features': <Sparkles size={16} />,
      'backend-git': <GitBranch size={16} />,
      'backend-run': <Play size={16} />,
      'frontend-architecture': <LayoutGrid size={16} />,
      'frontend-state': <GitBranch size={16} />,
      'frontend-components': <Boxes size={16} />,
      'frontend-charts': <BarChart3 size={16} />,
      'frontend-auth': <Lock size={16} />,
      'frontend-deployment': <Rocket size={16} />,
      'infra-overview': <Globe size={16} />,
      'infra-dataflow': <HardDrive size={16} />,
      'infra-protocols': <Wifi size={16} />,
      'infra-deployment': <Cloud size={16} />,
      'infra-monitoring': <Eye size={16} />,
      'infra-scaling': <TrendingUp size={16} />,
    };
    return iconMap[item.id] || getCategoryIcon(item.category);
  };

  const groupedItems = useMemo(() => {
    if (activeCategory === 'All') {
      return ['Backend', 'Frontend', 'Infrastructure'].reduce(
        (acc, category) => {
          acc[category] = filteredItems.filter(
            (item) => item.category === category
          );
          return acc;
        },
        {}
      );
    }

    return {
      [activeCategory]: filteredItems,
    };
  }, [activeCategory, filteredItems]);

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
    const categoryItems =
      category === 'All'
        ? sections
        : sections.filter((item) => item.category === category);
    if (
      categoryItems.length > 0 &&
      !categoryItems.some((item) => item.id === selectedSection)
    ) {
      setSelectedSection(categoryItems[0].id);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.categorySection}>
        <div className={styles.sectionLabel}>Filter by Category</div>
        <div className={styles.categoryList}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.categoryBtn} ${activeCategory === cat ? styles.categoryBtnActive : ''}`}
              onClick={() => handleSelectCategory(cat)}
            >
              <span className={styles.categoryIcon}>
                {getCategoryIcon(cat)}
              </span>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.moduleSection}>
        <div className={styles.sectionLabel}>
          Topics
          <span className={styles.moduleCount}>{filteredItems.length}</span>
        </div>
        <nav className={styles.moduleList}>
          {filteredItems.length === 0 ? (
            <div className={styles.emptyState}>
              <BookOpen size={28} />
              <span>No matching topics</span>
            </div>
          ) : (
            Object.entries(groupedItems).map(([groupLabel, items]) =>
              items.length > 0 ? (
                <div key={groupLabel} className={styles.groupSection}>
                  <div className={styles.groupTitle}>{groupLabel}</div>
                  {items.map((item) => (
                    <button
                      key={item.id}
                      className={`${styles.moduleItem} ${selectedSection === item.id ? styles.moduleItemActive : ''}`}
                      onClick={() => setSelectedSection(item.id)}
                    >
                      <span className={styles.moduleIcon}>
                        {getItemIcon(item)}
                      </span>
                      <span className={styles.moduleLabel}>{item.title}</span>
                      {selectedSection === item.id ? (
                        <ChevronRight
                          size={14}
                          className={styles.activeArrow}
                        />
                      ) : null}
                    </button>
                  ))}
                </div>
              ) : null
            )
          )}
        </nav>
      </div>

      <div className={styles.footer}>
        <p className={styles.tip}>
          Tip: click a category to filter modules, then choose a topic.
        </p>
      </div>
    </aside>
  );
}
