# 🐳 Bloglist — Containerized

A containerized development and production environment for the bloglist application (Parts 4-5 of Full Stack Open), built as the "own full stack app" exercise for Part 12: Containers.

## 📂 Project Structure

This project is containerized using Docker, split into distinct development and production environments.

### 🌐 Frontend (`bloglist-frontend/`)
* `Dockerfile` — Multi-stage production build (tests, builds static assets, and serves via Nginx).
* `dev.Dockerfile` — Development setup configured with bind mounts for live reloading.

### ⚙️ Backend (`bloglist-backend/`)
* `Dockerfile` — Production container for the Node.js/Express API.
* `dev.Dockerfile` — Development container utilizing Nodemon for automatic restarts.
* `mongo/mongo-init.js` — Database initialization script that seeds a test user and sample blogs on first run.

### 🔀 Networking & Orchestration
* **Reverse Proxy:**
  * `nginx.conf` — Production reverse proxy routing traffic.
  * `nginx.dev.conf` — Development reverse proxy configured with WebSocket support for Vite HMR (Hot Module Replacement).
* **Docker Compose:**
  * `docker-compose.yml` — Runs the full production stack.
  * `docker-compose.dev.yml` — Runs the full development stack.

## 🛠️ Running in development mode

```bash
docker compose -f docker-compose.dev.yml up --build
```

- App available at [http://localhost:8080](http://localhost:8080)
- Source files are bind-mounted into the containers, so edits to the frontend or backend take effect live (Vite HMR / nodemon)
- A fresh database is seeded automatically on first run with a test user (`testuser` / `testpass`) and a few sample blogs

## 🚀 Running in production mode

```bash
docker compose -f docker-compose.yml up --build
```

- App available at [http://localhost:8080](http://localhost:8080)
- Images are built once (tests run as part of the build) and contain no live file syncing
- Frontend is served as static files via Nginx; backend runs without nodemon

## 📦 How it's containerized

- **Nginx** is the single public entry point (port 8080). It serves the frontend and proxies `/api/*` requests to the backend, preserving the `/api` prefix since the backend's own routes are mounted under `/api`.
- **Frontend and backend containers have no exposed ports** of their own — they're only reachable internally, by service name, over the Docker network Compose creates automatically.
- **MongoDB** data persists across restarts via a bind-mounted volume (`mongo_data`).
- The production frontend image is built in two stages: dependencies are installed and tests are run first, then the app is built and the static output is copied into a lightweight Nginx image — if the tests fail, the build fails too.

## 🔗 Links

- Main Part 12 repository: https://github.com/Dax-Goonies/fullstackopen-part12
- Bloglist containerized repository: https://github.com/Dax-Goonies/fullstackopen-part12-exo22-23