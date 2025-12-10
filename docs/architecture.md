# bkg.forge Architektur

bkg.forge kombiniert einen Express/Prisma-Backend-Stack, Flowise-gestützte Automatisierung und eine cyberpunkige Web-IDE.

## Komponenten
- **Backend**: Express API auf Port 8444, Prisma + PostgreSQL + pgvector, RAG-Pipeline, Multi-Agenten.
- **Flowise**: Läuft über docker-compose auf Port 8743 mit persistenter Postgres-Anbindung.
- **WebUI**: Vite + React + Tailwind, Monaco-Editor, Onboarding, Flowise-Embed, Simulation UI.
- **Scripts**: start-all und init-db orchestrieren lokale Läufe.

## Datenfluss
1. Benutzer sendet Anfragen an `/api/*`.
2. RAG nutzt Embeddings über LMStudio und pgvector-Suche.
3. Agents orchestrieren Planung, Codierung, Review und Deployment.
4. Flowise-Client proxyt Chat- und Flow-Execution.
5. WebUI konsumiert Backend-APIs.
