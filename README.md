## Verba

A lightweight blog application built with React, Vite, Tailwind CSS, Redux Toolkit, React Router, TinyMCE, and Appwrite (Auth, Database, Storage).

### Features
- **Authentication**: Email/password signup, login, logout (Appwrite Account API)
- **Posts**: Create, edit, delete posts with rich text content and a featured image (Appwrite Database + Storage)
- **Routing**: Public and protected routes using React Router
- **State management**: Auth state with Redux Toolkit
- **Styling**: Tailwind CSS v4

### Tech stack
- **Frontend**: React 19, Vite 7, React Router 7, Redux Toolkit, React Hook Form, TinyMCE
- **Styling**: Tailwind CSS 4 via `@tailwindcss/vite`
- **Backend (BaaS)**: Appwrite (Auth, Database, Storage)
- **Linting**: ESLint (recommended + react-hooks + refresh)

### Prerequisites
- Node.js 18+ and npm 9+
- An Appwrite instance (self-hosted or cloud)

### Getting started
1) Install dependencies
```bash
npm install
```

2) Configure environment variables
Create a `.env` file in the project root with your Appwrite details:
```bash
# Appwrite
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
```

3) Run the dev server
```bash
npm run dev
```
Vite will start the app (default: `http://localhost:5173`).

4) Optional: Lint and build
```bash
npm run lint
npm run build
npm run preview
```

### Appwrite setup
- **Project**: Create an Appwrite project and note the endpoint and project ID.
- **Auth**: Enable Email/Password auth provider.
- **Database**: Create a database and a collection for posts.
  - Use the collection ID set in `VITE_APPWRITE_COLLECTION_ID`.
  - Allow custom document IDs (the app uses the post slug as the document ID).
  - Suggested attributes (all type: string):
    - `title`
    - `slug`
    - `content`
    - `featuredImage` (stores Storage file ID)
    - `status` (values: `active` | `inactive`)
    - `userId` (creator's user `$id`)
- **Storage**: Create a bucket (`VITE_APPWRITE_BUCKET_ID`). Files are uploaded with public read permission in code.
- **Permissions (development-friendly)**:
  - Collection: Create/Read for authenticated users (Read can be public if desired). Update/Delete for authenticated users. Note: UI restricts edit/delete to the author, but you should enforce per-document permissions or server-side checks in production.

### Routes
- `/` Home (lists active posts)
- `/login` Login
- `/signup` Signup
- `/all-posts` List all posts (auth required)
- `/add-post` Create a new post (auth required)
- `/edit-post/:slug` Edit a post by ID/slug (auth required)
- `/post/:slug` View a post

Protected routes are wrapped with `AuthLayout`. Author-only UI actions (edit/delete) are shown when `post.userId === user.$id`.

### Scripts
- `npm run dev` — Start Vite dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

### Project structure (high-level)
```
src/
  appwrite/        # Appwrite clients (auth, db, storage)
  components/      # UI components, RTE, layout, forms
  pages/           # Route components (Home, Post, Add/Edit, Auth)
  store/           # Redux Toolkit store + auth slice
  config/          # Vite env variable mapping
  main.jsx         # App bootstrap (router + redux)
  App.jsx          # Root app layout
```

### Configuration notes
- **Tailwind CSS**: Configured via `@tailwindcss/vite` and `@import "tailwindcss"` in `src/index.css`.
- **TinyMCE**: `src/components/RTE.jsx` uses TinyMCE. An API key is embedded for development. Replace `apiKey` with your own for production.
- **Slugs**: Slugs are generated from the title and used as the Appwrite document ID.

### Troubleshooting
- Ensure all `VITE_APPWRITE_*` values are set and correct.
- The collection must allow custom document IDs and the client to create/update documents.
- Storage bucket must exist; uploads set public read permission in code.

### License
No license specified. Add a license if you plan to distribute this code.