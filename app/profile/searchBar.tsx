"use client";

import { useState } from "react";

import { searchForMovie } from "../lib/movies";
import { Movie } from "../lib/definitions";
import MovieGrid from "../ui/movie-grid";
import AddToWatchList from "./addToListButton";
import { movieDb } from "../lib/db";

export default function SearchBar({movie,userId,}: { movie: Movie[], userId: string }) {
  const [query, setQuery] = useState("");

  const [searchResults, setSearchResults] = useState<Movie[] | { error: string } | null>(null);

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
          className="m-6 p-4 rounded-2xl border border-green-950 bg-zinc-950 md:w-1/4 focus:border-[#8ACE00] focus:outline-none"
        />

        <button
          onClick={handleSearchBar}
          className="px-6 my-6 mx-2 rounded-2xl bg-[#8ACE00] text-black font-bold"
        >
          Search
        </button>
      </div>

      {"error" in displayedMovies ? (
        <p>{displayedMovies.error}</p>
      ) : (
        <>
          {/* شش کارت اول: چیدمان ویژه، مثل طرح */}
          <ul className="grid grid-cols-9 gap-6 mx-4 p-4">
            {displayedMovies.slice(0, 6).map((m, index) => {
              const isInWatchlist = movieDb.isMovieInWatchlist(userId, m.id);

              // کارت اول: بزرگ، دو ردیف، سمت چپ
              if (index === 0) {
                return (
                  <li
                    key={m.id}
                    className="relative col-span-9 sm:col-span-4 lg:col-span-3 row-span-2 border border-[#8ACE00] rounded-2xl p-4 hover:scale-[1.02] transition-transform flex flex-col shadow-[inset_0_0_5px_#8ACE00]"
                  >
                    <span className="absolute top-3 right-3 text-sm text-[#8ACE00]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <MovieGrid movies={m} index={index} featured />
                    <AddToWatchList movies={m} alreadyThere={isInWatchlist} />
                  </li>
                );
              }

              // کارت‌های دوم تا چهارم: ردیف بالا، سه‌تای کوچیک
              if (index <= 3) {
                return (
                  <li
                    key={m.id}
                    className="relative col-span-9 sm:col-span-2 lg:col-span-2 border border-[#8ACE00] rounded-2xl p-3 hover:scale-105 transition-transform flex flex-col"
                  >
                    <span className="absolute top-3 right-3 text-sm text-[#8ACE00]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <MovieGrid movies={m} index={index} />
                    <AddToWatchList movies={m} alreadyThere={isInWatchlist} />
                  </li>
                );
              }

              // کارت‌های پنجم و ششم: ردیف پایین، افقی (عکس کنار متن)
              return (
                <li
                  key={m.id}
                  className="relative col-span-9 sm:col-span-4 lg:col-span-3 border border-[#8ACE00] rounded-2xl p-3 hover:scale-105 transition-transform flex flex-row items-center gap-4"
                >
                  <span className="absolute top-3 right-3 text-sm text-[#8ACE00]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <MovieGrid movies={m} index={index} horizontal />
                  <AddToWatchList movies={m} alreadyThere={isInWatchlist} />
                </li>
              );
            })}
          </ul>

          {/* بقیه‌ی فیلم‌ها: گرید معمولی */}
          {displayedMovies.length > 6 && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mx-4 p-4">
              {displayedMovies.slice(6).map((m, index) => {
                const isInWatchlist = movieDb.isMovieInWatchlist(userId, m.id);

                return (
                  <li
                    key={m.id}
                    className="border border-[#8ACE00] p-2 hover:scale-105 transition-transform flex flex-col items-center"
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