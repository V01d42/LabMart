from schemas.product import ProductCreate
from sqlalchemy.orm.session import Session
import datetime
from db.models.product import DbProduct


def create(db: Session, request: ProductCreate):
    new_product = DbProduct(
        name=request.name,
        description=request.description,
        store_id=request.store_id,
        price=request.price,
        stock=request.stock,
        admin_id=request.admin_id,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product
