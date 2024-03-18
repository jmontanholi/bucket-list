import { createUser } from "@/app/lib/actions";

function SignUp() {
  const input = "border-2 border-orange-200 rounded-md p-1";

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-24">
      <div className="flex flex-col align-center justify-center">
        <form action={createUser} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={input}
          />
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            className={input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={input}
          />
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Password confirmation"
            className={input}
          />
          <button
            type="submit"
            className="text-center text-orange-600 bg-orange-100 p-1 rounded-md transition duration-250 border-2 border-transparent hover:border-orange-600"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

export default SignUp;
