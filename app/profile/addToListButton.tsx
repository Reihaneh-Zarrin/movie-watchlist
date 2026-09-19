"use client";
import { useState } from "react";
import { addToWatchlist } from "../actions/auth";
import { Movie } from "../lib/definitions";

export default function AddToWatchList({
  movies,
  alreadyThere,
}: {
  movies: Movie;
  alreadyThere: boolean;
}) {
  const [isInWatchlist, setIsInWatchlist] = useState(alreadyThere);

  async function handleAddToList() {
    if (!isInWatchlist) {
      await addToWatchlist(movies.id);
      setIsInWatchlist(true);
    }
  }

  return (
        <button
          className="border border-green-950 rounded p-1 hover:bg-zinc-600 w-full mt-auto disabled:opacity-50 disabled:cursor-not-allowed shadow-[inset_0_0_5px_#8ACE00]"
          onClick={handleAddToList}
          disabled={isInWatchlist}
        >
          {isInWatchlist ? "Already in Watchlist" : "Add to Watchlist"}
        </button>
  );
}
