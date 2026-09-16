import { Movie } from "@/app/lib/definitions";
import Image from "next/image";

export default function MovieGrid({
  movies,
  index,
  featured = false,
  horizontal = false,
}: {
  movies: Movie;
  index: number;
  featured?: boolean;
  horizontal?: boolean;
}) {
  const posterHeight = featured
    ? "h-[520px]"
    : horizontal
      ? "h-40 w-32 shrink-0"
      : "h-52";

  return (
    <div
      className={
        horizontal
          ? "flex flex-row items-center gap-4 w-full"
          : "flex flex-col w-full"
      }
    >
      <div
        className={`relative rounded-xl overflow-hidden ${posterHeight} ${!horizontal && "w-full"}`}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
          fill
          className="object-cover"
          alt="Movie Poster"
        />
      </div>

      <div className={horizontal ? "flex flex-col" : "mt-3"}>
        <p className={featured ? "text-2xl font-bold" : "font-semibold"}>
          {movies.title}
        </p>
        <p
          className={
            featured
              ? "text-3xl font-bold text-[#8ACE00] mt-2"
              : "text-lg font-bold text-[#8ACE00]"
          }
        >
          {movies.vote_average.toFixed(1)}/10
        </p>
      </div>
    </div>
  );
}

export function MovieSkeleton() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 mx-4 p-4">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <li key={item} className="p-2 space-y-3 animate-pulse">
          <div className="h-80 bg-zinc-700 rounded" />
          <div className="h-5 bg-zinc-700 rounded w-3/4" />
          <div className="h-5 bg-zinc-700 rounded w-1/2" />
        </li>
      ))}
    </ul>
  );
}
