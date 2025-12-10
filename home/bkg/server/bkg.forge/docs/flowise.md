# Flowise Integration

- `flowise/docker-compose.yml` startet Flowise auf Host-Port 8610.
- `FlowiseClient` proxyed Chat (`/api/v1/chat/:flowId`) und Flow-Execution (`/api/v1/flows/:id/run`).
- WebUI lädt FlowiseChatEmbed im `Flowise`-Page und erlaubt Watermark-freie Nutzung.
- Standard-Flow liegt unter `flowise/flows/default.json`.
