from fastapi import Depends, HTTPException, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from starlette import status
from starlette.config import Config
from starlette.datastructures import Secret

from api.deps import get_db
from crud import user as crud_user
from db.models.user import DbUser
from schemas.token import TokenData, Token


config = Config("../.env")

SECRET_KEY = config("SECRET_KEY", cast=Secret)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    db_user = crud_user.get_user_by_username(db, username=token_data.username)
    if db_user is None:
        raise credentials_exception
    return db_user

async def get_current_active_user(current_user: DbUser = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user