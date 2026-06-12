"""Authentication API endpoints."""

from datetime import datetime, timedelta, timezone
import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import get_settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    verify_password,
)
from app.db.session import get_db_session
from app.dependencies import CurrentUser, DBSessionDep, get_current_user
from app.models.auth import RefreshToken
from app.models.user import User
from app.schemas.auth import (
    MessageResponse,
    RefreshTokenRequest,
    TokenResponse,
    UserCreate,
    UserLogin,
    UserResponse,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    user_in: UserCreate,
    session: DBSessionDep,
):
    """Register a new user."""
    # Check if user exists
    stmt = select(User).where(User.email == user_in.email)
    result = await session.execute(stmt)
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    user = User(
        email=user_in.email,
        password_hash=hash_password(user_in.password),
        full_name=user_in.full_name,
    )
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user


@router.post("/login", response_model=TokenResponse)
async def login(
    user_in: UserLogin,
    session: DBSessionDep,
):
    """Authenticate user and return tokens."""
    stmt = select(User).where(User.email == user_in.email, User.deleted_at.is_(None))
    result = await session.execute(stmt)
    user = result.scalar_one_or_none()

    if not user or not verify_password(user_in.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user",
        )

    # Generate tokens
    access_token = create_access_token(subject=str(user.id))
    refresh_token_str = create_refresh_token()
    
    settings = get_settings()
    expires_at = datetime.now(timezone.utc) + timedelta(days=settings.jwt_refresh_token_expire_days)

    # Persist refresh token
    refresh_token = RefreshToken(
        user_id=user.id,
        token=refresh_token_str,
        expires_at=expires_at,
    )
    session.add(refresh_token)
    await session.commit()

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token_str,
    )


@router.post("/logout", response_model=MessageResponse)
async def logout(
    current_user: CurrentUser,
    session: DBSessionDep,
    token_in: RefreshTokenRequest,
):
    """Logout user by revoking the refresh token."""
    stmt = select(RefreshToken).where(
        RefreshToken.token == token_in.refresh_token,
        RefreshToken.user_id == current_user.id,
        RefreshToken.is_revoked.is_(False)
    )
    result = await session.execute(stmt)
    refresh_token = result.scalar_one_or_none()

    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Refresh token not found or already revoked",
        )

    refresh_token.is_revoked = True
    await session.commit()
    return MessageResponse(message="Successfully logged out")


@router.post("/refresh", response_model=TokenResponse)
async def refresh(
    token_in: RefreshTokenRequest,
    session: DBSessionDep,
):
    """Issue a new access token using a refresh token."""
    stmt = select(RefreshToken).where(
        RefreshToken.token == token_in.refresh_token,
        RefreshToken.is_revoked.is_(False)
    )
    result = await session.execute(stmt)
    refresh_token = result.scalar_one_or_none()

    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    if refresh_token.expires_at < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token expired",
        )

    # Issue new access token
    access_token = create_access_token(subject=str(refresh_token.user_id))

    return TokenResponse(
        access_token=access_token,
        refresh_token=token_in.refresh_token,  # optionally rotate refresh token here
    )


@router.post("/forgot-password", response_model=MessageResponse)
async def forgot_password():
    """Stub for forgot password email generation."""
    # In a real app, verify email and send reset token via celery/email service
    return MessageResponse(message="If the email exists, a reset link will be sent.")


@router.post("/reset-password", response_model=MessageResponse)
async def reset_password():
    """Stub for password reset."""
    return MessageResponse(message="Password successfully reset.")


@router.get("/verify-email", response_model=MessageResponse)
async def verify_email():
    """Stub for email verification."""
    return MessageResponse(message="Email successfully verified.")
