# bkg.forge

Lokale KI-gestützte Entwicklungsplattform mit Backend (Express + Prisma + Postgres + pgvector), Flowise-Automation und Cyberpunk-WebUI.

## Struktur
- backend: API, Agents, RAG
- flowise: Flowise docker-compose
- embed/flowise: minimale Build-Pipeline für Chat Embed
- webui: Vite + React Cyberpunk IDE
- docs: Architektur und Feature-Übersichten

## Schnelleinstieg
1. Backend-Umgebung
```bash
cd backend
npm install
export DATABASE_URL=postgresql://forge:secret@localhost:7543/forge
npm run dev
```
2. WebUI
```bash
cd webui
npm install
npm run dev -- --host
```
3. Flowise
```bash
cd flowise
cp .env.example .env
./scripts/start-flowise.sh
```

Verwende sichere Ports (Backend 8443, Flowise 41800, Postgres 7543) laut Sicherheitsrichtlinie.
