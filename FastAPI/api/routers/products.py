from typing import List

from fastapi import APIRouter, Depends
from schemas.product import ProductCreate, Product
from sqlalchemy.orm.session import Session

from api.deps import get_db
from crud import product as crut_product
from services.user import get_current_user
from services.product import get_product_by_user


router = APIRouter(
    prefix="/products",
    tags=["products"],
)


@router.get("/me", response_model=List[Product])
def read_product_me(products: List[Product] = Depends(get_product_by_user)):
    return products


@router.get("", response_model=List[Product])
def read_product(db: Session = Depends(get_db)):
    return crut_product.get_products(db=db)


@router.post("", response_model=Product)
def create_product(request: ProductCreate, db: Session = Depends(get_db), user: str = Depends(get_current_user)):
    db_product = crut_product.create(db, request, user.id)
    return db_product
