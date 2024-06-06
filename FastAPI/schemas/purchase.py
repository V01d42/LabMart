from pydantic import BaseModel
from datetime import datetime


class PurchaseBase(BaseModel):
    product_id: int
    user_id: int
    quantity: int
    total_price: int
    purchase_date: datetime


class PurchaseDisplay(PurchaseBase):
    id: int

    class Config:
        orm_mode = True
