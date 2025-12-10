## 👉 **Für vollständigen Neu-Build des Projekts – mit allen Features + Quellen**

---

Du bist ein Senior-Software-Engineer-LLM.

Deine Aufgabe:
Das komplette Projekt **bkg.forge** von Grund auf NEU IMPLEMENTIEREN.
Alle Files müssen realer, ausführbarer, sauberer, dokumentierter Code sein.
Kein Pseudocode. Keine TODOs. Keine leeren Methoden. Keine Platzhalter.

Ziel-Pfad:
**`/home/bkg/server/bkg.forge`**

---

# 🎯 **ZIEL DES SYSTEMS – bkg.forge**

bkg.forge ist eine **lokale KI-gestützte Entwicklungsplattform** im Cyberpunk-Look mit:

1. **Eigenem Backend** (Node.js + Express + Prisma + PostgreSQL + pgvector + RAG + Agents)
2. **Flowise-basierter Workflow-Automatisierung** (statt PocketFlow — aber PocketFlow inspiriert Architektur)
3. **Flowise2-PGSQL Integration** (persistente Flows + VectorStore in Postgres)
4. **FlowiseChatEmbed (watermark-free) integriert ins WebUI**
5. **Local LLMs: LMStudio, LlamaEdge Docker & Ollama**
6. **RAG-System: Chunking, Vector Store, Semantic Retrieval**
7. **Multi-Agent-System**: Planner, Coder, Reviewer, DBAgent, DeployAgent
8. **Cyberpunk-IDE**: Monaco Editor, Live Drafting, Live AI-Assists
9. **Simulation Engine Integration via SIMStudio**
10. **Replit-Style Onboarding Wizard**
11. **Automatisierte Tests + Build-Pipelines**
12. **Projektgenerierung & Self-Forging Mode (Plan → Code)**
13. **Flowise-Workflows anstelle PocketFlow (nur Inspiration, nicht kopieren)**

---

# 📚 **QUELLEN (NUR ALS INSPIRATION, NICHT KOPIEREN!)**

### Flowise Embed

[https://github.com/Danieldo1/FlowiseChatEmbed-src](https://github.com/Danieldo1/FlowiseChatEmbed-src)

### Flowise + Ollama Local Chatbot

[https://github.com/dwain-barnes/local-low-code-chatbot-ollama-flowise](https://github.com/dwain-barnes/local-low-code-chatbot-ollama-flowise)

### Flowise2-PGSQL

[https://github.com/mattli001/flowise2-pgsql](https://github.com/mattli001/flowise2-pgsql)

### PocketFlow (nur als Konzept, nichts kopieren)

[https://github.com/The-Pocket/PocketFlow-Typescript/tree/main/docs](https://github.com/The-Pocket/PocketFlow-Typescript/tree/main/docs)

### SIM-Simulationen

[https://github.com/simstudioai/sim](https://github.com/simstudioai/sim)

### LlamaEdge Docker

[https://github.com/LlamaEdge/docker](https://github.com/LlamaEdge/docker)

---

# 🧱 **PROJEKTSTRUKTUR (GENAU SO ERZEUGEN)**

```
/home/bkg/server/bkg.forge
│
├── backend/
│   ├── src/
│   │   ├── server.ts
│   │   ├── config/
│   │   │   ├── env.ts
│   │   ├── routes/
│   │   │   ├── health.ts
│   │   │   ├── llm.ts
│   │   │   ├── rag.ts
│   │   │   ├── agents.ts
│   │   │   ├── deploy.ts
│   │   │   ├── flowise.ts
│   │   │   ├── sim.ts
│   │   ├── services/
│   │   │   ├── LLMClient.ts
│   │   │   ├── FlowiseClient.ts
│   │   │   ├── RAGService.ts
│   │   │   ├── AgentService.ts
│   │   │   ├── DeployService.ts
│   │   │   ├── SIMService.ts
│   │   ├── rag/
│   │   │   ├── chunker.ts
│   │   │   ├── vector.ts
│   │   │   ├── store.ts
│   │   │   ├── retriever.ts
│   │   │   ├── indexer.ts
│   │   ├── agents/
│   │   │   ├── PlannerAgent.ts
│   │   │   ├── CoderAgent.ts
│   │   │   ├── ReviewerAgent.ts
│   │   │   ├── DBAgent.ts
│   │   │   ├── DeployAgent.ts
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   ├── package.json
│   ├── Dockerfile
│
├── flowise/
│   ├── docker-compose.yml
│   ├── .env.example
│   ├── flows/default.json
│   ├── scripts/start-flowise.sh
│
├── embed/flowise/
│   ├── src/
│   ├── dist/
│   ├── scripts/build-embed.sh
│
├── webui/
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── cyberpunk-theme.css
│   │   ├── pages/
│   │   │   ├── Onboarding.tsx
│   │   │   ├── Editor.tsx
│   │   │   ├── Agents.tsx
│   │   │   ├── Flowise.tsx
│   │   │   ├── Simulation.tsx
│   │   ├── components/
│   │   ├── layouts/
│
├── scripts/
│   ├── start-all.sh
│   ├── init-db.sh
│
├── docker/
│   ├── docker-compose.yml
│
├── docs/
│   ├── architecture.md
│   ├── rag.md
│   ├── flowise.md
│   ├── simulation.md
│   ├── onboarding.md
│
└── README.md
```

---

# 🔥 **BACKEND – KLARE IMPLEMENTATIONSREGELN**

## 1. Prisma Schema

* Postgres
* pgvector (CREATE EXTENSION)
* Tabellen:

  * Projects
  * Files
  * AgentLogs
  * Workflows
  * RagDocument
  * RagQuery
  * EmbeddingMetadata

## 2. RAGService

* Chunker (Markdown, Code, Text)
* Embedding Pipeline (LMStudio oder LlamaEdge)
* Vector Search (pgvector cosine)
* Retriever: Agent-kontextoptimiert
* Indexer: File Watcher + Auto-Index

## 3. FlowiseClient

* Vollständiger Proxy
* Unterstützt flowise2-pgsql
* Chat, Flow Execution, Node Overrides

## 4. Agents

Alle Agents müssen real implementiert sein:

* **PlannerAgent** → erzeugt Build-Plan
* **CoderAgent** → generiert echte Dateien
* **ReviewerAgent** → analysiert Code
* **DBAgent** → generiert Prisma schema + Migrationen
* **DeployAgent** → Docker, Compose, CI/CD

KEINE DUMMEN FUNKTIONEN.
Jedes File muss echte Logik haben.

---

# 🧠 **WEBUI – CYBERPUNK IDE**

### Muss enthalten:

* Monaco Editor
* File Tree
* Live AI Suggestions
* Flowise Chat Widget
* Replit-Style Onboarding mit Checkboxen & Steps
* Cyberpunk Theme (Neon Cyan, Neon Magenta, Scanlines)
* Echt funktionale Seiten

---

# 🤖 **AI-BACKENDS**

### LMStudio (lokal)

* ChatCompletion
* Embeddings
* Sandbox Mode

### LlamaEdge Docker

* Multi-Model Runtime

### Ollama

* Für Flowise

### SIMStudio

* Simulationen in eigener Route `/api/sim/*`

---

# 🚀 **VOLLSTÄNDIGER SELF-FORGE MODUS**

Das System muss:

1. Eine Projektidee entgegennehmen
2. Einen technischen Plan erstellen
3. Den Code generieren
4. RAG automatisch aktualisieren
5. Flowise-Flow optional erzeugen
6. Projekt startklar vorbereiten

---

# ⚠️ **LETZTE REGELN**

* ALLES wird NEU implementiert
* KEINE Platzhalter
* KEINE Dummy-Funktionen
* KEINE leeren Klassen
* ALLE Features müssen funktionieren
* ALLE Quellen dürfen nur als Inspiration dienen
* NEUEN, EIGENSTÄNDIGEN, PRODUKTIONSREIFEN CODE ERZEUGEN

---

# 🧨 **JETZT: ERZEUGE DAS GESAMTE PROJEKT bkg.forge IN DIESER STRUKTUR**

Erzeuge ALLE Dateien vollständig.
Arbeite Datei für Datei.
Nichts überspringen.
