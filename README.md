# TaskFlow - Full-Stack Task Manager (AUREX Month 2)

React (Vite) + Express + MongoDB Atlas with JWT auth.

## MongoDB Atlas setup (once)
1. Create a free account at mongodb.com/atlas and create a free M0 cluster.
2. Database Access -> Add New Database User (username + password, role: read and write to any database).
3. Network Access -> Add IP Address -> "Allow access from anywhere" (0.0.0.0/0) for development.
4. Clusters -> Connect -> Drivers -> copy the connection string.
5. Put it in backend/.env as MONGO_URI, replace <db_username>/<db_password>, and add /taskflow before the ?.

## Run locally
1. Install Node.js (LTS).
2. Backend:  `cd backend && npm install && npm run dev`   (http://localhost:5000)
3. Frontend: `cd frontend && npm install && npm run dev`  (http://localhost:5173)
4. Register and add tasks. In Atlas: Database -> Browse Collections -> taskflow -> users, tasks.

## API (developers / Postman only - not shown in the UI)
POST /api/auth/register, POST /api/auth/login, GET /api/auth/me
GET/POST /api/tasks, PUT/DELETE /api/tasks/:id   (Bearer token required)
