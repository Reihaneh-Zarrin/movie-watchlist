import { getUser } from "@/app/lib/dal";
import { getMovie } from "../lib/movies";
import AddToWatchList from "@/app/profile/addToListButton";
import { Movie } from "@/app/lib/definitions";
import { redirect } from "next/navigation";
import MovieGrid from "../ui/movie-grid";

import { movieDb } from "../lib/db";
import SearchBar from "./searchBar";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) redirect("/login");
  const movie: Movie[] | { error: string } = await getMovie();
  async function handleMovies(movies: any) {
    if (movies) {
      movie: movies;
    }
  }

  if ("error" in movie) {
    return <p>{movie.error}</p>;
  }
  return (
    <>
      <p className="text-lg m-4">{`This is your profile ${user?.name} You can browse movies and add them to your watchlist.`}</p>
      <SearchBar onSearch={handleMovies} />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mx-4 p-4">
        {movie.map(async (movie) => {
          const isInWatchlist = movieDb.isMovieInWatchlist(user.id, movie.id);
          return (
            <li
              key={movie.id}
              className="border border-[#8ACE00] p-2 hover:scale-105 transition-transform flex flex-col items-center"
            >
              <MovieGrid movies={movie} />
              <AddToWatchList movies={movie} alreadyThere={isInWatchlist} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
