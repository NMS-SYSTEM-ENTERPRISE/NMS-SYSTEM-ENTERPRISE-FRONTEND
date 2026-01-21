import { Icon } from '@iconify/react';
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
} from 'recharts';
import styles from '../styles.module.css';

export const OtherDashboard = ({ upCount, downCount }) => {
  return (
    <div className={styles.dashboardView}>
      <div className={styles.dashboardGrid} style={{ gridTemplateColumns: '1fr' }}>
         <div className={styles.dashboardCard}>
          <div className={styles.cardContent} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', gap: '20px' }}>
             <Icon icon="mdi:chart-box-outline" width={64} height={64} style={{ color: 'var(--color-text-secondary)' }} />
             <div style={{ fontSize: '18px', color: 'var(--color-text-secondary)' }}>General Overview for Other Devices</div>
             <div style={{ display: 'flex', gap: '40px' }}>
               <div style={{ textAlign: 'center' }}>
                 <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>{upCount}</div>
                 <div style={{ color: 'var(--color-text-secondary)' }}>Up</div>
               </div>
               <div style={{ textAlign: 'center' }}>
                 <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444' }}>{downCount}</div>
                 <div style={{ color: 'var(--color-text-secondary)' }}>Down</div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DefaultDashboard = ({ category, config, data, upCount, downCount }) => {
  return (
    <div className={styles.dashboardView}>


      <div className={styles.dashboardGrid}>
        {/* Health Overview Card */}
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Icon icon="mdi:heart-pulse" width={20} height={20} />
              Health Overview
            </h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.healthDonut}>
              <div className={styles.donutChart}>
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Up', value: upCount },
                        { name: 'Down', value: downCount },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell key="cell-up" fill="#10b981" />
                      <Cell key="cell-down" fill="#ef4444" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className={styles.donutCenter}>
                  <span className={styles.donutValue}>{data.length}</span>
                  <span className={styles.donutLabel}>Total</span>
                </div>
              </div>
              <div className={styles.healthLegend}>
                <div className={styles.legendItem}>
                  <span
                    className={styles.legendDot}
                    style={{ backgroundColor: '#10b981' }}
                  ></span>
                  <span>Up: {upCount}</span>
                </div>
                <div className={styles.legendItem}>
                  <span
                    className={styles.legendDot}
                    style={{ backgroundColor: '#ef4444' }}
                  ></span>
                  <span>Down: {downCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Distribution Card */}
        <div className={styles.dashboardCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <Icon icon="mdi:chart-bar" width={20} height={20} />
              Status Distribution
            </h3>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.statusBars}>
              <div className={styles.statusBar}>
                <div className={styles.statusBarLabel}>Operational</div>
                <div className={styles.statusBarTrack}>
                  <div
                    className={styles.statusBarFill}
                    style={{
                      width: `${(upCount / data.length) * 100}%`,
                      backgroundColor: '#10b981',
                    }}
                  ></div>
                </div>
                <div className={styles.statusBarValue}>{upCount}</div>
              </div>
              <div className={styles.statusBar}>
                <div className={styles.statusBarLabel}>Down</div>
                <div className={styles.statusBarTrack}>
                  <div
                    className={styles.statusBarFill}
                    style={{
                      width: `${(downCount / data.length) * 100}%`,
                      backgroundColor: '#ef4444',
                    }}
                  ></div>
                </div>
                <div className={styles.statusBarValue}>{downCount}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        {config.dashboardWidgets.slice(2).map((widget, index) => (
          <div key={index} className={styles.dashboardCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                <Icon icon="mdi:chart-line" width={20} height={20} />
                {widget}
              </h3>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.widgetPlaceholder}>
                <Icon icon="mdi:chart-areaspline" width={48} height={48} />
                <p>Widget: {widget}</p>
                <span className={styles.placeholderText}>
                  Data visualization coming soon
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resource Grid */}
      <div className={styles.resourceGrid}>
        <h3 className={styles.sectionTitle}>
          <Icon
            icon={config.icon}
            width={20}
            height={20}
            style={{ color: config.color }}
          />
          {category} Resources
        </h3>
        <div className={styles.hexagonGrid}>
          {data.slice(0, 30).map((item) => {
            let hexColor = item.status === 'Up' ? '#10b981' : '#ef4444';
            return (
              <div
                key={item.id}
                className={styles.hexagon}
                style={{ backgroundColor: hexColor }}
                title={item.name}
              >
                <span className={styles.hexagonLabel}>
                  {item.name.substring(0, 3)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
