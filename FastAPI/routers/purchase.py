from fastapi import APIRouter, Depends
from routers.schemas import PurchaseBase
from sqlalchemy.orm.session import Session
from api.deps import get_db
from crud.purchase import purchase as db_purchase

router = APIRouter(
    prefix="/purchase",
    tags=["purchase"],
)


@router.post("")
def create(request: PurchaseBase, db: Session = Depends(get_db)):
    return db_purchase.create(db, request)
