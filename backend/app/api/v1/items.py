"""Item management endpoints."""

from fastapi import APIRouter

router = APIRouter()


@router.post("")
async def create_item() -> dict[str, str]:
    """Create a lost or found item report."""
    # TODO: Implement
    return {"message": "Not implemented"}


@router.get("")
async def list_items() -> dict[str, str]:
    """List current user's items."""
    # TODO: Implement
    return {"message": "Not implemented"}


@router.get("/{item_id}")
async def get_item(item_id: str) -> dict[str, str]:
    """Get item detail."""
    # TODO: Implement
    return {"message": "Not implemented", "item_id": item_id}


@router.patch("/{item_id}")
async def update_item(item_id: str) -> dict[str, str]:
    """Update an item."""
    # TODO: Implement
    return {"message": "Not implemented", "item_id": item_id}


@router.delete("/{item_id}")
async def delete_item(item_id: str) -> dict[str, str]:
    """Soft-delete an item."""
    # TODO: Implement
    return {"message": "Not implemented", "item_id": item_id}


@router.get("/explore")
async def explore_items() -> dict[str, str]:
    """Public paginated feed of found items."""
    # TODO: Implement
    return {"message": "Not implemented"}
