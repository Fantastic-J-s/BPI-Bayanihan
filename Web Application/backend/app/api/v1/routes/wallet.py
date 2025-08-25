from decimal import Decimal
from fastapi import APIRouter, Depends, Header
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.db.engine import get_session
from app.db.models.user import User
from app.schemas.v1.wallet import (
    DepositRequest,
    WithdrawRequest,
    BalanceOut,
    LedgerItem,
    LedgerListOut,
)
from app.services.v1.wallet import WalletService

router = APIRouter(prefix="/v1/wallet", tags=["wallet"])


@router.post("/deposit")
def deposit(
    payload: DepositRequest,
    x_idem: str | None = Header(default=None, alias="X-Idempotency-Key"),
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    svc = WalletService(session, user.id)
    return svc.deposit(Decimal(payload.amount), x_idem or "")


@router.post("/withdraw")
def withdraw(
    payload: WithdrawRequest,
    x_idem: str | None = Header(default=None, alias="X-Idempotency-Key"),
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    svc = WalletService(session, user.id)
    return svc.withdraw(Decimal(payload.amount), x_idem or "")


@router.get("/balance", response_model=BalanceOut)
def balance(
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    svc = WalletService(session, user.id)
    return BalanceOut(balance=float(svc.balance()))


@router.get("/ledger", response_model=LedgerListOut)
def ledger(
    limit: int = 20,
    cursor: str | None = None,
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    svc = WalletService(session, user.id)
    items, next_cursor = svc.ledger(limit=limit, cursor=cursor)
    return {
        "items": [
            LedgerItem(
                id=e.id,
                type=e.type,
                amount=float(e.amount),
                created_at=e.created_at.isoformat(),
            )
            for e in items
        ],
        "next_cursor": next_cursor,
    }
