"use client";
import { useState } from "react";
import { signup } from "@/app/actions/auth";
import { SignupResult } from "../lib/definitions";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SignupResult>();

  async function handleSubmit() {
    setLoading(true);
    setResult(await signup(name, email, password));
    setLoading(false);
  }

  return (
    <>
      <div className="flex flex-col p-3 bg-zinc-800 border border-[#8ACE00]">
        <div className="flex flex-col">
          <label className="font-black">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            className="border-b-2 p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {result?.errors?.name && (
            <p className="text-red-500">{result.errors.name}</p>
          )}
        </div>

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

          {result?.errors?.email && (
            <p className="text-red-500">{result.errors.email}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="font-black">Password</label>
          <input
            id="Password"
            name="password"
            type="password"
            placeholder=""
            className="border-b-2 p-2"
            onChange={(e) => setPassword(e.target.value)}
          />

          {result?.errors?.password && (
            <p className="text-red-500">{result.errors.password}</p>
          )}
        </div>
        <button className="border mt-3 transition-transform hover:scale-105 bg-[#8ACE00] font-mono" disabled={loading} onClick={handleSubmit}>
          {loading? "Signing up...":"Sign Up"}
        </button>
        {result?.message && <p className="text-red-500">{result.message}</p>}
      </div>
    </>
  );
}
