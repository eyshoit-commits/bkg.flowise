# Flowise Integration

Flowise wird via Proxy (`FlowiseClient`) angesprochen. docker-compose nutzt Port 41800 mit persistentem Volume. Flows können per `/api/flowise/flows/:id/execute` ausgelöst werden.
