# 🩺 Blood Pressure App (Frontend + Mock API)

A simple React-based blood pressure calculator app with a mock backend API using Express. Uses Vitest for test coverage.
This project uses [Vite](https://vitejs.dev) for the React frontend.

## Tech Stack

- React (with Vite)
- Express.js (mock backend)
- Vitest + React Testing Library (unit + integration tests)

## Project Structure

```
bp-frontend/
├── frontend/         # React app (Vite + Vitest)
├── mock-backend/     # Mock Express API server
```
---

## Build and Run

### Clean Environment

```
# 1. Remove old dependencies and builds
rm -rf frontend/node_modules frontend/dist frontend/.vite
rm -rf mock-backend/node_modules
rm frontend/package-lock.json
rm mock-backend/package-lock.json
```

### Install Dependencies for React (Vite)


```bash
# From root of project
cd frontend
npm install
```

### Install dependencies for Mock Backend (Express)

```bash
# From root of project
cd mock-backend
npm install
```

### Run the App (React + Vite)

```bash
# From root of project
cd frontend
npm run dev
```

LocalApp: [http://localhost:5173](http://localhost:5173)

### Run Mock Backend (Express)

```bash
# In new terminal from root of project
cd mock-backend
npm start
```

Mock API available at: [http://localhost:8000/getbpcategory](http://localhost:8000/getbpcategory)

---

## Running Tests

Tests are written using **Vitest** + **React Testing Library**.

### Run all tests:

In another terminal from the root of the project:

```bash
# From root of project
cd frontend
npm run test
```

### Create Dependency Audit Report

```bash
# From root of project
cd frontend
# Run audit on dependencies
npm audit --json --audit-level=moderate > npm-audit.json
# Convert audit report to html table
node scripts/audit-to-html.cjs
```

## References

https://spring.io/guides/gs/accessing-data-mongodb
https://start.spring.io/
https://vite.dev/guide/
https://vitest.dev/

## Integration Testing (Coming soon)

In a terminal outside the dev container, navigate to the project root and run:

`docker compose up -d`

This will pull down and run the backend API and a mongoDB container

Then in the dev container run:

`npm run dev`

The frontend will now be integrated with the backend and you can make changes to the frontend on the fly.