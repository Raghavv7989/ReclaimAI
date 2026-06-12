"""add_category_to_item

Revision ID: e111f25f6b8f
Revises: 0001_initial_schema
Create Date: 2026-06-12 16:14:22.446235
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e111f25f6b8f'
down_revision: Union[str, None] = '0001_initial_schema'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('items', sa.Column('category', sa.String(length=100), server_default='other', nullable=False))
    op.create_index(op.f('ix_items_category'), 'items', ['category'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_items_category'), table_name='items')
    op.drop_column('items', 'category')
