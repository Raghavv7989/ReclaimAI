"""FastAPI dependency injection providers."""

from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.config import Settings, get_settings
from app.core.security import decode_access_token

security_scheme = HTTPBearer(auto_error=False)

SettingsDep = Annotated[Settings, Depends(get_settings)]


async def get_current_user_id(
    credentials: Annotated[
        HTTPAuthorizationCredentials | None, Depends(security_scheme)
    ],
) -> str:
    """Extract and validate the current user ID from the JWT token."""
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        payload = decode_access_token(credentials.credentials)
        user_id = payload.get("sub")
        if user_id is None or not isinstance(user_id, str):
            raise ValueError("Invalid subject")
        return user_id
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )


CurrentUserId = Annotated[str, Depends(get_current_user_id)]
