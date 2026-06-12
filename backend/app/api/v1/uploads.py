"""File upload endpoints."""

from fastapi import APIRouter

router = APIRouter()


@router.post("/images")
async def upload_images() -> dict[str, str]:
    """Upload images."""
    # TODO: Implement
    return {"message": "Not implemented"}


@router.delete("/images/{image_id}")
async def delete_image(image_id: str) -> dict[str, str]:
    """Delete an uploaded image."""
    # TODO: Implement
    return {"message": "Not implemented", "image_id": image_id}
