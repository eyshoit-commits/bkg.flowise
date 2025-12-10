# RAG-Pipeline

- **Chunker**: Unterstützt Markdown, Code und Plaintext mit dynamischer Länge.
- **Embedding**: LMStudio-Embeddings über `/v1/embeddings` API.
- **Speicher**: Prisma-Modelle `RagDocument` und `EmbeddingMetadata` speichern Vektoren.
- **Suche**: pgvector `cosine` via `<=>` Operator.
- **Retriever**: `retrieveContext` liefert Top-N-Kontext für Agenten.
- **Indexer**: `indexDirectory` liest rekursiv und persistiert Embeddings.
