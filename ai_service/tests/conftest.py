"""AI Service test fixtures."""

import pytest


@pytest.fixture
def ai_settings() -> dict[str, str]:
    """Test settings override."""
    return {
        "MODEL_CACHE_DIR": "/tmp/test_models",
        "INDEX_DIR": "/tmp/test_indexes",
        "LOG_LEVEL": "DEBUG",
    }
