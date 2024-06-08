from typing import List

from fastapi import APIRouter, Depends
from schemas.purchase import PurchaseBase, Purchase
from sqlalchemy.orm.session import Session

from api.deps import get_db
from crud import purchase as crud_purchase
from services.user import get_current_user
from services.purchase import get_purchase_by_user


router = APIRouter(
    prefix="/purchase",
    tags=["purchase"],
)


@router.get("", response_model=List[Purchase])
async def read_purchase_me(purchases: List[Purchase] = Depends(get_purchase_by_user)):
    return purchases


@router.post("")
def create_purchase(request: PurchaseBase, db: Session = Depends(get_db), user: str = Depends(get_current_user)):
    db_purchases = crud_purchase.create(db, request, user.id)
    return db_purchases
