'use client';

import React, { useMemo } from 'react';
import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { LogManagementChart } from '@/components/features/log-management/log-management-chart';
import sharedStyles from '@/components/features/log-management/shared/styles.module.css';
import { useLogManagement } from '@/hooks/log-management';
import { NoDataFound } from '@/components/ui/no-data-found';
import * as echarts from 'echarts';

export const LogManagementDistributionAccordion = () => {
  const { expandedSections, toggleSection, displayedEvents } = useLogManagement();
  const isOpen = expandedSections.has('distribution');

  // Compute Severity Distribution Data
  const severityDistribution = useMemo(() => {
    const counts = {};
    displayedEvents.forEach(e => {
      const sev = e.severity?.toLowerCase() || 'info';
      counts[sev] = (counts[sev] || 0) + 1;
    });

    // Sort severities in typical order
    const order = ['emergency', 'alert', 'critical', 'error', 'warning', 'notice', 'info', 'debug'];
    return order
      .filter(sev => counts[sev] > 0)
      .map(sev => ({
        name: sev.toUpperCase(),
        value: counts[sev],
        itemStyle: {
          color:
            sev === 'emergency' || sev === 'alert' || sev === 'critical' || sev === 'error'
              ? '#f43f5e'
              : sev === 'warning'
                ? '#f59e0b'
                : sev === 'info' || sev === 'notice'
                  ? '#06b6d4'
                  : '#6b7280'
        }
      }));
  }, [displayedEvents]);

  // Compute Top Source IPs Data
  const topSources = useMemo(() => {
    const counts = {};
    displayedEvents.forEach(e => {
      const src = e.source || 'Unknown';
      counts[src] = (counts[src] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [displayedEvents]);

  // Doughnut Chart Option
  const doughnutOption = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        textStyle: { color: '#f3f4f6' },
      },
      legend: {
        orient: 'vertical',
        right: '5%',
        top: 'middle',
        textStyle: { color: '#9ca3af', fontSize: 11 },
        icon: 'circle'
      },
      series: [
        {
          name: 'Severity',
          type: 'pie',
          radius: ['50%', '75%'],
          center: ['40%', '50%'],
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          data: severityDistribution
        }
      ]
    };
  }, [severityDistribution]);

  // Horizontal Bar Chart Option
  const barOption = useMemo(() => {
    // Reverse arrays for horizontal bar layout (starts drawing from bottom)
    const reversedSources = [...topSources].reverse();
    const categories = reversedSources.map(s => s.name);
    const dataValues = reversedSources.map(s => s.value);

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        textStyle: { color: '#f3f4f6' },
      },
      grid: { left: '3%', right: '8%', bottom: '3%', top: '5%', containLabel: true },
      xAxis: {
        type: 'value',
        axisLabel: { color: '#9ca3af', fontSize: 10 },
        splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)', type: 'dashed' } }
      },
      yAxis: {
        type: 'category',
        data: categories,
        axisLabel: { color: '#9ca3af', fontSize: 10 },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [
        {
          name: 'Logs Count',
          type: 'bar',
          barWidth: '50%',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: '#c084fc' },
              { offset: 1, color: 'rgba(192, 132, 252, 0.1)' }
            ]),
            borderRadius: [0, 4, 4, 0]
          },
          data: dataValues
        }
      ]
    };
  }, [topSources]);

  return (
    <div className={sharedStyles.accordionGroup} data-open={isOpen}>
      <button
        type="button"
        className={clsx(sharedStyles.accordionHeader, sharedStyles.accordionHeaderBtn)}
        onClick={() => toggleSection('distribution')}
      >
        <div className={clsx(sharedStyles.headerNode, sharedStyles.headerNodeViolet)}>
          <Icon icon="mdi:chart-arc" width={16} height={16} />
        </div>
        <div className={sharedStyles.headerInfo}>
          <h3 className={sharedStyles.sectionTitle}>
            Traffic & Distribution
            <span className={sharedStyles.badge} data-type="analytics">
              DISTRIBUTION
            </span>
          </h3>
        </div>
        <Icon
          icon="lucide:chevron-down"
          className={clsx(
            sharedStyles.accordionChevron,
            isOpen && sharedStyles.accordionChevronExpanded
          )}
          width={18}
        />
      </button>

      {isOpen && (
        <div className={sharedStyles.accordionContent} style={{ padding: '20px 24px' }}>
          {displayedEvents?.length === 0 ? (
            <div style={{ padding: '40px', display: 'flex', justifyContent: 'center' }}>
              <NoDataFound title="No Distribution Data" description="No log events match your current criteria." icon="mdi:chart-arc" />
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '32px', position: 'relative' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                  Severity Distribution
                </h4>
                <div style={{ height: '220px' }}>
                  <LogManagementChart option={doughnutOption} size="full" />
                </div>
              </div>

              {/* Vertical Divider */}
              <div style={{ width: '1px', background: 'rgba(255, 255, 255, 0.06)', alignSelf: 'stretch', margin: '10px 0' }} />

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                  Top Log Sources (IPs)
                </h4>
                <div style={{ height: '220px' }}>
                  <LogManagementChart option={barOption} size="full" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
