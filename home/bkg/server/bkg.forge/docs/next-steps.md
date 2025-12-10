# Nächste Schritte für bkg.forge

Diese Liste priorisiert die ausstehenden Arbeiten, um die Plattform produktionsreif zu machen und alle geforderten Features lückenlos abzudecken.

## 1. Stabilisierung Backend
- **Auth & Security**: Zero-trust API Keys pro Agent-Route, Signaturen für Flowise-Proxys, mTLS-Option vorbereiten.
- **Job-Queue**: Asynchrone Agent-Läufe (BullMQ/Redis) mit Retry-Strategien, dedizierten Dead-Letter-Queues und strukturierten Logs (OpenTelemetry).
- **Streaming & SSE**: Chat/Agent-Antworten per Server-Sent-Events ausgeben, um lange LLM- oder RAG-Läufe sichtbar zu machen.
- **Validation**: Zod-Schemas für alle API Payloads, inklusive Limit-Checks für Chunkgrößen und Flowise-Overrides.

## 2. RAG & Datenhaltung
- **Index-Pipeline**: Dateiwatcher (chokidar) + inkrementelle Indizes, Checkpointing pro File-Hash.
- **Embeddings**: Umschaltbar zwischen LMStudio, LlamaEdge und Ollama; Caching-Layer für identische Eingaben.
- **Search**: Hybrid BM25 + Vektor (pgvector) mit Re-Ranking, konfigurierbare TopK/Score-Grenzen.
- **Governance**: PII-Filter vor Persistenz, Audit-Tabellen für RAGQuery/RagDocument Lifecycle.

## 3. Agents & Self-Forging
- **Planner**: Strukturierte Plansprache (YAML) mit Abhängigkeiten, Schätzungen und Milestones.
- **Coder**: Git-Workspace-Manager (diff apply, formatting, tests), Templates für häufige Stacks, Guardrails gegen destructive edits.
- **Reviewer**: Policy-Checks (Ports, Secrets, Lint), Vulnerability-Scan (npm audit/trivy optional).
- **DeployAgent**: CI/CD Pipelines (GitHub Actions), Docker provenance, SBOM-Erzeugung.

## 4. Flowise & SIMStudio
- **Flow Persistence**: Sicherstellen, dass flowise2-pgsql Datenbankzugriffe mit least-privilege erfolgen.
- **Embed**: Chat Widget mit Token-geschützten Sessions, thematisches Styling für Cyberpunk-UI.
- **SIM Hooks**: Standardisierte SIMStudio-Routen, Versionierung von Szenarien, Artefakt-Downloads.

## 5. WebUI
- **Auth-UX**: Session-Handling, Key-Eingabe, Rollen (Operator/Reviewer).
- **Monaco IDE**: Live-Diffs gegen Git, Auto-Save, Inline-AI-Vorschläge via /api/llm.
- **Onboarding Wizard**: Fortschritt in DB speichern, Checklisten persistieren.
- **Observability**: Agent-Run-Status, Streaming-Logs, Metrics-Dashboards.

## 6. Operations
- **Infra**: Hardened Docker Compose mit nicht-privilegierten Usern, Resource-Limits, Network Policies.
- **Backups**: Point-in-Time-Recovery für Postgres, Export/Import der Flowise-Flows.
- **Testing**: E2E-Tests (Playwright), Contract-Tests für RAG/Agent-APIs, Loadtests für Vektor-Suche.
- **Tooling**: Bun-first Toolchain (bun install/run), reproduzierbare bun.lock Artefakte, Container-Builds auf oven/bun Basis.

## 7. Documentation
- **Runbooks**: Incident-Response, Rotation von API Keys, Upgrade-Guides für LMStudio/LlamaEdge/Ollama.
- **Examples**: Referenz-Workflows für Self-Forging, Muster-RAG-Pipeline, Beispiel-SIM-Szenario.

Diese Schritte sichern, dass keine Features verloren gehen und Git/Deploy-Pipelines auf einem sauberen, reproduzierbaren Stand bleiben.
