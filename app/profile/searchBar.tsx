'use client'

import { useState } from "react";
import { searchForMovie } from "../lib/movies";
import { Movie } from "../lib/definitions";
import MovieGrid from "../ui/movie-grid";
import AddToWatchList from "./addToListButton";
import { movieDb } from "../lib/db";

export default function SearchBar({ movie, userId }: { movie: Movie[]; userId: string }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[] | { error: string } | null>(null);

  async function handleSearchBar() {
    const results = await searchForMovie(query);
    setSearchResults(results);
  }

  const displayedMovies = searchResults ?? movie;

  return (
    <>
      <div className="flex">
        <input
          placeholder="What movie are you looking for?"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="m-6 p-4 rounded-2xl border"
        />
        <button
          onClick={handleSearchBar}
          className="p-2 my-6 rounded bg-blue-950 text-white"
        >
          Search
        </button>
      </div>

      {"error" in displayedMovies ? (
        <p>{displayedMovies.error}</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mx-4 p-4">
          {displayedMovies.map((m) => {
            const isInWatchlist = movieDb.isMovieInWatchlist(userId, m.id);
            return (
              <li
                key={m.id}
                className="border border-[#8ACE00] p-2 hover:scale-105 transition-transform flex flex-col items-center"
              >
                <MovieGrid movies={m} />
                <AddToWatchList movies={m} alreadyThere={isInWatchlist} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}