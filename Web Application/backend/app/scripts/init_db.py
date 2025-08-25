# app/scripts/init_db.py
from app.db.engine import engine, get_session
from app.db.base import Base
from app.core.security import hash_password

# Import models so tables register on Base
from app.db.models.user import User
from app.db.models.barangay import Barangay
from app.db.models.wallet import Wallet
from app.db.models.ledger import LedgerEntry
# from app.db.models

# Drop the database
Base.metadata.drop_all(bind=engine)
# Create tables
Base.metadata.create_all(bind=engine)

# first account
USER_EMAIL = "barangayofficial@gmail.com"
USER_PASSWORD = "secret123"

s = get_session()
try:
    # barangays
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
    for b in default_barangays:
        if not s.query(Barangay).filter(Barangay.name == b["name"]).first():
            s.add(Barangay(**b))
            print(f"Barangay created: {b['name']}")
    s.commit()

    # Link the user to the first barangay
    barangay = s.query(Barangay).first()
    if not barangay:
        print("No barangay found. Please seed barangays first.")
    else:
        # Get or create the specified user
        user = s.query(User).filter(User.email == USER_EMAIL).first()
        if not user:
            user = User(
                email=USER_EMAIL,
                # If your User model uses `hashed_password` instead of `password_hash`, change the attribute below.
                password_hash=hash_password(USER_PASSWORD),
                barangay_id=barangay.id,
            )
            s.add(user)
            s.commit()
            s.refresh(user)
            print(
                f"User created: {USER_EMAIL} / {USER_PASSWORD} (Barangay: {barangay.name})"
            )
        else:
            print("User already exists")

        # Ensure wallet for that user
        wallet = s.query(Wallet).filter(Wallet.user_id == user.id).first()
        if not wallet:
            s.add(Wallet(user_id=user.id))
            s.commit()
            print("Wallet created for user")
        else:
            print("Wallet already exists for user")
finally:
    s.close()
