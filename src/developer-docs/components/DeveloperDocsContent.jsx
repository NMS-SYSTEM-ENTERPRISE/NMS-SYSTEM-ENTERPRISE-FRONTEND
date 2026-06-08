'use client';

import styles from '../styles/DeveloperDocsContent.module.css';
import { useContext, useEffect, useState } from 'react';
import { DeveloperDocsContext } from '../contexts/DeveloperDocsContext';
import { Copy, Check } from 'lucide-react';
import backendDocs from '../utils/backend-docs';
import frontendDocs from '../utils/frontend-docs';
import infraDocs from '../utils/infrastructure-docs';

// Merge all documentation
const allDocs = { ...backendDocs, ...frontendDocs, ...infraDocs };

export default function DeveloperDocsContent() {
  const { selectedSection } = useContext(DeveloperDocsContext);
  const [copiedCode, setCopiedCode] = useState(null);

  const currentSection = allDocs[selectedSection];

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (!currentSection) {
    return (
      <div className={styles.empty}>
        <p>Select a section from the sidebar to view documentation</p>
      </div>
    );
  }

  return (
    <article className={styles.content}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>{currentSection.title}</h1>
        <p className={styles.description}>{currentSection.description}</p>
      </header>

      {/* Content */}
      <div className={styles.body}>
        <div
          className={styles.markdown}
          dangerouslySetInnerHTML={{
            __html: renderMarkdown(currentSection.content),
          }}
        />

        {/* Diagram */}
        {currentSection.diagram && (
          <div className={styles.diagramSection}>
            <h3>Architecture Diagram</h3>
            <div className={styles.diagramPlaceholder}>
              <p className={styles.note}>
                🔄 Mermaid diagram will render here with proper styling
              </p>
              <pre className={styles.diagramCode}>{currentSection.diagram}</pre>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</p>
      </footer>
    </article>
  );
}

// Simple markdown-like rendering
function renderMarkdown(content) {
  let html = content;

  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Code blocks
  html = html.replace(
    /```([\s\S]*?)```/g,
    '<pre class="code-block"><code>$1</code></pre>'
  );

  // Inline code
  html = html.replace(/`(.*?)`/g, '<code class="inline-code">$1</code>');

  // Lists
  html = html.replace(/^\- (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // Line breaks
  html = html.replace(/\n/g, '<br/>');

  return html;
}
