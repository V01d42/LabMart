from fastapi import APIRouter, Depends
from routers.schemas import PurchaseBase
from sqlalchemy.orm.session import Session
from database.database import get_db
from database import db_purchase

router = APIRouter(
    prefix="/purchase",
    tags=["purchase"],
)


@router.post("")
def create(request: PurchaseBase, db: Session = Depends(get_db)):
    return db_purchase.create(db, request)
