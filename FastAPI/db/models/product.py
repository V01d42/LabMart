from db.session import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship


class DbProduct(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    store_id = Column(Integer)
    price = Column(Integer)
    stock = Column(Integer)
    admin_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    admin = relationship("DbUser", back_populates="products")
    purchases = relationship("DbPurchase", back_populates="product")