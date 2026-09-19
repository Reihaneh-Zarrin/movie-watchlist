# Movie Watchlist

A [Next.js](https://nextjs.org) app built as a personal practice project to sharpen front-end and full-stack skills — authentication, server actions, and working with an external API.

This is purely a showcase project, not a production app. It connects to [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) to browse and search movies, and lets a logged-in user add or remove titles from a personal watchlist.

## Screenshots
#### The main page
<img width="1901" height="1080" alt="Screenshot 1" src="https://github.com/user-attachments/assets/45e42612-6d0e-4d63-ab80-378bb00d9d0d" />

#### Login and Signup page

<p align="center">
  <img width="48%" alt="Screenshot 2"src="https://github.com/user-attachments/assets/d7323f95-daf6-4bd2-ad4a-af07de267e1e" />
<img  width="48%" alt="Screenshot 3" src="https://github.com/user-attachments/assets/a47f2815-8cba-43bb-99ad-46ff6daf1307" />
</p>

## Features

- **Authentication** — signup/login/logout built with Server Actions and JWT-based sessions (no third-party auth library)
- **Protected routes** — middleware checks session validity before allowing access to the profile page
- **Movie browsing** — fetches popular movies from TMDB on load
- **Search** — search movies by title in real time
- **Watchlist** — add or remove movies from your personal watchlist while logged in

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS
- [jose](https://github.com/panva/jose) for JWT signing/verification
- [Zod](https://zod.dev) for form validation
- [TMDB API](https://www.themoviedb.org/documentation/api) for movie data

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```
SESSION_SECRET=your_generated_secret_here
ACCESS_TOKEN=your_tmdb_read_access_token_here
```

- Generate `SESSION_SECRET` with: `openssl rand -base64 32`
- Get `ACCESS_TOKEN` (TMDB Read Access Token) from your [TMDB account settings](https://www.themoviedb.org/settings/api)

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Notes

- User data and watchlists are stored in memory (no external database), so they reset whenever the dev server restarts.
- This project uses a hand-rolled JWT session implementation for learning purposes — not intended as a production-ready auth pattern.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TMDB API Documentation](https://developer.themoviedb.org/docs/getting-started)
