import { User, Movie, SavedMovies } from "./definitions";
export const serverStartTime = Date.now();
const users: User[] = [];

const moviesInWatchlist: SavedMovies[] = [];

export const movieDb = {
  findUserWatchlist: (userId: string) =>
    moviesInWatchlist.find((record) => record.userId === userId),

  isMovieInWatchlist: (userId: string, movieId: number) => {
    const record = moviesInWatchlist.find((r) => r.userId === userId);
    if (!record) return false;
    return record.movieId.includes(movieId);
  },

  addToWatchlist: (userId: string, movieId: number) => {
    const record = moviesInWatchlist.find((r) => r.userId === userId);
    if (record) {
      if (!record.movieId.includes(movieId)) {
        record.movieId.push(movieId);
      }
    } else {
      moviesInWatchlist.push({ userId, movieId: [movieId] });
    }
  },

  removeFromWatchlist: (userId: string, movieId: number) => {
    const record = moviesInWatchlist.find((r) => r.userId === userId);
    if (record) {
      record.movieId = record.movieId.filter((id) => id !== movieId);
    }
  },
};

export const db = {
  findUserByEmail: (email: string) => users.find((u) => u.email === email),

  findUserById: (id: string) => users.find((u) => u.id === id),

  createUser: (name: string, email: string, password: string) => {
    const user: User = { id: crypto.randomUUID(), name, email, password };
    users.push(user);
    return user;
  },
};
