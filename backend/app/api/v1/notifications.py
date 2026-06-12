"""Notification endpoints."""

from fastapi import APIRouter

router = APIRouter()


@router.get("")
async def list_notifications() -> dict[str, str]:
    """List notifications."""
    # TODO: Implement
    return {"message": "Not implemented"}


@router.patch("/{notification_id}/read")
async def mark_notification_read(notification_id: str) -> dict[str, str]:
    """Mark notification as read."""
    # TODO: Implement
    return {"message": "Not implemented", "notification_id": notification_id}


@router.patch("/read-all")
async def mark_all_notifications_read() -> dict[str, str]:
    """Mark all notifications as read."""
    # TODO: Implement
    return {"message": "Not implemented"}
