'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';
import NetworkBackground from '@/screens/login/NetworkBackground';
import { snrLogo } from '@/resources/images/logo';
import styles from './styles.module.css';
import { ROUTE_PATHS } from '@/utils/constants/route-paths';

const NotFoundScreen = () => {
  return (
    <div className={styles.pageWrapper}>
      <NetworkBackground />

      <div className={styles.card}>
        {/* Left Side - Graphic & 404 Text */}
        <div className={styles.cardLeft}>
          <div className={styles.shape1}></div>
          <div className={styles.shape2}></div>
          <div className={styles.sphere1}></div>
          <div className={styles.sphere2}></div>
          <div className={styles.sphere3}></div>

          <div className={styles.leftContent}>
            <h1>404</h1>
            <p>Not Found</p>
          </div>

        </div>

        {/* Right Side - Content */}
        <div className={styles.cardRight}>
          <div className={styles.logoTopRight}>
            <div className={styles.logoImageWrapper}>
              <Image 
                src={snrLogo}
                alt="SNR Edatas"
                width={200}
                height={65}
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          <div className={styles.rightHeader}>
            <span className={styles.greeting}>NetMonitor System</span>
            <h2 className={styles.rightTitle}>
              <span>Oops!</span> Page Not Found
            </h2>
          </div>

          <p className={styles.rightMessage}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. 
            Please check the URL or return to the dashboard.
          </p>

          <Link href={ROUTE_PATHS.DASHBOARD} className={styles.submitBtn}>
            <Icon icon="lucide:home" width={18} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundScreen;
