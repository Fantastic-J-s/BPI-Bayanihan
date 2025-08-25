from app.db.engine import get_session
from app.db.models.user import User

s = get_session()
u = s.query(User).filter_by(email="test@example.com").first()
s.refresh(u)  # ensure relationships can load
print([w.id for w in u.wallets])  # should show a wallet id
s.close()
