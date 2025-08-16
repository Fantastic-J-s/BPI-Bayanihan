from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    barangay_id: Optional[int] = None  # NEW: assign barangay on signup


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class BarangayOut(BaseModel):
    id: int
    name: str
    mission: Optional[str] = None
    vision: Optional[str] = None

    model_config = {"from_attributes": True}


class UserOut(BaseModel):
    id: int
    email: EmailStr
    barangay: Optional[BarangayOut] = None  # nested barangay info

    model_config = {"from_attributes": True}
