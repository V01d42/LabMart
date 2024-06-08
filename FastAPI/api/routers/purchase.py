from typing import List

from fastapi import APIRouter, Depends
from schemas.purchase import PurchaseBase, Purchase
from sqlalchemy.orm.session import Session

from api.deps import get_db
from crud import purchase as db_purchase
from services.security import get_purchase_by_user


router = APIRouter(
    prefix="/purchase",
    tags=["purchase"],
)


@router.get("", response_model=List[Purchase])
async def read_purchase_me(purchases: List[Purchase] = Depends(get_purchase_by_user)):
    return purchases


@router.post("")
def create_purchase(request: PurchaseBase, db: Session = Depends(get_db)):
    return db_purchase.create(db, request)

