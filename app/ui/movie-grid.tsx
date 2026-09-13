import { Movie } from "@/app/lib/definitions";
import Skeleton from 'react-loading-skeleton'
import Image from "next/image";

export default function MovieGrid({ movies }: { movies: Movie }) {
  return (
    <>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
        width={500}
        height={500}
        alt="Movie Poster"
      />
      <p>{movies.title}</p>
      <p className="text-lg font-bold">{movies.vote_average.toFixed(1)}/10</p>
    </>
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
