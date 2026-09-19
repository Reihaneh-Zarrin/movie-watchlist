"use server";
import bcrypt from "bcryptjs";
import { db, movieDb } from "@/app/lib/db";
import { SignupFormSchema } from "@/app/lib/definitions";
import { createSession, deleteSession } from "@/app/actions/session";
import { redirect } from "next/navigation";
import { getUser } from "../lib/dal";

export async function signup(name: string, email: string, password: string) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({ name, email, password });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const existingUser = db.findUserByEmail(email);
  if (existingUser) {
    return { message: "This email is already assigned to an account." };
  }

  const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

  const user = db.createUser(
    validatedFields.data.name,
    validatedFields.data.email,
    hashedPassword,
  );
  await createSession(user.id);
  redirect("/profile");
}

export async function login(email: string, password: string) {
  console.time("1 - findUserByEmail");

  const existingUser = db.findUserByEmail(email);

  console.timeEnd("1 - findUserByEmail");

  if (!existingUser) {
    return { message: "This email is not assigned to an account." };
  }

  console.time("2 - bcrypt");

  const passwordMatch = await bcrypt.compare(
    password,
    existingUser.password
  );

  console.timeEnd("2 - bcrypt");

  if (!passwordMatch) {
    return { message: "wrong password" };
  }

  console.time("3 - createSession");

  await createSession(existingUser.id);

  console.timeEnd("3 - createSession");

  console.log("4 - BEFORE REDIRECT");

  redirect("/dashboard");
} 

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function addToWatchlist(movieId: number) {
  const session = await getUser();
  const userId = session?.id;
  movieDb.addToWatchlist(userId as string, movieId);
}

export async function removeFromWatchlist(movieId: number) {
    const session = await getUser();
  const userId = session?.id;
  movieDb.removeFromWatchlist(userId as string, movieId);
}

export async function isMovieInWatchlist(movieId: number) {
  const session = await getUser();
  const userId = session?.id;
  return movieDb.isMovieInWatchlist(userId as string, movieId);
}
