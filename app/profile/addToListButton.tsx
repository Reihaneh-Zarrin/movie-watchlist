"use client";
import { useEffect, useState } from "react";
import { addToWatchlist, isMovieInWatchlist } from "../actions/auth";
import { Movie } from "../lib/definitions";

export default function AddToWatchList({ movies }: { movies: Movie }) {
  const [alreadyThere, setAlreadyThere] = useState(false);

  async function handleAddToList() {
    await addToWatchlist(movies.id);
    setAlreadyThere(true);
  }
  useEffect(() => {
    async function checkWatchlist() {
      const result = await isMovieInWatchlist(movies.id);
      setAlreadyThere(result);
    }

    checkWatchlist();
  }, [movies.id]);

  return (
    <button
      className="border border-green-950 rounded p-1 hover:bg-zinc-600 w-full mt-auto disabled:opacity-50 disabled:cursor-not-allowed shadow-[inset_0_0_5px_#22c55e]"
      onClick={handleAddToList}
      disabled={alreadyThere}
    >
      {alreadyThere ? "Already in Watchlist" : "Add to Watchlist"}
    </button>
  );
}
