from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.engine import get_session
from app.db.models.barangay import Barangay
from app.db.models.user import User  # ✅ import User
from app.schemas.v1.auth import BarangayOut, UserOut  # ✅ import UserOut too

router = APIRouter(prefix="/v1/barangays", tags=["barangays"])


@router.get("/", response_model=list[BarangayOut])  # 🔄 fixed from "/me" to "/"
def list_barangays(session: Session = Depends(get_session)):
    """Get all barangays"""
    return session.query(Barangay).all()


@router.get("/{barangay_id}", response_model=BarangayOut)
def get_barangay(barangay_id: int, session: Session = Depends(get_session)):
    """Get a single barangay by ID"""
    barangay = session.get(Barangay, barangay_id)
    if not barangay:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Barangay not found"
        )
    return barangay


@router.post("/", response_model=BarangayOut, status_code=status.HTTP_201_CREATED)
def create_barangay(barangay: BarangayOut, session: Session = Depends(get_session)):
    """Create a new barangay"""
    if session.query(Barangay).filter_by(name=barangay.name).first():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Barangay already exists"
        )
    new_barangay = Barangay(
        name=barangay.name, mission=barangay.mission, vision=barangay.vision
    )
    session.add(new_barangay)
    session.commit()
    session.refresh(new_barangay)
    return new_barangay


# ✅ NEW: Get all residents of a barangay
@router.get("/{barangay_id}/residents", response_model=list[UserOut])
def list_residents(barangay_id: int, session: Session = Depends(get_session)):
    """Get all users belonging to a barangay"""
    barangay = session.get(Barangay, barangay_id)
    if not barangay:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Barangay not found"
        )
    return barangay.residents
