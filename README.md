# Events App

A simple web app for creating and viewing geo-located events.

## Overview

- Backend: Fastify + Node.js + PostgreSQL
- Frontend: React + Vite + Tailwind CSS + Leaflet map
- Database table: `events_entries`
- Data flow: frontend calls backend `/api/events` endpoints, backend stores/retrieves events from PostgreSQL

## Project structure

- `backend/`
  - `package.json` - backend dependencies and scripts
  - `src/server.js` - Fastify server setup
  - `src/routes/events.js` - API routes for listing, creating, and deleting events
  - `src/db.js` - PostgreSQL connection using environment variables
  - `.env` - backend environment variables

- `frontend/`
  - `package.json` - frontend dependencies and scripts
  - `src/main.jsx` - React app entry point
  - `src/App.jsx` - main page layout
  - `src/api/eventsApi.js` - API client for backend calls
  - `src/components/EventForm.jsx` - create event form
  - `src/components/EventList.jsx` - events list UI
  - `src/components/EventMap.jsx` - Leaflet map display
  - `.env` - frontend environment variables

- `db_alter_coords.py`
  - Optional Python helper for creating the `events_db` database and `events_entries` table if needed.

## Backend setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Configure `backend/.env` with PostgreSQL values:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=events_db
```

3. Create the database and table.

Option A: Use the Python helper script if you have `psycopg2` installed:

```bash
python db_alter_coords.py
```

Option B: Create manually in PostgreSQL:

```sql
CREATE DATABASE events_db;
\c events_db

CREATE TABLE IF NOT EXISTS events_entries (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. Start backend server:

```bash
npm run dev
```

The backend listens on `http://localhost:3000` by default.

## Frontend setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Configure `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

3. Start the frontend app:

```bash
npm run dev
```

The frontend will open on a Vite-hosted local port and talk to the backend API.

## API endpoints

- `GET /api/events`
  - Returns all events sorted by newest first.

- `POST /api/events`
  - Creates a new event.
  - Request body fields:
    - `title` (required)
    - `description`
    - `lat` (required, decimal latitude)
    - `lng` (required, decimal longitude)

- `DELETE /api/events/:id`
  - Deletes the event with the given ID.

## How it works

- The frontend loads events from the backend when the app starts.
- Users can add a new event with title, description, and coordinates.
- Events are displayed in a list and on the Leaflet map.
- Clicking "View" on an event recenters the map to that event.

## Notes

- Coordinates are stored in decimal degrees (DD) format.
- The backend uses CORS with `origin: "*"` so the frontend can call it locally.
- If the Python helper is used, update the credentials in `db_alter_coords.py` to match your PostgreSQL user.
