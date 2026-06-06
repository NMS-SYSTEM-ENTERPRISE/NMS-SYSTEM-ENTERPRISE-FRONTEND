'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useState } from 'react';
import { useManual } from '../contexts/ManualContext';
import styles from '../styles/ManualContent.module.css';
import { MANUAL_IMAGE_MAP } from '../utils/image-map';

const ImageGallery = ({ images, featureTitle }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const current = images[activeIndex];

  return (
    <div className={styles.gallery}>
      {/* Main Image */}
      <div className={styles.galleryMain}>
        <button
          type="button"
          className={styles.galleryImageWrapper}
          onClick={() => setModalOpen(true)}
          aria-label="Open screenshot preview"
        >
          <Image
            src={current.src}
            alt={current.caption}
            fill
            sizes="(max-width: 1200px) 100vw, 800px"
            style={{ objectFit: 'contain' }}
            priority={activeIndex === 0}
          />
          <div className={styles.galleryOpenHint}>
            <Icon icon="mdi:arrow-expand" width={16} />
          </div>
        </button>
        <p className={styles.galleryCaption}>
          <Icon icon="mdi:image-outline" width={13} />
          {current.caption}
        </p>
      </div>

      {/* Thumbnails — only if more than 1 image */}
      {images.length > 1 && (
        <div className={styles.galleryThumbs}>
          {images.map((img, i) => (
            <button
              key={i}
              className={`${styles.galleryThumb} ${i === activeIndex ? styles.galleryThumbActive : ''}`}
              onClick={() => setActiveIndex(i)}
              title={img.caption}
            >
              <div className={styles.thumbImageWrapper}>
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  sizes="80px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <span className={styles.thumbLabel}>{i + 1}</span>
            </button>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className={styles.imageModalOverlay} onClick={() => setModalOpen(false)}>
          <div className={styles.imageModalContent} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.imageModalClose}
              onClick={() => setModalOpen(false)}
              aria-label="Close screenshot preview"
            >
              ×
            </button>
            <div className={styles.imageModalWrapper}>
              <Image
                src={current.src}
                alt={current.caption}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <p className={styles.imageModalCaption}>{current.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const SectionBlock = ({ section, index, accentColor }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={styles.section}>
      <button
        className={styles.sectionHeader}
        onClick={() => setExpanded((v) => !v)}
        style={{ borderLeftColor: accentColor }}
      >
        <div className={styles.sectionHeaderLeft}>
          <span
            className={styles.sectionIndex}
            style={{ backgroundColor: `${accentColor}22`, color: accentColor }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className={styles.sectionTitle}>{section.title}</h3>
        </div>
        <Icon
          icon="mdi:chevron-down"
          width={18}
          className={`${styles.sectionChevron} ${expanded ? styles.sectionChevronOpen : ''}`}
        />
      </button>

      {expanded && (
        <div className={styles.sectionBody}>
          <p className={styles.sectionContent}>{section.content}</p>

          {section.steps && section.steps.length > 0 && (
            <div className={styles.stepsBlock}>
              <div className={styles.stepsLabel}>
                <Icon icon="mdi:format-list-numbered" width={14} />
                Step-by-Step Guide
              </div>
              <ol className={styles.stepsList}>
                {section.steps.map((step, si) => (
                  <li key={si} className={styles.stepItem}>
                    <span
                      className={styles.stepNumber}
                      style={{
                        backgroundColor: `${accentColor}20`,
                        color: accentColor,
                      }}
                    >
                      {si + 1}
                    </span>
                    <span className={styles.stepText}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const ManualContent = () => {
  const { activeFeature } = useManual();

  if (!activeFeature) return null;

  const images = MANUAL_IMAGE_MAP[activeFeature.imageSet] || [];

  const processSteps = activeFeature.sections.reduce((acc, section) => {
    if (section.steps && section.steps.length) {
      return [...acc, ...section.steps];
    }
    return acc;
  }, []);

  const workflowSteps = processSteps.length > 0
    ? processSteps.slice(0, 4)
    : activeFeature.sections.slice(0, 3).map((section) => section.title);

  return (
    <main className={styles.content}>
      {/* Feature Hero */}
      <div
        className={styles.featureHero}
        style={{ borderTopColor: activeFeature.color }}
      >
        <div className={styles.heroLeft}>
          <div
            className={styles.heroIcon}
            style={{
              backgroundColor: `${activeFeature.color}1a`,
              color: activeFeature.color,
              boxShadow: `0 0 24px ${activeFeature.color}30`,
            }}
          >
            <Icon icon={activeFeature.icon} width={32} />
          </div>
          <div>
            <div className={styles.heroBreadcrumb}>
              <Icon icon="mdi:book-open-page-variant-outline" width={13} />
              User Manual
              <Icon icon="mdi:chevron-right" width={13} />
              {activeFeature.title}
            </div>
            <h1 className={styles.heroTitle}>{activeFeature.title}</h1>
            <p className={styles.heroDesc}>{activeFeature.description}</p>
          </div>
        </div>
        <div
          className={styles.heroBadge}
          style={{
            backgroundColor: `${activeFeature.color}15`,
            borderColor: `${activeFeature.color}30`,
            color: activeFeature.color,
          }}
        >
          <Icon icon="mdi:layers-outline" width={14} />
          {activeFeature.sections.length} Sections
        </div>
      </div>

      {/* Continuous Workflow */}
      {workflowSteps.length > 0 && (
        <div className={styles.processFlowBlock}>
          <div className={styles.processLabel}>
            <Icon icon="mdi:swap-horizontal-bold" width={15} />
            Continuous Workflow
          </div>
          <p className={styles.processIntro}>
            Start with the key workflow steps below, then continue to the module overview and detailed guide for the full process.
          </p>
          <ol className={styles.processList}>
            {workflowSteps.map((step, idx) => (
              <li key={idx} className={styles.processStepItem}>
                <span className={styles.processStepNumber}>{idx + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Overview */}
      <div className={styles.overviewBlock}>
        <div className={styles.overviewLabel}>
          <Icon icon="mdi:information-outline" width={15} />
          Module Overview
        </div>
        <p className={styles.overviewText}>{activeFeature.overview}</p>
      </div>

      {/* Screenshots Gallery */}
      {images.length > 0 && (
        <div className={styles.gallerySection}>
          <ImageGallery images={images} featureTitle={activeFeature.title} />
        </div>
      )}

      {/* Detailed Sections */}
      <div className={styles.sectionsContainer}>
        <div className={styles.sectionsLabel}>
          <Icon icon="mdi:book-open-outline" width={15} />
          Detailed Guide
        </div>
        {activeFeature.sections.map((section, i) => (
          <SectionBlock
            key={i}
            section={section}
            index={i}
            accentColor={activeFeature.color}
          />
        ))}
      </div>

      {/* Contact Support Footer */}
      <div className={styles.supportBlock}>
        <Icon icon="mdi:headset" width={28} className={styles.supportIcon} />
        <div>
          <h4 className={styles.supportTitle}>Need More Help?</h4>
          <p className={styles.supportText}>
            Contact your IT support team or system administrator for hands-on
            assistance with this module.
          </p>
        </div>
        <a href="mailto:support@snr-edatas.com" className={styles.supportBtn}>
          <Icon icon="mdi:email-outline" width={16} />
          Contact IT Support
        </a>
      </div>
    </main>
  );
};
