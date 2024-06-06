from pydantic import BaseModel
from datetime import datetime


class PurchaseBase(BaseModel):
    product_id: int
    user_id: int
    quantity: int
    total_price: int


class Purchase(PurchaseBase):
    id: int
    purchase_date: datetime

    class Config:
        orm_mode = True
