from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
import jwt
import os

# add these imports near the top
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.db.engine import get_session
from app.db.models.user import User

SECRET_KEY = os.getenv("SECRET_KEY", "change-me")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return pwd_context.verify(password, password_hash)


def create_access_token(
    data: dict, expires_minutes: int = ACCESS_TOKEN_EXPIRE_MINUTES
) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)
    to_encode = {**data, "exp": expire}
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")


def decode_token(token: str) -> dict:
    return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])


http_bearer = HTTPBearer(auto_error=True)


# add this function at the bottom of security.py
def get_current_user(
    cred: HTTPAuthorizationCredentials = Depends(http_bearer),
    session: Session = Depends(get_session),
) -> User:
    token = cred.credentials
    try:
        payload = decode_token(token)  # uses your existing decode_token()
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired"
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )

    sub = payload.get("sub")  # you set this to user.id in /login
    email = payload.get("email")  # also present in your /login

    user = None
    if sub is not None:
        try:
            user = session.get(User, int(sub))  # SQLAlchemy 2.0 style
        except (ValueError, TypeError):
            user = session.query(User).filter(User.email == str(sub)).first()

    if user is None and email:
        user = session.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found"
        )
    return user
