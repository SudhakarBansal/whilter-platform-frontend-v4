import '@whilter/ui-kit/globals.css';
import { Inter } from 'next/font/google';
import SessionWrapper from '@/components/service-cards/SessionWrapper';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
