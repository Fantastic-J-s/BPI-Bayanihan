from decimal import Decimal
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.models.wallet import Wallet
from app.db.models.ledger import LedgerEntry


class WalletService:
    def __init__(self, session: Session, user_id: int):
        self.session = session
        self.user_id = user_id
        self.wallet = self._get_or_create_wallet()

    def _get_or_create_wallet(self) -> Wallet:
        w = self.session.query(Wallet).filter(Wallet.user_id == self.user_id).first()
        if not w:
            w = Wallet(user_id=self.user_id)
            self.session.add(w)
            self.session.commit()
            self.session.refresh(w)
        return w

    def balance(self) -> Decimal:
        credit = (
            self.session.query(func.coalesce(func.sum(LedgerEntry.amount), 0))
            .filter(
                LedgerEntry.wallet_id == self.wallet.id, LedgerEntry.type == "deposit"
            )
            .scalar()
        )
        debit = (
            self.session.query(func.coalesce(func.sum(LedgerEntry.amount), 0))
            .filter(
                LedgerEntry.wallet_id == self.wallet.id,
                LedgerEntry.type == "withdrawal",
            )
            .scalar()
        )
        return Decimal(credit) - Decimal(debit)

    def deposit(self, amount: Decimal, idempotency_key: str) -> dict:
        if not idempotency_key:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Missing idempotency key",
            )

        existing = (
            self.session.query(LedgerEntry)
            .filter(
                LedgerEntry.user_id == self.user_id,
                LedgerEntry.idempotency_key == idempotency_key,
            )
            .first()
        )
        if existing:
            return {"entry_id": existing.id, "balance": float(self.balance())}

        entry = LedgerEntry(
            user_id=self.user_id,
            wallet_id=self.wallet.id,
            type="deposit",
            amount=amount,
            idempotency_key=idempotency_key,
        )
        self.session.add(entry)
        self.session.commit()
        self.session.refresh(entry)
        return {"entry_id": entry.id, "balance": float(self.balance())}

    def withdraw(self, amount: Decimal, idempotency_key: str) -> dict:
        if not idempotency_key:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Missing idempotency key",
            )

        if amount > self.balance():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Insufficient balance"
            )

        existing = (
            self.session.query(LedgerEntry)
            .filter(
                LedgerEntry.user_id == self.user_id,
                LedgerEntry.idempotency_key == idempotency_key,
            )
            .first()
        )
        if existing:
            return {"entry_id": existing.id, "balance": float(self.balance())}

        entry = LedgerEntry(
            user_id=self.user_id,
            wallet_id=self.wallet.id,
            type="withdrawal",
            amount=amount,
            idempotency_key=idempotency_key,
        )
        self.session.add(entry)
        self.session.commit()
        self.session.refresh(entry)
        return {"entry_id": entry.id, "balance": float(self.balance())}

    def ledger(self, limit: int = 20, cursor: str | None = None):
        q = (
            self.session.query(LedgerEntry)
            .filter(LedgerEntry.wallet_id == self.wallet.id)
            .order_by(LedgerEntry.created_at.desc(), LedgerEntry.id.desc())
        )
        if cursor:
            ts_str, id_str = cursor.split(".", 1)
            from datetime import datetime

            ts = datetime.fromisoformat(ts_str)
            q = q.filter(
                (LedgerEntry.created_at < ts)
                | ((LedgerEntry.created_at == ts) & (LedgerEntry.id < int(id_str)))
            )
        items = q.limit(min(limit, 100)).all()
        next_cursor = None
        if items:
            last = items[-1]
            next_cursor = f"{last.created_at.isoformat()}.{last.id}"
        return items, next_cursor
