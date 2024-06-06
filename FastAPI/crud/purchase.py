from schemas.purchase import PurchaseBase
from sqlalchemy.orm.session import Session
import datetime
from db.models.purchase import DbPurchase


def create(db: Session, request: PurchaseBase):
    new_purchase = DbPurchase(
        product_id=request.product_id,
        user_id=request.user_id,
        quantity=request.quantity,
        total_price=request.total_price,
        purchase_timestamp=datetime.datetime.now(),
    )
    db.add(new_purchase)
    db.commit()
    db.refresh(new_purchase)
    return new_purchase
