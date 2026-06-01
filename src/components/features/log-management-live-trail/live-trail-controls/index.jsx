'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/select';
import { Icon } from '@iconify/react';
import sharedStyles from '@/components/features/log-management-live-trail/shared/styles.module.css';
import { useLogManagementLiveTrail } from '@/hooks/log-management-live-trail';
import { LIVE_TRAIL_SEARCH_MODE_OPTIONS } from '@/utils/constants/log-management-live-trail';
import { MOCK_LOG_SOURCES } from '@/utils/dummy-data/log-management-live-trail';

export const LiveTrailControls = () => {
  const {
    selectedSource,
    setSelectedSource,
    searchTerms,
    setSearchTerms,
    searchMode,
    setSearchMode,
    highlightKeywords,
    setHighlightKeywords,
    isStreaming,
    isPaused,
    handleStart,
    handlePause,
    handleStop,
    handleClear,
  } = useLogManagementLiveTrail();

  return (
    <div className={sharedStyles.controls}>
      <div className={sharedStyles.controlRow}>
        <div className={sharedStyles.controlGroup}>
          <label>Source</label>
          <SelectComponent
            value={selectedSource}
            onChange={setSelectedSource}
            options={MOCK_LOG_SOURCES}
            placeholder="Select"
            className={sharedStyles.select}
          />
        </div>

        <div className={sharedStyles.controlGroup}>
          <label>Search Terms</label>
          <div className={sharedStyles.searchTermsRow}>
            <SelectComponent
              value={{ value: searchMode, label: searchMode }}
              onChange={(opt) => setSearchMode(opt.value)}
              options={LIVE_TRAIL_SEARCH_MODE_OPTIONS}
              className={sharedStyles.modeSelect}
            />
            <Input
              type="text"
              placeholder="Keywords"
              className={sharedStyles.keywordsInput}
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value)}
            />
            {searchTerms && (
              <Icon icon="mdi:check" width={20} height={20} className={sharedStyles.checkIcon} />
            )}
          </div>
        </div>

        <div className={sharedStyles.controlGroup}>
          <label>Highlight Keywords</label>
          <div className={sharedStyles.highlightRow}>
            <Input
              type="text"
              placeholder="Keywords"
              className={sharedStyles.keywordsInput}
              value={highlightKeywords}
              onChange={(e) => setHighlightKeywords(e.target.value)}
            />
            {highlightKeywords && (
              <Icon icon="mdi:check" width={20} height={20} className={sharedStyles.checkIcon} />
            )}
          </div>
        </div>
      </div>

      <div className={sharedStyles.actionButtons}>
        <Button
          className={`${sharedStyles.actionBtn} ${sharedStyles.playBtn}`}
          onClick={handleStart}
          disabled={isStreaming && !isPaused}
          title="Start"
        >
          <Icon icon="mdi:play" width={18} height={18} />
        </Button>
        <Button
          className={`${sharedStyles.actionBtn} ${sharedStyles.pauseBtn}`}
          onClick={handlePause}
          disabled={!isStreaming}
          title={isPaused ? 'Resume' : 'Pause'}
        >
          <Icon icon={isPaused ? 'mdi:play' : 'mdi:pause'} width={18} height={18} />
        </Button>
        <Button
          className={`${sharedStyles.actionBtn} ${sharedStyles.stopBtn}`}
          onClick={handleStop}
          disabled={!isStreaming}
          title="Stop"
        >
          <Icon icon="mdi:stop" width={18} height={18} />
        </Button>
        <Button
          className={`${sharedStyles.actionBtn} ${sharedStyles.clearBtn}`}
          onClick={handleClear}
          title="Clear"
        >
          <Icon icon="mdi:delete" width={18} height={18} />
        </Button>
        <Button className={`${sharedStyles.actionBtn} ${sharedStyles.expandBtn}`} title="Expand">
          <Icon icon="mdi:arrow-expand" width={18} height={18} />
        </Button>
        <Button className={`${sharedStyles.actionBtn} ${sharedStyles.fullscreenBtn}`} title="Fullscreen">
          <Icon icon="mdi:fullscreen" width={18} height={18} />
        </Button>
      </div>
    </div>
  );
};
