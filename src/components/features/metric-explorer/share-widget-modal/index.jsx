import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import styles from './styles.module.css';

import { toast } from 'sonner';
export const ShareWidgetModal = ({ metric, onClose, onShare }) => {
  const [shareWith, setShareWith] = useState('');
  const [message, setMessage] = useState('');
  const [tooltip, setTooltip] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(null);
  const canvasRef = useRef(null);

  const { data = [], name, unit = '%' } = metric;
  const values = data.map((d) => d.value);
  const hasData = values.length > 0;
  const formatValue = (value) => `${Number(value || 0).toFixed(2)}${unit === 'bytes' ? ' B' : unit}`;

  useEffect(() => {
    drawChart();
  }, [data, hoverPosition]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasData) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 20, right: 10, bottom: 30, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate scales
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const valueRange = maxValue - minValue || 1;

    // Draw Y-axis grid lines and labels
    ctx.strokeStyle = '#1f2937'; // CSS vars might be tricky in some older canvas implementations, sticking to hex for canvas grid is safer but we can try vars. Let's use vars for main colors.
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px Manrope';
    ctx.lineWidth = 1;

    const numYTicks = 4;
    for (let i = 0; i <= numYTicks; i++) {
      const y = padding.top + (chartHeight * i) / numYTicks;
      const value = maxValue - (valueRange * i) / numYTicks;

      // Grid line
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Label
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(value.toFixed(0) + (unit === 'bytes' ? ' B' : unit), padding.left - 5, y);
    }

    // Draw X-axis time labels
    const numXTicks = 6;
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    for (let i = 0; i <= numXTicks; i++) {
      const x = padding.left + (chartWidth * i) / numXTicks;
      const dataIndex = Math.floor((data.length - 1) * (i / numXTicks));
      const timestamp = data[dataIndex]?.timestamp;

      if (timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        ctx.fillText(`${hours}:${minutes}`, x, height - padding.bottom + 5);
      }
    }

    // Draw area chart
    const gradient = ctx.createLinearGradient(
      0,
      padding.top,
      0,
      height - padding.bottom
    );
    gradient.addColorStop(0, 'rgba(6, 182, 212, 0.4)');
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

    ctx.beginPath();
    data.forEach((point, index) => {
      const x = padding.left + (chartWidth * index) / Math.max(data.length - 1, 1);
      const normalizedValue = (point.value - minValue) / valueRange;
      const y = padding.top + chartHeight - normalizedValue * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.lineTo(padding.left + chartWidth, height - padding.bottom);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;

    data.forEach((point, index) => {
      const x = padding.left + (chartWidth * index) / Math.max(data.length - 1, 1);
      const normalizedValue = (point.value - minValue) / valueRange;
      const y = padding.top + chartHeight - normalizedValue * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw hover point
    if (hoverPosition !== null) {
      const dataIndex = Math.round(
        ((hoverPosition - padding.left) / chartWidth) * (data.length - 1)
      );
      if (dataIndex >= 0 && dataIndex < data.length) {
        const x = padding.left + (chartWidth * dataIndex) / Math.max(data.length - 1, 1);
        const point = data[dataIndex];
        const normalizedValue = (point.value - minValue) / valueRange;
        const y = padding.top + chartHeight - normalizedValue * chartHeight;

        ctx.beginPath();
        ctx.fillStyle = '#0ea5e9'; // changed to cyan
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  };

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || !hasData) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const padding = { top: 20, right: 10, bottom: 30, left: 50 };
    const chartWidth = rect.width - padding.left - padding.right;

    if (
      x >= padding.left &&
      x <= rect.width - padding.right &&
      y >= padding.top &&
      y <= rect.height - padding.bottom
    ) {
      setHoverPosition(x);

      const dataIndex = Math.round(
        ((x - padding.left) / chartWidth) * (data.length - 1)
      );
      if (dataIndex >= 0 && dataIndex < data.length) {
        const point = data[dataIndex];
        setTooltip({
          x: e.clientX,
          y: e.clientY,
          timestamp: point.timestamp,
          value: point.value,
        });
      }
    } else {
      setHoverPosition(null);
      setTooltip(null);
    }
  };

  const handleMouseLeave = () => {
    setHoverPosition(null);
    setTooltip(null);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const period = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${weekday}, ${month} ${day}, ${year} ${hours}:${minutes}:${seconds} ${period}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!shareWith || !message) {
      toast.error('Please fill in all required fields');
      return;
    }
    onShare({ shareWith, message });
  };

  const handleReset = () => {
    setShareWith('');
    setMessage('');
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Share Widget</h3>
          <Button variant="ghost" className={styles.closeBtn} onClick={onClose}>
            <Icon icon="mdi:close" width={20} height={20} />
          </Button>
        </div>

        <div className={styles.modalBody}>
          {/* Chart Preview */}
          <div className={styles.chartPreview}>
            <div className={styles.chartPreviewHeader}>
              <Icon icon="mdi:clipboard-text" className={styles.metricIcon} width={16} height={16} />
              <span className={styles.metricName}>{name}</span>
              <Button variant="ghost" className={styles.removeBtn}>
                <Icon icon="mdi:close" width={14} height={14} />
              </Button>
            </div>
            <div className={styles.chartPreviewBody}>
              <canvas
                ref={canvasRef}
                className={styles.canvas}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
              {!hasData && (
                <div style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%', color: '#9ca3af' }}>
                  {metric.message || 'No data available for this metric yet.'}
                </div>
              )}

              {tooltip && (
                <div
                  className={styles.tooltip}
                  style={{
                    left: tooltip.x + 10,
                    top: tooltip.y - 50,
                  }}
                >
                  <div className={styles.tooltipDate}>
                    {formatTimestamp(tooltip.timestamp)}
                  </div>
                  <div className={styles.tooltipValue}>
                    <span className={styles.tooltipDot}></span>
                    {name}: <strong>{formatValue(tooltip.value)}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Share Form */}
          <form className={styles.shareForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Share With <span className={styles.required}>*</span>
              </label>
              <Input
                type="text"
                className={styles.input}
                placeholder="@User or Email or /Handle"
                value={shareWith}
                onChange={(e) => setShareWith(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Message <span className={styles.required}>*</span>
              </label>
              <textarea
                className={styles.textarea}
                placeholder="Enter your message..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className={styles.formActions}>
              <Button
                variant="secondary"
                type="button"
                className={styles.resetBtn}
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button variant="primary" type="submit" className={styles.shareBtn}>
                Share
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
