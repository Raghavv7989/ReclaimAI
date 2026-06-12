"""AI Service FastAPI application."""

from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

from fastapi import FastAPI

from app.api.health import router as health_router
from app.api.embeddings import router as embeddings_router
from app.api.search import router as search_router
from app.config import get_settings


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Load ML models on startup, cleanup on shutdown."""
    # TODO: Load CLIP model
    # TODO: Load Sentence-Transformer model
    # TODO: Load FAISS indexes
    yield
    # TODO: Cleanup GPU memory


def create_app() -> FastAPI:
    """Create AI service application."""
    settings = get_settings()

    app = FastAPI(
        title=settings.app_name,
        description="AI/ML inference and vector search service for ReclaimAI",
        version="0.1.0",
        docs_url="/docs",
        lifespan=lifespan,
    )

    app.include_router(health_router)
    app.include_router(embeddings_router, prefix="/api/v1", tags=["embeddings"])
    app.include_router(search_router, prefix="/api/v1", tags=["search"])

    return app


app = create_app()
