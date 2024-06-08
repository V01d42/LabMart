from typing import List
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from schemas.purchase import PurchaseBase, Purchase
from schemas.product import Product
from sqlalchemy.orm.session import Session

from api.deps import get_db
from crud import purchase as crud_purchase
from crud import product as crud_product
from services.user import get_current_user
from services.purchase import get_purchase_by_user
from services.product import get_product_by_user


router = APIRouter(
    prefix="/purchases",
    tags=["purchases"],
)


@router.get("/me", response_model=List[Purchase])
async def read_purchase_me(purchases: List[Purchase] = Depends(get_purchase_by_user)):
    return purchases


@router.get("/sold", response_model=List[Purchase])
async def read_purchase_sold(db: Session = Depends(get_db), products: List[Product] = Depends(get_product_by_user)):
    product_ids = [product.id for product in products]
    db_purchases_sold = crud_purchase.get_purchases_by_product_ids(db, product_ids)
    return db_purchases_sold


@router.post("")
def create_purchase(request: PurchaseBase, db: Session = Depends(get_db), user: str = Depends(get_current_user)):
    db_product = crud_product.get_product(db, product_id=request.product_id)
    if db_product.stock < request.quantity:
        raise HTTPException(status_code=400, detail="requested quantity exceeds stock")
    try:
        db_product.stock -= request.quantity
        db_product.updated_at = datetime.now()
        db_purchase = crud_purchase.create(db, request, user.id)
        db.commit()
        db.refresh(db_product)
        db.refresh(db_purchase)
    except Exception as e:
        db.rollback()
        raise e
    return db_purchase
