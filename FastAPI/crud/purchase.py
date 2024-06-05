from schemas.purchase import PurchaseBase
from sqlalchemy.orm.session import Session
import datetime
from db.models.purchase import DbPurchase


def create(db: Session, request: PurchaseBase):
    new_purchase = DbPurchase(
        user_id=request.user_id,
        store_id=request.store_id,
        item_id=request.item_id,
        item_name=request.item_name,
        item_price=request.item_price,
        purchase_timestamp=datetime.datetime.now(),
        purchase_num=request.purchase_num,
        total_price=request.total_price,
    )
    db.add(new_purchase)
    db.commit()
    db.refresh(new_purchase)
    return new_purchase
