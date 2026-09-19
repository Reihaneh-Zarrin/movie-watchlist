"use client";
import {  removeFromWatchlist } from "../actions/auth";
import { useRouter } from "next/navigation";

export default function RemoveFromListButton({
  movieId,
}: {
  movieId: number;
}) {
  const router = useRouter();

  async function handleRemoveFromList() {
    removeFromWatchlist(movieId);
    router.refresh();
  }

  return (
    <>
      <button
        className="border rounded p-1 hover:bg-zinc-600 w-full mt-auto"
        onClick={handleRemoveFromList}
      >
        Remove from Watchlist
      </button>
    </>
  );
}
