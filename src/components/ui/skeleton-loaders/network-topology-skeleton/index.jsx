import React from 'react';
import styles from './styles.module.css';

export const TopologySidebarSkeleton = () => {
  return (
    <div className={styles.sidebarSkeleton}>
      {[0, 1, 0, 1, 2, 0, 1, 2, 3, 0].map((depth, i) => (
        <div 
          key={i} 
          className={styles.treeItemWrapper}
          style={{ paddingLeft: `${depth * 20}px` }}
        >
          <div className={`${styles.skeletonInner} ${styles.treeIcon}`} />
          <div className={`${styles.skeletonInner} ${styles.treeText}`} style={{ width: `${80 - depth * 10}%` }} />
        </div>
      ))}
    </div>
  );
};

export const TopologyCanvasSkeleton = () => {
  return (
    <div className={styles.canvasSkeleton}>
       <div className={styles.nodesContainer}>
         {/* Center Node */}
         <div className={`${styles.skeletonInner} ${styles.topologyNode} ${styles.centerNode}`} />
         
         {/* Satellite Nodes */}
         <div className={`${styles.skeletonInner} ${styles.topologyNode} ${styles.satelliteNode1}`} />
         <div className={`${styles.skeletonInner} ${styles.topologyNode} ${styles.satelliteNode2}`} />
         <div className={`${styles.skeletonInner} ${styles.topologyNode} ${styles.satelliteNode3}`} />
         <div className={`${styles.skeletonInner} ${styles.topologyNode} ${styles.satelliteNode4}`} />
         
         {/* Connectors */}
         <div className={`${styles.skeletonInner} ${styles.connector} ${styles.conn1}`} />
         <div className={`${styles.skeletonInner} ${styles.connector} ${styles.conn2}`} />
         <div className={`${styles.skeletonInner} ${styles.connector} ${styles.conn3}`} />
         <div className={`${styles.skeletonInner} ${styles.connector} ${styles.conn4}`} />
       </div>
    </div>
  );
};
