import { MainLayout } from '@whilter/shared-layouts/main';
import { ThemeConfig } from "@whilter/config";
import { NavbarClientWrapper } from '../../components/navbar/NavbarClientWrapper';
import { getServerSession } from "next-auth";
import { authOptions } from "@whilter/auth";
import NextLink from "next/link";
import NextImage from "next/image";
import { Sidebar } from "@whilter/shared-layouts/sidebar";
import { menuItems} from "../../utils/data/menuItems.data";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <ThemeConfig>
      <NavbarClientWrapper user={session}>
      <MainLayout
              // showSidebar={true}
              // sidebarComponent={
              //   <Sidebar
              //     menuItems={menuItems}
              //     LinkComponent={NextLink}
              //     ImageComponent={NextImage}
              //   />
              // }
            >
              {children}
            </MainLayout>

      </NavbarClientWrapper>
    </ThemeConfig>
  );
}