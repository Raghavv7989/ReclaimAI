"""AI Service health endpoints."""

from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check() -> dict[str, str]:
    """Basic health check."""
    return {"status": "healthy", "service": "reclaim-ai-service"}


@router.get("/health/models")
async def model_health() -> dict[str, object]:
    """Check loaded model status."""
    # TODO: Return actual model load status
    return {
        "clip_loaded": False,
        "sentence_transformer_loaded": False,
        "faiss_index_loaded": False,
    }
