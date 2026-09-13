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
          className="border rounded p-1 hover:bg-zinc-600 w-full mt-auto disabled:opacity-50
    disabled:cursor-not-allowed"
          onClick={handleAddToList}
          disabled={isInWatchlist}
        >
          {isInWatchlist ? "Already in Watchlist" : "Add to Watchlist"}
        </button>
  );
}
