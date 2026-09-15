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
    <>
      <p className="text-lg m-4">{`This is your profile ${user?.name} You can browse movies and add them to your watchlist.`}</p>
      <SearchBar movie={movie} userId={user.id} />
    </>
  );
}
