import { MainLayout } from '@whilter/shared-layouts/main';
import { ThemeConfig } from "@whilter/config";
import { NavbarClientWrapper } from '../../components/navbar/NavbarClientWrapper';
import { getServerSession } from "next-auth";
import { authOptions } from "@whilter/auth";
import NextLink from "next/link";
import NextImage from "next/image";
import { Sidebar } from "@whilter/shared-layouts/sidebar";
import { menuItems} from "../../utils/data/menuItems.data";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * The root layout component for the application.
 *
 * This component wraps the main app layout in a theme config and a navbar
 * client wrapper. It also fetches the user session using the
 * `getServerSession` function.
 *
 * @prop {React.ReactNode} children - The children components to render within
 *                                    the main layout.
 *
 * @returns {React.ReactElement} The root layout component.
 */
/*******  7c7a0f10-ce14-4c09-b3ba-76cf59b8b9dc  *******/
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
              showSidebar={true}
              sidebarComponent={
                <Sidebar
                  menuItems={menuItems}
                  LinkComponent={NextLink}
                  ImageComponent={NextImage}
                />
              }
            >
              {children}
            </MainLayout>

      </NavbarClientWrapper>
    </ThemeConfig>
  );
}