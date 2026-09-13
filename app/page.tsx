import Link from "next/link";
import { getUser } from "./lib/dal";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();
  if (user) {
    redirect("/profile");
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl m-2 font-bold">Demo auth page</h1>
      <div>
        <Link className="m-2 underline" href={"/signup"}>
          Sign Up
        </Link>
        <Link className="m-2 underline" href={"/login"}>
          Log In
        </Link>
      </div>
    </div>
  );
}
