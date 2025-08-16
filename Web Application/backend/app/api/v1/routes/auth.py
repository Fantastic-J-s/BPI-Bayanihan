from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.orm import Session
import jwt

from app.db.engine import get_session
from app.db.models.user import User
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    decode_token,
)

router = APIRouter(prefix="/v1/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/v1/auth/login")


# ---------- Schemas (API contract) ----------
class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1)


class UserOut(BaseModel):
    id: int
    email: EmailStr

    model_config = {"from_attributes": True}  # Pydantic v2 (aka orm_mode)


class EmailRequest(BaseModel):
    email: EmailStr


# ---------- Routes ----------
@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, session: Session = Depends(get_session)):
    if session.query(User).filter(User.email == payload.email).first():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Email already registered"
        )
    user = User(email=payload.email, password_hash=hash_password(payload.password))
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.post("/login")
def login(payload: LoginRequest, session: Session = Depends(get_session)):
    user = session.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )
    token = create_access_token({"sub": str(user.id), "email": user.email})
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me", response_model=UserOut)
def me(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    try:
        data = decode_token(token)
        uid = int(data.get("sub"))
        user = session.get(User, uid)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )
        return user
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, ValueError, TypeError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token"
        )


# Example: email payload with validation (replacing Flask's request.get_json())
@router.post("/send-email")
def send_email(payload: EmailRequest):
    # integrate your mailer here (e.g., FastAPI-mail / any SMTP client)
    return {"message": f"Email will be sent to {payload.email}"}
