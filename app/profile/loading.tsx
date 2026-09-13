import { MovieSkeleton } from "../ui/movie-grid";

const loading = () => {
  return (
    <>
      <div className="flex items-center">
        <span className="text-lg m-4">This is your profile</span>
        <div className="text-lg bg-zinc-700 rounded animate-pulse w-20 h-5" />
        <span className="text-lg m-4">
          You can browse movies and add them to your watchlist.
        </span>
      </div>
      <MovieSkeleton />
    </>
  );
};

export default loading;
