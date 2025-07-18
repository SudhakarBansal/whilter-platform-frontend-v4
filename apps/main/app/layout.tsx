import '@whilter/ui-kit/globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react'
 
const inter = Inter({ subsets: ['latin'] });
 
export const metadata: Metadata = {
  title: 'Main',
  description: 'Whilter main',
};
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
   <html lang="en">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  
  );
}