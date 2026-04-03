# Women Safety App Setup Guide

This project has two apps:

- `frontend`: React + Vite client
- `backend`: Node.js + Express + MongoDB API with Socket.IO

## Requirements

- Node.js 20 or newer recommended
- npm 10 or newer recommended
- MongoDB running locally, or a MongoDB Atlas connection string

## 1. Clone The Repository

```powershell
git clone <your-repo-url>
cd Women-safety-app
```

## 2. Configure Environment Variables

### Backend

Copy [backend/.env.example](/c:/Users/Rahul/Desktop/gitContros/Women-safety-app/backend/.env.example) to `backend/.env` and update the values:

```env
MONGO_URI=mongodb://127.0.0.1:27017/women-safety-app
JWT_SECRET=change_this_to_a_strong_secret
PORT=5000
NODE_ENV=development
```

Notes:

- `MONGO_URI` is required or the server will not start.
- `JWT_SECRET` should be changed before sharing or deploying the app.

### Frontend

Copy [frontend/.env.example](/c:/Users/Rahul/Desktop/gitContros/Women-safety-app/frontend/.env.example) to `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_BASE_URL=http://localhost:5000
VITE_ROOM_ID=replace_with_a_real_room_id_for_sos_testing
```

Notes:

- `VITE_API_URL` is used for auth and SOS REST APIs.
- `VITE_BASE_URL` is used for Socket.IO, rooms, and messages APIs.
- `VITE_ROOM_ID` is currently required for the SOS button because the app uses a fixed room id for testing.

## 3. Install Dependencies

Open two terminals from the repo root.

### Terminal 1: Backend

```powershell
cd backend
npm install
npm run dev
```

The backend starts on `http://localhost:5000`.

### Terminal 2: Frontend

```powershell
cd frontend
npm install
npm run dev
```

The frontend starts on `http://localhost:5173`.

## 4. First Run Checklist

- Make sure MongoDB is running before starting the backend.
- Make sure the frontend is served from `http://localhost:5173` because backend CORS is currently configured for that origin.
- Allow browser geolocation permission when testing the SOS flow.
- Create at least one chat room, then update `VITE_ROOM_ID` with that room's MongoDB `_id` if you want the SOS button to store location messages in a real room.

## Project Commands

### Backend

```powershell
npm run dev
npm start
```

### Frontend

```powershell
npm run dev
npm run build
npm run preview
```

## Known Setup Notes

- There is no root-level script yet, so frontend and backend are started separately.
- The backend CORS and Socket.IO origin are hardcoded to `http://localhost:5173`.
- The SOS flow currently depends on a manually supplied `VITE_ROOM_ID`.

## Recommended Next Improvements

- Add a root `package.json` with combined scripts for easier startup.
- Add dynamic room selection for SOS instead of relying on `VITE_ROOM_ID`.
- Replace hardcoded CORS origins with environment variables.
