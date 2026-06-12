from typing import List, Optional
import uuid

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db_session
from app.dependencies import CurrentUser, DBSessionDep
from app.models.item import Item
from app.schemas.item import ItemCreate, ItemResponse, ItemUpdate

router = APIRouter(tags=["items"])


@router.post("/lost", response_model=ItemResponse, status_code=status.HTTP_201_CREATED)
async def report_lost_item(
    item_in: ItemCreate,
    current_user: CurrentUser,
    session: DBSessionDep,
):
    """Report a lost item."""
    if item_in.type != "lost":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Item type must be 'lost'",
        )

    item = Item(
        user_id=current_user.id,
        type=item_in.type,
        title=item_in.title,
        description=item_in.description,
        location_name=item_in.location_name,
        category=item_in.category,
        date_reported=item_in.date_reported,
        image_urls=item_in.image_urls,
    )
    session.add(item)
    await session.commit()
    await session.refresh(item)
    
    # We serialize the response with 0 matches for now
    # SQLAlchemy mapped models don't have matches_count by default,
    # but Pydantic's from_attributes allows default values.
    return item


@router.post("/found", response_model=ItemResponse, status_code=status.HTTP_201_CREATED)
async def report_found_item(
    item_in: ItemCreate,
    current_user: CurrentUser,
    session: DBSessionDep,
):
    """Report a found item."""
    if item_in.type != "found":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Item type must be 'found'",
        )

    item = Item(
        user_id=current_user.id,
        type=item_in.type,
        title=item_in.title,
        description=item_in.description,
        location_name=item_in.location_name,
        category=item_in.category,
        date_reported=item_in.date_reported,
        image_urls=item_in.image_urls,
    )
    session.add(item)
    await session.commit()
    await session.refresh(item)
    return item


@router.get("", response_model=List[ItemResponse])
async def list_items(
    session: DBSessionDep,
    type: Optional[str] = Query(None, description="Filter by item type (lost/found)"),
    status: Optional[str] = Query(None, description="Filter by status"),
    user_id: Optional[uuid.UUID] = Query(None, description="Filter by user ID"),
    skip: int = 0,
    limit: int = 100,
):
    """List items with optional filtering."""
    stmt = select(Item).where(Item.deleted_at.is_(None))

    if type:
        stmt = stmt.where(Item.type == type)
    if status:
        stmt = stmt.where(Item.status == status)
    if user_id:
        stmt = stmt.where(Item.user_id == user_id)

    stmt = stmt.offset(skip).limit(limit).order_by(Item.created_at.desc())
    result = await session.execute(stmt)
    items = result.scalars().all()
    return items


@router.get("/{item_id}", response_model=ItemResponse)
async def get_item(
    item_id: uuid.UUID,
    session: DBSessionDep,
):
    """Get a specific item by ID."""
    stmt = select(Item).where(Item.id == item_id, Item.deleted_at.is_(None))
    result = await session.execute(stmt)
    item = result.scalar_one_or_none()

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found",
        )
    return item


@router.put("/{item_id}", response_model=ItemResponse)
async def update_item(
    item_id: uuid.UUID,
    item_in: ItemUpdate,
    current_user: CurrentUser,
    session: DBSessionDep,
):
    """Update a specific item."""
    stmt = select(Item).where(Item.id == item_id, Item.deleted_at.is_(None))
    result = await session.execute(stmt)
    item = result.scalar_one_or_none()

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found",
        )

    if item.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this item",
        )

    update_data = item_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item, field, value)

    await session.commit()
    await session.refresh(item)
    return item


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(
    item_id: uuid.UUID,
    current_user: CurrentUser,
    session: DBSessionDep,
):
    """Delete a specific item (soft delete)."""
    stmt = select(Item).where(Item.id == item_id, Item.deleted_at.is_(None))
    result = await session.execute(stmt)
    item = result.scalar_one_or_none()

    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item not found",
        )

    if item.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this item",
        )

    from datetime import datetime, timezone
    item.deleted_at = datetime.now(timezone.utc)
    
    await session.commit()
    return None
