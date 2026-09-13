import { Movie } from "@/app/lib/definitions";

const accessToken = process.env.ACCESS_TOKEN?.trim();

export async function searchForMovie(query:string) {
  console.log(accessToken);

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!res.ok) {
      return {
        error: `could not fetch movies: ${res.status}, ${await res.text()}`,
      };
    }

    const data: any = await res.json();

    const movies: Movie[] = data.results.filter(isValidMovie) as Movie[];

    return movies;
  } catch (error) {
    return { error: `could not fetch movies: ${error}` };
  }
}

export async function getMovie() {
  console.log(accessToken);

  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal: AbortSignal.timeout(5000),
      },
    );

    if (!res.ok) {
      return {
        error: `could not fetch movies: ${res.status}, ${await res.text()}`,
      };
    }

    const data: any = await res.json();

    const movies: Movie[] = data.results.filter(isValidMovie) as Movie[];

    return movies;
  } catch (error) {
    return { error: `could not fetch movies: ${error}` };
  }
}

export async function getMovieById(id: number) {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch movie");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return { error: `could not fetch movie: ${error}` };
  }
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
