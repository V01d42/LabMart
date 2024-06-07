from fastapi import APIRouter, Depends
from schemas.product import ProductCreate
from sqlalchemy.orm.session import Session
from api.deps import get_db
from crud import product as db_product


router = APIRouter(
    prefix="/products",
    tags=["products"],
)


@router.post("")
def create(request: ProductCreate, db: Session = Depends(get_db)):
    return db_product.create(db, request)
