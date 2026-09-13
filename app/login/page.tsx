import LoginForm from "@/app/ui/login-form";
import { redirect } from "next/navigation";
import { verifySession } from "../lib/dal";
import Link from "next/link";

export default async function LoginPage() {
  const session = await verifySession();

  if (session?.userId) {
    redirect("/dashboard");
  }
  return (
    <main className="mt-10 flex flex-col justify-center items-center px-6">
      <LoginForm />
      <p>
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </p>
    </main>
  );
}
