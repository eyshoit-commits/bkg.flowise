# Flowise-Integration

- Flowise läuft via `flowise/docker-compose.yml` mit Postgres (pgvector) Persistenz.
- `FlowiseClient` proxyt Flow-Liste, Ausführung und Chat.
- WebUI bindet Flowise-Embed per CDN und nutzt branding-freie Variante.
- Env: `BKG_FORGE_FLOWISE_URL` standardmäßig `http://localhost:8743`.
