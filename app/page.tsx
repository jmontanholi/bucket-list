import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-24">
      <div className="flex flex-col align-center justify-center">
        <h1 className="flex items-center justify-center text-5xl mb-3 text-orange-500">
          Welcome to BucketList
        </h1>
        <h4>
          This app is designed to give you suggestions of activities you could
          aim to do throughout your life
        </h4>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 text-center">
        <p>
          If you want to create your own bucket list or explore suggestions you
          just need to click below!
        </p>
        <Link
          href="/api/auth/login"
          className="w-32 text-center text-orange-600 bg-orange-100 py-2 px-5 rounded-md transition duration-250 border-2 border-transparent hover:border-orange-600"
        >
          Sign Up
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 text-center">
        <p>Already have an account?</p>
        <Link
          href="/api/auth/login"
          className="hover:text-orange-600 border-2 hover:border-orange-300 py-2 px-5 rounded-md transition duration-250"
        >
          Log In
        </Link>
      </div>
    </main>
  );
}
