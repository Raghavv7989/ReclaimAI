<![CDATA[# ReclaimAI

> AI-Powered Lost Item Recovery Network

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Overview

ReclaimAI helps users recover lost belongings using a multi-axis AI matching engine that combines:

- **Image Similarity** — CLIP embeddings with cosine similarity
- **Text Similarity** — Sentence-Transformer semantic matching
- **Location Proximity** — Haversine distance via PostGIS
- **Time Proximity** — Temporal decay scoring

Users report lost or found items. The platform automatically matches them and surfaces the most probable recoveries.

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend   │────▶│   Backend   │────▶│ AI Service  │
│  Next.js 15  │     │   FastAPI   │     │ CLIP/FAISS  │
│  Port 3000   │     │  Port 8000  │     │  Port 8001  │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                    ┌──────▼──────┐
                    │ PostgreSQL  │
                    │  + PostGIS  │
                    │  Port 5432  │
                    └─────────────┘
```

## Repository Structure

```
reclaim-ai/
├── frontend/       → Next.js 15 client application
├── backend/        → FastAPI REST API server
├── ai_service/     → AI matching microservice (CLIP, FAISS)
├── scripts/        → Dev/ops utility scripts
├── Makefile        → Dev convenience commands
└── docker-compose.yml
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, TanStack Query, Zustand |
| Backend | FastAPI, SQLAlchemy (async), Alembic, Pydantic, JWT |
| AI Service | CLIP, Sentence-Transformers, FAISS |
| Database | PostgreSQL 16 + PostGIS |
| Infrastructure | Docker, Docker Compose |

## Quick Start

### Prerequisites

- Docker & Docker Compose v2
- Node.js 20+ (for local frontend dev)
- Python 3.12+ (for local backend/AI dev)

### Start All Services

```bash
# Copy environment files
cp .env.example .env
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
cp ai_service/.env.example ai_service/.env

# Start all services
make up

# Or with Docker Compose directly
docker compose up --build
```

### Access Points

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |
| AI Service | http://localhost:8001 |
| AI Service Docs | http://localhost:8001/docs |

### Individual Service Development

```bash
# Frontend (local dev)
make frontend-dev

# Backend (local dev)
make backend-dev

# AI Service (local dev)
make ai-dev
```

## Development

### Branch Strategy

- `main` — production-ready code
- `develop` — integration branch
- `feature/*` — new features
- `fix/*` — bug fixes
- `chore/*` — maintenance tasks

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add image upload to item form
fix: resolve match score calculation overflow
docs: update API specification
refactor: extract auth middleware
test: add unit tests for scoring algorithm
chore: update dependencies
```

### Code Quality

```bash
# Run all linters
make lint

# Run all tests
make test

# Run type checks
make typecheck
```

## API Documentation

The backend automatically generates OpenAPI documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Contributing

1. Create a feature branch from `develop`
2. Make changes following the coding standards
3. Ensure all tests pass: `make test`
4. Ensure linting passes: `make lint`
5. Submit a pull request

## License

MIT — see [LICENSE](LICENSE) for details.
]]>
