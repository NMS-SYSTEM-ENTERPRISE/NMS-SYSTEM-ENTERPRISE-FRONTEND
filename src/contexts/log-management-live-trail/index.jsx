'use client';

import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_LIVE_TRAIL_SEARCH_MODE } from '@/utils/constants/log-management-live-trail';
import { generateMockLogLine } from '@/utils/dummy-data/log-management-live-trail';

import { toast } from 'sonner';
export const LogManagementLiveTrailContext = createContext(null);

export const LogManagementLiveTrailProvider = ({ children }) => {
  const [selectedSource, setSelectedSource] = useState(null);
  const [searchTerms, setSearchTerms] = useState('');
  const [searchMode, setSearchMode] = useState(DEFAULT_LIVE_TRAIL_SEARCH_MODE);
  const [highlightKeywords, setHighlightKeywords] = useState('');
  const [logLines, setLogLines] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const logContainerRef = useRef(null);
  const streamIntervalRef = useRef(null);

  useEffect(() => {
    if (logContainerRef.current && !isPaused) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logLines, isPaused]);

  useEffect(() => {
    if (isStreaming && !isPaused) {
      streamIntervalRef.current = setInterval(() => {
        setLogLines((prev) => {
          const next = [...prev, generateMockLogLine()];
          return next.length > 500 ? next.slice(-500) : next;
        });
      }, 500);
    }

    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, [isStreaming, isPaused]);

  const handleStart = useCallback(() => {
    if (!selectedSource) {
      toast.error('Please select a source');
      return;
    }
    setIsStreaming(true);
    setIsPaused(false);
  }, [selectedSource]);

  const handlePause = useCallback(() => {
    setIsPaused((p) => !p);
  }, []);

  const handleStop = useCallback(() => {
    setIsStreaming(false);
    setIsPaused(false);
    setLogLines([]);
  }, []);

  const handleClear = useCallback(() => {
    setLogLines([]);
  }, []);

  const highlightText = useCallback(
    (text) => {
      if (!highlightKeywords) return text;
      const keywords = highlightKeywords
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean);
      let highlighted = text;
      keywords.forEach((keyword) => {
        const regex = new RegExp(`(${keyword})`, 'gi');
        highlighted = highlighted.replace(regex, '<mark>$1</mark>');
      });
      return highlighted;
    },
    [highlightKeywords]
  );

  const value = {
    selectedSource,
    setSelectedSource,
    searchTerms,
    setSearchTerms,
    searchMode,
    setSearchMode,
    highlightKeywords,
    setHighlightKeywords,
    logLines,
    isStreaming,
    isPaused,
    logContainerRef,
    handleStart,
    handlePause,
    handleStop,
    handleClear,
    highlightText,
  };

  return (
    <LogManagementLiveTrailContext.Provider value={value}>
      {children}
    </LogManagementLiveTrailContext.Provider>
  );
};
