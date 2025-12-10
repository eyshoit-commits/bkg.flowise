# Architektur

Die Plattform besteht aus einem Express/TypeScript Backend mit Prisma und Postgres (pgvector), einem Flowise-Automations-Stack und einer Vite/React-WebUI im Cyberpunk-Look. Die Services kommunizieren ausschließlich über sichere Ports (Backend 8443, DB 7543, Flowise 41800).
