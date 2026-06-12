"""Embedding generation endpoints."""

from fastapi import APIRouter

router = APIRouter()


@router.post("/embed/image")
async def embed_image() -> dict[str, str]:
    """Generate CLIP embedding for an image."""
    # TODO: Implement
    return {"message": "Not implemented"}


@router.post("/embed/text")
async def embed_text() -> dict[str, str]:
    """Generate sentence embedding for text."""
    # TODO: Implement
    return {"message": "Not implemented"}


@router.post("/embed/batch")
async def embed_batch() -> dict[str, str]:
    """Generate embeddings for a batch of items."""
    # TODO: Implement
    return {"message": "Not implemented"}
