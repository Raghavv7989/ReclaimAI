"""Match management endpoints."""

from fastapi import APIRouter

router = APIRouter()


@router.get("")
async def list_matches() -> dict[str, str]:
    """List match suggestions for user's items."""
    # TODO: Implement
    return {"message": "Not implemented"}


@router.get("/{match_id}")
async def get_match(match_id: str) -> dict[str, str]:
    """Get match detail with score breakdown."""
    # TODO: Implement
    return {"message": "Not implemented", "match_id": match_id}


@router.post("/{match_id}/accept")
async def accept_match(match_id: str) -> dict[str, str]:
    """Accept a match."""
    # TODO: Implement
    return {"message": "Not implemented", "match_id": match_id}


@router.post("/{match_id}/reject")
async def reject_match(match_id: str) -> dict[str, str]:
    """Reject a match."""
    # TODO: Implement
    return {"message": "Not implemented", "match_id": match_id}
