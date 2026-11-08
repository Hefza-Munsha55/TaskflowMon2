
# TaskFlow — Authenticated Full-Stack Task Manager

![MERN](https://img.shields.io/badge/Stack-MERN-0F766E?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node](https://img.shields.io/badge/Backend-Node.js_Express-000000?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb)
![Auth](https://img.shields.io/badge/Auth-JWT_%2B_bcrypt-0F766E?style=for-the-badge)
![Deployed](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel)

> **TaskFlow** is a production-ready, authenticated full-stack task management system built with the **MERN stack**.
> It covers the complete AUREX Month 2 roadmap: Component-Based React UI, API Integration with Async State Management, Node.js + Express + MongoDB CRUD, and a secure JWT + bcrypt authenticated system with user-level data isolation and live deployment.
>
> **Program:** AUREX Full-Stack Engineering Internship — **Month 2: Authenticated Full-Stack System**

---

## 🔗 Live Links

| Service | URL | Status |
| :--- | :--- | :--- |
| **Frontend — Live App** | https://taskflow-frontend-delta-lovat.vercel.app | ✅ Live |
| **Backend — Live API** | https://taskflow-backend-umber.vercel.app | ✅ Live |
| **Database** | MongoDB Atlas (Cloud) | ✅ Connected |
| **GitHub Repository** | `https://github.com/Hefza-Munsha55/taskflow` | ✅ Public |

> **Test Account Flow:** Open Frontend → Register → Login → Create Task → Edit / Toggle / Delete → Logout → Login Again

---

## 🎯 Project Overview

TaskFlow solves a real-world problem: **personal productivity with privacy.**

Every user gets their own private workspace. A user can:
1. Register securely and log in
2. Create tasks with title, description, status, priority, and due date
3. View only their own tasks — never another user's data
4. Search, filter, update status, and delete tasks
5. Stay logged in with a secure JWT token until logout

**Core Principle:** `User A cannot access User B's resources.` — enforced on every single API request via JWT middleware + MongoDB query filtering.

---

## ✅ AUREX Month 2 — Requirement Coverage

This project implements **all 4 tasks** from the official Month 2 Roadmap.

### Task 1: React Component-Based UI Development (Task Manager)

| Requirement | Implementation in TaskFlow |
| :--- | :--- |
| **Component Architecture** | Modular, reusable components: `App`, `Header` / `Navbar`, `TaskForm`, `TaskList`, `TaskItem` / `TaskCard`, `ProtectedRoute` |
| **State & Hooks** | `useState` for local app state: task list, form inputs, filters, search query, modal/edit state |
| **Task Addition** | Controlled form with validation — empty title is rejected with inline error |
| **Task Deletion** | Delete button with instant UI update + API sync |
| **Completion Toggles** | Status toggle: `Pending` → `In Progress` → `Completed` with visual badge |
| **Form Validation** | Required fields, email format, password length, real-time feedback |

**Component Hierarchy:**
```text
App.jsx (Router + AuthProvider)
├── Navbar.jsx (Header, Logout, Navigation)
├── ProtectedRoute.jsx (Guards Dashboard)
├── pages/Login.jsx
├── pages/Register.jsx
└── pages/Dashboard.jsx
    ├── TaskForm.jsx (Create / Edit Task)
    └── TaskList.jsx
        └── TaskCard.jsx (TaskItem — Toggle, Edit, Delete)
### Task 2: API Integration & Async State Management (Dashboard)
Requirement | Implementation in TaskFlow
**REST API Connectivity** | Axios instance with base URL from `VITE_API_URL` + JWT interceptor
**Async Fetching** | `useEffect` fetches tasks on Dashboard mount + after every mutation
**Loading State** | Spinner / skeleton while fetching tasks
**Error State** | API error banner + toast (e.g. network failure, expired token, server error)
**Empty State** | Friendly empty UI: "No tasks yet — Create your first task"
**Search State** | Live search by task title
**Filter State** | Filter by Status (`All / Pending / In Progress / Completed`) and Priority (`Low / Medium / High`)
*Axios Setup (`src/api/axios.js`):*
// Base URL from env + auto-attach JWT to every request
// 401 → auto-logout and redirect to /login
### Task 3: http://Node.js & http://Express.js Backend with MongoDB CRUD
Requirement | Implementation in TaskFlow
**Backend Architecture** | Structured server: `controllers/`, `models/`, `routes/`, `config/`, `middleware/`
**Database Connection** | MongoDB Atlas connection via Mongoose in `config/db.js`
**Mongoose Schemas** | Strict validation for `User` and `Task` models
**RESTful CRUD Endpoints** | Full `GET / POST / PUT / DELETE` for tasks, verified via Postman
**Clean Response Formatting** | Consistent JSON: `{ success, message, data }` + correct HTTP status codes
### Task 4: Authenticated Full-Stack System (Final Main Deliverable)
Requirement | Implementation in TaskFlow
**Security & Auth** | Password hashing with `bcryptjs`, JWT generation on login, JWT verification middleware
**Protected API Routes** | All `/api/tasks` routes require valid `Authorization: Bearer <token>`
**Data Isolation** | Every task query is filtered by `user: req.user.id` — impossible to access others' tasks
**Deployment** | Frontend + Backend deployed live on **Vercel**, Database on **MongoDB Atlas**
---

## ✨ Features

### 🔐 Authentication & Security
- Register & Login with JWT (JSON Web Token)
- Passwords hashed with `bcryptjs` — plain-text storage is *strictly prohibited*
- Protected frontend routes (`ProtectedRoute`) + protected backend routes (`auth` middleware)
- Token expiry handling — expired token auto-logs out user
- CORS configured to allow only trusted frontend origin
- No secrets in code — all secrets in `.env` (see Security Policy below)

### ✅ Task Management
- *Create:* Title, Description, Status, Priority, Due Date
- *Read:* Fetch only logged-in user's tasks
- *Update:* Edit any field + toggle status
- *Delete:* Remove task permanently
- *Search:* By title (real-time)
- *Filter:* By status & priority
- *Status Workflow:* `Pending` → `In Progress` → `Completed`

### 🎨 Frontend Experience
- Component-driven React architecture
- Controlled forms with validation & inline errors
- Loading, Error, Empty, Search, and Filter states (Task 2 requirement)
- Fully responsive — Mobile, Tablet, Desktop
- Clean modern UI with reusable components

---

## 🛠️ Tech Stack
Layer | Technology | Used For
**Frontend** | http://React.js (Vite), React Router DOM, Axios | UI, Routing, API calls
**Backend** | http://Node.js, http://Express.js | REST API, Auth, Business Logic
**Database** | MongoDB Atlas, Mongoose ODM | Cloud data storage, Schemas & Validation
**Authentication** | JWT, bcryptjs | Login sessions, Password hashing
**Deployment** | Vercel (Frontend + Backend) | Production hosting
**Testing** | Postman | API verification (All endpoints)
**Version Control** | Git + GitHub | Source control, `.gitignore` compliance
---

## 📁 Project Structure
taskflow/
├── frontend/                              # React Frontend (Vite)
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js                   # Axios instance + JWT interceptor
│   │   ├── components/
│   │   │   ├── Navbar.jsx                 # Header
│   │   │   ├── TaskCard.jsx               # TaskItem — display + actions
│   │   │   ├── TaskForm.jsx               # Create / Edit form + validation
│   │   │   ├── TaskList.jsx               # Renders list + empty state
│   │   │   └── ProtectedRoute.jsx         # Auth guard for Dashboard
│   │   ├── context/
│   │   │   └── AuthContext.jsx            # Global auth state (user, token, login, logout)
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx              # Task 2: useEffect, loading/error/empty/search/filter
│   │   ├── App.jsx                        # Routes + Layout
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env                               # VITE_API_URL (ignored)
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json                        # SPA rewrite for React Router
│
├── backend/                               # Node + Express Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                      # MongoDB Atlas connection
│   │   ├── controllers/
│   │   │   ├── authController.js          # Register / Login / Me
│   │   │   └── taskController.js          # Task CRUD + data isolation
│   │   ├── middleware/
│   │   │   ├── auth.js                    # JWT verification + req.user
│   │   │   └── errorHandler.js            # Central error handler
│   │   ├── models/
│   │   │   ├── User.js                    # User schema
│   │   │   └── Task.js                    # Task schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── taskRoutes.js
│   │   └── app.js                         # Express app + CORS + Routes
│   ├── .env                               # MONGO_URI, JWT_SECRET, CLIENT_URL (ignored)
│   ├── .gitignore
│   ├── package.json
│   ├── server.js                          # Entry point
│   └── vercel.json                        # Vercel serverless config
│
├── .gitignore
└── README.md
---

## 🗄️ Database Design

### User Model (`models/User.js`)
{
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // bcrypt hash, never plain-text
  createdAt: Date,
  updatedAt: Date
}
### Task Model (`models/Task.js`)
{
  user:        { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  title:       { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  status:      { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  priority:    { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  dueDate:     { type: Date },
  createdAt:   Date,
  updatedAt:   Date
}
*Relationship:* One User → Many Tasks (One-to-Many)
*Isolation Rule:* All task queries use `{ user: req.user.id }`

---

## 🔌 API Documentation

*Base URL (Production):* `https://taskflow-backend-umber.vercel.app`
*Base URL (Local):* `http://localhost:5000`

### Auth Routes
Method | Endpoint | Description | Auth | Postman
`POST` | `/api/auth/register` | Register new user + return JWT | No | ✅
`POST` | `/api/auth/login` | Login + return JWT | No | ✅
`GET` | `/api/auth/me` | Get current logged-in user | Yes | ✅
*Register Request:*
{
  "name": "Hassaan",
  "email": "hassaan@example.com",
  "password": "123456"
}
*Login / Register Response:*
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "68f...",
    "name": "Hassaan",
    "email": "hassaan@example.com"
  }
}
### Task Routes (All Protected)
Method | Endpoint | Description | Auth
`GET` | `/api/tasks` | Get all tasks of logged-in user | Yes
`POST` | `/api/tasks` | Create new task | Yes
`PUT` | `/api/tasks/:id` | Update task by ID (only if owner) | Yes
`DELETE` | `/api/tasks/:id` | Delete task by ID (only if owner) | Yes
*Create Task Request:*
{
  "title": "Complete AUREX Month 2 Documentation",
  "description": "Write final README and submit project",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2026-11-10"
}
*Auth Header (Required for all Task routes):*
Authorization: Bearer <JWT_TOKEN>
*Error Responses:*
Status | Meaning
`400` | Validation error (e.g. missing title, duplicate email)
`401` | No token / Invalid token / Expired token
`404` | Task not found / Not owner
`500` | Server error
---

## 🚀 How To Run Locally

### Prerequisites
- http://Node.js v18+ installed
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone Repository
git clone https://github.com/your-username/taskflow.git
cd taskflow
### 2. Backend Setup
cd backend
npm install
Create `.env` in `backend/`:
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskflow
JWT_SECRET=your_super_secret_jwt_key_change_this
CLIENT_URL=http://localhost:5173
PORT=5000
Run backend:
npm run dev
# Backend runs on http://localhost:5000
### 3. Frontend Setup
cd ../frontend
npm install
Create `.env` in `frontend/`:
VITE_API_URL=http://localhost:5000
Run frontend:
npm run dev
# Frontend runs on http://localhost:5173
---

## ☁️ Production Deployment (Vercel)

Deployed as two separate Vercel projects via Vercel CLI.

### Frontend — Vercel Environment Variables
Key | Value
`VITE_API_URL` | `https://taskflow-backend-umber.vercel.app`
cd frontend
vercel --prod
### Backend — Vercel Environment Variables
Key | Value
`MONGO_URI` | `mongodb+srv://...`
`JWT_SECRET` | `your_secret`
`CLIENT_URL` | `https://taskflow-frontend-delta-lovat.vercel.app`
cd backend
vercel --prod
> *Important:* After changing any env var in Vercel Dashboard, you must redeploy with `vercel --prod` for it to take effect.

---

## 🧪 Testing — Postman + Functional

### Postman Collection (Task 3 Requirement)
All endpoints verified in Postman:
Test Case | Expected Result
`POST /api/auth/register` | `201` + JWT token
`POST /api/auth/register` (duplicate email) | `400` — User already exists
`POST /api/auth/login` (correct) | `200` + JWT token
`POST /api/auth/login` (wrong password) | `401` — Invalid credentials
`GET /api/tasks` (no token) | `401` — Not authorized
`GET /api/tasks` (with token) | `200` + only own tasks
`POST /api/tasks` | `201` + created task
`PUT /api/tasks/:id` (other user's task) | `404` — Not found / Not owner
`DELETE /api/tasks/:id` | `200` — Task deleted
### Functional Testing (End-to-End)
- Register → Login → Create Task → Search → Filter → Edit Status → Delete Task → Logout
- Edge Cases: Empty title, invalid email, expired token, unauthorized access attempt
- UI Testing: Mobile + Desktop responsive check, loading / error / empty states verified

---

## 🔒 5. Security & Secrets Management Policy

This project strictly follows the AUREX Security Policy:
Policy | Implementation
**Environment Variables (.env)** | Never commit secret keys, DB URIs, or JWT secrets. `.env` is listed in `.gitignore`.
**Password Protection** | Storing plain-text passwords is strictly prohibited. All passwords are hashed with `bcrypt` prior to database insertion.
**Credential Management** | Do NOT hardcode database connection strings or private API keys directly into source code files. Use `process.env` only.
**JWT Security** | Token signed with `JWT_SECRET` from env, verified on every protected route.
**Data Isolation** | User-level isolation enforced in controller: `Task.find({ user: req.user.id })`
**CORS** | Backend allows only `CLIENT_URL` origin.
*`.gitignore` includes:*
node_modules/
.env
.env.local
dist/
---

## 📊 AUREX Month 2 — Evaluation Criteria Breakdown (Total: 100%)
Evaluation Area | Weight | Technical Scope & How TaskFlow Covers It
**React Frontend Development** | **15%** | Component hierarchy (`App`, `Navbar`, `TaskForm`, `TaskList`, `TaskCard`), clean JSX, state management (`useState`), controlled inputs, responsive design
**API Integration & Async Handling** | **15%** | Frontend-to-backend API connectivity via Axios, `useEffect` utilization, handling loading, error, and empty UI states
**Node.js & Express Backend** | **15%** | Server configuration, modular routes and controllers, custom middleware, clean response formatting
**MongoDB & Mongoose Database** | **15%** | Database modeling, Mongoose schemas, data validation, persistent CRUD operations
**Authentication & Data Security** | **20%** | Secure password hashing (`bcrypt`), JWT token generation, protected middleware routes, user data isolation
**Full-Stack Integration** | **10%** | Seamless end-to-end flow connecting React frontend to Express API server and MongoDB Atlas database
**Testing, Deployment & Docs** | **10%** | Structured GitHub repository, `.gitignore` compliance, Postman collection evidence, live production deployment URLs
*Total: 100%*

---

## 🔮 Future Improvements

- [ ] Drag-and-drop Kanban board (`Todo / Doing / Done`)
- [ ] Task categories, labels & due-date reminders
- [ ] Team collaboration & task sharing
- [ ] Dark mode & analytics dashboard
- [ ] Pagination & sorting for large task lists
- [ ] Refresh tokens + password reset flow

---

## 👨‍💻 Author

*Hefza* — Full-Stack Developer (MERN)
- AUREX Full-Stack Engineering Internship — Month 2 Project
- GitHub: `https://github.com/Hefza-Munsha55`


---

## 📄 License

This project is open-source for learning & portfolio purposes.
Built for the AUREX Full-Stack Engineering Internship.
