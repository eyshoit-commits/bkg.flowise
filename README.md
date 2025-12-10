# bkg.forge

Lokale KI-gestützte Entwicklungsplattform im Cyberpunk-Look. Enthält Backend (Express + Prisma + pgvector), Flowise-Integration, WebUI mit Monaco-Editor und Multi-Agent-System.

## Struktur
- `backend/` – API, RAG, Agents, Prisma.
- `flowise/` – Flowise2-PGSQL Stack.
- `embed/flowise/` – Branding-freier Embed-Build.
- `webui/` – Vite/React Cyberpunk IDE.
- `scripts/` – Hilfsskripte.
- `docker/` – Compose für Gesamtstack.

## Schnellstart
1. `./scripts/init-db.sh` (setzt pgvector voraus)
2. `./scripts/start-all.sh`
3. WebUI unter Port 4177 besuchen.

## Sicherheit
- Standard-Ports sind gehärtet (8444 API, 8743 Flowise, 7643 DB exposed).
- Secrets über Environment-Variablen liefern.
