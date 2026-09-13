"use server";
import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { decrypt, deleteSession } from "@/app/actions/session";
import { db } from "@/app/lib/db";
import { redirect } from "next/dist/client/components/navigation";
import { logout } from "../actions/auth";

export const verifySession = cache(async () => {
  console.log("verifySession is running");

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  // console.log("session", session);
  return session;
});

export const getUser = cache(async () => {
  console.log("getUser is running");
  const StoreCookies = await cookies();
  const cookie = StoreCookies.get("session")?.value;
  const payload = await decrypt(cookie);
  console.log("session", payload);

  const user = db.findUserById(payload?.userId as string);
  if (!user) {
    console.log("Invalid session: userId is missing");
    return null;
  }
  return { id: user.id, name: user.name, email: user.email };
});
