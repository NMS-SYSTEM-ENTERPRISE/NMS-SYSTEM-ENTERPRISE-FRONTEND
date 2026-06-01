import { Icon } from '@iconify/react';
import { SelectComponent } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import styles from './styles.module.css';

// Chart Types with icons
const CHART_TYPES = [
  { id: 'area', name: 'Area', icon: 'mdi:chart-areaspline', color: 'var(--color-chart-cyan)' },
  { id: 'line', name: 'Line', icon: 'mdi:chart-line', color: 'var(--color-chart-blue, #3b82f6)' },
  { id: 'bar', name: 'Bar', icon: 'mdi:chart-bar', color: 'var(--color-chart-purple)' },
  { id: 'column', name: 'Column', icon: 'mdi:chart-bar', color: 'var(--color-success)' },
  { id: 'spline', name: 'Spline', icon: 'mdi:chart-line-variant', color: 'var(--color-warning)' },
  { id: 'step', name: 'Step', icon: 'mdi:chart-line-stacked', color: 'var(--color-success)' },
  { id: 'stacked', name: 'Stacked', icon: 'mdi:chart-areaspline', color: 'var(--color-chart-cyan)' },
  { id: 'percentage', name: 'Percentage', icon: 'mdi:chart-areaspline-variant', color: 'var(--color-chart-purple)' },
  { id: 'pie', name: 'Pie', icon: 'mdi:chart-pie', color: 'var(--color-warning)' },
  { id: 'donut', name: 'Donut', icon: 'mdi:chart-donut', color: 'var(--color-danger)' },
  { id: 'sankey', name: 'Sankey', icon: 'mdi:chart-sankey', color: 'var(--color-chart-purple)' },
  { id: 'heatmap', name: 'Heat Map', icon: 'mdi:grid', color: 'var(--color-danger)' },
];

/**
 * Flow Action Sidebar for Dashboard and Explorer tabs
 * @param {boolean} isOpen - Controls sidebar visibility
 * @param {function} onClose - Close handler
 * @param {string} mode - 'dashboard' or 'explorer'
 * @param {object} config - Current configuration
 * @param {function} onConfigChange - Configuration change handler
 * @param {function} onSave - Save handler
 */
export const FlowActionSidebar = ({
  isOpen,
  onClose,
  mode = 'dashboard', // 'dashboard' or 'explorer'
  config = {},
  onConfigChange,
  onSave,
}) => {
  const [localConfig, setLocalConfig] = useState(config);

  if (!isOpen) return null;

  const handleChange = (key, value) => {
    const newConfig = { ...localConfig, [key]: value };
    setLocalConfig(newConfig);
    if (onConfigChange) {
      onConfigChange(newConfig);
    }
  };

  const handleChartTypeSelect = (chartType) => {
    handleChange('chartType', chartType);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(localConfig);
    }
    onClose();
  };

  const handleReset = () => {
    const resetConfig = {
      eventSource: '',
      interface: '',
      counter: 'volume.bytes',
      aggregation: 'sum',
      flowSource: '',
      resultBy: 'source.ip',
      chartType: 'area',
    };
    setLocalConfig(resetConfig);
    if (onConfigChange) {
      onConfigChange(resetConfig);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={onClose} />

      {/* Sidebar */}
      <div className={styles.sidebar}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            <Icon icon="mdi:cog" width={20} />
            {mode === 'dashboard' ? 'Dashboard Actions' : 'Explorer Configuration'}
          </h2>
          <Button variant="ghost" className={styles.closeBtn} onClick={onClose}>
            <Icon icon="mdi:close" width={24} />
          </Button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Common Filters for Dashboard Mode */}
          {mode === 'dashboard' && (
            <>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Filters</h3>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Event Source:</label>
                  <SelectComponent
                    value={localConfig.eventSource || ''}
                    onChange={(e) => handleChange('eventSource', e.target.value)}
                    options={[
                      { value: '', label: 'Select' },
                      { value: 'source1', label: 'Source 1' },
                      { value: 'source2', label: 'Source 2' },
                      { value: 'source3', label: 'Source 3' },
                    ]}
                    placeholder="Select event source"
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Interface:</label>
                  <SelectComponent
                    value={localConfig.interface || ''}
                    onChange={(e) => handleChange('interface', e.target.value)}
                    options={[
                      { value: '', label: 'Select' },
                      { value: 'interface-index-1', label: 'Interface-Index-1' },
                      { value: 'interface-index-2', label: 'Interface-Index-2' },
                      { value: 'interface-index-3', label: 'Interface-Index-3' },
                      { value: 'interface-index-4', label: 'Interface-Index-4' },
                    ]}
                    placeholder="Select interface"
                  />
                </div>
              </div>

              <div className={styles.divider} />
            </>
          )}

          {/* Explorer Mode Configuration */}
          {mode === 'explorer' && (
            <>
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Data Configuration</h3>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>
                    Counter <span className={styles.required}>*</span>
                  </label>
                  <SelectComponent
                    value={localConfig.counter || 'volume.bytes'}
                    onChange={(e) => handleChange('counter', e.target.value)}
                    options={[
                      { value: 'volume.bytes', label: 'volume.bytes' },
                      { value: 'volume.packets', label: 'volume.packets' },
                      { value: 'flow.count', label: 'flow.count' },
                      { value: 'bandwidth.utilization', label: 'bandwidth.utilization' },
                    ]}
                    placeholder="Select counter"
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>
                    Aggregation <span className={styles.required}>*</span>
                  </label>
                  <SelectComponent
                    value={localConfig.aggregation || 'sum'}
                    onChange={(e) => handleChange('aggregation', e.target.value)}
                    options={[
                      { value: 'sum', label: 'Sum' },
                      { value: 'avg', label: 'Avg' },
                      { value: 'min', label: 'Min' },
                      { value: 'max', label: 'Max' },
                      { value: 'count', label: 'Count' },
                    ]}
                    placeholder="Select aggregation"
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Flow Source</label>
                  <SelectComponent
                    value={localConfig.flowSource || ''}
                    onChange={(e) => handleChange('flowSource', e.target.value)}
                    options={[
                      { value: '', label: 'Select' },
                      { value: 'netflow', label: 'NetFlow' },
                      { value: 'sflow', label: 'sFlow' },
                      { value: 'ipfix', label: 'IPFIX' },
                    ]}
                    placeholder="Select flow source"
                  />
                </div>

                <div className={styles.filterGroup}>
                  <label className={styles.filterLabel}>Result by</label>
                  <SelectComponent
                    value={localConfig.resultBy || 'source.ip'}
                    onChange={(e) => handleChange('resultBy', e.target.value)}
                    options={[
                      { value: 'source.ip', label: 'source.ip' },
                      { value: 'destination.ip', label: 'destination.ip' },
                      { value: 'source.port', label: 'source.port' },
                      { value: 'destination.port', label: 'destination.port' },
                      { value: 'protocol', label: 'protocol' },
                      { value: 'application', label: 'application' },
                    ]}
                    placeholder="Select result by"
                    isMulti={true}
                  />
                </div>
              </div>

              <div className={styles.divider} />

              {/* Chart Type Selection */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Chart Type</h3>
                <div className={styles.chartTypeGrid}>
                  {CHART_TYPES.map((chart) => (
                    <Button
                      variant="ghost"
                      key={chart.id}
                      className={`${styles.chartTypeCard} ${localConfig.chartType === chart.id ? styles.chartTypeCardActive : ''
                        }`}
                      onClick={() => handleChartTypeSelect(chart.id)}
                      title={chart.name}
                    >
                      <Icon icon={chart.icon} width={28} style={{ color: chart.color }} />
                      <span>{chart.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className={styles.divider} />
            </>
          )}

          {/* Additional Actions Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Additional Options</h3>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={localConfig.showLegend || false}
                  onChange={(e) => handleChange('showLegend', e.target.checked)}
                />
                <span>Show Legend</span>
              </label>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={localConfig.showDataLabels || false}
                  onChange={(e) => handleChange('showDataLabels', e.target.checked)}
                />
                <span>Show Data Labels</span>
              </label>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={localConfig.enableZoom || false}
                  onChange={(e) => handleChange('enableZoom', e.target.checked)}
                />
                <span>Enable Zoom</span>
              </label>

              {mode === 'explorer' && (
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={localConfig.autoRefresh || false}
                    onChange={(e) => handleChange('autoRefresh', e.target.checked)}
                  />
                  <span>Auto Refresh</span>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <Button variant="ghost" className={styles.resetBtn} onClick={handleReset}>
            <Icon icon="mdi:refresh" width={18} />
            Reset
          </Button>
          {mode === 'explorer' && (
            <Button variant="default" className={styles.saveWidgetBtn} onClick={handleSave}>
              <Icon icon="mdi:content-save" width={18} />
              Save as Widget
            </Button>
          )}
          <Button variant="default" className={styles.applyBtn} onClick={handleSave}>
            <Icon icon="mdi:check" width={18} />
            Apply
          </Button>
        </div>
      </div>
    </>
  );
};




