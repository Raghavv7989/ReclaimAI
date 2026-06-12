<![CDATA[# Backend — FastAPI REST API Server

## Responsibility

The backend is the central REST API for ReclaimAI. It handles:

- **Authentication**: JWT-based auth with access/refresh token rotation
- **User Management**: Profile CRUD, avatar upload, account deletion
- **Item Management**: Lost/found item CRUD, status transitions, image uploads
- **Match Orchestration**: Triggers AI service, computes composite scores, stores matches
- **Messaging**: Conversation and message management between matched users
- **Notifications**: Event-driven notification creation and delivery

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| FastAPI | Async web framework |
| SQLAlchemy 2.0 | Async ORM (with `asyncpg` driver) |
| Alembic | Database migrations |
| Pydantic v2 | Request/response validation, settings |
| python-jose | JWT encoding/decoding |
| bcrypt / passlib | Password hashing |
| structlog | Structured JSON logging |
| Ruff | Linting + formatting |
| pytest | Testing framework |

## Architecture (Layered)

```
app/
├── api/            → Route handlers (thin controllers)
│   └── v1/         → Versioned API endpoints
├── core/           → Security, middleware, exceptions, logging
├── models/         → SQLAlchemy ORM models
├── schemas/        → Pydantic request/response schemas
├── services/       → Business logic layer
├── repositories/   → Data access layer (DB queries)
├── tasks/          → Background task workers
└── utils/          → Shared utilities
```

### Layer Rules

| Layer | Can call | Cannot call |
|-------|----------|-------------|
| Router (api/) | Service | Repository, Model directly |
| Service | Repository, other Services, AI Client | Router |
| Repository | Model, Database session | Service, Router |

## API Versioning

All endpoints are prefixed with `/api/v1/`. When breaking changes are needed, a `/api/v2/` version is created while maintaining backward compatibility.

## Development

```bash
# Create virtual environment
python -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -e ".[dev]"

# Run dev server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Run migrations
alembic upgrade head

# Lint
ruff check . && ruff format --check .

# Test
python -m pytest

# Type check
python -m mypy app/
```
]]>
