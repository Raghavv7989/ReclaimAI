"""Application configuration using Pydantic Settings."""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # Database
    database_url: str = "postgresql+asyncpg://reclaim:reclaim@localhost:5432/reclaim"

    # JWT
    jwt_secret_key: str = "dev-secret-key-change-me"
    jwt_access_token_expire_minutes: int = 15
    jwt_refresh_token_expire_days: int = 7
    jwt_algorithm: str = "HS256"

    # AI Service
    ai_service_url: str = "http://localhost:8001"
    ai_service_api_key: str = "dev-ai-service-key"

    # File Upload
    upload_dir: str = "./uploads"
    max_upload_size_mb: int = 10

    # CORS
    cors_origins: str = "http://localhost:3000"

    # Logging
    log_level: str = "INFO"

    # App
    app_name: str = "ReclaimAI"
    debug: bool = False

    @property
    def cors_origin_list(self) -> list[str]:
        """Parse CORS origins from comma-separated string."""
        return [origin.strip() for origin in self.cors_origins.split(",")]


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
