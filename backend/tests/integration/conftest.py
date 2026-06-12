import pytest
from httpx import AsyncClient, ASGITransport
import uuid
from datetime import datetime, timezone, timedelta

from app.main import app
from app.dependencies import get_db_session
from app.models.user import User
from app.models.auth import RefreshToken
from app.models.item import Item
from app.core.security import hash_password, create_access_token


class MockResult:
    def __init__(self, data=None):
        self.data = data

    def scalar_one_or_none(self):
        return self.data
        
    def scalars(self):
        class MockScalars:
            def __init__(self, items):
                self.items = items
            def all(self):
                return self.items
        if isinstance(self.data, list):
            return MockScalars(self.data)
        if self.data is None:
            return MockScalars([])
        return MockScalars([self.data])


class MockSession:
    def __init__(self):
        self.users = {}
        self.refresh_tokens = {}
        self.items = {}

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
            
        if "from items" in stmt_str:
            # Very basic mock filtering
            results = [item for item in self.items.values() if getattr(item, "deleted_at", None) is None]
            if "items.id =" in stmt_str:
                for item in results:
                    return MockResult(item) # Just return first for mock
                return MockResult(None)
            return MockResult(results)

            
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
        elif isinstance(obj, Item):
            if not getattr(obj, "id", None):
                obj.id = uuid.uuid4()
            if not getattr(obj, "created_at", None):
                obj.created_at = datetime.now(timezone.utc)
            if not getattr(obj, "updated_at", None):
                obj.updated_at = datetime.now(timezone.utc)
            if not getattr(obj, "status", None):
                obj.status = "pending"
            if getattr(obj, "matches_count", None) is None:
                obj.matches_count = 0
            self.items[obj.id] = obj

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

@pytest.fixture
def test_user():
    user = User(
        id=uuid.uuid4(),
        email="test@example.com",
        password_hash=hash_password("password123"),
        full_name="Test User",
        is_active=True,
        role="user"
    )
    return user

@pytest.fixture
def access_token(test_user):
    return create_access_token(subject=str(test_user.id))

@pytest.fixture
def populated_mock_db(mock_db, test_user):
    mock_db.add(test_user)
    return mock_db

