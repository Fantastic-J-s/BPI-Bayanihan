# app/scripts/init_db.py
from app.db.engine import engine, get_session
from app.db.base import Base

# from app.db.models.user import User
from app.core.security import hash_password

Base.metadata.create_all(bind=engine)

s = get_session()
if not s.query(User).filter_by(email="test@example.com").one_or_none():
    s.add(User(email="test@example.com", password_hash=hash_password("secret123")))
    s.commit()
    print("✅ User created: test@example.com / secret123")
else:
    print("User already exists")
s.close()
