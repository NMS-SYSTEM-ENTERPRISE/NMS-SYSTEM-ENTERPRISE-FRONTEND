
"use client";

import { Header } from '@/components/layout/header';
import SettingsSidebar from '@/components/layout/settings-sidebar';
import { Sidebar } from '@/components/layout/sidebar';
import { ChatbotWidget } from '@/components/features/chatbot/ChatbotWidget';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isSettings = pathname?.startsWith('/settings');
  const isCustomDashboard = pathname?.includes('/dashboard/custom') || pathname?.includes('/dashboard-custom');
  const isLogin = pathname === '/' || pathname === '/login';
  const isManual = pathname === '/manual';

  if (isLogin || isManual) {
    return <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>{children}</main>;
  }

  return (
    <div className="standardLayout">
      <Sidebar />
      {isSettings && <SettingsSidebar />}
      <div className="standardMainWrapper">
        {!isCustomDashboard && <Header />}
        <main 
          className={isCustomDashboard ? "fullContent" : "standardContent"}
          style={pathname === '/log-management' ? { overflow: 'hidden' } : {}}
        >
           {children}
        </main>
      </div>
      <ChatbotWidget />
    </div>
  );
}
