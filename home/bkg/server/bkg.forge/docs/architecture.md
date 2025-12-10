# bkg.forge Architektur

bkg.forge kombiniert einen eigenständigen TypeScript/Express-Backend-Stack mit einer Cyberpunk-Vite-Weboberfläche, Flowise-Automatisierung und SIMStudio-Simulationen. Das Backend stellt RESTful Endpunkte bereit und kapselt lokale LLMs (LMStudio, LlamaEdge, Ollama) über einen einheitlichen Client. RAG nutzt pgvector in PostgreSQL, Prisma verwaltet das Schema.

## Komponenten
- **Backend (Node + Express + Prisma):** Hosts API, Agenten und RAG-Pipeline. Lauscht standardmäßig auf Port 7845.
- **Flowise-Service:** Läuft in einem separaten Container (Port 8610 extern) und wird über den FlowiseClient voll proxied.
- **WebUI:** Vite + React + Tailwind + Monaco. Stellt Onboarding, IDE, Agent-Panel, Flowise-Embed und Simulation bereit.
- **SIMStudio:** Externer Dienst für Simulationen, via `/api/sim` integriert.

## Datenfluss
1. Benutzer erstellt Idee im WebUI → `/api/agents/plan` generiert Plan.
2. Dateien werden vom Coder/Reviewer-Agenten erstellt/prüft und in Projekten versioniert.
3. RAG-Service chunked und embeded Inhalte, speichert Vektoren in pgvector.
4. Queries rufen `ragService.query` auf und kombinieren Retrieval mit LLM-Antworten.
5. Flowise-Flows können über `/api/flowise` ausgelöst werden und Chats werden in der UI eingebettet.

## Sicherheit
- Helmet, Rate-Limiting, CORS Whitelisting.
- Starke Standardpasswörter und Ports außerhalb gängiger Entwicklungsbereiche.
- Keine Secrets im Repo; `.env` muss gepflegt werden.
