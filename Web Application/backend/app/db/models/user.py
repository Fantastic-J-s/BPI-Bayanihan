from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer, ForeignKey
from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(
        String(254), unique=True, index=True, nullable=False
    )
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)

    # link to barangay
    barangay_id: Mapped[int] = mapped_column(ForeignKey("barangays.id"), nullable=True)
    barangay: Mapped["Barangay"] = relationship("Barangay", back_populates="residents")

    # link to wallet
    wallets = relationship(
        "Wallet", back_populates="user", cascade="all, delete-orphan", lazy="selectin"
    )
