"""Authentication Pydantic schemas."""

from pydantic import BaseModel, EmailStr, Field, ConfigDict
import uuid


class UserCreate(BaseModel):
    """Schema for user registration."""
    email: EmailStr
    password: str = Field(..., min_length=8, description="Must be at least 8 characters.")
    full_name: str = Field(..., min_length=1)


class UserLogin(BaseModel):
    """Schema for user login."""
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    """Schema for token issuance response."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    """Schema for user response data."""
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    email: EmailStr
    full_name: str
    role: str
    is_active: bool
    is_verified: bool


class RefreshTokenRequest(BaseModel):
    """Schema for requesting a new access token."""
    refresh_token: str


class MessageResponse(BaseModel):
    """Generic message response."""
    message: str
