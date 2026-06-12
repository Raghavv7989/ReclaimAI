"""Pagination utilities."""

import math

from app.schemas.common import PaginationMeta


def create_pagination_meta(
    total: int, page: int, per_page: int
) -> PaginationMeta:
    """Create pagination metadata from query results."""
    return PaginationMeta(
        page=page,
        per_page=per_page,
        total=total,
        total_pages=math.ceil(total / per_page) if per_page > 0 else 0,
    )
