"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import bucket from "@/public/bucket.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect } from "react";

function Header() {
  const { user, error, isLoading } = useUser();
  const pathname = usePathname();
  const backgroundLink =
    "text-center text-orange-600 bg-orange-100 py-2 px-5 rounded-md transition duration-250 border-2 border-transparent hover:border-orange-600";
  const borderBottomLink =
    "hover:text-orange-600 border-b-2 hover:border-orange-300 py-2 px-5 transition duration-250";
  const borderFullLink =
    "hover:text-orange-600 border-2 hover:border-orange-300 py-2 px-5 rounded-md transition duration-250";

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <header className="flex itmes-center justify-between border-b-2 border-orange-500 py-3 px-5">
      <Link href="/">
        <Image src={bucket} alt="orange bucket" width={50} />
      </Link>
      <ul className="flex items-center gap-5">
        <Link
          href="/dashboard"
          className={clsx(borderBottomLink, {
            "border-orange-300": pathname == "/dashboard",
          })}
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/user-profile"
          className={clsx(borderBottomLink, {
            "border-orange-300": pathname == "/dashboard/user-profile",
          })}
        >
          Profile
        </Link>
        {user ? (
          <Link href="/api/auth/logout" className={backgroundLink}>
            Log Out
          </Link>
        ) : (
          <>
            <Link href="/api/auth/login" className={borderFullLink}>
              Log In
            </Link>
            <Link href="/404" className={backgroundLink}>
              Sign Up
            </Link>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
