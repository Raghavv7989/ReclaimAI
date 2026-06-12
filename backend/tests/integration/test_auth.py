"""Integration tests for authentication flows."""

import pytest
from httpx import AsyncClient, ASGITransport
import uuid
from datetime import datetime, timezone, timedelta

from app.main import app
from app.dependencies import get_db_session
from app.models.user import User
from app.models.auth import RefreshToken
from app.core.security import hash_password, create_access_token
from tests.integration.conftest import MockSession



@pytest.mark.asyncio
async def test_user_registration(async_client: AsyncClient, mock_db: MockSession):
    response = await async_client.post(
        "/api/v1/auth/register",
        json={
            "email": "test@example.com",
            "password": "securepassword123",
            "full_name": "Test User"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "test@example.com"
    assert data["full_name"] == "Test User"
    assert "id" in data


@pytest.mark.asyncio
async def test_user_login_success(async_client: AsyncClient, mock_db: MockSession):
    # Pre-populate user
    user = User(
        id=uuid.uuid4(),
        email="login@example.com",
        password_hash=hash_password("password123"),
        full_name="Login User",
        is_active=True
    )
    mock_db.add(user)

    response = await async_client.post(
        "/api/v1/auth/login",
        json={
            "email": "login@example.com",
            "password": "password123"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


@pytest.mark.asyncio
async def test_refresh_token(async_client: AsyncClient, mock_db: MockSession):
    # Pre-populate refresh token
    user_id = uuid.uuid4()
    rt = RefreshToken(
        id=uuid.uuid4(),
        user_id=user_id,
        token="valid-refresh-token",
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
        is_revoked=False
    )
    mock_db.add(rt)

    response = await async_client.post(
        "/api/v1/auth/refresh",
        cookies={"refresh_token": "valid-refresh-token"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data


@pytest.mark.asyncio
async def test_logout(async_client: AsyncClient, mock_db: MockSession):
    user_id = uuid.uuid4()
    user = User(
        id=user_id,
        email="logout@example.com",
        password_hash=hash_password("password123"),
        full_name="Logout User",
        is_active=True
    )
    rt = RefreshToken(
        id=uuid.uuid4(),
        user_id=user_id,
        token="logout-refresh-token",
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
        is_revoked=False
    )
    mock_db.add(user)
    mock_db.add(rt)

    access_token = create_access_token(subject=str(user_id))

    response = await async_client.post(
        "/api/v1/auth/logout",
        headers={"Authorization": f"Bearer {access_token}"},
        cookies={"refresh_token": "logout-refresh-token"}
    )
    assert response.status_code == 200
    assert rt.is_revoked is True
