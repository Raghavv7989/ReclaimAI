import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession
import uuid

pytestmark = pytest.mark.asyncio(loop_scope="session")

async def test_report_lost_item(
    async_client: AsyncClient,
    access_token: str,
    populated_mock_db
):
    response = await async_client.post(
        "/api/v1/items/lost",
        headers={"Authorization": f"Bearer {access_token}"},
        json={
            "type": "lost",
            "title": "Lost Wallet",
            "description": "Black leather wallet",
            "category": "wallet",
            "location_name": "Central Park",
            "date_reported": "2023-10-01",
            "image_urls": []
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Lost Wallet"
    assert data["type"] == "lost"
    assert data["matches_count"] == 0

async def test_report_found_item(
    async_client: AsyncClient,
    access_token: str,
    populated_mock_db
):
    response = await async_client.post(
        "/api/v1/items/found",
        headers={"Authorization": f"Bearer {access_token}"},
        json={
            "type": "found",
            "title": "Found iPhone",
            "description": "Blue iPhone 13 Pro",
            "category": "electronics",
            "location_name": "Subway Station",
            "date_reported": "2023-10-02",
            "image_urls": []
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Found iPhone"
    assert data["type"] == "found"

async def test_list_items(
    async_client: AsyncClient,
    access_token: str,
    populated_mock_db
):
    # Just checking it returns a list and is accessible
    response = await async_client.get(
        "/api/v1/items",
    )
    assert response.status_code == 200
    assert isinstance(response.json(), list)

async def test_update_delete_item(
    async_client: AsyncClient,
    access_token: str,
    populated_mock_db
):
    # 1. Create item
    res = await async_client.post(
        "/api/v1/items/lost",
        headers={"Authorization": f"Bearer {access_token}"},
        json={
            "type": "lost",
            "title": "Update Me",
            "description": "test",
            "category": "other",
            "location_name": "test",
            "date_reported": "2023-10-01",
            "image_urls": []
        }
    )
    item_id = res.json()["id"]

    # 2. Update item
    res_update = await async_client.put(
        f"/api/v1/items/{item_id}",
        headers={"Authorization": f"Bearer {access_token}"},
        json={
            "title": "Updated Title"
        }
    )
    assert res_update.status_code == 200
    assert res_update.json()["title"] == "Updated Title"

    # 3. Delete item
    res_delete = await async_client.delete(
        f"/api/v1/items/{item_id}",
        headers={"Authorization": f"Bearer {access_token}"}
    )
    assert res_delete.status_code == 204

    # 4. Verify it's gone
    res_get = await async_client.get(
        f"/api/v1/items/{item_id}",
    )
    assert res_get.status_code == 404
