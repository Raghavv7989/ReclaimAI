"""Aggregate router for API v1."""

from fastapi import APIRouter

from app.api.v1 import auth, items, matches, messages, notifications, uploads, users

router = APIRouter()

router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(users.router, prefix="/users", tags=["users"])
router.include_router(items.router, prefix="/items", tags=["items"])
router.include_router(matches.router, prefix="/matches", tags=["matches"])
router.include_router(messages.router, prefix="/messages", tags=["messages"])
router.include_router(
    notifications.router, prefix="/notifications", tags=["notifications"]
)
router.include_router(uploads.router, prefix="/uploads", tags=["uploads"])
