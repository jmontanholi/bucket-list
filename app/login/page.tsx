import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <div className="flex flex-col align-center justify-center">
        <h1 className="flex items-center justify-center text-5xl mb-3 text-orange-500">BucketList</h1>
      </div>
      <div className="w-2/4 h-96 flex items-center justify-around border-4 rounded-md border-orange-200 divide-x divide-orange-200">
        <div className="h-full p-20 flex flex-col items-center justify-between">
            <div className="w-full flex flex-col items-center justify-center gap-3">
                <input 
                    className="border-2 border-orange-200 rounded-md p-2 outline-none focus:bg-orange-100/10 focus:border-orange-500" 
                    type="text" 
                    placeholder="example@gmail.com"
                />
                <input 
                    className="border-2 border-orange-200 rounded-md p-2 outline-none focus:bg-orange-100/10 focus:border-orange-500" 
                    type="password" 
                    placeholder="password"
                />
                <button className="text-orange-600 bg-orange-100 py-2 px-5 rounded-md transition duration-250 border-2 border-transparent hover:border-orange-600">Log In</button>
            </div>
            <button className="text-sm text-orange-300 underline decoration-solid decoration-orange-400">forgot your password?</button>
        </div>
        <div className="h-72 p-10 text-sm flex flex-col items-center justify-center gap-5">
            <p>Doesn&apos;t have an account?</p>
            <Link href="/signup" className="hover:text-orange-600 border-2 hover:border-orange-300 py-2 px-5 rounded-md transition duration-250">
                Sign Up
            </Link>
        </div>
      </div>
    </main>
  );
}
