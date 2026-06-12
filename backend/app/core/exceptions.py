"""Custom exception hierarchy for structured error handling."""

from typing import Any


class AppException(Exception):
    """Base exception for all application errors."""

    def __init__(
        self,
        code: str,
        message: str,
        status_code: int = 500,
        field: str | None = None,
        details: dict[str, Any] | None = None,
    ) -> None:
        self.code = code
        self.message = message
        self.status_code = status_code
        self.field = field
        self.details = details
        super().__init__(message)


class ValidationException(AppException):
    """400 — Validation error."""

    def __init__(self, message: str, field: str | None = None, **kwargs: Any) -> None:
        super().__init__(code="VALIDATION_ERROR", message=message, status_code=400, field=field, **kwargs)


class AuthenticationException(AppException):
    """401 — Authentication failure."""

    def __init__(self, message: str = "Invalid credentials", **kwargs: Any) -> None:
        super().__init__(code="AUTH_INVALID_CREDENTIALS", message=message, status_code=401, **kwargs)


class AuthorizationException(AppException):
    """403 — Forbidden."""

    def __init__(self, message: str = "Access denied", **kwargs: Any) -> None:
        super().__init__(code="FORBIDDEN", message=message, status_code=403, **kwargs)


class NotFoundException(AppException):
    """404 — Resource not found."""

    def __init__(self, resource: str = "Resource", **kwargs: Any) -> None:
        super().__init__(
            code=f"{resource.upper()}_NOT_FOUND",
            message=f"{resource} not found",
            status_code=404,
            **kwargs,
        )


class ConflictException(AppException):
    """409 — Conflict."""

    def __init__(self, message: str = "Resource already exists", **kwargs: Any) -> None:
        super().__init__(code="CONFLICT", message=message, status_code=409, **kwargs)


class RateLimitException(AppException):
    """429 — Rate limit exceeded."""

    def __init__(self, message: str = "Rate limit exceeded", **kwargs: Any) -> None:
        super().__init__(code="RATE_LIMIT_EXCEEDED", message=message, status_code=429, **kwargs)


class ExternalServiceException(AppException):
    """503 — External service unavailable."""

    def __init__(self, service: str = "External service", **kwargs: Any) -> None:
        super().__init__(
            code=f"SERVICE_{service.upper()}_UNAVAILABLE",
            message=f"{service} is currently unavailable",
            status_code=503,
            **kwargs,
        )


class AIServiceException(ExternalServiceException):
    """503 — AI Service unavailable."""

    def __init__(self, **kwargs: Any) -> None:
        super().__init__(service="AI", **kwargs)
