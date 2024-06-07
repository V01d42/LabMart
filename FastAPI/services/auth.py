from datetime import timedelta, timezone, datetime
from typing_extensions import Annotated

from jose import jwt, JWTError
from fastapi import Depends
from sqlalchemy.orm import Session

from crud import user as crud_user
from services.hashing import verify_password
from services import config


def authenticate_user(db: Session, username: str, password: str):
    user = crud_user.get_user_by_username(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(settings: Annotated[config.Settings, Depends(config.get_settings)], data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt