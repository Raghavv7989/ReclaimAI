"""User management endpoints."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/me")
async def get_current_user() -> dict[str, str]:
    """Get current user profile."""
    # TODO: Implement
    return {"message": "Not implemented"}


@router.patch("/me")
async def update_current_user() -> dict[str, str]:
    """Update current user profile."""
    # TODO: Implement
    return {"message": "Not implemented"}
