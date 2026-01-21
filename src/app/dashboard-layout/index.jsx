import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Outlet } from 'react-router-dom';
import styles from './styles.module.css';

const DashboardLayout = () => {
  return (
    <div className={styles.dashboardLayout_mainContainer}>
      <Sidebar />
      <div className={styles.dashboardLayout_subContainer}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export { DashboardLayout };
