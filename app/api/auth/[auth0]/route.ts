import {
  handleAuth,
  handleCallback,
  AfterCallbackAppRoute,
} from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import { userExists, createUser } from "@/app/lib/actions";

const afterCallback: AfterCallbackAppRoute = async (req, session) => {
  const { sub, nickname, email } = session.user;

  const exists = await userExists(sub);

  if (!exists) {
    createUser({ id: sub, username: nickname, email: email });
  }

  return session;
};

export const GET = handleAuth({
  async callback(req, ctx) {
    const res = (await handleCallback(req, ctx, {
      afterCallback,
    })) as NextResponse;

    return res;
  },
});
