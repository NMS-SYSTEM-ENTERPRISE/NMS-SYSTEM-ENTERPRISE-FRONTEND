import styles from './styles.module.css';

const AlertCountWidget = () => {
  const alerts = [
    { label: 'Down', count: 17, color: '#ef4444', percentage: 20 },
    { label: 'Critical', count: 52, color: '#ef4444', percentage: 60 },
    { label: 'Major', count: 2, color: '#f97316', percentage: 10 },
    { label: 'Warning', count: 4, color: '#fbbf24', percentage: 15 },
  ];

  const createArc = (percentage) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const dashArray = `${(percentage / 100) * circumference} ${circumference}`;
    return dashArray;
  };

  return (
    <div className={styles.alertCountWidget}>
      <h3 className={styles.title}>Alert Count</h3>
      <div className={styles.gaugesContainer}>
        {alerts.map((alert, index) => (
          <div key={index} className={styles.gaugeItem}>
            <svg className={styles.gauge} viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke="#3a3a3a"
                strokeWidth="12"
              />
              {/* Progress arc */}
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke={alert.color}
                strokeWidth="12"
                strokeDasharray={createArc(alert.percentage)}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                className={styles.progressArc}
              />
              {/* Count text */}
              <text
                x="60"
                y="68"
                textAnchor="middle"
                fill={alert.color}
                fontSize="32"
                fontWeight="bold"
              >
                {alert.count}
              </text>
            </svg>
            <span className={styles.label}>{alert.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertCountWidget;
