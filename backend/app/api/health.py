"""Health check endpoints."""

from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check() -> dict[str, str]:
    """Basic health check."""
    return {"status": "healthy", "service": "reclaim-ai-backend"}


@router.get("/health/ready")
async def readiness_check() -> dict[str, str]:
    """Readiness probe — checks database and AI service connectivity."""
    # TODO: Check database connectivity
    # TODO: Check AI service connectivity
    return {"status": "ready"}
