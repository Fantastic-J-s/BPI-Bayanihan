from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer
from app.db.base import Base


class Barangay(Base):
    __tablename__ = "barangays"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    mission: Mapped[str] = mapped_column(String(255), nullable=True)
    vision: Mapped[str] = mapped_column(String(255), nullable=True)

    # Relationship back to users
    residents: Mapped[list["User"]] = relationship(
        "User", back_populates="barangay", cascade="all, delete"
    )
