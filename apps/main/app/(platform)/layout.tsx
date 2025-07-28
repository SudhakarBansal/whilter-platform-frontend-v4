// app/(platform)/layout.tsx
import { MainLayout } from '@whilter/shared-layouts/main';
import { ThemeConfig } from "@whilter/config";
import { NavbarClientWrapper } from '../../components/navbar/NavbarClientWrapper';
import { getServerSession } from "next-auth";
import { authOptions } from "@whilter/auth";


export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <ThemeConfig>
      <NavbarClientWrapper user={session?.user}>
        <MainLayout>
          {children}
        </MainLayout>
      </NavbarClientWrapper>
    </ThemeConfig>
  );
}