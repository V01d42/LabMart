from schemas.purchase import PurchaseBase
from sqlalchemy.orm.session import Session
import datetime
from db.models import purchase as models


def get_purchases_by_product_ids(db: Session, product_ids: [str]):
    return db.query(models.DbPurchase).filter(models.DbPurchase.product_id.in_(product_ids))


def get_purchases_by_user_id(db: Session, user_id: str):
    return db.query(models.DbPurchase).filter(models.DbPurchase.user_id == user_id)


def create(db: Session, request: PurchaseBase, user_id: str):
    new_purchase = models.DbPurchase(
        product_id=request.product_id,
        user_id=user_id,
        quantity=request.quantity,
        total_price=request.total_price,
        purchase_date=datetime.datetime.now(),
    )
    db.add(new_purchase)
    db.commit()
    db.refresh(new_purchase)
    return new_purchase
