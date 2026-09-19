"use client";
import { useState } from "react";
import { movieDb } from "../lib/db";
import { Movie } from "../lib/definitions";
import { searchForMovie } from "../lib/movies";
import MovieGrid from "../ui/movie-grid";
import AddToWatchList from "./addToListButton";

export default function SearchBar({
  movie,
  userId,
}: {
  movie: Movie[];
  userId: string;
}) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    Movie[] | { error: string } | null
  >(null);

  async function handleSearchBar() {
    const results = await searchForMovie(query);
    setSearchResults(results);
  }

  const displayedMovies = searchResults ?? movie;

  return (
    <>
      <div className="md:flex-row flex flex-col">
        <input
          placeholder="🔍 What movie are you looking for?"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="m-6 p-4 rounded-2xl border border-green-900 bg-zinc-950 md:w-1/4 focus:border-green-900 focus:outline-none"
        />

        <button
          onClick={handleSearchBar}
          className="px-6 my-6 mx-2 rounded-2xl bg-green-500 text-black font-bold"
        >
          Search
        </button>
      </div>

      {"error" in displayedMovies ? (
        <p>{displayedMovies.error}</p>
      ) : (
        <>
          
          <ul className="grid grid-cols-9 gap-6 mx-4 p-4">
            {displayedMovies.slice(0, 6).map((m, index) => {
              const isInWatchlist = movieDb.isMovieInWatchlist(userId, m.id);

              if (index === 0) {
                return (
                  <li
                    key={m.id}
                    className="relative col-span-9 sm:col-span-4 lg:col-span-3 row-span-2 border border-green-900 rounded-md p-4 hover:scale-[1.02] transition-transform flex flex-col shadow-[2px_2px_10px_-2px_green-500,-2px_-2px_10px_-4px_green-500] "
                  >
                    
                    <div className="absolute top-0 right-0 z-10 w-14 h-14 bg-green-900 [clip-path:polygon(100%_0,0_0,100%_100%)] flex items-start justify-end">
                    {/* what is pt or pr? */}
                      <span className="font-serif text-black font-black pt-1 pr-1.5">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <MovieGrid movies={m} index={index} featured />
                    <AddToWatchList movies={m} alreadyThere={isInWatchlist} />

                  </li>
                );
              }

              if (index <= 3) {
                return (
                  <li
                    key={m.id}
                    className="relative col-span-9 sm:col-span-5 lg:col-span-2 border border-green-900 rounded-md p-3 hover:scale-105 transition-transform flex flex-col hover:shadow-[inset_0_0_15px_green-500]"
                  >
                    <div className="absolute top-0 right-0 z-10 w-10 h-10 bg-green-900 [clip-path:polygon(100%_0,0_0,100%_100%)] flex items-start justify-end">
                      <span className="absolute text-xs top-1 right-1 font-serif text-black font-black">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <MovieGrid movies={m} index={index} />
                    <AddToWatchList movies={m} alreadyThere={isInWatchlist} />
                  </li>
                );
              }

              return (
                <li
                  key={m.id}
                  className="relative col-span-9 sm:col-span-9 lg:col-span-3 border border-green-900 rounded-md p-3 hover:scale-105 transition-transform flex flex-row items-center gap-4"
                >
                  <div className="absolute top-0 right-0 z-10 w-10 h-10 bg-green-900 [clip-path:polygon(100%_0,0_0,100%_100%)] flex items-start justify-end">
                  <span className="absolute top-1 right-1 text-xs text-black font-serif font-black">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  </div>
                  <MovieGrid movies={m} index={index} horizontal />
                  <AddToWatchList movies={m} alreadyThere={isInWatchlist} />
                </li>
              );
            })}
          </ul>

          {displayedMovies.length > 6 && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mx-4 p-4">
              {displayedMovies.slice(6).map((m, index) => {
                const isInWatchlist = movieDb.isMovieInWatchlist(userId, m.id);

                return (
                  <li
                    key={m.id}
                    className="border border-green-900 p-2 hover:scale-105 transition-transform flex flex-col items-center"
                  >
                    <MovieGrid movies={m} index={index + 6} />
                    <AddToWatchList movies={m} alreadyThere={isInWatchlist} />
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </>
  );
}
