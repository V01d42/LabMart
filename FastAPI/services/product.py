from typing_extensions import Annotated
from fastapi import Depends, HTTPException, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from schemas.purchase import PurchaseBase
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from starlette import status

from api.deps import get_db
from crud import user as crud_user
from crud import product as crud_product
from db.models.user import DbUser
from schemas.token import TokenData, Token
from services import config
from services.user import get_current_user


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()


async def get_product_by_user(current_user: DbUser = Depends(get_current_user), db: Session = Depends(get_db)):
    db_products = crud_product.get_products_by_admin_id(db, current_user.id)
    return db_products