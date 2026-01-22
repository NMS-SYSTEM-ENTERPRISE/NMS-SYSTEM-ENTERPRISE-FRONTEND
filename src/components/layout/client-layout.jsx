
"use client";

import { Header } from '@/components/layout/header';
import SettingsSidebar from '@/components/layout/settings-sidebar';
import { Sidebar } from '@/components/layout/sidebar';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isSettings = pathname?.startsWith('/settings');
  const isCustomDashboard = pathname?.includes('/dashboard/custom') || pathname?.includes('/dashboard-custom');
  const isLogin = pathname === '/' || pathname === '/login';

  if (isLogin) {
    return <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>{children}</main>;
  }

  return (
    <div className="standardLayout">
      <Sidebar />
      {isSettings && <SettingsSidebar />}
      <div className="standardMainWrapper">
        {!isCustomDashboard && <Header />}
        <main className={isCustomDashboard ? "fullContent" : "standardContent"}>
           {children}
        </main>
      </div>
    </div>
  );
}
