from pydantic import BaseModel
from datetime import datetime


class ProductBase(BaseModel):
    name: str
    description: str
    store_id: int
    price: int
    stock: int


class ProductCreate(ProductBase):
    admin_id: int


class Product(ProductBase):
    id: int
    admin_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
