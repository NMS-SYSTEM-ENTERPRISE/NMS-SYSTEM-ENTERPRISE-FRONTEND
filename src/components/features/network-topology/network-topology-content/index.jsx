'use client';

import sharedStyles from '@/components/features/network-topology/shared/styles.module.css';
import { DeviceDetailSidebar } from '@/components/features/topology/device-detail-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NoDataFound } from '@/components/ui/no-data-found';
import { SelectComponent as Select } from '@/components/ui/select';
import {
  TopologyCanvasSkeleton,
  TopologySidebarSkeleton,
} from '@/components/ui/skeleton-loaders/network-topology-skeleton';
import { useNetworkTopology } from '@/hooks/network-topology';
import { useCytoscape } from '@/hooks/network-topology/useCytoscape';
import { Icon } from '@iconify/react';
import { useEffect, useMemo, useRef, useState } from 'react';

export const NetworkTopologyContent = () => {
  const cyRef = useRef(null);
  const containerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const {
    viewMode,
    setViewMode,
    selectedDevice,
    setSelectedDevice,
    showDeviceModal,
    setShowDeviceModal,
    searchQuery,
    setSearchQuery,
    layoutType,
    setLayoutType,
    expandedNodes,
    setExpandedNodes,
    focusedNode,
    setFocusedNode,
    topologyData,
    isLoadingTopology,
    topologyError,
  } = useNetworkTopology();

  const styles = sharedStyles;

  useEffect(() => {
    const onFullscreenChange = () => {
      const isFull = !!document.fullscreenElement;
      setIsFullscreen(isFull);
      if (cyRef.current) {
        setTimeout(() => {
          cyRef.current.resize();
          cyRef.current.fit(null, 60);
        }, 150);
      }
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const { getLayoutConfig, resetFocus, focusOnNode } = useCytoscape({
    containerRef,
    cyRef,
    viewMode,
    layoutType,
    topologyData,
    searchQuery,
    setFocusedNode,
    focusedNode,
    setSelectedDevice,
    setShowDeviceModal,
  });

  const handleZoomIn = () => {
    if (cyRef.current && !cyRef.current.destroyed()) {
      cyRef.current.animate({
        zoom: cyRef.current.zoom() * 1.3,
        duration: 300,
      });
    }
  };

  const handleZoomOut = () => {
    if (cyRef.current && !cyRef.current.destroyed()) {
      cyRef.current.animate({
        zoom: cyRef.current.zoom() * 0.7,
        duration: 300,
      });
    }
  };

  const handleFitView = () => {
    if (cyRef.current && !cyRef.current.destroyed()) {
      cyRef.current.animate({
        fit: { padding: 60 },
        duration: 500,
        easing: 'ease-in-out-cubic',
      });
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.parentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleResetView = () => {
    if (cyRef.current && !cyRef.current.destroyed()) {
      resetFocus(cyRef.current);
      setFocusedNode(null);
      handleFitView();
    }
  };

  const handleRelayout = () => {
    if (cyRef.current && !cyRef.current.destroyed()) {
      const layout = cyRef.current.layout(getLayoutConfig(layoutType));
      layout.run();
    }
  };

  const handleExportPNG = () => {
    if (cyRef.current && !cyRef.current.destroyed()) {
      const png = cyRef.current.png({
        output: 'blob',
        bg: '#0a0f1a',
        full: true,
        scale: 2,
      });
      const url = URL.createObjectURL(png);
      const link = document.createElement('a');
      link.href = url;
      link.download = `topology-${viewMode}-${Date.now()}.png`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleExportJSON = () => {
    if (cyRef.current && !cyRef.current.destroyed()) {
      const json = cyRef.current.json();
      const blob = new Blob([JSON.stringify(json, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `topology-${viewMode}-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  // Render device tree recursively
  const renderTreeNode = (node, depth = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes[node.name];
    const isDevice = !!node.id;

    const getStatusColor = (status) => {
      switch (status) {
        case 'online':
          return styles.statusOnline;
        case 'offline':
          return styles.statusOffline;
        case 'warning':
          return styles.statusWarning;
        default:
          return '';
      }
    };

    const getNodeIcon = (type) => {
      if (type === 'group') return 'mdi:folder';
      if (type === 'vendor') return 'mdi:domain';
      if (type === 'router') return 'mdi:router';
      if (type === 'switch') return 'mdi:switch';
      if (type === 'firewall') return 'mdi:security';
      if (type === 'controller') return 'mdi:server-network';
      if (type === 'cloud-provider') return 'mdi:cloud';
      if (type === 'region') return 'mdi:earth';
      if (type === 'server') return 'mdi:server';
      if (type === 'access-point') return 'mdi:wifi';
      return 'mdi:circle';
    };

    const handleNodeClick = () => {
      if (hasChildren) {
        setExpandedNodes((prev) => ({
          ...prev,
          [node.name]: !prev[node.name],
        }));
      } else if (isDevice && cyRef.current && !cyRef.current.destroyed()) {
        // Focus on this device in the topology
        const cyNode = cyRef.current.getElementById(node.id);
        if (cyNode) {
          focusOnNode(cyRef.current, cyNode);
          setFocusedNode(node.id);
        }
      }
    };

    return (
      <div key={node?.name || node?.id} className={styles.treeNode}>
        <div
          className={`${styles.treeNodeLabel} ${
            isDevice ? styles.treeNodeDevice : ''
          } ${focusedNode === node?.id ? styles.treeNodeFocused : ''}`}
          onClick={handleNodeClick}
        >
          {hasChildren && (
            <Icon
              icon={isExpanded ? 'mdi:chevron-down' : 'mdi:chevron-right'}
              width={16}
              height={16}
              className={styles.treeNodeChevron}
            />
          )}
          {!hasChildren && <span className={styles.treeNodeSpacer}></span>}
          <Icon
            icon={getNodeIcon(node?.type)}
            width={16}
            height={16}
            className={`${styles.treeNodeIcon} ${
              isDevice ? getStatusColor(node.status) : ''
            }`}
          />
          <span className={styles.treeNodeText}>{node?.name}</span>
          {isDevice && node.ip && (
            <span className={styles.treeNodeIp}>{node.ip}</span>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className={styles.treeNodeChildren}>
            {node.children.map((child) => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const filterTree = (node, query) => {
    if (!node) return null;
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return node;

    const matchesNode =
      String(node.name || '')
        .toLowerCase()
        .includes(normalizedQuery) ||
      String(node.ip || '')
        .toLowerCase()
        .includes(normalizedQuery);
    const children = (node.children || [])
      .map((child) => filterTree(child, query))
      .filter(Boolean);

    if (matchesNode || children.length > 0) {
      return { ...node, children };
    }
    return null;
  };

  const currentTopologyData = useMemo(
    () => filterTree(topologyData?.views?.[viewMode], searchQuery),
    [topologyData, viewMode, searchQuery]
  );

  const selectedConnections = useMemo(() => {
    if (!selectedDevice || !topologyData?.devices) return [];
    return (selectedDevice.connections || [])
      .map((deviceId) =>
        topologyData?.devices.find((device) => device.id === deviceId)
      )
      .filter(Boolean)
      .map((device) => ({
        target: device.label || device.name,
        type: device.type,
        ip: device.ip,
        status: device.status,
      }));
  }, [selectedDevice, topologyData]);

  const summary = topologyData?.summary || {};
  const currentViewHasDevices =
    (currentTopologyData?.children || []).length > 0;

  return (
    <div className={styles.networkTopology}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Icon
            icon="mdi:sitemap"
            width={24}
            height={24}
            className={styles.headerIcon}
          />
          <h1 className={styles.title}>Network Topology</h1>
          <div className={styles.headerStats}>
            <span className={styles.statBadge}>
              <Icon icon="mdi:server-network" width={16} height={16} />
              {summary.devices || 0} Devices
            </span>
            <span className={styles.statBadge}>
              <Icon icon="mdi:connection" width={16} height={16} />
              {summary.connections || 0} Connections
            </span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchBar}>
            <Input
              icon={<Icon icon="mdi:magnify" width={18} height={18} />}
              type="text"
              placeholder="Search devices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              containerClassName={styles.searchInputContainer}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Left Sidebar - Device Tree */}
        <div className={styles.leftSidebar}>
          {/* View Mode Tabs */}
          <div className={styles.viewTabs}>
            <Button
              variant="outline"
              className={`${styles.viewTab} ${
                viewMode === 'network' ? styles.viewTabActive : ''
              }`}
              onClick={() => setViewMode('network')}
              title="Network View"
            >
              <Icon icon="mdi:lan" width={20} height={20} />
            </Button>
            <Button
              variant="outline"
              className={`${styles.viewTab} ${
                viewMode === 'sdn' ? styles.viewTabActive : ''
              }`}
              onClick={() => setViewMode('sdn')}
              title="SDN View"
            >
              <Icon icon="mdi:network-outline" width={20} height={20} />
            </Button>
            <Button
              variant="outline"
              className={`${styles.viewTab} ${
                viewMode === 'cloud' ? styles.viewTabActive : ''
              }`}
              onClick={() => setViewMode('cloud')}
              title="Cloud View"
            >
              <Icon icon="mdi:cloud" width={20} height={20} />
            </Button>
          </div>

          {/* Device Tree Search */}
          <div className={styles.treeSearch}>
            <Input
              icon={<Icon icon="mdi:magnify" width={16} height={16} />}
              type="text"
              placeholder="Filter devices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Device Tree */}
          <div className={styles.deviceTree}>
            {isLoadingTopology && <TopologySidebarSkeleton />}
            {!isLoadingTopology && topologyError && (
              <div className={styles.statePanel}>
                <Icon icon="mdi:alert-circle-outline" width={24} height={24} />
                <span>{topologyError}</span>
              </div>
            )}
            {!isLoadingTopology &&
              !topologyError &&
              currentViewHasDevices &&
              renderTreeNode(currentTopologyData)}
            {!isLoadingTopology && !topologyError && !currentViewHasDevices && (
              <div style={{ padding: '24px 16px' }}>
                <NoDataFound
                  title="No Devices Found"
                  description="No topology data available for this view."
                  icon="mdi:lan-disconnect"
                />
              </div>
            )}
          </div>

          {/* Legend */}
          <div className={styles.legend}>
            <div className={styles.legendTitle}>Status Legend</div>
            <div className={styles.legendItems}>
              <div className={styles.legendItem}>
                <div
                  className={`${styles.legendDot} ${styles.legendOnline}`}
                ></div>
                <span>Online</span>
              </div>
              <div className={styles.legendItem}>
                <div
                  className={`${styles.legendDot} ${styles.legendWarning}`}
                ></div>
                <span>Warning</span>
              </div>
              <div className={styles.legendItem}>
                <div
                  className={`${styles.legendDot} ${styles.legendOffline}`}
                ></div>
                <span>Offline</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Topology Canvas */}
        <div className={styles.topologyCanvas}>
          {/* Top Toolbar */}
          <div className={styles.canvasToolbar}>
            <div className={styles.canvasToolbarLeft}>
              <div className={styles.layoutSelector}>
                <Select
                  value={{ value: layoutType, label: layoutType }}
                  options={[
                    { value: 'cose', label: 'Force-Directed' },
                    { value: 'circle', label: 'Circle' },
                    { value: 'concentric', label: 'Concentric' },
                    { value: 'grid', label: 'Grid' },
                    { value: 'breadthfirst', label: 'Hierarchical' },
                  ]}
                  onChange={(selected) => setLayoutType(selected.value)}
                  isSearchable={false}
                  placeholder="Select Layout"
                />
              </div>
              <Button
                variant="outline"
                className={styles.toolbarBtn}
                onClick={handleRelayout}
                title="Re-apply Layout"
              >
                <Icon icon="mdi:refresh" width={18} height={18} />
              </Button>
            </div>
            <div className={styles.canvasToolbarRight}>
              <Button
                variant="outline"
                className={styles.toolbarBtn}
                onClick={handleExportPNG}
                title="Export as PNG"
              >
                <Icon icon="mdi:image-outline" width={18} height={18} />
              </Button>
              <Button
                variant="outline"
                className={styles.toolbarBtn}
                onClick={handleExportJSON}
                title="Export as JSON"
              >
                <Icon icon="mdi:code-json" width={18} height={18} />
              </Button>
            </div>
          </div>

          {/* Cytoscape Container */}
          <div ref={containerRef} className={styles.cytoscape}>
            {isLoadingTopology && <TopologyCanvasSkeleton />}
            {!isLoadingTopology && topologyError && (
              <div className={styles.canvasState}>
                <Icon icon="mdi:alert-circle-outline" width={32} height={32} />
                <span>{topologyError}</span>
              </div>
            )}
            {!isLoadingTopology && !topologyError && !currentViewHasDevices && (
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div style={{ maxWidth: '400px' }}>
                  <NoDataFound
                    title="Topology Empty"
                    description="Try adjusting your filters or switching views to map devices."
                    icon="mdi:sitemap-outline"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Info Panel */}
          {focusedNode && (
            <div className={styles.infoPanel}>
              <div className={styles.infoPanelHeader}>
                <Icon icon="mdi:information" width={18} height={18} />
                <span>Focused Device</span>
                <Button
                  variant="outline"
                  className={styles.infoPanelClose}
                  onClick={handleResetView}
                >
                  <Icon icon="mdi:close" width={16} height={16} />
                </Button>
              </div>
              <div className={styles.infoPanelContent}>
                <p>Click on neighboring devices to explore connections</p>
                <p>Double-click to center and zoom</p>
              </div>
            </div>
          )}

          {/* Right Controls */}
          <div className={styles.rightControls}>
            <Button
              variant="outline"
              className={styles.controlBtn}
              onClick={handleZoomIn}
              title="Zoom In"
            >
              <Icon icon="mdi:plus" width={20} height={20} />
            </Button>
            <Button
              variant="outline"
              className={styles.controlBtn}
              onClick={handleZoomOut}
              title="Zoom Out"
            >
              <Icon icon="mdi:minus" width={20} height={20} />
            </Button>
            <Button
              variant="outline"
              className={styles.controlBtn}
              onClick={handleFitView}
              title="Fit to Screen"
            >
              <Icon icon="mdi:fit-to-screen" width={20} height={20} />
            </Button>
            <Button
              variant="outline"
              className={styles.controlBtn}
              onClick={handleResetView}
              title="Reset View"
            >
              <Icon icon="mdi:restore" width={20} height={20} />
            </Button>
            <Button
              variant="outline"
              className={styles.controlBtn}
              onClick={handleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              <Icon
                icon={isFullscreen ? 'mdi:fullscreen-exit' : 'mdi:fullscreen'}
                width={20}
                height={20}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Device Detail Sidebar */}
      <DeviceDetailSidebar
        device={selectedDevice}
        connections={selectedConnections}
        isOpen={showDeviceModal}
        onClose={() => {
          setShowDeviceModal(false);
          setSelectedDevice(null);
        }}
      />
    </div>
  );
};
