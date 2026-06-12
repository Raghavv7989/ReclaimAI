"""Shared test fixtures."""

import pytest


@pytest.fixture
def app_settings() -> dict[str, str]:
    """Test settings override."""
    return {
        "DATABASE_URL": "sqlite+aiosqlite:///./test.db",
        "JWT_SECRET_KEY": "test-secret-key",
        "LOG_LEVEL": "DEBUG",
    }
