from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    String,
    DateTime,
    Numeric,
    func,
    CheckConstraint,
    Index,
)
from app.db.base import Base


class LedgerEntry(Base):
    __tablename__ = "ledger_entries"
    id = Column(Integer, primary_key=True)
    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    wallet_id = Column(
        Integer,
        ForeignKey("wallets.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )

    # "deposit" | "withdrawal"
    type = Column(String(16), nullable=False)
    amount = Column(Numeric(12, 2), nullable=False)  # always positive
    idempotency_key = Column(String(128), nullable=False)  # client-sent key
    created_at = Column(DateTime, server_default=func.now(), index=True)

    __table_args__ = (
        CheckConstraint("amount > 0", name="ck_ledger_amount_pos"),
        CheckConstraint(
            "type IN ('deposit','withdrawal')", name="ck_ledger_type_valid"
        ),
        Index("uq_user_idemp", "user_id", "idempotency_key", unique=True),
    )
