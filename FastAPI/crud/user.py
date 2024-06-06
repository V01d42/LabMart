from schemas.user import UserCreate
from sqlalchemy.orm.session import Session
import datetime
from db.models import user as models
from services.security import get_password_hash


def get_user(db: Session, user_id: str):
    return db.query(models.DbUser).filter(models.DbUser.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.DbUser).filter(models.DbUser.email == email).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.DbUser).filter(models.DbUser.username == username).first()


def get_users(db: Session, skip: get_user = 0, limit: get_user = 100):
    return db.query(models.DbUser).offset(skip).limit(limit).all()


def create(db: Session, user: UserCreate):
    new_user = models.DbUser(
        email=user.email,
        username=user.username,
        hashed_password=get_password_hash(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user