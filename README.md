# SpiceBox Vercel App

This repository contains a minimal implementation of the SpiceBox landing page and waitlist API built from scratch.  The goal is to demonstrate a working structure that can be deployed to Vercel with both a static front‑end and serverless API routes.

## Project structure

```
spicebox-vercel/
├── api/              # Vercel serverless functions live here
│   └── waitlist.ts   # Handles POST and GET requests for the waitlist
├── shared/           # Shared TypeScript types and validation schemas
│   └── schema.ts     # Zod schemas defining the waitlist payload
├── src/              # Front‑end React application
│   ├── components/   # React components (e.g. the waitlist form)
│   ├── App.tsx       # Root component rendering the landing page
│   └── main.tsx      # Entry point wired into index.html
├── index.html        # HTML template used by Vite
├── package.json      # Defines dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Vite configuration (defines aliases and build options)
```

## Running locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the `.env.example` file to `.env` and fill in your Supabase URL and Service Key.  The Supabase service key must have admin rights to create users and modify the `profiles` table.

3. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be served at <http://localhost:5173>.  Note that the API routes (e.g. `/api/waitlist`) will not work with `vite dev` out of the box.  To test serverless functions locally you can either use the Vercel CLI (`npx vercel dev`) or deploy to Vercel and test against the deployed URL.

4. Build for production:

   ```bash
   npm run build
   ```

   The static site will be output to the `dist` directory.

## Deploying to Vercel

1. Push this repository to a Git provider (e.g. GitHub).
2. In the Vercel dashboard, create a new project from the repo.
3. In **Project Settings → General → Root Directory**, choose the project root (`/`).
4. In **Build & Output Settings**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Define environment variables in the Vercel dashboard:
   - `VITE_SUPABASE_URL`: your Supabase project URL.
   - `SUPABASE_SERVICE_ROLE_KEY`: a service role key with admin privileges.
6. Redeploy.  The static site will be served from the root of your deployment and the API will be available under `/api/waitlist`.

## Notes

* The waitlist API uses Supabase Admin API to either create a new user or reuse an existing one based on the email address.  It then upserts a profile record in the `profiles` table using the same user ID.  If Supabase is unavailable, the function returns an error.  You can extend this logic to fall back to local storage or another database if necessary.
* The provided front‑end is intentionally minimal.  You can expand it to include additional sections (e.g. hero, features, testimonials) and styling libraries (e.g. Tailwind, Shadcn) as needed.
* When running `vite dev`, API calls to `/api/waitlist` will 404 because Vite's development server does not know about Vercel serverless functions.  Use `npx vercel dev` or deploy to Vercel to test the API endpoints.