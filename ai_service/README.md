<![CDATA[# AI Service — Matching Microservice

## Responsibility

The AI service is a standalone microservice that handles all machine learning operations:

- **Image Embeddings**: Generate CLIP embeddings from uploaded item images
- **Text Embeddings**: Generate Sentence-Transformer embeddings from item descriptions
- **FAISS Indexing**: Maintain in-memory vector indexes for fast approximate nearest neighbor search
- **Similarity Search**: Find candidate matches for a given item across the opposite type (lost ↔ found)
- **Score Computation**: Calculate individual axis scores (image, text, location, time)

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| FastAPI | Async web framework |
| CLIP (`openai/clip-vit-base-patch32`) | Image + cross-modal embeddings (512-dim) |
| Sentence-Transformers (`all-MiniLM-L6-v2`) | Text semantic embeddings (384-dim) |
| FAISS | Approximate nearest neighbor vector search |
| Pillow | Image preprocessing |
| NumPy | Tensor operations |

## Architecture

```
app/
├── api/            → HTTP endpoints (embed, search, health)
├── models/         → ML model wrappers (CLIP, Sentence-Transformers)
├── indexing/       → FAISS index management + persistence
├── services/       → Embedding + similarity business logic
└── utils/          → Image/text preprocessing
```

## Design Decisions

- **Singleton model loading**: Models are loaded once at startup via `@lru_cache`. Never loaded in the request path.
- **L2 normalization**: All embeddings are L2-normalized before storage so inner product = cosine similarity.
- **FAISS IndexFlatIP**: Exact inner product search. Sufficient for < 1M items. Upgrade path to `IndexIVFFlat` or `IndexHNSWFlat` at scale.
- **Dual index**: Separate FAISS indexes for image embeddings (512-dim) and text embeddings (384-dim).
- **Disk persistence**: Indexes serialized to disk on configurable intervals and graceful shutdown. Rebuilt from DB on cold start if files are missing.

## API Contracts

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/embed/image` | Image file → 512-dim CLIP embedding |
| `POST` | `/embed/text` | Text string → 384-dim text embedding + 512-dim CLIP text embedding |
| `POST` | `/index/add` | Add item embeddings to FAISS indexes |
| `POST` | `/index/remove` | Remove item from FAISS indexes |
| `POST` | `/search/similar` | Find top-K similar items from opposite type |
| `POST` | `/search/match-score` | Compute full composite score between two items |
| `GET`  | `/health` | Model status, index sizes, memory usage |

## Development

```bash
# Create virtual environment
python -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -e ".[dev]"

# Run dev server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8001

# Run tests
python -m pytest
```

> **Note**: First startup will download ~600MB of model weights. The `model_cache/` directory persists these across restarts.
]]>
