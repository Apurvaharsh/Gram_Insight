# Gram Insight – Frontend Overview

## What the app does
Gram Insight is a rural development console. It lets officers and admins register villages, view their readiness, generate AI-based development plans, and forecast budget/timeline impact. The UI is minimal and modern, optimized for fast scanning of village status, analytics, AI plans, and forecasts.

## Key flows (pages)
- **Dashboard**: High-level stats (villages, approvals, priority score), quick actions, map, and activity.
- **Villages list**: Directory with district, block, population, SC %, priority score, status, and quick links to detail, forecast, and AI plan.
- **Add village**: Form to capture basics, demographics, and amenities. Submits to the backend `POST /api/villages`.
- **Village detail**: Single-village profile with amenities view, priority, and actions (delete, links to forecast and AI plan).
- **Forecast**: Calls `GET /api/villages/:id/forecast` to show AI-generated budget, timeline, and score lift.
- **AI Plan**: Calls `GET /api/villages/:id/ai-plan` for a textual development roadmap and derived action items.
- **Approvals**: Lists pending villages; admin can approve (`PUT /api/villages/:id/approve`) or drill into detail.
- **Analytics**: Pulls summary, amenities gaps, and top priority ranking from `/api/analytics/*`.
- **Map**: Displays villages with priority-colored markers (uses optional GeoJSON `location`).
- **Register/Profile**: Register issues a token; Profile reads `/api/auth/me` (route enabled in router).

## Data shape expected by the frontend
Village objects are expected to contain:
- `_id`, `villageName`, `district`, `block`
- `population`, `scPopulation`, `priorityScore`, `status`
- `amenities` with: `waterSupply`, `electricity`, `roadConnectivity`, `healthcare`, `school`, `toilets`, `internet`
- Optional: `createdAt`, `createdBy`, and `location { type: "Point", coordinates: [lon, lat] }`

## API utilities
All frontend calls go through `frontend/utils/api.js`, which:
- Adds Bearer token when present.
- Normalizes errors (throws with status and message).
- Exposes grouped APIs: `authAPI`, `villageAPI`, `forecastAPI`, `aiPlanAPI`, `analyticsAPI`.

## Notes on UX polish
- Tables and cards guard against missing data (e.g., population, SC%).
- Quick actions are added to Villages (detail/forecast/AI).
- Forecast and AI pages validate responses and show user-friendly fallbacks.
- Profile route is enabled in the router.
- Context (`VillageContext`) now uses the shared API utility and normalizes village objects consistently.

## How things connect
- **Auth**: `Register` posts to `/api/auth/register` and stores token. Other protected routes rely on the token in `localStorage`.
- **Villages**: `VillageList`, `VillageDetail`, `AddVillage`, `Approvals`, `Map` consume `villageAPI` data. Amenities normalization is handled in both frontend and backend.
- **AI/Forecast**: `Forecast` uses `/forecast`; `AI Plan` uses `/ai-plan`; detail links route directly with the village ID.
- **Analytics**: Dashboard and Analytics pages call `/analytics/summary`, `/amenities-status`, `/priority-ranking`.

## Running the frontend
From `frontend/`:
```bash
npm install
npm run dev
```
Vite serves at the shown localhost port; the app expects backend at `http://localhost:3000/api`.

