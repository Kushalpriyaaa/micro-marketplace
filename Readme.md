# Micro Marketplace App

## Project Overview
Micro Marketplace App is a three-surface commerce demo built for my internship assignment. The backend secures data with JWT auth and MongoDB, the web client uses React for a responsive catalog view, and the mobile client mirrors the same flows through Expo. Users can register, browse, search, paginate, and favorite products from any device. All clients point to the same deployed API, so features stay consistent. The project stays intentionally lean while meeting every stated requirement.

## Tech Stack
- **Backend:** Node.js, Express, Mongoose, JWT, bcrypt, Morgan
- **Database:** MongoDB Atlas
- **Web:** React 19, React Router, Axios, Vite
- **Mobile:** React Native (Expo SDK 54), React Navigation, AsyncStorage
- **Tooling:** Nodemon, seed script, EAS Update, Render, Vercel

## Backend
- Secure JWT register/login endpoints with hashed passwords (bcrypt)
- Product CRUD with validation, search, pagination, and favorite toggles
- Seed script loads 10 products and 2 demo users for quick testing
- Hosted on Render: https://micro-marketplace-1-52ut.onrender.com

## Web
- React SPA with clean CSS modules for login, register, product list, detail, and favorites
- Axios interceptor injects tokens and handles 401 flows
- Search bar + pagination controls backed by API query params
- Deployed on Vercel: https://micro-marketplace-lawjoghzj-kushalpriyaaas-projects.vercel.app/

## Mobile
- Expo app reusing the same API; supports login, browse, detail, favorite/unfavorite
- Navigation driven by React Navigation stack; tokens stored with AsyncStorage
- Published through EAS Update: https://expo.dev/accounts/jitendra2/projects/micro-marketplace-mobile/updates/890f874b-b4f3-4174-8014-d6717e0291d9

## Features
- JWT authentication with proper status codes and validation
- Product listing with search keywords, paging, and responsive cards
- Product detail view with pricing, description, and favorite button
- Favorite management persisted per user on backend
- Seeded demo content for quick reviewer access
- Shared REST client patterns across web and mobile

## Live Deployment Links
- **Backend (Render):** https://micro-marketplace-1-52ut.onrender.com
- **Web (Vercel):** https://micro-marketplace-lawjoghzj-kushalpriyaaas-projects.vercel.app/
- **Mobile (Expo EAS Update):** https://expo.dev/accounts/jitendra2/projects/micro-marketplace-mobile/updates/890f874b-b4f3-4174-8014-d6717e0291d9

## Test Credentials
- Email: test1@example.com / Password: 123456
- Email: test2@example.com / Password: 123456

## Local Setup Instructions

### Backend
```bash
cd backend
npm install
# create .env with PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN
npm run seed
npm run dev
```

### Web
```bash
cd web
npm install
npm run dev
# Vite runs on http://localhost:5173 by default
```

### Mobile
```bash
cd mobile
npm install
npx expo start
# Scan QR with Expo Go or run `npm run android`
```

## API Overview
- `POST /api/auth/register` – create account
- `POST /api/auth/login` – obtain JWT
- `GET /api/products` – list products with `search`, `page`, `limit`
- `GET /api/products/:id` – product detail
- `POST /api/favorites/:productId` – add favorite
- `DELETE /api/favorites/:productId` – remove favorite
- `GET /api/favorites` – list user favorites

## Notes
- Render free tier can take 20–30 seconds to wake on the first request
- Mobile app runs via Expo Go or EAS builds; ensure the device has internet access
- Environment variables stay outside source control; see `.gitignore`
- For grading, all assignment checkpoints listed above are implemented and running in the deployed links
