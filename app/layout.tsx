import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Header from "@/app/components/layout/header";
import { getSession } from "@auth0/nextjs-auth0";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BucketList",
  description: "Generate and update your own bucket list",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const user = session?.user;

  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <Header user={user} />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
