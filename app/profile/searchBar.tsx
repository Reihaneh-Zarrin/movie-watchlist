'use client'

import { useState } from "react";
import { searchForMovie } from "../lib/movies";
import { Movie } from "../lib/definitions";

export default function SearchBar({onSearch,}: {onSearch: (movies: any) => void;}) {
  const [query, setQuery] = useState("");

  async function handleSearchBar() {
    const movies = await searchForMovie(query);

    onSearch(movies);
  }

  return (
    <div className="flex">
      <input
        placeholder="What movie are you looking for?"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="m-2 rounded-2xl border"
      />

      <button
        onClick={handleSearchBar}
        className="rounded bg-blue-950 px-4 text-white"
      >
        Search
      </button>
    </div>
  );
}