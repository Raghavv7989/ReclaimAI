"""Match model representing AI generated potential matches between items."""

import uuid
from typing import Optional
from sqlalchemy import String, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base, TimestampMixin, SoftDeleteMixin, UUIDPrimaryKeyMixin


class Match(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "matches"

    lost_item_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("items.id", ondelete="CASCADE"), nullable=False, index=True)
    found_item_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("items.id", ondelete="CASCADE"), nullable=False, index=True)
    
    # Overall confidence score
    confidence_score: Mapped[float] = mapped_column(Float, nullable=False)
    
    # Detailed AI scores
    visual_score: Mapped[float] = mapped_column(Float, nullable=False)
    semantic_score: Mapped[float] = mapped_column(Float, nullable=False)
    location_score: Mapped[float] = mapped_column(Float, nullable=False)
    time_score: Mapped[float] = mapped_column(Float, nullable=False)
    
    status: Mapped[str] = mapped_column(String(50), default="pending", nullable=False, index=True)

    # Relationships
    lost_item: Mapped["Item"] = relationship("Item", foreign_keys=[lost_item_id], back_populates="lost_matches")
    found_item: Mapped["Item"] = relationship("Item", foreign_keys=[found_item_id], back_populates="found_matches")
