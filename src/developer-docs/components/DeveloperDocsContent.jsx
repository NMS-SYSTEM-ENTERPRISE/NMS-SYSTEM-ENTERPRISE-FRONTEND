'use client';

import { Badge } from '@/components/ui/badge';
import { Table } from '@/components/ui/table';
import { ArrowRight, BookOpen, ChevronRight, Sparkles } from 'lucide-react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { DeveloperDocsContext } from '../contexts/DeveloperDocsContext';
import styles from '../styles/DeveloperDocsContent.module.css';
import backendDocs from '../utils/backend-docs';
import frontendDocs from '../utils/frontend-docs';
import infraDocs from '../utils/infrastructure-docs';

const allDocs = { ...backendDocs, ...frontendDocs, ...infraDocs };

export default function DeveloperDocsContent() {
  const { selectedSection } = useContext(DeveloperDocsContext);
  const currentSection = allDocs[selectedSection];
  const [activeAccordion, setActiveAccordion] = useState(null);

  const sections = useMemo(
    () => extractSections(currentSection?.content || ''),
    [currentSection]
  );
  const detailSections = useMemo(
    () => sections.filter((section) => section.level === 2),
    [sections]
  );
  const bullets = useMemo(
    () => extractBullets(currentSection?.content || ''),
    [currentSection]
  );
  const steps = useMemo(
    () => extractSteps(currentSection?.content || ''),
    [currentSection]
  );
  const tableRows = useMemo(
    () => extractTableRows(currentSection?.content || ''),
    [currentSection]
  );

  if (!currentSection) {
    return (
      <div className={styles.empty}>
        <p>Select a topic from the sidebar to view developer documentation.</p>
      </div>
    );
  }

  return (
    <main className={styles.content}>
      <section className={styles.hero} id="overview">
        <div className={styles.heroLeft}>
          <div className={styles.heroIcon}>
            <BookOpen size={30} />
          </div>
          <div>
            <div className={styles.heroBreadcrumb}>
              Developer Docs
              <ArrowRight size={14} />
              {currentSection.category}
            </div>
            <h1 className={styles.heroTitle}>{currentSection.title}</h1>
            <p className={styles.heroDesc}>{currentSection.description}</p>
            <div className={styles.heroTags}>
              <Badge variant="info">{currentSection.category}</Badge>
              <Badge variant="neutral">Docs</Badge>
            </div>
          </div>
        </div>
        <div className={styles.heroBadge}>{currentSection.category}</div>
      </section>

      <section className={styles.summaryGrid}>
        {['Overview', 'Highlights', 'Guidelines', 'Status'].map(
          (label, index) => (
            <div className={styles.summaryCard} key={label}>
              <div className={styles.summaryCardHeader}>
                <span className={styles.summaryCardBadge}>{label}</span>
                <span className={styles.summaryCardIndex}>#{index + 1}</span>
              </div>
              <p
                className={styles.summaryCardText}
                dangerouslySetInnerHTML={{
                  __html: renderInlineMarkdown(
                    bullets[index] ||
                      `Quick developer note for ${currentSection.title}.`
                  ),
                }}
              />
            </div>
          )
        )}
      </section>

      <div className={styles.divider} />

      <section className={styles.workflowSection}>
        <div className={styles.workflowHeader}>
          <div className={styles.workflowBadge}>Continuous Workflow</div>
          <p className={styles.workflowIntro}>
            Start with the key workflow steps below, then continue to the module
            overview and detailed guide for the full process.
          </p>
        </div>
        <div className={styles.workflowSteps}>
          {steps.slice(0, 5).map((step, index) => (
            <div key={index} className={styles.workflowStep}>
              <div className={styles.workflowStepNumber}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <div
                className={styles.workflowStepText}
                dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(step) }}
              />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.overviewPanel}>
        <div className={styles.overviewHeader}>
          <div className={styles.overviewIcon}>
            <BookOpen size={16} />
          </div>
          <div>
            <h3>Module Overview</h3>
            <p className={styles.overviewSubtext}>
              A concise description of the selected module and its goals.
            </p>
          </div>
        </div>
        <p className={styles.overviewText}>{currentSection.description}</p>
      </section>

      <section className={styles.detailGuideSection}>
        <div className={styles.detailGuideHeader}>
          <div className={styles.detailGuideLabel}>
            <Sparkles size={16} />
            Detailed Guide
          </div>
        </div>

        {detailSections.map((section, index) => (
          <div key={section.title} className={styles.detailCard}>
            <button
              className={`${styles.detailHeader} ${activeAccordion === index ? styles.detailHeaderOpen : ''}`}
              onClick={() =>
                setActiveAccordion(activeAccordion === index ? null : index)
              }
              type="button"
            >
              <div className={styles.detailHeaderInfo}>
                <span className={styles.sectionBadge}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.detailTitle}>{section.title}</span>
              </div>
              <ChevronRight
                size={18}
                className={
                  activeAccordion === index ? styles.detailChevronOpen : ''
                }
              />
            </button>
            {activeAccordion === index && (
              <div className={styles.detailContent}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(section.content),
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </section>

      {tableRows.length > 0 && (
        <section className={styles.tablePanel}>
          <div className={styles.panelHeader}>
            <h3>Important references</h3>
          </div>
          <Table
            columns={[
              { key: 'item', label: 'Item' },
              { key: 'detail', label: 'Detail' },
            ]}
            data={tableRows}
            keyExtractor={(row) => row.item}
            renderCell={(row, col) => <span>{row[col.key]}</span>}
            emptyMessage="No reference rows found."
            className={styles.tableWrapper}
          />
        </section>
      )}

      {currentSection.diagram && (
        <section className={styles.diagramSection} id="architecture">
          <div className={styles.sectionHeaderCompact}>
            <h3>Architecture Diagram</h3>
          </div>
          <MermaidDiagram definition={currentSection.diagram} />
        </section>
      )}

      <section className={styles.structuredContentSection}>
        {renderStructuredContent(currentSection.content)}
      </section>

      <section className={styles.updateNote} id="code">
        <p className={styles.lastUpdated}>
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </section>
    </main>
  );
}

function MermaidDiagram({ definition }) {
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');
  const [diagramId] = useState(
    () => `mermaid-${Math.random().toString(36).slice(2, 9)}`
  );

  useEffect(() => {
    if (!definition) return;

    let canceled = false;

    import('mermaid')
      .then((module) => {
        const mermaid = module.default ?? module;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          flowchart: {
            curve: 'linear',
          },
          securityLevel: 'loose',
        });

        return mermaid.mermaidAPI.render(diagramId, definition.trim());
      })
      .then((result) => {
        if (!canceled) {
          const svgCode = result?.svg || result;
          setSvg(svgCode);
          setError('');
        }
      })
      .catch(() => {
        if (!canceled)
          setError(
            'Unable to render diagram. The diagram may use unsupported Mermaid syntax.'
          );
      });

    return () => {
      canceled = true;
    };
  }, [definition, diagramId]);

  if (error) {
    return (
      <div className={styles.diagramRenderWrap}>
        <p className={styles.diagramError}>{error}</p>
        <pre className={styles.diagramCode}>{definition}</pre>
      </div>
    );
  }

  return (
    <div className={styles.diagramRenderWrap}>
      {svg ? (
        <div
          className={styles.diagramSvg}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className={styles.diagramPlaceholder}>
          <p className={styles.note}>Rendering diagram...</p>
        </div>
      )}
    </div>
  );
}

function renderStructuredContent(content) {
  const techStack = extractTechStack(content);
  const principles = extractArchPrinciples(content);
  const keyFeatures = extractKeyFeatures(content);
  const startupProcess = extractStartupProcess(content);
  const categories = extractCategorizedTables(content);
  const hypertableBenefits = extractHypertableBenefits(content);
  const relationships = extractRelationships(content);
  const patterns = extractKeyPatterns(content);
  const benefits = extractBenefits(content);

  if (
    !techStack &&
    !categories &&
    !relationships &&
    !principles &&
    !keyFeatures
  )
    return null;

  return (
    <>
      {techStack && (
        <div className={styles.structuredCard}>
          <div className={styles.structuredCardHeader}>
            <h4>Technology Stack</h4>
          </div>
          <div className={styles.techStackGrid}>
            {techStack.map((item, idx) => (
              <div key={idx} className={styles.techItem}>
                <span className={styles.techLabel}>{item.label}:</span>
                <Badge variant="neutral">{item.value}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {principles && principles.length > 0 && (
        <div className={styles.structuredCard}>
          <div className={styles.structuredCardHeader}>
            <h4>Core Architecture Principles</h4>
          </div>
          <div className={styles.principlesGrid}>
            {principles.map((principle, idx) => (
              <div key={idx} className={styles.principleBlock}>
                <div className={styles.principleNumber}>{idx + 1}</div>
                <div className={styles.principleContent}>
                  <h5 className={styles.principleName}>{principle.name}</h5>
                  <ul className={styles.principlePoints}>
                    {principle.points.map((point, pIdx) => (
                      <li key={pIdx}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {keyFeatures && keyFeatures.length > 0 && (
        <div className={styles.structuredCard}>
          <div className={styles.structuredCardHeader}>
            <h4>Key Features</h4>
          </div>
          <ul className={styles.featuresList}>
            {keyFeatures.map((feature, idx) => (
              <li key={idx} className={styles.featureItem}>
                <Badge variant="info">F{idx + 1}</Badge>
                <span className={styles.featureText}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {startupProcess && startupProcess.length > 0 && (
        <div className={styles.structuredCard}>
          <div className={styles.structuredCardHeader}>
            <h4>Startup Process</h4>
          </div>
          <div className={styles.processSteps}>
            {startupProcess.map((step, idx) => (
              <div key={idx} className={styles.processStep}>
                <div className={styles.processStepNumber}>{idx + 1}</div>
                <div className={styles.processStepContent}>
                  <span className={styles.processStepText}>{step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {categories && Object.keys(categories).length > 0 && (
        <div className={styles.structuredCard}>
          <div className={styles.structuredCardHeader}>
            <h4>Database Tables by Category</h4>
          </div>
          <div className={styles.categoriesGrid}>
            {Object.entries(categories).map(([category, tables]) => (
              <div key={category} className={styles.categoryBlock}>
                <div className={styles.categoryTitle}>{category}</div>
                <ul className={styles.tableList}>
                  {tables.map((table, idx) => (
                    <li key={idx} className={styles.tableItem}>
                      <code className={styles.tableName}>{table.name}</code>
                      <span className={styles.tableDesc}>{table.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {hypertableBenefits && hypertableBenefits.length > 0 && (
        <div className={styles.structuredCard}>
          <div className={styles.structuredCardHeader}>
            <h4>TimescaleDB Hypertables Benefits</h4>
          </div>
          <ul className={styles.benefitsList}>
            {hypertableBenefits.map((benefit, idx) => (
              <li key={idx} className={styles.benefitItem}>
                <span className={styles.benefitBullet}>✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {relationships && relationships.length > 0 && (
        <div className={styles.structuredCard}>
          <div className={styles.structuredCardHeader}>
            <h4>Data Relationships</h4>
          </div>
          <div className={styles.relationshipsList}>
            {relationships.map((rel, idx) => (
              <div key={idx} className={styles.relationshipItem}>
                <Badge variant="info">{rel.type}</Badge>
                <span className={styles.relationshipText}>{rel.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {patterns && patterns.length > 0 && (
        <div className={styles.structuredCard}>
          <div className={styles.structuredCardHeader}>
            <h4>Key Design Patterns</h4>
          </div>
          <ul className={styles.patternsList}>
            {patterns.map((pattern, idx) => (
              <li key={idx} className={styles.patternItem}>
                <span className={styles.patternNumber}>{idx + 1}</span>
                <span className={styles.patternText}>{pattern}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {benefits && benefits.length > 0 && (
        <div className={styles.structuredCard}>
          <div className={styles.structuredCardHeader}>
            <h4>Benefits</h4>
          </div>
          <ul className={styles.benefitsList}>
            {benefits.map((benefit, idx) => (
              <li key={idx} className={styles.benefitItem}>
                <span className={styles.benefitBullet}>✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function extractArchPrinciples(content) {
  // Match "Core Architecture Principles" section
  const principlesMatch = content.match(
    /### Core Architecture Principles[\s\S]*?(?=###|$)/i
  );
  if (!principlesMatch) return null;

  const principles = [];
  const text = principlesMatch[0];

  // Split by numbered principles
  const principleBlocks = text.split(/\n(?=\d+\.\s+\*\*)/);

  principleBlocks.forEach((block) => {
    // Match "1. **Principle Name**" followed by bullet points
    const match = block.match(
      /^\d+\.\s*\*\*([^*]+)\*\*[\s\S]*?((?:^   [-*]\s+.+$\n?)*)/m
    );
    if (match) {
      const name = match[1].trim();
      const pointsText = match[2] || '';
      const points = pointsText
        .split('\n')
        .filter((line) => line.match(/^\s+[-*]\s+/))
        .map((line) => line.replace(/^\s+[-*]\s+/, '').trim())
        .filter((p) => p && p.length > 0);

      if (name) {
        principles.push({ name, points: points.length > 0 ? points : [name] });
      }
    }
  });

  return principles.length > 0 ? principles : null;
}

function extractKeyFeatures(content) {
  // Match "Key Features" section
  const featuresMatch = content.match(/### Key Features[\s\S]*?(?=###|$)/i);
  if (!featuresMatch) return null;

  const features = featuresMatch[0]
    .split('\n')
    .filter((line) => line.match(/^[-*]\s+/))
    .map((line) => {
      // Remove bullet and bold markers
      return line
        .replace(/^[-*]\s+/, '')
        .replace(/\*\*([^*]+)\*\*\s*:?\s*/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .trim();
    })
    .filter((f) => f && f.length > 0);

  return features.length > 0 ? features : null;
}

function extractStartupProcess(content) {
  // Match "Startup Process" section
  const startupMatch = content.match(
    /### Startup Process[\s\S]*?(?=###|diagram|$)/i
  );
  if (!startupMatch) return null;

  const steps = startupMatch[0]
    .split('\n')
    .filter((line) => line.match(/^\d+\.\s+/))
    .map((line) => line.replace(/^\d+\.\s+/, '').trim())
    .filter((s) => s && s.length > 0);

  return steps.length > 0 ? steps : null;
}

function extractHypertableBenefits(content) {
  // Match "TimescaleDB Hypertables" section with benefits
  const benefitsMatch = content.match(
    /### TimescaleDB Hypertables[\s\S]*?Benefits:[\s\S]*?(?=###|$)/i
  );
  if (!benefitsMatch) return null;

  const benefits = benefitsMatch[0]
    .split('\n')
    .filter((line) => line.match(/^[-*]\s+/))
    .map((line) => line.replace(/^[-*]\s+/, '').trim())
    .filter((b) => b && b.length > 0);

  return benefits.length > 0 ? benefits : null;
}

function extractTechStack(content) {
  // Match "Technology Stack" or "Database Technology" sections
  const techMatch = content.match(
    /(### Technology Stack|### Database Technology)[\s\S]*?(?=###|$)/i
  );
  if (!techMatch) return null;

  const lines = techMatch[0].split('\n');
  const items = [];

  lines.forEach((line) => {
    // Match lines like "- **Label**: Value"
    const match = line.match(/^[-*]\s*\*\*([^*]+)\*\*:\s*(.+)$/);
    if (match) {
      items.push({ label: match[1].trim(), value: match[2].trim() });
    } else if (line.includes(':') && !line.startsWith('#')) {
      const [label, ...rest] = line.split(':');
      const cleanLabel = label
        .replace(/^[-*]\s*/, '')
        .replace(/\*\*/g, '')
        .trim();
      const value = rest.join(':').trim();
      if (cleanLabel && value && cleanLabel.length < 50) {
        items.push({ label: cleanLabel, value });
      }
    }
  });

  return items.length > 0 ? items : null;
}

function extractCategorizedTables(content) {
  // Match "Core Database Tables" section
  const tableMatch = content.match(
    /### Core Database Tables[\s\S]*?(?=###|$)/i
  );
  if (!tableMatch) return null;

  const categories = {};
  const lines = tableMatch[0].split('\n');
  let currentCategory = null;

  lines.forEach((line) => {
    // Match category headers like "#### Authentication & Authorization"
    const categoryMatch = line.match(/^####\s+(.+)$/);
    if (categoryMatch) {
      currentCategory = categoryMatch[1].trim();
      if (currentCategory) {
        categories[currentCategory] = [];
      }
    } else if (currentCategory && line.match(/^[-*]\s*\*\*([^*]+)\*\*:/)) {
      // Match lines like "- **table_name**: Description"
      const itemMatch = line.match(/^[-*]\s*\*\*([^*]+)\*\*:\s*(.+)$/);
      if (itemMatch) {
        categories[currentCategory].push({
          name: itemMatch[1].trim(),
          desc: itemMatch[2].trim(),
        });
      }
    }
  });

  return Object.keys(categories).length > 0 ? categories : null;
}

function extractRelationships(content) {
  // Match "Relationships" section
  const relMatch = content.match(/### Relationships[\s\S]*?(?=###|$)/i);
  if (!relMatch) return null;

  const lines = relMatch[0].split('\n');
  const rels = [];

  lines.forEach((line) => {
    // Match lines like "- **Device → Interfaces** (1:M)"
    const match = line.match(/^[-*]\s*\*\*([^*]+)\*\*\s*\(([^)]+)\)/);
    if (match) {
      const text = match[1].trim();
      const typeStr = match[2].trim().toUpperCase();

      let type = '1:1';
      if (typeStr.includes('M:M') || typeStr.includes('MANY:MANY')) {
        type = 'Many:Many';
      } else if (typeStr.includes('1:M') || typeStr.includes('1:MANY')) {
        type = '1:Many';
      }

      rels.push({ type, text });
    }
  });

  return rels.length > 0 ? rels : null;
}

function extractKeyPatterns(content) {
  // Match "Key Design Patterns" section
  const patternMatch = content.match(
    /### Key Design Patterns[\s\S]*?(?=###|$)/i
  );
  if (!patternMatch) return null;

  const lines = patternMatch[0].split('\n');
  const patterns = [];

  lines.forEach((line) => {
    // Match lines like "1. **Pattern Name**: Description"
    const match = line.match(/^\d+\.\s+\*\*([^*]+)\*\*:\s*(.+)$/);
    if (match) {
      patterns.push(`${match[1]}: ${match[2]}`);
    } else if (line.match(/^\d+\.\s+/)) {
      const pattern = line.replace(/^\d+\.\s+/, '').trim();
      if (pattern && pattern.length > 0) {
        patterns.push(pattern);
      }
    }
  });

  return patterns.length > 0 ? patterns : null;
}

function extractBenefits(content) {
  // Try to find a standalone "Benefits" section at the end
  const benefitMatch = content.match(/^### Benefits?[\s\S]*?(?=###|$)/im);
  if (!benefitMatch) return null;

  const benefits = benefitMatch[0]
    .split('\n')
    .filter((line) => line.match(/^[-*]\s+/))
    .map((line) => line.replace(/^[-*]\s+/, '').trim())
    .filter((b) => b && b.length > 0);

  return benefits.length > 0 ? benefits : null;
}

function renderMarkdown(content) {
  let html = content;

  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  html = html.replace(
    /```([\s\S]*?)```/g,
    '<pre class="code-block"><code>$1</code></pre>'
  );

  html = html.replace(/`(.*?)`/g, '<code class="inline-code">$1</code>');

  html = html.replace(/^[-*]\s+(.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');

  html = html.replace(/\n/g, '<br/>');

  return html;
}

function renderInlineMarkdown(text) {
  if (!text) return '';

  return text
    .replace(/^[-*]\s+/, '')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="inline-code">$1</code>');
}

function extractSections(content) {
  const sections = [];
  const regex = /^(#{2,3})\s+(.*)$/gm;
  let match;
  let last = null;

  while ((match = regex.exec(content)) !== null) {
    if (last) {
      last.content = content.slice(last.index, match.index).trim();
    }

    last = {
      title: match[2],
      level: match[1].length,
      index: regex.lastIndex,
      content: '',
    };
    sections.push(last);
  }

  if (last) {
    last.content = content.slice(last.index).trim();
  }

  return sections;
}

function extractBullets(content) {
  return Array.from(content.matchAll(/^[\-\*]\s+(.*)$/gm)).map(
    (match) => match[1]
  );
}

function extractSteps(content) {
  return Array.from(content.matchAll(/^\s*\d+\.\s+(.*)$/gm)).map(
    (match) => match[1]
  );
}

function extractTableRows(content) {
  return Array.from(content.matchAll(/^[\-\*]\s+\*\*(.*?):\*\*\s*(.*)$/gm)).map(
    (match) => ({
      item: match[1],
      detail: match[2],
    })
  );
}
