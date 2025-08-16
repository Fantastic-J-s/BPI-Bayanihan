from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from app.core.config import SECRET_KEY, ALGORITHM


def create_access_token(subject: str, expires_delta: timedelta) -> str:
    now = datetime.now(timezone.utc)
    to_encode = {
        "sub": subject,
        "iat": int(now.timestamp()),
        "exp": int((now + expires_delta).timestamp()),
    }
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict:
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
