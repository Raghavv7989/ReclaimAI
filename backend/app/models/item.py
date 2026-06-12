"""Item model for lost and found items."""

import uuid
from typing import Optional
from datetime import date
from sqlalchemy import String, Enum, Text, Date, ForeignKey, Float
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship
from geoalchemy2 import Geometry

from .base import Base, TimestampMixin, SoftDeleteMixin, UUIDPrimaryKeyMixin


class Item(Base, UUIDPrimaryKeyMixin, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "items"

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    type: Mapped[str] = mapped_column(String(50), nullable=False, index=True)  # 'lost' or 'found'
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    
    # Store just the text representation of location for simple queries
    location_name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(100), default="other", nullable=False, index=True)
    # Store PostGIS geometry point for radius queries
    location: Mapped[Optional[str]] = mapped_column(
        Geometry('POINT', srid=4326, spatial_index=True), 
        nullable=True
    )
    
    date_reported: Mapped[date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(String(50), default="pending", nullable=False, index=True)
    image_urls: Mapped[list[str]] = mapped_column(ARRAY(String), default=list, nullable=False)

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="items")
    # Matches where this item is the lost item
    lost_matches: Mapped[list["Match"]] = relationship(
        "Match", foreign_keys="Match.lost_item_id", back_populates="lost_item", cascade="all, delete-orphan"
    )
    # Matches where this item is the found item
    found_matches: Mapped[list["Match"]] = relationship(
        "Match", foreign_keys="Match.found_item_id", back_populates="found_item", cascade="all, delete-orphan"
    )
    claims: Mapped[list["Claim"]] = relationship("Claim", back_populates="item", cascade="all, delete-orphan")
