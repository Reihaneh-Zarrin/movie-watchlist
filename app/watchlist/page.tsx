import { movieDb } from "@/app/lib/db";
import { getUser } from "@/app/lib/dal";
import { Movie, SavedMovies } from "../lib/definitions";
import { getMovieById } from "../lib/movies";
import { redirect } from "next/navigation";
import MovieGrid, { MovieSkeleton } from "../ui/movie-grid";
import RemoveFromListButton from "./removeFromListButton";
import { Suspense } from "react";

export default async function WatchlistPage() {
  const user = await getUser();
  if (!user) redirect("/login");
  const movies: SavedMovies | undefined = movieDb.findUserWatchlist(
    user?.id as string,
  );
  const movieDetail: (Movie | { error: string })[] = await Promise.all(
    movies?.movieId.map((id) => getMovieById(id)) || [],
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Watchlist</h1>
      
      <Suspense fallback={<MovieSkeleton />}>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mx-4 p-4">
          {movieDetail.map((movie, index) => {
            if ("error" in movie) {
              return <p key={movie.error}>{movie.error}</p>;
            }

            return (
              <li
                key={movie.id}
                className="border border-[#8ACE00] p-2 hover:scale-105 transition-transform flex flex-col items-center"
              >
                <MovieGrid movies={movie} index={index} />
                <RemoveFromListButton movieId={movie.id} userId={user.id} />
              </li>
            );
          })}
        </ul>
      </Suspense>
    </div>
  );
}
