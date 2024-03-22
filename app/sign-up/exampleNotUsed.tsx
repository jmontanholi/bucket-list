"use client";

import { SignUp as SignUpRoute } from "@/app/lib/actions";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import bucket from "@/public/bucket.png";

function SignUp() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(SignUpRoute, initialState);

  const input =
    "border-2 border-orange-200 rounded-md p-1 outline-none focus:border-orange-500";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center items-center gap-10 p-24">
      <h1 className="flex items-end justify-center gap-5 text-4xl text-orange-500">
        <Image src={bucket} alt="orange bucket" width={50} />{" "}
        <span>BucketList</span>
      </h1>
      <div className="flex flex-col align-center justify-center">
        <form action={dispatch} className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="flex flex-col">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className={input}
                aria-describedby="firstName-error"
              />
              <div
                className=""
                id="firstName-error"
                aria-live="polite"
                aria-atomic="true"
              >
                {state.errors?.firstName &&
                  state.errors.firstName.map((error: string) => (
                    <p className="mt-0.5 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className={input}
                aria-describedby="lastName-error"
              />
              <div
                className=""
                id="lastName-error"
                aria-live="polite"
                aria-atomic="true"
              >
                {state.errors?.lastName &&
                  state.errors.lastName.map((error: string) => (
                    <p className="mt-0.5 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className={input}
              aria-describedby="username-error"
            />
            <div
              className=""
              id="username-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.errors?.username &&
                state.errors.username.map((error: string) => (
                  <p className="mt-0.5 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className={input}
              aria-describedby="email-error"
            />
            <div
              className="flex gap-1"
              id="email-error"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-0.5 text-sm text-red-500" key={error}>
                    {error}.
                  </p>
                ))}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={input}
                aria-describedby="password-error"
              />
              <div
                className="flex gap-1"
                id="password-error"
                aria-live="polite"
                aria-atomic="true"
              >
                {state.errors?.password &&
                  state.errors.password.map((error: string) => (
                    <p className="mt-0.5 text-sm text-red-500" key={error}>
                      {error}.
                    </p>
                  ))}
              </div>
            </div>
            <div className="flex flex-col">
              <input
                type="password"
                name="passwordConfirmation"
                placeholder="Confirmation"
                className={input}
                aria-describedby="passwordConfirmation-error"
              />
              <div
                className="flex gap-1"
                id="passwordConfirmation-error"
                aria-live="polite"
                aria-atomic="true"
              >
                {state.errors?.passwordConfirmation &&
                  state.errors.passwordConfirmation.map((error: string) => (
                    <p className="mt-0.5 text-sm text-red-500" key={error}>
                      {error}.
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <div
            className="flex gap-1"
            id="password-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.matchPassword &&
              state.errors.matchPassword.map((error: string) => (
                <p
                  className="w-full mt-0.5 text-sm text-red-500 text-center"
                  key={error}
                >
                  {error}.
                </p>
              ))}
          </div>
          <button
            type="submit"
            className="text-center text-orange-600 bg-orange-100 p-1 rounded-md transition duration-250 border-2 border-transparent hover:border-orange-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </main>
  );
}

export default SignUp;
