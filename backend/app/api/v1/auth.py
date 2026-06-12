"""Authentication endpoints."""

from fastapi import APIRouter

router = APIRouter()


@router.post("/register")
async def register() -> dict[str, str]:
    """Create a new user account."""
    # TODO: Implement registration
    return {"message": "Not implemented"}


@router.post("/login")
async def login() -> dict[str, str]:
    """Authenticate and obtain tokens."""
    # TODO: Implement login
    return {"message": "Not implemented"}


@router.post("/refresh")
async def refresh_token() -> dict[str, str]:
    """Refresh access token."""
    # TODO: Implement token refresh
    return {"message": "Not implemented"}


@router.post("/logout")
async def logout() -> dict[str, str]:
    """Revoke refresh token."""
    # TODO: Implement logout
    return {"message": "Not implemented"}


@router.post("/forgot-password")
async def forgot_password() -> dict[str, str]:
    """Send password reset email."""
    # TODO: Implement forgot password
    return {"message": "Not implemented"}


@router.post("/reset-password")
async def reset_password() -> dict[str, str]:
    """Reset password with token."""
    # TODO: Implement reset password
    return {"message": "Not implemented"}
