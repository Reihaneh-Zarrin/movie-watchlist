import SignupForm from "@/app/ui/signup-form";
import { redirect } from "next/navigation";
import { verifySession } from "../lib/dal";
import Link from "next/link";

export default async function SignupPage() {
  const session = await verifySession();

  if (session?.userId) {

    redirect("/dashboard");
  }
  return (
    <main className="mt-10 flex flex-col items-center justify-center px-6">
      <SignupForm />
      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </main>
  );
}