import styles from './styles.module.css';

/**
 * NetworkBackground — Clean Grid + Corner Crosshair Design
 *
 * Reference: subtle uniform grid lines across the full viewport,
 * with small + crosshair markers at 4 corner positions (inset ~60px).
 *
 * Nothing else — no dots, no nodes, no circuit traces, no packets.
 * Keeps the UI calm, balanced, and enterprise-professional.
 */
const NetworkBackground = () => (
  <div className={styles.networkBg}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/*
          Grid tile: 72×72 px cell.
          Path draws only the left + top edge of each tile.
          Tiled across the viewport = full uniform grid.
        */}
        <pattern
          id="nb_grid"
          width="72"
          height="72"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 72 0 L 0 0 0 72"
            fill="none"
            stroke="rgba(100, 130, 200, 0.11)"
            strokeWidth="0.75"
          />
        </pattern>
      </defs>

      {/* ── Layer 1: Full-viewport grid ── */}
      <rect width="1440" height="900" fill="url(#nb_grid)" />

      {/*
        ── Layer 2: Corner crosshair markers ──
        Positioned 64px inset from each viewport corner.
        Each + is 14px in each direction from its centre (28px total arm span).
        Matches the reference design exactly.
      */}
      <g
        stroke="rgba(100, 130, 200, 0.40)"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        {/* Top-left  — centre: (64, 64) */}
        <line x1="50"   y1="64"  x2="78"   y2="64"  />
        <line x1="64"   y1="50"  x2="64"   y2="78"  />

        {/* Top-right — centre: (1376, 64) */}
        <line x1="1362" y1="64"  x2="1390" y2="64"  />
        <line x1="1376" y1="50"  x2="1376" y2="78"  />

        {/* Bottom-left — centre: (64, 836) */}
        <line x1="50"   y1="836" x2="78"   y2="836" />
        <line x1="64"   y1="822" x2="64"   y2="850" />

        {/* Bottom-right — centre: (1376, 836) */}
        <line x1="1362" y1="836" x2="1390" y2="836" />
        <line x1="1376" y1="822" x2="1376" y2="850" />
      </g>
    </svg>
  </div>
);

export default NetworkBackground;
