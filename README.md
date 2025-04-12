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
│
├── .devcontainer/           # Dev container configuration for VS Code
├── .github/                 # GitHub workflows (CI/CD)
├── mock-backend/            # Mock server for local development/testing
├── node_modules/            # Project dependencies (auto-generated)
├── public/                  # Static assets served by Vite
├── scripts/                 # Custom scripts (e.g. audit report generator)
├── src/                     # React source code
│   ├── App.jsx              # Main application component
│   └── ...                  # Other components and logic
│
├── .env                     # Environment variables for local dev
├── .env.prod               # Environment variables for production
├── .gitignore               # Files/directories to ignore in Git
├── docker-compose.yml       # Compose setup for frontend + mock backend
├── Dockerfile               # Docker build config for frontend
├── eslint.config.js         # ESLint configuration
├── index.html               # Entry HTML file for Vite
├── nginx.conf               # Custom NGINX config (optional)
├── npm-audit.json           # Raw output from `npm audit` (CI)
├── npm-audit-report.html    # HTML report from audit JSON
├── package.json             # Project metadata and scripts
├── package-lock.json        # Dependency lockfile
├── vite.config.js           # Vite configuration
└── README.md                # Project documentation
```

---

## Build and Run

### Clean Environment

```
rm -rf frontend/node_modules frontend/dist frontend/.vite
rm -rf mock-backend/node_modules
rm frontend/package-lock.json
rm mock-backend/package-lock.json
```

### Build and Run the App (React + Vite)

```bash
npm install
npm run dev
```

LocalApp: [http://localhost:5173](http://localhost:5173)

### Build and Run Mock Backend (Express)

```bash
cd mock-backend
npm install
npm start
```

Mock API available at: [http://localhost:8000/getbpcategory](http://localhost:8000/getbpcategory)

---

## Running Tests


### Run all tests (uses Vitest):

In another terminal from the root of the project:

```bash
npm run test
```

### Create Dependency Audit Report

```bash
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