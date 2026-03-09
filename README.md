<p align="center">
  <img src="https://img.shields.io/badge/status-public%20beta-blue?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/typescript-5.9-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/react-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/express-5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/mongodb-9-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

<h1 align="center">
  🧠 Mnemos
</h1>

<p align="center">
  <strong>Your digital nervous system.</strong>
  <br />
  <em>Turn the content you consume into a structured, searchable second brain.</em>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-roadmap">Roadmap</a>
</p>

---

## The Problem

We consume an overwhelming amount of digital content every day — articles, videos, tweets, documents — scattered across dozens of tabs and apps. Most of it is forgotten within hours.

**Mnemos** (from the Greek *Mnēmosynē*, goddess of memory) is a personal knowledge management tool that captures, organizes, and lets you share everything you find valuable on the internet — all in one place.

---

## ✨ Features

### Core

| Feature | Description |
|---|---|
| **Lightning Capture** | Paste any URL — tweets, YouTube videos, documents, or links — and save it to your brain in seconds |
| **Rich Content Cards** | Content is displayed as beautiful cards with embedded YouTube players, tweet previews, and document links |
| **Smart Categorization** | Organize content by type: Tweets, Videos, Documents, and Links |
| **Tag System** | Label content with custom tags for quick filtering and discovery |
| **Share Your Brain** | Generate a public shareable link to your entire collection — let others explore your curated knowledge |
| **Share Individual Items** | Copy and share links to specific pieces of content |

### Experience

| Feature | Description |
|---|---|
| **Dark-First Design** | Stunning dark UI with glowing accents, glassmorphism, and smooth animations |
| **Neural Background** | Interactive canvas-based particle animation on the landing page that reacts to your mouse |
| **3D Perspective Cards** | Feature cards tilt in 3D as you hover, powered by real-time mouse tracking |
| **Responsive Layout** | Fully responsive with a collapsible sidebar, mobile-friendly navigation, and adaptive grid layouts |
| **Secure Auth** | HTTP-only cookie-based JWT authentication with bcrypt password hashing |

---

## 🏗 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework with latest features |
| **TypeScript 5.9** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling with custom theme |
| **Vite 7** | Lightning-fast dev server and build tool |
| **React Router 7** | Client-side routing |
| **Axios** | HTTP client with credential support |
| **Lucide React** | Beautiful, consistent icon set |

### Backend
| Technology | Purpose |
|---|---|
| **Express 5** | HTTP server framework |
| **TypeScript 5.9** | Type-safe server code |
| **MongoDB + Mongoose 9** | Document database with schema validation |
| **JWT** | Stateless authentication tokens |
| **bcrypt** | Secure password hashing |
| **Zod 4** | Runtime input validation |
| **cookie-parser** | HTTP-only cookie management |

### Deployment
| Technology | Purpose |
|---|---|
| **Vercel** | Frontend hosting with SPA rewrites |
| **Node.js** | Backend runtime |

---

## 🏛 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          Client (React)                         │
│                                                                 │
│  ┌──────────┐  ┌───────────┐  ┌────────────┐  ┌─────────────┐   │
│  │   Home   │  │ Dashboard │  │  Signin /  │  │   Shared    │   │
│  │ (Landing)│  │  (Main)   │  │  Signup    │  │   Brain     │   │
│  └──────────┘  └─────┬─────┘  └────────────┘  └─────────────┘   │
│                      │                                          │
│           ┌──────────┴──────────┐                               │
│           │   useContent Hook   │                               │
│           └──────────┬──────────┘                               │
│                      │  Axios (withCredentials)                 │
└──────────────────────┼──────────────────────────────────────────┘
                       │  HTTP-only Cookie (JWT)
┌──────────────────────┼──────────────────────────────────────────┐
│                      ▼         Server (Express)                 │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │  Auth Routes │  │Content Routes│  │  Brain Share Routes   │  │
│  │  /signup     │  │  CRUD ops    │  │  /brain/share         │  │
│  │  /signin     │  │  /content    │  │  /brain/:shareLink    │  │
│  │  /logout     │  │              │  │                       │  │
│  └──────┬───────┘  └──────┬───────┘  └───────────┬───────────┘  │
│         │                 │                      │              │
│         │     ┌───────────┴──────────┐           │              │
│         │     │   userMiddleware     │           │              │
│         │     │   (JWT verification) │           │              │
│         │     └───────────┬──────────┘           │              │
│         │                 │                      │              │
│  ┌──────┴─────────────────┴──────────────────────┴───────────┐  │
│  │                    MongoDB (Mongoose)                     │  │
│  │   Users  ·  Content (tweets|videos|docs|links)  ·  Links  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **npm** or **yarn**

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mnemos.git
cd mnemos
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=mongodb+srv://your-connection-string
JWT_PASSWORD=your-secret-key
PORT=3000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Start the development server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_BACKEND_URL=http://localhost:3000
```

Start the development server:

```bash
npm run dev
```

The app will be running at **http://localhost:5173**

---

## 📡 API Reference

All endpoints are prefixed with `/api/v1`.

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/signup` | Create a new account | No |
| `POST` | `/signin` | Sign in & receive auth cookie | No |
| `POST` | `/logout` | Clear auth cookie | No |

**Signup body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass1"
}
```

> Passwords must be 8–25 characters with at least one uppercase letter, one lowercase letter, and one number.

### Content

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/content` | Add a new content item | Yes |
| `GET` | `/content` | Retrieve all user content | Yes |
| `DELETE` | `/content` | Delete a content item | Yes |

**Add content body:**
```json
{
  "title": "Interesting Article",
  "link": "https://example.com/article",
  "type": "links"
}
```

Content types: `tweets` · `videos` · `documents` · `links`

### Brain Sharing

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/brain/share` | Generate or remove a share link | Yes |
| `GET` | `/brain/:shareLink` | View a shared brain's content | No |

---

## 📁 Project Structure

```
Mnemos/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Express app, routes, and server entry
│   │   ├── db.ts             # Mongoose schemas (User, Content, Link)
│   │   ├── config.ts         # Environment variable loading
│   │   ├── middleware.ts      # JWT auth middleware
│   │   ├── utils.ts          # Utility functions (random hash generation)
│   │   └── override.d.ts     # Express request type extensions
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx           # Root component with route definitions
│   │   ├── config.ts         # Axios instance & backend URL config
│   │   ├── main.tsx          # React entry point
│   │   ├── index.css         # Tailwind imports & custom animations
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.tsx      # Landing page with neural animation
│   │   │   ├── Dashboard.tsx # Main app — content grid & modals
│   │   │   ├── Signin.tsx    # Sign-in page
│   │   │   ├── Signup.tsx    # Sign-up page
│   │   │   └── SharedBrain.tsx  # Public shared brain viewer
│   │   │
│   │   ├── components/
│   │   │   ├── ui/           # Reusable primitives (Button, Card, Input, Modal, Logo, Tag)
│   │   │   ├── layout/       # Sidebar, Header
│   │   │   ├── features/     # AddContentModal, ShareBrainModal, ShareContentModal
│   │   │   └── embeds/       # YoutubeEmbed, TwitterEmbed
│   │   │
│   │   ├── hooks/
│   │   │   └── useContent.ts # Custom hook for content CRUD operations
│   │   │
│   │   └── utils/
│   │       ├── contentConfig.ts  # Content type definitions & icon mappings
│   │       ├── counter.ts        # Pluralization helper
│   │       └── youtube.ts        # YouTube URL → embed URL parser
│   │
│   ├── index.html
│   ├── vite.config.ts
│   ├── vercel.json
│   └── package.json
│
└── README.md
```

---

## 🔒 Security

Mnemos takes security seriously:

- **HTTP-only cookies** — JWT tokens are stored in HTTP-only, secure cookies (not localStorage), preventing XSS token theft
- **bcrypt hashing** — Passwords are hashed with 10 salt rounds before storage
- **Zod validation** — All signup inputs are validated server-side with strict schema rules
- **CORS policy** — Restricted to the configured frontend origin
- **Ownership checks** — Users can only access and delete their own content
- **SameSite cookies** — CSRF protection via `SameSite` cookie attribute in production

---

## 🗺 Roadmap

Mnemos is in active development. Here's what's coming:

### Coming Soon
- [ ] Search & filter content by type, tags, and keywords
- [ ] Profile page and account settings
- [ ] Tag management (create, edit, delete)
- [ ] Edit existing content items
- [ ] Twitter/X embed previews

### 🤖 AI Features (Planned)

> **Note:** AI-powered features are planned for future integration and are not yet implemented in the current version.

- [ ] **AI Auto-Categorization** — Automatically detect and assign content types and tags based on the URL and page content
- [ ] **Neural Search** — Semantic search powered by embeddings — find content by meaning, not just keywords
- [ ] **AI Insights & Connections** — Surface hidden relationships between your saved items; discover patterns in your knowledge graph
- [ ] **Smart Summaries** — Auto-generate concise summaries for saved articles, videos, and documents
- [ ] **AI-Powered Recommendations** — Get suggestions for content related to what you've already saved
- [ ] **Natural Language Querying** — Ask your brain questions in plain English: *"What did I save about productivity last month?"*

### Future
- [ ] Browser extension for one-click capture
- [ ] Mobile app (React Native)
- [ ] Collaborative shared brains with permissions
- [ ] Notion / Obsidian / Raindrop.io import
- [ ] Public API for third-party integrations
- [ ] Keyboard shortcuts and power-user workflows
- [ ] Dark/light theme toggle

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License


---

<p align="center">
  <strong>🧠 Remember everything. Forget nothing.</strong>
  <br />
  <sub>Built with ❤️ and too many open tabs.</sub>
</p>
