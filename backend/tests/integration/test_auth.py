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


class MockResult:
    def __init__(self, data=None):
        self.data = data

    def scalar_one_or_none(self):
        return self.data


class MockSession:
    def __init__(self):
        self.users = {}
        self.refresh_tokens = {}

    async def execute(self, stmt):
        stmt_str = str(stmt).lower()
        
        if "from users" in stmt_str:
            for user in self.users.values():
                return MockResult(user)
            return MockResult(None)
            
        if "from refresh_tokens" in stmt_str:
            for rt in self.refresh_tokens.values():
                return MockResult(rt)
            return MockResult(None)

            
        return MockResult(None)

    def add(self, obj):
        if isinstance(obj, User):
            if not getattr(obj, "id", None):
                obj.id = uuid.uuid4()
            if getattr(obj, "role", None) is None:
                obj.role = "user"
            if getattr(obj, "is_active", None) is None:
                obj.is_active = True
            if getattr(obj, "is_verified", None) is None:
                obj.is_verified = False
            self.users[obj.id] = obj
        elif isinstance(obj, RefreshToken):
            if not getattr(obj, "id", None):
                obj.id = uuid.uuid4()
            self.refresh_tokens[obj.id] = obj

    async def commit(self):
        pass

    async def refresh(self, obj):
        pass



@pytest.fixture
def mock_db():
    session = MockSession()
    app.dependency_overrides[get_db_session] = lambda: session
    yield session
    app.dependency_overrides.clear()


@pytest.fixture
async def async_client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        yield client


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
        json={"refresh_token": "valid-refresh-token"}
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
        json={"refresh_token": "logout-refresh-token"}
    )
    assert response.status_code == 200
    assert rt.is_revoked is True
