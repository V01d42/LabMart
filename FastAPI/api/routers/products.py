from typing import List

from fastapi import APIRouter, Depends
from schemas.product import ProductCreate, Product
from sqlalchemy.orm.session import Session

from api.deps import get_db
from crud import product as crut_product


router = APIRouter(
    prefix="/products",
    tags=["products"],
)


@router.post("", response_model=Product)
def create_product(request: ProductCreate, db: Session = Depends(get_db)):
    return crut_product.create(db, request)


@router.get("", response_model=List[Product])
def read_product(db: Session = Depends(get_db)):
    return crut_product.get_products(db=db)