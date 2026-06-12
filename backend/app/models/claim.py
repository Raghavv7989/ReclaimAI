"""Claim model for users claiming items."""

import uuid
from sqlalchemy import String, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base, TimestampMixin, SoftDeleteMixin, UUIDPrimaryKeyMixin


class Claim(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "claims"

    item_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("items.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    
    status: Mapped[str] = mapped_column(String(50), default="pending", nullable=False, index=True)
    proof_text: Mapped[str] = mapped_column(Text, nullable=False)

    # Relationships
    item: Mapped["Item"] = relationship("Item", back_populates="claims")
    user: Mapped["User"] = relationship("User", back_populates="claims")
