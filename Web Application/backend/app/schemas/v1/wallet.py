from pydantic import BaseModel, Field


class DepositRequest(BaseModel):
    amount: float = Field(gt=0)


class WithdrawRequest(BaseModel):
    amount: float = Field(gt=0)


class BalanceOut(BaseModel):
    balance: float


class LedgerItem(BaseModel):
    id: int
    type: str
    amount: float
    created_at: str


class LedgerListOut(BaseModel):
    items: list[LedgerItem]
    next_cursor: str | None = None
