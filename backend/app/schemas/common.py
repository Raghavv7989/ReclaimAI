"""Common schemas used across the API."""

from typing import Any, Generic, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class PaginationMeta(BaseModel):
    """Pagination metadata."""

    page: int
    per_page: int
    total: int
    total_pages: int


class ErrorDetail(BaseModel):
    """Structured error detail."""

    code: str
    message: str
    field: str | None = None
    details: dict[str, Any] | None = None


class ApiResponse(BaseModel, Generic[T]):
    """Standard API response wrapper."""

    data: T | None = None
    meta: PaginationMeta | None = None
    errors: list[ErrorDetail] | None = None
