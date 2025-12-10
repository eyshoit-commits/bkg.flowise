-- Initial schema for bkg.forge
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- Prisma will manage tables; this migration ensures pgvector is present.
