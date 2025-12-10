# bkg.forge

Lokale KI-gestützte Entwicklungsplattform mit Cyberpunk-UI, Flowise-Automatisierung und Multi-Agenten-Backend.

## Struktur
- `backend/`: Node.js + Express + Prisma + RAG + Agents
- `flowise/`: Flowise 2 + PGSQL Compose Setup
- `embed/flowise/`: Buildbare Flowise Chat Einbettung
- `webui/`: Vite + React Cyberpunk IDE
- `scripts/`: Helper zum Starten & DB-Init
- `docker/`: Compose für Backend/WebUI/Postgres
- `docs/`: Architektur- und Feature-Dokumentation

## Schnellstart
1. `cd backend && npm install && npm run dev` (Port 7845)
2. `cd flowise && ./scripts/start-flowise.sh` (Port 8610)
3. `cd webui && npm install && npm run dev` (Port 5173)

Setze `DATABASE_URL`, `LMSTUDIO_URL`, `LLAMAEDGE_URL`, `OLLAMA_URL` und `SIMSTUDIO_URL` in einer `.env`.

## Sicherheit & Ports
- Backend-Port: 7845
- Postgres-Port: 7543 (pgvector)
- Flowise Host-Port: 8610

## Self-Forging Mode
- Onboarding im WebUI abschließen.
- Planner-Agent Plan abrufen (`/api/agents/plan`).
- Dateien per Coder-Agent generieren, anschließend `rag/index` aufrufen.
