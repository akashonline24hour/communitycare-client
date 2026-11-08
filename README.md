# 🤝 CommunityCare (Hermione Community Events)

> A community-driven platform where people create, join and track social service events in their local area, such as winter clothes distribution, blanket drives, plantation days and clean-ups.

**🔗 [Live Site](https://communitycare-client.vercel.app)** · **💻 [Client Repository](https://github.com/akashonline24hour/communitycare-client)** · **🛠️ [Server Repository](https://github.com/akashonline24hour/communitycare-server)**

---

## ✨ Key Features

- **🔐 Secure authentication**: Email and password registration with password rules (uppercase, lowercase, minimum length), plus Google and GitHub login through Better Auth.
- **🛡️ JWT-protected API**: Every private request sends a short-lived JWT, and the Express server verifies it before it creates, updates, deletes, joins or reads private data.
- **📅 Full event management**: Create events with a future date, edit or delete only your own events, and browse all upcoming events (past events never appear).
- **🤝 One-click participation**: Join or leave any event, with a live volunteer count. You must be logged in to join, and the same event can't be joined twice.
- **👤 Personal dashboard**: View your created events and joined events, see your stats, and edit your name and profile photo.
- **🚪 Protected routes**: Private pages redirect logged-out visitors to login, logged-in users stay on a private page when they reload it, and logged-in users are kept away from the login and register pages.
- **🌗 Light and dark theme**: A theme toggle that changes the whole interface and remembers your choice.
- **💬 Friendly feedback**: Toast notifications for every success and error, with form validation on all event and authentication forms. No default browser alerts.
- **⏳ Loading skeletons**: Skeleton screens on the dashboard and event details while data loads.
- **📱 Responsive design**: Works on mobile, tablet and desktop.

---

## 🧰 Tech Stack

| Area             | Technology                                                                |
| ---------------- | ------------------------------------------------------------------------- |
| Framework        | Next.js 16 (App Router, Turbopack)                                        |
| Styling          | Tailwind CSS                                                              |
| Authentication   | Better Auth with the MongoDB adapter, Google and GitHub OAuth, JWT plugin |
| Icons and toasts | Lucide React, react-toastify                                              |
| Theming          | next-themes                                                               |
| Backend          | Express.js REST API (separate repository)                                 |
| Database         | MongoDB                                                                   |
| Hosting          | Vercel                                                                    |

---

## 🗺️ Pages

| Route                            | Access          | Description                                                   |
| -------------------------------- | --------------- | ------------------------------------------------------------- |
| `/`                              | Public          | Banner, features, six upcoming events, gallery and newsletter |
| `/events`                        | Public          | All upcoming events with search and filters                   |
| `/events/[id]`                   | Public          | Event details (logging in is only needed to join)             |
| `/gallery`, `/about`, `/contact` | Public          | Information pages                                             |
| `/login`, `/register`            | Logged-out only | Authentication                                                |
| `/dashboard`                     | Private         | Profile editing, created events and joined events             |
| `/events/create`                 | Private         | Create an event                                               |
| `/events/manage`                 | Private         | Update or delete your own events                              |
| `/events/joined`                 | Private         | Events you joined, sorted by date                             |

---

## 🔑 How JWT Works in This Project

1. A user logs in with Better Auth, which stores a session cookie on the client site.
2. For every private request, the client asks Better Auth for a fresh short-lived JWT (`authClient.token()`).
3. The token is sent to the Express server in the header `Authorization: Bearer <token>`.
4. The server verifies the token with the public keys published at `<BETTER_AUTH_URL>/api/auth/jwks`.
5. The server reads the user's email from the verified token, never from the request, so users can only access and change their own data.

---

## 🛠️ Getting Started Locally

### 1. Requirements

- Node.js 20.9 or newer
- A MongoDB database (a free MongoDB Atlas cluster works)
- The [server repository](https://github.com/akashonline24hour/communitycare-server) running locally
- Optional: Google and GitHub OAuth apps for social login

### 2. Clone and install

```bash
git clone https://github.com/akashonline24hour/communitycare-client.git
cd communitycare-client
npm install
```

### 3. Environment variables

Create a `.env` file in the project root. **Never commit this file.**

```env
# MongoDB connection string (Better Auth stores users and sessions here)
MONGODB_URI=your_mongodb_connection_string

# Better Auth
BETTER_AUTH_SECRET=a_long_random_secret
BETTER_AUTH_URL=http://localhost:3000

# Express server URL, ending with /api
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Social login (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

For social login, use these callback URLs in the Google and GitHub developer consoles:

- `http://localhost:3000/api/auth/callback/google`
- `http://localhost:3000/api/auth/callback/github`

### 4. Set up the server

In the server repository, set `AUTH_URL` to the same value as `BETTER_AUTH_URL` (without a trailing slash), then start it:

```bash
npm run dev
```

### 5. Run the client

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other commands

```bash
npm run build   # create a production build
npm run start   # run the production build
```

---

## 🚀 Deployment (Vercel)

1. Import both repositories into Vercel.
2. Add the same environment variables in each project's settings. For production:
   - Client: `BETTER_AUTH_URL` is the live client URL, and `NEXT_PUBLIC_API_URL` is the live server URL followed by `/api`.
   - Server: `AUTH_URL` is the live client URL, and `MONGODB_URI` is your database string.
3. Add the production callback URLs to the Google and GitHub OAuth apps.
4. Redeploy after changing any environment variable.

---

## 📁 Project Structure

```
src/
├── app/                # Routes (App Router)
│   ├── api/auth/       # Better Auth handler
│   ├── dashboard/      # User dashboard
│   ├── events/         # List, details, create, manage and joined pages
│   ├── login/, register/
│   └── gallery/, about/, contact/
├── components/         # Navbar, theme toggle, shared components
└── lib/                # Auth config, API helper and redirect helpers
proxy.js                # Route protection for private and auth pages
```

---

## 📡 Server API (Express)

Base URL: `NEXT_PUBLIC_API_URL`

| Method      | Endpoint                        | Access                      |
| ----------- | ------------------------------- | --------------------------- |
| GET         | `/events`                       | Public (upcoming events)    |
| GET         | `/events/recent-upcoming`       | Public (six nearest events) |
| GET         | `/events/:id`                   | Public                      |
| GET         | `/events/organizer/:email`      | JWT (your events)           |
| GET         | `/events/joined/:email`         | JWT (events you joined)     |
| POST        | `/events`                       | JWT                         |
| POST        | `/events/join`, `/events/leave` | JWT                         |
| POST        | `/events/sync-profile`          | JWT                         |
| PUT, DELETE | `/events/:id`                   | JWT, creator only           |

---

## 👨‍💻 Author

Built by [akashonline24hour](https://github.com/akashonline24hour).
