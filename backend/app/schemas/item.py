from datetime import date, datetime
from typing import List, Optional
import uuid

from pydantic import BaseModel, Field


class ItemBase(BaseModel):
    title: str = Field(..., max_length=255)
    description: str
    location_name: str = Field(..., max_length=255)
    category: str = Field("other", max_length=100)
    date_reported: date
    image_urls: List[str] = Field(default_factory=list)


class ItemCreate(ItemBase):
    type: str = Field(..., max_length=50)  # "lost" or "found"


class ItemUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None
    location_name: Optional[str] = Field(None, max_length=255)
    category: Optional[str] = Field(None, max_length=100)
    date_reported: Optional[date] = None
    status: Optional[str] = Field(None, max_length=50)
    image_urls: Optional[List[str]] = None


class ItemResponse(ItemBase):
    id: uuid.UUID
    user_id: uuid.UUID
    type: str
    status: str
    created_at: datetime
    updated_at: datetime
    matches_count: int = 0

    model_config = {
        "from_attributes": True,
    }
