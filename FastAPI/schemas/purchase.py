from pydantic import BaseModel
from datetime import datetime


class PurchaseBase(BaseModel):
    product_id: int
    quantity: int
    total_price: int


class Purchase(PurchaseBase):
    id: int
    user_id: int
    purchase_date: datetime

    class Config:
        from_attributes = True

class PurchaseShow(PurchaseBase):
    product_id: int
    product_name: str
    user_id: int
    username: str
    purchase_date: datetime

    class Config:
        from_attributes = True