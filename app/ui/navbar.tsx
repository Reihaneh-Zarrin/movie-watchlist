import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { getUser } from "@/app/lib/dal";
import { Anton } from "next/font/google";
import { Suspense } from "react";
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

export default async function NavBar() {
  const user = await getUser();
  if (!user) {
    return (
      <div className="flex flex-col md:flex-row justify-between items-center p-2 border-b">
        <Link href={"/"} className="font-[anton] text-2xl">
        <span>Pro </span>
        <span className="text-[#8ACE00]">Watchlist</span>
        </Link>
        <div className="space-x-4  max-md:my-2">
          <Link
            className="border border-zinc-700 py-1 px-4 rounded shadow-[0_0_5px_#8ACE00]"
            href={"/signup"}
          >
            Sign up
          </Link>
          <span>|</span>
          <Link
            className="border border-zinc-700 py-1 px-4 rounded shadow-[0_0_5px_#8ACE00]"
            href={"/login"}
          >
            Log in
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col md:flex-row justify-between items-center p-2 border-b border-green-950">
        <Link href={"/"} className="font-[anton] text-2xl">
          <span>Pro </span>
          <span className="text-[#8ACE00]">Watchlist</span>
        </Link>
        <div className="space-x-4  max-md:my-2">
          <Suspense fallback={<div className="w-10 h-5 bg-zinc-700 rounded animate-pulse"/>}>
          <span className="">Hello {user.name}!</span>
          </Suspense>
          <Link
            className="inline-block border border-[#8ACE00] py-1 px-4 rounded-md shadow-[inset_0_0_5px_#8ACE00]"
            href={"/watchlist"}
          >
            Watchlist
          </Link>
          <LogoutButton />
        </div>
      </div>
    );
  }
}
