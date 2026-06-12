"""Messaging endpoints."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/conversations")
async def list_conversations() -> dict[str, str]:
    """List conversations."""
    # TODO: Implement
    return {"message": "Not implemented"}


@router.get("/conversations/{conversation_id}")
async def get_conversation(conversation_id: str) -> dict[str, str]:
    """Get messages in conversation."""
    # TODO: Implement
    return {"message": "Not implemented", "conversation_id": conversation_id}


@router.post("/conversations/{conversation_id}")
async def send_message(conversation_id: str) -> dict[str, str]:
    """Send a message."""
    # TODO: Implement
    return {"message": "Not implemented", "conversation_id": conversation_id}
