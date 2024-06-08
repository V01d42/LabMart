from typing import List
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from schemas.purchase import PurchaseBase, Purchase, PurchaseShow
from schemas.product import Product
from sqlalchemy.orm.session import Session

from api.deps import get_db
from crud import user as crud_user
from crud import purchase as crud_purchase
from crud import product as crud_product
from services.user import get_current_user
from services.purchase import get_purchase_by_user
from services.product import get_product_by_user


router = APIRouter(
    prefix="/purchases",
    tags=["purchases"],
)


@router.get("/me", response_model=List[PurchaseShow])
async def read_purchase_me(db: Session = Depends(get_db), purchases: List[Purchase] = Depends(get_purchase_by_user)):
    purchases_show = []
    for purchase in purchases:
        purchase_show_ = {
            "product_id": purchase.product_id,
            "product_name": crud_product.get_product(db, purchase.product_id).name,
            "user_id": purchase.user_id,
            "username": crud_user.get_user(db, purchase.user_id).username,
            "quantity": purchase.quantity,
            "total_price": purchase.total_price,
            "purchase_date": purchase.purchase_date,
        }
        purchase_show = PurchaseShow(**purchase_show_)
        purchases_show.append(purchase_show)
    return purchases_show


@router.get("/sold", response_model=List[PurchaseShow])
async def read_purchase_sold(db: Session = Depends(get_db), products: List[Product] = Depends(get_product_by_user)):
    product_ids = [product.id for product in products]
    purchases_sold = crud_purchase.get_purchases_by_product_ids(db, product_ids)
    purchases_sold_show = []
    for purchase_sold in purchases_sold:
        purchase_sold_show_ = {
            "product_id": purchase_sold.product_id,
            "product_name": crud_product.get_product(db, purchase_sold.product_id).name,
            "user_id": purchase_sold.user_id,
            "username": crud_user.get_user(db, purchase_sold.user_id).username,
            "quantity": purchase_sold.quantity,
            "total_price": purchase_sold.total_price,
            "purchase_date": purchase_sold.purchase_date,
        }
        purchase_sold_show = PurchaseShow(**purchase_sold_show_)
        purchases_sold_show.append(purchase_sold_show)
    return purchases_sold_show


@router.post("", response_model=Purchase)
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
    except:
        db.rollback()
        raise HTTPException(status_code=400, detail="purchase error occurred")
    return db_purchase
