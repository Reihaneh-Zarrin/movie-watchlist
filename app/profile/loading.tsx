import { MovieSkeleton } from "../ui/movie-grid";

const loading = () => {
  return (
    <>
      <div className="flex items-center">
        <span className="text-3xl m-4 font-bold">This is your profile</span>
        <div className="text-3xl bg-zinc-700 rounded animate-pulse w-20 h-5" />
      </div>
      <MovieSkeleton />
    </>
  );
};

export default loading;
