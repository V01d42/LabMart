from schemas.user import UserCreate
from sqlalchemy.orm.session import Session
import datetime
from db.models import user as models
from core.security import get_password_hash


# def get_user(db: Session, user_id: str):
#     return db.query(models.User).filter(models.User.id == user_id).first()


# def get_user_by_email(db: Session, email: str):
#     return db.query(models.User).filter(models.User.email == email).first()


# def get_user_by_username(db: Session, username: str):
#     return db.query(models.User).filter(models.User.username == username).first()


# def get_users(db: Session, skip: get_user = 0, limit: get_user = 100):
#     return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreate):
    new_user = models.User(
        email=user.email,
        username=user.username,
        hashed_password=get_password_hash(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user