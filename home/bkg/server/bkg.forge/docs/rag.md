# RAG-Pipeline

Die RAG-Implementierung nutzt chunking (Text, Markdown, Code), Embeddings über lokale LLM-Provider und pgvector für Ähnlichkeitssuche.

## Indexierung
- `chunker.ts` erzeugt überlappende Segmente (1200 Zeichen, 120 Overlap).
- `embedText` ruft LMStudio/LlamaEdge/Ollama Embeddings ab.
- `saveEmbedding` persistiert Chunk, Embedding und Metadaten in Postgres.

## Retrieval
- `retrieveContext` embedded die Query und führt eine pgvector-Suche aus.
- Ergebnisse werden in `RagQuery` mit Score und Document-Referenz gespeichert.

## Auto-Index
- `Indexer` erlaubt rekursives Scannen eines Wurzelverzeichnisses und legt eine Meta-Datei pro Quelle ab.
