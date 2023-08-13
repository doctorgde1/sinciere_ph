import Providers from "@/components/Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import ModeToggle from "@/components/ModeToggle";
import { getAuthSession } from "@/lib/auth";
import Header from "@/components/Header";
import SignInButton from "@/components/SignInButton";
import UserAccountNav from "@/components/UserAccountNav";
import Logo from "@/components/Logo";
import { LogIn } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: [
    { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
    { rel: "icon", sizes: "32x32", url: "/favicon-32x32.png" },
    { rel: "icon", sizes: "16x16", url: "/favicon-16x16.png" },
  ],
  title: "Sinciere Ph",
  description: "Photographer's portfolio",
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  console.log(session);

  const SITE_NAVIGATION = [
    { displayName: "Головна", href: "/" },
    { displayName: "Портфоліо", href: "/portfolio" },
    { displayName: "Прайс", href: "/price" },
    { displayName: "Умови праці", href: "/conditions" },
  ];

  const USER_NAVIGATION = session?.user.role === "ADMIN" ? [
      { displayName: "Галереї", href: `/galleries` },
  ]: [{ displayName: "Мої фото", href: `/galleries/${session?.user.id}` }] ;

  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <Providers>
          <Header className="flex gap-x-4 justify-between sm:gap-x-12">
            <Logo
              href={"/"}
              content={"@sinciere_ph"}
              className="z-50 text-lg sm:text-2xl"
            />
            <div className="flex gap-2 items-center">
              {!session?.user ? (
                <SignInButton
                  variant={"destructive"}
                  size={"icon"}
                  className="z-50"
                >
                  <LogIn />
                </SignInButton>
              ) : (
                <UserAccountNav links={USER_NAVIGATION} className="z-50" user={session.user} />
              )}
              <Navbar links={SITE_NAVIGATION} />
            </div>
          </Header>
          {children}
          <ModeToggle className="fixed bottom-0 z-50 m-3 shrink-0" />
        </Providers>
      </body>
    </html>
  );
}
