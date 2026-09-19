import { getUser } from "@/app/lib/dal";
import { getMovie } from "../lib/movies";
import { Movie } from "@/app/lib/definitions";
import { redirect } from "next/navigation";
import SearchBar from "./searchBar";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) redirect("/login");
  const movie: Movie[] | { error: string } = await getMovie();

  if ("error" in movie) {
    return <p>{movie.error}</p>;
  }
  return (
    <div
      className="relative h-64 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/movie-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-zinc-900" />
      <div className="relative">
        <p className="text-3xl m-4 font-bold">
          This is your profile {""}
          <span className="text-green-500 ">{user?.name}</span>
        </p>
        <p className="mb-4 mx-4">
          You can browse movies and add them to your watchlist
        </p>
        <SearchBar movie={movie} userId={user.id} />
      </div>
    </div>
  );
}
