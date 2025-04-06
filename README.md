# 🩺 Blood Pressure App (Frontend + Mock API)

A simple React-based blood pressure calculator app with a mock backend API using Express. This project demonstrates a clean frontend/backend split, API interaction, and test coverage using Vitest.

---

## 🚀 Tech Stack

- React (with Vite)
- Express.js (mock backend)
- Vitest + React Testing Library (unit + integration tests)

---

## 🆕 Vite-based React Setup (Not CRA)

> This project uses [Vite](https://vitejs.dev) instead of Create React App (CRA) for the React frontend.  
> Vite offers faster startup times, modern build tooling, and a simpler config for React + testing.  
>
> Key differences from CRA:
> - The dev server runs on `http://localhost:5173`
> - CSS and assets are imported directly into JavaScript
> - Testing is powered by **Vitest**, not Jest
> - Config lives in `vite.config.js`, not hidden behind react-scripts

---

## 📁 Project Structure

```
bp-containerised/
├── frontend/         # React app (Vite + Vitest)
├── mock-backend/     # Mock Express API server
```

---

## 🧹 Clean Setup (from scratch)

If you want to reset and rebuild everything cleanly:

```bash
# 1. Remove old dependencies and builds
rm -rf frontend/node_modules frontend/dist frontend/.vite
rm -rf mock-backend/node_modules
rm frontend/package-lock.json
rm mock-backend/package-lock.json
```

---

## 📦 Reinstall Dependencies

### ✅ Frontend (React + Vite)

```bash
cd frontend
npm install
```

Ensure `frontend/package.json` includes this in "scripts":

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest"
}
```

Ensure `vite.config.js` contains:

```js
test: {
  globals: true,
  environment: 'jsdom',
}
```

---

### ✅ Mock Backend (Express)

```bash
cd ../mock-backend
npm install
```

---

## 🚀 Running the App

### 🖼️ Frontend (React + Vite)

In a terminal from the root of the project:

```bash
cd frontend
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

### 🔙 Mock Backend (Express)

In another terminal from the root of the project:

```bash
cd mock-backend
npm start
```

Mock API available at: [http://localhost:8000/getbpcategory](http://localhost:8000/getbpcategory)

---

## 🧪 Running Tests

Tests are written using **Vitest** + **React Testing Library**.

### Run all tests:

In another terminal from the root of the project:

```bash
cd frontend
npm run test
```

### Watch mode:

```bash
npx vitest --watch
```

---

## ✅ Tests Cover:

- Valid form submission (calls API and displays result)
- Invalid inputs (out-of-range systolic/diastolic)
- Empty submission handling
- API error handling

---

## 📌 Notes

- Frontend proxy can be configured in `vite.config.js` to avoid CORS issues during dev.
- This setup is ideal for local development and can be extended to real backend APIs like Spring Boot.
- For production, `npm ci` is recommended for fast and deterministic installs.

---

## 💡 Next Steps (Optional)

- Add GitHub Actions for CI tests
- Add Docker support (`docker-compose`)
- Replace mock backend with Spring Boot
- Store BP readings in a real database (PostgreSQL)

---

Made with ❤️ using Vite, React, and Express.
