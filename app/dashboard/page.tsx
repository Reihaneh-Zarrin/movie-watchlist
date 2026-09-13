import Link from "next/link";
import { getUser } from "../lib/dal";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) redirect("/login");
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      <p>Do you want to see the list of popular movies?</p>
      <Link className="m-2 underline" href={"/profile"}>
        Go to Movies page
      </Link>
    </main>
  );
}
