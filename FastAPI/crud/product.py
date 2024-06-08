from schemas.product import ProductCreate
from sqlalchemy.orm.session import Session
import datetime
from db.models import product as models


def get_product(db: Session, product_id: str):
    return db.query(models.DbProduct).filter(models.DbProduct.id == product_id).first()


def get_product_by_admin_id(db: Session, admin_id: str):
    return db.query(models.DbProduct).filter(models.DbProduct.admin_id == admin_id).first()


def get_products(db: Session, skip: get_product = 0, limit: get_product = 100):
    return db.query(models.DbProduct).offset(skip).limit(limit).all()


def create(db: Session, request: ProductCreate, admin_id: str):
    new_product = models.DbProduct(
        name=request.name,
        description=request.description,
        store_id=request.store_id,
        price=request.price,
        stock=request.stock,
        admin_id=admin_id,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product
