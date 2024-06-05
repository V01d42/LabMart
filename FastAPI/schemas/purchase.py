from pydantic import BaseModel
from datetime import datetime


class PurchaseBase(BaseModel):
    user_id: int
    store_id: int
    item_id: int
    item_name: str
    item_price: int
    purchase_num: int
    total_price: int


class PurchaseDisplay(BaseModel):
    id: int
    user_id: int
    store_id: int
    item_id: int
    item_name: str
    item_price: int
    purchase_timestamp: datetime
    purchase_num: int
    total_price: int

    class Config:
        orm_mode = True
