# app/scripts/init_db.py
from app.db.engine import engine, get_session
from app.db.base import Base
from app.core.security import hash_password

# ✅ import models
from app.db.models.user import User
from app.db.models.barangay import Barangay

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# Start session
s = get_session()

# ✅ Seed Barangays
default_barangays = [
    {
        "name": "Barangay San Isidro",
        "mission": "Promote financial literacy",
        "vision": "Inclusive prosperity",
    },
    {
        "name": "Barangay Mabini",
        "mission": "Empower savings discipline",
        "vision": "Financially resilient community",
    },
]

for barangay_data in default_barangays:
    if not s.query(Barangay).filter_by(name=barangay_data["name"]).first():
        s.add(Barangay(**barangay_data))
        print(f"✅ Barangay created: {barangay_data['name']}")

s.commit()

# ✅ Seed Test User linked to Barangay 1
barangay = s.query(Barangay).first()
if barangay:
    if not s.query(User).filter_by(email="test@example.com").first():
        s.add(
            User(
                email="test@example.com",
                password_hash=hash_password("secret123"),
                barangay_id=barangay.id,
            )
        )
        s.commit()
        print(
            f"✅ User created: test@example.com / secret123 (Barangay: {barangay.name})"
        )
    else:
        print("User already exists")
else:
    print("⚠️ No barangay found. Please seed barangays first.")

s.close()
