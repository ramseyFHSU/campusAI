# CampusAI Hub

CampusAI Hub is a MERN-stack university AI toolkit platform. Users can browse approved AI tools, submit new tools for admin review, share AI usage stories with optional media, send contact messages, and manage their own profile/contributions. Admins can manage users, review submitted tools, moderate stories, view contact messages, and see dashboard metrics.

## Tech stack

- Frontend: React + Vite + React Router + Tailwind CSS + Axios
- Backend: Node.js + Express + MongoDB + Mongoose
- Authentication: JWT with bcrypt password hashing
- Uploads: Multer local disk storage

## Project structure

```text
campusai-hub/
├── client/     React frontend
├── server/     Express/MongoDB backend
└── README.md
```

## Run locally

### 1. Start MongoDB

Use a local MongoDB instance or MongoDB Atlas.

### 2. Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

The API runs on `http://localhost:5000` by default.

### 3. Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

The React app runs on `http://localhost:5173` by default.

### 4. Promote first admin

Register a user through the UI, then run:

```bash
cd server
npm run seed:admin -- your-email@example.com
```

## Main routes

Frontend:

- `/` Home
- `/tools` Browse tools
- `/tools/new` Submit a tool
- `/stories` Browse stories
- `/stories/new` Create story
- `/profile` Profile
- `/my-contributions` User submissions
- `/admin` Admin dashboard
- `/admin/users` Manage users
- `/admin/tools` Review tools
- `/admin/stories` Moderate stories
- `/admin/messages` View contact messages

Backend API base: `/api`

- `/api/auth`
- `/api/users`
- `/api/tools`
- `/api/stories`
- `/api/contact`
- `/api/admin/stats`

## Notes

- Tool submissions are created as `pending` and only approved tools are public.
- Stories can include optional image or video uploads.
- Uploaded media is served from `/uploads`.
- For production, replace local uploads with cloud storage, add rate limiting/security headers, and use HTTP-only refresh tokens.

## Frontend Redesign Update

The client has been updated to match the provided CampusAI Hub mockups with:

- Black, white, and golden-yellow visual system
- Pixel-inspired public pages for Home, About, AI Tools, Stories, Contact
- Custom sign-in and sign-up layouts
- User contribution dashboard
- Contribute / Submit AI Tool workflow
- Admin dashboard layout with sidebar, stat cards, review tables, recent stories, and insights

The redesigned frontend uses Tailwind CSS and `lucide-react` icons.
