'use client';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex items-center justify-center 
  bg-gradient-to-b from-blue-700 to-blue-900 
  bg-[url('/images/auth-background.png')] bg-cover bg-center bg-no-repeat text-white">
  {children}
</div>
}
