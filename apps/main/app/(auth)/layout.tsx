'use client';
import { ThemeConfig } from "@whilter/config";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <ThemeConfig>
       <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-700 to-blue-900 text-white"
      style={{
        backgroundImage: "url('/images/auth-background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {children}
    </div>
    </ThemeConfig>
    </>
   
  );
}

