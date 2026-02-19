# Micro Marketplace

## Overview
- Full-stack marketplace that exposes a secure Node/Express REST API, a Vite-powered React web client, and an Expo mobile app.
- Users can register/login, browse curated products, mark favorites, and view product details from any device.
- Shared token-based authentication keeps sessions in sync across clients.

## Tech Stack
- **Backend:** Node.js, Express, Mongoose, JWT, bcrypt, Morgan.
- **Database:** MongoDB Atlas or self-hosted MongoDB.
- **Web:** React 19, React Router, Axios, Vite.
- **Mobile:** Expo SDK 54 (React Native 0.81), React Navigation, AsyncStorage.
- **Tooling:** nodemon for hot reload, seed script for demo data.

## Repository Layout
```
backend/   REST API (Express + MongoDB)
mobile/    Expo React Native client
web/       React + Vite web client
```

## Prerequisites
- Node.js 18+ and npm.
- Running MongoDB instance (local Docker or managed service).
- Expo CLI (`npm install -g expo-cli`) plus Android Studio / Xcode simulators for native testing.

## Backend API (`backend/`)
1. Install dependencies and create your environment file:
	```bash
	cd backend
	npm install
	# create .env with the variables below
	```
2. Required variables inside `.env`:
	```env
	PORT=5000
	MONGO_URI=mongodb://localhost:27017/micro-marketplace
	JWT_SECRET=super-secret-string
	JWT_EXPIRES_IN=1d
	```
3. Run the API:
	```bash
	npm run dev        # nodemon
	# or
	npm start
	```
4. Seed demo data whenever needed:
	```bash
	npm run seed
	```

## Web App (`web/`)
1. Update `web/src/api/axios.js` if the API does not live at `http://localhost:5000`.
2. Install and run Vite:
	```bash
	cd web
	npm install
	npm run dev
	```
3. Access the UI at the Vite URL (usually http://localhost:5173).

## Mobile App (`mobile/`)
1. Edit `mobile/src/api/axios.js` and set `BASE_URL` to your machine's LAN IP while the backend runs.
2. Install dependencies and start Expo:
	```bash
	cd mobile
	npm install
	npm run start      # launches Expo Dev Tools
	```
3. Launch on a device/emulator:
	```bash
	npm run android
	# or
	npm run ios
	```
	Scan the QR code with Expo Go (physical device) or let Expo open the simulator.

## Helpful Scripts
| Scope   | Command           | Description |
|---------|-------------------|-------------|
| backend | `npm run dev`     | Start API with nodemon |
| backend | `npm run seed`    | Insert/refresh sample data |
| web     | `npm run dev`     | Start Vite dev server |
| web     | `npm run build`   | Production build |
| mobile  | `npm run start`   | Launch Expo dev tools |
| mobile  | `npm run android` | Open Android emulator/device |

## Tips
- Keep `.env` files out of source control (see `.gitignore`).
- When testing mobile locally, verify the backend and device use the same network so the LAN IP is reachable.
- Run `npm run seed` after dropping your database so the UI has products to show.
