"use client";
import Image from "next/image";
import bucket from "@/public/bucket.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

function Header({ user }: { user: object | undefined | null }) {
  const pathname = usePathname();
  const backgroundLink =
    "text-center text-orange-600 bg-orange-100 py-2 px-5 rounded-md transition duration-250 border-2 border-transparent hover:border-orange-600";
  const borderBottomLink =
    "hover:text-orange-600 border-b-2 hover:border-orange-300 py-2 px-5 transition duration-250";

  return (
    <header className="w-full flex itmes-center justify-between border-b-2 border-slate-200 py-3 px-5 fixed bg-white">
      <Link href="/">
        <Image src={bucket} alt="orange bucket" width={50} />
      </Link>
      <ul className="flex items-center gap-5">
        {user ? (
          <>
            <Link
              href="/dashboard"
              className={clsx(borderBottomLink, {
                "border-orange-300": pathname == "/dashboard",
              })}
            >
              Dashboard
            </Link>
            <Link href="/api/auth/logout" className={backgroundLink}>
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link href="/api/auth/login" className={borderBottomLink}>
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
