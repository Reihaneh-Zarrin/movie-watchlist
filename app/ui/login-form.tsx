"use client";
import { useState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{ message: string } | undefined>();

  async function handleSubmit() {
    setLoading(true);
    const res = await login(email, password);
    setResult(res);
    setLoading(false);
  }

  return (
    <div className="flex flex-col border border-[#8ACE00] p-3 bg-zinc-800">
      <div className="flex flex-col my-3">
        <label className="font-black">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className="border-b-2 p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="font-black">Password</label>
        <input
          id="Password"
          name="password"
          type="password"
          className="border-b-2 p-2"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="border mt-3 transition-transform 4 hover:scale-105 bg-[#8ACE00] font-mono"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading? "Loging in..." : "Login"}
      </button>
      {result?.message && <p className="text-red-500">{result.message}</p>}
    </div>
  );
}
