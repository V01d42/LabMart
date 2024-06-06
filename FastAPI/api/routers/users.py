from fastapi import APIRouter, Depends, HTTPException
from schemas.user import UserCreate, User
from sqlalchemy.orm.session import Session
from api.deps import get_db
from crud import user as user_crud


router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.post("" ,response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = user_crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="username already registered")
    return user_crud.create(db=db, user=user)