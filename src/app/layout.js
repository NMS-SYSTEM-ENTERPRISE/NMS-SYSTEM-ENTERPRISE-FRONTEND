import ClientLayout from '@/components/layout/client-layout';
import { AuthGuard } from '@/guards/auth-guard';
import { Providers } from '@/providers/providers';
import '@/styles/standard-layout.css';
import { Geist, Geist_Mono, Manrope } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

export const metadata = {
  title: 'SNR-Edatas AIOps',
  description: 'Network Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <NextTopLoader
          color="#06b6d4"
          initialPosition={0.08}
          crawlSpeed={200}
          height={4}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 12px #06b6d4,0 0 6px #06b6d4"
          zIndex={9999}
        />
        <Providers>
          <AuthGuard>
            <ClientLayout>{children}</ClientLayout>
          </AuthGuard>
        </Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
