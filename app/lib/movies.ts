"use server";
import { Movie } from "@/app/lib/definitions";

const accessToken = process.env.ACCESS_TOKEN?.trim();

async function fetchMovies(url: string) {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      return {
        error: `could not fetch movies: ${res.status}, ${await res.text()}`,
      };
    }

    const data: any = await res.json();

    const movies: Movie[] = data.results.filter(isValidMovie);

    return movies;
  } catch (error) {
    return { error: `could not fetch movies: ${error}` };
  }
}
export async function getMovieById(id: number){
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      return {
        error: `could not fetch movie: ${res.status}, ${await res.text()}`,
      };
    }

    const data: any = await res.json();

    if (!isValidMovie(data)) {
      return { error: "Invalid movie data" };
    }

    return data as Movie;
  } catch (error) {
    return { error: `could not fetch movie: ${error}` };
  }
}

export async function searchForMovie(query: string){
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`;
  return fetchMovies(url);
}

export async function getMovie() {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
  return await fetchMovies(url);
}


function isValidMovie(movie: any): boolean {
  if (typeof movie.id !== "number") return false;
  if (typeof movie.title !== "string") return false;
  if (typeof movie.overview !== "string") return false;
  if (typeof movie.vote_average !== "number") return false;
  if (typeof movie.release_date !== "string") return false;
  if (typeof movie.poster_path !== "string") return false;

  return true;
}
