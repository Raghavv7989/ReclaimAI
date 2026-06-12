"""AI Service configuration."""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """AI Service settings."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # Model configuration
    clip_model_name: str = "ViT-B-32"
    clip_pretrained: str = "openai"
    sentence_model_name: str = "all-MiniLM-L6-v2"

    # Storage
    model_cache_dir: str = "./model_cache"
    index_dir: str = "./indexes"

    # FAISS
    faiss_index_type: str = "IVFFlat"

    # Logging
    log_level: str = "INFO"

    # App
    app_name: str = "ReclaimAI AI Service"
    debug: bool = False


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
