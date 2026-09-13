"use client";

import { useState } from "react";
import { logout } from "@/app/actions/auth";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="text-sm bg-zinc-800 border border-zinc-100 p-1 font-mono"
    >
      {isLoading ? "Logging out..." : "Log out"}
    </button>
  );
}
