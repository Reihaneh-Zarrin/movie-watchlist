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
      className="inline-block border border-zinc-700 py-1 px-4 rounded-md"
    >
      {isLoading ? "Logging out..." : "Log out"}
    </button>
  );
}
