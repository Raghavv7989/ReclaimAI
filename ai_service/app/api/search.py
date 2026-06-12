"""Vector similarity search endpoints."""

from fastapi import APIRouter

router = APIRouter()


@router.post("/search/similar")
async def search_similar() -> dict[str, str]:
    """Find similar items by embedding vector."""
    # TODO: Implement
    return {"message": "Not implemented"}


@router.post("/match/compute")
async def compute_match_score() -> dict[str, str]:
    """Compute composite match score between two items."""
    # TODO: Implement
    return {"message": "Not implemented"}
