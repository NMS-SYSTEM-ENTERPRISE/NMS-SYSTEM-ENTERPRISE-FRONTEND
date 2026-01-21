"use client";
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

// Mock log stream data
const MOCK_LOG_SOURCES = [
  { value: '172.16.14.71', label: '172.16.14.71' },
  { value: '172.16.15.126', label: '172.16.15.126' },
  { value: '192.168.1.1', label: '192.168.1.1' },
];

const generateMockLogLine = () => {
  const timestamps = [
    '<B5>Apr 22 16:48:54 AlOps sudo:',
    '<B6>Apr 22 16:48:54 AlOps sudo:',
    '<B5>Apr 22 16:48:55 AlOps sshd[3820821]:',
    '<38>Apr 22 16:48:55 AlOps systemd-logind[1276]:',
    '<30>Apr 22 16:48:56 AlOps systemd[1]:',
  ];

  const messages = [
    'snr-edatas : PWD=/home/snr-edatas ; USER=root ; COMMAND=/usr/bin/lsof -p 2199681',
    'pam_unix(sudo:session): session opened for user root(uid=0) by snr-edatas(uid=1000)',
    'pam_unix(sudo:session): session closed for user root',
    'pam_unix(sshd:session): session closed for user snr-edatas',
    'Session 42881.scope: Deactivated successfully.',
    'Session 42880.scope: Consumed 24.643s CPU time.',
    'session-42881.scope: Consumed 1.651s CPU time.',
    'Connection closed by 127.0.0.1 port 47096',
  ];

  const randomTimestamp =
    timestamps[Math.floor(Math.random() * timestamps.length)];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return `${randomTimestamp} ${randomMessage}`;
};

const LiveTrail = () => {
  const router = useRouter();
  const [selectedSource, setSelectedSource] = useState(null);
  const [searchTerms, setSearchTerms] = useState('');
  const [searchMode, setSearchMode] = useState('All');
  const [highlightKeywords, setHighlightKeywords] = useState('');
  const [logLines, setLogLines] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const logContainerRef = useRef(null);
  const streamIntervalRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (logContainerRef.current && !isPaused) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logLines, isPaused]);

  // Simulate log streaming
  useEffect(() => {
    if (isStreaming && !isPaused) {
      streamIntervalRef.current = setInterval(() => {
        const newLog = generateMockLogLine();
        setLogLines((prev) => [...prev, newLog]);

        // Keep only last 500 lines
        if (logLines.length > 500) {
          setLogLines((prev) => prev.slice(-500));
        }
      }, 500); // New log every 500ms
    }

    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, [isStreaming, isPaused, logLines.length]);

  const handleStart = () => {
    if (!selectedSource) {
      alert('Please select a source');
      return;
    }
    setIsStreaming(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsStreaming(false);
    setIsPaused(false);
    setLogLines([]);
  };

  const handleClear = () => {
    setLogLines([]);
  };

  const highlightText = (text) => {
    if (!highlightKeywords) return text;

    const keywords = highlightKeywords
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k);
    let highlighted = text;

    keywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlighted = highlighted.replace(regex, '<mark>$1</mark>');
    });

    return highlighted;
  };

  return (
    <div className={styles.liveTrail}>
      {/* Header */}
      <div className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => router.push('/log-management')}
        >
          <Icon icon="mdi:chevron-left" width={20} height={20} />
        </button>
        <h1 className={styles.title}>Start Live Trail</h1>
        <div className={styles.headerActions}>
          <button className={styles.headerBtn} title="Column View">
            <Icon icon="mdi:view-column" width={18} height={18} />
          </button>
          <button className={styles.headerBtn} title="Settings">
            <Icon icon="mdi:cog" width={18} height={18} />
          </button>
          <button className={styles.headerBtn} title="Fullscreen">
            <Icon icon="mdi:fullscreen" width={18} height={18} />
          </button>
          <button className={styles.createParserBtn}>
            Create Log Parser Plugin
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.controlRow}>
          <div className={styles.controlGroup}>
            <label>Source</label>
            <SelectComponent
              value={selectedSource}
              onChange={setSelectedSource}
              options={MOCK_LOG_SOURCES}
              placeholder="Select"
              className={styles.select}
            />
          </div>

          <div className={styles.controlGroup}>
            <label>Search Terms</label>
            <div className={styles.searchTermsRow}>
              <SelectComponent
                value={{ value: searchMode, label: searchMode }}
                onChange={(opt) => setSearchMode(opt.value)}
                options={[
                  { value: 'All', label: 'All' },
                  { value: 'Any', label: 'Any' },
                  { value: 'None', label: 'None' },
                ]}
                className={styles.modeSelect}
              />
              <input
                type="text"
                placeholder="Keywords"
                value={searchTerms}
                onChange={(e) => setSearchTerms(e.target.value)}
                className={styles.keywordsInput}
              />
              {searchTerms && (
                <Icon
                  icon="mdi:check"
                  width={20}
                  height={20}
                  className={styles.checkIcon}
                />
              )}
            </div>
          </div>

          <div className={styles.controlGroup}>
            <label>Highlight Keywords</label>
            <div className={styles.highlightRow}>
              <input
                type="text"
                placeholder="Keywords"
                value={highlightKeywords}
                onChange={(e) => setHighlightKeywords(e.target.value)}
                className={styles.keywordsInput}
              />
              {highlightKeywords && (
                <Icon
                  icon="mdi:check"
                  width={20}
                  height={20}
                  className={styles.checkIcon}
                />
              )}
            </div>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button
            className={`${styles.actionBtn} ${styles.playBtn}`}
            onClick={handleStart}
            disabled={isStreaming && !isPaused}
            title="Start"
          >
            <Icon icon="mdi:play" width={18} height={18} />
          </button>
          <button
            className={`${styles.actionBtn} ${styles.pauseBtn}`}
            onClick={handlePause}
            disabled={!isStreaming}
            title={isPaused ? 'Resume' : 'Pause'}
          >
            <Icon
              icon={isPaused ? 'mdi:play' : 'mdi:pause'}
              width={18}
              height={18}
            />
          </button>
          <button
            className={`${styles.actionBtn} ${styles.stopBtn}`}
            onClick={handleStop}
            disabled={!isStreaming}
            title="Stop"
          >
            <Icon icon="mdi:stop" width={18} height={18} />
          </button>
          <button
            className={`${styles.actionBtn} ${styles.clearBtn}`}
            onClick={handleClear}
            title="Clear"
          >
            <Icon icon="mdi:delete" width={18} height={18} />
          </button>
          <button
            className={`${styles.actionBtn} ${styles.expandBtn}`}
            title="Expand"
          >
            <Icon icon="mdi:arrow-expand" width={18} height={18} />
          </button>
          <button
            className={`${styles.actionBtn} ${styles.fullscreenBtn}`}
            title="Fullscreen"
          >
            <Icon icon="mdi:fullscreen" width={18} height={18} />
          </button>
        </div>
      </div>

      {/* Log Display Area */}
      <div className={styles.logDisplay}>
        {!selectedSource ? (
          <div className={styles.placeholder}>
            <Icon icon="mdi:play-circle-outline" width={64} height={64} />
            <p>Select a source and click play to start live trail</p>
          </div>
        ) : (
          <div ref={logContainerRef} className={styles.logContainer}>
            {logLines.length === 0 && isStreaming && (
              <div className={styles.loadingMessage}>
                <Icon
                  icon="mdi:loading"
                  width={24}
                  height={24}
                  className={styles.spinner}
                />
                <span>Waiting for logs...</span>
              </div>
            )}
            {logLines.map((line, index) => (
              <div key={index} className={styles.logLine}>
                <span
                  className={styles.logText}
                  dangerouslySetInnerHTML={{ __html: highlightText(line) }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      {isStreaming && (
        <div className={styles.footer}>
          <div className={styles.footerStat}>
            <span className={styles.footerLabel}>Lines:</span>
            <span className={styles.footerValue}>{logLines.length}</span>
          </div>
          <div className={styles.footerStat}>
            <span className={styles.footerLabel}>Status:</span>
            <span
              className={`${styles.footerValue} ${
                isPaused ? styles.statusPaused : styles.statusStreaming
              }`}
            >
              {isPaused ? 'Paused' : 'Streaming'}
            </span>
          </div>
          <div className={styles.footerStat}>
            <span className={styles.footerLabel}>Source:</span>
            <span className={styles.footerValue}>{selectedSource?.label}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTrail;
