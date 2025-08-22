import { MainLayout } from "@whilter/shared-layouts/main";
import { ThemeConfig } from "@whilter/config";
import { NavbarClientWrapper } from "../../components/navbar/NavbarClientWrapper";
import { getSession } from "@whilter/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <>
      <NavbarClientWrapper user={session} />
      <MainLayout>{children}</MainLayout>
    </>
  );
}
